"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const tabs = [
  { id: "overview", label: "Overview", href: "/design" },
  { id: "inputs", label: "Design Inputs", href: "/design/inputs" },
  { id: "tradeoffs", label: "Trade-offs", href: "/design/tradeoffs" },
  { id: "views", label: "Architecture Views", href: "/design/views" },
  { id: "docs", label: "Docs & Sync", href: "/design/docs" },
]

export default function DesignOverviewPage() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top Navigation Tabs */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="px-8 py-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? "shadow-sm" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--blue-50)" : "transparent",
                    color: isActive ? "var(--blue-800)" : "var(--text)",
                    border: `1px solid ${isActive ? "var(--blue-200)" : "transparent"}`,
                  }}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--ai-royal)" }}>
              Generative Design Studio
            </h1>
            <p className="text-base" style={{ color: "var(--text-muted)" }}>
              Generate architecture models from business evidence and requirements.
            </p>
          </div>

          {/* Overview Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Start Card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                Quick Start
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Begin by selecting an industry and mapping your evidence.
              </p>
              <Link
                href="/design/inputs"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                Start Design Inputs
              </Link>
            </div>

            {/* Recent Models Card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                Recent Models
              </h3>
              <div className="text-center py-8">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  No models generated yet
                </p>
              </div>
            </div>

            {/* Status Card */}
            <div
              className="p-6 rounded-2xl border"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                Studio Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Design Inputs
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    0
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Generated Models
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    0
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Sync Status
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Up to date
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
