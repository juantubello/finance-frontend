import { MobileHeader } from "@/components/layout/mobile-header"
import { ExpenseList } from "@/components/lists/expense-list"

export default function ExpensesPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Expenses" />

      <div className="py-4">


        <ExpenseList />
      </div>
    </div>
  )
}
