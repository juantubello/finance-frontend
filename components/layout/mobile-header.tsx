"use client"

import { useState } from "react"
import { Menu, Info, X } from "lucide-react"
import { GlobalDateFilter } from "./global-date-filter"

interface MobileHeaderProps {
  title: string
  showMenu?: boolean
  showInfo?: boolean
}

export function MobileHeader({ title, showMenu = true, showInfo = true }: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
        {showInfo ? <Info className="w-6 h-6 text-white" /> : <div className="w-6" />}
      </div>

      {/* Slide-out Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />

          {/* Menu Panel */}
          <div className="fixed top-0 left-0 h-full w-80 bg-gradient-to-br from-gray-900 to-black shadow-lg z-50 transform transition-transform duration-300 border-r border-white/10">
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
    </>
  )
}
