<template>
  <CRow class="d-flex justify-content-center align-items-center position-relative">

      <div v-if="Communities.length && requests.length">
      <CustomHeader :fnButton="create" :filters="filters" textButton="New Request" :requiredButton="isModifiable"
        :requiredFilter="requests.length > 1" :items="requests" @filter-changed="filterChanged" action="create" 
        @filter2-changed="filterChanged2" :filter2="Communities"/>
      </div>

    <div v-if="requests.length">
      <CRow>
        <AskYourCommunityCard v-for="request in requestsFilter" :key="request.id" :data="request"
          :isModifiable="isModifiable" @template-deleted="handleRequestDeleted" @edit-template="handleRequestEdit"
          @show-support-request="handleRequestShow" />
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

  props: {
    title: {
      type: String,
      required: true,
    },
    requestsProp: {
      type: Array,
      required: true,
    },
    isModifiable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      isMobile: window.innerWidth <= 768,
      requests: this.requestsProp,
      requestsFilter: this.requestsProp,
      filters: [
        { name: 'By date', value: 'createdAt' },
      ],
      Communities: [],
    }
  },

  computed: {
    buttonSize() {
      return this.isMobile ? 'sm' : 'lg'
    },
    userProfile() {
      return this.$store.state.userProfile;
    },
  },

  mounted() {
    this.setTitle()
    this.setCommunities()
  },

  methods: {
    create() {
      this.redirect('create')
    },

    async getRequests(email) {
      try {
        let response = await AskYourCommunityService.getRequests(email)
        if (response) {
          this.requestsFilter = response
        }
      } catch (error) {
        console.log(error)
        this.showError(error.error ?? error)
      }
    },

    async setCommunities() {
      try {
        let response = await AskYourCommunityService.getCommunities()
        if (response) {
          this.Communities = response
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
      this.requestsFilter = sortedData;
    },
    filterChanged2(filterData) {
      this.requestsFilter = filterData;
    },
  },
}
</script>

<style scoped>
.search-input {
  padding: 8px 8px 8px 32px;
  width: 100%;
  box-sizing: border-box;
}

.select-wrapper {
  margin-bottom: 1rem;
}
</style>