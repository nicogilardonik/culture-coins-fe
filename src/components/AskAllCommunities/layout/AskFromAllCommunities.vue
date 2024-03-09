<template>
  <div v-if="this.requests.length">
  <askCommunityList :title="'All Requests'" :requestsProp="requests" :isModifiable="false" />
</div>
</template>

<script>
import askCommunityList from '@/components/AskCommunityList.vue'
import AskAllCommunityService from '@/components/AskAllCommunities/services/AskAllCommunityService'
export default {
  name: 'AskAllCommunity',

  data() {
    return {
      requests: []
    }
  },

  components: {
    askCommunityList,
  },

  mounted() {
    this.getRequests()
  },
  methods: {

    async getRequests() {
      try {
        let response = await AskAllCommunityService.getRequests()
        if (response) {
          this.requests = response
        }
      } catch (error) {
        console.log(error)
        this.showError(error.error ?? error)
      }
    },
    showError(text) {
        this.$swal.fire({
          title: 'Error!',
          text: text,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      },
  }
}
</script>

<style scoped></style>