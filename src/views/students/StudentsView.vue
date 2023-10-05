<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <h3 class="main-title">Alunos</h3>
    <DataTableComponent :dataJSON="students" :dataFields="dataFields" :queryUrlForEntity="queryUrlForEntity"/>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters} from "vuex";
import DataTableComponent from "@/components/DataTableComponent.vue";
import axios from "axios";
import {ref} from "vue";

export default {
  name: "StudentsView",
  components: {DataTableComponent, NavigationMenu},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      students: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "students/"
    }
  },
  setup() {
    const students = ref([]);

     axios.get(
        "students/")
        .then( response => {
          students.value =  response.data.results
        })
        .catch( error => {
          console.log(error)
        });

     return {
       students
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
</style>
