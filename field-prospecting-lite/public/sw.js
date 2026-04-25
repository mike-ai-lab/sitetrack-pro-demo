/**
 * Service Worker for Field Prospecting Lite
 * Keeps the app alive in the background so GPS tracking continues
 * even when the browser tab is backgrounded on mobile.
 */

const CACHE_NAME = 'field-prospecting-lite-v2';
const PRECACHE = [
    '/',
    '/index.html',
    '/assets/app.js',
    '/assets/styles.css'
];

// Install: pre-cache app shell
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

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: serve from cache with network fallback
self.addEventListener('fetch', event => {
    const url = event.request.url;
    
    // Skip non-http(s) schemes
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return;
    }
    
    // Skip external APIs (tiles, routing, geocoding)
    if (url.includes('basemaps.cartocdn.com') || 
        url.includes('router.project-osrm.org') ||
        url.includes('nominatim') ||
        url.includes('cdn.tailwindcss.com') ||
        url.includes('unpkg.com')) {
        return; // let these go straight to network
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

// Background sync message from page
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'KEEP_ALIVE') {
        // Acknowledge - keeps SW active, which keeps GPS running on mobile
        event.ports && event.ports[0] && event.ports[0].postMessage({ ack: true });
    }
});
