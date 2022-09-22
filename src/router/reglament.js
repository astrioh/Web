import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/reglaments',
    beforeEnter: shouldRedirectToLogin,
    children: [
      {
        path: '',
        name: 'reglaments',
        component: () => import('@/components/Reglaments/Reglaments.vue')
      },
      {
        path: ':id',
        name: 'currentReglament',
        component: () => import('@/components/Reglaments/ReglamentContent.vue')
      }
    ]
  }
]
