<template>
  <QuillEditor
    :toolbar="readOnly ? [] : [{ size: [false, 'large'] }, 'bold', 'italic', 'underline', { list: 'ordered' }, { list: 'bullet' },]"
    @update:content="updateContent" @ready="onQuillReady" :content="value"
    :contentType="readOnly || editing ? 'html' : 'text'" :readOnly="readOnly" ref="quillEditor" />
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill';

export default {
  name: 'CustomEditor',
  emits: ['get-message'],

  props: {
    value: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    editing: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    QuillEditor,
  },


  mounted() {

  },

  data() {
    return {
      message: null,
      quillEditor: null,
    };
  },

  methods: {
    updateContent(data) {
      if (data && data.ops && data.ops.length > 0) {
        this.message = data.ops.shift().insert;
      }
    },
    onQuillReady(quill) {
      this.quillEditor = quill;

      if (this.readOnly) {
        this.$nextTick(() => {
          if (this.quillEditor && this.quillEditor.getModule) {
            const toolbarModule = this.quillEditor.getModule('toolbar');
            if (toolbarModule) {
              toolbarModule.container.remove(); 
            }
          }
        });
      }
    },
    getMessage() {
      try {
        this.getContentHTML();
        this.$emit('get-message', this.message);
      } catch (error) {
        this.showError(error);
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
};
</script>
<style></style>
