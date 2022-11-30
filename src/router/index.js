import { createRouter, createWebHashHistory } from 'vue-router'
import {useStore} from 'vuex';

const store = useStore();
const routes = [
  {
    path: '/',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "home" */ '../views/Home.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    component: function () {
      return import('../views/Restaurant.vue')
    }
  },
  {
    path: '/activities',
    name: 'Activities',
    component: function () {
      return import('../views/Activities.vue')
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    component: function () {
      return import('../views/FAQ.vue')
    }
  },
  {
    path: '/reviews',
    name: 'Reviews',
    component: function () {
      return import('../views/Reviews.vue')
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: function () {
      return import('../views/Contact.vue')
    }
  },
  {
    path: '/booking',
    name: 'checkAvail',
    component: function () {
      return import('../views/CheckAvail.vue')
    }
  },
  {
    path: '/availrooms',
    name: 'available',
    component: function () {
      return import('../views/AvailRooms.vue')
    }
  },
  {
    path: '/guestreserve',
    name: 'guestReserve',
    component: function () {
      return import('../views/GuestReserve.vue')
    }
  },
  {
    path: '/confirmation',
    name: 'confirmation',
    component: function () {
      return import('../views/Confirmation.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
   
    if(from.path ==='/faq'){
      store.dispatch("SETFAQ",null)
    }

    if (savedPosition) return savedPosition;
    return { top: 0 }
  },
  routes
})

export default router
