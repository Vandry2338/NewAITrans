"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChartBarIcon, Cog6ToothIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import { useICStore } from "@/lib/store"

const tabs = [
  { id: "overview", label: "Overview", href: "/design" },
  { id: "inputs", label: "Design Inputs", href: "/design/inputs" },
  { id: "tradeoffs", label: "Trade-offs", href: "/design/tradeoffs" },
  { id: "views", label: "Architecture Views", href: "/design/views" },
  { id: "docs", label: "Docs & Sync", href: "/design/docs" },
]

const tradeoffTabs = [
  { id: "scenarios", label: "Scenarios" },
  { id: "matrices", label: "Trade-off Matrices" },
  { id: "recommendations", label: "Recommendations" },
]

export default function TradeoffsPage() {
  const pathname = usePathname()
  const [activeTradeoffTab, setActiveTradeoffTab] = useState("scenarios")
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)

  const { designModels, activeDesignInput, computeHeatmap } = useICStore()

  // Get the most recent model or create sample data
  const currentModel = designModels.length > 0 ? designModels[designModels.length - 1] : null
  const heatmapData = activeDesignInput ? computeHeatmap(activeDesignInput.id) : []

  const scenarios = [
    {
      id: "cloud-native",
      name: "Cloud-Native Architecture",
      description: "Microservices with containerization and cloud-first approach",
      scores: {
        performance: 85,
        scalability: 95,
        cost: 70,
        complexity: 60,
        timeToMarket: 75,
      },
      pros: ["High scalability", "Modern tech stack", "DevOps friendly"],
      cons: ["Higher complexity", "Vendor lock-in risk", "Learning curve"],
    },
    {
      id: "hybrid",
      name: "Hybrid Architecture",
      description: "Mix of cloud and on-premise with gradual migration",
      scores: {
        performance: 75,
        scalability: 70,
        cost: 85,
        complexity: 75,
        timeToMarket: 85,
      },
      pros: ["Lower risk", "Gradual transition", "Cost effective"],
      cons: ["Integration complexity", "Dual maintenance", "Limited scalability"],
    },
    {
      id: "monolith-plus",
      name: "Modular Monolith",
      description: "Well-structured monolith with clear module boundaries",
      scores: {
        performance: 80,
        scalability: 60,
        cost: 90,
        complexity: 85,
        timeToMarket: 95,
      },
      pros: ["Simple deployment", "Fast development", "Low operational overhead"],
      cons: ["Scaling limitations", "Technology constraints", "Team coordination"],
    },
  ]

  const tradeoffDimensions = [
    { name: "Performance", key: "performance", weight: 0.25 },
    { name: "Scalability", key: "scalability", weight: 0.2 },
    { name: "Cost", key: "cost", weight: 0.2 },
    { name: "Complexity", key: "complexity", weight: 0.15 },
    { name: "Time to Market", key: "timeToMarket", weight: 0.2 },
  ]

  const getScenarioScore = (scenario: any) => {
    return tradeoffDimensions.reduce((total, dim) => {
      return total + scenario.scores[dim.key] * dim.weight
    }, 0)
  }

  const selectedScenarioData = selectedScenario ? scenarios.find((s) => s.id === selectedScenario) : null

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
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
                Trade-offs Analysis
              </h1>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>
                Compare architecture scenarios and analyze trade-offs across key dimensions.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentModel && (
                <div
                  className="px-4 py-2 text-sm rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  Model: {currentModel.name}
                </div>
              )}
              <button
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                Export Analysis
              </button>
            </div>
          </div>

          {/* Trade-off Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-6 border-b" style={{ borderColor: "var(--border)" }}>
              {tradeoffTabs.map((tab) => {
                const isActive = activeTradeoffTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTradeoffTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      isActive ? "" : "border-transparent"
                    }`}
                    style={{
                      color: isActive ? "var(--blue-600)" : "var(--text-muted)",
                      borderBottomColor: isActive ? "var(--blue-600)" : "transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content Area */}
          {activeTradeoffTab === "scenarios" && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {scenarios.map((scenario) => {
                  const overallScore = Math.round(getScenarioScore(scenario))
                  const isSelected = selectedScenario === scenario.id

                  return (
                    <div
                      key={scenario.id}
                      className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                        isSelected ? "ring-2 ring-blue-500" : ""
                      }`}
                      style={{
                        backgroundColor: isSelected ? "var(--blue-50)" : "var(--surface)",
                        borderColor: isSelected ? "var(--blue-200)" : "var(--border)",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => setSelectedScenario(isSelected ? null : scenario.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                          {scenario.name}
                        </h3>
                        <div
                          className="px-3 py-1 text-sm font-medium rounded-full"
                          style={{
                            background:
                              overallScore >= 80
                                ? "var(--green-100)"
                                : overallScore >= 70
                                  ? "var(--yellow-100)"
                                  : "var(--red-100)",
                            color:
                              overallScore >= 80
                                ? "var(--green-800)"
                                : overallScore >= 70
                                  ? "var(--yellow-800)"
                                  : "var(--red-800)",
                          }}
                        >
                          {overallScore}/100
                        </div>
                      </div>

                      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                        {scenario.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {tradeoffDimensions.map((dim) => (
                          <div key={dim.key} className="flex items-center justify-between">
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {dim.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 rounded-full" style={{ backgroundColor: "var(--gray-200)" }}>
                                <div
                                  className="h-2 rounded-full"
                                  style={{
                                    width: `${scenario.scores[dim.key]}%`,
                                    background:
                                      scenario.scores[dim.key] >= 80
                                        ? "var(--green-500)"
                                        : scenario.scores[dim.key] >= 60
                                          ? "var(--yellow-500)"
                                          : "var(--red-500)",
                                  }}
                                />
                              </div>
                              <span className="text-xs font-medium w-8" style={{ color: "var(--text)" }}>
                                {scenario.scores[dim.key]}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-xs font-medium mb-2" style={{ color: "var(--green-700)" }}>
                            Pros
                          </h4>
                          <ul className="space-y-1">
                            {scenario.pros.slice(0, 2).map((pro, index) => (
                              <li
                                key={index}
                                className="text-xs flex items-start gap-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <span className="text-green-500 mt-0.5">+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium mb-2" style={{ color: "var(--red-700)" }}>
                            Cons
                          </h4>
                          <ul className="space-y-1">
                            {scenario.cons.slice(0, 2).map((con, index) => (
                              <li
                                key={index}
                                className="text-xs flex items-start gap-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <span className="text-red-500 mt-0.5">-</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {selectedScenarioData && (
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                    Detailed Analysis: {selectedScenarioData.name}
                  </h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                        Dimension Scores
                      </h4>
                      <div className="space-y-3">
                        {tradeoffDimensions.map((dim) => (
                          <div key={dim.key}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm" style={{ color: "var(--text)" }}>
                                {dim.name}
                              </span>
                              <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                                {selectedScenarioData.scores[dim.key]}/100
                              </span>
                            </div>
                            <div className="w-full h-3 rounded-full" style={{ backgroundColor: "var(--gray-200)" }}>
                              <div
                                className="h-3 rounded-full transition-all duration-300"
                                style={{
                                  width: `${selectedScenarioData.scores[dim.key]}%`,
                                  background:
                                    selectedScenarioData.scores[dim.key] >= 80
                                      ? "var(--green-500)"
                                      : selectedScenarioData.scores[dim.key] >= 60
                                        ? "var(--yellow-500)"
                                        : "var(--red-500)",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                        Comprehensive Assessment
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-sm font-medium mb-2" style={{ color: "var(--green-700)" }}>
                            Advantages
                          </h5>
                          <ul className="space-y-1">
                            {selectedScenarioData.pros.map((pro, index) => (
                              <li
                                key={index}
                                className="text-sm flex items-start gap-2"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <span className="text-green-500 mt-0.5">✓</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium mb-2" style={{ color: "var(--red-700)" }}>
                            Challenges
                          </h5>
                          <ul className="space-y-1">
                            {selectedScenarioData.cons.map((con, index) => (
                              <li
                                key={index}
                                className="text-sm flex items-start gap-2"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <span className="text-red-500 mt-0.5">⚠</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTradeoffTab === "matrices" && (
            <div>
              <div
                className="p-6 rounded-2xl border mb-6"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Trade-off Matrix
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-3 font-medium" style={{ color: "var(--text)" }}>
                          Scenario
                        </th>
                        {tradeoffDimensions.map((dim) => (
                          <th key={dim.key} className="text-center p-3 font-medium" style={{ color: "var(--text)" }}>
                            {dim.name}
                            <div className="text-xs font-normal" style={{ color: "var(--text-muted)" }}>
                              ({Math.round(dim.weight * 100)}%)
                            </div>
                          </th>
                        ))}
                        <th className="text-center p-3 font-medium" style={{ color: "var(--text)" }}>
                          Overall
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {scenarios.map((scenario, index) => (
                        <tr
                          key={scenario.id}
                          className={index % 2 === 0 ? "" : ""}
                          style={{
                            backgroundColor: index % 2 === 0 ? "transparent" : "var(--gray-50)",
                          }}
                        >
                          <td className="p-3 font-medium" style={{ color: "var(--text)" }}>
                            {scenario.name}
                          </td>
                          {tradeoffDimensions.map((dim) => (
                            <td key={dim.key} className="p-3 text-center">
                              <div
                                className="inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium"
                                style={{
                                  backgroundColor:
                                    scenario.scores[dim.key] >= 80
                                      ? "var(--green-100)"
                                      : scenario.scores[dim.key] >= 60
                                        ? "var(--yellow-100)"
                                        : "var(--red-100)",
                                  color:
                                    scenario.scores[dim.key] >= 80
                                      ? "var(--green-800)"
                                      : scenario.scores[dim.key] >= 60
                                        ? "var(--yellow-800)"
                                        : "var(--red-800)",
                                }}
                              >
                                {scenario.scores[dim.key]}
                              </div>
                            </td>
                          ))}
                          <td className="p-3 text-center">
                            <div
                              className="inline-flex items-center justify-center w-16 h-8 rounded font-medium text-sm"
                              style={{
                                backgroundColor:
                                  getScenarioScore(scenario) >= 80
                                    ? "var(--green-100)"
                                    : getScenarioScore(scenario) >= 70
                                      ? "var(--yellow-100)"
                                      : "var(--red-100)",
                                color:
                                  getScenarioScore(scenario) >= 80
                                    ? "var(--green-800)"
                                    : getScenarioScore(scenario) >= 70
                                      ? "var(--yellow-800)"
                                      : "var(--red-800)",
                              }}
                            >
                              {Math.round(getScenarioScore(scenario))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Dimension Weights
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Adjust the importance of each dimension to see how it affects the overall scoring.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tradeoffDimensions.map((dim) => (
                    <div
                      key={dim.key}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: "var(--bg)" }}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        {dim.name}
                      </span>
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {Math.round(dim.weight * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTradeoffTab === "recommendations" && (
            <div className="space-y-6">
              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <ChartBarIcon className="h-6 w-6" style={{ color: "var(--blue-600)" }} />
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Recommended Scenario
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div
                      className="p-4 rounded-xl mb-4"
                      style={{ backgroundColor: "var(--green-50)", border: "1px solid var(--green-200)" }}
                    >
                      <h4 className="font-semibold text-green-800 mb-2">Cloud-Native Architecture</h4>
                      <p className="text-sm text-green-700">
                        Based on your evidence and requirements, this scenario offers the best balance of scalability
                        and modern capabilities.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm" style={{ color: "var(--text)" }}>
                          Highest scalability score (95/100)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm" style={{ color: "var(--text)" }}>
                          Strong performance characteristics
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-sm" style={{ color: "var(--text)" }}>
                          Moderate complexity requires planning
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                      Implementation Roadmap
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                          style={{ background: "var(--blue-500)" }}
                        >
                          1
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Foundation Setup
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Container platform, CI/CD, monitoring
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                          style={{ background: "var(--blue-500)" }}
                        >
                          2
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Service Migration
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Gradual decomposition and migration
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                          style={{ background: "var(--blue-500)" }}
                        >
                          3
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Optimization
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Performance tuning and scaling
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Cog6ToothIcon className="h-6 w-6" style={{ color: "var(--orange-600)" }} />
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Risk Mitigation
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                      Key Risks
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Complexity Management
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Microservices complexity can impact development velocity
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Vendor Lock-in
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Cloud-specific services may limit portability
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                      Mitigation Strategies
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Gradual Migration
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Start with non-critical services to build expertise
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            Multi-Cloud Strategy
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Use cloud-agnostic tools and standards
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <DocumentTextIcon className="h-6 w-6" style={{ color: "var(--green-600)" }} />
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Next Steps
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--blue-50)" }}>
                    <h4 className="font-medium mb-2">Architecture Views</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Generate detailed architecture diagrams and documentation
                    </p>
                    <Link
                      href="/design/views"
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      View Diagrams
                    </Link>
                  </div>

                  <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--green-50)" }}>
                    <h4 className="font-medium text-green-800 mb-2">Documentation</h4>
                    <p className="text-sm text-green-700 mb-3">Export comprehensive architecture documentation</p>
                    <Link
                      href="/design/docs"
                      className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-green-600 text-white hover:bg-green-700 transition-colors"
                    >
                      Generate Docs
                    </Link>
                  </div>

                  <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--purple-50)" }}>
                    <h4 className="font-medium text-purple-800 mb-2">Implementation</h4>
                    <p className="text-sm text-purple-700 mb-3">Create implementation roadmap and project plan</p>
                    <button className="inline-flex items-center px-3 py-1 text-xs font-medium rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                      Plan Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
