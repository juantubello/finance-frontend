"use client"

import { useDateFilter } from "@/lib/context/date-filter-context"
import { Calendar } from "lucide-react"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

export function GlobalDateFilter() {
  const { dateFilter, setDateFilter } = useDateFilter()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-blue-400" />
        <h3 className="font-semibold text-white">Date Filter</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Month</label>
          <select
            value={dateFilter.month}
            onChange={(e) => setDateFilter({ ...dateFilter, month: Number.parseInt(e.target.value) })}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            {months.map((month, index) => (
              <option key={month} value={index + 1}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
          <select
            value={dateFilter.year}
            onChange={(e) => setDateFilter({ ...dateFilter, year: Number.parseInt(e.target.value) })}
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-600/20 rounded-lg border border-blue-500/20">
        <p className="text-sm text-blue-300">
          Current filter: {months[dateFilter.month - 1]} {dateFilter.year}
        </p>
      </div>
    </div>
  )
}
