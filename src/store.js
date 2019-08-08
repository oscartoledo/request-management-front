import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const restUrl = process.env.VUE_APP_API_REST_URL
const requestServiceUrl = 'request'
const deviceServiceUrl = 'device'

export default new Vuex.Store({
  state: {
    requests: [],
    devices: []
  },
  actions: {
    SAVE_REQUEST: ({ commit, state }, { request }) => {
      return axios.post(`${restUrl}/${requestServiceUrl}`, request)
        .then(response => {
          commit('ADD_REQUEST', { request: response.data })
        })
        .catch(error => {
          console.error(error.response.status)
        })
    },

    GET_DEVICES: ({ commit, state }) => {
      return axios.get(`${restUrl}/${deviceServiceUrl}`)
        .then(response => {
          commit('SET_DEVICES', { devices: response.data })
        })
        .catch(error => {
          console.error(error.response.status)
        })
    }
  },
  mutations: {
    ADD_REQUEST: (state, { request }) => {
      state.requests.push(request)
    },

    SET_DEVICES: (state, { devices }) => {
      state.devices = devices
    }
  },
  getters: {
    requests: state => {
      return state.requests
    },

    getDevices: state => {
      return state.devices
    }
  }
})
