import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/emp',
    name: 'empleados',
    component: () => import('../views/EmpleadoView.vue')
  },
  {
    path: '/pro',
    name: 'proyectos',
    component: () => import('../views/ProyectoView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
