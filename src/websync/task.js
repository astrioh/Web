/* eslint-disable indent */
import store from '@/store/index.js'
import { shouldAddTaskIntoList } from './utils'
import { NAVIGATOR_UPDATE_ASSIGNMENTS } from '@/store/actions/navigator'

export function createTask (obj) {
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  if (shouldAddTaskIntoList(obj.obj)) {
    store.commit('ADD_TASK', obj.obj)
  }
}

export function removeTask (uid) {
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  store.commit('REMOVE_TASK', uid)
}

export function updateTask (obj) {
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  store.dispatch('UPDATE_TASK', obj) // updates task and extracts another tags & colors
  if (shouldAddTaskIntoList(obj.obj)) {
    store.commit('ADD_TASK', obj.obj)
  } else {
    store.commit('REMOVE_TASK', obj.obj.uid)
  }
}
