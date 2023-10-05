<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="courses" class="main-section">
      <h3 class="main-title">Disciplinas</h3>
      <DataTableComponent
          :dataJSON="courses"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Disciplinas aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import {mapGetters} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "CoursesView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      courses: null,
      dataFields: {
        "name": "Nome",
        "workload": "Carga Horária",
        "professor_name": "Professor",
      },
      queryUrlForEntity: "courses/",
      permissionToEdit: "courses.change_course",
      modelToEdit: "Disciplinas Edit"
    }
  },
  setup() {
    const courses = ref([]);

    axios.get(
        "courses/")
        .then( response => {
          courses.value =  response.data.results
        })
        .catch( error => {
          console.log(error)
        });

    return {
      courses
    };
  },
}
</script>

<style scoped>
.main-title {
  text-align: center;
  margin-top: 5vh;
  margin-bottom: 0;
  font-weight: 500;
  font-size: 30px;
}

.error-text {
  text-align: center;
  margin-top: 10vh;
}
</style>
