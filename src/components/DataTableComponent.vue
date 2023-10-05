<template>
  <section class="data-table-container">
    <table class="data-table">
      <thead class="data-table-columns">
        <tr>
          <th v-for="(dataValue, dataKey) in dataJSON[0]" :key="dataKey">
            <div class="column-name" v-if="dataKey !== 'id'">
              {{ dataFields[dataKey] }}
            </div>
          </th>
          <th>
            <div class="actions-column" v-if="showActionsColumn"> Ações </div>
          </th>
        </tr>
      </thead>
      <tbody class="data-table-rows">
        <tr v-for="(data, index) in dataJSON" :key="index">
          <td v-for="(dataValue, dataKey) in data" :key="dataKey">
            <div class="row-value">
              {{ dataKey !== 'id' ? (dataKey === 'birth_date' ? formatDate(dataValue) : dataValue) : '' }}
            </div>
          </td>
          <td class="action-buttons" v-if="showActionsColumn">
            <ButtonComponent class="edit-button" buttonName="Editar" @click="editModelData(data.id)">
              Editar
            </ButtonComponent>
            <ButtonComponent class="delete-button" buttonName="Deletar" @click="deleteModelData(data.id)">
              Deletar
            </ButtonComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "@/services";

export default {
  name: "DataTableComponent",
  components: {ButtonComponent},
  props: ["dataJSON", "dataFields", "queryUrlForEntity", "userPermissions", "permissionToEdit", "modelToEdit"],
  computed: {
    showActionsColumn() {
      return this.userHasPermissionToEdit(this.permissionToEdit);
    },
  },
  methods: {
    formatDate(dateString) {
      const dateParts = dateString.split("-");
      return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    },
    userHasPermissionToEdit(permissionNeeded) {
      return this.userPermissions.includes(permissionNeeded);
    },
    editModelData(modelId) {
      const requestUrl = `${this.queryUrlForEntity}${modelId}/`
      axios.get(requestUrl)
          .then(response => {
            const data = {
              id: response.data.success.id,
              name: response.data.success.name,
              email: response.data.success.email,
              birth_date: response.data.success.birth_date
            }

            this.$store.dispatch("setUserDataToEdit", data);
            this.$store.dispatch("setQueryUrlForEntity", this.queryUrlForEntity);
            this.$router.push({ name: this.modelToEdit });
          })
          .catch(error => {
            console.log(error)
          })
    },
    deleteModelData(modelId) {
      const requestUrl = `${this.queryUrlForEntity}${modelId}/`
      axios.delete(requestUrl)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
};
</script>

<style scoped>
.data-table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background-color: #fff;
  overflow-x: auto;
}

.data-table {
  color: #000;
  width: 100%;
  max-width: 150vh;
  border-collapse: collapse;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 3px rgba(154, 141, 141, 0.77);
  table-layout: fixed;
  word-break: break-word;
}

.column-name {
  font-weight: 700;
}

.data-table-columns {
  background-color: #f2f2f2;
}

.actions-column {
  font-size: 16px;
  font-weight: 700;
}

.data-table-columns th {
  height: 56px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .25px;
  text-align: left;
  padding: 0 10px;
}

.data-table-rows tr {
  height: 60px;
}

.data-table-rows td {
  vertical-align: middle;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.25px;
}

.action-buttons {
  vertical-align: middle;
  width: 5vh;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.25px;
  white-space: nowrap;
  margin-top: 1vh;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.edit-button {
  color: #28a400;
  border: 2px solid #28a400;
}

.delete-button {
  color: #d00000;
  border: 2px solid #d00000;
  margin-left: 1vh;
}

.edit-button:hover,
.delete-button:hover {
  background-color: #dbdef6;
}

</style>
