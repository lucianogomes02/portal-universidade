<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="coordinators" class="main-section">
      <h3 class="main-title">Coordenadores</h3>
      <DataTableComponent
          :dataJSON="coordinators"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
    </section>
    <h3 v-else class="error-text">Opa! Parece que não há Coordenadores aqui. Qualquer dúvida, entre em contato com nosso Suporte :)</h3>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import {mapGetters, useStore} from "vuex";
import {ref} from "vue";
import axios from "@/services";

export default {
  name: "CoordinatorsView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
    coordinators() {
      return this.$store.getters.getEntityData("coordinators");
    }
  },
  data() {
    return {
      coordinatorsData: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "coordinators",
      permissionToEdit: "users.change_coordinator",
      modelToEdit: "Coordenadores Edit"
    }
  },
  setup() {
    const store = useStore();
    const coordinatorsData = ref([]);

    axios.get(
        "coordinators/")
        .then( response => {
          coordinatorsData.value =  response.data.results;
          store.dispatch("setEntityData", {entityName: "coordinators", data: coordinatorsData.value});
        })
        .catch( error => {
          console.log(error)
        });

    return {
      coordinatorsData
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
