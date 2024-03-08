import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NamaPegawaiVue from "../views/NamaPegawai.vue";
import Profile from "../views/PegawaiDetail/Profil.vue";
import NewSpt from "../views/spt/sptBaru.vue";
import EdiSpt from "../views/spt/editSpt.vue";
import Login from "../views/login.vue";
import NotFound from "../views/404.vue";

const isAuthenticated = localStorage.getItem("isAuth") === "xxxXXXxxx";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: redirecAuth,
    },
    {
      path: "/nama-pegawai",
      name: "nama-pegawai",
      component: NamaPegawaiVue,
      beforeEnter: redirecAuth,
    },
    {
      path: "/nama-pegawai/:id",
      name: "profil-pegawai",
      component: Profile,
    },
    {
      path: "/new-spt",
      name: "new-spt",
      component: NewSpt,
    },
    {
      path: "/edit-spt/:id",
      name: "edit-spt",
      component: EdiSpt,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      // beforeEnter: udahLogin,
    },
    {
      path: "/:catchAll(.*)",
      nama: "404",
      component: NotFound,
      beforeEnter: (to, from, next) => {
        next(from.fullPath);
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!isAuthenticated && to.path !== "/login") {
    next({ path: "/login" });
  } else if (isAuthenticated && to.path === "/login") {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
