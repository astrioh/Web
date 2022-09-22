import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/settings',
    beforeEnter: shouldRedirectToLogin,
    children: [
      {
        path: 'help',
        name: 'help',
        component: () => import('@/components/Settings/Support.vue')
      },
      {
        path: 'tarif',
        name: 'tarif',
        component: () => import('@/components/Settings/Tarif.vue')
      },
      {
        path: 'options',
        name: 'options',
        component: () => import('@/components/Settings/Options.vue')
      },
      {
        path: 'tags',
        name: 'tags',
        component: () => import('@/components/Tags/Tags.vue')
      },
      {
        path: 'employees',
        name: 'employees',
        component: () => import('@/components/Employees.vue')
      },
      {
        path: 'colors',
        name: 'colors',
        component: () => import('@/components/Colors.vue')
      }
    ]
  }
]
