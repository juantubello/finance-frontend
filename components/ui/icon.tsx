import { Home, Coffee, ShoppingBag, Building2, Smartphone, Zap, Car, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  coffee: Coffee,
  "shopping-bag": ShoppingBag,
  building: Building2,
  smartphone: Smartphone,
  zap: Zap,
  car: Car,
}

interface IconProps {
  name: string
  className?: string
}

export function Icon({ name, className = "w-5 h-5" }: IconProps) {
  const IconComponent = iconMap[name] || Home
  return <IconComponent className={className} />
}
