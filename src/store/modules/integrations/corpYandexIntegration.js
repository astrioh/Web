import axios from 'axios'
import * as YANDEX from '@/store/actions/integrations/yandexInt.js'

const state = {
  login: '',
  password: '',
  isIntegrated: false
}

const actions = {
  [YANDEX.YANDEX_CREATE_CORP_EMAIL_INTEGRATION]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexIntegrateOrganization'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          commit(YANDEX.YANDEX_CREATE_EMAIL_INTEGRATION, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе организации')
          reject(err)
        })
    })
  },
  [YANDEX.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexOrganizationLogPass?organization=' + organization
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          commit(YANDEX.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе организации')
          reject(err)
        })
    })
  },
  [YANDEX.YANDEX_REMOVE_CORP_EMAIL_INTEGRATION]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexRemoveIntegration?organization=' + organization
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
  [YANDEX.YANDEX_GET_CORP_MESSAGES_SENT_FROM_US]: ({ commit, dispatch }, emails) => {
    return new Promise((resolve, reject) => {
      const data = {
        ya_login: state.login,
        ya_password: state.password,
        reciever_email: emails.clientEmail,
        organization_email: emails.organizationEmail
      }
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexMsgsSentFromUs'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          console.log('imap msgs get successfully')
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе imap')
          reject(err)
        })
    })
  },
  [YANDEX.YANDEX_GET_CORP_MESSAGES_SENT_TO_US]: ({ commit, dispatch }, emails) => {
    return new Promise((resolve, reject) => {
      const data = {
        ya_login: state.login,
        ya_password: state.password,
        sender_email: emails.clientEmail,
        organization_email: emails.organizationEmail
      }
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexMsgsSentToUs'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          console.log('imap msgs get successfully')
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
  [YANDEX.YANDEX_CREATE_CORP_EMAIL_INTEGRATION]: (state, data) => {
    state.isIntegrated = data
  },
  [YANDEX.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS]: (state, data) => {
    if (data.length) {
      state.login = data[0].ya_login
      state.password = data[0].ya_password
      state.isIntegrated = true
    }
  },
  [YANDEX.YANDEX_REMOVE_CORP_EMAIL_INTEGRATION]: (state) => {
    state.isIntegrated = false
  }
}

export default {
  state,
  actions,
  mutations
}
