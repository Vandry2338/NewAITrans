"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDownIcon, ChevronRightIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline"

// Mock data
const mockStakeholders = [
  { name: "Sarah Chen", role: "CTO", goals: ["Digital transformation", "Cost reduction"] },
  { name: "Michael Rodriguez", role: "VP Operations", goals: ["Process efficiency", "Quality improvement"] },
  { name: "Lisa Thompson", role: "Head of Customer Success", goals: ["Customer satisfaction", "Retention"] },
]

const mockRequirements = [
  {
    id: "REQ-001",
    text: "System must integrate with existing CRM platform",
    type: "Functional",
    source: "Pain Point: Legacy System Integration",
    priority: "H",
  },
  {
    id: "REQ-002",
    text: "Response time must be under 2 seconds for all API calls",
    type: "Non-Functional",
    source: "KPI: System Performance",
    priority: "H",
  },
  {
    id: "REQ-003",
    text: "Support automated data validation and cleansing",
    type: "Functional",
    source: "Pain Point: Manual Data Entry",
    priority: "M",
  },
]

const mockPrinciples = [
  {
    category: "Security",
    name: "Zero Trust Architecture",
    rationale: "Assume breach and verify every transaction",
    implications: ["Multi-factor authentication", "Encrypted data at rest and in transit"],
  },
  {
    category: "Data",
    name: "Single Source of Truth",
    rationale: "Eliminate data silos and inconsistencies",
    implications: ["Centralized data lake", "Real-time synchronization"],
  },
  {
    category: "Integration",
    name: "API-First Design",
    rationale: "Enable seamless system integration and future flexibility",
    implications: ["RESTful APIs", "Event-driven architecture"],
  },
  {
    category: "Operability",
    name: "Observability by Design",
    rationale: "Built-in monitoring and alerting for proactive management",
    implications: ["Distributed tracing", "Automated health checks"],
  },
]

const mockRoadmapThemes = {
  fastLane: [
    { name: "AI Chatbot Pilot", timeline: "Q1 2024", impact: "Customer Experience" },
    { name: "Process Automation POC", timeline: "Q2 2024", impact: "Operational Efficiency" },
  ],
  core: [
    { name: "Legacy System Migration", timeline: "Q2-Q4 2024", impact: "Technical Debt Reduction" },
    { name: "Data Platform Modernization", timeline: "Q3 2024-Q1 2025", impact: "Analytics Capability" },
  ],
}

