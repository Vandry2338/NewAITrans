"use client"

import { useState } from "react"
import { PlusIcon, ArrowUpTrayIcon, Cog6ToothIcon } from "@heroicons/react/24/outline"

// Mock KPI data
const mockKPIs = [
  {
    id: "1",
    name: "Customer Acquisition Cost",
    definition: "Total cost of acquiring a new customer including marketing and sales expenses",
    unit: "$",
    target: 150,
    current: 180,
    benchmark: 140,
    industry: "Financial Services",
    function: "Sales",
    processes: ["Lead-to-Cash"],
    capabilities: ["Digital Marketing", "Sales Operations"],
  },
  {
    id: "2",
    name: "Net Promoter Score",
    definition: "Customer loyalty metric measuring likelihood to recommend",
    unit: "Score",
    target: 50,
    current: 42,
    benchmark: 55,
    industry: "Financial Services",
    function: "Customer Success",
    processes: ["Lead-to-Cash"],
    capabilities: ["Customer Experience", "Service Delivery"],
  },
  {
    id: "3",
    name: "Time to Market",
    definition: "Average time from product concept to market launch",
    unit: "Days",
    target: 90,
    current: 120,
    benchmark: 85,
    industry: "Technology",
    function: "Product",
    processes: ["Idea-to-Market"],
    capabilities: ["Product Development", "Go-to-Market"],
  },
  {
    id: "4",
    name: "Employee Turnover Rate",
    definition: "Percentage of employees leaving the organization annually",
    unit: "%",
    target: 8,
    current: 12,
    benchmark: 10,
    industry: "Technology",
    function: "HR",
    processes: ["Recruit-to-Retire"],
    capabilities: ["Talent Management", "Employee Engagement"],
  },
]

const industries = ["All Industries", "Financial Services", "Technology", "Healthcare", "Manufacturing"]
const functions = ["All Functions", "Finance", "Operations", "IT", "Sales", "HR", "Customer Success", "Product"]

export default function KPIsPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedFunction, setSelectedFunction] = useState("All Functions")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingTarget, setEditingTarget] = useState<string | null>(null)
  const [showMappingDrawer, setShowMappingDrawer] = useState(false)

  const filteredKPIs = mockKPIs.filter((kpi) => {
    const matchesIndustry = selectedIndustry === "All Industries" || kpi.industry === selectedIndustry
    const matchesFunction = selectedFunction === "All Functions" || kpi.function === selectedFunction
    const matchesSearch =
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesIndustry && matchesFunction && matchesSearch
  })

  const stats = {
    mapped: filteredKPIs.length,
    unmapped: 6,
    aboveTarget: filteredKPIs.filter((kpi) => kpi.current <= kpi.target).length,
    belowTarget: filteredKPIs.filter((kpi) => kpi.current > kpi.target).length,
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            KPI Catalog
          </h1>
          <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
            Industry KPIs & benchmarks
          </p>
        </div>

        {/* Filter Bar */}
        <div
          className="mb-6 p-4 rounded-xl border flex gap-4 items-center flex-wrap"
          style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
        >
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm min-w-[160px]"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>

          <select
            value={selectedFunction}
            onChange={(e) => setSelectedFunction(e.target.value)}
            className="px-3 py-2 rounded-lg border text-sm min-w-[140px]"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            {functions.map((func) => (
              <option key={func} value={func}>
                {func}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search KPIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
          />

          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              style={{ background: "var(--grad-primary)" }}
            >
              <PlusIcon className="h-4 w-4" />
              Add KPI
            </button>
            <button
              className="px-4 py-2 rounded-lg border text-sm font-medium hover:shadow-sm transition-shadow flex items-center gap-2"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            >
              <ArrowUpTrayIcon className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredKPIs.map((kpi) => (
            <div
              key={kpi.id}
              className="p-6 rounded-xl border hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg leading-tight" style={{ color: "var(--text)" }}>
                  {kpi.name}
                </h3>
                <button
                  onClick={() => setShowMappingDrawer(true)}
                  className="p-1 rounded hover:bg-opacity-10 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Cog6ToothIcon className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {kpi.definition}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    Target:
                  </span>
                  {editingTarget === kpi.id ? (
                    <input
                      type="number"
                      defaultValue={kpi.target}
                      className="w-20 px-2 py-1 text-sm rounded border"
                      style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
                      onBlur={() => setEditingTarget(null)}
                      onKeyDown={(e) => e.key === "Enter" && setEditingTarget(null)}
                      autoFocus
                    />
                  ) : (
                    <button
                      onClick={() => setEditingTarget(kpi.id)}
                      className="text-sm font-medium hover:underline"
                      style={{ color: "var(--blue-600)" }}
                    >
                      {kpi.target} {kpi.unit}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    Current:
                  </span>
                  <span
                    className={`text-sm font-medium ${kpi.current <= kpi.target ? "text-green-600" : "text-red-600"}`}
                  >
                    {kpi.current} {kpi.unit}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    Benchmark:
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    {kpi.benchmark} {kpi.unit}
                  </span>
                </div>
              </div>

              {/* Process Tags */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {kpi.processes.map((process) => (
                    <span
                      key={process}
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
                    >
                      {process}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capability Tags */}
              <div className="flex flex-wrap gap-1">
                {kpi.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{ backgroundColor: "var(--green-100)", color: "var(--green-700)" }}
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coverage Footer */}
        <div
          className="inline-flex items-center gap-4 px-6 py-3 rounded-full text-sm font-medium"
          style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <span style={{ color: "var(--text)" }}>{stats.mapped} mapped</span>
          <div className="w-px h-4" style={{ backgroundColor: "var(--border)" }} />
          <span style={{ color: "var(--text-muted)" }}>{stats.unmapped} unmapped</span>
          <div className="w-px h-4" style={{ backgroundColor: "var(--border)" }} />
          <span className="text-green-600">{stats.aboveTarget} above target</span>
          <div className="w-px h-4" style={{ backgroundColor: "var(--border)" }} />
          <span className="text-red-600">{stats.belowTarget} below target</span>
        </div>

        {/* Mapping Drawer Placeholder */}
        {showMappingDrawer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="w-96 h-96 rounded-xl p-6" style={{ backgroundColor: "var(--bg)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                Map to Process/Capability
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Mapping drawer implementation coming soon...
              </p>
              <button
                onClick={() => setShowMappingDrawer(false)}
                className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                style={{ background: "var(--grad-primary)" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
