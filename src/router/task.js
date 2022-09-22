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
    path: '/tasks',
    beforeEnter: shouldRedirectToLogin,
    children: [
      {
        path: ':date',
        name: 'tasksByDate',
        component: () => import('@/components/TasksList/TasksByDate.vue')
      },
      {
        path: 'today',
        name: 'tasksToday',
        component: () => import('@/components/TasksList/TasksToday.vue')
      },
      {
        path: 'unread',
        name: 'tasksUnread',
        component: () => import('@/components/TasksList/TasksUnread.vue')
      },
      {
        path: 'delegate-to-me/:employee_uid',
        name: 'tasksDelegateToMe',
        component: () => import('@/components/TasksList/TasksDelegateToMe.vue')
      },
      {
        path: 'delegate-by-me/:employee_uid',
        name: 'tasksDelegateByMe',
        component: () => import('@/components/TasksList/TasksDelegateByMe.vue')
      },
      {
        path: 'in-work',
        name: 'tasksInWork',
        component: () => import('@/components/TasksList/TasksInWork')
      },
      {
        path: 'in-focus',
        name: 'tasksInFocus',
        component: () => import('@/components/TasksList/TasksInFocus')
      },
      {
        path: 'ready',
        name: 'tasksReady',
        component: () => import('@/components/TasksList/TasksReady.vue')
      },
      {
        path: 'unsorted',
        name: 'taskUnsorted',
        component: () => import('@/components/TasksList/TaskUnsorted.vue')
      },
      {
        path: 'overdue',
        name: 'tasksOverdue',
        component: () => import('@/components/TasksList/TasksOverdue.vue')
      }
    ]
  }
]
