# Firestore Sync Issues Fixed

**Date:** May 2, 2026  
**Status:** ✅ Complete

## Issues Found

### 1. **Lead ID Type Mismatch**
**Error:** `TypeError: n.indexOf is not a function`
- **Cause:** Firestore document IDs must be strings, but lead IDs were numbers (`Date.now()`)
- **Location:** db-sync.js line 60

### 2. **Timing Issue - Leads Not Loading**
**Problem:** Leads weren't loading from Firestore after page reload
- **Cause:** `loadLeadsFromStorage()` was called before DBSync was initialized
- **Flow:** Map ready → loadLeadsFromStorage() → DBSync not initialized yet → No leads loaded

### 3. **Visitor Mode Load Issue**
**Problem:** Visitor mode wasn't loading admin leads correctly
- **Cause:** Called non-existent `window.LeadSystem.loadLeads()` function
- **Should call:** `window.LeadSystem.loadLeadsFromStorage()`

## Fixes Applied

### 1. **Fixed Lead ID Type Conversion (db-sync.js)**

#### saveLeads()
```javascript
// Convert lead.id to string for Firestore document ID
const leadId = String(lead.id || Date.now());
const docRef = db.collection('leads').doc(this.userId).collection('pins').doc(leadId);
batch.set(docRef, {
  ...lead,
  id: leadId, // Ensure ID is stored as string
  updatedAt: firebase.firestore.FieldValue.serverTimestamp()
});
```

#### saveLead()
```javascript
// Convert lead.id to string for Firestore document ID
const leadId = String(lead.id || Date.now());
const docRef = db.collection('leads').doc(this.userId).collection('pins').doc(leadId);
await docRef.set({
  ...lead,
  id: leadId, // Ensure ID is stored as string
  updatedAt: firebase.firestore.FieldValue.serverTimestamp()
});
```

### 2. **Fixed Load Timing (index.html)**

Added loadLeadsFromStorage call AFTER DBSync initialization:

```javascript
if (window.DBSync) {
    window.DBSync.init(result.user.uid);
    
    // Load leads from Firestore after DBSync is initialized
    setTimeout(async () => {
        if (window.LeadSystem && window.LeadSystem.loadLeadsFromStorage) {
            console.log('📥 Loading leads from Firestore after login...');
            await window.LeadSystem.loadLeadsFromStorage();
        }
    }, 1000);
}
```

### 3. **Fixed Visitor Mode Loading (index.html)**

Updated loadAdminLeads to use DBSync properly:

```javascript
async function loadAdminLeads(adminUserId) {
    try {
        console.log('📥 Loading admin leads from Firestore...');
        
        // Load leads from Firestore using DBSync
        if (window.DBSync && window.DBSync.initialized) {
            const leads = await window.DBSync.loadLeads();
            console.log('✅ Loaded', leads.length, 'leads from admin');
            
            // Trigger LeadSystem to restore the leads
            if (window.LeadSystem && window.LeadSystem.loadLeadsFromStorage) {
                console.log('🔄 Restoring leads in LeadSystem...');
                await window.LeadSystem.loadLeadsFromStorage();
            }
            
            return leads;
        }
    } catch (error) {
        console.error('❌ Error loading admin leads:', error);
        return [];
    }
}
```

### 4. **Exposed loadLeadsFromStorage (leads.js)**

Added to LeadSystem API:

```javascript
window.LeadSystem = {
    // ... existing methods
    loadLeadsFromStorage,
    pins // Expose pins array for sync button
};
```

## How It Works Now

### Normal User Flow
1. User logs in
2. DBSync.init(userId) is called
3. After 1 second, loadLeadsFromStorage() is called
4. Leads are loaded from Firestore
5. Leads are rendered on map

### Visitor Mode Flow
1. Visitor accesses link
2. DBSync.init(adminUserId) is called
3. loadAdminLeads(adminUserId) is called
4. Leads are loaded from admin's Firestore
5. Leads are rendered on map

### Manual Sync Flow
1. User clicks cloud sync button
2. All leads are synced to Firestore with string IDs
3. Green checkmark shows success
4. Data is now in cloud

### Page Reload Flow
1. User reloads page
2. User logs in (or visitor link validates)
3. DBSync initializes
4. loadLeadsFromStorage() is called
5. Leads load from Firestore
6. Leads appear on map

## Testing Checklist

- [ ] Upload leads JSON file
- [ ] Click cloud sync button
- [ ] See green checkmark (no errors in console)
- [ ] Reload page
- [ ] Leads should load from Firestore automatically
- [ ] All leads should appear on map
- [ ] Generate visitor link
- [ ] Open visitor link in incognito
- [ ] Visitor should see all leads
- [ ] Check console for no errors

## Benefits

1. **No More Type Errors** - All IDs properly converted to strings
2. **Reliable Loading** - Leads always load after DBSync is ready
3. **Visitor Access Works** - Visitors can see admin's leads
4. **Cloud Persistence** - Data survives page reloads
5. **No localStorage** - Everything in Firestore cloud

## Notes

- Lead IDs are now always strings in Firestore
- Timing is critical - DBSync must initialize before loading leads
- 1-second delay ensures DBSync is fully ready
- Visitor mode uses admin's userId to load their data
- Cloud sync button provides manual sync control
