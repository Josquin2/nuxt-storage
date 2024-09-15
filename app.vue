<script setup lang="ts">
import "./assets/main.css";
</script>

<template>
  <MainHeader />
  <NuxtPage class="main-body" />
  <MainFooter />
</template>

<style lang="scss">
.main-body {
  min-height: 88vh;
  margin-top: 74px;
}
</style>
