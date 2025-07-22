"use client" // 👈 Esto lo convierte en un Client Component

import { notFound } from "next/navigation"
import { CardDetailView } from "@/components/cards/card-detail-view"
import { useCardStore } from "@/globalstores/cardStore"

interface CardDetailPageProps {
  params: {
    cardId: string
  }
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const cards = useCardStore((state) => state.cardsData)
  const card = cards.find((c) => c.document_number === params.cardId)

  if (!card) {
    notFound()
  }

  return <CardDetailView card={card} />
}
