import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: null,
    projets: null
  },
  getters: {
    getItems: state => {
      return state.items
    },
    getProjets: state => {
      return state.projets
    }
  },
  mutations: {
    setItems: state => {
      let items = []

      db.collection('items').orderBy('created_at').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, title: doc.data().title })
        })

        state.items = items
      })
    },

    setProjets: state => {
      let projets = []

      db.collection('projets').orderBy('created_at').onSnapshot((snapshot) => {
        projets = []
        snapshot.forEach((doc) => {
          projets.push({ id: doc.id, title: doc.data().title, message: doc.data().message, lien: doc.data().lien, created_at: doc.data().created_at })
        })

        state.projets = projets
      })
    }
  },
  actions: {
    setItems: context => {
      context.commit('setItems')
    },
    setProjets: context => {
      context.commit('setProjets')
    }
  }
})