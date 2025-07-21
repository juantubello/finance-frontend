"use client"

import { spendingData } from "@/lib/data"

interface SpendingChartProps {
  selectedMonth?: string
  onMonthSelect?: (month: string) => void
}

export function SpendingChart({ selectedMonth = "Aug", onMonthSelect }: SpendingChartProps) {
  const maxAmount = Math.max(...spendingData.map((d) => d.amount))

  return (
    <div className="px-6 py-4">
      <div className="flex items-end justify-between h-32 mb-4">
        {spendingData.map((data) => {
          const height = (data.amount / maxAmount) * 100
          const isSelected = data.month === selectedMonth

          return (
            <div
              key={data.month}
              className="flex flex-col items-center flex-1 cursor-pointer"
              onClick={() => onMonthSelect?.(data.month)}
            >
              <div
                className={`w-8 rounded-t-sm mb-2 transition-colors ${
                  isSelected ? "bg-blue-600" : "bg-blue-300 hover:bg-blue-400"
                }`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500">{data.month}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
