<template>
    <div>
      <ListRecognitions :titleProps="titlet" :email="email"></ListRecognitions>
    </div>
  </template>
  
  <script>
  import ListRecognitions from '@/components/ListRecognitions'
  
  export default {
    name: 'LastActivity',
  
    components: {
      ListRecognitions,
    },
  
    data() {
      return {
        titlet: "Last Activity",
        email: "",
      }
    },

  }
  </script>
  
  <style></style>