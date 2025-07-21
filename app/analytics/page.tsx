"use client"

import { useState } from "react"
import { MobileHeader } from "@/components/layout/mobile-header"
import { SpendingChart } from "@/components/charts/spending-chart"
import { CategoryList } from "@/components/cards/category-list"
import { FinancialSummary } from "@/components/analytics/financial-summary"

export default function AnalyticsPage() {
  const [selectedMonth, setSelectedMonth] = useState("Aug")

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Analytics" />
      <FinancialSummary />
    </div>
  )
}
