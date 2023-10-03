<template>
    <button
        class="button"
        :style="button.styles"
    >
      {{ button.title }}
    </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    button: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 1px;
  border: none;
  color: #ffffff;
  background-color: #000;
  border-radius: 41px;
}

.button:hover {
  opacity: 80%;
}
</style>
