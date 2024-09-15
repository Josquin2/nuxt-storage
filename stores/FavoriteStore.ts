import { defineStore } from "pinia";
import { type Card } from "~/types/Card";

export const useFavoriteStore = defineStore({
  id: "favorites",
  state: (): { favorites: Card[] } => ({
    favorites: [],
  }),
  getters: {
    getFavorites: (state) => {
      return state.favorites;
    },
  },
  actions: {
    setFavorite(data: Card) {
      this.favorites.push(data);
    },
    deleteFavorite(data: Card) {
      this.favorites = this.favorites.filter(
        (favorite) => favorite.id !== data.id
      );
    },
  },
});
