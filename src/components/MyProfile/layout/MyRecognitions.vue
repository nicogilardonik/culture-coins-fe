<template>
    <CRow
      class="d-flex justify-content-center align-items-center position-relative"
    >
      <CustomHeader
        :fnButton="create"
        :filters="filters"
        :requiredButton="false"
        :requiredFilter="recognitions.length > 1"
        :items="recognitions"
        @filter-changed="filterChanged"
        action="create"
      />
  
      <div v-if="recognitions.length">
        <CRow>
          <MyRecognitionsCard
            v-for="recognition in recognitions"
            :key="recognition.id"
            :data="recognition"
          />
        </CRow>
      </div>
  
      <div v-else class="d-flex justify-content-center">
        <h2 class="image-text">You have no recognitions yet</h2>
      </div>
    </CRow>
  </template>
  <script>

  import RecognitionService from '@/components/Recognition/services/recognitionService'
  import CustomHeader from '@/components/CustomHeader.vue'
  import MyRecognitionsCard from './MyRecognitionsCard.vue';
  
  export default {
    name: 'MyRecognitions',
  
    components: {
    CustomHeader,
    MyRecognitionsCard
},
  
    data() {
      return {
        title: 'My Recognitions',
        isMobile: window.innerWidth <= 768,
        recognitions: [],
        filters: [
                  { name: 'By title', value: 'title' },
                  { name: 'By date', value: 'createdAt' }
              ],
      }
    },
  
    computed: {
      buttonSize() {
        return this.isMobile ? 'sm' : 'lg'
      },
      userProfile() {
        return this.$store.state.userProfile;
      }
    },
  
    mounted() {
      this.getMyRecognitions(this.userProfile.email)
      this.setTitle()
    },
  
    methods: {
      create() {
        this.redirect('create')
      },
  
      async getMyRecognitions(email) {
        try {
          let response = await RecognitionService.getMyRecognitions(email)
          if (response) {
            this.recognitions = response
          }
        } catch (error) {
          console.log(error)
          this.showError(error.error ?? error)
        }
      },
  
      handleRequestEdit(id) {
        this.redirect('edit', id)
      },
      handleRequestShow() {
        this.getMyRecognitions(this.userProfile.email)
      },
      showSuccess(text) {
        this.$swal.fire({
          title: 'Success!',
          text: text,
          icon: 'success',
          confirmButtonText: 'Ok',
        })
      },
      showError(text) {
        this.$swal.fire({
          title: 'Error!',
          text: text,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      },
      redirect(to, id) {
        let currentRoute = this.$router.currentRoute
        let currentPath = currentRoute.value.fullPath
        currentPath = currentPath.replace('/list', '')
        if (id) {
          this.$router.push(`${currentPath}/${to}/${id}`)
        } else {
          this.$router.push(`${currentPath}/${to}`)
        }
      },
      setTitle() {
        this.$store.commit('setPageTitle', this.title)
      },
      filterChanged(sortedData) {
        this.recognitions = sortedData;
      },
    },
  }
  </script>
  <style></style>
  