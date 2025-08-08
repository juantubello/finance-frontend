// lib/stores/expense-refresh-store.ts
import { create } from "zustand"

interface ExpenseRefreshState {
  shouldRefreshExpenses: boolean
  setShouldRefreshExpenses: (value: boolean) => void
}

export const useExpenseRefreshStore = create<ExpenseRefreshState>((set) => ({
  shouldRefreshExpenses: false,
  setShouldRefreshExpenses: (value) => set({ shouldRefreshExpenses: value }),
}))