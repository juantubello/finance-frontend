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
    let formmated = "📅 " + date + " 🕰️ " + time
    return formmated
  }

  const getTypeColor = (type: string) => {
    const categoryColors: Record<string, string> = {
      "Alquiler y expensas": "bg-[#194D12] text-white-800 border-[#194D12]/100",
      "Supermercado": "bg-[#5C8BD6] text-white-800 border-[#5C8BD6]/100",
      "Servicios": "bg-[#301FED] text-white-800 border-[#301FED]/100",
      "Delivery": "bg-[#E0791B] text-white-800 border-[#E0791B]/100",
      "Boludeces necesarias": "bg-[#0DA5B5] text-white-800 border-[#0DA5B5]/100",
      "Boludeces innecesarias": "bg-[#D61C1C] text-white-800 border-[#D61C1C]/100",
      "Auto": "bg-[#8D9491] text-white-800 border-[#8D9491]/100",
      "Gatas": "bg-[#D081D4] text-white-800 border-[#D081D4]/100",
      "Comida fuera de casa": "bg-[#6E3440] text-white-800 border-[#6E3440]/100",
      "Traslado (Uber - Taxi)": "bg-[#DEB61B] text-white-800 border-[#DEB61B]/100",
      "Regalos": "bg-[#6B8A82] text-white-800 border-[#6B8A82]/100",
      "Cafe's": "bg-[#7D583E] text-white-800 border-[#7D583E]/100",
      "Pago tarjetas": "bg-[#403739] text-white-800 border-[#403739]/100",
      "Medicamentos": "bg-[#82B88C] text-white-800 border-[#82B88C]/100",
      "Deportes": "bg-[#50346B] text-white-800 border-[#50346B]/100",
      "Monotributo": "bg-[#242B57] text-white-800 border-[#242B57]/100",
      "Otro": "bg-[#0EC78D] text-white-800 border-[#0EC78D]/100",
    }

    return categoryColors[type] || "bg-gray-600/20 text-gray-300 border-gray-500/30"
  }


  const toggleCategory = (category: string) => {
    if (category === "Todas las categorias") {
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
    if (selectedCategories.length === 0) return "Todas las categorias"
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
            <h3 className="font-semibold text-white">Filtros</h3>
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
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por descripción"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-[6px] text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Category Filter Button */}
            <div className="mb-2">
              <button
                onClick={() => setShowCategoryModal(true)}
                className="w-full flex items-center justify-between px-3 py-[6px] bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white hover:bg-gray-600 transition-colors text-sm"
              >
                <span className={selectedCategories.length === 0 ? "text-gray-400" : "text-white"}>
                  {getSelectedCategoriesText()}
                </span>
                <Filter className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Selected Categories Tags */}
            {selectedCategories.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-1.5">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-1 px-2 py-[3px] bg-blue-600/20 text-blue-300 border border-blue-500/20 rounded-full text-[11px]"
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
            <div className="flex items-center justify-between text-[13px]">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">
                  {filteredExpenses.length} de {expensesData.Expenses.length} gastos
                </span>
                <div className="text-blue-400 font-medium">
                  Total filtrado: ${filteredTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                </div>
              </div>
              {(searchTerm || selectedCategories.length > 0) && (
                <button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                  }}
                  className="flex items-center gap-1 px-2 py-[3px] bg-gray-700 text-gray-300 rounded-full hover:bg-gray-600 text-xs"
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
            className="bg-gray-800 border border-gray-600 rounded-xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col"
            style={{ maxHeight: "65vh" }}
          >
            <div className="p-3 border-b border-gray-600 flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">Selección de categorías</h3>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={clearAllCategories} className="text-[11px] text-blue-400 hover:text-blue-300">
                  limpiar filtros
                </button>
                <span className="text-[11px] text-gray-500">•</span>
                <span className="text-[11px] text-gray-400">{selectedCategories.length} seleccionados</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {getExpenseCategories()
                .filter((cat) => cat !== "Todas las categorias")
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-700 transition-colors border-b border-gray-700/50 last:border-b-0 flex items-center justify-between ${selectedCategories.includes(category)
                      ? "bg-blue-600/20 text-blue-300"
                      : "text-white"
                      }`}
                  >
                    <span className="text-sm">{category}</span>
                    {selectedCategories.includes(category) && <Check className="w-4 h-4 text-blue-400" />}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}


      {/* Expenses List */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Detalle de gastos</h3>
      </div>

      <div className="max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarGutter: "stable" }}>
        <div className="space-y-2">
          {filteredExpenses.length === 0 ? (
            <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 text-center text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No se encontraron gastos para los filtros seleccionados.</p>
            </div>
          ) : (
            filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 shadow-md"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-500 mb-1">{formatDate(expense.date_time)}</p>
                    <h4 className="text-sm font-medium text-white capitalize">{expense.description}</h4>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-red-400">-{expense.formatted_amount}</div>
                    <div
                      className={`mt-1 px-[6px] py-[1px] rounded text-[9px] leading-tight font-medium border inline-block ${getTypeColor(
                        expense.type
                      )}`}
                    >
                      {expense.type}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  )
}
