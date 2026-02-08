const CACHE_NAME = 'pk-travel-games-v1';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'games.php',
  'sql-wasm.js',
  'sql-wasm.wasm',
  'css/style.css',
  'js/main.js',
  'images/logo.png',
  'images/pigeon.png',
  'images/frontal.png',
  'images/espion.png'
];

// Installation - mise en cache des ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache ouvert');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation - nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - stratégie Network First avec fallback sur cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone la réponse pour la mettre en cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Si réseau indisponible, utiliser le cache
        return caches.match(event.request);
      })
  );
});
