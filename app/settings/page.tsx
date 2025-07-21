import { MobileHeader } from "@/components/layout/mobile-header"

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <MobileHeader title="Settings" />

      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-500">App settings and preferences</p>
        </div>
      </div>
    </div>
  )
}
