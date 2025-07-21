"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Filter, X, ChevronDown, ChevronUp, Check } from "lucide-react"
import { getExpenses, getExpensesSummary } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import { getExpenseCategories, categorizeExpense } from "@/lib/utils"
import type { ExpensesData } from "@/lib/types"
import type { CategorySpending } from "@/lib/types"

export function ExpenseList() {
  const { dateFilter } = useDateFilter()
  const [expensesData, setExpensesData] = useState<ExpensesData>({ Expenses: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const [summaryData, setSummaryData] = useState<{
    total: number
    formatted_total: string
    period: string
    types_summary: CategorySpending[]
  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getExpenses(dateFilter.year, dateFilter.month)
        setExpensesData(data)

        const dataSummary = await getExpensesSummary(dateFilter.year, dateFilter.month)
        setSummaryData(dataSummary)

      } catch (error) {
        console.error("Error loading expenses:", error)
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
      "Comida y vivienda": "bg-green-600/20 text-green-300 border-green-500/20",
      Otro: "bg-blue-600/20 text-blue-300 border-blue-500/20",
      "Comida fuera de casa": "bg-red-600/20 text-red-300 border-red-500/20",
    }
    return colors[type] || "bg-gray-600/20 text-gray-300 border-gray-500/20"
  }

  const toggleCategory = (category: string) => {
    if (category === "All Categories") {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
      )
    }
  }

  const clearAllCategories = () => {
    setSelectedCategories([])
  }

  // Filter expenses based on search term and categories
  const filteredExpenses = useMemo(() => {
    let filtered = expensesData.Expenses

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((expense) => expense.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by categories (if any selected)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((expense) => {
        const category = categorizeExpense(expense.description)
        return selectedCategories.includes(category) || selectedCategories.includes(expense.type)
      })
    }

    return filtered
  }, [expensesData.Expenses, searchTerm, selectedCategories])

  // Calculate filtered total
  const filteredTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  }, [filteredExpenses])

  const getSelectedCategoriesText = () => {
    if (selectedCategories.length === 0) return "All Categories"
    if (selectedCategories.length === 1) return selectedCategories[0]
    return `${selectedCategories.length} categories selected`
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

      {      /* Total Expenses Summary */}
      <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 mb-6">
        <h3 className="text-sm font-medium text-red-300 mb-1">Gastos efectivo/débito</h3>
        <div className="text-2xl font-bold text-white">{summaryData?.formatted_total}</div>
        <p className="text-sm text-red-200 mt-1">{expensesData.Expenses.length} gastos</p>
      </div>

      {/* Collapsible Filters Section */}
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 mb-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Filters</h3>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showFilters && (
          <>
            {/* Search Filter */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filter Button */}
            <div className="mb-3">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="w-full flex items-center justify-between p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white hover:bg-gray-600 transition-colors"
              >
                <span className={selectedCategories.length === 0 ? "text-gray-400" : "text-white"}>
                  {getSelectedCategoriesText()}
                </span>
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Selected Categories Tags */}
            {selectedCategories.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 text-blue-300 border border-blue-500/20 rounded-full text-xs"
                  >
                    {category}
                    <button onClick={() => toggleCategory(category)} className="hover:text-blue-100">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Filter Summary and Actions */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">
                  {filteredExpenses.length} de {expensesData.Expenses.length} gastos
                </span>
                <div className="text-blue-400 font-semibold">
                  Total filtrado: ${filteredTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </div>
              </div>
              {(searchTerm || selectedCategories.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600"
                >
                  <X className="w-3 h-3" />
                  limpiar filtros
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Category Selection Modal - Fixed scrolling */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="bg-gray-800 border border-gray-600 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col"
            style={{ maxHeight: "70vh" }}
          >
            <div className="p-4 border-b border-gray-600 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Selecion de categorias</h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={clearAllCategories} className="text-xs text-blue-400 hover:text-blue-300">
                  limpiar filtros
                </button>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-400">{selectedCategories.length} seleccionados</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {getExpenseCategories()
                .filter((cat) => cat !== "All Categories")
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0 flex items-center justify-between ${selectedCategories.includes(category) ? "bg-blue-600/20 text-blue-300" : "text-white"
                      }`}
                  >
                    <span>{category}</span>
                    {selectedCategories.includes(category) && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Expense Details</h3>
      </div>

      <div className="max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarGutter: "stable" }}>
        <div className="space-y-3">
          {filteredExpenses.length === 0 ? (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No expenses found matching your filters.</p>
            </div>
          ) : (
            filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-white capitalize">{expense.description}</h4>
                    <p className="text-sm text-gray-400">{formatDate(expense.date_time)}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-400">-{expense.formatted_amount}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(expense.type)}`}>
                    {expense.type}
                  </span>
                  <span className="text-xs text-gray-500">ID: {expense.id}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
