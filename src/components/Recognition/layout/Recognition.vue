<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="create" :textButton="'Create'" :requiredButton="true" action='create'
      :requiredCancelButton="false" :fnCancelButton="fnCancelButton" />
  </CRow>

  <Multiselector v-if="!isFeedback" ref="multiSelectorValues" :message="'Select Behaviour'"
    @selected-values="selectedValues" />
  <CRow>
    <CCol xs="12" md="5">
      <div class="select-wrapper">
        <select v-model="selectedEmail" class="custom-select">
          <option value="" disabled>Select user</option>
          <!-- utilizo el mismo componente para seleccionar usuarios y colaboradores -->
          <option v-for="user in usersOrColaborators" :key="user.email" :value="user.email">
            {{ user.nickName }}
          </option>
        </select>
      </div>
    </CCol>
  </CRow>

  <CustomEditor @get-message="getMessage" ref="customEditor" />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="create">Create</CButton>
  </div>
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RecognitionService from '@/components/Recognition/services/recognitionService';
import { Feedback } from '@/components/Recognition/model/Feedback';
import { Recognition } from '@/components/Recognition/model/Recognition';
import Multiselector from '@/components/Multiselector.vue';
import CustomEditor from '@/components/CustomEditor.vue';
import CustomHeader from '@/components/CustomHeader.vue';

export default {

  emits: ['feedback-created'],

  name: 'Recognition',

  props: {
    isFeedback: {
      type: Boolean,
      default: false,
    },
    colaborators: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    CustomEditor,
    Multiselector,
    CustomHeader,
  },

  data() {
    return {
      title: 'New Recognition',
      isMobile: window.innerWidth <= 768,
      message: '',
      selectedValue: {},
      users: [],
      selectedEmail: ''
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize);
    this.checkWindowSize();
    this.setTitle();
    if (!this.isFeedback)
      this.setUsers();
  },

  computed: {
    usersOrColaborators() {
      return this.isFeedback ? this.colaborators : this.users;
    }
  },

  methods: {
    async setUsers() {
      try {
        const currentUserProfile = this.$store.state.userProfile
        await RecognitionService.getListUsers().then((response) => {
          this.users = response.filter(user => user.email !== currentUserProfile.email);
        }).catch((error) => {
          this.showError(error.error ?? error);
        });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },

    validate() {
      if (this.message == '<p><br></p>') {
        throw 'Please enter a message';
      }
      if (!this.isFeedback && (this.selectedValue.type == undefined || !this.selectedValue.values.length)) {
        throw 'Please select a group and values';
      }
      if (this.selectedEmail == null || this.selectedEmail == '') {
        throw 'Please select user';
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },
    create() {
      try {
        this.getData();
        this.validate();
        if (this.isFeedback) {
          const model = new Feedback(this.message, this.selectedEmail, this.$store.state.userProfile.email);
          RecognitionService.addFeedback(model);
          this.confirmDialogCreateRecogniton();
          this.$emit('feedback-created');
        } else {
          const model = new Recognition(this.message, this.selectedEmail, this.$store.state.userProfile.email, this.selectedValue.type, this.selectedValue.values);
          RecognitionService.addRecognition(model);
          this.showSuccess('Recognition created successfully');
        }
      } catch (error) {
        this.showError(error);
      }
    },
    getData() {
      if (!this.isFeedback) {
        this.$refs.multiSelectorValues.emitSelectedValues();
      }
      this.$refs.customEditor.getMessage();
    },

    getMessage(data) {
      this.message = data;
    },

    selectedValues(group, selectedValues) {
      this.selectedValue = {
        type: group,
        values: selectedValues,
      };
    },
    showSuccess(text) {
      this.$swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    },

    confirmDialogCreateRecogniton() {
      this.$swal
        .fire({
          title: 'Do you want to make a recognition?',
          text: `Do you also want to make a recognition to ${this.selectedEmail}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push('/recognition/create');
          } else{
            this.showSuccess('Feedback created successfully');
          }
        })
    },

    showError(text) {
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
    setTitle() {
      this.$store.commit('setPageTitle', this.title);
    },
    fnCancelButton() {
      this.$router.replace(
        this.$route.path.replace(/(create|edit)($|\/.*)/i, ''),
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
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