export default function SummaryPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["challenge-analysis"])
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const generateVisionPack = () => {
    setIsGeneratingPDF(true)
    // Stub: In real implementation, this would generate and download PDF
    setTimeout(() => {
      console.log("Vision Pack PDF generated (stub)")
      setIsGeneratingPDF(false)
      // Create a mock download
      const link = document.createElement("a")
      link.href = "#"
      link.download = "vision-pack-acme-corp.pdf"
      link.click()
    }, 2000)
  }

  const renderCollapsibleSection = (id: string, title: string, content: React.ReactNode, defaultExpanded = false) => {
    const isExpanded = expandedSections.includes(id)

    return (
      <div
        className="border rounded-xl overflow-hidden"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-opacity-50 transition-colors"
          style={{ backgroundColor: "var(--blue-50)" }}
        >
          <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
            {title}
          </h2>
          {isExpanded ? (
            <ChevronDownIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
          ) : (
            <ChevronRightIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
          )}
        </button>
        {isExpanded && <div className="px-6 pb-6">{content}</div>}
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              Discovery Summary
            </h1>
            <div className="flex gap-2">
              <span
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
              >
                Acme Corp
              </span>
              <span
                className="px-3 py-1 text-sm font-medium rounded-full"
                style={{ backgroundColor: "var(--green-100)", color: "var(--green-700)" }}
              >
                Financial Services
              </span>
            </div>
          </div>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Challenge analysis & Vision readiness
          </p>
        </div>

        <div className="space-y-6">
          {/* Challenge Analysis */}
          {renderCollapsibleSection(
            "challenge-analysis",
            "Challenge Analysis",
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Distribution Bars */}
              <div>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Priority Distribution by Function
                </h3>
                <div className="space-y-3">
                  {[
                    { function: "IT", high: 60, medium: 30, low: 10 },
                    { function: "Operations", high: 40, medium: 45, low: 15 },
                    { function: "Sales", high: 25, medium: 50, low: 25 },
                    { function: "Finance", high: 35, medium: 40, low: 25 },
                  ].map((item) => (
                    <div key={item.function} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "var(--text)" }}>{item.function}</span>
                        <span style={{ color: "var(--text-muted)" }}>{item.high + item.medium + item.low} items</span>
                      </div>
                      <div
                        className="flex h-4 rounded-full overflow-hidden"
                        style={{ backgroundColor: "var(--border)" }}
                      >
                        <div className="bg-red-500" style={{ width: `${item.high}%` }} />
                        <div className="bg-orange-500" style={{ width: `${item.medium}%` }} />
                        <div className="bg-green-500" style={{ width: `${item.low}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar Chart Placeholder */}
              <div>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Priority Impact Radar
                </h3>
                <div
                  className="h-64 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg)" }}
                >
                  <div className="text-center" style={{ color: "var(--text-muted)" }}>
                    <div className="w-32 h-32 rounded-full border-4 border-dashed mx-auto mb-4" />
                    <p>Radar visualization</p>
                    <p className="text-sm">(Implementation placeholder)</p>
                  </div>
                </div>
              </div>
            </div>,
            true,
          )}

          {/* Stakeholders & Goals */}
          {renderCollapsibleSection(
            "stakeholders",
            "Stakeholders & Goals",
            <div className="space-y-4">
              {mockStakeholders.map((stakeholder, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold" style={{ color: "var(--text)" }}>
                      {stakeholder.name}
                    </h4>
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
                    >
                      {stakeholder.role}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {stakeholder.goals.map((goal, goalIndex) => (
                      <span
                        key={goalIndex}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{ backgroundColor: "var(--green-100)", color: "var(--green-700)" }}
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>,
          )}

          {/* Requirements Catalog */}
          {renderCollapsibleSection(
            "requirements",
            "Requirements Catalog (Seed)",
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    <th className="text-left py-3 font-semibold" style={{ color: "var(--text)" }}>
                      ID
                    </th>
                    <th className="text-left py-3 font-semibold" style={{ color: "var(--text)" }}>
                      Requirement
                    </th>
                    <th className="text-left py-3 font-semibold" style={{ color: "var(--text)" }}>
                      Type
                    </th>
                    <th className="text-left py-3 font-semibold" style={{ color: "var(--text)" }}>
                      Source
                    </th>
                    <th className="text-left py-3 font-semibold" style={{ color: "var(--text)" }}>
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockRequirements.map((req) => (
                    <tr key={req.id} className="border-b" style={{ borderColor: "var(--border)" }}>
                      <td className="py-3 font-mono text-xs" style={{ color: "var(--blue-600)" }}>
                        {req.id}
                      </td>
                      <td className="py-3" style={{ color: "var(--text)" }}>
                        {req.text}
                      </td>
                      <td className="py-3">
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: req.type === "Functional" ? "var(--blue-100)" : "var(--purple-100)",
                            color: req.type === "Functional" ? "var(--blue-700)" : "var(--purple-700)",
                          }}
                        >
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                        {req.source}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            req.priority === "H"
                              ? "bg-red-100 text-red-700"
                              : req.priority === "M"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {req.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>,
          )}

          {/* Architecture Principles */}
          {renderCollapsibleSection(
            "principles",
            "Architecture Principles (Draft)",
            <div className="space-y-6">
              {mockPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
                    >
                      {principle.category}
                    </span>
                    <h4 className="font-semibold" style={{ color: "var(--text)" }}>
                      {principle.name}
                    </h4>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {principle.rationale}
                  </p>
                  <div className="space-y-1">
                    <div className="text-xs font-medium" style={{ color: "var(--text)" }}>
                      Implications:
                    </div>
                    <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                      {principle.implications.map((implication, impIndex) => (
                        <li key={impIndex} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--text-muted)" }} />
                          {implication}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>,
          )}

          {/* Two-Speed Roadmap Themes */}
          {renderCollapsibleSection(
            "roadmap",
            "Two-Speed Roadmap Themes",
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-orange-600">Fast Lane (Experiments)</h3>
                <div className="space-y-3">
                  {mockRoadmapThemes.fastLane.map((theme, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border"
                      style={{ backgroundColor: "var(--orange-50)", borderColor: "var(--orange-200)" }}
                    >
                      <h4 className="font-medium mb-1" style={{ color: "var(--text)" }}>
                        {theme.name}
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "var(--text-muted)" }}>{theme.timeline}</span>
                        <span style={{ color: "var(--orange-600)" }}>{theme.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Core (Clean, Scalable)</h3>
                <div className="space-y-3">
                  {mockRoadmapThemes.core.map((theme, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border"
                      style={{ backgroundColor: "var(--blue-50)", borderColor: "var(--blue-200)" }}
                    >
                      <h4 className="font-medium mb-1" style={{ color: "var(--text)" }}>
                        {theme.name}
                      </h4>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "var(--text-muted)" }}>{theme.timeline}</span>
                        <span style={{ color: "var(--blue-600)" }}>{theme.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>,
          )}
        </div>

        {/* Generate Vision Pack CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={generateVisionPack}
            disabled={isGeneratingPDF}
            className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center gap-3 mx-auto ${
              isGeneratingPDF ? "opacity-50 cursor-not-allowed" : "hover:opacity-90 shadow-lg"
            }`}
            style={{
              background: "var(--grad-primary)",
              color: "white",
            }}
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            {isGeneratingPDF ? "Generating Vision Pack..." : "Generate Vision Pack"}
          </button>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            Download a comprehensive PDF summary with print-ready formatting
          </p>
        </div>
      </div>
    </div>
  )
}
