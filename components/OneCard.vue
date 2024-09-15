<script setup lang="ts">
import type { Card } from "~/types/Card";
import FavoriteIcon from "./icons/FavoriteIcon.vue";
import PlaceIcon from "./icons/PlaceIcon.vue";

const props = defineProps<{
  item: Card;
}>();

const router = useRouter();
const currentPath = ref(router.currentRoute.value.fullPath);

watch(
  () => router.currentRoute.value,
  (newRoute) => {
    currentPath.value = newRoute.fullPath;
  }
);

const favoriteStore = useFavoriteStore();
const transactionsStore = useTransactionsStore();

const isInTransactions = ref(false);
const isPaid = ref(false);

// format the number to thousands
function formatPrice(price: number) {
  return price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function onFavoriteClick(item: Card) {
  const cardId = document.getElementById(`card-${props?.item?.id}`)?.classList;
  if (cardId && cardId.contains("favorite")) {
    favoriteStore.deleteFavorite(item);
    cardId.remove("favorite");
  } else {
    favoriteStore.setFavorite(item);
    checkFavorites(item);
  }
}

function onTransactionsClick(item: Card) {
  if (isInTransactions.value == true) {
    transactionsStore.deleteTransaction(item);
    isInTransactions.value = false;
  } else {
    transactionsStore.setTransaction(item);
    checkTransactions(item);
  }
}

function checkFavorites(item: Card) {
  const items = favoriteStore.getFavorites;
  const favorite = document.getElementById(`card-${props?.item?.id}`);
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == item.id) {
      favorite?.classList?.add("favorite");
    }
  }
}

function checkTransactions(item: Card) {
  const items = transactionsStore.getTransactions;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == item.id) {
      isInTransactions.value = true;
    }
  }
}

function onPayClick() {
  const cardId = document.getElementById(`card-${props?.item?.id}`);
  if (cardId) {
    cardId?.classList?.add("paid");
    isPaid.value = true;
    // I think it's worth push changes to the store here
  }
}

onMounted(() => {
  checkFavorites(props?.item);
  checkTransactions(props?.item);
});
</script>

<template>
  <div class="one-card" :id="`card-${props?.item?.id}`">
    <div class="left-side">
      <div class="photo">
        <img :src="props?.item?.image" alt="" />
      </div>
      <div class="card-info">
        <p class="sell-type">{{ props?.item?.sell_type }}</p>
        <h3 class="item-name">{{ props?.item?.name }}</h3>
        <div class="item-place">
          <PlaceIcon />
          <p>{{ props?.item?.place }}</p>
        </div>
        <div class="seller">
          <p class="seller-title">Продавец</p>
          <p class="seller-value">{{ props?.item?.seller }}</p>
        </div>
        <div class="item-type">
          <p>Вид товара</p>
          <p class="type-value">{{ props?.item?.item_type }}</p>
        </div>

        <div class="about">
          <p>{{ props?.item?.about_item }}</p>
        </div>
      </div>
    </div>
    <div class="right-side">
      <div class="card-header">
        <h2>{{ formatPrice(props?.item?.count * props?.item?.price) }} ₽</h2>
        <div class="details">
          <p>Количество</p>
          <h5>{{ props?.item?.count }} шт.</h5>
        </div>
        <div class="details">
          <p>Стоимость за штуку</p>
          <h5>{{ formatPrice(props?.item?.price) }} ₽</h5>
        </div>
      </div>
      <div class="card-footer">
        <button
          v-if="currentPath == '/TransactionsPage'"
          @click="onPayClick()"
          class="add-button pay-button"
          :disabled="isPaid"
        >
          {{ isPaid ? "Оплачено" : "Оплатить" }}
        </button>
        <button
          v-else
          class="add-button"
          @click="onTransactionsClick(props?.item)"
        >
          {{ isInTransactions ? "В сделках" : "Добавить в сделки" }}
        </button>
        <button class="favorite-button" @click="onFavoriteClick(props?.item)">
          <FavoriteIcon />
        </button>
      </div>
    </div>
  </div>
</template>
