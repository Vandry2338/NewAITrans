import DashboardTemplate from "@/components/templates/DashboardTemplate"

const scanKpis = [
  { title: "Legacy Components", value: "156", change: "-12 this month" },
  { title: "Technical Debt", value: "$890K", change: "-15% this quarter" },
  { title: "Modernization Score", value: "67%", change: "+23% this quarter" },
  { title: "Refactor Candidates", value: "43", change: "New analysis" },
  { title: "Migration Progress", value: "34%", change: "+8% this sprint" },
]

export default function ModernizeScan() {
  return (
    <DashboardTemplate title="Modernize & Migrate" kpis={scanKpis}>
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
          Code Analysis
        </h3>
        <p className="mt-2" style={{ color: "var(--text-muted)" }}>
          AI-powered analysis of legacy code patterns and modernization opportunities.
        </p>
      </div>

      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
          Migration Roadmap
        </h3>
        <p className="mt-2" style={{ color: "var(--text-muted)" }}>
          Prioritized migration plan with risk assessment and effort estimation.
        </p>
      </div>
    </DashboardTemplate>
  )
}
