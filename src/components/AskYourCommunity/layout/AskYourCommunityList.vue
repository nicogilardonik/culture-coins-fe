<template>
    <CRow class="m-4 d-flex justify-content-center align-items-center position-relative">
    <CCol xs="12" class="d-flex justify-content-center">
      <h1 class="text-center mb-4">{{ title }}</h1>
    </CCol>

    <div class="d-flex justify-content-end position-absolute create-btn">
      <CButton color="primary" size="lg" @click="create"> Create</CButton>
    </div>
  </CRow>
</template>
<script>
   export default {
       name: 'AskYourCommunityList',
       data() {
           return {
               title: 'Requests',
           }
       },

       methods: {
           create() {
            let currentRoute = this.$router.currentRoute;
            let currentPath = currentRoute.value.fullPath;
            currentPath = currentPath.replace('/list', '');
            this.$router.push(`${currentPath}/create`);
           }
       }
   } 
</script>
<style></style>