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
        <ButtonComponent :button="loginButton" @click="handleLogin" />
      </div>
    </div>
  </main>
</template>

<script lang="js">
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "../services";
import MessageModal from "@/components/MessageModal.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "LoginView",
  components: {MessageModal, ButtonComponent},
  data() {
    return {
      email: "",
      password: "",
      loginError: false,
      errorMessage: "",
      loginButton: {
        title: "Login",
        styles: {
          backgroundColor: "#00ff00",
          fontFamily: "inherit",
          fontSize: "16px",
          height: "4vh",
          width: "14vh",
        },
      },
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
          this.setUserAndToken(response.data.access);
          this.$router.push({ name: "HomeView" });
        } catch (error) {
          this.handleError(error);
        }
      }).catch( error => {
        this.handleError();
      });
    },
    setUserAndToken(token) {
      const tokenData = this.decodeUserToken(token);
      localStorage.setItem("token", token);
      const user = {
        "id": tokenData.user.id,
        "username": tokenData.user.username,
        "permissions": tokenData.user.permissions,
      }
      this.$store.dispatch("setUser", user);
    },
    decodeUserToken(token) {
      try{
        return VueJwtDecode.decode(token);
      }
      catch(error){
        return error
      }
    },
    handleError(error) {
      if (!error) {
        this.errorMessage = "Usuário ou Senha inválidos";
        this.loginError = true;
      } else {
        this.errorMessage = error
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
  width: 28vh;
  background-color: inherit;
  border: 1px solid #b6b6b6;
  border-radius: 15px;
  font-family: inherit;
  font-size: 2vh;
}
</style>
