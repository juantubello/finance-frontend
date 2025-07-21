"use client"

import { useState, useEffect } from "react"
import { getCardsExpenses } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import { CardMini } from "./card-mini"
import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown } from "lucide-react"
import type { CardData } from "@/lib/types"

export function CardsOverview() {
  const router = useRouter()
  const { dateFilter } = useDateFilter()
  const [cardsData, setCardsData] = useState<CardData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getCardsExpenses(dateFilter.year, dateFilter.month)
        setCardsData(data)
      } catch (error) {
        console.error("Error loading cards data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  const totalARS = cardsData.reduce((sum, card) => sum + card.total_ars, 0)
  const totalUSD = cardsData.reduce((sum, card) => sum + card.total_usd, 0)

  const handleCardClick = (cardId: string) => {
    router.push(`/cards/${cardId}`)
  }

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header Section */}
      <div className="p-6 pb-4">

        {/* Total Summary Card */}
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">Gasto total tarjetas</span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-1">ARS Total</div>
              <div className="text-2xl font-bold text-white">
                ${totalARS.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-1">USD Total</div>
              <div className="text-2xl font-bold text-white">
                ${totalUSD.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Tarjetas</h3>
          <span className="text-sm text-gray-400">{cardsData.length} cards</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {cardsData.map((card) => (
            <CardMini key={card.document_number} card={card} onClick={() => handleCardClick(card.document_number)} />
          ))}
        </div>
      </div>
    </div>
  )
}
