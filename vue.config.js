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
      iconPaths:{
        favicon32: 'src/assets/logo_96.png',
        favicon16: 'src/assets/logo_48.png',
        appleTouchIcon: 'src/assets/logo_96.png',
        maskIcon: 'src/assets/logo_48.png',
        msTileImage: 'src/assets/logo_48.png'
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