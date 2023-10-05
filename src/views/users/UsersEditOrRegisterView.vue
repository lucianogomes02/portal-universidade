<template>
  <NavigationMenu :user="user"/>
  <UsersFormComponent :userData="userDataToEdit"/>
</template>

<script>
import UsersFormComponent from "@/components/UsersFormComponent.vue";
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters} from "vuex";

export default {
  name: "UsersEditOrRegisterView",
  components: {NavigationMenu, UsersFormComponent},
  computed: {
    ...mapGetters(["user", "userDataToEdit"]),
  },
}
</script>

<style scoped>

</style>
