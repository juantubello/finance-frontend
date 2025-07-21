"use client"

import { useState, useEffect } from "react"
import { TrendingUp, TrendingDown, CreditCard, Wallet, DollarSign, Receipt } from "lucide-react"
import { getBalance } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"

interface BalanceData {
  balance: number
  formatted_balance: string
  total_expenses: number
  formatted_expenses: string
  total_incomes: number
  formatted_incomes: string
}

export function FinancialSummary() {
  const { dateFilter } = useDateFilter()
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Pass date filter to balance API if needed
        const data = await getBalance(dateFilter.year, dateFilter.month)

        const transformed: BalanceData = {
          balance: data.balance,
          formatted_balance: data.formatted_balance,
          total_expenses: data.total_expenses,
          formatted_expenses: data.formatted_expenses,
          total_incomes: data.total_incomes,
          formatted_incomes: data.formatted_incomes,
        }



        setBalanceData(transformed)
      } catch (error) {
        console.error("Error loading balance:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  if (isLoading || !balanceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    )
  }

  const getBalanceColor = () => {
    if (balanceData.balance > 0) return "text-green-400"
    if (balanceData.balance < 0) return "text-red-400"
    return "text-yellow-400"
  }

  const getBalanceIcon = () => {
    if (balanceData.balance > 0) return <TrendingUp className="w-6 h-6" />
    if (balanceData.balance < 0) return <TrendingDown className="w-6 h-6" />
    return <Wallet className="w-6 h-6" />
  }

  const getBalanceGradient = () => {
    if (balanceData.balance > 0) return "from-green-600/20 to-green-800/20 border-green-500/20"
    if (balanceData.balance < 0) return "from-red-600/20 to-red-800/20 border-red-500/20"
    return "from-yellow-600/20 to-yellow-800/20 border-yellow-500/20"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Section */}
      <div className="p-6 pb-4">
        {/* Main Balance Card - Most Prominent */}
        <div
          className={`bg-gradient-to-br ${getBalanceGradient()} backdrop-blur-sm border rounded-2xl p-6 mb-6 shadow-2xl`}
        >
          <div className="flex items-center gap-3 mb-4">
            {getBalanceIcon()}
            <span className="text-sm font-medium text-white">BALANCE</span>
          </div>

          <div className={`text-3xl font-bold ${getBalanceColor()} mb-2`}>
            {balanceData.balance >= 0 ? "+" : "-"}
            {balanceData.formatted_balance}
          </div>
          <div className="text-sm text-gray-300">
            {balanceData.balance > 0
              ? "Available funds"
              : balanceData.balance < 0
                ? "Deficit amount"
                : "Break even"}
          </div>
        </div>

        {/* Income & Expenses Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Income */}
          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-xs text-green-300 font-medium">INGRESO</span>
            </div>
            <div className="text-xl font-bold text-white mb-1">{balanceData.formatted_incomes}</div>
          </div>

          {/* Total Expenses */}
          <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Receipt className="w-5 h-5 text-red-400" />
              <span className="text-xs text-red-300 font-medium">GASTOS</span>
            </div>
            <div className="text-xl font-bold text-white mb-1">{balanceData.formatted_expenses}</div>
          </div>
        </div>

        {/* Card Expenses */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Gasto total tarjetas</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">ARS Total</div>
              <div className="text-2xl font-bold text-white">
                {balanceData.formatted_expenses}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">USD Total</div>
              <div className="text-2xl font-bold text-white">
                $500.00
              </div>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white">Detalle</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Ingresos</span>
              </div>
              <span className="font-semibold text-green-400">{balanceData.formatted_incomes}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Gastos Directos</span>
              </div>
              <span className="font-semibold text-red-400">-{balanceData.formatted_expenses}</span>
            </div>

            <div className="border-t border-gray-700/50 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Balance Neto</span>
                <span className={`font-bold text-lg ${getBalanceColor()}`}>
                  {balanceData.balance >= 0 ? "+" : "-"}
                  {balanceData.formatted_balance}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
