<template>
  <div class="d-flex">
    <h2>{{ title }}</h2>
  </div>
  
  
<QuillEditor :toolbar="[
  { size: [  false, 'large', ]},
  'bold',
  'italic',
  'underline',
  { 'list': 'ordered'},
  { 'list': 'bullet'},
  //{ align: ['left', 'center', 'right'] },
]" />

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
      title:'New Acknowledgment' 
    };
  },
  mounted(){
    console.log(AcknowledgmentService);
  },
  
}
</script>

<style scoped>

</style>
