import * as CARD from '@/store/actions/cards'
import {
  CHANGE_CARD,
  DELETE_CARD,
  INSPECTOR_CARD_REQUEST
} from '@/store/actions/cards'
import store from '@/store/index.js'
import { computed } from 'vue'

const selectedCardUid = computed(() => store.state.cards.selectedCardUid)

export function createCard (obj) {
  obj.obj.uid_client = ''
  obj.obj.client_name = ''
  obj.obj.date_reminder = ''

  store.commit(CHANGE_CARD, obj.obj)
}

export function removeCard (uid) {
  if (uid === selectedCardUid.value) {
    store.dispatch('asidePropertiesToggle', false)
    store.commit(CARD.SELECT_CARD, '')
  }
  store.commit(DELETE_CARD, uid)
}

export function updateCard (obj) {
  store.dispatch(INSPECTOR_CARD_REQUEST, obj.obj.uid).then((resp) => {
    obj.obj.uid_client = ''
    obj.obj.client_name = ''
    obj.obj.date_reminder = ''

    if (resp.data) {
      obj.obj.uid_client = resp.data.uid_client
      obj.obj.client_name = resp.data.client_name
      obj.obj.date_reminder = resp.data.date_reminder
    }

    store.commit(CHANGE_CARD, obj.obj)
  })
}
