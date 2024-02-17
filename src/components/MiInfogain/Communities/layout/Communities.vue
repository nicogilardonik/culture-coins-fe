<template>

<div v-if="this.usersData !== null">
  <div v-for="community in communities" :key="community.id">
    <CommunityCard :name="community.name" :users="this.usersData"/> 
  </div>
</div>


</template>

<script>
import CommunityCard from '@/components/MiInfogain/Communities/layout/CommunityCard.vue'
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
      communities: [],
      usersData: null,
    }
  },
  mounted() {
    this.setTitle()
    this.getCommunities();
    this.getUsers()
  },

  methods: {
    setTitle() {
      this.$store.commit('setPageTitle', this.title)
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
  async getUsers() {
  try {
    this.usersData = await CommunitiesService.getUsers();
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
