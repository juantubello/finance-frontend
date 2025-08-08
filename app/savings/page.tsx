import { PiggyBank } from 'lucide-react'
import SavingSection from "@/components/savings/saving-section"
import { MobileHeader } from "@/components/layout/mobile-header"

export default function AhorrosPage() {
    const accounts = { btc: 0.125, usd: 2350, alquiler: 180000, balanz: 950000 }
    const monthlySpendByCategory = {
        Supermercado: 120000,
        Transporte: 42000,
        Salud: 18000,
        Comidas: 95000,
        Entretenimiento: 36000,
    }
    const categories = Object.keys(monthlySpendByCategory)

    return (
            <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <MobileHeader title="Ahorros" />
            <div className="py-4">
            <SavingSection
                accounts={accounts}
                categories={categories}
                monthlySpendByCategory={monthlySpendByCategory}
            />
            </div>
        </div>
    )
}
