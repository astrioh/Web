import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/board',
    beforeEnter: shouldRedirectToLogin,
    children: [
      {
        path: '',
        name: 'board',
        component: () => import('@/components/Boards')
      },
      {
        path: ':board_id',
        children: [
          {
            path: '',
            name: 'boardWithChildren',
            component: () => import('@/components/Board/BoardWithChildren.vue')
          },
          {
            path: 'archive',
            name: 'boardArchive',
            component: () => import('@/components/Board/BoardWithChildren.vue'),
            props: { showArchive: true }
          },
          {
            path: 'stats',
            name: 'boardStats',
            component: () => import('@/components/BoardStats.vue')
          },
          {
            path: 'form_settings',
            name: 'boardWithForm',
            component: () => import('@/components/Board/BoardWithForm.vue')
          }
        ]
      }
    ]
  }
]
