"use client"

import Link from "next/link"

const kpis = [
  { title: "Active Projects", value: "24", delta: "+12%", trend: "positive" },
  { title: "AI Readiness", value: "78%", delta: "+5%", trend: "positive" },
  { title: "Value Delivered", value: "$2.4M", delta: "+18%", trend: "positive" },
  { title: "Risk Score", value: "94%", delta: "Stable", trend: "neutral" },
  { title: "Sprint Velocity", value: "42", delta: "+8%", trend: "positive" },
]

const tabs = [
  { label: "Overview", href: "/intelligence/overview", active: true },
  { label: "Discovery", href: "/intelligence/discovery", active: false },
  { label: "Competitive", href: "/intelligence/competitive", active: false },
  { label: "Backlog", href: "/intelligence/backlog", active: false },
  { label: "Traceability", href: "/intelligence/traceability", active: false },
]

export default function IntelligenceOverview() {
  return (
    <div className="space-y-6">
      {/* Header Block */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              Client Intelligence
            </h1>
            <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
              Align goals. Draft AI-ready backlogs. Prove value every sprint.
            </p>
          </div>
        </div>

        {/* Segmented Tabs */}
        <div className="mt-6 flex gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
          {tabs.map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab.active ? "shadow-soft" : "hover:bg-opacity-50"
              }`}
              style={{
                backgroundColor: tab.active ? "var(--bg)" : "transparent",
                color: tab.active ? "var(--blue-800)" : "var(--text-muted)",
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <div
            key={kpi.title}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              {kpi.title}
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              {kpi.value}
            </p>
            <div className="mt-2 flex items-center gap-1">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                style={{
                  backgroundColor:
                    kpi.trend === "positive"
                      ? "var(--green-50)"
                      : kpi.trend === "negative"
                        ? "var(--red-50)"
                        : "var(--blue-50)",
                  color:
                    kpi.trend === "positive"
                      ? "var(--green-700)"
                      : kpi.trend === "negative"
                        ? "var(--red-700)"
                        : "var(--blue-700)",
                }}
              >
                {kpi.delta}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Card */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
              Quick Actions
            </h3>
            <p className="mt-1" style={{ color: "var(--text-muted)" }}>
              Start new initiatives or continue existing work
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/(platform)/blueprint/canvas"
              className="px-4 py-2 rounded-md border font-medium transition-colors hover:bg-opacity-50"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                backgroundColor: "var(--surface)",
              }}
            >
              Open Blueprint
            </Link>
            <Link
              href="/intelligence"
              className="px-4 py-2 rounded-md text-white font-medium shadow-soft hover:bg-opacity-90 transition-colors"
              style={{ background: "var(--grad-cta)" }}
            >
              Go to Intelligence
            </Link>
          </div>
        </div>
      </div>

      {/* Insights Card */}
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-1)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
            style={{ backgroundColor: "var(--blue-100)" }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--blue-600)" }}>
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
              AI Insights
            </h3>
            <p className="mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Based on current project data, your team is performing 23% above industry benchmarks for AI transformation
              initiatives. Consider expanding the modernization scope to capitalize on this momentum.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
