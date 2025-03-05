import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Search from "@/views/Search";
import batchAnno from "@/views/batchAnno.vue";
import BatchAnno from "@/views/batchAnno.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },  {
    path: '/batchanno',
    name: 'batchanno',
    component: BatchAnno
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
