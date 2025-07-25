"use client"

import { MoreHorizontal } from "lucide-react"
import type { CardData } from "@/lib/types"

interface CardMiniProps {
  card: CardData
  onClick: () => void
}

export function CardMini({ card, onClick }: CardMiniProps) {
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

  const getCardPattern = () => {
    return (
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/5 rounded-full"></div>
      </div>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${getCardGradient(card.card_type)} rounded-2xl p-5 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 active:scale-95 w-full relative overflow-hidden border border-white/10`}
    >
      {getCardPattern()}

      {/* Card Header */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        {getCardLogo(card.card_type)}
        <MoreHorizontal className="w-5 h-5 text-white/60" />
      </div>

      {/* Card amounts - no "Balance" label */}
      <div className="text-left relative z-10 mb-8">
        <div className="text-xl font-bold text-white mb-1">{card.formatted_total_ars}</div>
        <div className="text-sm text-white/70">USD {card.formatted_total_usd}</div>
      </div>

      {/* Card Legend - bottom left */}
      <div className="absolute bottom-3 left-5 text-xs text-white/60 uppercase tracking-wider">
        {getCardLegend(card.card_type)}
      </div>

      {/* Holders count - bottom right */}
      <div className="absolute bottom-3 right-5 text-xs text-white/50">
        {card.Holders.length} titular{card.Holders.length !== 1 ? "es" : ""}
      </div>
    </button>
  )
}
