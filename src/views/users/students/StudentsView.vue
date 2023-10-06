<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="students" class="main-section">
      <h3 class="main-title">Alunos</h3>
      <DataTableComponent
          :dataJSON="students"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Alunos aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters, useStore} from "vuex";
import DataTableComponent from "@/components/DataTableComponent.vue";
import axios from "@/services";
import {ref} from "vue";

export default {
  name: "StudentsView",
  components: {DataTableComponent, NavigationMenu},
  computed: {
    ...mapGetters(["user", "getEntityData"]),
    students() {
      return this.$store.getters.getEntityData("students");
    }
  },
  data() {
    return {
      studentsData: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "students",
      permissionToEdit: "users.change_student",
      modelToEdit: "Alunos Edit"
    }
  },
  setup() {
    const store = useStore();
    const studentsData = ref([]);

     axios.get(
        "students/")
        .then( response => {
          studentsData.value =  response.data.results
          store.dispatch("setEntityData", {entityName: "students", data: studentsData.value});
        })
        .catch( error => {
          console.log(error)
        });

     return {
       studentsData
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
