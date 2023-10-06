<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h2>Alunos Matriculados na Disciplina</h2>
      <ul>
        <li v-for="enrollment in enrollments" :key="enrollment.id">{{ enrollment.course_name }} - {{ enrollment.student_name }}</li>
      </ul>
      <div class="form-actions">
        <button type="button" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/services";

export default {
  name: "EnrollmentsListModal",
  props: {
    showModal: Boolean,
    courseId: Number,
  },
  data() {
    return {
      enrollments: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    getEnrollments() {
      const requestUrl = "enrollments/";

      axios
          .get(requestUrl)
          .then((response) => {
            this.enrollments = response.data.results;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  mounted() {
    this.getEnrollments();
  },
};
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
