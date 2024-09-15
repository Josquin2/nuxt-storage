<script setup lang="ts">
import type { Card } from "~/types/Card";

const store = useTransactionsStore();

const search = ref("");
const type = ref("Все типы");

const items: Ref<Card[]> = ref(store.getTransactions);
</script>

<template>
  <div class="transactions-page">
    <SearchBar
      @search="(req) => (search = req)"
      @type="(req) => (type = req)"
    />
    <CardsRow :search="search" :type="type" :all-items="items" />
  </div>
</template>
