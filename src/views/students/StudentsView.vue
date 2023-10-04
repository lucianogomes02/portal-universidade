<template>
  <NavigationMenu :user="user" />
    <h3>Alunos</h3>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters} from "vuex";

export default {
  name: "StudentsView",
  components: {NavigationMenu},
  computed: {
    ...mapGetters(["user"]),
  },
}
</script>

<style scoped>

</style>
