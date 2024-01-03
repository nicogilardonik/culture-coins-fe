<template>
  <div class="card-container">
    <div class="card">
      <h2>{{ title }}</h2>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String },
    text: { type: String },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: space-between;
  margin: 16px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 220px;
  text-align: center;
  transition: box-shadow 0.3s;
  box-sizing: border-box;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 8px;
}

p {
  color: #555;
}
</style>

