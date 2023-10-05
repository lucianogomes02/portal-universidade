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
import {mapGetters} from "vuex";
import {ref} from "vue";
import axios from "axios";

export default {
  name: "CoordinatorsView",
  components: {NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
  },
  data() {
    return {
      coordinators: null,
      dataFields: {
        "name": "Nome",
        "email": "E-mail",
        "birth_date": "Data de Nascimento"
      },
      queryUrlForEntity: "coordinators/",
      permissionToEdit: "users.change_coordinator",
      modelToEdit: "Coordenadores Edit"
    }
  },
  setup() {
    const coordinators = ref([]);

    axios.get(
        "coordinators/")
        .then( response => {
          coordinators.value =  response.data.results
        })
        .catch( error => {
          console.log(error)
        });

    return {
      coordinators
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
