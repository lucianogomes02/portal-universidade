<template>
  <div class="message-modal" v-if="isVisible">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close-button" @click="closeModal">&times;</span>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    message: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.message-modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  cursor: pointer;
}
</style>
