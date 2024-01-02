<!-- <template>
  <CRow
    class="d-flex justify-content-center align-items-center position-relative"
  >
    <CustomHeader
      :fnButton="create"
      :filters="filters"
      textButton="New Request"
      :requiredButton="true"
      :requiredFilter="requests.length > 1"
      :items="requests"
      @filter-changed="filterChanged"
      action="create"
    />

    <div v-if="requests.length">
      <CRow>
        <AskYourCommunityCard
          v-for="request in requests"
          :key="request.id"
          :data="request"
          @template-deleted="handleRequestDeleted"
          @edit-template="handleRequestEdit"
          @show-support-request="handleRequestShow"
        />
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

  data() {
    return {
      title: 'Your Requests',
      isMobile: window.innerWidth <= 768,
      requests: [],
      filters: [
                { name: 'By title', value: 'title' },
                { name: 'By date', value: 'createdAt' }
            ],
    }
  },

  computed: {
    buttonSize() {
      return this.isMobile ? 'sm' : 'lg'
    },
    userProfile() {
      return this.$store.state.userProfile;
    }
  },

  mounted() {
    this.getRequests(this.userProfile.email)
    this.setTitle()
  },

  methods: {
    create() {
      this.redirect('create')
    },

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
      this.requests = sortedData;
    },
  },
}
</script>
<style></style> -->


<template>
  <CCard>
      <CCardBody>
      
          <CCallout color="info">
              <h3>Toasts</h3>
              Los toasts permiten mostrar mensajes de forma no intrusiva. <br>
              Estos mensajes pueden ser de tres tipos: ERROR, ADVERTENCIA o ERROR.<br>
              Así mismo, es posible indicar si el toast se cierra automáticamente o no.
          </CCallout>
          <CFormCheck v-model="toastAutohide" :checked="toastAutohide" label="Autohide"/>
          <CButtonGroup role="group">
              <CButton color="info" @click="showInfo">Show Notification</CButton>
              <CButton color="warning" @click="showWarning">Show Warning</CButton>
              <CButton color="danger" @click="showError">Show Error</CButton>
          </CButtonGroup>

          <CCallout class="mt-5" color="info">
              <h3>Mensaje intrusivo</h3>
              Los mensajes instrusivos se muestran en el centro de la pantalla y no permiten realizar otra acción hasta que no son cerrados
          </CCallout>
          <CButton color="danger" @click="showCriticalError">Show Critical Error</CButton>
      </CCardBody>
  </CCard>

</template>
  
<script>

export default {
  name: 'TestErrors',
  data() {
      return {
          toastAutohide: true,
      };
  },

  methods: {
      showInfo() {
          this.$store.commit("addNotification", {
              title: "Título del mensaje",
              message: "Mensaje de información",
              autoHide: this.toastAutohide
          })
      },
      showWarning() {
          this.$store.commit("addWarning", {
              title: "Título del mensaje",
              message: "Mensaje de advertencia",
              autoHide: this.toastAutohide
          })
      },
      showError() {
          this.$store.commit("addError", {
              title: "Título del error",
              message: "Mensaje de error",
              autoHide: this.toastAutohide
          })
      },
      showCriticalError(){
          this.$store.commit("addCriticalError", {
              title: "Título del error",
              message: "Ocurrió un error"
          })
      }
  }

}
</script>
  