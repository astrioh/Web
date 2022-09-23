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
        children: [
          {
            path: '',
            name: 'currentReglament',
            component: () => import('@/components/Reglaments/ReglamentContent.vue')
          },
          {
            path: 'history',
            name: 'reglamentHistory',
            component: () => import('@/components/Reglaments/ReglamentHistoryChanges.vue')
          }
        ]
      }
    ]
  }
]
