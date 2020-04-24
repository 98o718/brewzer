importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}

// SETTINGS

// Path prefix to load modules locally
// workbox.setConfig({
//   modulePathPrefix: 'workbox-v4.3.0/',
// })

// Turn on logging
workbox.setConfig({
  debug: true,
})

// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting()
workbox.core.clientsClaim()

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

// RUNTIME CACHING

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)api/,
  workbox.strategies.networkFirst(),
)

// API with cache-first strategy
// workbox.routing.registerRoute(
//   /(http[s]?:\/\/)?([^\/\s]+\/)favorites/,
//   workbox.strategies.cacheFirst()
// )
