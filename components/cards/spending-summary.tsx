import { TrendingUp } from "lucide-react"

interface SpendingSummaryProps {
  amount: number
  percentageChange: number
  period: string
}

export function SpendingSummary({ amount, percentageChange, period }: SpendingSummaryProps) {
  const isPositive = percentageChange > 0

  return (
    <div className="px-6 py-4">
      <div className="text-4xl font-bold mb-2">${amount.toLocaleString()}</div>
      <div className={`flex items-center text-sm ${isPositive ? "text-red-500" : "text-green-500"}`}>
        <TrendingUp className="w-4 h-4 mr-1" />
        {Math.abs(percentageChange)}% {isPositive ? "from" : "less than"} {period}
      </div>
    </div>
  )
}
