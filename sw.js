/**
 * sw.js — Service Worker for LiveProspect background operation
 * Keeps the app alive in the background so GPS tracking continues
 * even when the browser tab is backgrounded on mobile.
 */

const CACHE_NAME = 'streettrack-v1';
const PRECACHE = [
    '/',
    '/index.html',
    '/panel.js',
    '/live.js',
    '/history-modal.js'
];

// ── Install: pre-cache app shell ─────────────────────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE).catch(err => {
                console.warn('[SW] Pre-cache partial failure:', err);
            });
        })
    );
    self.skipWaiting();
});

// ── Activate: clean old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// ── Fetch: serve from cache with network fallback ────────────────────────────
self.addEventListener('fetch', event => {
    // Let nominatim/tile requests go straight to network
    const url = event.request.url;
    if (url.includes('nominatim') || url.includes('google.com/vt') ||
        url.includes('tile') || url.includes('osrm') || url.includes('router.project-osrm')) {
        return; // don't intercept, fall through to network
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            return cached || fetch(event.request).then(response => {
                // Cache successful GET responses for app files
                if (event.request.method === 'GET' && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => cached); // offline fallback
        })
    );
});

// ── Background sync message from page ────────────────────────────────────────
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'KEEP_ALIVE') {
        // Acknowledge — this keeps the SW active, which in turn keeps
        // the page's GPS watchPosition running longer on mobile browsers
        event.ports && event.ports[0] && event.ports[0].postMessage({ ack: true });
    }
});
