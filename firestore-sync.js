/**
 * Firestore Sync Module
 * Real-time synchronization for leads and sessions with conflict resolution
 * 
 * Features:
 * - Real-time listeners for leads and sessions
 * - Automatic sync on create/update/delete
 * - Conflict resolution with version tracking
 * - Offline queue support
 * - Manual sync trigger
 */

const FirestoreSync = (() => {
  // State
  let userId = null;
  let db = null;
  let isOnline = true;
  let syncInProgress = false;
  let unsubscribers = [];
  let syncCallbacks = {
    onLeadsChange: null,
    onSessionsChange: null,
    onSyncStart: null,
    onSyncEnd: null,
    onError: null
  };

  // Initialize sync module
  function init(firebaseDb, currentUserId) {
    db = firebaseDb;
    userId = currentUserId;
    
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Missing db or userId');
      return false;
    }

    // Monitor online/offline status
    window.addEventListener('online', () => {
      isOnline = true;
      console.log('🟢 FirestoreSync: Online - syncing queue');
      triggerManualSync();
    });
    window.addEventListener('offline', () => {
      isOnline = false;
      console.log('🔴 FirestoreSync: Offline - queuing operations');
    });

    console.log('✅ FirestoreSync initialized for user:', userId);
    return true;
  }

  // Start listening to leads changes
  function listenToLeads(callback) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return null;
    }

    syncCallbacks.onLeadsChange = callback;

    const unsubscribe = db
      .collection('leads')
      .doc(userId)
      .collection('pins')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const leads = [];
          snapshot.forEach((doc) => {
            leads.push({
              id: doc.id,
              ...doc.data()
            });
          });
          console.log('📥 Leads synced from Firestore:', leads.length);
          if (callback) callback(leads);
        },
        (error) => {
          console.error('❌ Error listening to leads:', error);
          if (syncCallbacks.onError) syncCallbacks.onError(error);
        }
      );

    unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Start listening to sessions changes
  function listenToSessions(callback) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return null;
    }

    syncCallbacks.onSessionsChange = callback;

    const unsubscribe = db
      .collection('sessions')
      .doc(userId)
      .collection('history')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (snapshot) => {
          const sessions = [];
          snapshot.forEach((doc) => {
            sessions.push({
              id: doc.id,
              ...doc.data()
            });
          });
          console.log('📥 Sessions synced from Firestore:', sessions.length);
          if (callback) callback(sessions);
        },
        (error) => {
          console.error('❌ Error listening to sessions:', error);
          if (syncCallbacks.onError) syncCallbacks.onError(error);
        }
      );

    unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Save lead with conflict detection
  async function saveLead(pinId, leadData) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return { success: false, error: 'Not initialized' };
    }

    if (!isOnline) {
      console.warn('⚠️ FirestoreSync: Offline - queuing lead save');
      OfflineQueue.add('saveLead', { pinId, leadData });
      return { success: false, queued: true };
    }

    try {
      syncInProgress = true;
      if (syncCallbacks.onSyncStart) syncCallbacks.onSyncStart();

      const docRef = db
        .collection('leads')
        .doc(userId)
        .collection('pins')
        .doc(String(pinId));

      const existingDoc = await docRef.get();
      const now = firebase.firestore.FieldValue.serverTimestamp();

      // Conflict detection
      if (existingDoc.exists) {
        const existing = existingDoc.data();
        const existingVersion = existing._syncVersion || 0;
        const incomingVersion = leadData._syncVersion || 0;

        if (incomingVersion < existingVersion) {
          console.warn('⚠️ FirestoreSync: Conflict detected - server version is newer');
          if (syncCallbacks.onError) {
            syncCallbacks.onError({
              type: 'CONFLICT',
              message: 'Lead was modified elsewhere',
              serverData: existing,
              localData: leadData
            });
          }
          return { success: false, conflict: true, serverData: existing };
        }
      }

      // Strip non-serializable fields (marker, etc)
      const cleanData = { ...leadData };
      delete cleanData.marker; // Remove Leaflet marker object
      
      // Save with version tracking
      const dataToSave = {
        ...cleanData,
        _syncVersion: Date.now(),
        updatedAt: now,
        createdAt: existingDoc.exists ? existingDoc.data().createdAt : now
      };

      await docRef.set(dataToSave, { merge: true });

      console.log('✅ Lead saved to Firestore:', pinId);
      if (syncCallbacks.onSyncEnd) syncCallbacks.onSyncEnd();

      return { success: true };
    } catch (error) {
      console.error('❌ Error saving lead:', error);
      if (syncCallbacks.onError) syncCallbacks.onError(error);
      return { success: false, error: error.message };
    } finally {
      syncInProgress = false;
    }
  }

  // Delete lead
  async function deleteLead(pinId) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return { success: false, error: 'Not initialized' };
    }

    if (!isOnline) {
      console.warn('⚠️ FirestoreSync: Offline - queuing lead delete');
      OfflineQueue.add('deleteLead', { pinId });
      return { success: false, queued: true };
    }

    try {
      syncInProgress = true;
      if (syncCallbacks.onSyncStart) syncCallbacks.onSyncStart();

      await db
        .collection('leads')
        .doc(userId)
        .collection('pins')
        .doc(String(pinId))
        .delete();

      console.log('✅ Lead deleted from Firestore:', pinId);
      if (syncCallbacks.onSyncEnd) syncCallbacks.onSyncEnd();

      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting lead:', error);
      if (syncCallbacks.onError) syncCallbacks.onError(error);
      return { success: false, error: error.message };
    } finally {
      syncInProgress = false;
    }
  }

  // Save session
  async function saveSession(sessionId, sessionData) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return { success: false, error: 'Not initialized' };
    }

    if (!isOnline) {
      console.warn('⚠️ FirestoreSync: Offline - queuing session save');
      OfflineQueue.add('saveSession', { sessionId, sessionData });
      return { success: false, queued: true };
    }

    try {
      syncInProgress = true;
      if (syncCallbacks.onSyncStart) syncCallbacks.onSyncStart();

      const docRef = db
        .collection('sessions')
        .doc(userId)
        .collection('history')
        .doc(String(sessionId));

      const existingDoc = await docRef.get();
      const now = firebase.firestore.FieldValue.serverTimestamp();

      // Conflict detection
      if (existingDoc.exists) {
        const existing = existingDoc.data();
        const existingVersion = existing._syncVersion || 0;
        const incomingVersion = sessionData._syncVersion || 0;

        if (incomingVersion < existingVersion) {
          console.warn('⚠️ FirestoreSync: Conflict detected - server version is newer');
          if (syncCallbacks.onError) {
            syncCallbacks.onError({
              type: 'CONFLICT',
              message: 'Session was modified elsewhere',
              serverData: existing,
              localData: sessionData
            });
          }
          return { success: false, conflict: true, serverData: existing };
        }
      }

      // Strip non-serializable fields
      const cleanData = { ...sessionData };
      delete cleanData.marker;
      
      // Save with version tracking
      const dataToSave = {
        ...cleanData,
        _syncVersion: Date.now(),
        updatedAt: now,
        createdAt: existingDoc.exists ? existingDoc.data().createdAt : now
      };

      await docRef.set(dataToSave, { merge: true });

      console.log('✅ Session saved to Firestore:', sessionId);
      if (syncCallbacks.onSyncEnd) syncCallbacks.onSyncEnd();

      return { success: true };
    } catch (error) {
      console.error('❌ Error saving session:', error);
      if (syncCallbacks.onError) syncCallbacks.onError(error);
      return { success: false, error: error.message };
    } finally {
      syncInProgress = false;
    }
  }

  // Delete session
  async function deleteSession(sessionId) {
    if (!db || !userId) {
      console.error('❌ FirestoreSync: Not initialized');
      return { success: false, error: 'Not initialized' };
    }

    if (!isOnline) {
      console.warn('⚠️ FirestoreSync: Offline - queuing session delete');
      OfflineQueue.add('deleteSession', { sessionId });
      return { success: false, queued: true };
    }

    try {
      syncInProgress = true;
      if (syncCallbacks.onSyncStart) syncCallbacks.onSyncStart();

      await db
        .collection('sessions')
        .doc(userId)
        .collection('history')
        .doc(String(sessionId))
        .delete();

      console.log('✅ Session deleted from Firestore:', sessionId);
      if (syncCallbacks.onSyncEnd) syncCallbacks.onSyncEnd();

      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting session:', error);
      if (syncCallbacks.onError) syncCallbacks.onError(error);
      return { success: false, error: error.message };
    } finally {
      syncInProgress = false;
    }
  }

  // Manual sync trigger
  async function triggerManualSync() {
    if (syncInProgress || !isOnline) {
      console.warn('⚠️ FirestoreSync: Sync already in progress or offline');
      return { success: false };
    }

    console.log('🔄 FirestoreSync: Manual sync triggered');
    return await OfflineQueue.syncAll();
  }

  // Get sync status
  function getSyncStatus() {
    return {
      isOnline,
      syncInProgress,
      queueSize: OfflineQueue.getQueueSize(),
      userId
    };
  }

  // Stop listening to all changes
  function stopListening() {
    unsubscribers.forEach((unsub) => unsub());
    unsubscribers = [];
    console.log('✅ FirestoreSync: Stopped listening to changes');
  }

  // Register callback
  function onSyncStart(callback) {
    syncCallbacks.onSyncStart = callback;
  }

  function onSyncEnd(callback) {
    syncCallbacks.onSyncEnd = callback;
  }

  function onError(callback) {
    syncCallbacks.onError = callback;
  }

  // Public API
  return {
    init,
    listenToLeads,
    listenToSessions,
    saveLead,
    deleteLead,
    saveSession,
    deleteSession,
    triggerManualSync,
    getSyncStatus,
    stopListening,
    onSyncStart,
    onSyncEnd,
    onError
  };
})();

// Expose globally
window.FirestoreSync = FirestoreSync;
console.log('✅ FirestoreSync module loaded');
