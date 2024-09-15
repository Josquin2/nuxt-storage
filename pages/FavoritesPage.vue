<script setup lang="ts">
import type { Card } from "~/types/Card";

const store = useFavoriteStore();

const search = ref("");
const type = ref("Все типы");
console.log(store.getFavorites);
const items: Ref<Card[]> = ref(store.getFavorites);
</script>

<template>
  <div>
    <SearchBar
      @search="(req) => (search = req)"
      @type="(req) => (type = req)"
    />
    <CardsRow :search="search" :type="type" :all-items="items" />
  </div>
</template>
