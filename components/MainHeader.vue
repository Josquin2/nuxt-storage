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

<style lang="scss">
.main-header {
  width: 1200px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .background {
    height: 40px;
    width: 100%;
    background-color: #e0e3ee;
    border-radius: 0px 0px 10px 10px;
  }

  .header-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .header-button {
      text-decoration: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      min-width: 86px;
      padding: 7px 0px;
      background-color: #ffffff;
      border: none;
      border-radius: 10px;
      color: #2d3b87;
      font-size: 13px;
      font-weight: 500;
    }
    .current-page {
      background-color: #f4f5f9;
    }
  }
}
</style>
