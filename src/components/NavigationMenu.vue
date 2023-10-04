<template>
  <header class="header-section">
    <a href="#">Portal Universidade</a>
    <div class="menu-dropdown">
      <button class="button-dropdown">
        Olá, {{ user.username }}
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="content">
        <a href="#">Perfil</a>
        <a href="javascript:void(0)" @click="handleLogout">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavigationMenu",
  props: {
    user: null
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      this.$store.dispatch("setUser", null);
      this.$router.push({ "name": "LoginView"});
    }
  }
}
</script>

<style scoped>
.header-section {
  overflow: hidden;
  background-color: #333;
  margin: 0 auto;
  display: flex;
}

.header-section a {
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  margin-left: auto;
}

.menu-dropdown {
  overflow: hidden;
  margin-left: auto;
}

.menu-dropdown .button-dropdown {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.header-section a:hover, .menu-dropdown:hover .button-dropdown {
  background-color: grey;
}

.content {
  display: none;
  position: absolute;
  background-color: #333;
  min-width: 160px;
  z-index: 1;
}

.content a {
  float: none;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.menu-dropdown:hover .content {
  display: block;
}
</style>
