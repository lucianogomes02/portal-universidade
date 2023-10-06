<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h2>Registrar Nota de Aluno</h2>
      <form @submit.prevent="registerStudentGrade">
        <div class="form-group">
          <label for="student">Aluno:</label>
          <select v-model="selectedStudent" id="student">
            <option v-for="student in students" :key="student.id" :value="student.id">{{ student.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="course">Disciplina:</label>
          <select v-model="selectedCourse" id="course">
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="grade">Nota (entre 0 e 10):</label>
          <input
              type="number"
              class="grade"
              v-model="grade"
              min="0"
              max="10"
              step="0.1"
              required
          />
        </div>
        <div class="form-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Registrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@/services";

export default {
  name: "GradeRegistrationModal",
  props: {
    showModal: Boolean,
    professor: String
  },
  data() {
    return {
      selectedStudent: null,
      selectedCourse: null,
      grade: null,
      courses: Array,
      students: Array,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    registerStudentGrade() {
      if (!this.selectedStudent || !this.selectedCourse || !this.grade) {
        alert("Preencha todos os campos corretamente.");
        return;
      }

      const gradeData = {
        student: this.selectedStudent,
        course: this.selectedCourse,
        professor: this.professor,
        value: this.grade,
      };

      const requestUrl = "grades/";

      axios
          .post(requestUrl, gradeData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      this.closeModal();
    },
    getCourses() {
      const coursesUrl = "courses/";
      axios
          .get(coursesUrl)
          .then((response) => {
            this.courses = response.data.results;
            console.log(response)
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getStudents() {
      const studentsUrl = "students/";
      axios
          .get(studentsUrl)
          .then((response) => {
            this.students = response.data.results;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  mounted() {
    this.getCourses();
    this.getStudents();
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
}

select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.grade{
  width: 5vh;
  height: 5vh;
  font-size: 2vh;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"] {
  background-color: #5bc0de;
}

button:hover {
  background-color: #0056b3;
}
</style>
