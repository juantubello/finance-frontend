import { categorySpendingData } from "@/lib/data"
import { Icon } from "@/components/ui/icon"

const categoryIcons: Record<string, string> = {
  Living: "home",
  Lifestyle: "coffee",
  Shopping: "shopping-bag",
  Transportation: "car",
  Entertainment: "smartphone",
}

export function CategorySpendingTable() {
  const totalSpending = categorySpendingData.reduce((sum, cat) => sum + cat.amount, 0)

  return (
    <div className="px-6 pb-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Category Breakdown</h3>

      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
        {categorySpendingData.map((category, index) => {
          const percentage = ((category.amount / totalSpending) * 100).toFixed(1)

          return (
            <div
              key={category.category}
              className={`flex items-center justify-between p-4 ${
                index !== categorySpendingData.length - 1 ? "border-b border-gray-700/30" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: category.color }}
                >
                  <Icon name={categoryIcons[category.category] || "home"} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-white">{category.category}</div>
                  <div className="text-sm text-gray-400">{percentage}% of total</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-white">${category.amount.toLocaleString()}</div>
              </div>
            </div>
          )
        })}

        {/* Total row */}
        <div className="flex items-center justify-between p-4 bg-gray-700/50 font-semibold border-t border-gray-700/30">
          <span className="text-white">Total Spending</span>
          <span className="text-white">${totalSpending.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
