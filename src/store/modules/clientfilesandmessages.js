import * as CLIENT_FILES_AND_MESSAGES from '../actions/clientfilesandmessages'
import axios from 'axios'

const state = {
  messages: [],
  files: [],
  status: 'success'
}

const getters = {}

const actions = {
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST]: ({ commit, dispatch }, clientUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clients_chat?uid_client=' + clientUid
      axios({ url: url, method: 'GET' })
        .then(resp => {
          console.log('msgs', resp)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: ({ commit, dispatch }, data) => {
    commit(CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST, data)
  },
  [CLIENT_FILES_AND_MESSAGES.DELETE_MESSAGE_REQUEST]: ({ commit, dispatch }, messageUid) => {
    const data = { uid: messageUid, key: 'deleted', value: 1 }
    commit(CLIENT_FILES_AND_MESSAGES.CHANGE_MESSAGE, data)
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_REQUEST]: ({ commit, dispatch }, clientUid) => {
    commit(CLIENT_FILES_AND_MESSAGES.FILES_REQUEST)
    commit(CLIENT_FILES_AND_MESSAGES.FILES_SUCCESS, {})
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST]: ({ commit, dispatch }, data) => {
    commit(CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST, data)
  },
  [CLIENT_FILES_AND_MESSAGES.FILE_REQUEST]: ({ commit, dispatch }, fileUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + 'api/v1/cardsfiles/file?uid=' + fileUid
      axios({ url: url, method: 'GET', responseType: 'blob' })
        .then(resp => {
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.DELETE_FILE_REQUEST]: ({ commit, dispatch }, fileUid) => {
    const data = { uid: fileUid, key: 'deleted', value: 1 }
    commit(CLIENT_FILES_AND_MESSAGES.REMOVE_MESSAGE_LOCALLY, data)
  },
  [CLIENT_FILES_AND_MESSAGES.FETCH_FILES_AND_MESSAGES]: ({ commit, dispatch }, claentUid) => {
    commit(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST)

    const messages = dispatch(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST, claentUid)
    const files = dispatch(CLIENT_FILES_AND_MESSAGES.FILES_REQUEST, claentUid)

    return Promise.all([messages, files])
      .then(() => {
        commit(CLIENT_FILES_AND_MESSAGES.MERGE_FILES_AND_MESSAGES)
      })
  }
}

const mutations = {
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST]: state => {
    state.status = 'loading'
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: (state, data) => {
    state.messages.push(data)
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_REQUEST]: state => {
    state.status = 'loading'
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST]: (state, resp) => {
    // удаляем псевдо файлы, которые отображались как загружаемые, мутируем сам массив
    state.messages = state.messages.filter((message) => !message.is_uploading)
    state.messages = state.messages.concat(resp.data.success)
  },
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_SUCCESS]: (state, resp) => {
    state.messages = resp.data.msgs
    state.status = 'success'
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_SUCCESS]: (state, resp) => {
    state.files = resp.data.files
    state.status = 'success'
  },
  [CLIENT_FILES_AND_MESSAGES.CHANGE_MESSAGE]: (state, data) => {
    for (let i = 0; i < state.messages.length; i++) {
      if (state.messages[i].uid === data.uid) {
        state.messages[i][data.key] = data.value
      }
    }
  },
  [CLIENT_FILES_AND_MESSAGES.REFRESH_FILES]: (state, resp) => {
    state.files = []
  },
  [CLIENT_FILES_AND_MESSAGES.REFRESH_MESSAGES]: (state, resp) => {
    state.messages = []
  },
  [CLIENT_FILES_AND_MESSAGES.MERGE_FILES_AND_MESSAGES]: (state) => {
    state.messages = state.messages.concat(state.files)
    state.messages.sort((a, b) => {
      if (!a.file_name && !a.date_create.includes('Z')) {
        a.date_create += 'Z'
      }
      if (!b.file_name && !b.date_create.includes('Z')) {
        b.date_create += 'Z'
      }
      return new Date(a.date_create) - new Date(b.date_create)
    })
  },
  [CLIENT_FILES_AND_MESSAGES.ADD_MESSAGE_LOCALLY]: (state, message) => {
    state.messages.push(message)
  },
  [CLIENT_FILES_AND_MESSAGES.REMOVE_MESSAGE_LOCALLY]: (state, message) => {
    for (let i = 0; i < state.messages.length; i++) {
      if (message.uid === state.messages[i].uid) {
        state.messages.splice(i, 1)
      }
    }
  },
  addClientMessages (state, messagesArray) {
    state.messages = state.messages.concat(messagesArray)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
