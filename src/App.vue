<template>
  <router-view />
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.cdnfonts.com/css/assistant");

* {
  font-family: "Assistant", sans-serif;
  font-weight: 350;
}

@media (min-width: 1024px) {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
body { margin: 0 !important; }
</style>
