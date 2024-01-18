<template>
    <div class="grid-item">
      <div class="d-flex align-self-center">
        <h5 style="margin-right: 10px;">{{ title }}</h5>
        <CButton @click="toggleMenu" size="sm" class="btn btn-primary">Manage {{ title }}</CButton>
      </div>
      <ul class="pl-3">
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
  
          <CTooltip v-if="showMenu" content="Remove" placement="top">
            <template #toggler="{ on }">
              <IconCircleX color="#e74c3c" size="1.5rem" data-toggle="tooltip" data-placement="top"
                title="Tooltip on top" v-on="on" @click="removeItem(index)" />
            </template>
          </CTooltip>
  
        </li>
      </ul>
      <div>
        <h5 v-if="showMenu">Add {{ title }}</h5>
        <ul v-if="showMenu" class="pl-3">
          <li v-for="item in filteredList" :key="item._id">
            <button @click="addItem(item.name)" class="btn btn-sm btn-outline-primary">{{ item.name }}</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { IconCircleX } from '@tabler/icons-vue';
  export default {
    props: ['title', 'items', 'filteredList', 'resetMenu'],
    components: { IconCircleX },
    data() {
      return {
        showMenu: false,
      };
    },
    watch: {
    resetMenu() {
      this.showMenu = false;
    },
  },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      removeItem(index) {
        this.$emit('remove-item', index);
      },
      addItem(name) {
        this.$emit('add-item', name);
      },
    },
  };
  </script>