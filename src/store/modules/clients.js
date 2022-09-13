import * as CLIENTS from '@/store/actions/clients.js'

const state = {
  selectedClient: null,
  clients: [
    {
      uid: 'c7b8e7cb-7c88-4840-be5d-40cb4f0500cd',
      name: 'Максим Бухарин',
      phone: '88005553535',
      email: 'jojojopa@icloud.com',
      comment: 'Торчит мне шаурму'
    },
    {
      uid: '59aa5531-853f-40cd-a6db-fd07d9713d8b',
      name: 'Егор Пантелеев',
      phone: '88005553535',
      email: 'kakeparake@mail.ru',
      comment: 'это какеоф?'
    }
  ]
}

const actions = {
}

const mutations = {
  [CLIENTS.ADD_NEW_CLIENT]: (state, client) => {
    state.clients.push(client)
    console.log(client)
  },
  [CLIENTS.REMOVE_CLIENT]: (state, clientUid) => {
    state.clients = state.clients.filter(cl => cl.uid !== clientUid)
  },
  [CLIENTS.SELECT_CLIENT]: (state, clientUid) => {
    state.selectedClient = state.clients.filter(cl => cl.uid === clientUid)[0]
  },
  [CLIENTS.CHANGE_CLIENT_NAME]: (state, client) => {
    state.clients.find(cl => cl.uid === client.uid).name = client.name
  }
}

export default {
  state,
  actions,
  mutations
}
