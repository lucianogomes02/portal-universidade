<template>
  <h3 v-if="user"> Hello, {{ user.username }} </h3>
  <a href="javascript:void(0)" @click="handleLogout">Logout</a>
</template>

<script lang="js">
import {mapGetters} from "vuex";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$store.dispatch("setUser", null);
      this.$router.push({ "name": "LoginView"});
    }
  }
};

</script>

<style scoped>

</style>
