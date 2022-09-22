/* eslint-disable indent */
import router from '@/router/index.js'
import { NAVIGATOR_UPDATE_ASSIGNMENTS } from '@/store/actions/navigator'
import store from '@/store/index.js'
import { shouldAddTaskIntoList } from './utils'

export function createTask (obj) {
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  if (shouldAddTaskIntoList(obj.obj)) {
    store.commit('ADD_TASK', obj.obj)
  }
}

export function removeTask (uid) {
  if (uid === store.state.tasks.selectedTask.uid) {
    store.dispatch('asidePropertiesToggle', false)
  }
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  store.commit('REMOVE_TASK', uid)
}

export function updateTask (obj) {
  store.dispatch(NAVIGATOR_UPDATE_ASSIGNMENTS)
  store.dispatch('UPDATE_TASK', obj) // updates task and extracts another tags & colors
  if (shouldAddTaskIntoList(obj.obj)) {
    store.commit('ADD_TASK', obj.obj)
  } else {
    // не убираем из списка прочитанные задачи в списке непрочитанных
    if (router?.currentRoute?.value?.name === 'tasksUnread') return
    //
    store.commit('REMOVE_TASK', obj.obj.uid)
  }
}
