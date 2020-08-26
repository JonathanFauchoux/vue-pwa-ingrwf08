// Inside vue.config.js
module.exports = {
    // ...other vue-cli plugin options...
    pwa: {
      name: 'My App',
      themeColor: '#4DBA87',
      
      msTileColor: '#000000',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      manifestOptions: {
        background_color: "#fff",
        short_name: "PWA_ingrwf08",
      },
  
      // configure the workbox plugin
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        // swSrc is required in InjectManifest mode.
        swSrc: './src/service-worker.js',
        // ...other Workbox options...
      }
    }
  }