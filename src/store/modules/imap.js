import axios from 'axios'
import * as IMAP from '@/store/actions/imap.js'

const state = {
  user_msgs: []
}

const actions = {
  [IMAP.IMAP_GET_USER_MSGS]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'imapProtocol'
      const userData = {
        userEmail: 'cesarhalyrez',
        userPassword: 'djincaxfuizwlcqe'
      }
      axios({ url: url, method: 'POST', data: userData })
        .then((resp) => {
          console.log('imap msgs get successfully')
          commit(IMAP.IMAP_GET_USER_MSGS, resp.data)
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
  [IMAP.IMAP_GET_USER_MSGS]: (state, data) => {
    state.user_msgs = data
  }
}

export default {
  state,
  actions,
  mutations
}
