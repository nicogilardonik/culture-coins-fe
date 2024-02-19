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
                  <li v-for="(user, index) in displayedUsers.slice(0, 5)" :key="index">{{ user.nickName }}</li>
                </ul>
              </div>
            </div>
          </CCol>
          <CButton v-if="usersFilter.length > 5" @click="openModal" color="secondary">Ver más</CButton>
          <CCol sm="6" md="6" lg="4" xl="2">
            <CButton v-if="userInComunity" color="primary" class="kibana-font-weight" @click="change">
              Leave
            </CButton>
            <CButton v-else color="primary" class="kibana-font-weight" @click="change">
              Join
            </CButton>
          </CCol>

        </CRow>

        <CModal v-model="modalOpen" size="lg">
          <CModalHeader>
            Miembros de la comunidad
          </CModalHeader>
          <CModalBody>
            <ul>
              <li v-for="(user, index) in usersFilter" :key="index">{{ user.nickName }}</li>
            </ul>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" @click="closeModal">Cerrar</CButton>
          </CModalFooter>
        </CModal>

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
      usersFilter: [],
      userInComunity: false,
      modalOpen: false
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
      let userCard = this.users.filter(user => user.communities.includes(this.name))
      this.usersFilter = userCard;
    },
    async change() {
      let mensaje;
      let userComunity;
      if (!this.userInComunity) {
        this.$store.state.userProfile.communities.push(this.name);
        mensaje = "I join the community.";
        userComunity = true;
        this.usersFilter.push(this.$store.state.userProfile);
      } else {
        mensaje = "I left the community.";
        userComunity = false;
        const index = this.$store.state.userProfile.communities.indexOf(this.name);
        this.$store.state.userProfile.communities.splice(index, 1);
        const userIndex = this.usersFilter.findIndex(user => user._id === this.$store.state.userProfile._id);
        if (userIndex !== -1) {
          this.usersFilter.splice(userIndex, 1);
        }
      }

      try {
        await CommunitiesService.update(this.$store.state.userProfile).then(() => {
          this.showSuccess(mensaje);
          this.userInComunity = userComunity;
        }).catch((error) => {
          this.showError(error.error ?? error);
        });
      } catch (error) {
        this.showError(error.error ?? error);
      }
    },
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
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
    // Devuelve solo los primeros 5 usuarios para mostrar
    displayedUsers() {
      return this.usersFilter.slice(0, 5);
    },
  }
}
</script>

<style scoped></style>
