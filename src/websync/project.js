import store from '@/store/index.js'
import router from '@/router'
import * as NAVIGATOR from '@/store/actions/navigator'
import * as PROJECT from '@/store/actions/projects'

export function createProject (obj) {
  const projects = store.state.navigator.navigator.new_private_projects[1].items
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].uid === obj.obj.uid) return
  }
  store.commit(PROJECT.PUSH_PROJECT, [obj.obj])
  store.commit(NAVIGATOR.NAVIGATOR_PUSH_COMMON_PROJECT, [obj.obj])
}

export function removeProject (obj) {
  if (router.currentRoute.value.fullPath === `/project/${obj.uid}`) {
    router.push('/doitnow')
    if (store.state.navigator.submenu.status === true) {
      store.state.navigator.submenu.status = false
    }
  }
  store.commit(NAVIGATOR.NAVIGATOR_REMOVE_PROJECT, { uid_parent: '', uid: obj.uid })
  store.commit(PROJECT.REMOVE_PROJECT_REQUEST, obj.uid)
}

export function updateProject (obj) {
  store.commit('NAVIGATOR_UPDATE_PROJECT', obj.obj)
}
