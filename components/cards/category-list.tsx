import { ArrowRight, Search, MoreHorizontal } from "lucide-react"
import { Icon } from "@/components/ui/icon"
import { categories } from "@/lib/data"

export function CategoryList() {
  return (
    <div className="px-6 py-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Categories</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Merchants</span>
          <Search className="w-4 h-4 text-gray-400" />
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                <Icon name={category.icon} className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium">{category.name}</div>
                {category.transactions > 0 && (
                  <div className="text-xs text-gray-500">{category.transactions} transactions</div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${category.amount.toLocaleString()}</div>
              <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
            </div>
          </div>
        ))}
      </div>

      <button className="text-blue-500 text-sm mt-4 hover:text-blue-600 transition-colors">
        View all transactions
      </button>
    </div>
  )
}
