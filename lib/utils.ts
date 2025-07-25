import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { useDateFilter } from "./context/date-filter-context"

// Global function to get selected month and year
export function useSelectedDate() {
  const { dateFilter } = useDateFilter()

  return {
    selectedMonth: dateFilter.month.toString().padStart(2, "0"),
    selectedYear: dateFilter.year.toString(),
  }
}

// Utility function for formatting currency
export function formatCurrency(amount: number, currency: "ARS" | "USD" = "ARS") {
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }
  return `$${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`
}

// Utility function to get expense categories
export function getExpenseCategories() {
  return [
    "Alquiler y expensas",
    "Supermercado",
    "Servicios",
    "Delivery",
    "Boludeces necesarias",
    "Boludeces innecesarias",
    "Auto",
    "Gatas",
    "Comida fuera de casa",
    "Traslado (Uber - Taxi)",
    "Regalos",
    "Cafe's",
    "Pago tarjetas",
    "Medicamentos",
    "Deportes",
    "Monotributo",
  ]
}

// Function to categorize expense based on description
export function categorizeExpense(description: string): string {
  const desc = description.toLowerCase()

  //if (desc.includes("mcdonald") || desc.includes("delivery")) return "Delivery"
  //if (desc.includes("cafe") || desc.includes("amelia") || desc.includes("coffee")) return "Cafe (Amelia/Posta etc)"
  //if (desc.includes("super") || desc.includes("disco") || desc.includes("dia tienda")) return "Supermarket"
  //if (desc.includes("gas") || desc.includes("transport") || desc.includes("uber")) return "Transportation"
  //if (desc.includes("netflix") || desc.includes("youtube") || desc.includes("streaming")) return "Entertainment"
  //if (desc.includes("mercadolibre") || desc.includes("shopping")) return "Shopping"
  //if (desc.includes("osde") || desc.includes("health")) return "Health"

  return ""
}
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
