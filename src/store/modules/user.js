import axios from 'axios'
import {
  USER_CHANGE_PHONE,
  USER_CHANGE_PHOTO,
  USER_ERROR, USER_INVITE_ME, USER_REQUEST,
  USER_SUCCESS
} from '../actions/user'
import * as SLIDES from '@/store/actions/slides.js'

const state = {
  user: null,
  status: ''
}

const getters = {}

const actions = {
  [USER_REQUEST]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      commit(USER_REQUEST)
      const url = process.env.VUE_APP_LEADERTASK_API + 'api/v1/account/info'
      axios({ url: url, method: 'GET' })
        .then((resp) => {
          commit('ChangeCurrentUserObj', resp.data)
          commit(USER_SUCCESS, resp)
          if (state.user.current_user_email !== state.user.owner_email) {
            commit(SLIDES.CHANGE_VISIBLE, { name: 'addEmployees', visible: false })
          }
          resolve(resp)
        })
        .catch((err) => {
          commit(USER_ERROR, err)
          reject(err)
        })
    })
  },
  [USER_CHANGE_PHOTO]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + 'api/v1/account/foto'
      axios({
        data: data.file,
        url: url,
        method: 'PATCH'
      })
        .then((resp) => {
          dispatch(USER_REQUEST).then((resp) => {
            commit(USER_CHANGE_PHOTO)
            resolve(resp)
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [USER_CHANGE_PHONE]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url = process.env.VUE_APP_LEADERTASK_API + 'api/v1/account/phone'
      axios({
        data: data,
        url: url,
        method: 'PATCH'
      })
        .then((resp) => {
          commit('ChangeCurrentUserObj', resp.data)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  [USER_INVITE_ME]: ({ commit, dispatch }, data) => {
    return new Promise((resolve, reject) => {
      const url =
        process.env.VUE_APP_LEADERTASK_API +
        'api/v1/emp/acceptinvite?uid=' +
        data.uid +
        '&accept=' +
        data.accept
      axios({
        url: url,
        method: 'POST'
      })
        .then((resp) => {
          commit('ChangeCurrentUserObj', resp.data)
          resolve(resp)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [USER_CHANGE_PHOTO]: (state, data) => {
    state.user.foto_link = state.user.foto_link + '&Z=' + Date.now()
  },
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.hasLoadedOnce = true
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  ChangeCurrentUserName: (state, name) => {
    if (state.user) {
      state.user.current_user_name = name
    }
  },
  ChangeCurrentUserObj: (state, user) => {
    state.user = user
    console.log('current user', state.user)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
