const version = 1

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
    new RegExp("https://some-fancy-api.com"),
    new workbox.strategies.NetworkFirst({
      cacheName: "api"
    })
  );
  
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