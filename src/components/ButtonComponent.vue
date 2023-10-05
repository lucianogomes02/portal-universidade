<template>
    <button class="button">
      {{ buttonName }}
    </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    buttonName: {
      type: String,
      required: true
    }
  },
};
</script>

<style>
.button {
  color: #28a400;
  border: 2px solid #28a400;

  font-size: 14px;
  max-width: 90px;
  cursor: pointer;
  border-radius: 5px;
  background-color: transparent;
  padding: 8px 10px;
  min-height: 20px;
}

.button:hover {
  background-color: #dbdef6;
}
</style>
