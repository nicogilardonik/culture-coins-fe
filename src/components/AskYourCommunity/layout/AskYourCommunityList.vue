<template>
  <div v-if="this.requests.length">
  <askCommunityList :title="'Your Requests'" :requestsProp="requests" :isModifiable="true" />
</div>
</template>

<script>
import askCommunityList from '@/components/AskCommunityList.vue'
import AskYourCommunityService from '@/components/AskYourCommunity/services/askYourCommunityService'
export default {
  name: 'AskYourCommunityList',

  data() {
    return {
      requests: []
    }
  },

  components: {
    askCommunityList,
  },
  computed: {
    userProfile() {
      return this.$store.state.userProfile;
    }
  },

  mounted() {
    this.getRequests(this.userProfile.email)

  },

  methods: {

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
