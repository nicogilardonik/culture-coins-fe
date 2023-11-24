<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <!-- <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand> -->
      <CHeaderNav class="d-none d-md-flex me-auto">
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink href="#">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <!-- <CContainer fluid>
      <AppBreadcrumb />
    </CContainer> -->
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