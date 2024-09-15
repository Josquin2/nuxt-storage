<script setup lang="ts">
import type { Card } from "~/types/Card";
import FavoriteIcon from "./icons/FavoriteIcon.vue";
import PlaceIcon from "./icons/PlaceIcon.vue";

const props = defineProps({
  item: Object,
});

const route = useRoute();

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
  console.log("checking");
  const items = favoriteStore.getFavorites;
  for (let i = 0; i < items.length; i++) {
    if (items[i].id == item.id) {
      console.log(items);
      console.log("yea");
      document
        .getElementById(`card-${props?.item?.id}`)
        ?.classList?.add("favorite");
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

function onPayClick(item: Card) {
  const cardId = document.getElementById(`card-${props?.item?.id}`)?.classList;
  if (cardId) {
    cardId?.add("paid");
    isPaid.value = true;
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
          @click="onPayClick(props?.item)"
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

<style lang="scss">
.one-card {
  display: flex;
  width: 100%;
  justify-content: space-between;

  border: 1px solid #e0e3ee;
  border-radius: 20px;

  .left-side {
    display: flex;
    padding: 20px;

    .photo {
      display: flex;
      img {
        width: 256px;
        height: 256px;
        border-radius: 10px;
      }
    }

    .card-info {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      height: 256px;

      .sell-type {
        font-size: 13px;
        color: #969dc3;
      }

      .item-name {
        font-size: 15px;
        color: #2d3b87;
        margin-top: 12px;
      }

      .item-place {
        font-size: 13px;
        margin-top: 24px;
        background-color: #f4f5f9;
        padding: 4px 8px;
        border-radius: 5px;
        width: fit-content;
        color: #616ca5;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .seller {
        display: flex;
        gap: 4px;
        margin-top: 12px;

        p {
          font-size: 13px;
        }

        .seller-title {
          color: #969dc3;
        }
        .seller-value {
          color: #2d3b87;
        }
      }

      .item-type {
        font-size: 13px;
        margin-top: 12px;
        background-color: #f4f5f9;
        padding: 8px;
        border-radius: 5px;
        width: fit-content;
        color: #969dc3;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .type-value {
          color: #616ca5;
        }
      }

      .about {
        margin-top: 12px;
        height: 64px;
        p {
          line-height: 20px;
          height: 64px;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #2d3b87;
          font-size: 13px;
        }
      }
    }
  }
  .right-side {
    border: 1px solid #e0e3ee;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-header {
      display: flex;
      flex-direction: column;
      gap: 5.5px;
      h2 {
        color: #2d3b87;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .details {
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 13px;
          color: #969dc3;
        }

        h5 {
          font-size: 13px;
          color: #2d3b87;
          font-weight: 400;
        }
      }
    }

    .card-footer {
      display: flex;
      gap: 12px;

      .add-button {
        cursor: pointer;
        width: max-content;
        background-color: #f4f5f9;
        border: none;
        border-radius: 10px;
        padding: 17.5px 35.5px;
        font-size: 15px;
        color: #2d3b87;
        font-weight: 600;
        min-width: 214px;
      }

      .pay-button {
        background-color: #69c57f;
        color: #ffffff;
      }

      .favorite-button {
        cursor: pointer;
        background-color: #f4f5f9;
        border: none;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
      }
    }
  }
}

.favorite {
  .right-side {
    .card-footer {
      .favorite-button {
        background-color: #2d3b87;

        svg {
          path {
            fill: #ffffff;
          }
        }
      }
    }
  }
}

.paid {
  .right-side {
    .card-footer {
      .pay-button {
        background-color: #ffffff;
        color: #969dc3;
        border: 1px solid #e0e3ee;
        cursor: not-allowed;
      }
    }
  }
}
</style>
