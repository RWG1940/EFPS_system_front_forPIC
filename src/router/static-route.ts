import { reactive } from 'vue' 
import loginPage from "@/views/loginPage.vue";
import homePage from "@/views/homePage.vue";

export const staticRoutes =[
    {
      path: '/login',
      name: '登录',
      component: loginPage,
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: '首页',
      component: homePage,
      children: []
    },
   
  ];