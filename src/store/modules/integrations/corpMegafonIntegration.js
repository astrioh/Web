import axios from 'axios'
import * as CORP_MEGAFON from '@/store/actions/integrations/corpoMegafonInt'

const state = {
  // Ключ, указанный в ЛК Мегафон
  atsKey: null,
  // Ключ, который придумывает сам пользователь
  crmKey: null,
  isIntegrated: false,
  // Сотрудники, указанные в ЛК Мегафон
  megafonUsers: []
}

const actions = {
  [CORP_MEGAFON.MEGAFON_CREATE_INTEGRATION]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexIntegrateOrganization'
      axios({ url: url, method: 'POST', data: data })
        .then((resp) => {
          commit(CORP_MEGAFON.YANDEX_CREATE_CORP_EMAIL_INTEGRATION, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе организации')
          reject(err)
        })
    })
  },
  [CORP_MEGAFON.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexOrganizationLogPass?organization=' + organization
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          commit(CORP_MEGAFON.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          console.log('ошибка при запросе организации')
          reject(err)
        })
    })
  },
  [CORP_MEGAFON.YANDEX_REMOVE_CORP_EMAIL_INTEGRATION]: ({ commit, dispatch }, organization) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexRemoveCorpIntegration?organization=' + organization
      axios({ url: url, method: 'DELETE' })
        .then((resp) => {
          commit(CORP_MEGAFON.YANDEX_REMOVE_CORP_EMAIL_INTEGRATION)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [CORP_MEGAFON.YANDEX_GET_CORP_MESSAGES_SENT_FROM_US]: ({ commit, dispatch }, emails) => {
    return new Promise((resolve, reject) => {
      const data = {
        ya_login: state.login,
        ya_password: state.password,
        reciever_email: emails.clientEmail
      }
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexCorpMsgsSentFromUs'
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
  [CORP_MEGAFON.YANDEX_GET_CORP_MESSAGES_SENT_TO_US]: ({ commit, dispatch }, emails) => {
    return new Promise((resolve, reject) => {
      const data = {
        ya_login: state.login,
        ya_password: state.password,
        sender_email: emails.clientEmail
      }
      const url = process.env.VUE_APP_INSPECTOR_API + 'yandexCorpMsgsSentToUs'
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
  [CORP_MEGAFON.YANDEX_CREATE_CORP_EMAIL_INTEGRATION]: (state, data) => {
    state.isIntegrated = data
  },
  [CORP_MEGAFON.YANDEX_GET_ORGANIZATION_LOGIN_AND_PASS]: (state, data) => {
    if (data.length) {
      state.login = data[0].ya_login
      state.password = data[0].ya_password
      state.isIntegrated = true
    }
  },
  [CORP_MEGAFON.YANDEX_REMOVE_CORP_EMAIL_INTEGRATION]: (state) => {
    state.isIntegrated = false
  }
}

export default {
  state,
  actions,
  mutations
}
