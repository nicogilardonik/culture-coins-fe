export default [
//  {
//    component: 'CNavItem',
//    name: 'Dashboard',
//    to: '/dashboard',
//    icon: 'cil-speedometer',
//    badge: {
//      color: 'primary',
//      text: 'NEW',
//    },
//  },
  
  {
    component: 'CNavGroup',
    name: 'My Profile',
    to: '/',
    icon: 'cil-speedometer',
    items: [
      {
        component: 'CNavItem',
        name: 'Personal Data & Points',
        to: '/ViewMyPersonalDataPoints',
      },
      {
        component: 'CNavItem',
        name: 'My Recognitions',
        to: '/MyRecognitions',
        params: { title: 'My Recognitions' },
      },
    ],
  },

  {
    component: 'CNavItem',
    name: 'Recognition',
    to: '/recognition/create',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Ask your community',
    to: '/ask-your-community/list',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'Mi Infogain',
    to: '/',
    icon: 'cil-speedometer',
    items: [
      {
        component: 'CNavItem',
        name: 'Values ans behaviors',
        to: '/MiInfogain/ValuesBehaviors',
      },
      {
        component: 'CNavItem',
        name: 'Last activity',
        to: '/MiInfogain/LastActivity',
      },
      {
        component: 'CNavItem',
        name: 'Communities',
        to: '/MiInfogain/Communities',
      },
      {
        component: 'CNavItem',
        name: 'Top Recognition',
        to: '/MiInfogain/TopRecognition',
      },
    ],
  },
]