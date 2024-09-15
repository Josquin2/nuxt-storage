<script setup lang="ts">
import "./assets/main.css";
const route = useRoute();
console.log(route);
</script>

<template>
  <MainHeader />
  <RouterView class="main-body" />
  <MainFooter />
</template>

<style lang="scss">
.main-body {
  min-height: 88vh;
  margin-top: 74px;
}
</style>
