import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Recognition from '@/components/Recognition/layout/Recognition.vue'
import AskYourCommunityList from '@/components/AskYourCommunity/layout/AskYourCommunityList.vue'
import AskYourCommunityCreate from '@/components/AskYourCommunity/layout/AskYourCommunityCreate.vue'
import PersonalDataAndPoints from '@/components/MyProfile/layout/PersonalDataAndPoints.vue'
import MyRecognitions from '@/components/MyProfile/layout/MyRecognitions.vue'
import ValuesBehaviors from '@/components/MiInfogain/ValuesBehaviors/layout/ValuesBehaviors.vue'
import LastActivity from '@/components/MiInfogain/LastActivity/layout/LastActivity.vue'
import Communities from '@/components/MiInfogain/Communities/layout/Communities.vue'
import TopRecognition from '@/components/MiInfogain/TopRecognition/layout/TopRecognition.vue'
import AskAllCommunities from '@/components/AskAllCommunities/layout/AskFromAllCommunities.vue'
//import Login from '@/components/Auth/layout/Login.vue'
//import Register from '@/components/Auth/layout/Register.vue'
import Dashboard from '@/views/Dashboard.vue'

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
        component: Dashboard,
      },
      {
        path: '/recognition/create',
        name: 'Recognition',
        component: Recognition,
      },
      {
        path: '/ViewMyPersonalDataPoints',
        name: 'VMPDP',
        component: PersonalDataAndPoints,
      },
      {
        path: '/MyRecognitions',
        name: 'My Recognitions',
        component: MyRecognitions,
      },
      {
        path: '/MiInfogain/LastActivity',
        name: 'Last Activity',
        component: LastActivity,
      },
      {
        path: '/MiInfogain/ValuesBehaviors',
        name: 'ValuesBehaviors',
        component: ValuesBehaviors,
      },
      {
        path: '/MiInfogain/Communities',
        name: 'Communities',
        component: Communities,
      },
      {
        path: '/MiInfogain/TopRecognition',
        name: 'TopRecognition',
        component: TopRecognition,
      },
      {
        path: '/ask-your-community/list',
        name: 'Ask your community list',
        component: AskYourCommunityList,
      },
      {
        path: '/ask-your-community/AskAllCommunities',
        name: 'All community requests',
        component: AskAllCommunities,
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
        path:'login',
        name:'Login',
        component: () => import('@/components/Auth/layout/Login.vue'),
      },
      {
        path:'register',
        name:'Register',
        component: () => import('@/components/Auth/layout/Register.vue'),
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