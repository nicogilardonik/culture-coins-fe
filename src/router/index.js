import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import Recognition from '@/components/Recognition/layout/Recognition.vue'
import AskYourCommunityList from '@/components/AskYourCommunity/layout/AskYourCommunityList.vue'
import AskYourCommunityCreate from '@/components/AskYourCommunity/layout/AskYourCommunityCreate.vue'
import VMPDP from '@/components/ViewMyPersonalDataPoints/layout/VMPDP.vue'

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
        path: '/ViewMyPersonalDataPoints',
        name: 'VMPDP',
        component: VMPDP,
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
