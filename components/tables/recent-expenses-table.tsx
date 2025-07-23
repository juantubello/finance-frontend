"use client"

import { useState, useEffect } from "react"
import { getRecentExpenses } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import { Receipt } from "lucide-react"

interface RecentExpense {
  id: number
  uuid: string
  date_time: string
  date: string
  description: string
  amount: number
  type: string
  formatted_amount: string
}

export function RecentExpensesTable() {
  const { dateFilter } = useDateFilter()
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getRecentExpenses(dateFilter.year, dateFilter.month, 3)
        setRecentExpenses(data)
      } catch (error) {
        console.error("Error loading recent expenses:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  const formatDate = (dateTime: string) => {
    const [date, time] = dateTime.split(" ")
    return date
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Alquiler y expensas": "bg-blue-600/20 text-blue-300 border-blue-500/20",
      "Boludeces innecesarias": "bg-red-600/20 text-red-300 border-red-500/20",
      "Boludeces necesarias": "bg-green-600/20 text-green-300 border-green-500/20",
      Regalos: "bg-purple-600/20 text-purple-300 border-purple-500/20",
      "Traslado (Uber - Taxi)": "bg-yellow-600/20 text-yellow-300 border-yellow-500/20",
      Delivery: "bg-orange-600/20 text-orange-300 border-orange-500/20",
      "Cafe (Amelia/Posta etc)": "bg-purple-600/20 text-purple-300 border-purple-500/20",
      Supermarket: "bg-green-600/20 text-green-300 border-green-500/20",
      Transportation: "bg-blue-600/20 text-blue-300 border-blue-500/20",
      Entertainment: "bg-red-600/20 text-red-300 border-red-500/20",
    }
    return colors[type] || "bg-gray-600/20 text-gray-300 border-gray-500/20"
  }

  if (isLoading) {
    return (
      <div className="px-6 pb-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Gastos recientes</h3>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-6 pb-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Gastos recientes</h3>

      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
        {recentExpenses.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <Receipt className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No recent expenses found.</p>
          </div>
        ) : (
          recentExpenses.map((expense, index) => (
            <div
              key={expense.id}
              className={`flex items-center justify-between p-4 ${
                index !== recentExpenses.length - 1 ? "border-b border-gray-700/30" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="font-medium text-white capitalize">{expense.description}</div>
                  <div className="text-sm text-gray-400">{formatDate(expense.date_time)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-red-400">-{expense.formatted_amount}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(expense.type)}`}>
                  {expense.type}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
