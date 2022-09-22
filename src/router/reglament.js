import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/reglaments',
    name: 'reglaments',
    component: () => import('@/components/Reglaments/Reglaments.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/reglaments/:id',
    component: () => import('@/components/Reglaments/ReglamentContent.vue'),
    name: 'currentReglament',
    beforeEnter: shouldRedirectToLogin
  }
]
