<template>
  <NavigationMenu :user="user"/>
  <div class="form-main-container">
    <UsersFormComponent :userData="userDataToEdit"/>
  </div>
</template>

<script>
import UsersFormComponent from "@/components/users/UsersFormComponent.vue";
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
.form-main-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
