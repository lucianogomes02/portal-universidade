<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="students && students.length > 0" class="main-section">
      <EnrollmentModalComponent
          :showModal="showEnrollmentModal"
          :students="students"
          @close="showEnrollmentModal = false"
      />
      <h3 class="main-title">Alunos</h3>
      <DataTableComponent
          :dataJSON="students"
          :dataFields="dataFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
      <div class="button-container">
        <ButtonComponent button-name="Cadastrar" @click="goToStudentRegistration"/>
        <ButtonComponent class="enroll-student-button" button-name="Matricular" @click="enrollStudentToCourse"/>
      </div>
    </section>
    <div v-else class="empty-data-message">
      <p>Nenhum Aluno cadastrado ainda.</p>
      <div class="button-container-center">
        <ButtonComponent button-name="Cadastrar" @click="goToStudentRegistration"/>
      </div>
    </div>
  </main>
</template>

<script>
import NavigationMenu from "@/components/NavigationMenu.vue";
import {mapGetters, useStore} from "vuex";
import DataTableComponent from "@/components/DataTableComponent.vue";
import axios from "@/services";
import {ref} from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import EnrollmentModalComponent from "@/components/users/students/EnrollmentModalComponent.vue";

export default {
  name: "StudentsView",
  components: {EnrollmentModalComponent, ButtonComponent, DataTableComponent, NavigationMenu},
  computed: {
    ...mapGetters(["user"]),
    students() {
      return this.$store.getters.getEntityData("students");
    }
  },
  data() {
    return {
      studentsData: null,
      showEnrollmentModal: null,
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
  methods: {
    goToStudentRegistration(){
      this.$store.dispatch("setModelDataToEdit", null)
      this.$store.dispatch("setQueryUrlForEntity", this.queryUrlForEntity)
      this.$router.push({ "name": "Alunos Register"})
    },
    enrollStudentToCourse() {
      this.showEnrollmentModal = true;
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

.enroll-student-button {
  color: #002fce;
  border: 2px solid #002fce;
}
</style>
