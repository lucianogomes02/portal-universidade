<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="coordinators && coordinators.length > 0" class="main-section">
      <h3 class="main-title">Coordenadores</h3>
      <DataTableComponent
          :dataJSON="coordinators"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
      <div class="button-container">
        <ButtonComponent button-name="Cadastrar" @click="goToCoordinatorRegistration"/>
      </div>
    </section>
    <div v-else class="empty-data-message">
      <p>Nenhum Coordenador cadastrado ainda.</p>
      <div class="button-container-center">
        <ButtonComponent button-name="Cadastrar" @click="goToCoordinatorRegistration"/>
      </div>
    </div>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import DataTableComponent from "@/components/DataTableComponent.vue";
import {mapGetters, useStore} from "vuex";
import {ref} from "vue";
import axios from "@/services";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  name: "CoordinatorsView",
  components: {ButtonComponent, NavigationMenu, DataTableComponent},
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
  methods: {
    goToCoordinatorRegistration(){
      this.$store.dispatch("setModelDataToEdit", null)
      this.$store.dispatch("setQueryUrlForEntity", this.queryUrlForEntity)
      this.$router.push({ "name": "Coordenadores Register"})
    }
  }
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

.button-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 100px;
  margin-left: 78%;
}

.button-container button {
  margin-right: 10px;
}

.empty-data-message {
  text-align: center;
  margin-top: 10vh;
  font-size: 18px;
}
</style>
