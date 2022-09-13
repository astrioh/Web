import * as CLIENT_FILES_AND_MESSAGES from '../actions/clientfilesandmessages'

const state = {
  messages: [],
  files: [],
  status: 'loading'
}

const getters = {}

const actions = {
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: ({ commit, dispatch }, data) => {
    commit(CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST, data)
  }
}

const mutations = {
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: (state, data) => {
    state.messages.push(data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
