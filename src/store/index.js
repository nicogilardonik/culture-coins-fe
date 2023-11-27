import { createStore } from 'vuex'
import { ERROR_SEVERITY } from "@/helpers/constants"

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    userProfile: {
      email: 'TEST',
      firstName: 'TEST',
      receiveSupportRequest: true,
      points: 0,
      skills: [
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'javascript', label: 'JavaScript' },
      ]
    },
    pageTitle: null,
    lastMessage: [],
    lastWaning: [],
    lastError: [],
    lastCriticalErrors: [],
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
    },
    addMessage(state, message){
      state.lastMessage = message;
    },
    addWarning(state, warning){
      state.lastWarning = warning;
    },
    addError(state, error){
      error.errorSeverity == error.errorSeverity ?? ERROR_SEVERITY.NORMAL;
      if(error.errorSeverity == ERROR_SEVERITY.CRITICAL) state.lastCriticalError = error;
      else state.lastError = error;
    },
    addCriticalError(state, error){
      error.errorSeverity == ERROR_SEVERITY.CRITICAL
      state.lastCriticalError = error;
    },
  },
  actions: {},
  modules: {},
})
