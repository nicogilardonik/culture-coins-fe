<template>
  <div class="d-flex">
    <h2>CREAR RECONOCIMIENTO</h2>
  </div>
  
  
  <QuillEditor :toolbar="[ { size: [  false, 'large', ]},'bold', 'italic', 'underline'] " />

</template>

<script>

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import  AcknowledgmentService  from '@/components/Acknowledgment/services/acknowledgmentService.js';

export default {
  name: 'Acknowledgment',

  components: {
    QuillEditor
  },

  data() {
    return {
     
    };
  },
  mounted(){
    console.log(AcknowledgmentService);
  },
  
}
</script>

<style scoped>

</style>
