import * as BOARD_FORMS from '@/store/actions/boardforms.js'
import axios from 'axios'

const state = {
  boardForm: {
    uid_board: '',
    info: ''
  }
}
const actions = {
  [BOARD_FORMS.GET_BOARD_FORM_REQUEST]: ({ commit, dispatch }, uidBoard) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_INSPECTOR_API + 'board_forms?uid_board=' + uidBoard
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [BOARD_FORMS.CREATE_OR_UPDATE_BOARD_FORM_REQUEST]: ({ commit, dispatch }, boardForm) => {
    return new Promise((resolve, reject) => {
      const boardFormData = { ...boardForm, info: JSON.stringify(boardForm.info) }
      const url =
        process.env.VUE_APP_INSPECTOR_API + 'board_forms'
      axios({ url: url, method: 'POST', data: boardFormData })
        .then((resp) => {
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {

}

export default {
  state,
  actions,
  mutations
}
