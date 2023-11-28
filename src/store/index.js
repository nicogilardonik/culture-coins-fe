import { createStore } from 'vuex'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    userProfile: {
      _id:'lalalalallalaalaaal',
      email: 'TEST',
      firstName: 'TEST',
      receiveSupportRequest:false,
      points: 0,
      skills: [
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'javascript', label: 'JavaScript' },
      ]
    },
    pageTitle: null
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile
    },
    setPageTitle(state, pageTitle){
      state.pageTitle = pageTitle;
    }
  },
  actions: {},
  modules: {},
})
