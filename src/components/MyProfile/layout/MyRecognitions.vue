<template>
    <div>
      <ListRecognitions :titleProps="titlet" :email="email"></ListRecognitions>
    </div>
  </template>
  
  <script>
  import ListRecognitions from '@/components/ListRecognitions'
  
  export default {
    name: 'MyRecognitions',
  
    components: {
      ListRecognitions,
    },
  
    data() {
      return {
        titlet: "My recognition",
        email: null,
      }
    },
  
    created() {
      this.email = this.$store.state.userProfile.email;
    },
  }
  </script>
  
  <style></style>