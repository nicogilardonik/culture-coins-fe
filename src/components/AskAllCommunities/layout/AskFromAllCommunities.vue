<template>
  <CRow
    class="d-flex justify-content-center align-items-center position-relative"
  >
    <CustomHeader
        :filters="filters"
        :requiredFilter="requests.length > 1"
        :items="requests"
        @filter-changed="filterChanged"
        :communities="Communities"
        @select-change="handleSelectChange"
      />

    <div v-if="requests.length">
      <CRow>
        <AskYourCommunityCard
          v-for="request in requestsFilter"
          :key="request.id"
          :data="request"
          :isModifiable="false"
          @show-support-request="handleRequestShow"
        />
      </CRow>
    </div>

    <div v-else class="d-flex justify-content-center">
      <h2 class="image-text">You have no request created</h2>
    </div>
  </CRow>
</template>
<script>
import AskYourCommunityCard from '@/components/AskYourCommunity/layout/AskYourCommunityCard.vue'
import AskAllCommunityService from '@/components/AskAllCommunities/services/AskAllCommunityService'
import CustomHeader from '@/components/CustomHeader.vue'

export default {
  name: 'AllCommunityRequests',

  components: {
    AskYourCommunityCard,
    CustomHeader,
  },

  data() {
    return {
      title: 'All community requests',
      isMobile: window.innerWidth <= 768,
      requests: [],
      requestsFilter: [],
      Communities: [],
      filters: [
                { name: 'By date', value: 'createdAt' }
            ],
      valueFilter: '',
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
    this.getRequests()
    this.setTitle()
    this.setCommunities()
  },

  methods: {
    async setCommunities() {
      try {
        let response = await AskAllCommunityService.getCommunities()
        if (response) {
          this.Communities = response
        }
      } catch (error) {
        console.log(error)
        this.showError(error.error ?? error)
      }
    },

    create() {
      this.redirect('create')
    },

    async getRequests() {
      try {
        let response = await AskAllCommunityService.getRequests()
        if (response) {
          this.requests = response
          this.requestsFilter = response
        }
      } catch (error) {
        console.log(error)
        this.showError(error.error ?? error)
      }
    },
    handleRequestShow() {
      this.getRequests(this.userProfile.email)
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
    filterChanged(filteredData) {
      this.requests = filteredData;
      if (this.valueFilter) {
        this.requestsFilter = this.requests.filter(request => request.community === this.valueFilter);
      }else{
        this.requestsFilter = this.requests;
      }
    },
    handleSelectChange(value) {
      this.valueFilter = value;   
      if(value){
        this.requestsFilter = this.requests.filter(request => request.community === value);
      }else{
        this.requestsFilter = this.requests;
      }
    }
  },
}
</script>
<style></style>
