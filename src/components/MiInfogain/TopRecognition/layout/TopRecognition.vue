<template>
  <div>
    <CRow class="d-flex justify-content-between">
      <CCol xs="12" sm=6 v-for="(recognition, index) in recognitions" :key="index">
        <TopRecognitionCard :recognition="recognition" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import TopRecognitionCard from './TopRecognitionCard.vue';
import TopRecognitionService from '@/components/MiInfogain/TopRecognition/services/topRecognitionService';

export default {

  components: {
    TopRecognitionCard,
  },

  data() {
    return {
      title: "Top Recognitions",
      recognitions: [],
    };
  },
  mounted() {
    this.setTitle();
    this.setRecognitions();
  },
  methods: {
    setTitle() {
      this.$store.commit("setPageTitle", this.title);
    },
    async setRecognitions() {
      try {
        this.recognitions = await TopRecognitionService.getTopValues();
      } catch (error) {
        console.error('Error getTopValues:', error);
      }
    },
    formatDate(date) {
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      const hour = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hour}:${minutes}`;
    },
    removePTags(message) {
      return message.replace(/<\/?p>/g, '').trim();
    }
  },


};
</script>

<style scoped>
.recognition-list {
  list-style-type: none;
  padding: 0;
}

.recognition-item {
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.recognition-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h3 {
  font-size: 1.5em;
}
</style>
