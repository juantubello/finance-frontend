"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { DateFilter } from "../types"

interface DateFilterContextType {
  dateFilter: DateFilter
  setDateFilter: (filter: DateFilter) => void
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined)

export function DateFilterProvider({ children }: { children: React.ReactNode }) {
  const now = new Date()
  const [dateFilter, setDateFilter] = useState<DateFilter>({
    month: now.getMonth() + 1, // JavaScript months are 0-indexed
    year: now.getFullYear(),
  })

  return <DateFilterContext.Provider value={{ dateFilter, setDateFilter }}>{children}</DateFilterContext.Provider>
}

export function useDateFilter() {
  const context = useContext(DateFilterContext)
  if (context === undefined) {
    throw new Error("useDateFilter must be used within a DateFilterProvider")
  }
  return context
}
