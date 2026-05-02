# Visitor Access System Implementation

**Date:** May 2, 2026  
**Feature:** Read-only visitor access with time-limited links

---

## ✅ COMPLETED SO FAR:

### 1. **Firestore Rules Updated** ✅
- Added `isVisitor()` helper function
- Visitors can read leads and sessions (read-only)
- Visitors cannot write/edit anything
- Added `visitorLinks` collection with admin-only access

### 2. **Admin Panel - Visitor Links Tab** ✅
- Added "Visitor Links" tab next to Users and Invites
- **Access Level Selection:**
  - 🔒 Strict Read-Only
  - 👁️ Flexible Read-Only
- **Duration Selection:**
  - Quick buttons: 15min, 30min, 1hr, 2hrs
  - Custom duration input (1-1440 minutes)
- **Link Generation:**
  - Generates unique link with ID
  - Stores in Firestore with metadata
  - Auto-copies to clipboard
- **Active Links Display:**
  - Shows all active visitor links
  - Real-time status updates (used/expired/active)
  - Shows time remaining
  - Shows when link was opened
  - Copy link button
  - Delete link button

---

## 🚧 TODO - Main App Restrictions:

### 1. **Visitor Link Authentication**
- Detect `?visitor=LINK_ID` in URL
- Validate link in Firestore
- Check if expired
- Mark as "used" when opened
- Create temporary visitor user session

### 2. **Countdown Timer**
- Display countdown in corner of screen
- Update every second
- Show warning when < 5 minutes
- Auto-logout when time expires
- Redirect to login page

### 3. **Strict Read-Only Restrictions:**
- ❌ Cannot open session summary panel
- ❌ Cannot open session logs
- ❌ Cannot click any buttons (session, import, etc.)
- ❌ Pins show blurred details
- ✅ Can zoom in/out (limited to zoom levels 12-16)
- ✅ Can pan map

### 4. **Flexible Read-Only Restrictions:**
- ✅ Can zoom freely
- ✅ Can open session summary panel (read-only)
- ✅ Can open pins and see details
- ❌ Cannot edit pins
- ❌ Cannot add pins
- ❌ Cannot start/stop session
- ❌ Cannot import leads
- ❌ Cannot use any write features

### 5. **UI Changes for Visitors:**
- Hide/disable all edit buttons
- Show "Read-Only" badge
- Show countdown timer
- Blur sensitive info (strict mode)
- Disable form inputs

---

## 📋 IMPLEMENTATION PLAN:

### **Step 1:** Visitor Link Handler (index.html)
```javascript
// Check for visitor link in URL
const urlParams = new URLSearchParams(window.location.search);
const visitorLinkId = urlParams.get('visitor');

if (visitorLinkId) {
  // Validate and activate visitor session
  await activateVisitorSession(visitorLinkId);
}
```

### **Step 2:** Countdown Timer Component
```html
<div id="visitor-countdown" class="hidden fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-[2000]">
  ⏱️ <span id="countdown-time">30:00</span>
</div>
```

### **Step 3:** Access Control Functions
```javascript
function isVisitor() {
  return window.currentUser && window.currentUser.role === 'visitor';
}

function getVisitorAccessLevel() {
  return window.currentUser?.visitorAccessLevel || 'strict';
}

function canAccessFeature(feature) {
  if (!isVisitor()) return true;
  
  const accessLevel = getVisitorAccessLevel();
  
  if (accessLevel === 'strict') {
    return ['zoom', 'pan'].includes(feature);
  } else {
    return !['edit', 'add', 'delete', 'session', 'import'].includes(feature);
  }
}
```

### **Step 4:** UI Restrictions
```javascript
// Hide buttons for visitors
if (isVisitor()) {
  document.getElementById('session-btn').style.display = 'none';
  document.getElementById('import-json-input').parentElement.style.display = 'none';
  // ... hide other buttons
}

// Blur pins in strict mode
if (isVisitor() && getVisitorAccessLevel() === 'strict') {
  document.querySelectorAll('.pin-details').forEach(el => {
    el.style.filter = 'blur(5px)';
  });
}
```

---

## 🔐 SECURITY CONSIDERATIONS:

1. **Server-side validation** - Firestore rules enforce read-only
2. **Time validation** - Check expiry on every request
3. **One-time use** - Link marked as "used" after first access
4. **No data leakage** - Strict mode blurs sensitive info
5. **Auto-logout** - Session ends when timer expires

---

## 📊 FIRESTORE STRUCTURE:

### **visitorLinks Collection:**
```javascript
{
  linkId: "abc123...",
  accessLevel: "strict" | "flex",
  durationMinutes: 30,
  createdAt: Timestamp,
  expiresAt: Timestamp,
  used: false,
  usedAt: null,
  active: true
}
```

### **users Collection (Visitor):**
```javascript
{
  uid: "visitor_abc123",
  role: "visitor",
  visitorAccessLevel: "strict" | "flex",
  visitorLinkId: "abc123...",
  sessionStartedAt: Timestamp,
  sessionExpiresAt: Timestamp,
  status: "active"
}
```

---

## 🎯 NEXT STEPS:

1. Implement visitor link detection in index.html
2. Create countdown timer component
3. Add access control checks to all features
4. Hide/disable UI elements for visitors
5. Implement blur effect for strict mode
6. Test both access levels thoroughly
7. Update README with visitor access documentation

---

**Status:** Admin panel complete, main app restrictions pending
