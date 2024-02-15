<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="editing ? update : create" :textButton="editing ? 'Save' : 'Create'"
      :requiredButton="true" :action="editing ? 'save' : 'create'" :requiredCancelButton="true"
      :fnCancelButton="fnCancelButton" />
  </CRow>

  <CRow class="">
    <CCol xs="6">
      <CFormInput v-model="titleSupport" type="text" placeholder="Title" aria-label="lg input example" />
    </CCol>

    <CCol xs="6">
      <div class="select-wrapper">
        <select v-model="selectedPriority" class="custom-select">
          <option disabled value="">Select priority</option>
          <option v-for="option in priorityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </CCol>
  </CRow>>
  <div v-if="editing">
    <CustomEditor @get-message="getMessage" :value="message" :editing="true" ref="customEditor" />
  </div>
  <div v-else>
    <CustomEditor @get-message="getMessage" ref="customEditor" />
  </div>

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="editing ? update() : create()">{{
      editing ? 'Update' : 'Create' + 'Request'
    }}</CButton>
  </div>
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import CustomEditor from '@/components/CustomEditor.vue';
import { AskYourCommunity } from '@/components/AskYourCommunity/model/AskYourCommunity';
import AskYourCommunityService from '@/components/AskYourCommunity/services/askYourCommunityService';
import CustomHeader from '@/components/CustomHeader.vue';

export default {
  name: 'AskYourCommunityCreate',

  components: {
    CustomEditor,
    CustomHeader,
  },

  data() {
    return {
      title: 'Ask Your Community',
      titleSupport: '',
      message: null,
      isMobile: window.innerWidth <= 768,
      quillEditor: null,
      editing: false,
      priorityOptions: [
        { value: '', label: 'Select priority', disabled: true, hidden: true },
        { value: 'urgent', label: 'Urgent' },
        { value: 'next-day', label: 'Next Day' },
        { value: 'within-week', label: 'Within a Week' },
      ],
      selectedPriority: '',
      user: { email: this.$store.state.userProfile.email, name: this.$store.state.userProfile.nickName }, //TODO agregarlo en el store
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize);
    this.checkWindowSize();
    this.setTitle();
    if (this.$route.params.requestId) {
      this.editing = true;
      this.getRequest(this.$route.params.requestId);
    }
  },
  methods: {
    async getRequest(requestId) {
      try {
        let request = await AskYourCommunityService.getRequestById(requestId);
        this.titleSupport = request.title;
        this.message = request.message;
        this.selectedPriority = request.priority;
      } catch (error) {
        console.log(error);
        this.showError(error.error ?? error);
      }
    },

    async create() {
      try {
        this.getData();
        this.validate();
        let model = new AskYourCommunity(
          this.titleSupport,
          this.message,
          this.selectedPriority,
          this.user.email,
        );
        await AskYourCommunityService.addRequest(model);
        this.showSuccess('Request created successfully');
        this.redirectToList('create');
      } catch (error) {
        console.log(error);
        this.showError(error.error ?? error);
      }
    },
    async update() {
      try {
        this.getData();
        this.validate();
        let model = new AskYourCommunity(
          this.titleSupport,
          this.message,
          this.selectedPriority,
          this.user.email,
        );
        await AskYourCommunityService.updateRequest(
          this.$route.params.requestId,
          model,
        );
        this.showSuccess('Request updated successfully');
        this.redirectToList('edit');
      } catch (error) {
        console.log(error);
        this.showError(error.error ?? error);
      }
    },

    validate() {
      if (this.titleSupport == '') {
        throw 'Please enter a title';
      }

      if (!this.selectedPriority) {
        throw 'Please select a priority';
      }

      if (this.message == '<p><br></p>' || !this.message) {
        throw 'Please enter a message';
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },

    getData() {
      this.$refs.customEditor.getMessage();
    },

    getMessage(data) {
      this.message = data;
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
    redirectToList(from) {
      let currentRoute = this.$router.currentRoute;
      let currentPath = currentRoute.value.fullPath;
      let index = currentPath.indexOf(`/${from}`);

      if (index !== -1) {
        currentPath = currentPath.substring(0, index);
        this.$router.push(`${currentPath}/list`);
      }
    },
    setTitle() {
      this.$store.commit('setPageTitle', this.title);
    },
    fnCancelButton() {
      this.$router.replace(
        this.$route.path.replace(/(create|edit)($|\/.*)/i, 'list'),
      );
    },
  },
};
</script>

<style scoped>
.select-wrapper {
  margin-bottom: 1rem;
}

.custom-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.custom-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.custom-select option[disabled] {
  display: none;
}

.custom-select option:checked {
  background-color: #80bdff;
  color: white;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
}
</style>
