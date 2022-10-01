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
        path: 'integrations',
        name: 'integrations',
        component: () => import('@/components/Settings/Integrations.vue')
      },
      {
        path: ':integrations_name',
        children: [
          {
            path: 'corporationYandexMail',
            name: 'corporationYandexMail',
            component: () => import('@/components/Integrations/CorpoIntegrationsYandex.vue')
          },
          {
            path: 'personalYandexMail',
            name: 'personalYandexMail',
            component: () => import('@/components/Integrations/PersonalIntegrationsYandex.vue')
          }
        ]
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
