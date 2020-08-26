const version = 5
const oldVersion = version -1

self.addEventListener('install', event =>{
  console.log('install ' + version)
  return self.skipWaiting()
})

self.addEventListener('activate', event => {
  console.log('activate')
  event.waitUntil(
    caches.delete('design' + oldVersion),
    caches.delete('api' + oldVersion)
  )
})

workbox.setConfig({
    debug: false
  });
  
  workbox.precaching.precacheAndRoute([]);
  
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "images",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 jours
        })
      ]
    })
  );
  workbox.routing.registerRoute(
    /\.(?:css|html|js)$/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: "fichiers",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 jours
        })
      ]
    })
  );
 /*  workbox.routing.registerRoute(
    "https://some-fancy-api.com",
    workbox.strategies.NetworkFirst({
      cacheName: "api"
    })
  ); */
  
  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "googleapis",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30
        })
      ]
    })
  );