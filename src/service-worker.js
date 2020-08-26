const version = 7
const oldVersion = version -1




self.addEventListener('install', () =>{
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
/*
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
  
/*  workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
      cacheName: "googleapis",
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30
        })
      ]
    })
  ); */

  // test doc

  // These JavaScript module imports need to be bundled:
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST);
/* registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({cacheName: 'images'}),
); */
registerRoute(
  ({request}) => request.destination === 'image',
  ({cacheName: 'images'}),
);

// Etc.
registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

registerRoute(
  "https://todolala-5310e.firebaseio.com",
  new CacheFirst({
    cacheName: 'url',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);