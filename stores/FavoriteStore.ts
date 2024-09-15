import { type Card } from "~/types/Card";

interface RootState {
  favorites: Card[];
}

export const useFavoriteStore = defineStore({
  id: "favorites",
  state: () =>
    ({
      favorites: [],
    } as RootState),
  getters: {
    getFavorites: (state: RootState) => {
      return state.favorites;
    },
  },
  actions: {
    setFavorite(data: Card) {
      if (!data) return;

      this.favorites.push(data);
    },
    deleteFavorite(data: Card) {
      if (!data) return;

      this.favorites = this.favorites.filter(
        (favorite) => favorite.id !== data.id
      );
    },
  },
});
