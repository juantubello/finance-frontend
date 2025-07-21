import { MobileHeader } from "@/components/layout/mobile-header"
import { ExpenseList } from "@/components/lists/expense-list"

export default function ExpensesPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Expenses" />

      <div className="py-4">
        <div className="px-6 mb-4">
          <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4">
            <h3 className="text-sm font-medium text-red-300 mb-1">Gastos efectivo/débito</h3>
            <div className="text-2xl font-bold text-white">$197.000,00</div>
            <p className="text-sm text-red-200 mt-1">This month</p>
          </div>
        </div>

        <ExpenseList />
      </div>
    </div>
  )
}
