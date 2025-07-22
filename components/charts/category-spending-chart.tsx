"use client"

import { useState, useEffect } from "react"
import { getExpensesSummary } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import type { CategorySpending } from "@/lib/types"

export function CategorySpendingChart() {
  const { dateFilter } = useDateFilter()

  const [summaryData, setSummaryData] = useState<{
    total: number
    formatted_total: string
    period: string
    types_summary: CategorySpending[]
  } | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await getExpensesSummary(dateFilter.year, dateFilter.month)
        setSummaryData(data)
      } catch (error) {
        console.error("Error loading category data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  if (isLoading || !summaryData) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">Gastos por categoria</h3>
        <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6 shadow-xl">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    )
  }

  const categoryData = summaryData.types_summary
  const total = summaryData.total

  const gapAngle = 4
  const totalGapAngle = categoryData.length * gapAngle
  const availableAngle = 360 - totalGapAngle

  let currentAngle = 0
  const donutData = categoryData.map((item, index) => {
    const percentage = (item.amount / total) * 100
    const angle = (item.amount / total) * availableAngle
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle + gapAngle

    return {
      ...item,
      percentage,
      angle,
      startAngle,
      endAngle,
    }
  })

  const createDonutPath = (startAngle: number, endAngle: number, innerRadius = 70, outerRadius = 90) => {
    const start = polarToCartesian(100, 100, outerRadius, endAngle)
    const end = polarToCartesian(100, 100, outerRadius, startAngle)
    const innerStart = polarToCartesian(100, 100, innerRadius, endAngle)
    const innerEnd = polarToCartesian(100, 100, innerRadius, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    return [
      "M",
      start.x,
      start.y,
      "A",
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
      "L",
      innerEnd.x,
      innerEnd.y,
      "A",
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      1,
      innerStart.x,
      innerStart.y,
      "Z",
    ].join(" ")
  }

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Gastos por categorias</h3>

      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6 shadow-xl">
        <div className="flex items-center justify-center mb-6">
          {/* Donut Chart */}
          <div className="relative">
            <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
              {donutData.map((slice) => (
                <path
                  key={slice.category}
                  d={createDonutPath(slice.startAngle, slice.endAngle)}
                  fill={slice.color}
                  className="hover:opacity-80 transition-all duration-300 hover:scale-105"
                  style={{ transformOrigin: "100px 100px" }}
                />
              ))}
            </svg>

            {/* Center content */}
             <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <div className="text-xs text-gray-400 mb-1">Total gastos</div>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 text-center leading-tight max-w-full overflow-hidden">
            <span className="block truncate">{summaryData.formatted_total}</span>
          </div>
          <div className="text-xs text-gray-500">{summaryData.period}</div>
        </div>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 gap-3">
          {donutData.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between group hover:bg-gray-700/30 rounded-lg p-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-white group-hover:text-blue-300 transition-colors">
                  {item.category}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-white">{item.formatted_amount}</div>
                <div className="text-xs text-gray-400">{item.percentage.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Total Categories</span>
            <span className="text-white font-medium">{categoryData.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
