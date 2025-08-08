import { MobileHeader } from "@/components/layout/mobile-header"
import { FinancialSummary } from "@/components/analytics/financial-summary"

export default function AnalyticsPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Información del mes en curso" />
      <FinancialSummary />
    </div>
  )
}