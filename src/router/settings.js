import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/account/myaccount',
    name: 'myaccount',
    component: () => import('@/components/Settings/Account.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/help',
    name: 'help',
    component: () => import('@/components/Settings/Support.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/account/karma',
    name: 'karma',
    component: () => import('@/components/Settings/AccKarma.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/tarif',
    name: 'tarif',
    component: () => import('@/components/Settings/Tarif.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/options',
    name: 'options',
    component: () => import('@/components/Settings/Options.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/tags',
    name: 'tags',
    component: () => import('@/components/Tags/Tags.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/employees',
    name: 'employees',
    component: () => import('@/components/Employees.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/settings/colors',
    name: 'colors',
    component: () => import('@/components/Colors.vue'),
    beforeEnter: shouldRedirectToLogin
  }
]
