<template>
  <NavigationMenu :user="user" />
</template>

<script lang="js">
import {mapGetters} from "vuex";
import NavigationMenu from "@/components/NavigationMenu.vue";

export default {
  name: "HomeView",
  components: {NavigationMenu},
  computed: {
    ...mapGetters(["user"]),
  },
};

</script>

<style scoped>

</style>
