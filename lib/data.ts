import { format } from "path"
import type { Transaction, Category, Account, Bill, Subscription, SpendingData, CardData, CardsSubscriptions } from "./types"

export const spendingData: SpendingData[] = [
  { month: "Apr", amount: 450, percentage: 45 },
  { month: "May", amount: 650, percentage: 65 },
  { month: "Jun", amount: 550, percentage: 55 },
  { month: "Jul", amount: 400, percentage: 40 },
  { month: "Aug", amount: 760, percentage: 80 },
]

export const categories: Category[] = [
  {
    id: "1",
    name: "Living",
    amount: 2650,
    transactions: 52,
    color: "bg-blue-500",
    icon: "home",
  },
  {
    id: "2",
    name: "Lifestyle",
    amount: 1789,
    transactions: 28,
    color: "bg-purple-500",
    icon: "coffee",
  },
  {
    id: "3",
    name: "Shopping",
    amount: 1660,
    transactions: 34,
    color: "bg-green-500",
    icon: "shopping-bag",
  },
]

export const accounts: Account[] = [
  {
    id: "1",
    name: "ANZ",
    type: "Bank",
    balance: 6000,
    color: "bg-blue-600",
  },
  {
    id: "2",
    name: "Super",
    type: "Super",
    balance: 24670,
    color: "bg-gray-700",
  },
  {
    id: "3",
    name: "Rabobank",
    type: "Savings",
    balance: 15420,
    color: "bg-green-600",
  },
]

export const recentBills: Bill[] = [
  {
    id: "1",
    name: "Energy Australia",
    type: "Electricity",
    amount: 50.0,
    dueDate: "2024-01-25",
    isPaid: false,
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Optus",
    type: "Mobile",
    amount: 65.0,
    dueDate: "2024-01-20",
    isPaid: true,
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Woolworths",
    type: "Groceries",
    amount: 89.5,
    dueDate: "2024-01-18",
    isPaid: true,
    color: "bg-red-500",
  },
]

export const subscriptions: Subscription[] = [
  {
    id: "1",
    name: "Streamline",
    amount: 89,
    billingCycle: "monthly",
    nextBilling: "2024-02-01",
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Figma",
    amount: 15,
    billingCycle: "monthly",
    nextBilling: "2024-01-28",
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "YouTube Premium",
    amount: 12,
    billingCycle: "monthly",
    nextBilling: "2024-01-30",
    color: "bg-red-500",
  },
]

export const transactions: Transaction[] = [
  {
    id: "1",
    amount: -45.5,
    description: "Grocery Shopping",
    category: "Living",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "2",
    amount: -12.0,
    description: "Coffee",
    category: "Lifestyle",
    date: "2024-01-15",
    type: "expense",
  },
  {
    id: "3",
    amount: 2500.0,
    description: "Salary",
    category: "Income",
    date: "2024-01-01",
    type: "income",
  },
]

export const expensesData = {
  Expenses: [
    {
      id: 134,
      uuid: "ccd8bc69-c642-4861-9e94-1aa7ad0eadfc",
      date_time: "16/7/2025 20:35:55",
      date: "0001-01-01T00:00:00Z",
      description: "Mc donalds",
      amount: 36000,
      type: "Delivery",
      formatted_amount: "$36.000,00",
    },
    {
      id: 18,
      uuid: "60ed1ff5-db1d-4a1e-b046-68b59454a516",
      date_time: "16/7/2025 17:37:14",
      date: "0001-01-01T00:00:00Z",
      description: "Ameliaaa",
      amount: 11000,
      type: "Cafe (Amelia/Posta etc)",
      formatted_amount: "$11.000,00",
    },
    {
      id: 125,
      uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      date_time: "15/7/2025 14:22:30",
      date: "0001-01-01T00:00:00Z",
      description: "Grocery shopping",
      amount: 85000,
      type: "Supermarket",
      formatted_amount: "$85.000,00",
    },
    {
      id: 98,
      uuid: "f9e8d7c6-b5a4-3210-9876-543210fedcba",
      date_time: "14/7/2025 09:15:45",
      date: "0001-01-01T00:00:00Z",
      description: "Gas station",
      amount: 45000,
      type: "Transportation",
      formatted_amount: "$45.000,00",
    },
    {
      id: 87,
      uuid: "12345678-90ab-cdef-1234-567890abcdef",
      date_time: "13/7/2025 19:30:12",
      date: "0001-01-01T00:00:00Z",
      description: "Netflix subscription",
      amount: 15000,
      type: "Entertainment",
      formatted_amount: "$15.000,00",
    },
  ],
}

