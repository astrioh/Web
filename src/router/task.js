import { shouldRedirectToLogin } from './utils'
import Home from '@/views/Home'

export default [
  {
    meta: {
      layout: Home
    },
    path: '/task/:id',
    name: 'task',
    component: () => import('@/components/TasksList/TaskByUid.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/:date',
    name: 'tasksByDate',
    component: () => import('@/components/TasksList/TasksByDate.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/today',
    name: 'tasksToday',
    component: () => import('@/components/TasksList/TasksToday.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/unread',
    name: 'tasksUnread',
    component: () => import('@/components/TasksList/TasksUnread.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/delegate-to-me/:employee_uid',
    name: 'tasksDelegateToMe',
    component: () => import('@/components/TasksList/TasksDelegateToMe.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/delegate-by-me/:employee_uid',
    name: 'tasksDelegateByMe',
    component: () => import('@/components/TasksList/TasksDelegateByMe.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/in-work',
    name: 'tasksInWork',
    component: () => import('@/components/TasksList/TasksInWork'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/in-focus',
    name: 'tasksInFocus',
    component: () => import('@/components/TasksList/TasksInFocus'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/ready',
    name: 'tasksReady',
    component: () => import('@/components/TasksList/TasksReady.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/unsorted',
    name: 'taskUnsorted',
    component: () => import('@/components/TasksList/TaskUnsorted.vue'),
    beforeEnter: shouldRedirectToLogin
  },
  {
    meta: {
      layout: Home
    },
    path: '/tasks/overdue',
    name: 'tasksOverdue',
    component: () => import('@/components/TasksList/TasksOverdue.vue'),
    beforeEnter: shouldRedirectToLogin
  }
]
