const CACHE_NAME = 'version-1';
const index = '/pwa-currency-converter/index.html';
const offline = '/pwa-currency-converter/offline.html';
const urlsToCache = [index, offline]

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
})

// Listen to request
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then(() => {
      return fetch(event.request).catch(() => {
        return caches.match(offline)
      })
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

})