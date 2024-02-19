import { createStore } from 'vuex';
import { ERROR_SEVERITY } from "@/helpers/constants"

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    userProfile: {},
    pageTitle: null,
    lastNotificacions: [],
    lastWaning: [],
    lastError: [],
    lastCriticalErrors: [],
    token: '',
    showToggleSidebar: false,
  },
  mutations: {
    updateShowToggleSidebar(state, value) {
      state.showToggleSidebar = value;
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible;
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable;
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value ?? payload;
    },
    setUserProfile(state, userProfile) {
      state.userProfile = userProfile;
    },
    setToken(state, token) {
      state.token = token;
    },
    setPageTitle(state, pageTitle) {
      state.pageTitle = pageTitle;
    },
    addNotification(state, message){
      state.lastNotificacion = message;
    },
    addWarning(state, warning) {
      state.lastWarning = warning;
    },
    addError(state, error) {
      error.errorSeverity == error.errorSeverity ?? ERROR_SEVERITY.NORMAL;
      if (error.errorSeverity == ERROR_SEVERITY.CRITICAL) state.lastCriticalError = error;
      else state.lastError = error;
    },
    addCriticalError(state, error) {
      error.errorSeverity == ERROR_SEVERITY.CRITICAL;
      state.lastCriticalError = error;
    },
  },
  actions: {},
  modules: {},
});
