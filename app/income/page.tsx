import { MobileHeader } from "@/components/layout/mobile-header"
import { IncomeList } from "@/components/lists/income-list"

export default function IncomePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Ingresos" />

      <div className="py-4">
        <IncomeList />
      </div>
    </div>
  )
}
