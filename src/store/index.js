import { createStore } from 'vuex'
import axios from 'axios'
import { darkModeKey } from '@/config.js'
import corpMegafonIntegration from './modules/integrations/corpMegafonIntegration'
import corpYandexIntegration from './modules/integrations/corpYandexIntegration'
import personalYandexIntegration from './modules/integrations/personalYandexIntegration'
import auth from './modules/auth'
import navigator from './modules/navigator'
import calendar from './modules/calendar'
import user from './modules/user'
import onboarding from '@/store/modules/onboarding.js'
import slides from '@/store/modules/slides.js'
import tasks from './modules/tasks'
import { setLocalStorageItem } from '@/store/helpers/functions'
import taskfilesandmessages from './modules/taskfilesandmessages'
import cardfilesandmessages from './modules/cardfilesandmessages'
import employees from './modules/employees'
import departments from './modules/departments'
import projects from './modules/projects'
import clients from './modules/clients'
import reglaments from './modules/reglaments'
import reglamentAnswers from './modules/reglament_answers'
import reglamentQuestions from './modules/reglament_questions'
import boards from './modules/boards'
import cards from './modules/cards'
import colors from './modules/colors'
import localization from './modules/localization'
import inspector from './modules/inspector'
import notificationtasks from './modules/notification_tasks'
import tabs from './modules/tabs'
import clientfilesandmessages from './modules/clientfilesandmessages'
import boardforms from './modules/boardforms'

export default createStore({
  state: {
    /* Main section state. Possible values: 'tasks', 'greed' */
    mainSectionState: 'tasks',
    isGridView: true,

    /* Properties state: (project, task, color, tag, empmloyee) */
    propertiesState: null,

    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* fullScreen - fullscreen form layout (e.g. login page) */
    isFullScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,
    isPropertiesMobileExpanded: false,
    isPropertiesLgActive: false,

    /* Dark mode */
    darkMode: false,

    /* Field focus with ctrl+k (to register only once) */
    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: []
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    }
  },
  actions: {
    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded
      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-80', 'xl:ml-0')
      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },

    asidePropertiesToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isPropertiesMobileExpanded
      document.getElementById('app').classList[isShow ? 'add' : 'remove']('mr-96')
      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')

      commit('basic', {
        key: 'isPropertiesMobileExpanded',
        value: isShow
      })
    },

    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },

    fullScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFullScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('full-screen')
    },

    darkMode ({ commit, state }) {
      const value = !state.darkMode
      document.documentElement.classList[value ? 'add' : 'remove']('dark')
      setLocalStorageItem(darkModeKey, value ? '1' : '0')

      commit('basic', {
        key: 'darkMode',
        value
      })
    },

    fetch ({ commit }, payload) {
      axios
        .get(`data-sources/${payload}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            commit('basic', {
              key: payload,
              value: r.data.data
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  modules: {
    auth,
    navigator,
    calendar,
    user,
    tasks,
    slides,
    corpMegafonIntegration,
    personalYandexIntegration,
    corpYandexIntegration,
    taskfilesandmessages,
    cardfilesandmessages,
    employees,
    departments,
    projects,
    onboarding,
    reglaments,
    clients,
    reglamentQuestions,
    reglamentAnswers,
    boards,
    cards,
    colors,
    localization,
    inspector,
    notificationtasks,
    tabs,
    clientfilesandmessages,
    boardforms
  }
})
