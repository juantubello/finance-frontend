import { MobileHeader } from "@/components/layout/mobile-header"
import { CategorySpendingChart } from "@/components/charts/category-spending-chart"
import { RecentExpensesTable } from "@/components/tables/recent-expenses-table"

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Dashboard" />

      <CategorySpendingChart />

      <RecentExpensesTable />
    </div>
  )
}
