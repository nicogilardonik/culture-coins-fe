import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import Recognition from '@/components/Recognition/layout/Recognition.vue'
import AskYourCommunityList from '@/components/AskYourCommunity/layout/AskYourCommunityList.vue'
import AskYourCommunityCreate from '@/components/AskYourCommunity/layout/AskYourCommunityCreate.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [ 
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/recognition/create',
        name: 'Recognition',
        component: Recognition,
      },
      {
        path: '/ask-your-community/list',
        name: 'Ask your community list',
        component: AskYourCommunityList,
      },
      {
        path: '/ask-your-community/create',
        name: 'Ask your community create',
        component: AskYourCommunityCreate,
      },
      {
        path: '/ask-your-community/edit/:requestId',
        name: 'Ask your community edit',
        component: AskYourCommunityCreate,
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/accordion',
            name: 'Accordion',
            component: () => import('@/views/base/Accordion.vue'),
          },
        ],
      }, 
    ],
  },

  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
