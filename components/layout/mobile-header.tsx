"use client"

import { useState } from "react"
import { Menu, Info, X } from "lucide-react"
import { GlobalDateFilter } from "./global-date-filter"
import {
  APP_VERSION,
  APP_CREATOR,
  APP_SUPERVISOR,
  APP_BUILD,
} from "@/constants/version"

interface MobileHeaderProps {
  title: string
  showMenu?: boolean
  showInfo?: boolean
}

export function MobileHeader({ title, showMenu = true, showInfo = true }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showVersionModal, setShowVersionModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-transparent relative z-10">
        {showMenu ? (
          <button onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6 text-white" />
          </button>
        ) : (
          <div className="w-6" />
        )}

        <h1 className="text-lg font-semibold text-white">{title}</h1>

        {showInfo ? (
          <button
            onClick={() => setShowVersionModal(true)}
            className="p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Mostrar versión de la app"
          >
            <Info className="w-6 h-6 text-white" />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-gray-900 to-black shadow-lg z-50 border-r border-white/10">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <GlobalDateFilter />
            </div>
          </div>
        </>
      )}

      {/* Modal de versión */}
      {showVersionModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-white relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowVersionModal(false)}
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-semibold mb-2">Gestor de finanzas personales</h3>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Versión:</strong> {APP_VERSION} (Build: {APP_BUILD})
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <strong>Creado por:</strong> {APP_CREATOR}
            </p>
            <p className="text-sm text-gray-300">
              <strong>Supervisión:</strong> {APP_SUPERVISOR}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
