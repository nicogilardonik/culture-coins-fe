<template>

<div v-for="community in communities" :key="community.id">
  <CommunityCard :name="community.name" :users="Users"/> 
</div>


</template>

<script>
import CommunityCard from '@/components/MiInfogain/Communities/layaout/CommunityCard.vue'
import CommunitiesService from '@/components/MiInfogain/Communities/services/CommunitiesService';
export default {
  name: 'Communities',

  components: {
    CommunityCard,
  },

  data() {
    return {
      title: 'Communities',
      isMobile: window.innerWidth <= 768,
      Users: [],
      communities: [],
      name: "Uruguay"
    }
  },
  mounted() {
    this.setTitle()
    this.getUsers();
    this.getCommunities();
  },

  methods: {
    setTitle() {
      this.$store.commit('setPageTitle', this.title)
    },

    async getUsers() {
    try {
      await CommunitiesService.getUsers().then((response) => {
        this.Users = response;
      }).catch((error) => {
        this.showError(error.error ?? error);
      });
    } catch (error) {
      this.showError(error.error ?? error);
    }
  },
  async getCommunities(){
    try {
      await CommunitiesService.getCommunities().then((response) => {
        this.communities = response;
      }).catch((error) => {
        this.showError(error.error ?? error);
      });
    } catch (error) {
      this.showError(error.error ?? error);
    }
  },
  showError(text) {
      this.$swal.fire({
        title: "Error!",
        text: text,
        icon: "error",
        confirmButtonText: "Ok",
      });
    },

  }
  }
</script>

<style scoped>

</style>
