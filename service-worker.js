const CACHE_NAME = "rwa-parking-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./logo.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {

  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {

  event.respondWith(
    caches.match(event.request)
      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request);

      })
  );

});
