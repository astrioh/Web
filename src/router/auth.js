import { ifNotAuthenticated } from './utils'

export default [
  {
    meta: {
      title: 'Login',
      fullScreen: true
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login'),
    beforeEnter: ifNotAuthenticated
  }
]
