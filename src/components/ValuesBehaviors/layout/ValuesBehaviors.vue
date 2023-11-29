<template>
  <div class="values-behaviors">
    <div class="search-container">
      <input v-model="searchText" placeholder="Buscar en las tarjetas" class="search-input" />
    </div>
    <div class="card-container">
      <card
        v-for="value in filteredValues"
        :key="value.id"
        :title="value.title"
        :text="value.text"
      ></card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/ValuesBehaviors/layout/Card.vue";
import Service from "@/components/ValuesBehaviors/services/ValuesBehaviorsService";

export default {
  components: {
    Card,
  },
  data() {
    return {
      title: "Values and Behaviors",
      isMobile: window.innerWidth <= 768,
      values: [],
      searchText: "",
    };
  },
  computed: {
    filteredValues() {
      return this.values.filter((value) => {
        const searchTextLowerCase = this.searchText.toLowerCase();
        return (
          value.title.toLowerCase().includes(searchTextLowerCase) ||
          value.text.toLowerCase().includes(searchTextLowerCase)
        );
      });
    },
  },
  mounted() {
    window.addEventListener("resize", this.checkWindowSize);
    this.checkWindowSize();
    this.getRequests();
    this.setTitle();
  },
  methods: {
    setTitle() {
      this.$store.commit("setPageTitle", this.title);
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth <= 768;
    },
    async getRequests() {
      try {
        const response = await Service.getValuesBehaviors();
        if (response) {
          this.values = response;
        }
      } catch (error) {
        console.log(error);
        this.showError(error.Error ?? error);
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
  },
};
</script>

<style scoped>
.values-behaviors {
  display: flex;
  flex-direction: column; 
  align-items: center; 
}

.search-container {
  margin-bottom: 16px;
}

.search-input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin: 16px;
  flex-wrap: wrap; 
}

</style>
