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
      <div class="button-container">
        <ButtonComponent button-name="Cadastrar" @click="goToProfessorRegistration"/>
      </div>
    </section>
    <div v-else class="empty-data-message">
      <p>Nenhum Professor cadastrado ainda.</p>
      <div class="button-container-center">
        <ButtonComponent button-name="Cadastrar" @click="goToProfessorRegistration"/>
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
  name: "ProfessorsView",
  components: {ButtonComponent, NavigationMenu, DataTableComponent},
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
  methods: {
    goToProfessorRegistration(){
      this.$store.dispatch("setUserDataToEdit", null)
      this.$store.dispatch("setQueryUrlForEntity", this.queryUrlForEntity)
      this.$router.push({ "name": "Professores Register"})
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
