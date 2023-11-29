<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CContainer v-if="pageTitle" fluid class="custom-title">
      <h3 class="page-title">{{pageTitle}}</h3>
    </CContainer>
  </CHeader>
</template>

<script>
//import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
   // AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },

  computed: {
    pageTitle() {
      return this.$store.state.pageTitle
    },
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>

<style scoped>

.custom-title {
    margin-top: 100px; 
    width: auto;
    max-width: 100%; /* Añade esta línea para establecer un ancho máximo */
}


@media (max-width: 575.98px) {
    .custom-title {
      margin-top: 5px; 
      width: auto;
    }
}

@media (min-width: 576px) and (max-width: 991.98px) {
    .custom-title {
      margin-top: 5px; 
      width: auto;
    }
}

@media (min-width: 992px) {
    .custom-title {
      margin-top: -30px; 
      width: auto;
    }
}

</style>