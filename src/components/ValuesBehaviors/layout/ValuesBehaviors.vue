<template>
  <div class="values-behaviors">
    <div class="search-container">
      <div class="input-with-icon">
        <IconSearch class="search-icon" />
        <input v-model="searchText" placeholder="Search in cards" class="search-input" />
      </div>
    </div>
    <div class="card-container">
      <card v-for="value in filteredValues" :key="value.id" :title="value.title" :text="value.text"></card>
    </div>
  </div>
</template>

<script>
import { IconSearch } from '@tabler/icons-vue';
import Card from "@/components/ValuesBehaviors/layout/Card.vue";
import Service from "@/components/ValuesBehaviors/services/ValuesBehaviorsService";

export default {
  components: {
    Card,
    IconSearch, 
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

.input-with-icon {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
}

.card-container {
  display: flex;
  justify-content: space-between;
  margin: 16px;
  flex-wrap: wrap; 
}
.search-input {
  padding: 8px 8px 8px 32px;
  width: 100%;
  box-sizing: border-box;
}
</style>
