import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nama-pegawai',
      name: 'nama-pegawai',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NamaPegawai.vue')
    },
    {
      path: '/nama-pegawai/:id',
      name: 'profil-pegawai',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PegawaiDetail/Profil.vue')
    },
    {
      path:'/new-spt',
      name:'new-spt',
      component:()=>import('../views/spt/sptBaru.vue')
    },
    {
      path:'/edit-spt/:id',
      name:'edit-spt',
      component:()=>import('../views/spt/editSpt.vue')
    },
    {
      path: '/login',
      name: 'login',
      component:()=>import('../views/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuth') === 'xxxXXXxxx';

  if (!isAuthenticated && to.path !== '/login') {
    next({ path: '/login' });
  } else if (isAuthenticated && to.path === '/login') {
    next({ path: '/' });
  } else {
    next();
  }
});


export default router
