<template>
  <div class="recognition-form">
    <h2>RECONOCIMIENTO</h2>
  </div>
  
  <QuillEditor theme="snow" />


</template>

<script>

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

export default {
  name: 'Acknowledgment',

  components: {
    QuillEditor
  },

  data() {
    return {
     
    };
  },
}
</script>

<style scoped>

</style>
