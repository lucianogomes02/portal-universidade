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
    <button type="submit">Enviar</button>
  </form>
</template>

<script>
export default {
  name: "UsersFormComponent",
  props: ["userData"],
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
    submitForm() {
      console.log(this.formData);
    },
  },
}
</script>

<style scoped>

</style>
