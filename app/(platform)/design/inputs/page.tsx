"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  PlusIcon,
  LinkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline"
import { useICStore } from "@/lib/store"

const tabs = [
  { id: "overview", label: "Overview", href: "/design" },
  { id: "inputs", label: "Design Inputs", href: "/design/inputs" },
  { id: "tradeoffs", label: "Trade-offs", href: "/design/tradeoffs" },
  { id: "views", label: "Architecture Views", href: "/design/views" },
  { id: "docs", label: "Docs & Sync", href: "/design/docs" },
]

const secondaryTabs = [
  { id: "industry-processes", label: "Industry & Processes" },
  { id: "requirements", label: "Requirements & Constraints" },
  { id: "principles", label: "Principles & Guardrails" },
  { id: "non-functionals", label: "Non-functionals (Fitness)" },
]

const industryProcessTabs = [
  { id: "industries", label: "Industries" },
  { id: "processes", label: "Processes" },
]

const industries = [
  {
    id: "financial-services",
    name: "Financial Services",
    icon: "💰",
    description: "Banking, insurance, and financial technology solutions",
    stats: { kpis: 12, painPoints: 8, initiatives: 5 },
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    icon: "🏭",
    description: "Manufacturing, supply chain, and industrial operations",
    stats: { kpis: 15, painPoints: 12, initiatives: 7 },
  },
  {
    id: "retail",
    name: "Retail",
    icon: "🛍️",
    description: "Retail operations, e-commerce, and customer experience",
    stats: { kpis: 10, painPoints: 6, initiatives: 4 },
  },
]

const valueChains = [
  {
    key: "S2P",
    name: "Source to Pay",
    description: "Procurement, sourcing, and supplier management processes",
    stats: { kpis: 8, painPoints: 5, initiatives: 3, interviews: 2, fragments: 12 },
  },
  {
    key: "FIN",
    name: "Finance",
    description: "Financial planning, accounting, and reporting processes",
    stats: { kpis: 10, painPoints: 7, initiatives: 4, interviews: 3, fragments: 15 },
  },
  {
    key: "A2D",
    name: "Acquire to Decommission",
    description: "Asset lifecycle management and decommissioning",
    stats: { kpis: 6, painPoints: 4, initiatives: 2, interviews: 1, fragments: 8 },
  },
  {
    key: "I2M",
    name: "Idea to Market",
    description: "Product development and go-to-market processes",
    stats: { kpis: 12, painPoints: 9, initiatives: 6, interviews: 4, fragments: 18 },
  },
  {
    key: "R2R",
    name: "Recruit to Retire",
    description: "Human resources and employee lifecycle management",
    stats: { kpis: 9, painPoints: 6, initiatives: 3, interviews: 2, fragments: 11 },
  },
  {
    key: "L2C",
    name: "Lead to Cash",
    description: "Sales, marketing, and revenue generation processes",
    stats: { kpis: 14, painPoints: 10, initiatives: 7, interviews: 5, fragments: 20 },
  },
  {
    key: "P2F",
    name: "Plan to Fulfill",
    description: "Production planning and order fulfillment",
    stats: { kpis: 11, painPoints: 8, initiatives: 5, interviews: 3, fragments: 16 },
  },
  {
    key: "GOV",
    name: "Governance",
    description: "Risk management, compliance, and governance processes",
    stats: { kpis: 7, painPoints: 5, initiatives: 2, interviews: 1, fragments: 9 },
  },
]

