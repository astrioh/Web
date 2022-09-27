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
  },
  isOrganizationIntegratedYandex: false
}

const actions = {
  [YANDEX.GET_ORGANIZATION_INTEGRATION]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      const organization = 'nikita.talykh@leadertask.com'
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
  [YANDEX.IMAP_GET_ORGANIZATION_MSGS_YANDEX_MAIL]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexMailMsgs'
      const userData = {
        userEmail: 'cesarhalyrez',
        userPassword: 'djincaxfuizwlcqe'
      }
      axios({ url: url, method: 'POST', data: userData })
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
  },
  [YANDEX.GET_ORGANIZATION_INTEGRATION]: (state, data) => {
    if (data.length) {
      state.isOrganizationIntegratedYandex = true
    }
  }
}

export default {
  state,
  actions,
  mutations
}
