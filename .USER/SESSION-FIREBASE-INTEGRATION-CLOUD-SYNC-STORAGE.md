# New Session

Exported: 5/2/2026, 1:27:56 PM

## Steering Documents

**Workspace:**
- code-quality-standards.md
- product.md
- structure.md
- tech.md

---

**User:**

check my appluication, it has apready a firebase integration for authentication, i want to create a cloud storage and syncing for the user session (leads, session logs, etc...)
how would we do that!? before u implement anything, just tell me  the plan and validate ur steps

---

**Assistant:**

I'll analyze your application's current Firebase integration and create a comprehensive plan for cloud storage and syncing. Let me first examine the existing setup.

Now let me check the README to understand the project better:

Perfect! Now I have a comprehensive understanding of your application. Let me create a detailed plan for cloud storage and syncing.

---

## 📋 **CLOUD STORAGE & SYNCING PLAN FOR STREETTRACKER**

### **Current State Analysis**
✅ **What you have:**
- Firebase Authentication (Google Sign-in, invite codes, admin roles)
- Firestore database with security rules
- User collection with roles (admin/member/pending)
- Leads collection structure (`/leads/{userId}/pins/{pinId}`)
- Sessions collection structure (`/sessions/{userId}/history/{sessionId}`)
- Visitor access via anonymous auth

❌ **What's missing:**
- Active Firestore sync for leads and sessions (currently disabled in `db-sync.js`)
- Cloud Storage for photos/media
- Real-time data synchronization
- Offline-first architecture
- Conflict resolution for concurrent edits

---

### **PROPOSED ARCHITECTURE**

#### **1. Data Structure (Firestore)**

```
firestore/
├── users/{userId}
│   ├── email, displayName, role, status, lastLogin
│   └── syncMetadata (for conflict resolution)
│
├── leads/{userId}/pins/{pinId}
│   ├── id, lat, lng, index
│   ├── priority, status, role, phase
│   ├── contact: {name, phone, notes}
│   ├── imageUrls: [] (references to Cloud Storage)
│   ├── createdAt, updatedAt
│   └── _syncVersion (for conflict resolution)
│
├── sessions/{userId}/history/{sessionId}
│   ├── id, type, startLocation, endLocation
│   ├── distance, duration, stopCount
│   ├── stations: [{...}]
│   ├── path: [{lat, lng}]
│   ├── timestamp, startAddress, endAddress
│   ├── createdAt, updatedAt
│   └── _syncVersion (for conflict resolution)
│
└── sessionLogs/{userId}/logs/{logId}
    ├── sessionId, timestamp, action
    ├── data: {...}
    └── createdAt
```

#### **2. Cloud Storage Structure**

```
gs://lexi-5f30c.firebasestorage.app/
├── users/{userId}/
│   ├── leads/{pinId}/
│   │   ├── photo_1.jpg
│   │   ├── photo_2.jpg
│   │   └── metadata.json
│   └── sessions/{sessionId}/
│       ├── route_map.png
│       └── summary.pdf
```

#### **3. Sync Strategy**

**Real-time Sync:**
- Listen to Firestore changes with `onSnapshot()`
- Auto-sync when user adds/edits leads or sessions
- Debounce rapid changes (500ms)
- Queue changes if offline, sync when online

**Conflict Resolution:**
- Use `_syncVersion` timestamps
- Last-write-wins strategy (with user notification)
- Manual merge option for critical conflicts

**Offline Support:**
- Cache data locally (IndexedDB or localStorage)
- Queue operations while offline
- Sync queue when connection restored

---

### **IMPLEMENTATION PHASES**

#### **Phase 1: Core Firestore Sync (Week 1)**
1. ✅ Implement real-time listeners for leads
2. ✅ Implement real-time listeners for sessions
3. ✅ Add create/update/delete operations
4. ✅ Implement conflict resolution
5. ✅ Update Firestore security rules

#### **Phase 2: Cloud Storage Integration (Week 2)**
1. ✅ Upload photos to Cloud Storage
2. ✅ Generate signed URLs for images
3. ✅ Delete photos when leads deleted
4. ✅ Implement image compression before upload

#### **Phase 3: Offline Support (Week 3)**
1. ✅ Implement local caching (IndexedDB)
2. ✅ Queue operations while offline
3. ✅ Sync queue when online
4. ✅ Conflict detection & resolution UI

#### **Phase 4: Advanced Features (Week 4)**
1. ✅ Session export to PDF (with Cloud Storage)
2. ✅ Bulk operations (import/export)
3. ✅ Data backup & restore
4. ✅ Admin dashboard for data management

---

### **KEY IMPLEMENTATION DETAILS**

#### **A. Real-time Sync Module** (`firestore-sync.js`)
```javascript
// Listen to leads changes
listenToLeads(userId, callback)
// Listen to sessions changes
listenToSessions(userId, callback)
// Save lead with conflict detection
saveLead(userId, pinId, data)
// Delete lead with cleanup
deleteLead(userId, pinId)
```

#### **B. Cloud Storage Module** (`storage-sync.js`)
```javascript
// Upload photo
uploadPhoto(userId, pinId, file)
// Delete photo
deletePhoto(userId, pinId, photoUrl)
// Generate signed URL
getPhotoUrl(userId, pinId, photoName)
```

#### **C. Offline Queue Module** (`offline-queue.js`)
```javascript
// Queue operation
queueOperation(operation)
// Sync queue when online
syncQueue()
// Get queue status
getQueueStatus()
```

#### **D. Updated Security Rules** (`firestore.rules`)
- Add Cloud Storage rules for photo access
- Implement rate limiting
- Add data validation

---

### **VALIDATION CHECKLIST**

Before implementation, I'll verify:

- [ ] All existing leads/sessions data structure compatibility
- [ ] No breaking changes to current UI
- [ ] Backward compatibility with existing localStorage data
- [ ] Security rules prevent unauthorized access
- [ ] Photo upload size limits (5MB per photo)
- [ ] Offline queue doesn't exceed storage limits
- [ ] Conflict resolution doesn't lose user data
- [ ] Admin can view/manage all user data
- [ ] Visitor access remains read-only
- [ ] Performance impact on map rendering

---

### **QUESTIONS FOR YOU**

Before I proceed with implementation:

1. **Photo Storage**: Should we compress photos before upload? (Recommended: 2MB max)
2. **Retention**: How long should we keep deleted data? (Soft delete vs hard delete)
3. **Sync Frequency**: Real-time or periodic sync? (Real-time recommended)
4. **Offline Limit**: Max queue size before warning user? (Recommended: 50 operations)
5. **Admin Access**: Should admins see all user data or only their own?
6. **Backup**: Do you want automatic daily backups?

---

**Ready to proceed?** Once you confirm this plan and answer the questions above, I'll implement it step-by-step with full testing.

---
