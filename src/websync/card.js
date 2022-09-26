import store from '@/store/index.js'
import { CHANGE_CARD, DELETE_CARD, INSPECTOR_CARD_REQUEST } from '@/store/actions/cards'
import { computed } from 'vue'
import * as CARD from '@/store/actions/cards'

const selectedCard = computed(() => store.state.cards.selectedCard)
export function createCard (obj) {
  obj.obj.uid_client = ''
  obj.obj.client_name = ''
  obj.obj.date_reminder = ''

  store.commit(CHANGE_CARD, obj.obj)
}

export function removeCard (uid) {
  if (selectedCard.value && uid === selectedCard.value?.uid) {
    selectedCard.value = ''
    store.dispatch('asidePropertiesToggle', false)
    store.commit(CARD.SELECT_CARD, false)
  }
  store.commit(DELETE_CARD, uid)
}

export function updateCard (obj) {
  store.dispatch(INSPECTOR_CARD_REQUEST, obj.obj.uid).then(resp => {
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
