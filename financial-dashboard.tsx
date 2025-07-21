"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Menu,
  Info,
  TrendingUp,
  Search,
  ArrowRight,
  Building2,
  Smartphone,
  Wifi,
  Home,
  ShoppingBag,
  Coffee,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react"

export default function Component() {
  const [selectedMonth, setSelectedMonth] = useState("Aug")

  const spendingData = [
    { month: "Apr", amount: 45, height: "h-12" },
    { month: "May", amount: 65, height: "h-16" },
    { month: "Jun", amount: 55, height: "h-14" },
    { month: "Jul", amount: 40, height: "h-10" },
    { month: "Aug", amount: 80, height: "h-20" },
  ]

  console.log("Spending JAAAAA:")

  const categories = [
    { name: "Living", amount: "$2,650", transactions: "52 transactions", color: "bg-blue-500", icon: Home },
    { name: "Lifestyle", amount: "$1,789", transactions: "", color: "bg-purple-500", icon: Coffee },
    { name: "Shopping", amount: "$1,660", transactions: "34 transactions", color: "bg-green-500", icon: ShoppingBag },
  ]

  const accounts = [
    { name: "ANZ", type: "Bank", balance: "$6,000", color: "bg-blue-600" },
    { name: "Super", type: "Super", balance: "$24,670", color: "bg-gray-700" },
    { name: "Rabobank", type: "Savings", balance: "View balance", color: "bg-green-600" },
  ]

  const recentBills = [
    { name: "Energy Australia", type: "Electricity", amount: "$50.00", icon: Building2, color: "bg-blue-500" },
    { name: "Optus", type: "Mobile", amount: "-$65.00", icon: Smartphone, color: "bg-green-500" },
    { name: "Woolworths", type: "Groceries", amount: "-$89.50", icon: ShoppingBag, color: "bg-red-500" },
  ]

  const subscriptions = [
    { name: "Streamline", price: "$89", icon: Wifi, color: "bg-blue-500" },
    { name: "Figma", price: "$15.00", icon: Gamepad2, color: "bg-purple-500" },
    { name: "YouTube", price: "-$89", icon: Smartphone, color: "bg-red-500" },
    { name: "YouTube", price: "-$89", icon: Smartphone, color: "bg-red-500" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex gap-6">
      {/* Mobile App Interface */}
      <div className="relative">
        <div className="w-80 bg-white rounded-3xl shadow-2xl border-8 border-blue-900 overflow-hidden">
          {/* Mobile Header */}
          <div className="bg-white px-6 py-4 flex items-center justify-between">
            <Menu className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Spending</h1>
            <Info className="w-6 h-6" />
          </div>

          {/* Spending Amount */}
          <div className="px-6 py-4">
            <div className="text-4xl font-bold mb-2">$760</div>
            <div className="flex items-center text-red-500 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              16.7% from last month
            </div>
          </div>

          {/* Chart */}
          <div className="px-6 py-4">
            <div className="flex items-end justify-between h-32 mb-4">
              {spendingData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-8 ${data.height} bg-blue-500 rounded-t-sm mb-2 ${
                      data.month === selectedMonth ? "bg-blue-600" : "bg-blue-300"
                    }`}
                  />
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Categories</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Merchants</span>
                <Search className="w-4 h-4 text-gray-400" />
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              {categories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        {category.transactions && <div className="text-xs text-gray-500">{category.transactions}</div>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{category.amount}</div>
                      <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
                    </div>
                  </div>
                )
              })}
            </div>

            <button className="text-blue-500 text-sm mt-4">View all transactions</button>
          </div>
        </div>
      </div>

      {/* Desktop Dashboard */}
      <div className="flex-1 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm">Hello, Beatrice 👋</span>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white text-sm">B</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Net Worth */}
          <Card className="col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Net worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$120,000</div>
            </CardContent>
          </Card>

          {/* Spending Chart */}
          <Card className="col-span-4">
            <CardContent className="p-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray="94 314"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="8"
                    strokeDasharray="63 314"
                    strokeDashoffset="-94"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="47 314"
                    strokeDashoffset="-157"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray="110 314"
                    strokeDashoffset="-204"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">Spending</div>
                  <div className="text-lg font-bold">$5,607</div>
                  <div className="text-xs text-gray-500">this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cashflow */}
          <Card className="col-span-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cashflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">This month</span>
                </div>
                <span className="font-semibold text-green-600">$4,790</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Spending</span>
                </div>
                <span className="font-semibold text-red-600">$6,278</span>
              </div>
            </CardContent>
          </Card>

          {/* Accounts */}
          <Card className="col-span-8">
            <CardHeader>
              <CardTitle className="text-lg">Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {accounts.map((account, index) => (
                  <div key={index} className={`${account.color} rounded-lg p-4 text-white`}>
                    <div className="text-sm opacity-90">{account.type}</div>
                    <div className="font-semibold">{account.name}</div>
                    <div className="text-lg font-bold mt-2">{account.balance}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Bills */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Recent Bills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentBills.map((bill, index) => {
                const IconComponent = bill.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${bill.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{bill.name}</div>
                        <div className="text-xs text-gray-500">{bill.type}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-sm">{bill.amount}</div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Subscriptions */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {subscriptions.map((sub, index) => {
                const IconComponent = sub.icon
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${sub.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{sub.name}</span>
                    </div>
                    <div className="font-semibold text-sm">{sub.price}</div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* What's New */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-lg">What's new</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-600 rounded-lg p-4 text-white">
                <h3 className="font-semibold mb-2">Get to know your app</h3>
                <p className="text-sm opacity-90 mb-3">
                  Take advantage of all new features and get the most out of your money
                </p>
                <Button variant="secondary" size="sm">
                  Learn more
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
