import { uuidv4 } from '@/helpers/functions'

import * as CLIENT_FILES_AND_MESSAGES from '../actions/clientfilesandmessages'
import * as CORP_YANDEX from '@/store/actions/integrations/corpoYandexInt.js'
import * as CORP_MEGAFON from '@/store/actions/integrations/corpoMegafonInt.js'
import * as PERSONAL_YANDEX from '@/store/actions/integrations/personalYandexInt.js'

import axios from 'axios'
import store from '@/store/index.js'

const state = {
  messages: [],
  files: [],
  status: 'loading',
  cards: {
    status: 'loading',
    cards: []
  }
}

const getters = {}

const actions = {
  [CLIENT_FILES_AND_MESSAGES.GET_CLIENT_CARDS] ({ commit }, clientUid) {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clients_cards?uid_client=' + clientUid
      axios({ url: url, method: 'GET' })
        .then(resp => {
          commit(CLIENT_FILES_AND_MESSAGES.CLIENT_CARDS_SUCCESS, resp.data.map((card) => { return JSON.parse(card.replace(/[\s]/gi, ' ')) }))
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST]: ({ commit, dispatch }, clientUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clients_chat?uid_client=' + clientUid
      commit(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST)
      axios({ url: url, method: 'GET' })
        .then(resp => {
          console.log('msgs', resp)
          commit(CLIENT_FILES_AND_MESSAGES.MESSAGES_SUCCESS, resp)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clients_chat'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.DELETE_MESSAGE_REQUEST]: ({ commit, dispatch }, messageUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clients_chat?uid_message=' + messageUid
      console.log('store in store', store.state.user.user.owner_email)
      axios({ url: url, method: 'PATCH', data: { organization: store.state.user.user.owner_email } })
        .then((resp) => {
          commit(CLIENT_FILES_AND_MESSAGES.DELETE_MESSAGE_REQUEST, messageUid)
          console.log(resp, 'delete')
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_REQUEST]: ({ commit, dispatch }, clientUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clientfiles?uid_client=' + clientUid
      commit(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST)
      axios({ url: url, method: 'GET' })
        .then(resp => {
          console.log('msgs', resp)
          commit(CLIENT_FILES_AND_MESSAGES.FILES_SUCCESS, resp)
          resolve(resp)
        }).catch(err => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clientsfiles?uid_client=' + data.uid_client + '&uid_creator=' + data.uid_creator
      axios({ url: url, method: 'POST', data: data.name })
        .then((resp) => {
          commit(CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST, ...resp.data.success)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [CLIENT_FILES_AND_MESSAGES.FILE_REQUEST]: ({ commit, dispatch }, fileUid) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'clientfiles/file?uid=' + fileUid
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
  [CLIENT_FILES_AND_MESSAGES.FETCH_FILES_AND_MESSAGES]: ({ commit, dispatch }, data) => {
    commit(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST)
    const messages = dispatch(CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST, data.clientUid)
    const files = dispatch(CLIENT_FILES_AND_MESSAGES.FILES_REQUEST, data.clientUid)

    const promises = [messages, files]

    if (data.corpYandexInt) {
      const yandexCorpMsgsSentFromUs = dispatch(CORP_YANDEX.YANDEX_GET_CORP_MESSAGES_SENT_FROM_US, data)
      const yandexCorpMsgsSentToUs = dispatch(CORP_YANDEX.YANDEX_GET_CORP_MESSAGES_SENT_TO_US, data)
      promises.push(yandexCorpMsgsSentFromUs)
      promises.push(yandexCorpMsgsSentToUs)
    }

    if (data.personalYandexInt) {
      const yandexPersonalMsgsSentFromUs = dispatch(PERSONAL_YANDEX.YANDEX_GET_PERSONAL_MESSAGES_SENT_FROM_US, data)
      const yandexPersonalMsgsSentToUs = dispatch(PERSONAL_YANDEX.YANDEX_GET_PERSONAL_MESSAGES_SENT_TO_US, data)
      promises.push(yandexPersonalMsgsSentFromUs)
      promises.push(yandexPersonalMsgsSentToUs)
    }

    if (data.megafonIntegration) {
      let preparedClientPhone = data.clientPhone
      if (preparedClientPhone[0] === '8') {
        preparedClientPhone[0] = '7'
      }
      preparedClientPhone = data.clientPhone.replaceAll(/(\s|\(|\)|\+|-)/g, '')
      const megafonCallHistory = dispatch(CORP_MEGAFON.GET_CALL_HISTORY, {
        phone: preparedClientPhone,
        crmKey: data.crmKey
      })
        .then(res => ({ res: res, name: 'megafonHistory' }))

      promises.push(megafonCallHistory)
    }

    return Promise.all(promises)
      .then((resp) => {
        console.log('msgs resp', resp)
        console.log('int data', data)
        console.log('promises', promises)
        if (data.megafonIntegration) {
          commit(CLIENT_FILES_AND_MESSAGES.PUSH_CALL_HISTORY, resp.find((promise) => promise.name === 'megafonHistory').res.data)
        }
        if (data.corpYandexInt && data.personalYandexInt) {
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[2].data)
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[3].data)
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[4].data)
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[5].data)
        } else if ((!data.personalYandexInt && data.corpYandexInt) || (data.personalYandexInt && !data.corpYandexInt)) {
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[2].data)
          commit(CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL, resp[3].data)
        }
        commit(CLIENT_FILES_AND_MESSAGES.MERGE_FILES_AND_MESSAGES)
      })
  }
}

const mutations = {
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_REQUEST]: state => {
    state.status = 'loading'
  },
  [CLIENT_FILES_AND_MESSAGES.DELETE_MESSAGE_REQUEST]: (state, messageUid) => {
    for (let i = 0; i < state.messages.length; i++) {
      if (state.messages[i].uid_message === messageUid) {
        state.messages[i].deleted = 1
        return
      }
    }
  },
  [CLIENT_FILES_AND_MESSAGES.PUSH_CALL_HISTORY]: (state, data) => {
    for (let i = 0; i < data.length; i++) {
      state.messages.push({
        type: 'call',
        direction: data[i].type,
        date_create: data[i].start,
        user: data[i].user,
        link: data[i].link,
        uid_message: data[i].id
      })
    }
  },
  [CLIENT_FILES_AND_MESSAGES.PARSE_YANDEX_MAIL]: (state, data) => {
    for (let i = 0; i < data.length; i++) {
      state.messages.push({
        date_create: data[i].date,
        msg: data[i].text,
        emailSender: data[i].from.value[0].address,
        uid_message: uuidv4(),
        isYandex: true
      })
    }
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_MESSAGE_REQUEST]: (state, data) => {
    state.messages.push(data)
  },
  [CLIENT_FILES_AND_MESSAGES.CLIENT_CARDS_SUCCESS]: (state, data) => {
    state.cards.status = 'success'
    state.cards.cards = data
  },
  [CLIENT_FILES_AND_MESSAGES.CREATE_FILES_REQUEST]: (state, data) => {
    state.messages = state.messages.filter((message) => !message.is_uploading)
    state.messages.push(data)
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_REQUEST]: state => {
    state.status = 'loading'
  },
  [CLIENT_FILES_AND_MESSAGES.MESSAGES_SUCCESS]: (state, resp) => {
    state.messages = resp.data
    state.status = 'success'
  },
  [CLIENT_FILES_AND_MESSAGES.FILES_SUCCESS]: (state, resp) => {
    state.files = resp.data
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
  [CLIENT_FILES_AND_MESSAGES.REFRESH_CARDS]: (state) => {
    state.cards.cards = []
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
