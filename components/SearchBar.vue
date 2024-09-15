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
      <input type="text" v-model="search" v-on:keyup.enter="onSearchClick" />
      <button @click="onSearchClick"><SearchIcon /></button>
    </div>
  </div>
</template>

<style lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1200px;
  height: fit-content;

  .types {
    display: flex;
    align-items: center;
    gap: 12px;
    background-color: #f4f5f9;
    padding: 0px 12px;
    border: 1px solid #e0e3ee;
    border-radius: 10px;

    .one-type {
      cursor: pointer;
      background-color: transparent;
      border: none;
      padding: 12px 0px;
      font-size: 15px;
      color: #969dc3;
    }
    .current-type {
      color: #2d3b87;
    }
  }

  .main-search {
    display: flex;
    position: relative;

    input {
      height: 48px;
      width: 274px;
      border: 1px solid #e0e3ee;
      border-radius: 10px;
      padding: 0px 48px 0px 20px;
      color: #2d3b87;
    }

    button {
      cursor: pointer;
      position: absolute;
      top: 4px;
      right: 4px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #2d3b87;
      border-radius: 10px;
      border: none;
    }
  }
}
</style>
