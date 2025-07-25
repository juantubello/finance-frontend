"use client"

import { useState, useEffect } from "react"
import { getIncomes } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import type { IncomeData } from "@/lib/types"

export function IncomeList() {
  const { dateFilter } = useDateFilter()
  const [incomeData, setIncomeData] = useState<IncomeData>({
    income_total: 0,
    income_total_formatted: "$0,00",
    incomes_details: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getIncomes(dateFilter.year, dateFilter.month)
        setIncomeData(data)
      } catch (error) {
        console.error("Error loading incomes:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  const formatDate = (dateTime: string) => {
    const [date, time] = dateTime.split(" ")
    let formmated = "📅 " + date + " 🕰️ " + time
    return formmated
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      ARS: "bg-blue-600/20 text-blue-300 border-blue-500/20",
      USD: "bg-green-600/20 text-green-300 border-green-500/20",
    }
    return colors[type] || "bg-gray-600/20 text-gray-300 border-gray-500/20"
  }

  if (isLoading) {
    return (
      <div className="px-6 pb-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 pb-6">
      {/* Total Income Summary */}
      <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 mb-6">
        <h3 className="text-sm font-medium text-green-300 mb-1">Ingresos</h3>
        <div className="text-2xl font-bold text-white">{incomeData.income_total_formatted}</div>
        <p className="text-sm text-green-200 mt-1">{incomeData.incomes_details.length} fuentes de ingresos</p>
      </div>

      {/* Income Details */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Detalle de ingresos</h3>
      </div>

      <div className="space-y-3">
        {incomeData.incomes_details.map((income) => (
              <div
                key={income.id}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2">{formatDate(income.date_time)}</p>
                    <h4 className="font-medium text-white capitalize">{income.description}</h4>
                  </div>
              <div className="text-right">
                <div className="font-semibold text-green-400">+{income.formatted_amount}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(income.type)}`}>
                {income.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
