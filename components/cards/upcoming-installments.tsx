"use client"

import { Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import type { CardsSubscriptions } from "@/lib/types"
import { getCardsSubscriptions, getCardSpecificExpenses } from "@/lib/api"
import { useDateFilter } from "@/lib/context/date-filter-context"
import Image from "next/image"

export function AppsSubscriptions() {
  const { dateFilter } = useDateFilter()
  const [cardsSubscriptionsData, setSubscriptionsData] = useState<CardsSubscriptions[]>([])
  const [cardsSpecificExpensesData, setSpecificExpensesData] = useState<CardsSubscriptions[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const subscriptionData = await getCardsSubscriptions(dateFilter.year, dateFilter.month)
        setSubscriptionsData(Array.isArray(subscriptionData) ? subscriptionData : [])

        const specificData = await getCardSpecificExpenses(dateFilter.year, dateFilter.month)
        setSpecificExpensesData(Array.isArray(specificData) ? specificData : [])
      } catch (error) {
        console.error("Error loading cards data:", error)
        setSubscriptionsData([])
        setSpecificExpensesData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateFilter])

  const usdTotal = cardsSubscriptionsData
    .filter((s) => s.service.toLowerCase().includes("usd"))
    .reduce((acc, s) => acc + s.total_amount, 0)

  const arsTotal = cardsSubscriptionsData
    .filter((s) => !s.service.toLowerCase().includes("usd"))
    .reduce((acc, s) => acc + s.total_amount, 0)

  const usdFormatted = usdTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })
  const arsFormatted = arsTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })

  const usdSpecificTotal = cardsSpecificExpensesData
    .filter((s) => s.service.toLowerCase().includes("usd"))
    .reduce((acc, s) => acc + s.total_amount, 0)

  const arsSpecificTotal = cardsSpecificExpensesData
    .filter((s) => !s.service.toLowerCase().includes("usd"))
    .reduce((acc, s) => acc + s.total_amount, 0)

  const usdSpecificFormatted = usdSpecificTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })
  const arsSpecificFormatted = arsSpecificTotal.toLocaleString("es-AR", { minimumFractionDigits: 2 })

  return (
    <div className="px-6 pb-6">
      {/* Cobros mensuales */}
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Cobros mensuales</h3>
          </div>
        </div>

        <div className="flex justify-end gap-3 mb-3 text-sm">
          <span className="text-blue-300">ARS: ${arsFormatted}</span>
          <span className="text-green-400">USD: ${usdFormatted}</span>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-sm text-center">Cargando suscripciones...</div>
        ) : cardsSubscriptionsData.length === 0 ? (
          <div className="text-gray-500 text-sm text-center">No se encontraron suscripciones este mes.</div>
        ) : (
          <div
            className="space-y-3 max-h-[500px] overflow-y-scroll pr-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
            style={{
              scrollbarGutter: "stable",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {cardsSubscriptionsData.map((sub) => (
              <div
                key={sub.service}
                className="flex items-center justify-between p-2 bg-gray-700/40 rounded-xl border border-gray-600/40 shadow"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`/logos/${sub.logo_name}`}
                    alt={sub.service}
                    width={32}
                    height={32}
                    className="object-contain w-8 h-8 rounded bg-white p-1"
                  />
                  <span className="text-sm text-white font-medium">{sub.service}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${sub.service.toLowerCase().includes("usd") ? "text-green-400" : "text-blue-300"}`}
                >
                  {sub.total_amount_formatted}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Espaciador visual */}
      <div className="my-6" />

      {/* Gastos específicos */}
      <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Gastos específicos</h3>
          </div>
        </div>

        <div className="flex justify-end gap-3 mb-3 text-sm">
          <span className="text-blue-300">ARS: ${arsSpecificFormatted}</span>
          <span className="text-green-400">USD: ${usdSpecificFormatted}</span>
        </div>

        {isLoading ? (
          <div className="text-gray-400 text-sm text-center">Cargando gastos específicos...</div>
        ) : cardsSpecificExpensesData.length === 0 ? (
          <div className="text-gray-500 text-sm text-center">No se encontraron gastos específicos este mes.</div>
        ) : (
          <div
            className="space-y-3 max-h-[500px] overflow-y-scroll pr-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
            style={{
              scrollbarGutter: "stable",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {cardsSpecificExpensesData.map((sub) => (
              <div
                key={sub.service}
                className="flex items-center justify-between p-2 bg-gray-700/40 rounded-xl border border-gray-600/40 shadow"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={`/logos/${sub.logo_name}`}
                    alt={sub.service}
                    width={32}
                    height={32}
                    className="object-contain w-8 h-8 rounded bg-white p-1"
                  />
                  <span className="text-sm text-white font-medium">{sub.service}</span>
                </div>
                <span
                  className={`text-sm font-semibold ${sub.service.toLowerCase().includes("usd") ? "text-green-400" : "text-blue-300"}`}
                >
                  {sub.total_amount_formatted}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
