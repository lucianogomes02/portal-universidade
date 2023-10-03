<template>
  <h3 v-if="user"> Hello, {{ user.username }} </h3>
</template>

<script lang="js">
export default {
  name: "HomeView",
  data() {
    return {
      user: null
    }
  },
  created() {
      this.user = {
        "id": localStorage.getItem("user"),
        "username": localStorage.getItem("username"),
        "permissions": localStorage.getItem("permissions")
      }
  }
};

</script>

<style scoped>

</style>
