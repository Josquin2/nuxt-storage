import { type Card } from "~/types/Card";

interface RootState {
  transactions: Card[];
  paidTransactions: Card[];
}

export const useTransactionsStore = defineStore("transactions", {
  state: () =>
    ({
      transactions: [],
      paidTransactions: [],
    } as RootState),
  getters: {
    getTransactions: (state: RootState): Card[] => {
      return state.transactions;
    },
  },
  actions: {
    setTransaction(data: Card) {
      if (!data) return;

      this.transactions.push(data);
    },
    deleteTransaction(data: Card) {
      if (!data) return;

      this.transactions = this.transactions.filter(
        (transaction: Card) => transaction.id !== data.id
      );
    },
  },
});
