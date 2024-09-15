<script setup lang="ts">
import data from "../items.json";
import type { Card } from "~/types/Card";

// getting elements from json as specified in task
// but there should be some fetch function
const items: Ref<Card[]> = ref(data as Card[]);

const search = ref("");
const type = ref("Все типы");
</script>
<template>
  <div class="storage-page">
    <SearchBar
      @search="(req) => (search = req)"
      @type="(req) => (type = req)"
    />
    <CardsRow :search="search" :type="type" :all-items="items" />
  </div>
</template>

<style lang="scss"></style>
