import store from '@/store/index.js'
import * as NAVIGATOR from '@/store/actions/navigator.js'
import * as REGLAMENTS from '@/store/actions/reglaments.js'
import router from '@/router'

export function createReglament (obj) {
  store.commit(NAVIGATOR.NAVIGATOR_PUSH_REGLAMENT, obj.obj)
  store.commit(REGLAMENTS.CHANGE_REGLAMENT, obj.obj)
}

export function deleteReglament (obj) {
  store.commit(NAVIGATOR.NAVIGATOR_REMOVE_REGLAMENT, obj.obj)
  router.push('/reglaments')
  store.commit('RemoveReglamentByUid', obj.obj)
}

export function updateReglament (obj) {
  store.commit(NAVIGATOR.NAVIGATOR_UPDATE_REGLAMENT, obj.obj)
  store.commit(REGLAMENTS.CHANGE_REGLAMENT, obj.obj)
}
