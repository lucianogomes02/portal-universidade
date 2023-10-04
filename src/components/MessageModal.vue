<template>
  <div class="message-modal" v-if="isVisible">
    <div class="modal-content">
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      <div class="modal-button">
        <ButtonComponent class="close-button" :button="messageButton" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: {ButtonComponent},
  props: {
    isVisible: Boolean,
    message: String,
  },
  data() {
    return {
      messageButton: {
        title: "Ok",
        styles: {
          backgroundColor: "#00ff00",
          fontFamily: "inherit",
          fontSize: "16px",
          height: "4vh",
          width: "10vh",
        },
    } }
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
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  padding: 80px;
  border: 1px solid #888;
  border-radius: 20px;
  max-width: 80%;
  text-align: center;
}

.modal-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-button {
  cursor: pointer;
}
</style>
