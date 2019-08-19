import Vue from 'vue'
import Vuex from 'vuex'
import geo from './modules/geo'
import home from './modules/home'

Vue.use(Vuex)

const modules = { geo, home }

const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? { province, city } : { province: '', city: '' })
    const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])
  }
}

export default {
  modules,
  actions
}
