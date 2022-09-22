import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home,
      breadcrumb: {
        name: 'Проекты',
        to: '/project'
      }
    },
    path: '/project',
    name: 'allProjects',
    component: () => import('@/components/Projects.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/project/:project_id',
    name: 'project',
    component: () => import('@/components/Projects/ProjectWithChildren.vue'),
    beforeEnter: shouldRedirectToLogin
  }
]
