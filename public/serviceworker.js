const CACHE_NAME = 'version-1';
const index = '/pwa-currency-converter/index.html';
const offline = '/pwa-currency-converter/offline.html';
const icon1 = '/pwa-currency-converter/icons/rates.png';
const icon2 = '/pwa-currency-converter/icons/icon256.png';
const icon3 = '/pwa-currency-converter/icons/foreign_512.png';
const icon4 = '/pwa-currency-converter/icons/foreign_256.png';
const urlsToCache = [index, offline, icon1, icon2, icon3, icon4]

// eslint-disable-next-line @typescript-eslint/no-this-alias
const self = this;


// Install SW 
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log(cache)
      return cache.addAll(urlsToCache)
    })
  )

  self.skipWaiting();
})

// Listen to request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request)
        .catch(() => caches.match(offline));
    })
  )
})

// Activete SW  
self.addEventListener('activate', (event) => {
  const cacheWhiteList = [];

  cacheWhiteList.push(CACHE_NAME)

  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.map(cacheName =>  {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName)
        }
      })
    ))
  )

    // Take control of all clients immediately
    self.clients.claim();
})