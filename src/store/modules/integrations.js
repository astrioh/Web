import axios from 'axios'
import * as YANDEX from '@/store/actions/yandexInt.js'

const state = {
  integrations: {
    yandex: {
      name: 'Яндекс.Почта',
      path: 'yandex',
      loginPassword: [],
      isIntegrated: false,
      msgs: []
    }
  }
}

const actions = {
  [YANDEX.GET_ORGANIZATION_INTEGRATION]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'isOrganizationIntegrated?organization=' + organization
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          commit(YANDEX.GET_ORGANIZATION_INTEGRATION, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе организации')
          reject(err)
        })
    })
  },
  [YANDEX.YANDEX_REMOVE_EMAIL_INTEGRATION]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'removeIntegration?organization=' + organization
      axios({ url: url, method: 'DELETE' })
        .then((resp) => {
          commit(YANDEX.YANDEX_REMOVE_EMAIL_INTEGRATION)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [YANDEX.IMAP_GET_ORGANIZATION_MSGS_YANDEX_MAIL]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      console.log(data)
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexMailMsgs'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          console.log('imap msgs get successfully')
          commit(YANDEX.IMAP_GET_ORGANIZATION_MSGS_YANDEX_MAIL, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе imap')
          reject(err)
        })
    })
  }
}

const mutations = {
  [YANDEX.IMAP_GET_ORGANIZATION_MSGS_YANDEX_MAIL]: (state, data) => {
    state.integrations.yandex.msgs = data
    state.integrations.yandex.isIntegrated = true
  },
  [YANDEX.GET_ORGANIZATION_INTEGRATION]: (state, data) => {
    if (data.length) {
      state.integrations.yandex.isIntegrated = true
    }
  },
  [YANDEX.YANDEX_REMOVE_EMAIL_INTEGRATION]: (state) => {
    state.integrations.yandex.isIntegrated = false
  }
}

export default {
  state,
  actions,
  mutations
}
