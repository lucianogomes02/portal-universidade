<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div v-for="(field, key) in formFields" :key="key" class="form-group">
      <label class="form-label" v-if="key !== 'id' || key !== 'professor'" :for="key">{{ field.label }}</label>
      <input
          v-if="key !== 'id'"
          class="form-input"
          :type="field.type"
          :id="key"
          :name="key"
          v-model="formData[key]"
      />
    </div>
    <label class="form-label">Professor</label>
    <select class="form-input" v-model="selectedProfessorId">
      <option value="">Selecione um professor</option>
      <option v-for="professor in professors" :key="professor.id" :value="professor.id">{{ professor.name }}</option>
    </select>
    <button @click="registerOrEditCourse">Enviar</button>
  </form>
</template>

<script>
import axios from "@/services";
import {mapGetters} from "vuex";

export default {
  name: "CoursesFormComponent",
  props: ["userData"],
  computed: {
    ...mapGetters(["queryUrlForEntity"]),
  },
  data() {
    return {
      professors: [],
      selectedProfessorId: null,
      formFields: {
        name: { label: "Nome", type: "text" },
        workload: { label: "Carga Horária", type: "number" },
      },
      formData: this.userData || {},
    };
  },
  methods: {
    submitFormToEditCourse() {
      const requestUrl = `${this.queryUrlForEntity}/${this.userData.id}/`
      const updatedCourseData = {
        id: this.formData.id,
        name: this.formData.name,
        workload: this.formData.workload,
        professor: this.selectedProfessorId,
      }

      axios.put(requestUrl, updatedCourseData)
          .then(response => {
            this.$store.dispatch("setQueryUrlForEntity", null)
          })
          .catch(error => {
            console.log(error)
          }).finally(
          this.$router.go(-1)
      )
    },
    submitFormToRegisterCourse() {
      const requestUrl = `${this.queryUrlForEntity}/`
      const newCourseData = {
        name: this.formData.name,
        workload: this.formData.workload,
        professor: this.selectedProfessorId,
      }

      axios.post(requestUrl, newCourseData)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error)
          })
    },
    getProfessors() {
      const requestUrl = "professors/"
      axios.get(requestUrl)
          .then(response => {
            this.professors = response.data.results;
          })
          .catch(error => {
            console.log(error)
          })
    },
    registerOrEditCourse() {
      if (this.userData && this.userData.id) {
        this.submitFormToEditCourse()
      } else {
        this.submitFormToRegisterCourse();
      }
    }
  },
  mounted() {
    this.getProfessors();
  },
}
</script>

<style scoped>
.form-container {
  width: 50vh;
  padding: 20px;
  margin-top: 20vh;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
