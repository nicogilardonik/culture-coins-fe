<template>
    <div>
        <h2>{{ name }}</h2>
        <ul>
           <li v-for="user in UsersFilter" :key="user.id">{{ user.nickName }}</li>
        </ul>
        <button @click="save">save</button>
        
    </div>
</template>

<script>
import CommunitiesService from '@/components/MiInfogain/Communities/services/CommunitiesService';
//import CustomEditor from '@/components/CustomEditor.vue';

export default {
    props: {
        name: { type: String },
        users: { type: Array },
    },
//    components: {
//        CustomEditor
//    },
    data() {
    return {
      UsersFilter: [],

    }
  },
    mounted() {
    this.setUsers();
  },
  methods: {
    setUsers() {
            this.UsersFilter = this.users.filter(user => user.communities.includes(this.name));
        },
    async save(){
        if (!this.userProfile.communities.includes(this.name)) {
        this.userProfile.communities.push(this.name);
        try {
      await CommunitiesService.update(this.userProfile).then(() => {
        this.showSuccess('Entro a la comunidad.');
      })
        .catch((error) => {
          this.showError(error.error ?? error);
        });
    } catch (error) {
      this.showError(error.error ?? error);
    }
}else {
      this.$swal.fire({
        title: 'Community already added!',
        text: 'You have already added this community to your profile.',
        icon: 'warning',
        confirmButtonText: 'OK',
      })
    }},
    showError(text) {
      this.$swal.fire({
        title: "Error!",
        text: text,
        icon: "error",
        confirmButtonText: "Ok",
      });
    },   
    showSuccess(text) {
    this.$swal.fire({
      title: 'Success!',
      text: text,
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  }, 
},
computed: {
    userProfile() {
      return this.$store.state.userProfile;
    },
}
}
</script>

<style scoped>

</style>
