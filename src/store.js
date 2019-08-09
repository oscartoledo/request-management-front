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
    devices: [],
    system: {
      error: {
        message: '',
        show: false
      }
    }
  },
  actions: {
    GET_REQUESTS: ({ commit, state }) => {
      return axios.get(`${restUrl}/${requestServiceUrl}`)
        .then(response => {
          commit('SET_REQUESTS', { devices: response.data })

          return response.data
        })
        .catch(error => {
          let message = error.response.data.message
          commit('SHOW_ERROR', { message })
        })
    },

    SAVE_REQUEST: ({ commit, state }, { request }) => {
      return axios.post(`${restUrl}/${requestServiceUrl}`, request)
        .then(response => {
          commit('ADD_REQUEST', { request: response.data })

          return response.data
        })
        .catch(error => {
          let message = error.response.data.message
          commit('SHOW_ERROR', { message })
        })
    },

    ClOSE_REQUEST: ({ commit, state }, { request, index }) => {
      return axios.put(`${restUrl}/${requestServiceUrl}/${request.id}/close`)
        .then(response => {
          commit('UPDATE_REQUEST', { request: response.data, index: index })

          return response.data
        })
        .catch(error => {
          let message = error.response.data.message
          commit('SHOW_ERROR', { message })
        })
    },

    GET_DEVICES: ({ commit, state }) => {
      return axios.get(`${restUrl}/${deviceServiceUrl}`)
        .then(response => {
          commit('SET_DEVICES', { devices: response.data })
        })
        .catch(error => {
          let message = error.response.data.message
          commit('SHOW_ERROR', { message })
        })
    }
  },
  mutations: {
    SET_REQUESTS: (state, { devices }) => {
      state.requests = devices
    },

    ADD_REQUEST: (state, { request }) => {
      state.requests.push(request)
    },

    UPDATE_REQUEST: (state, { request, index }) => {
      Object.assign(state.requests[index], request)
    },

    SET_DEVICES: (state, { devices }) => {
      state.devices = devices
    },

    SHOW_ERROR: (state, { message }) => {
      state.system.error.show = true
      state.system.error.message = message

      setTimeout(() => {
        state.system.error.show = false
        state.system.error.message = ''
      }, 5000)
    }
  },
  getters: {
    getRequests: state => {
      return state.requests
    },

    getDevices: state => {
      return state.devices
    },

    getSystem: state => {
      return state.system
    }
  }
})
