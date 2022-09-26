import store from '@/store/index.js'
import { computed } from 'vue'

const selectedCardUid = computed(() => store.state.cards.selectedCardUid)

export function createCardMessage (obj) {
  if ('uid_card' in obj && obj.uid_card === selectedCardUid.value) {
    store.commit('CARD_CREATE_MESSAGE_REQUEST', obj.obj)
  }
}

export function removeCardMessage (obj) {
  if ('uid_card' in obj && obj.uid_card === selectedCardUid.value) {
    const data = { uid: obj.obj.uid, key: 'deleted', value: 1 }
    store.commit('CARD_CHANGE_MESSAGE', data)
  }
}

export function removeCardFileMessage (uid) {
  store.commit('CARD_REMOVE_MESSAGE_LOCALLY', { uid: uid })
}
