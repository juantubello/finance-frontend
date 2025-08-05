"use client"

import { useState } from "react"
import {
  RefreshCw,
  Calendar,
  History,
  DollarSign,
  FileText,
  TrendingUp,
  X,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"

import type { ExpenseItem, IncomeItem } from "@/lib/types"

import { syncExpenses, syncIncomes, syncResumes } from "@/lib/api"

interface SyncNotification {
  id: string
  type: "success" | "error" | "info"
  message: string
}

export interface SyncExpensesResponse {
  rows_deleted: number
  inserted_rows_details: ExpenseItem[]
  inserted_rows: number
  deleted_rows_detail: ExpenseItem[]
}

export interface SyncIncomeResponse {
  rows_deleted: number
  inserted_rows_details: IncomeItem[]
  inserted_rows: number
  deleted_rows_detail: IncomeItem[]
}


const syncButtons = [
  {
    id: "monthly-expenses",
    title: "Sincronizar gastos mensuales",
    description: "Gastos del mes actual",
    icon: Calendar,
    color: "bg-red-600/20 border-red-500/20 text-red-300",
    iconColor: "text-red-400",
    isHistorical: false,
  },
  {
    id: "historical-expenses",
    title: "Sincronizar gastos historicos",
    description: "Historico de gastos",
    icon: History,
    color: "bg-orange-600/20 border-orange-500/20 text-orange-300",
    iconColor: "text-orange-400",
    isHistorical: true,
  },
  {
    id: "monthly-income",
    title: "Sincronizar ingresos mensuales",
    description: "Ingresos mensuales",
    icon: TrendingUp,
    color: "bg-green-600/20 border-green-500/20 text-green-300",
    iconColor: "text-green-400",
    isHistorical: false,
  },
  {
    id: "historical-income",
    title: "Sincronizar ingresos historicos",
    description: "Ingresos historicos",
    icon: DollarSign,
    color: "bg-blue-600/20 border-blue-500/20 text-blue-300",
    iconColor: "text-blue-400",
    isHistorical: true,
  },
  {
    id: "sync-resumes",
    title: "Sincronizar resumes de tarjeta",
    description: "Resumenes de cuenta",
    icon: FileText,
    color: "bg-purple-600/20 border-purple-500/20 text-purple-300",
    iconColor: "text-purple-400",
    isHistorical: false,
  },
]

export function SyncSection() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedSync, setSelectedSync] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [notifications, setNotifications] = useState<SyncNotification[]>([])

  const addNotification = (type: "success" | "error" | "info", message: string) => {
    const id = Date.now().toString()
    const notification = { id, type, message }
    setNotifications((prev) => [...prev, notification])

    // Auto remove after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 3000)
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const performSync = async (syncType: string) => {

    let syncExpensesResponse: SyncExpensesResponse | null = null

    setIsLoading(syncType)
    try {

      let success = false
      let syncName = ""

      switch (syncType) {
        case "monthly-expenses":
          syncExpensesResponse = await syncExpenses(false)
          success = true
          syncName = "gastos"
          break
        case "historical-expenses":
          syncExpensesResponse = await syncExpenses(true)
          success = true
          syncName = "gastos historicos"
          break
        case "monthly-income":
          await syncIncomes(false)
          success = true
          syncName = "ingresos"
          break
        case "historical-income":
          await syncIncomes(true)
          success = true
          syncName = "ingresos historicos"
          break
        case "sync-resumes":
          await syncResumes()
          success = true
          syncName = "resumes"
          break
        default:
          throw new Error("Tipo de sincronizacion desconocido")
      }

      if (success) {
        let deleted, added
        if (syncExpensesResponse && syncExpensesResponse?.rows_deleted > 0) {
          deleted = syncExpensesResponse.rows_deleted
        }
        if (syncExpensesResponse && syncExpensesResponse?.inserted_rows > 0) {
          added = syncExpensesResponse.inserted_rows
        }
        if (deleted && added) {
          addNotification("success", `${added} ${syncName} sincronizados y ${deleted} eliminados`)
        } else if (added) {
          addNotification("success", `${added} ${syncName} sincronizados`)
        } else if (deleted) {
          addNotification("success", `${deleted} ${syncName} eliminados`)
        } else {
          if (syncName === "resumes") {
            addNotification("info", `Sincronización de resumenes iniciada`)
          } else {
            addNotification("info", `no existen nuevos ${syncName} para sincronizar`)
          }

        }
      }

    }
    catch (err) {
      addNotification("error", `Failed to sync ${err}`)
    }

    setIsLoading(null)
  }

  const handleSync = (syncType: string) => {
    const button = syncButtons.find((b) => b.id === syncType)

    if (button?.isHistorical) {
      setSelectedSync(syncType)
      setShowConfirmation(true)
    } else {
      performSync(syncType)
    }
  }

  const confirmHistoricalSync = () => {
    if (selectedSync) {
      performSync(selectedSync)
    }
    setShowConfirmation(false)
    setSelectedSync(null)
  }

  const cancelConfirmation = () => {
    setShowConfirmation(false)
    setSelectedSync(null)
  }

  return (
    <>
      <div className="px-6 pb-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Sincronizar datos</h3>
        </div>

        <div className="space-y-3">
          {syncButtons.map((button) => {
            const IconComponent = button.icon
            const isCurrentlyLoading = isLoading === button.id

            return (
              <button
                key={button.id}
                onClick={() => handleSync(button.id)}
                disabled={isCurrentlyLoading || isLoading !== null}
                className={`w-full p-4 rounded-2xl border backdrop-blur-sm transition-all duration-200 hover:shadow-lg active:scale-[0.98] ${button.color} ${isCurrentlyLoading || isLoading !== null ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gray-800/50 flex items-center justify-center ${button.iconColor}`}
                  >
                    {isCurrentlyLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white">{button.title}</div>
                    <div className="text-sm opacity-75">{isCurrentlyLoading ? "Syncing..." : button.description}</div>
                  </div>
                  {!isCurrentlyLoading && <RefreshCw className="w-4 h-4 opacity-50 text-white" />}
                </div>
              </button>
            )
          })}
        </div>

      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 max-w-sm w-full mx-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <History className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Confirmación de sincronización</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Puede tardar mucho!! 😅😅
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelConfirmation}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmHistoricalSync}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Notifications */}
      <div className="fixed bottom-24 left-4 right-4 z-40 space-y-2 max-w-md mx-auto">
        {notifications.map((notification) => {
          let bgColor = ""
          let borderColor = ""
          let textColor = "text-white"
          let Icon = AlertCircle
          let iconColor = ""

          switch (notification.type) {
            case "success":
              bgColor = "bg-green-600/90"
              borderColor = "border-green-500/50"
              iconColor = "text-green-200"
              Icon = CheckCircle
              break
            case "info":
              bgColor = "bg-blue-600/90"
              borderColor = "border-blue-500/50"
              iconColor = "text-blue-200"
              Icon = Info
              break
            default:
              bgColor = "bg-red-600/90"
              borderColor = "border-red-500/50"
              iconColor = "text-red-200"
              Icon = AlertCircle
              break
          }

          return (
            <div
              key={notification.id}
              className={`flex items-center gap-3 p-3 rounded-lg shadow-lg backdrop-blur-sm border animate-in slide-in-from-bottom-2 ${bgColor} ${borderColor} ${textColor}`}
            >
              <Icon className={`w-5 h-5 ${iconColor}`} />
              <span className="flex-1 text-sm font-medium">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>

    </>
  )
}
