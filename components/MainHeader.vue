<script setup lang="ts">
import BagIcon from "./icons/BagIcon.vue";
import FavoriteIcon from "./icons/FavoriteIcon.vue";
import StockIcon from "./icons/StockIcon.vue";

const router = useRouter();
const currentPath = ref(router.currentRoute.value.fullPath);

watch(
  () => router.currentRoute.value,
  (newRoute) => {
    currentPath.value = newRoute.fullPath;
  }
);
</script>

<template>
  <header class="main-header">
    <div class="background"></div>
    <div class="header-buttons">
      <router-link
        to="/FavoritesPage"
        class="header-button"
        :class="{ 'current-page': currentPath == '/FavoritesPage' }"
      >
        <FavoriteIcon />
        Избранное
      </router-link>

      <router-link
        to="/StoragePage"
        class="header-button"
        :class="{ 'current-page': currentPath == '/StoragePage' }"
      >
        <StockIcon />
        Склад</router-link
      >

      <router-link
        to="/TransactionsPage"
        class="header-button"
        :class="{ 'current-page': currentPath == '/TransactionsPage' }"
      >
        <BagIcon />
        Сделки
      </router-link>
    </div>
  </header>
</template>
