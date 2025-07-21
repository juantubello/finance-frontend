"use client"

import { Calendar } from "lucide-react"

interface Installment {
  id: number
  description: string
  amount: number
  formatted_amount: string
  date: string
  installment_number: string
}

const dummyInstallments: Installment[] = [
  {
    id: 1,
    description: "MERPAGO+PRIMOFFICE C.11/12 260183",
    amount: 6164.13,
    formatted_amount: "$6.164,13",
    date: "04/08/2024",
    installment_number: "#1",
  },
  {
    id: 43,
    description: "NAME-CHEAP.COM+ USD 13,16 485607",
    amount: 13.16,
    formatted_amount: "$13,16",
    date: "22/06/2025",
    installment_number: "#43",
  },
  {
    id: 44,
    description: "GOOGLE +YouTubeP P1cb0NuH USD 5,94 645725",
    amount: 5.94,
    formatted_amount: "$5,94",
    date: "22/06/2025",
    installment_number: "#44",
  },
]

export function UpcomingInstallments() {
  const totalAmount = dummyInstallments.reduce((sum, installment) => sum + installment.amount, 0)

  return (
    <div className="px-6 pb-6">
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Cuotas a vencer</h3>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Total</div>
            <div className="text-lg font-bold text-orange-400">
              ${totalAmount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {dummyInstallments.map((installment) => (
            <div
              key={installment.id}
              className="bg-gray-700/50 border border-gray-600/50 rounded-xl p-3 hover:bg-gray-700/70 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm leading-tight">{installment.description}</h4>
                  <p className="text-xs text-gray-400 mt-1">{installment.date}</p>
                </div>
                <div className="text-right ml-3">
                  <div className="font-semibold text-red-400">-{installment.formatted_amount}</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-600/20 text-orange-300 border border-orange-500/20">
                  Installment
                </span>
                <span className="text-xs text-gray-500">ID: {installment.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