export default function DesignInputsPage() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSecondaryTab, setActiveSecondaryTab] = useState("industry-processes")
  const [activeIndustryProcessTab, setActiveIndustryProcessTab] = useState("industries")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)
  const [showMappingTray, setShowMappingTray] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [mappingContext, setMappingContext] = useState({
    industry: "Financial Services",
    process: "Lead to Cash",
    lob: "Sales",
    capability: "Customer Management",
  })
  const [selectedEvidence, setSelectedEvidence] = useState<Record<string, string[]>>({
    kpis: [],
    painPoints: [],
    interviews: [],
    surveys: [],
    fragments: [],
    initiatives: [],
  })

  const {
    kpis,
    painPoints,
    interviews,
    surveys,
    northStarFragments,
    initiatives,
    designInputs,
    activeDesignInput,
    createDesignInput,
    mapEvidence,
    generateDesignModel,
  } = useICStore()

  const selectedIndustryData = selectedIndustry ? industries.find((i) => i.id === selectedIndustry) : null
  const selectedProcessData = selectedProcess ? valueChains.find((p) => p.key === selectedProcess) : null

  const toggleEvidence = (bucket: string, id: string) => {
    setSelectedEvidence((prev) => ({
      ...prev,
      [bucket]: prev[bucket].includes(id) ? prev[bucket].filter((item) => item !== id) : [...prev[bucket], id],
    }))
  }

  const handleSaveMapping = () => {
    // Create new design input
    const inputId = createDesignInput({
      industryId: selectedIndustry,
      processKey: selectedProcess as any,
      lob: mappingContext.lob,
      capabilityIds: [],
      kpiIds: [],
      painPointIds: [],
      interviewIds: [],
      surveyIds: [],
      fragmentIds: [],
      initiativeIds: [],
    })

    // Map all selected evidence
    Object.entries(selectedEvidence).forEach(([bucket, ids]) => {
      if (ids.length > 0) {
        mapEvidence({ inputId, bucket, ids })
      }
    })

    setShowMappingTray(false)
    // Show toast notification
    alert("Mapped to Design Inputs.")
  }

  const handleGenerateModels = async () => {
    if (!activeDesignInput && designInputs.length === 0) {
      alert("Please create a design input first by mapping evidence.")
      return
    }

    setIsGenerating(true)

    try {
      // Use active design input or the most recent one
      const inputToUse = activeDesignInput || designInputs[designInputs.length - 1]

      // Generate the model
      const model = generateDesignModel(inputToUse.id)

      // Navigate to trade-offs page to show the generated model
      router.push("/design/tradeoffs")

      // Show success message
      setTimeout(() => {
        alert(`Generated architecture model: ${model.name}`)
      }, 500)
    } catch (error) {
      alert("Failed to generate models. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

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
                Design Inputs
              </h1>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>
                Select industry & value chains, map evidence, then generate architecture.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMappingTray(true)}
                className="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                Open Mapping Tray
              </button>
              <button
                onClick={handleGenerateModels}
                disabled={isGenerating}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                {isGenerating ? "Generating..." : "Generate Models"}
              </button>
            </div>
          </div>

          {/* Secondary Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-6 border-b" style={{ borderColor: "var(--border)" }}>
              {secondaryTabs.map((tab) => {
                const isActive = activeSecondaryTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSecondaryTab(tab.id)}
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
          {activeSecondaryTab === "industry-processes" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4"
                      style={{ color: "var(--text-muted)" }}
                    />
                    <input
                      type="text"
                      placeholder="Search industries and processes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FunnelIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Filters:
                    </span>
                    {["Industry", "Process", "LoB", "Capability", "Regulatory"].map((filter) => (
                      <button
                        key={filter}
                        className="px-3 py-1 text-xs rounded-full border transition-colors hover:scale-[1.02]"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <nav className="flex space-x-6">
                  {industryProcessTabs.map((tab) => {
                    const isActive = activeIndustryProcessTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveIndustryProcessTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive ? "shadow-sm" : "hover:scale-[1.02]"
                        }`}
                        style={{
                          backgroundColor: isActive ? "var(--blue-50)" : "transparent",
                          color: isActive ? "var(--blue-800)" : "var(--text-muted)",
                          border: `1px solid ${isActive ? "var(--blue-200)" : "transparent"}`,
                        }}
                      >
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {activeIndustryProcessTab === "industries" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {industries.map((industry) => (
                    <div
                      key={industry.id}
                      className="p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => setSelectedIndustry(industry.id)}
                    >
                      <div className="text-3xl mb-3">{industry.icon}</div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                        {industry.name}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                        {industry.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                        <span>{industry.stats.kpis} KPIs</span>
                        <span>•</span>
                        <span>{industry.stats.painPoints} Pain Points</span>
                        <span>•</span>
                        <span>{industry.stats.initiatives} Initiatives</span>
                      </div>
                      <button
                        className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: "var(--grad-primary)",
                          color: "white",
                        }}
                      >
                        Open
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeIndustryProcessTab === "processes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {valueChains.map((process) => (
                    <div
                      key={process.key}
                      className="p-6 rounded-2xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => setSelectedProcess(process.key)}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className="px-2 py-1 text-xs font-medium rounded"
                          style={{
                            background: "var(--grad-accent-a)",
                            color: "white",
                          }}
                        >
                          {process.key}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                        {process.name}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                        {process.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                        <span>{process.stats.kpis} KPIs</span>
                        <span>{process.stats.painPoints} Pain Points</span>
                        <span>{process.stats.initiatives} Initiatives</span>
                        <span>{process.stats.interviews} Interviews</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="flex-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            background: "var(--grad-primary)",
                            color: "white",
                          }}
                        >
                          Use in design
                        </button>
                        <button
                          className="px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-[1.02]"
                          style={{
                            backgroundColor: "var(--surface)",
                            borderColor: "var(--border)",
                            color: "var(--text)",
                          }}
                        >
                          Map evidence
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSecondaryTab !== "industry-processes" && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                  {secondaryTabs.find((t) => t.id === activeSecondaryTab)?.label}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Coming soon - this section will be populated from Intelligence Cortex data.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedIndustryData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedIndustryData.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                      {selectedIndustryData.name}
                    </h2>
                    <div
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full mt-2"
                      style={{
                        background: "var(--grad-accent-b)",
                        color: "white",
                      }}
                    >
                      Value Chains
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIndustry(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" style={{ color: "var(--text)" }} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {valueChains.map((process) => (
                  <div
                    key={process.key}
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="px-2 py-1 text-xs font-medium rounded"
                        style={{
                          background: "var(--grad-accent-a)",
                          color: "white",
                        }}
                      >
                        {process.key}
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                      {process.name}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                      {process.description}
                    </p>
                    <div className="grid grid-cols-2 gap-1 text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                      <span>{process.stats.kpis} KPIs</span>
                      <span>{process.stats.painPoints} Pain Points</span>
                      <span>{process.stats.initiatives} Initiatives</span>
                      <span>{process.stats.fragments} Fragments</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 px-3 py-1 text-xs font-medium rounded transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          background: "var(--grad-primary)",
                          color: "white",
                        }}
                      >
                        Use in design
                      </button>
                      <button
                        className="px-3 py-1 text-xs font-medium rounded border transition-all duration-200 hover:scale-[1.02]"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                        }}
                      >
                        Map evidence
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedProcessData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="px-3 py-1 text-sm font-medium rounded"
                      style={{
                        background: "var(--grad-accent-a)",
                        color: "white",
                      }}
                    >
                      {selectedProcessData.key}
                    </div>
                    <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                      {selectedProcessData.name}
                    </h2>
                  </div>
                  <p className="text-base" style={{ color: "var(--text-muted)" }}>
                    {selectedProcessData.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProcess(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" style={{ color: "var(--text)" }} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                    Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        Canonical KPIs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Cycle Time", "Cost per Transaction", "Error Rate", "Throughput"].map((kpi) => (
                          <span
                            key={kpi}
                            className="px-2 py-1 text-xs rounded"
                            style={{
                              backgroundColor: "var(--blue-50)",
                              color: "var(--blue-800)",
                            }}
                          >
                            {kpi}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        Common Pain Points
                      </h4>
                      <div className="space-y-2">
                        {["Manual processes", "Data silos", "Compliance gaps"].map((pain) => (
                          <div key={pain} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-400" />
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                              {pain}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        background: "var(--grad-primary)",
                        color: "white",
                      }}
                    >
                      Add to design
                    </button>
                    <button
                      className="px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-[1.02]"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      Map evidence
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                    Architecture Hints
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        Starter Components
                      </h4>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        API Gateway, Event Bus, Data Lake, Analytics Engine
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        Integration Touchpoints
                      </h4>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        ERP, CRM, Financial Systems, Compliance Platforms
                      </p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                      <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        Compliance Flags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["SOX", "GDPR", "PCI-DSS"].map((flag) => (
                          <span
                            key={flag}
                            className="px-2 py-1 text-xs rounded"
                            style={{
                              backgroundColor: "var(--orange-50)",
                              color: "var(--orange-800)",
                            }}
                          >
                            {flag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showMappingTray && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div
            className="w-full max-w-7xl max-h-[80vh] overflow-y-auto rounded-t-2xl"
            style={{ backgroundColor: "var(--bg)" }}
          >
            {/* Context Banner */}
            <div
              className="sticky top-0 p-6 border-b"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                background: "var(--grad-accent-b)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Industry:</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                      {mappingContext.industry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Process:</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                      {mappingContext.process}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">LoB:</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                      {mappingContext.lob}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Capability:</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                      {mappingContext.capability}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowMappingTray(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Evidence Buckets */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* KPIs Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        KPIs
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--blue-50)",
                          color: "var(--blue-800)",
                        }}
                      >
                        {selectedEvidence.kpis.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {kpis.map((kpi) => (
                      <div
                        key={kpi.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.kpis.includes(kpi.id) ? "ring-2 ring-blue-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.kpis.includes(kpi.id) ? "var(--blue-50)" : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("kpis", kpi.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {kpi.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {kpi.unit} • Target: {kpi.target}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pain Points Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        Pain Points
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--red-50)",
                          color: "var(--red-800)",
                        }}
                      >
                        {selectedEvidence.painPoints.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {painPoints.map((pain) => (
                      <div
                        key={pain.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.painPoints.includes(pain.id) ? "ring-2 ring-red-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.painPoints.includes(pain.id)
                            ? "var(--red-50)"
                            : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("painPoints", pain.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {pain.title}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {pain.impact} impact • {pain.area}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interviews Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        Interviews
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--green-50)",
                          color: "var(--green-800)",
                        }}
                      >
                        {selectedEvidence.interviews.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {interviews.map((interview) => (
                      <div
                        key={interview.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.interviews.includes(interview.id) ? "ring-2 ring-green-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.interviews.includes(interview.id)
                            ? "var(--green-50)"
                            : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("interviews", interview.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {interview.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {interview.role} • {interview.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surveys Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        Surveys
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--purple-50)",
                          color: "var(--purple-800)",
                        }}
                      >
                        {selectedEvidence.surveys.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {surveys.map((survey) => (
                      <div
                        key={survey.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.surveys.includes(survey.id) ? "ring-2 ring-purple-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.surveys.includes(survey.id)
                            ? "var(--purple-50)"
                            : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("surveys", survey.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {survey.name}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {survey.status} • {survey.audience.join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* North Star Fragments Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        North Star Fragments
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--yellow-50)",
                          color: "var(--yellow-800)",
                        }}
                      >
                        {selectedEvidence.fragments.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {northStarFragments.map((fragment) => (
                      <div
                        key={fragment.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.fragments.includes(fragment.id) ? "ring-2 ring-yellow-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.fragments.includes(fragment.id)
                            ? "var(--yellow-50)"
                            : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("fragments", fragment.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {fragment.title}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {fragment.lens} • {fragment.horizon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Initiatives Bucket */}
                <div
                  className="p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        Initiatives
                      </h3>
                      <span
                        className="px-2 py-1 text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: "var(--indigo-50)",
                          color: "var(--indigo-800)",
                        }}
                      >
                        {selectedEvidence.initiatives.length}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1 rounded hover:bg-gray-100">
                        <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <LinkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <SparklesIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {initiatives.map((initiative) => (
                      <div
                        key={initiative.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedEvidence.initiatives.includes(initiative.id) ? "ring-2 ring-indigo-500" : ""
                        }`}
                        style={{
                          backgroundColor: selectedEvidence.initiatives.includes(initiative.id)
                            ? "var(--indigo-50)"
                            : "var(--bg)",
                          borderColor: "var(--border)",
                        }}
                        onClick={() => toggleEvidence("initiatives", initiative.id)}
                      >
                        <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                          {initiative.title}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                          {initiative.type} • {initiative.priority} priority
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowMappingTray(false)}
                    className="px-6 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMapping}
                    className="px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "var(--grad-primary)",
                      color: "white",
                    }}
                  >
                    Save Mapping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
