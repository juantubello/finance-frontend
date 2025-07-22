import { create } from 'zustand'

export interface CardExpense {
  document_number: string
  holder: string
  position: number
  date: string
  description: string
  amount: number
  formatted_amount: string
}

export interface CardHolder {
  document_number: string
  holder: string
  total_ars: number
  total_usd: number
  formatted_total_ars: string
  formatted_total_usd: string
  Expenses: CardExpense[]
}

export interface CardData {
  document_number: string
  card_type: string
  ResumeDate: string
  total_ars: number
  total_usd: number
  formatted_total_ars: string
  formatted_total_usd: string
  Holders: CardHolder[]
}

interface CardStore {
  cardsData: CardData[]
  setCardsData: (cards: CardData[]) => void
  getCardById: (id: string) => CardData | undefined
}

export const useCardStore = create<CardStore>((set, get) => ({
  cardsData: [],
  setCardsData: (cards) => set({ cardsData: cards }),
  getCardById: (id) => get().cardsData.find((card) => card.document_number === id),
}))
