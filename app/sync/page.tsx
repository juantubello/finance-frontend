import { MobileHeader } from "@/components/layout/mobile-header"
import { SyncSection } from "@/components/sync/sync-section"

export default function SyncPage() {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <MobileHeader title="Sincronización de datos" />

      <div className="py-4">
        <SyncSection />
      </div>
    </div>
  )
}
