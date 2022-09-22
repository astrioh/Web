import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/board',
    name: 'board',
    component: () => import('@/components/Boards'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/board/:board_id',
    name: 'boardWithChildren',
    component: () => import('@/components/Board/BoardWithChildren.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/board/:board_id/stats',
    name: 'boardStats',
    component: () => import('@/components/BoardStats.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/board/:board_id/form_settings',
    name: 'boardWithForm',
    component: () => import('@/components/Board/BoardWithForm.vue'),
    beforeEnter: shouldRedirectToLogin
  }
]
