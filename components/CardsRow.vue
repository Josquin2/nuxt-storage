<script setup lang="ts">
import type { Card } from "~/types/Card";
import { ref, computed, defineProps } from "vue";

const props = defineProps<{
  search: string;
  type: string;
  allItems: Card[];
}>();

const items = ref<Card[]>(props.allItems);

// return the filtered array
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(props.search.toLowerCase());
    const matchesType =
      props.type === "Все типы" || item.sell_type === props.type;
    return matchesSearch && matchesType;
  });
});
</script>
<template>
  <div class="all-cards" v-if="filteredItems?.length > 0">
    <OneCard v-for="(item, index) in filteredItems" :key="index" :item="item" />
  </div>
  <div class="all-cards not-found" v-else>Не найдено!</div>
</template>

<style lang="scss">
.all-cards {
  width: 1200px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.not-found {
  color: #2d3b87;
  font-size: 18px;
}

@media only screen and (max-width: 1296px) {
  .all-cards {
    width: 80vw;
  }
}

@media only screen and (max-width: 550px) {
  .all-cards {
    width: 90vw;
  }
}
</style>
