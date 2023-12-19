<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="save" :textButton="'Save'" :requiredButton="true" action='save'
      :requiredCancelButton="false" />
  </CRow>
  <CRow class="my-4">
    <CCol :xs="isMobile ? 12 : 6">
      <h3 class="mb-4">Personal Information</h3>

      <label>Nickname</label>
      <CFormInput v-model="userProfile.nickName" type="text" placeholder="nickName" /> <br>

      <label>First Name</label>
      <CFormInput v-model="userProfile.firstName" type="text" placeholder="first name" readonly /> <br>

      <label>Email</label>
      <CFormInput v-model="userProfile.email" type="email" placeholder="email" readonly />

      <h3 class="mt-5">Total Accumulated Points</h3>
      <p class="text-info font-weight-bold">{{ userProfile.points }} points</p>
      <p></p>
      <a v-if="countRegognitions > 0" href="#" @click.prevent="showRecognitions()" class="view-executions-link">See my
        recognitions ({{ countRegognitions }})</a>
      <span v-else href="#" class="view-executions-link">You have no recognitions yet</span>
    </CCol>

    <CCol :xs="isMobile ? 0 : 1"></CCol>

    <CCol :xs="isMobile ? 12 : 5">
      <h3 class="mb-4">Preferences</h3>

      <CFormCheck id="flexCheckDefault" label="Receive Support Request" v-model="userProfile.receiveSupportRequest" />

      <h5>Skills</h5>
      <ul class="pl-3">
        <li v-for="(skill, index) in userProfile.skills" :key="index">{{ skill }}</li>
      </ul>

    </CCol>
  </CRow>
</template>


<script>
import { CCol } from '@coreui/vue';
import RecognitionService from '@/components/Recognition/services/recognitionService';
import CustomHeader from '@/components/CustomHeader.vue';

export default {

  components: { CCol, CustomHeader },

  data() {
    return {
      title: 'My Personal Data & Points',
      isMobile: window.innerWidth <= 768,
      countRegognitions: 0,
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    }
  },

  watch: {
    userProfile: {
      handler(newProfile) {
        if (newProfile && Object.keys(newProfile).length > 0) {
          this.getRecognitions();
        }
      },
      immediate: true,
    },
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
    async getRecognitions() {
      try {
        await RecognitionService.getMyRecognitions(this.userProfile.email)
          .then((response) => {
            this.countRegognitions = response.length;
          })
          .catch((error) => {
            this.showError(error.error ?? error);
          });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },
    showError(text) {
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
    objetcIsEmpty(obj) {
      return Object.keys(obj).length === 0;
    },

    showRecognitions() {
      let currentRoute = this.$router.currentRoute;
      let currentPath = currentRoute.value.fullPath;
      currentPath = currentPath.replace('/ViewMyPersonalDataPoints', '');
      this.$router.push(`${currentPath}/MyRecognitions`);
    },

    save() {
      console.log('save');
    }

  },


};


</script>

<style scoped></style>
