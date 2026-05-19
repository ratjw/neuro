
const CACHE_NAME = 'network-first-cache-v1';

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Clone the response so it can be consumed by both the browser and cache
        const responseToCache = networkResponse.clone();
        
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        
        return networkResponse;
      })
      .catch(() => {
        // Fallback to the cache if the network request fails (e.g., offline)
        return caches.match(event.request);
      })
  );
});
