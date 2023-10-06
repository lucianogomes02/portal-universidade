<template>
  <form @submit.prevent="submitForm" class="form-container">
    <div v-for="(field, key) in formFields" :key="key" class="form-group">
      <label class="form-label" v-if="key !== 'id'" :for="key">{{ field.label }}</label>
      <input
          v-if="key !== 'id'"
          class="form-input"
          :type="field.type"
          :id="key"
          :name="key"
          v-model="formData[key]"
      />
    </div>
    <button @click="registerOrEditUser">Enviar</button>
  </form>
</template>

<script>
import axios from "@/services";
import {mapGetters} from "vuex";

export default {
  name: "UsersFormComponent",
  props: ["userData"],
  computed: {
    ...mapGetters(["queryUrlForEntity"]),
  },
  data() {
    return {
      formFields: {
        name: { label: "Nome", type: "text" },
        email: { label: "E-mail", type: "email" },
        password: {label: "Senha", type: "password"},
        birth_date: { label: "Data de Nascimento", type: "date" },
      },
      formData: this.userData || {},
    };
  },
  methods: {
    submitFormToEditUser() {
      const requestUrl = `${this.queryUrlForEntity}/${this.userData.id}/`
      const updatedUserData = {
        id: this.formData.id,
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
        birth_date: this.formData.birth_date
      }

      axios.put(requestUrl, updatedUserData)
          .then(response => {
            this.$store.dispatch("setQueryUrlForEntity", null)
          })
          .catch(error => {
            console.log(error)
          }).finally(
          this.$router.go(-1)
          )
    },
    submitFormToRegisterUser() {
      const requestUrl = `${this.queryUrlForEntity}/`
      const newUserData = {
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
        birth_date: this.formData.birth_date
      }

      axios.post(requestUrl, newUserData)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(error => {
            console.log(error)
          })
    },
    registerOrEditUser() {
      if (this.userData && this.userData.id) {
        this.submitFormToEditUser()
      } else {
        this.submitFormToRegisterUser();
      }
    }
  }
}
</script>

<style scoped>
.form-container {
  width: 50vh;
  padding: 30px;
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
