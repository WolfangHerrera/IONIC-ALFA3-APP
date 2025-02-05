// service-worker.js

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-app-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/main.js',
        '/styles.css',
        '/assets/logo.png',
      ]);
    })
  );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = ['my-app-cache'];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
