/**
 * Offline Queue Module
 * Manages queued operations when offline and syncs when online
 * 
 * Features:
 * - Queue operations while offline
 * - Automatic sync when online
 * - Max queue size limit (50 operations)
 * - Persistent queue (IndexedDB)
 * - Conflict resolution on sync
 */

const OfflineQueue = (() => {
  const MAX_QUEUE_SIZE = 50;
  const DB_NAME = 'StreetTrackerDB';
  const STORE_NAME = 'syncQueue';
  let queue = [];
  let db = null;
  let isInitialized = false;

  // Initialize IndexedDB
  async function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onerror = () => {
        console.error('❌ IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        db = request.result;
        console.log('✅ IndexedDB initialized');
        resolve(db);
      };

      request.onupgradeneeded = (event) => {
        const database = event.target.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log('✅ IndexedDB store created');
        }
      };
    });
  }

  // Load queue from IndexedDB
  async function loadQueue() {
    if (!db) {
      try {
        await initDB();
      } catch (error) {
        console.warn('⚠️ IndexedDB not available, using memory queue only');
        return;
      }
    }

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        queue = request.result || [];
        console.log('📥 Queue loaded from IndexedDB:', queue.length, 'operations');
        resolve(queue);
      };

      request.onerror = () => {
        console.warn('⚠️ Failed to load queue from IndexedDB');
        resolve([]);
      };
    });
  }

  // Save queue to IndexedDB
  async function saveQueue() {
    if (!db) return;

    return new Promise((resolve) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();

      queue.forEach((op) => {
        store.add(op);
      });

      transaction.oncomplete = () => {
        console.log('💾 Queue saved to IndexedDB:', queue.length, 'operations');
        resolve();
      };

      transaction.onerror = () => {
        console.warn('⚠️ Failed to save queue to IndexedDB');
        resolve();
      };
    });
  }

  // Add operation to queue
  async function add(operation, data) {
    if (queue.length >= MAX_QUEUE_SIZE) {
      console.error('❌ Queue full - max', MAX_QUEUE_SIZE, 'operations');
      return { success: false, error: 'Queue full' };
    }

    const queueItem = {
      id: Date.now(),
      operation,
      data,
      timestamp: new Date().toISOString(),
      retries: 0
    };

    queue.push(queueItem);
    await saveQueue();

    console.log('📝 Operation queued:', operation, '- Queue size:', queue.length);
    return { success: true, queueSize: queue.length };
  }

  // Get queue size
  function getQueueSize() {
    return queue.length;
  }

  // Get queue status
  function getQueueStatus() {
    return {
      size: queue.length,
      maxSize: MAX_QUEUE_SIZE,
      isFull: queue.length >= MAX_QUEUE_SIZE,
      operations: queue.map((op) => ({
        operation: op.operation,
        timestamp: op.timestamp,
        retries: op.retries
      }))
    };
  }

  // Sync all queued operations
  async function syncAll() {
    if (queue.length === 0) {
      console.log('✅ Queue is empty - nothing to sync');
      return { success: true, synced: 0 };
    }

    console.log('🔄 Syncing queue:', queue.length, 'operations');
    let synced = 0;
    let failed = 0;
    const failedOps = [];

    for (const queueItem of queue) {
      try {
        const result = await executeOperation(queueItem);

        if (result.success) {
          synced++;
        } else if (result.conflict) {
          console.warn('⚠️ Conflict on operation:', queueItem.operation);
          failedOps.push(queueItem);
        } else {
          queueItem.retries++;
          if (queueItem.retries < 3) {
            failedOps.push(queueItem);
          } else {
            console.error('❌ Max retries exceeded for:', queueItem.operation);
            failed++;
          }
        }
      } catch (error) {
        console.error('❌ Error executing operation:', error);
        queueItem.retries++;
        if (queueItem.retries < 3) {
          failedOps.push(queueItem);
        } else {
          failed++;
        }
      }
    }

    // Update queue with failed operations
    queue = failedOps;
    await saveQueue();

    console.log(`✅ Sync complete: ${synced} synced, ${failed} failed, ${queue.length} remaining`);
    return { success: true, synced, failed, remaining: queue.length };
  }

  // Execute single operation
  async function executeOperation(queueItem) {
    const { operation, data } = queueItem;

    if (!window.FirestoreSync) {
      throw new Error('FirestoreSync not available');
    }

    switch (operation) {
      case 'saveLead':
        return await window.FirestoreSync.saveLead(data.pinId, data.leadData);

      case 'deleteLead':
        return await window.FirestoreSync.deleteLead(data.pinId);

      case 'saveSession':
        return await window.FirestoreSync.saveSession(data.sessionId, data.sessionData);

      case 'deleteSession':
        return await window.FirestoreSync.deleteSession(data.sessionId);

      default:
        throw new Error('Unknown operation: ' + operation);
    }
  }

  // Clear queue
  async function clear() {
    queue = [];
    await saveQueue();
    console.log('✅ Queue cleared');
  }

  // Public API
  return {
    add,
    getQueueSize,
    getQueueStatus,
    syncAll,
    clear,
    loadQueue,
    saveQueue,
    executeOperation,
    queue // Expose queue for manual iteration
  };
})();

// Expose globally
window.OfflineQueue = OfflineQueue;

// Initialize queue on load
document.addEventListener('DOMContentLoaded', async () => {
  await OfflineQueue.loadQueue();
  console.log('✅ OfflineQueue module loaded');
});
