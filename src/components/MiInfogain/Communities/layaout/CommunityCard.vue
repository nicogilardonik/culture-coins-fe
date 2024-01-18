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
            <CButton color="primary" size="md" class="kibana-font-weight" @click="join">
              join
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

    }
  },
  mounted() {
    this.setUsers();
  },
  methods: {
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

    async join() {
      if (!this.userProfile.communities.includes(this.name)) {
        this.userProfile.communities.push(this.name);
        try {
          await CommunitiesService.update(this.userProfile).then(() => {
            this.showSuccess('I join the community.');
            this.UsersFilter.push(this.userProfile);
          })
            .catch((error) => {
              this.showError(error.error ?? error);
            });
        } catch (error) {
          this.showError(error.error ?? error);
        }
      } else {
        this.$swal.fire({
          title: 'You could not join!',
          text: 'You already belong to this community',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
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
