<template>
  <CRow
    class="d-flex justify-content-center align-items-center position-relative"
  >
    <CustomHeader
      :fnButton="create"
      :filters="filters"
      textButton="New Request"
      :requiredButton="true"
      :requiredFilter="requests.length > 1"
      :items="requests"
      @filter-changed="filterChanged"
      action="create"
    />

    <div v-if="requests.length">
      <CRow>
        <AskYourCommunityCard
          v-for="request in requests"
          :key="request.id"
          :data="request"
          @template-deleted="handleRequestDeleted"
          @edit-template="handleRequestEdit"
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
import AskYourCommunityService from '@/components/AskYourCommunity/services/askYourCommunityService'
import CustomHeader from '@/components/CustomHeader.vue'

export default {
  name: 'AskYourCommunityList',

  components: {
    AskYourCommunityCard,
    CustomHeader,
  },

  data() {
    return {
      title: 'Your Requests',
      isMobile: window.innerWidth <= 768,
      requests: [],
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
    this.getRequests(this.userProfile.email)
    this.setTitle()
  },

  methods: {
    create() {
      this.redirect('create')
    },

    async getRequests(email) {
      try {
        let response = await AskYourCommunityService.getRequests(email)
        if (response) {
          this.requests = response
        }
      } catch (error) {
        console.log(error)
        this.showError(error.error ?? error)
      }
    },

    async handleRequestDeleted(id) {
      try {
       await AskYourCommunityService.deleteRequest(id);
        this.showSuccess('Request deleted successfully');
        this.getRequests(this.userProfile.email);
      } catch (error) {
        console.log(error)
        this.showError(error.Error ?? error)
      }
    },
    handleRequestEdit(id) {
      this.redirect('edit', id)
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
    filterChanged(sortedData) {
      this.requests = sortedData;
    },
  },
}
</script>
<style></style>
  