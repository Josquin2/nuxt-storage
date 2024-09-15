<script setup lang="ts">
import * as data from "../items.json";
import type { Card } from "~/types/Card";

const items: Ref<Card[]> = ref(data?.default);

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
