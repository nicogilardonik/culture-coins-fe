<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="save" :textButton="'Save'" :requiredButton="true" action='save'
      :requiredCancelButton="false" />
  </CRow>
  <CRow class="my-4">
    <CCol xs="12" md="5">
      <h3 class="mb-4">Personal Information</h3>

      <label>Nickname</label>
      <CFormInput v-model="userProfile.nickName" type="text" placeholder="nickname" /> <br>

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

    <CCol xs="0" md="1"></CCol>

    <CCol xs="12" md="5">

      <CRow>
        <h3 class="mb-4">Preferences</h3>

        <CFormCheck id="flexCheckDefault" label="Receive Support Request" v-model="userProfile.receiveSupportRequest" />
      </CRow>

      <CRow>
        <CCol>
          <!-- communities -->
          <ManageList title="Communities" :items="userProfile.communities" :filteredList="filteredCommunitiesList"
            :resetMenu="resetMenu" @remove-item="removeCommunity" @add-item="addCommunity" />
        </CCol>
        <CCol>
          <!-- teams -->
          <ManageList title="Teams" :items="userProfile.teams" :filteredList="filteredTeamsList" :resetMenu="resetMenu"
            @remove-item="removeTeam" @add-item="addTeam" />
        </CCol>
      </CRow>
    </CCol>
  </CRow>
</template>





<script>
import ProfileService from '@/components/MyProfile/services/profileService';
import RecognitionService from '@/components/Recognition/services/recognitionService';
import CustomHeader from '@/components/CustomHeader.vue';
import ManageList from '@/components/MyProfile/layout/ManageList.vue';

export default {

  components: {CustomHeader, ManageList },

  data() {
    return {
      title: 'My Personal Data & Points',
      isMobile: window.innerWidth <= 768,
      countRegognitions: 0,
      communitiesList: [],
      teamsList: [],
      resetMenu: false,
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    filteredCommunitiesList() {
      return this.communitiesList.filter(community => !this.userProfile.communities.includes(community.name));
    },
    filteredTeamsList() {
      return this.teamsList.filter(team => !this.userProfile.teams.includes(team.name));
    },
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
    this.getCommunities();
    this.getTeams();

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

    async getCommunities() {
      try {
        await ProfileService.getCommunities().then((response) => {
          this.communitiesList = response;
        }).catch((error) => {
          this.showError(error.error ?? error);
        });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },

    async getTeams() {
      try {
        await ProfileService.getTeams().then((response) => {
          this.teamsList = response;
        }).catch((error) => {
          this.showError(error.error ?? error);
        });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },

    showSuccess(text) {
      this.$swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
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

    async save() {
      this.resetMenu = !this.resetMenu;
      try {
        let userProfileCopy = { ...this.userProfile };
        delete userProfileCopy.points;
        await ProfileService.update(userProfileCopy).then(() => {
          this.showSuccess('Your profile was updated successfully.');
        })
          .catch((error) => {
            this.showError(error.error ?? error);
          });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },

    addCommunity(community) {
      if (!this.userProfile.communities.includes(community)) {
        this.userProfile.communities.push(community);
      } else {
        this.$swal.fire({
          title: 'community already added!',
          text: 'You have already added this community to your profile.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    },

    addTeam(team) {
      if (!this.userProfile.teams.includes(team)) {
        this.userProfile.teams.push(team);
      } else {
        this.$swal.fire({
          title: 'Team already added!',
          text: 'You have already added this team to your profile.',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      }
    },

    removeCommunity(index) {
      this.userProfile.communities.splice(index, 1);
    },
    removeTeam(index) {
      this.userProfile.teams.splice(index, 1);
    },

  },


};


</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
</style>
