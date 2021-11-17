import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movie from '../views/Movie.vue'
import Recommend from '../views/Recommend.vue'
import Profile from '../views/Profile.vue'

import Signup from '../components/accounts/Signup.vue'
import Login from '../components/accounts/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/signup/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/accounts/login/',
    name: 'Login',
    component: Login
  },
  {
    path: '/movie/:movieNum/',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/recommend/',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/profile/:username/',
    name: 'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
