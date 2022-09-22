import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/clients',
    name: 'clients',
    component: () => import('@/components/Clients/Clients'),
    beforeEnter: shouldRedirectToLogin
  }
]
