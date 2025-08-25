import type React from "react"
interface KPITile {
  title: string
  value: string
  change?: string
}

interface DashboardTemplateProps {
  title: string
  kpis: KPITile[]
  children?: React.ReactNode
}

export default function DashboardTemplate({ title, kpis, children }: DashboardTemplateProps) {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          {title}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <h3 className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              {kpi.title}
            </h3>
            <p className="text-2xl font-bold mt-1" style={{ color: "var(--blue-800)" }}>
              {kpi.value}
            </p>
            {kpi.change && (
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {kpi.change}
              </p>
            )}
          </div>
        ))}
      </div>

      {children && <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>}
    </div>
  )
}
