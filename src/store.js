import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const restUrl = process.env.VUE_APP_API_REST_URL
const requestServiceUrl = '/request'

export default new Vuex.Store({
  state: {
    requests: []
  },
  actions: {
    SAVE_REQUEST: ({ commit, state }, { request }) => {
      return axios.post(`${restUrl}/${requestServiceUrl}`)
        .then(response => {
          commit('ADD_REQUEST', { request: response.data })
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mutations: {
    ADD_REQUEST: (state, { request }) => {
      state.requests.push(request)
    }
  },
  getters: {
    request: state => {
      return state.requests
    }
  }
})
