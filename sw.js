const CACHE_NAME = 'jobdalang-v2'; // NEK UPDATE GANTI V3, V4
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './style.css', // NEK CSS MU TAK PISAH NENG FILE DEWE
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js'
];

// PAS INSTALL, SIMPEN FILE NENG CACHE
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// PAS BUKAK, JIKUK SOKO CACHE SEK
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nek ono neng cache, balekne. Nek raono, jikuk soko jaringan
        return response || fetch(event.request);
      })
  );
});

// PAS AKTIF, HAPUS CACHE LAWAS
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Hapus cache lawas:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// BEN GELEM SKIP WAITING SOKO NOTIF UPDATE
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});