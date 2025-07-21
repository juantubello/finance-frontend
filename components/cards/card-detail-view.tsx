"use client"

import { useState } from "react"
import { ArrowLeft, Search, User } from "lucide-react"
import { useRouter } from "next/navigation"
import type { CardData, CardHolder } from "@/lib/types"

interface CardDetailViewProps {
  card: CardData
}

interface HolderFilters {
  [holderName: string]: string
}

export function CardDetailView({ card }: CardDetailViewProps) {
  const router = useRouter()
  const [holderFilters, setHolderFilters] = useState<HolderFilters>({})

  const getCardGradient = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case "mastercard":
        return "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
      case "visa":
        return "bg-gradient-to-br from-gray-800 via-gray-900 to-black"
      default:
        return "bg-gradient-to-br from-gray-900 to-black"
    }
  }

  const getCardLogo = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case "mastercard":
        return (
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-red-500 rounded-full opacity-90"></div>
            <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-90 -ml-3"></div>
          </div>
        )
      case "visa":
        return <div className="text-white font-bold text-lg tracking-wider">VISA</div>
      default:
        return <div className="text-white font-bold text-lg tracking-wider">CARD</div>
    }
  }

  const getCardLegend = (cardType: string) => {
    switch (cardType.toLowerCase()) {
      case "mastercard":
        return "black"
      case "visa":
        return "signature"
      default:
        return "card"
    }
  }

  const updateHolderFilter = (holderName: string, searchTerm: string) => {
    setHolderFilters((prev) => ({
      ...prev,
      [holderName]: searchTerm,
    }))
  }

  const getFilteredExpenses = (holder: CardHolder) => {
    const searchTerm = holderFilters[holder.holder] || ""
    if (!searchTerm) return holder.Expenses

    return holder.Expenses.filter((expense) => expense.description.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  const getFilteredTotal = (holder: CardHolder) => {
    const filteredExpenses = getFilteredExpenses(holder)
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-lg font-semibold text-white">Card Details</h1>
      </div>

      {/* Card Summary */}
      <div className="p-6">
        <div
          className={`${getCardGradient(card.card_type)} rounded-2xl p-5 text-white shadow-2xl mb-6 border border-white/10 relative overflow-hidden`}
        >
          {/* Card Header */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            {getCardLogo(card.card_type)}
            <div className="text-xs text-white/60">{new Date(card.ResumeDate).toLocaleDateString()}</div>
          </div>

          {/* Card amounts - no "Balance" label */}
          <div className="text-left relative z-10 mb-8">
            <div className="text-2xl font-bold text-white mb-1">{card.formatted_total_ars}</div>
            <div className="text-sm text-white/70">USD {card.formatted_total_usd}</div>
          </div>

          {/* Card Legend - bottom left */}
          <div className="absolute bottom-3 left-5 text-xs text-white/60 uppercase tracking-wider">
            {getCardLegend(card.card_type)}
          </div>

          {/* Holders count - bottom right */}
          <div className="absolute bottom-3 right-5 text-xs text-white/50">
            {card.Holders.length} holder{card.Holders.length !== 1 ? "s" : ""}
          </div>

          {/* Card pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/10 rounded-full"></div>
          </div>
        </div>

        {/* Holders Tables */}
        <div className="space-y-6">
          {card.Holders.map((holder) => {
            const filteredExpenses = getFilteredExpenses(holder)
            const filteredTotal = getFilteredTotal(holder)

            return (
              <div
                key={holder.holder}
                className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Holder Header */}
                <div className="p-4 border-b border-gray-700/30 bg-gray-700/30">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">{holder.holder}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Total ARS:</span>
                      <div className="font-semibold text-white">{holder.formatted_total_ars}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Total USD:</span>
                      <div className="font-semibold text-white">{holder.formatted_total_usd}</div>
                    </div>
                  </div>
                </div>

                {/* Search Filter */}
                <div className="p-4 border-b border-gray-700/30 bg-gray-700/20">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${holder.holder}'s expenses...`}
                      value={holderFilters[holder.holder] || ""}
                      onChange={(e) => updateHolderFilter(holder.holder, e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      {filteredExpenses.length} of {holder.Expenses.length} expenses
                    </span>
                    <span className="font-semibold text-white">
                      Filtered Total: ${filteredTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Expenses Table - Scrollable for ~50 records */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredExpenses.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No expenses found for {holder.holder}.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-700/30">
                      {filteredExpenses.map((expense) => (
                        <div
                          key={`${expense.document_number}-${expense.position}`}
                          className="p-4 hover:bg-gray-700/20 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-white text-sm leading-tight mb-1">
                                {expense.description}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-gray-400">
                                <span>{expense.date}</span>
                                <span>•</span>
                                <span>#{expense.position}</span>
                              </div>
                            </div>
                            <div className="text-right ml-3">
                              <div className="font-semibold text-red-400 text-sm">-{expense.formatted_amount}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
