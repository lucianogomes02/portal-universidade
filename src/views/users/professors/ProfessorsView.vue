<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="professors" class="main-section">
      <h3 class="main-title">Professores</h3>
      <DataTableComponent
          :dataJSON="professors"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Professores aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import {mapGetters} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "ProfessorsView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      professors: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "professors/",
      permissionToEdit: "users.change_professor",
      modelToEdit: "Professores Edit"
    }
  },
  setup() {
    const professors = ref([]);

    axios.get(
        "professors/")
        .then( response => {
          professors.value =  response.data.results
        })
        .catch( error => {
          console.log(error)
        });

    return {
      professors
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
