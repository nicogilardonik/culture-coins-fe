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
            <CButton v-if="userInComunity" color="primary" size="md" class="kibana-font-weight" @click="chage">
              Leave
            </CButton>
            <CButton v-else color="primary" size="md" class="kibana-font-weight" @click="chage">
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

    async setUsers() {
      try {
        await CommunitiesService.getUsers().then((response) => {
          this.UsersFilter = response.filter(user => user.communities.includes(this.name))
        }).catch((error) => {
          this.showError(error.error ?? error);
        });
      } catch (error) {
        this.showError(error.error ?? error);
      }
      ;
    },
    async chage() {
      let mensaje;
      let userComunity;
      if (!this.userProfile.communities.includes(this.name)) {
        this.userProfile.communities.push(this.name);
        mensaje = "I join the community.";
        userComunity = true;
      }else{
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
              console.log(this.UsersFilter);
            }else{
              const userIndex = this.UsersFilter.indexOf(this.userProfile);
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
