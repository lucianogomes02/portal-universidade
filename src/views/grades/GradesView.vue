<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="grades && grades.length > 0" class="main-section">
      <GradeRegistrationModal
          :showModal="showGradeModal"
          :professor="this.user.id"
          @close="showGradeModal = false"
      />
      <h3 class="main-title">Notas</h3>
      <DataTableComponent
          :dataJSON="grades"
          :dataFields="gradesFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
      />
      <div class="button-container">
        <ButtonComponent button-name="Cadastrar" @click="goToGradeRegistration"/>
      </div>
    </section>
    <div v-else class="empty-data-message">
      <p>Nenhum Aluno cadastrado ainda.</p>
      <div class="button-container-center">
        <ButtonComponent button-name="Cadastrar" @click="goToGradeRegistration"/>
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
import GradeRegistrationModal from "@/components/users/grades/GradeRegistrationModal.vue";
import EnrollmentModalComponent from "@/components/users/students/EnrollmentModalComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  name: "GradesView",
  components: {ButtonComponent, EnrollmentModalComponent, GradeRegistrationModal, NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
    grades() {
      return this.$store.getters.getEntityData("grades");
    }
  },
  data() {
    return {
      gradesData: null,
      showGradeModal: null,
      gradesFields: {
        "course_name": "Disciplina",
        "professor_name": "Professor",
        "student_name": "Aluno",
        "value": "Nota",
      },
      queryUrlForEntity: "grades",
      permissionToEdit: "grades.change_grade",
      modelToEdit: "Notas Edit"
    }
  },
  setup() {
    const store = useStore();
    const gradesData = ref([]);

    axios.get(
        "grades/")
        .then( response => {
          gradesData.value =  response.data.results
          store.dispatch("setEntityData", {entityName: "grades", data: gradesData.value});
        })
        .catch( error => {
          console.log(error)
        });

    return {
      gradesData
    };
  },
  methods: {
    goToGradeRegistration(){
      this.showGradeModal = true;
    },
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
