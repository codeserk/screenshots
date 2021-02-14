import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/valentine',
  },
  {
    path: '/folder/:id',
    component: () => import('../views/Folder.vue'),
  },
  {
    path: '/valentine',
    component: () => import('../views/Valentine.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
