<script setup lang="ts">
import SearchIcon from "./icons/SearchIcon.vue";

const search = ref("");
const type = ref("Все типы");

const emit = defineEmits(["search", "type"]);

function onSearchClick() {
  emit("search", search.value);
}

function onTypeClick(clickedType: string) {
  type.value = clickedType;
  console.log(type.value);
  emit("type", type.value);
}
</script>

<template>
  <div class="search-bar">
    <div class="types">
      <button
        @click="onTypeClick('Все типы')"
        class="one-type"
        :class="{ 'current-type': type == 'Все типы' }"
      >
        Все типы
      </button>
      <button
        @click="onTypeClick('Прямые продажи')"
        class="one-type"
        :class="{ 'current-type': type == 'Прямые продажи' }"
      >
        Прямые продажи
      </button>
      <button
        @click="onTypeClick('Аукцион')"
        class="one-type"
        :class="{ 'current-type': type == 'Аукцион' }"
      >
        Аукцион
      </button>
    </div>
    <div class="main-search">
      <input
        type="text"
        v-model="search"
        v-on:keyup.enter="onSearchClick"
        placeholder="Поиск..."
      />
      <button @click="onSearchClick"><SearchIcon /></button>
    </div>
  </div>
</template>
