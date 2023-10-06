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
    <button @click="submitFormToEditUser">Enviar</button>
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
        name: { label: 'Nome', type: 'text' },
        email: { label: 'E-mail', type: 'email' },
        birth_date: { label: 'Data de Nascimento', type: 'date' },
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
        birth_date: this.formData.birth_date
      }

      axios.put(requestUrl, updatedUserData)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
}
</script>

<style scoped>

</style>
