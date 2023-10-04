<template>
  <div class="card-button">
    <div class="card-button-header">
      <i class="icon">{{ modelIcon }}</i>
      <span class="model-name">{{ modelName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardButton",
  props: {
    modelName: null,
    modelIcon: String,
  },
};
</script>

<style scoped>
.card-button {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 16px;
  width: 170px;
  height: 150px;
  margin-bottom: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s;
}

.card-button:hover {
  transform: translateY(-4px);
}

.card-button-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 24px;
  margin-bottom: 8px;
  color: #333;
}

.model-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
</style>
