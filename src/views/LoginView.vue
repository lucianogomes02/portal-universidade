<template>
  <main class="login-page">
    <div class="center-container">
      <h1>Entre na sua conta</h1>
      <MessageModal
          v-if="loginError"
          :is-visible="loginError"
          :message="errorMessage"
          @close="loginError = false"
      ></MessageModal>
      <form class="login-form">
        <div class="form-group">
          <input
              class="email-field"
              type="text"
              placeholder="E-mail"
              v-model="email"
          />
        </div>
        <div class="form-group">
          <input
              class="password-field"
              type="password"
              placeholder="Senha"
              v-model="password"
          />
        </div>
      </form>
      <div class="form-group">
        <ButtonComponent class="login-button" buttonName="Login" @click="handleLogin" />
      </div>
    </div>
  </main>
</template>

<script lang="js">
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "@/services";
import MessageModal from "@/components/MessageModal.vue";

export default {
  name: "LoginView",
  components: {MessageModal, ButtonComponent},
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      await axios.post(
          "login/",
          {
            "email": this.email,
            "password": this.password
          }
      ).then( response => {
        try {
          this.setUserAndToken(response.data);
          this.$router.push({ name: "HomeView" });
        } catch (error) {
          this.handleError(error);
        }
      }).catch( error => {
        this.handleError();
      });
    },
    setUserAndToken(authData) {
      localStorage.setItem("token", authData.access);
      this.$store.dispatch("setUser", authData.user);
    },
    handleError(error) {
      if (!error) {
        this.errorMessage = "Usuário ou Senha inválidos";
        this.loginError = true;
      } else {
        const errorValue = Object.values(error);
        const errorString = errorValue[0];
        this.errorMessage = Object.values(errorString);
        this.loginError = true;
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center-container {
  text-align: center;
}

.login-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.password-field, .email-field{
  height: 5vh;
  width: 35vh;
  background-color: inherit;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  font-family: inherit;
  font-size: 2.5vh;
}

.login-button {
  height: 5vh;
  width: 28vh;
  font-size: 2vh;
}
</style>
