import { defineStore } from "pinia";
import { type Card } from "~/types/Card";

export const useTransactionsStore = defineStore({
  id: "transactions",
  state: (): { transactions: Card[] } => ({
    transactions: [],
  }),
  getters: {
    getTransactions: (state) => {
      return state.transactions;
    },
  },
  actions: {
    setTransaction(data: Card) {
      this.transactions.push(data);
    },
    deleteTransaction(data: Card) {
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== data.id
      );
    },
  },
});
