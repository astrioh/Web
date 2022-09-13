import * as CLIENTS from '@/store/actions/clients.js'
import axios from 'axios'

const state = {
  selectedClient: null,
  clients: []
}

const actions = {
  [CLIENTS.GET_CLIENTS]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url =
        process.env.VUE_APP_INSPECTOR_API + 'clients?organization=' + organization
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          commit(CLIENTS.SET_CLIENTS, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [CLIENTS.ADD_NEW_CLIENT]: ({ commit, dispatch }, client) => {
    return new Promise((resolve, reject) => {
      const url =
        process.env.VUE_APP_INSPECTOR_API + 'clients'
      axios({ url: url, method: 'POST', data: client })
        .then((resp) => {
          commit(CLIENTS.ADD_NEW_CLIENT, client)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [CLIENTS.SET_CLIENTS]: (state, clients) => {
    state.clients = clients
  },
  [CLIENTS.ADD_NEW_CLIENT]: (state, client) => {
    state.clients.push(client)
  },
  [CLIENTS.REMOVE_CLIENT]: (state, clientUid) => {
    state.clients = state.clients.filter(cl => cl.uid !== clientUid)
  },
  [CLIENTS.SELECT_CLIENT]: (state, clientUid) => {
    state.selectedClient = state.clients.filter(cl => cl.uid === clientUid)[0]
  },
  [CLIENTS.CHANGE_CLIENT_NAME]: (state, client) => {
    state.clients.find(cl => cl.uid === client.uid).name = client.name
  }
}

export default {
  state,
  actions,
  mutations
}
