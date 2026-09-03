// One-time cleanup service worker for old Bethel Roadbook builds.
// Replaces the old worker at the SAME URL so Safari can update it,
// clears old roadbook caches, stops intercepting navigation, then unregisters itself.

const PREFIX = 'bethel-roadbook-v';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith(PREFIX)).map(k => caches.delete(k))
    );
    await self.clients.claim();
    await self.registration.unregister();
  })());
});

// While any already-open page is still controlled by this cleanup worker,
// always go to the network instead of substituting an old cached roadbook.
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    event.respondWith(fetch(event.request));
  }
});
