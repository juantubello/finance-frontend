import { MobileHeader } from "@/components/layout/mobile-header"
import { CardsOverview } from "@/components/cards/cards-overview"
import { UpcomingInstallments } from "@/components/cards/upcoming-installments"

export default function CardsPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black pb-20">
        <MobileHeader title="Cards" />
        <CardsOverview />
        {/* <UpcomingInstallments /> */}
      </div>
    </div>
  )
}
