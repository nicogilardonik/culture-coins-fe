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

  <Multiselector ref="multiSelectorValues" @selected-values="selectedValues"/>

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
import Multiselector from '@/components/Multiselector.vue'

export default {
  name: 'Acknowledgment',

  components: {
    QuillEditor,
    Multiselector
  },

  data() {
    return {
      title: 'New Acknowledgment',
      isMobile: window.innerWidth <= 768,
      message: '',
      selectedValue:{}
    }
  },
  mounted() {
    window.addEventListener('resize', this.checkWindowSize)
    this.checkWindowSize()
  },
  methods: {
    validate(){
        if(this.selectedValue.type == undefined || !this.selectedValue.values.length){
          throw "Please select a group and values"
        }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768
    },
    create(){
      try {
        this.getData()
        this.validate();
        let model = new Acknowledgment(this.message);
        AcknowledgmentService.addAcknowledgment(model);
        this.showSuccess("Acknowledgment created successfully");

      } catch (error) {
        this.showError(error);
      }
    },
    getData(){ 
      this.$refs.multiSelectorValues.emitSelectedValues();
    },
    updateContent(data){
        this.message = data.ops.shift().insert;
    },
    editorChange(data){
      console.log(data)
    },
    selectedValues(group,selectedValues){
      this.selectedValue={
        type:group,
        values:selectedValues
      }
    },
    showSuccess(text){
      this.$swal.fire({
        title: 'Success!',
        text: text,
        icon: 'success',
        confirmButtonText: 'Ok'
        });
    },
    showError(text){
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Ok'
        });
    }
  },
}
</script>

<style scoped></style>
