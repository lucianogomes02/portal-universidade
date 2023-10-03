<template>
  <h3 v-if="user"> Hello, {{ user.username }} </h3>
  <router-link to="/">

  </router-link>
</template>

<script lang="js">
export default {
  name: "HomeView",
  props: ["user"]
};

</script>

<style scoped>

</style>
