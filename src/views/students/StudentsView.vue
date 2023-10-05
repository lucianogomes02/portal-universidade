<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="students" class="main-section">
      <h3 class="main-title">Alunos</h3>
      <DataTableComponent :dataJSON="students" :dataFields="dataFields" :queryUrlForEntity="queryUrlForEntity"/>
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Alunos aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
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

.error-text {
  text-align: center;
  margin-top: 10vh;
}
</style>
