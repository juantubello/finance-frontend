"use client"
import { Home, CreditCard, TrendingUp, PieChart, RefreshCw } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/expenses", icon: CreditCard, label: "Gastos" },
  { href: "/income", icon: TrendingUp, label: "Ingresos" },
  { href: "/cards", icon: CreditCard, label: "Tarjetas" },
    { href: "/analytics", icon: PieChart, label: "Analiticas" },
  { href: "/sync", icon: RefreshCw, label: "Sync" },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 px-2 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/cards" && pathname.startsWith("/cards"))
          const IconComponent = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-2 rounded-lg transition-colors ${
                isActive ? "text-blue-400 bg-blue-500/20" : "text-gray-400 hover:text-white"
              }`}
            >
              <IconComponent className="w-4 h-4 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
