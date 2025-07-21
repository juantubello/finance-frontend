"use client"

import { expensesData, incomeData, cardsData, categorySpendingData } from "./data"
import type { ExpensesData, IncomeData, CardData, CategorySpending } from "./types"

const USE_API = process.env.NEXT_PUBLIC_USE_API === "1"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// API Response Types
export interface ExpensesSummaryResponse {
  ExpensesSummary: {
    total: number
    formatted_total: string
    period: string
    types_summary: Array<{
      type: string
      total: number
      formatted_total: string
    }>
  }
}

export interface RecentExpensesResponse {
  Expenses: Array<{
    id: number
    uuid: string
    date_time: string
    date: string
    description: string
    amount: number
    type: string
    formatted_amount: string
  }>
}

export interface BalanceResponse {
    balance: number
    formatted_balance: string
    total_expenses: number
    formatted_expenses: string
    total_incomes: number
    formatted_incomes: string
}

// Generate dynamic colors for categories
const generateCategoryColor = (index: number): string => {
  const colors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#06b6d4", // cyan
    "#f97316", // orange
    "#84cc16", // lime
    "#ec4899", // pink
    "#6366f1", // indigo
  ]
  return colors[index % colors.length]
}

// Helper function to format date parameters
const formatDateParams = (year: number, month: number) => {
  return {
    year: year.toString(),
    month: month.toString().padStart(2, "0"),
  }
}

// API Functions
// export async function getExpensesSummary(year: number, month: number): Promise<CategorySpending[]> {
//   if (!USE_API) {
//     return categorySpendingData
//   }

//   try {
//     const { year: yearStr, month: monthStr } = formatDateParams(year, month)
//     const response = await fetch(`${API_BASE_URL}/expenses/summary?year=${yearStr}&month=${monthStr}`)

//     if (!response.ok) throw new Error("Failed to fetch expenses summary")

//     const data: ExpensesSummaryResponse = await response.json()

//     return data.ExpensesSummary.types_summary.map((item, index) => ({
//       category: item.type,
//       amount: item.total,
//       formatted_amount: item.formatted_total,
//       color: generateCategoryColor(index),
//     }))
//   } catch (error) {
//     console.error("Error fetching expenses summary:", error)
//      return categorySpendingData // Fallback to hardcoded data
//   }
// }

export async function getExpensesSummary(year: number, month: number) {
  if (!USE_API) {
    return {
      total: 0,
      formatted_total: "$0",
      period: `${month}/${year}`,
      types_summary: categorySpendingData, // Esto debería tener los campos category, amount, formatted_amount, color
    }
  }

  try {
    const { year: yearStr, month: monthStr } = formatDateParams(year, month)
    const response = await fetch(`${API_BASE_URL}/expenses/summary?year=${yearStr}&month=${monthStr}`)

    if (!response.ok) throw new Error("Failed to fetch expenses summary")

    const data: ExpensesSummaryResponse = await response.json()

    // Transformar types_summary a tu formato con colores
    const formattedTypes = data.ExpensesSummary.types_summary.map((item, index) => ({
      category: item.type,
      amount: item.total,
      formatted_amount: item.formatted_total,
      color: generateCategoryColor(index),
    }))

    return {
      total: data.ExpensesSummary.total,
      formatted_total: data.ExpensesSummary.formatted_total,
      period: data.ExpensesSummary.period,
      types_summary: formattedTypes,
    }
  } catch (error) {
    console.error("Error fetching expenses summary:", error)
    return {
      total: 0,
      formatted_total: "$0",
      period: `${month}/${year}`,
      types_summary: categorySpendingData,
    }
  }
}


export async function getRecentExpenses(year: number, month: number, limit = 3) {
  if (!USE_API) {
    return expensesData.Expenses.slice(0, limit)
  }

  try {
    const { year: yearStr, month: monthStr } = formatDateParams(year, month)
    const response = await fetch(`${API_BASE_URL}/expenses/recent?year=${yearStr}&month=${monthStr}&limit=${limit}`)

    if (!response.ok) throw new Error("Failed to fetch recent expenses")

    const data: RecentExpensesResponse = await response.json()
    return data.Expenses
  } catch (error) {
    console.error("Error fetching recent expenses:", error)
    return expensesData.Expenses.slice(0, limit) // Fallback to hardcoded data
  }
}

export async function getExpenses(year: number, month: number): Promise<ExpensesData> {
  if (!USE_API) {
    return expensesData
  }

  try {
    const { year: yearStr, month: monthStr } = formatDateParams(year, month)
    const response = await fetch(`${API_BASE_URL}/expenses?year=${yearStr}&month=${monthStr}`)

    if (!response.ok) throw new Error("Failed to fetch expenses")

    const data: ExpensesData = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return expensesData // Fallback to hardcoded data
  }
}

export async function getIncomes(year: number, month: number): Promise<IncomeData> {
  if (!USE_API) {
    return incomeData
  }

  try {
    const { year: yearStr, month: monthStr } = formatDateParams(year, month)
    const response = await fetch(`${API_BASE_URL}/incomes?year=${yearStr}&month=${monthStr}`)

    if (!response.ok) throw new Error("Failed to fetch incomes")

    const data: IncomeData = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching incomes:", error)
    return incomeData // Fallback to hardcoded data
  }
}

export async function getBalance(year?: number, month?: number): Promise<BalanceResponse> {
  try {
    let url = `${API_BASE_URL}/balance`

    // Add date parameters if provided
    if (year && month) {
      const { year: yearStr, month: monthStr } = formatDateParams(year, month)
      url += `?year=${yearStr}&month=${monthStr}`
    }

    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch balance")

    const data: BalanceResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching balance:", error)
    return {
        balance: 0,
        formatted_balance: "$0",
        total_expenses: 0,
        formatted_expenses: "$0",
        total_incomes: 0,
        formatted_incomes: "$0",
    }
  }
}

export async function getCardsExpenses(
  year: number,
  month: number,
  cardType = "all",
  holder = "all",
): Promise<CardData[]> {
  if (!USE_API) {
    return cardsData
  }

  try {
    const { year: yearStr, month: monthStr } = formatDateParams(year, month)
    const response = await fetch(
      `${API_BASE_URL}/cards/expenses?year=${yearStr}&month=${monthStr}&card_type=${cardType}&holder=${holder}`,
    )

    if (!response.ok) throw new Error("Failed to fetch cards expenses")

    const data: CardData[] = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching cards expenses:", error)
    return cardsData // Fallback to hardcoded data
  }
}
