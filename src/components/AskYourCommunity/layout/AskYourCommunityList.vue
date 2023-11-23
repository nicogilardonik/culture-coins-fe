<template>
  <CRow
    class="m-4 d-flex justify-content-center align-items-center position-relative"
  >
    <CCol xs="6" class="d-flex justify-content-end">
      <h1 class="text-center mb-4">{{ title }}</h1>
    </CCol>

    <CCol xs="6" class="d-flex justify-content-end">
      <CButton color="primary" :size="buttonSize" @click="create">Create</CButton>
    </CCol>


    <div v-if="requests.length">
        <CRow>
            <AskYourCommunityCard v-for="request in requests" :key="request.id" :data="request" @template-deleted="handleRequestDeleted" @edit-template="handleRequestEdit" />
        </CRow>
    </div>

    <div v-else class="campaign-img-section mt-2">
        <div class="image-with-text">
            <h2 class="image-text">NO HAY REQUEST</h2>
        </div>
    </div>
    
  </CRow>
</template>
<script>

import AskYourCommunityCard from '@/components/AskYourCommunity/layout/AskYourCommunityCard.vue'
import AskYourCommunityService from '@/components/AskYourCommunity/services/askYourCommunityService'


export default {
  name: 'AskYourCommunityList',

  components: {
    AskYourCommunityCard,
  },

  data() {
    return {
      title: 'Requests',
      isMobile: window.innerWidth <= 768,
      requests: [{_id: 1, title: 'test',message:'<p><span class="ql-size-large">HOLA</span></p><p><br></p><p><strong>Esta es una prueba para saber si funciona bien.</strong></p>', createdAt: '2021-05-05T12:00:00.000Z', updatedAt: '2021-05-05T12:00:00.000Z'}
      ,{_id: 2, title: 'test',message:'<p>test 2</p>', createdAt: '2021-05-05T12:00:00.000Z', updatedAt: '2021-05-05T12:00:00.000Z'}
      ,{_id: 3, title: 'test',message:'<p>test 3</p>', createdAt: '2021-05-05T12:00:00.000Z', updatedAt: '2021-05-05T12:00:00.000Z'}
      ,{_id: 4, title: 'test',message:'<p>test 4</p>', createdAt: '2021-05-05T12:00:00.000Z', updatedAt: '2021-05-05T12:00:00.000Z'}
    
    ],
    }
  },

  computed: {
    buttonSize() {
      return this.isMobile ? 'sm' : 'lg'
    },
  },

  mounted() {
   // this.getRequests();
  },

  methods: {
    create() {
      let currentRoute = this.$router.currentRoute;
      let currentPath = currentRoute.value.fullPath;
      currentPath = currentPath.replace('/list', '');
      this.$router.push(`${currentPath}/create`);
    },

    async getRequests() {
      let response = await AskYourCommunityService.getRequests()
      if (response) {
        this.requests = response
      }
    },

    handleRequestDeleted(id){
      console.log('delete',id);
    },
    handleRequestEdit(id){
      console.log('edit',id);
    },

  },
}
</script>
<style></style>
