<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="save" :textButton="'Save'" :requiredButton="true" action='save'
      :requiredCancelButton="false" />
  </CRow>
  <CRow class="my-4">
    <CCol :xs="isMobile ? 12 : 6">
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

    <CCol :xs="isMobile ? 0 : 1"></CCol>

    <CCol :xs="isMobile ? 12 : 5">
      <h3 class="mb-4">Preferences</h3>

      <CFormCheck id="flexCheckDefault" label="Receive Support Request" v-model="userProfile.receiveSupportRequest" />

      <!-- <h5>skills</h5>
      <ul class="pl-3">
        <li v-for="(skill, index) in userProfile.skills" :key="index">{{ skill }}</li>
      </ul> -->

      <div class="d-flex align-self-center">
        <h5 style="margin-right: 10px;">Skills</h5>
        <CButton @click="toggleSkillsMenu" size="sm" class="btn btn-primary">Manage Skills</CButton>
      </div>
      <ul class="pl-3">
        <li v-for="(skill, index) in userProfile.skills" :key="index">
          {{ skill }}

          <CTooltip v-if="showSkillsMenu" content="Remove" placement="top">
            <template #toggler="{ on }">
              <IconCircleX color="#e74c3c" size="1.5rem" data-toggle="tooltip" data-placement="top" title="Tooltip on top"
                v-on="on" @click="removeSkill(index)" />
            </template>
          </CTooltip>

        </li>
      </ul>
      <div>
        <h5 v-if="showSkillsMenu">Add Skill</h5>
        <ul v-if="showSkillsMenu" class="pl-3">
          <li v-for="skill in filteredSkillsList" :key="skill._id">
            <button @click="addSkill(skill.name)" class="btn btn-sm btn-outline-primary">{{ skill.name }}</button>
          </li>
        </ul>
      </div>

    </CCol>
  </CRow>
</template>





<script>
import ProfileService from '@/components/MyProfile/services/profileService';
import { CCol } from '@coreui/vue';
import RecognitionService from '@/components/Recognition/services/recognitionService';
import CustomHeader from '@/components/CustomHeader.vue';
import { IconCircleX } from '@tabler/icons-vue';

export default {

  components: { CCol, CustomHeader, IconCircleX },

  data() {
    return {
      title: 'My Personal Data & Points',
      isMobile: window.innerWidth <= 768,
      countRegognitions: 0,
      skillsList: [],
      showSkillsMenu: false,
    };
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
    filteredSkillsList() {
      return this.skillsList.filter(skill => !this.userProfile.skills.includes(skill.name));
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
  this.getSkils();

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

    async getSkils() {
    try {
      await ProfileService.getSkills().then((response) => {
        this.skillsList = response;
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
    try {
      await ProfileService.update(this.userProfile).then(() => {
        this.showSuccess('Your profile was updated successfully.');
      })
        .catch((error) => {
          this.showError(error.error ?? error);
        });
    } catch (error) {
      this.showError(error.error ?? error);
    }
  },

  addSkill(skill) {
    if (!this.userProfile.skills.includes(skill)) {
      this.userProfile.skills.push(skill);
    } else {
      this.$swal.fire({
        title: 'Skill already added!',
        text: 'You have already added this skill to your profile.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  },

  removeSkill(index) {
    this.userProfile.skills.splice(index, 1);
  },

  toggleSkillsMenu() {
    this.showSkillsMenu = !this.showSkillsMenu;
  },

},


};


</script>

<style scoped></style>
