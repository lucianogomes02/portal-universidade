<template>
  <NavigationMenu :user="user"/>
  <div class="form-main-container">
    <CoursesFormComponent :userData="modelDataToEdit"/>
  </div>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters} from "vuex";
import CoursesFormComponent from "@/components/courses/CoursesFormComponent.vue";

export default {
  name: "CourseEditOrRegisterView",
  components: {NavigationMenu, CoursesFormComponent},
  computed: {
    ...mapGetters(["user", "modelDataToEdit"]),
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
