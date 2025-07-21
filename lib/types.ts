export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  type: "income" | "expense"
}

export interface Category {
  id: string
  name: string
  amount: number
  transactions: number
  color: string
  icon: string
}

export interface Account {
  id: string
  name: string
  type: string
  balance: number
  color: string
}

export interface Bill {
  id: string
  name: string
  type: string
  amount: number
  dueDate: string
  isPaid: boolean
  color: string
}

export interface Subscription {
  id: string
  name: string
  amount: number
  billingCycle: "monthly" | "yearly"
  nextBilling: string
  color: string
}

export interface SpendingData {
  month: string
  amount: number
  percentage: number
}

export interface ExpenseItem {
  id: number
  uuid: string
  date_time: string
  date: string
  description: string
  amount: number
  type: string
  formatted_amount: string
}

export interface ExpensesData {
  Expenses: ExpenseItem[]
}

export interface IncomeItem {
  id: number
  uuid: string
  date_time: string
  description: string
  amount: number
  type: string
  formatted_amount: string
}

export interface IncomeData {
  income_total: number
  income_total_formatted: string
  incomes_details: IncomeItem[]
}

export interface CategorySpending {
  category: string
  amount: number
  formatted_amount: string
  color: string
}

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

export interface DateFilter {
  month: number
  year: number
}
