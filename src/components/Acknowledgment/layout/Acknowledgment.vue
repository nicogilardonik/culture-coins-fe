<template>
  <CRow
    class="m-4 d-flex justify-content-center align-items-center position-relative"
  >
    <CCol xs="12" class="d-flex justify-content-center">
      <h1 class="text-center mb-4">{{ title }}</h1>
    </CCol>

    <div v-if="!isMobile" class="d-flex justify-content-end position-absolute create-btn">
      <CButton color="primary" size="lg" @click="create"> Create</CButton>
    </div>
  </CRow>

  <QuillEditor
    :toolbar="[
      { size: [false, 'large'] },
      'bold',
      'italic',
      'underline',
      { list: 'ordered' },
      { list: 'bullet' },
      //{ align: ['left', 'center', 'right'] },
    ]"  @update:content="updateContent" @editorChange="editorChange"
  />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="lg" @click="create">Create</CButton>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import  AcknowledgmentService  from '@/components/Acknowledgment/services/acknowledgmentService.js';
import {Acknowledgment} from '@/components/Acknowledgment/model/Acknowledgment'

export default {
  name: 'Acknowledgment',

  components: {
    QuillEditor,
  },

  data() {
    return {
      title: 'New Acknowledgment',
      isMobile: window.innerWidth <= 768,
      message: ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize)
    this.checkWindowSize()
  },
  methods: {
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768
    },
    create(){
      let model = new Acknowledgment(this.message);
      AcknowledgmentService.addAcknowledgment(model);
    },
    updateContent(data){
        this.message = data.ops.shift().insert;
    },
    editorChange(data){
      console.log(data)
    }
  },
}
</script>

<style scoped></style>
