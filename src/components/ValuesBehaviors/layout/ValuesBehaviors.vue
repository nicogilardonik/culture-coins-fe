<template>
    <h1>aca</h1>
</template>
<script>
export default {
    data() {
    return {
      title: 'Values and behaviors',
      isMobile: window.innerWidth <= 768,
    }
  },
    mounted() {
    window.addEventListener('resize', this.checkWindowSize);
    this.checkWindowSize();
    this.setTitle();
  },
    methods: {
    setTitle() {
      this.$store.commit('setPageTitle', this.title);
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },
}
}
</script>
<style scoped>
</style>





