"use client"

import { useEffect, useMemo, useState } from "react"
import { Bitcoin, DollarSign, Home, Banknote, Plus, Target, Trash2, TrendingUp, Receipt } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

/**
 * All-in-one Ahorros section.
 * - Four savings cards: BTC, USD, Alquiler, Balanz
 * - Category monthly caps (tope por categorías) with create/remove
 * - BTC price via /api/btc-price, with fallback to CoinGecko on client
 *
 * Backend contract (payloads + commented examples) included below.
 */

/* =========================
   Backend contract (types)
   ========================= */

/**
 * Example payloads you can send to your backend:
 *
 * List caps for a user and month:
 * const payload: ListCategoryLimitsPayload = {
 *   userId: "usr_123",
 *   month: "2025-08", // YYYY-MM
 *   // workspaceId: "ws_abc" // optional if you segment data per workspace
 * }
 * const limits = await listCategoryLimits(payload)
 *
 * Create/update a cap:
 * const payload: UpsertCategoryLimitPayload = {
 *   userId: "usr_123",
 *   month: "2025-08",
 *   limit: { category: "Supermercado", monthlyCap: 150000 },
 *   // workspaceId: "ws_abc"
 * }
 * const saved = await upsertCategoryLimit(payload)
 *
 * Remove a cap:
 * const payload: RemoveCategoryLimitPayload = {
 *   userId: "usr_123",
 *   month: "2025-08",
 *   category: "Supermercado",
 *   // workspaceId: "ws_abc"
 * }
 * await removeCategoryLimit(payload)
 */

export type CategoryLimitRecord = {
    category: string
    monthlyCap: number // ARS
}

export type ListCategoryLimitsPayload = {
    userId: string
    month: `${number}-${number}` // YYYY-MM
    workspaceId?: string
}

export type UpsertCategoryLimitPayload = {
    userId: string
    month: `${number}-${number}` // YYYY-MM
    limit: CategoryLimitRecord
    workspaceId?: string
}

export type RemoveCategoryLimitPayload = {
    userId: string
    month: `${number}-${number}` // YYYY-MM
    category: string
    workspaceId?: string
}

/* ==========================================
   Placeholder persistence (preview/local dev)
   Replace with your real backend fetch calls.
   ========================================== */

const LS_KEY = "ahorros_limits_v1"
function makeKey(p: { userId: string; month: string; workspaceId?: string }) {
    return `${LS_KEY}:${p.workspaceId ?? "default"}:${p.userId}:${p.month}`
}

async function listCategoryLimits(payload: ListCategoryLimitsPayload): Promise<CategoryLimitRecord[]> {
    if (typeof window === "undefined") return []
    const k = makeKey(payload)
    const raw = localStorage.getItem(k)
    if (!raw) return []
    try {
        return JSON.parse(raw) as CategoryLimitRecord[]
    } catch {
        return []
    }
}
async function upsertCategoryLimit(payload: UpsertCategoryLimitPayload): Promise<CategoryLimitRecord> {
    if (typeof window === "undefined") return payload.limit
    const k = makeKey(payload)
    const current = await listCategoryLimits(payload)
    const idx = current.findIndex((c) => c.category === payload.limit.category)
    if (idx >= 0) current[idx] = payload.limit
    else current.push(payload.limit)
    localStorage.setItem(k, JSON.stringify(current))
    return payload.limit
}
async function removeCategoryLimit(payload: RemoveCategoryLimitPayload): Promise<void> {
    if (typeof window === "undefined") return
    const k = makeKey(payload)
    const all = await listCategoryLimits({ userId: payload.userId, month: payload.month, workspaceId: payload.workspaceId })
    const filtered = all.filter((c) => c.category !== payload.category)
    localStorage.setItem(k, JSON.stringify(filtered))
}

/* =========================
   Helpers (format + styles)
   ========================= */

function formatARS(n: number) {
    try {
        return n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })
    } catch {
        return `ARS ${Math.round(n).toString()}`
    }
}
function formatUSD(n: number) {
    try {
        return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
    } catch {
        return `USD ${Math.round(n).toString()}`
    }
}
function formatBTC(n: number) {
    return `${n.toFixed(6)} BTC`
}

