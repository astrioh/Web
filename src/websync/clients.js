import store from '@/store/index.js'
import * as CLIENTS from '@/store/actions/clients.js'

export function createClient (obj) {
  store.commit(CLIENTS.ADD_NEW_CLIENT, obj.obj)
}

export function removeClient (obj) {
  store.commit(CLIENTS.REMOVE_CLIENT, obj.obj)
}

export function updateClient (obj) {
  store.commit(CLIENTS.UPDATE_CLIENT, obj.obj)
}
