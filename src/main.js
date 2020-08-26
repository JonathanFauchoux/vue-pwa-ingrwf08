import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import './registerServiceWorker'

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyBjrYtUgt0nOmSKTZokTPhfYjuZC3UC1Sg",
    authDomain: "todolala-5310e.firebaseapp.com",
    databaseURL: "https://todolala-5310e.firebaseio.com",
    projectId: "todolala-5310e",
    storageBucket: "todolala-5310e.appspot.com",
    messagingSenderId: "695587541352",
    appId: "1:695587541352:web:0dfd800f2f68f1129286dd",
    measurementId: "G-PLGDZXB9DQ"
  
}

firebase.initializeApp(config)

export const db = firebase.firestore()

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')