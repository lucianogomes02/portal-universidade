<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="grades" class="main-section">
      <h3 class="main-title">Notas</h3>
      <DataTableComponent
          :dataJSON="grades"
          :dataFields="gradesFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Notas aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import {mapGetters} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "GradesView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      grades: null,
      gradesFields: {
        "course_name": "Disciplina",
        "professor_name": "Professor",
        "student_name": "Aluno",
        "value": "Nota",
      },
      queryUrlForEntity: "grades/",
      permissionToEdit: "grades.change_grade",
      modelToEdit: "Notas Edit"
    }
  },
  setup() {
    const grades = ref([]);

    axios.get(
        "grades/")
        .then( response => {
          grades.value =  response.data.results
        })
        .catch( error => {
          console.log(error)
        });

    return {
      grades
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
