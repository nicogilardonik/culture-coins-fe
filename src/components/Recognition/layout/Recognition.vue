<template>
  <CRow
    class="m-4 d-flex justify-content-center align-items-center position-relative"
  >
    <CCol xs="12" class="d-flex justify-content-center">
      <h1 class="text-center mb-4">{{ title }}</h1>
    </CCol>

    <div
      v-if="!isMobile"
      class="d-flex justify-content-end position-absolute create-btn"
    >
      <CButton color="primary" size="lg" @click="create"> Create</CButton>
    </div>
  </CRow>

  <Multiselector ref="multiSelectorValues" @selected-values="selectedValues" />

  <CustomEditor @get-message="getMessage" ref="customEditor" />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="create">Create</CButton>
  </div>
</template>

<script>
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import RecognitionService from '@/components/Recognition/services/recognitionService'
import { Recognition } from '@/components/Recognition/model/Recognition'
import Multiselector from '@/components/Multiselector.vue'
import CustomEditor from '@/components/CustomEditor.vue'

export default {
  name: 'Recognition',

  components: {
    CustomEditor,
    Multiselector,
  },

  data() {
    return {
      title: 'New Recognition',
      isMobile: window.innerWidth <= 768,
      message: '',
      selectedValue: {},
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize)
    this.checkWindowSize()
  },
  methods: {
    validate() {
      if (this.message == '<p><br></p>') {
        throw 'Please enter a message'
      }
      if (
        this.selectedValue.type == undefined ||
        !this.selectedValue.values.length
      ) {
        throw 'Please select a group and values'
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768
    },
    create() {
      try {
        this.getData();
        this.validate();    
          let model = new Recognition(this.message);
          RecognitionService.addRecognition(model);
          this.showSuccess('Recognition created successfully');
      } catch (error) {
        this.showError(error)
      }
    },
    getData() {
      this.$refs.multiSelectorValues.emitSelectedValues()
      this.$refs.customEditor.getMessage()
    },

    getMessage(data) {
      debugger
      this.message = data;
    },

    selectedValues(group, selectedValues) {
      this.selectedValue = {
        type: group,
        values: selectedValues,
      }
    },
    showSuccess(text) {
      this.$swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Ok',
      })
    },
    showError(text) {
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    },
  },
}
</script>

<style scoped></style>
