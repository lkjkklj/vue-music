import { createRouter, createWebHashHistory } from 'vue-router'
import Recommand from '@/views/recommand'
import Singer from '@/views/singer'
import TopList from '@/views/todo-list'
import Search from '@/views/search.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommand
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/top-list',
    component: TopList
  },
  {
    path: '/search',
    component: Search
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
