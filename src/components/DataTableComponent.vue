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
          Ações
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
        <td class="action-buttons">
          <ButtonComponent class="edit-button" buttonName="Editar">
            Editar
          </ButtonComponent>
          <ButtonComponent class="delete-button" buttonName="Deletar">
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

export default {
  name: "DataTableComponent",
  components: {ButtonComponent},
  props: ["dataJSON", "dataFields", "queryUrlForEntity"],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style scoped>
.data-table-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  width: 100vw;
  background-color: #fff;
}

.data-table {
  color: #000;
  width: 100%;
  max-width: 150vh;
  border-collapse: collapse;
  border-radius: 5px;
  box-shadow: 3px 3px 3px 3px rgba(154, 141, 141, 0.77);
}

.column-name {
  font-weight: 700;
}

.data-table-columns {
  background-color: #f2f2f2;
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
