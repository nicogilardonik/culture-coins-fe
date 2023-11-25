export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavItem',
    name: 'Personal data & points',
    to: '/ViewMyPersonalDataPoints',
    icon: 'cil-speedometer',
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
]
