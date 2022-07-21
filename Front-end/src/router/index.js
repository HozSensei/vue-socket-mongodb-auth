import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from '@auth0/auth0-vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