function DarkCard(props: React.ComponentProps<"div">) {
    const { className, ...rest } = props
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/10",
                "bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.04)_0%,rgba(7,13,23,0.96)_42%,rgba(5,10,18,1)_100%)]",
                "ring-1 ring-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                className
            )}
            {...rest}
        />
    )
}

/* =========================
   Types + component props
   ========================= */

export type SavingsAccounts = {
    btc: number // BTC
    usd: number // USD
    alquiler: number // ARS
    balanz: number // ARS
}

export type SavingSectionProps = {
    // Data
    accounts?: SavingsAccounts
    monthlySpendByCategory?: Record<string, number>
    categories?: string[]

    // Persistence scoping
    userId?: string
    month?: `${number}-${number}` // YYYY-MM
    workspaceId?: string

    // Optional: seed initial limits if backend is empty
    initialLimits?: CategoryLimitRecord[]

    className?: string
}

/* =========================
   Main component
   ========================= */

export default function SavingSection({
    accounts = { btc: 0.125, usd: 2350, alquiler: 180000, balanz: 950000 },
    monthlySpendByCategory = {
        Supermercado: 120000,
        Transporte: 42000,
        Salud: 18000,
        Comidas: 95000,
        Entretenimiento: 36000,
    },
    categories,
    userId = "user_123", // TODO: replace with your real session user
    month = new Date().toISOString().slice(0, 7) as `${number}-${number}`,
    workspaceId,
    initialLimits = [],
    className,
}: SavingSectionProps) {
    const allCategories = categories ?? Object.keys(monthlySpendByCategory)

    // UI state
    const [limits, setLimits] = useState<CategoryLimitRecord[]>(initialLimits)
    const [open, setOpen] = useState(false)
    const [newCategory, setNewCategory] = useState<string | undefined>()
    const [newCap, setNewCap] = useState<string>("")

    // BTC quote
    const [btcQuote, setBtcQuote] = useState<{ usd: number; ars: number } | null>(null)

    // Load limits from backend (placeholder localStorage in this file)
    useEffect(() => {
        const payload: ListCategoryLimitsPayload = { userId, month, workspaceId }
            ; (async () => {
                try {
                    const found = await listCategoryLimits(payload)
                    if (found.length === 0 && initialLimits.length > 0) {
                        // seed once
                        for (const lim of initialLimits) {
                            await upsertCategoryLimit({ userId, month, workspaceId, limit: lim })
                        }
                        setLimits(initialLimits)
                    } else {
                        setLimits(found)
                    }
                } catch (e) {
                    console.error("listCategoryLimits failed:", e)
                }
            })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, month, workspaceId])

    // Fetch BTC price (try server proxy /api/btc-price, fallback to CoinGecko)
    useEffect(() => {
        ; (async () => {
            try {
                const res = await fetch("/api/btc-price", { cache: "no-store" })
                if (res.ok) {
                    const data = (await res.json()) as { usd: number; ars: number }
                    setBtcQuote({ usd: data.usd, ars: data.ars })
                    return
                }
            } catch { }
            // fallback direct
            try {
                const url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,ars"
                const r = await fetch(url, { cache: "no-store", headers: { accept: "application/json" } })
                const d = (await r.json()) as { bitcoin?: { usd?: number; ars?: number } }
                setBtcQuote({ usd: d.bitcoin?.usd ?? 0, ars: d.bitcoin?.ars ?? 0 })
            } catch (e) {
                console.error("BTC fallback failed:", e)
            }
        })()
    }, [])

    const categoriesWithoutLimit = useMemo(
        () => allCategories.filter((c) => !limits.some((l) => l.category === c)),
        [allCategories, limits]
    )

    async function handleCreate() {
        if (!newCategory) return
        const n = Number(newCap.replaceAll(".", "").replace(",", "."))
        const monthlyCap = Number.isFinite(n) ? Math.max(0, n) : 0
        const payload: UpsertCategoryLimitPayload = { userId, month, workspaceId, limit: { category: newCategory, monthlyCap } }
        try {
            const saved = await upsertCategoryLimit(payload)
            setLimits((prev) => [...prev, saved])
            setOpen(false)
            setNewCategory(undefined)
            setNewCap("")
        } catch (e) {
            console.error("upsertCategoryLimit failed:", e)
        }
    }

    async function handleRemove(category: string) {
        const payload: RemoveCategoryLimitPayload = { userId, month, workspaceId, category }
        try {
            await removeCategoryLimit(payload)
            setLimits((prev) => prev.filter((l) => l.category !== category))
        } catch (e) {
            console.error("removeCategoryLimit failed:", e)
        }
    }

    // Render
    const dolarOficial = 0
    const btcARS = btcQuote?.ars ? accounts.btc * btcQuote.ars : 0
    const btcUSD = btcQuote?.usd ? accounts.btc * btcQuote.usd : 0

    const totalARS = accounts.alquiler + accounts.balanz + btcARS + accounts.usd * dolarOficial;
    const totalUSD = accounts.usd + btcUSD;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Header Section */}
            <div className="p-6 pb-4">

                {/* Ahorros Totales */}
                <div className="bg-gradient-to-br from-blue-800/20 to-slate-900/30 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-6 mb-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-blue-300" />
                        <span className="text-sm font-semibold text-blue-200">AHORROS TOTALES</span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-sm text-blue-300 mb-1">Total en ARS</div>
                            <div className="text-2xl font-bold text-blue-200">{formatARS(totalARS)}</div>
                        </div>
                        <div>
                            <div className="text-sm text-blue-300 mb-1">Total en USD</div>
                            <div className="text-2xl font-bold text-blue-200">{formatUSD(totalUSD)}</div>
                        </div>
                    </div>
                </div>

                {/* BTC */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Bitcoin className="w-5 h-5 text-yellow-300" />
                            <span className="text-xs text-yellow-300 font-medium">AHORROS EN BTC</span>
                        </div>
                        <div className="text-xl font-bold text-yellow-300 mb-1">{formatBTC(accounts.btc)}</div>
                        {btcQuote && (
                            <p className="text-xs text-slate-400">
                                ≈ {btcARS !== undefined ? formatARS(btcARS) : "-"}
                                {btcUSD !== undefined ? ` • ${formatUSD(btcUSD)}` : ""}
                            </p>
                        )}
                    </div>

                    {/* Ahorros en USD */}
                    <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-800/20 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-5 h-5 text-emerald-400" />
                            <span className="text-xs text-emerald-300 font-medium">AHORROS EN USD</span>
                        </div>
                        <div className="text-xl font-bold text-emerald-300 mb-1">{formatUSD(accounts.usd)}</div>
                    </div>

                    {/* Ahorros Alquiler */}
                    <div className="bg-gradient-to-br from-sky-600/20 to-sky-800/20 backdrop-blur-sm border border-sky-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Home className="w-5 h-5 text-sky-400" />
                            <span className="text-xs text-sky-300 font-medium">AHORROS ALQUILER</span>
                        </div>
                        <div className="text-xl font-bold text-sky-300 mb-1">{formatARS(accounts.alquiler)}</div>
                    </div>

                    {/* Ahorros Balanz */}
                    <div className="bg-gradient-to-br from-violet-600/20 to-violet-800/20 backdrop-blur-sm border border-violet-500/20 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Banknote className="w-5 h-5 text-violet-400" />
                            <span className="text-xs text-violet-300 font-medium">AHORROS BALANZ</span>
                        </div>
                        <div className="text-xl font-bold text-violet-300 mb-1">{formatARS(accounts.balanz)}</div>
                    </div>
                </div>
                {/* Tope por categorías */}
                <section aria-labelledby="tope-categorias" className="mb-6">
                    <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-sky-300" />
                            <h2 id="tope-categorias" className="text-sm font-medium text-white">
                                Tope de gastos por categorías
                            </h2>
                        </div>
                        <Button
                            size="sm"
                            onClick={() => setOpen(true)}
                            disabled={categoriesWithoutLimit.length === 0}
                            className={cn(
                                "h-8 px-4 flex items-center gap-2 text-sm font-medium text-white",
                                "bg-gradient-to-br from-slate-800 to-slate-900",
                                "hover:from-slate-700 hover:to-slate-800",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "border border-slate-600/30 rounded-xl shadow-md transition-all duration-200"
                            )}
                        >
                            <Plus className="h-4 w-4" />
                            Agregar tope
                        </Button>

                    </div>

                    {limits.length === 0 ? (
                        <div className="bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm border border-slate-500/10 rounded-2xl p-4">
                            <p className="text-sm text-slate-400">
                                Aún no definiste topes. Crea uno por categoría para monitorear el gasto mensual.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {limits.map((limit) => {
                                const current = monthlySpendByCategory[limit.category] ?? 0
                                const ratio = limit.monthlyCap > 0 ? current / limit.monthlyCap : 0
                                const pct = Math.min(100, Math.round(ratio * 100))
                                const state = ratio > 1 ? "over" : ratio >= 0.8 ? "warn" : "ok"
                                const badge =
                                    state === "over" ? "text-rose-300" : state === "warn" ? "text-amber-300" : "text-emerald-300"
                                const bar =
                                    state === "over" ? "bg-rose-500" : state === "warn" ? "bg-amber-400" : "bg-emerald-500"
                                const spendText =
                                    state === "over" ? "text-rose-300" : state === "warn" ? "text-amber-300" : "text-slate-300"

                                return (
                                    <div
                                        key={limit.category}
                                        className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-slate-500/20 rounded-2xl p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-sm font-medium text-white">{limit.category}</h3>
                                                    <span className={`text-[11px] font-medium ${badge}`}>
                                                        {state === "over"
                                                            ? "Excedido"
                                                            : state === "warn"
                                                                ? "Cerca del tope"
                                                                : "En rango"}
                                                    </span>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-400">
                                                    Tope: <span className="text-white">{formatARS(limit.monthlyCap)}</span> • Gastado:{" "}
                                                    <span className={spendText}>{formatARS(current)}</span>
                                                </div>
                                            </div>

                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-slate-300 hover:text-white"
                                                onClick={() => handleRemove(limit.category)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Eliminar tope</span>
                                            </Button>
                                        </div>

                                        <div className="mt-2 relative">
                                            <Progress value={pct} className="h-2 bg-slate-800 rounded-full" />
                                            <div
                                                className={`pointer-events-none absolute inset-y-0 left-0 rounded-full ${bar}`}
                                                style={{ width: `${pct}%` }}
                                                aria-hidden="true"
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>

                {/* Create dialog */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-md bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-white text-lg font-semibold">Nuevo tope mensual</DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4 py-2">
                            {/* Categoría */}
                            <div className="grid gap-2">
                                <Label className="text-slate-300 text-sm">Categoría</Label>
                                <Select value={newCategory} onValueChange={setNewCategory}>
                                    <SelectTrigger className="bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-400 rounded-lg focus:ring-2 focus:ring-emerald-500">
                                        <SelectValue placeholder="Selecciona una categoría" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-900 border border-white/10 text-white rounded-lg">
                                        {categoriesWithoutLimit.map((c) => (
                                            <SelectItem key={c} value={c} className="text-slate-100 hover:bg-slate-800 cursor-pointer">
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Monto */}
                            <div className="grid gap-2">
                                <Label className="text-slate-300 text-sm">Monto mensual (ARS)</Label>
                                <Input
                                    inputMode="numeric"
                                    placeholder="Ej: 120000"
                                    value={newCap}
                                    onChange={(e) => setNewCap(e.target.value)}
                                    className="bg-slate-900/60 border border-white/10 text-white placeholder:text-slate-500 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <DialogFooter className="mt-2">
                            <Button
                                variant="ghost"
                                className="text-slate-300 hover:text-white transition"
                                onClick={() => setOpen(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium shadow-md"
                                onClick={handleCreate}
                                disabled={!newCategory || Number(newCap.replaceAll(".", "").replace(",", ".")) <= 0}
                            >
                                Guardar tope
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )

}
