"use client"

import { useState, useEffect } from "react"
import { getRecentExpenses } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import { Receipt } from "lucide-react"

interface RecentExpense {
  id: number
  uuid: string
  date_time: string
  date: string
  description: string
  amount: number
  type: string
  formatted_amount: string
}

export function RecentExpensesTable() {
  const { dateFilter } = useDateFilter()
  const [recentExpenses, setRecentExpenses] = useState<RecentExpense[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
       // const data = await getRecentExpenses(dateFilter.year, dateFilter.month, 3)
        //setRecentExpenses(data)
      } catch (error) {
        console.error("Error loading recent expenses:", error)
      } finally {
        setIsLoading(false)
      }
    }

   // fetchData()
  }, [dateFilter])

  const formatDate = (dateTime: string) => {
    const [date, time] = dateTime.split(" ")
    return date
  }

  const getTypeColor = (type: string) => {
    const categoryColors: Record<string, string> = {
      "Alquiler y expensas": "bg-[#194D12] text-white-800 border-[#194D12]/100",
      "Supermercado": "bg-[#5C8BD6] text-white-800 border-[#5C8BD6]/100",
      "Servicios": "bg-[#301FED] text-white-800 border-[#301FED]/100",
      "Delivery": "bg-[#E0791B] text-white-800 border-[#E0791B]/100",
      "Boludeces necesarias": "bg-[#0DA5B5] text-white-800 border-[#0DA5B5]/100",
      "Boludeces innecesarias": "bg-[#D61C1C] text-white-800 border-[#D61C1C]/100",
      "Auto": "bg-[#8D9491] text-white-800 border-[#8D9491]/100",
      "Gatas": "bg-[#D081D4] text-white-800 border-[#D081D4]/100",
      "Comida fuera de casa": "bg-[#6E3440] text-white-800 border-[#6E3440]/100",
      "Traslado (Uber - Taxi)": "bg-[#DEB61B] text-white-800 border-[#DEB61B]/100",
      "Regalos": "bg-[#6B8A82] text-white-800 border-[#6B8A82]/100",
      "Cafe's": "bg-[#7D583E] text-white-800 border-[#7D583E]/100",
      "Pago tarjetas": "bg-[#403739] text-white-800 border-[#403739]/100",
      "Medicamentos": "bg-[#82B88C] text-white-800 border-[#82B88C]/100",
      "Deportes": "bg-[#50346B] text-white-800 border-[#50346B]/100",
      "Monotributo": "bg-[#242B57] text-white-800 border-[#242B57]/100",
      "Otro": "bg-[#0EC78D] text-white-800 border-[#0EC78D]/100",
    }

    return categoryColors[type] || "bg-gray-600/20 text-gray-300 border-gray-500/30"
  }

  // if (isLoading) {
  //   return (
  //     <div className="px-6 pb-6">
  //       <h3 className="text-lg font-semibold mb-4 text-white">Gastos recientes</h3>
  //       <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
  //         <div className="flex items-center justify-center h-32">
  //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  return (
<div className="px-6 pb-6">
  {/* <h3 className="text-base font-semibold mb-3 text-white">Gastos recientes</h3>

  <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-xl">
    {recentExpenses.length === 0 ? (
      <div className="p-6 text-center text-gray-400 text-sm">
        <Receipt className="w-6 h-6 mx-auto mb-1 opacity-50" />
        <p>No recent expenses found.</p>
      </div>
    ) : (
      recentExpenses.map((expense, index) => (
        <div
          key={expense.id}
          className={`flex items-center justify-between px-3 py-2 ${
            index !== recentExpenses.length - 1 ? "border-b border-gray-700/30" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
              <Receipt className="w-4 h-4 text-red-400" />
            </div>
            <div className="leading-tight">
              <div className="font-medium text-white text-sm capitalize truncate max-w-[150px]">
                {expense.description}
              </div>
              <div className="text-xs text-gray-400">{formatDate(expense.date_time)}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-red-400 text-sm">-{expense.formatted_amount}</div>
            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(expense.type)}`}>
              {expense.type}
            </span>
          </div>
        </div>
      ))
    )}
  </div> */}
</div>

  )
}
