<template>
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
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'

export default {
  name: 'CustomEditor',
  emits: ['message'],
  components: {
    QuillEditor,
  },

  data() {
    return {
      message: null,
      quillEditor: null,
    }
  },

  methods: {
    updateContent(data) {
      this.message = data.ops.shift().insert;
    },
    onQuillReady(quill) {
      this.quillEditor = quill;
    },
    getMessage() {
      try {
        this.getContentHTML();
        this.$emit('get-message', this.message);
      } catch (error) {
        this.showError(error)
      }
    },

    getContentHTML() {
      if (!this.quillEditor && !this.quillEditor.root) {
        throw 'quillEditor error';
      }
      this.message = this.quillEditor.root.innerHTML;
    },
    showError(text) {
      this.$swal.fire({
        title: 'Error!',
        text: text,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    },
  },
}
</script>
<style></style>
