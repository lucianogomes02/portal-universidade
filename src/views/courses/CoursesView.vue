<template>
  <main class="model-list-container">
    <NavigationMenu :user="user" />
    <section v-if="courses && courses.length > 0" class="main-section">
      <EnrollmentsListModal
          :showModal="showEnrollmentModal"
          @close="showEnrollmentModal = false"
      />
      <h3 class="main-title">Disciplinas</h3>
      <DataTableComponent
          :dataJSON="courses"
          :dataFields="coursesFields"
          :queryUrlForEntity="queryUrlForEntity"
          :userPermissions="user.permissions"
          :permissionToEdit="permissionToEdit"
          :modelToEdit="modelToEdit"
      />
      <div class="button-container">
        <ButtonComponent button-name="Cadastrar" @click="goToCourseRegistration"/>
        <ButtonComponent class="enrollments-modal-button" button-name="Ver Matriculas" @click="openEnrollmentsModal"/>
      </div>
    </section>
    <div v-else class="empty-data-message">
      <p>Nenhuma Disciplina cadastrada ainda.</p>
      <div class="button-container-center">
        <ButtonComponent button-name="Cadastrar" @click="goToCourseRegistration"/>
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
import EnrollmentsListModal from "@/components/courses/EnrollmentsListModal.vue";
import EnrollmentModalComponent from "@/components/users/students/EnrollmentModalComponent.vue";

export default {
  name: "CoursesView",
  components: {EnrollmentModalComponent, EnrollmentsListModal, ButtonComponent, NavigationMenu, DataTableComponent},
  computed: {
    ...mapGetters(["user"]),
    courses() {
      return this.$store.getters.getEntityData("courses");
    }
  },
  data() {
    return {
      coursesData: null,
      showEnrollmentModal: null,
      coursesFields: {
        "name": "Nome",
        "workload": "Carga Horária",
        "professor_name": "Professor",
      },
      queryUrlForEntity: "courses",
      permissionToEdit: "courses.change_course",
      modelToEdit: "Disciplinas Edit"
    }
  },
  setup() {
    const store = useStore();
    const coursesData = ref([]);

    axios.get(
        "courses/")
        .then( response => {
          coursesData.value =  response.data.results
          store.dispatch("setEntityData", {entityName: "courses", data: coursesData.value});
        })
        .catch( error => {
          console.log(error)
        });

    return {
      coursesData
    };
  },
  methods: {
    goToCourseRegistration(){
      this.$store.dispatch("setModelDataToEdit", null)
      this.$store.dispatch("setQueryUrlForEntity", this.queryUrlForEntity)
      this.$router.push({ "name": "Disciplinas Register"})
    },
    openEnrollmentsModal() {
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
</style>
