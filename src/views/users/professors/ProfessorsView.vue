<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="professors && professors.length > 0" class="main-section">
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
import {mapGetters, useStore} from "vuex";
import {ref} from "vue";
import axios from "@/services";

export default {
  name: "ProfessorsView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
    professors() {
      return this.$store.getters.getEntityData("professors");
    }
  },
  data() {
    return {
      professorsData: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "professors",
      permissionToEdit: "users.change_professor",
      modelToEdit: "Professores Edit"
    }
  },
  setup() {
    const store = useStore();
    const professorsData = ref([]);

    axios.get(
        "professors/")
        .then( response => {
          professorsData.value =  response.data.results;
          store.dispatch("setEntityData", {entityName: "professors", data: professorsData.value});
        })
        .catch( error => {
          console.log(error)
        });

    return {
      professorsData
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
