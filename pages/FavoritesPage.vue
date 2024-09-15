<script setup lang="ts">
import type { Card } from "~/types/Card";

const store = useFavoriteStore();

const search = ref("");
const type = ref("Все типы");

// getting items from the store
const items: Ref<Card[]> = ref(store.getFavorites);
</script>

<template>
  <div class="favorites-page">
    <SearchBar
      @search="(req) => (search = req)"
      @type="(req) => (type = req)"
    />
    <CardsRow :search="search" :type="type" :all-items="items" />
  </div>
</template>