export const incomeData = {
  income_total: 1209732,
  income_total_formatted: "$1.209.732,00",
  incomes_details: [
    {
      id: 6,
      uuid: "61a2a4da-5587-499d-a7e3-ef87c1c7081c",
      date_time: "1/7/2025 21:51:38",
      description: "sueldo junioo",
      amount: 793032,
      type: "ARS",
      formatted_amount: "$793.032,00",
    },
    {
      id: 7,
      uuid: "bc68b0c8-5ecd-4474-aef1-c1093315cfb8",
      date_time: "7/7/2025 19:35:44",
      description: "aguinaldo ",
      amount: 416700,
      type: "ARS",
      formatted_amount: "$416.700,00",
    },
    {
      id: 8,
      uuid: "def456gh-ijkl-mnop-qrst-uvwxyz123456",
      date_time: "10/7/2025 16:20:15",
      description: "Freelance project",
      amount: 250000,
      type: "USD",
      formatted_amount: "$250.000,00",
    },
  ],
}

// Add category spending data for analytics
export const categorySpendingData = [
  { category: "Living", amount: 2650, color: "#3b82f6", formatted_amount: "$2.650,00" },
  { category: "Lifestyle", amount: 1789, color: "#8b5cf6", formatted_amount: "$2.650,00" },
  { category: "Shopping", amount: 1660, color: "#10b981", formatted_amount: "$2.650,00" },
  { category: "Transport", amount: 890, color: "#f59e0b", formatted_amount: "$2.650,00" },
  { category: "Entertainment", amount: 450, color: "#ef4444", formatted_amount: "$2.650,00" },
]

// Updated card data with multiple holders
export const cardsData: CardData[] = [
  {
    document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
    card_type: "visa",
    ResumeDate: "2025-07-01",
    total_ars: 1356410.12,
    total_usd: 405.82,
    formatted_total_ars: "$1.356.410,12",
    formatted_total_usd: "$405,82",
    Holders: [
      {
        document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
        holder: "Cami",
        total_ars: 230684.05,
        total_usd: 8.97,
        formatted_total_ars: "$230.684,05",
        formatted_total_usd: "$8,97",
        Expenses: [
          {
            document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
            holder: "Cami",
            position: 1,
            date: "2024-06-17",
            description: "MERPAGO*MERCADOLIBRE        C.12/12 245940",
            amount: 3947.33,
            formatted_amount: "$3.947,33",
          },
          {
            document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
            holder: "Cami",
            position: 15,
            date: "2025-06-25",
            description: "LE UTTHE 977904",
            amount: 37499.5,
            formatted_amount: "$37.499,50",
          },
        ],
      },
      {
        document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
        holder: "Juan",
        total_ars: 879538.37,
        total_usd: 396.85,
        formatted_total_ars: "$879.538,37",
        formatted_total_usd: "$396,85",
        Expenses: [
          {
            document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
            holder: "Juan",
            position: 1,
            date: "2024-08-05",
            description: "MERPAGO*PRIMOFFICE          C.11/12 260183",
            amount: 6164.13,
            formatted_amount: "$6.164,13",
          },
          {
            document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
            holder: "Juan",
            position: 43,
            date: "2025-06-23",
            description: "NAME-CHEAP.COM*           USD       13,16 485607",
            amount: 13.16,
            formatted_amount: "$13,16",
          },
          {
            document_number: "e119778dbbd67b50a357b211b8e9c1800af9e2fa0006166a512ba8ff56c6c3a6",
            holder: "Juan",
            position: 44,
            date: "2025-06-23",
            description: "GOOGLE *YouTubeP P1cb0NuH USD        5,94 645725",
            amount: 5.94,
            formatted_amount: "$5,94",
          },
        ],
      },
    ],
  },
  {
    document_number: "a3ca001618005dcba6ed86749f6b89448b50836c45e2cdf3f8421b036fd401bc",
    card_type: "mastercard",
    ResumeDate: "2025-07-01",
    total_ars: 368838.14,
    total_usd: 161.43,
    formatted_total_ars: "$368.838,14",
    formatted_total_usd: "$161,43",
    Holders: [
      {
        document_number: "a3ca001618005dcba6ed86749f6b89448b50836c45e2cdf3f8421b036fd401bc",
        holder: "Juan",
        total_ars: 303657.92,
        total_usd: 161.43,
        formatted_total_ars: "$303.657,92",
        formatted_total_usd: "$161,43",
        Expenses: [
          {
            document_number: "a3ca001618005dcba6ed86749f6b89448b50836c45e2cdf3f8421b036fd401bc",
            holder: "Juan",
            position: 1,
            date: "2024-08-26",
            description: "MERPAGO*SONY                C.11/12 847626",
            amount: 19364.61,
            formatted_amount: "$19.364,61",
          },
          {
            document_number: "a3ca001618005dcba6ed86749f6b89448b50836c45e2cdf3f8421b036fd401bc",
            holder: "Juan",
            position: 2,
            date: "2024-09-12",
            description: "MERPAGO*MERCADOLIBRE        C.10/12 017358",
            amount: 15497.2,
            formatted_amount: "$15.497,20",
          },
        ],
      },
    ],
  },
]
export const subscriptionData: CardsSubscriptions[] = [
  {
    service: "ERROR",
    total_amount: 0,
    total_amount_formatted: "0",
    logo_name: ""
  },
]