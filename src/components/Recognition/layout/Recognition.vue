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

  <QuillEditor
    :toolbar="[
      { size: [false, 'large'] },
      'bold',
      'italic',
      'underline',
      { list: 'ordered' },
      { list: 'bullet' },
    ]"
    @update:content="updateContent"
    @ready="onQuillReady"
    ref="quillEditor"
  />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="create">Create</CButton>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import RecognitionService from '@/components/Recognition/services/recognitionService'
import { Recognition } from '@/components/Recognition/model/Recognition'
import Multiselector from '@/components/Multiselector.vue'

export default {
  name: 'Recognition',

  components: {
    QuillEditor,
    Multiselector,
  },

  data() {
    return {
      title: 'New Recognition',
      isMobile: window.innerWidth <= 768,
      message: '',
      quillEditor: null,
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
      if (this.selectedValue.type == undefined || !this.selectedValue.values.length ) {
        throw 'Please select a group and values'
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768
    },
    create() {
      try {
        this.getData()
        this.validate()
        let model = new Recognition(this.message)
        RecognitionService.addRecognition(model)
        this.showSuccess('Recognition created successfully')
      } catch (error) {
        this.showError(error)
      }
    },
    getData() {
      this.$refs.multiSelectorValues.emitSelectedValues()
      this.getContentHTML()
    },
    updateContent(data) {
      this.message = data.ops.shift().insert
    },
    getContentHTML() {
      if (!this.quillEditor && !this.quillEditor.root) {
        throw 'quillEditor error'
      }
      this.message = this.quillEditor.root.innerHTML
    },
    onQuillReady(quill) {
      this.quillEditor = quill
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
