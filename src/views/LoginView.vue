<template>
  <main class="login-page">
    <h1>Entre na sua conta</h1>
    <MessageModal
        v-if="loginError"
        :is-visible="loginError"
        :message="errorMessage"
        @close="loginError = false"
    ></MessageModal>
    <form class="login-form">
      <input
          class="email-field"
          type="text"
          placeholder="E-mail"
          v-model="email"
      />
      <input
          class="password-field"
          type="password"
          placeholder="Senha"
          v-model="password"
      />
    </form>
    <ButtonComponent :button="loginButton" @click="handleLogin"/>
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
          backgroundColor: "blue",
          fontSize: "16px",
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
        "username": tokenData.user.user_name,
        "permissions": tokenData.user.permissions,
      }
      this.$store.dispatch("setUser", user);
    },
    decodeUserToken(token) {
      try{
        let decodedToken = VueJwtDecode.decode(token);
        return decodedToken;
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

</style>
