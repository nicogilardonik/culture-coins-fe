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
      <CButton color="primary" size="lg" @click="create"> Create Request</CButton>
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
    ]"
    @update:content="updateContent"
    @ready="onQuillReady"
    ref="quillEditor"
  />

  <div v-if="isMobile" class="d-flex justify-content-center mt-4">
    <CButton color="primary" size="sm" @click="create">Create Request</CButton>
  </div>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'


export default {
  name: 'AskForHelp',

  components: {
    QuillEditor,
  },

  data() {
    return {
      title: 'Ask For Help',
      isMobile: window.innerWidth <= 768,
      quillEditor: null,
    
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
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768
    },
    create() {
      try {
        
        this.showSuccess('Recognition created successfully')
      } catch (error) {
        this.showError(error)
      }
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
