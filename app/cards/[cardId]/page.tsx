import { notFound } from "next/navigation"
import { cardsData } from "@/lib/data"
import { CardDetailView } from "@/components/cards/card-detail-view"

interface CardDetailPageProps {
  params: {
    cardId: string
  }
}

export default function CardDetailPage({ params }: CardDetailPageProps) {
  const card = cardsData.find((c) => c.document_number === params.cardId)

  if (!card) {
    notFound()
  }

  return <CardDetailView card={card} />
}
