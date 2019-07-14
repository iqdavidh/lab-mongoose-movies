import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/celebridades',
      name: 'celebridades',
      component: () => import(/* webpackChunkName: "celebridades" */ './views/Celebridades.vue')
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import(/* webpackChunkName: "movies" */ './views/Movies.vue')
    },
  ]
})
