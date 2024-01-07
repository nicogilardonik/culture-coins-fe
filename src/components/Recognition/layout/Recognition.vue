<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">
    <CustomHeader class="mb-1" :fnButton="create" :textButton="'Create'" :requiredButton="true" action='create'
      :requiredCancelButton="false" :fnCancelButton="fnCancelButton" />
  </CRow>

  <Multiselector ref="multiSelectorValues" @selected-values="selectedValues" />

  <CustomEditor @get-message="getMessage" ref="customEditor" />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="create">Create</CButton>
  </div>
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import RecognitionService from '@/components/Recognition/services/recognitionService';
import { Recognition } from '@/components/Recognition/model/Recognition';
import Multiselector from '@/components/Multiselector.vue';
import CustomEditor from '@/components/CustomEditor.vue';
import CustomHeader from '@/components/CustomHeader.vue';

export default {
  name: 'Recognition',

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
    };
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize);
    this.checkWindowSize();
    this.setTitle();
  },
  methods: {
    validate() {
      if (this.message == '<p><br></p>') {
        throw 'Please enter a message';
      }
      if (this.selectedValue.type == undefined || !this.selectedValue.values.length) {
        throw 'Please select a group and values';
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },
    create() {
      try {
        this.getData();
        this.validate();
        const model = new Recognition(this.message);
        RecognitionService.addRecognition(model);
        this.showSuccess('Recognition created successfully');
      } catch (error) {
        this.showError(error);
      }
    },
    getData() {
      this.$refs.multiSelectorValues.emitSelectedValues();
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

<style scoped></style>
