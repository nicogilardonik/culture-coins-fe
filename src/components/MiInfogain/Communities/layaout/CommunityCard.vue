<template>
  <CCol :sm="12" :md="12" class="p-1">
    <CCard>
      <CCardHeader class="d-flex justify-content-between">
        <div class="d-flex align-self-center">
          <h4 class="d-inline-block">{{ name }}</h4>
        </div>
      </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="6" md="6" lg="8" xl="10">
            <div>
              <div class="custom-display">
                <p>members:</p>
                <ul>
                  <li v-for="user in UsersFilter" :key="user.id">{{ user.nickName }}</li>
                </ul>
              </div>
            </div>
          </CCol>

          <CCol sm="6" md="6" lg="4" xl="2">
            <CButton v-if="userInComunity" color="primary" class="kibana-font-weight" @click="change">
              Leave
            </CButton>
            <CButton v-else color="primary" class="kibana-font-weight" @click="change">
              Join
            </CButton>
          </CCol>

        </CRow>
      </CCardBody>
    </CCard>
  </CCol>
</template>

<script>
import CommunitiesService from '@/components/MiInfogain/Communities/services/CommunitiesService';

export default {
  props: {
    name: { type: String },
    users: { type: Array },
  },
  data() {
    return {
      UsersFilter: [],
      userInComunity: false

    }
  },
  mounted() {
    this.setUsers();
    this.setUserInComunity();
  },
  methods: {
    setUserInComunity() {
      if (this.$store.state.userProfile.communities.includes(this.name)) {
        this.userInComunity = true;
      }
    },
    setUsers() {
      //console.log("0");
      const userCard = this.users.filter(user => user.communities.includes(this.name))
      this.UsersFilter = userCard
       if (this.name == ".NET") {
      //   console.log("primer console.log");
      //   console.log("1", this.users);
         console.log("UsersFilter en setUsers", this.UsersFilter);
       }
    },

    // async setUsers() {
    //   try {
    //     await CommunitiesService.getUsers().then((response) => {
    //       this.UsersFilter = response.filter(user => user.communities.includes(this.name))
    //     }).catch((error) => {
    //       this.showError(error.error ?? error);
    //     });
    //   } catch (error) {
    //     this.showError(error.error ?? error);
    //   }
    //   ;
    // },

    async change() {
      debugger
      console.log("UsersFilter en change" ,this.UsersFilter);
      console.log("UsersFilter en change 2" ,this.UsersFilter);
      let mensaje;
      let userComunity;
      if (!this.userProfile.communities.includes(this.name)) {
        this.userProfile.communities.push(this.name);
        mensaje = "I join the community.";
        userComunity = true;
      } else {
        mensaje = "I left the community.";
        userComunity = false;
        const index = this.userProfile.communities.indexOf(this.name);
        this.userProfile.communities.splice(index, 1);
      }
      try {
        await CommunitiesService.update(this.userProfile).then(() => {
          this.showSuccess(mensaje);
          this.userInComunity = userComunity;
          if (this.userInComunity) {
            this.UsersFilter.push(this.userProfile);
          } else {
            const userIndex = this.UsersFilter.indexOf(this.userProfile);
            console.log(userIndex);
            console.log("userIndex", this.UsersFilter[userIndex]);
            this.UsersFilter.splice(userIndex, 1);
          }
        })
          .catch((error) => {
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

<style scoped></style>
