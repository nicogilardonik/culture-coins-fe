<template>
  <CRow class="my-4">
    <CCol :xs="isMobile ? 12 : 6">
      <h3 class="mb-4">Personal Information</h3>

      <label>First Name</label>
      <CFormInput v-model="userProfile.firstName" type="text" placeholder="first name" readonly />

      <label>Email</label>
      <CFormInput v-model="userProfile.email" type="email" placeholder="email" readonly />

      <h3 class="mt-5">Total Accumulated Points</h3>
      <p class="text-info font-weight-bold">{{ userProfile.points }} points</p>
    </CCol>

    <CCol :xs="isMobile ? 0 : 1"></CCol>

    <CCol :xs="isMobile ? 12 : 5">
      <h3 class="mb-4">Preferences</h3>

      <CFormCheck id="flexCheckDefault" label="Receive Support Request" v-model="userProfile.receiveSupportRequest" />

      <h5>Skills</h5>
      <ul class="pl-3">
        <li v-for="(skill, index) in userProfile.skills" :key="index">{{ skill.label }}</li>
      </ul>

    </CCol>
  </CRow>
</template>


<script>
import { CCol } from '@coreui/vue';

export default {

  components: { CCol },

  data() {
    return {
      title: 'My Personal Data and Points',
      isMobile: window.innerWidth <= 768,
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    }
  },  
  mounted() {
    window.addEventListener('resize', this.checkWindowSize);
    this.checkWindowSize();
    this.setTitle();
  },
  methods: {
    setTitle() {
      this.$store.commit('setPageTitle', this.title);
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },
  },

};
</script>

<style scoped></style>
