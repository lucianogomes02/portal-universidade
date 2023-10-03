<template>
  <router-view :user="user" />
</template>

<script>

export default {
  name: "App",
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

@media (min-width: 1024px) {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
