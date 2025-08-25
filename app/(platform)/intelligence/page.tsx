"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Gauge,
  LineChart,
  Rocket,
  Presentation,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  BarChart3,
  Settings,
  Lightbulb,
} from "lucide-react"
import { useICStore } from "@/lib/store"
import { toast } from "sonner"

// Import content components
import KPICatalogContent from "./components/KPICatalogContent"
import KnowYourBusinessContent from "./components/KnowYourBusinessContent"
import TwoSpeedContent from "./components/TwoSpeedContent"
import SummaryContent from "./components/SummaryContent"

const tabs = [
  { id: "kpis", label: "KPI Catalog", icon: Gauge },
  { id: "kyb", label: "Know Your Business", icon: LineChart },
  { id: "two-speed-transformation", label: "Two-Speed Transformation", icon: Rocket },
  { id: "requirements", label: "Requirements", icon: Settings },
  { id: "summary", label: "Summary", icon: Presentation },
]

const twoSpeedSubTabs = [
  { id: "industry-trends", label: "Industry Trends", icon: TrendingUp },
  { id: "pain-point-canvas", label: "Pain Point Canvas", icon: Target },
  { id: "strategic-initiatives", label: "Strategic Initiatives", icon: Zap },
  { id: "solution-canvas", label: "Solution Canvas", icon: Lightbulb },
]

export default function IntelligencePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("kpis")
  const [activeSubTab, setActiveSubTab] = useState("industry-trends")
  const [clientName, setClientName] = useState("")
  const [industry, setIndustry] = useState("")
  const [isRunning, setIsRunning] = useState(false)

  const { kpis, painPoints, initiatives, readiness, runAgent } = useICStore()

  useEffect(() => {
    const tab = searchParams.get("tab") || "kpis"
    const subTab = searchParams.get("sub") || "industry-trends"

    const normalizedTab = tab === "two-speed" ? "two-speed-transformation" : tab

    if (tabs.some((t) => t.id === normalizedTab)) {
      setActiveTab(normalizedTab)
    }

    if (twoSpeedSubTabs.some((t) => t.id === subTab)) {
      setActiveSubTab(subTab)
    }
  }, [searchParams])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const params = new URLSearchParams()
    params.set("tab", tabId)
    if (tabId === "two-speed-transformation" && activeSubTab) {
      params.set("sub", activeSubTab)
    }
    router.push(`/intelligence?${params.toString()}`)
  }

  const handleSubTabChange = (subTabId: string) => {
    setActiveSubTab(subTabId)
    const params = new URLSearchParams()
    params.set("tab", "two-speed-transformation")
    params.set("sub", subTabId)
    router.push(`/intelligence?${params.toString()}`)
  }

  const handleRunAgent = async () => {
    if (!industry) return

    setIsRunning(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    runAgent(industry)
    toast.success("Agent suggestions added.")
    setIsRunning(false)
  }

  const getBadgeCount = (tabId: string) => {
    switch (tabId) {
      case "kpis":
        return kpis.length
      case "kyb":
        return kpis.filter((k) => k.current !== undefined).length
      case "two-speed-transformation":
        return painPoints.length + initiatives.length
      case "summary":
        return Math.round(readiness)
      default:
        return 0
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "kpis":
        return <KPICatalogContent />
      case "kyb":
        return <KnowYourBusinessContent />
      case "two-speed-transformation":
        return <TwoSpeedContent activeSubTab={activeSubTab} />
      case "requirements":
        return <RequirementsContent />
      case "summary":
        return <SummaryContent />
      default:
        return <KPICatalogContent />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: "var(--ai-royal)" }}>
          Discovery
        </h1>
        <p className="text-lg font-medium" style={{ color: "var(--brand-navy-900)" }}>
          Discovery, KPIs, and strategy—then auto-generate your Vision pack.
        </p>
      </div>

      <div className="runbar" style={{ marginBottom: "24px" }}>
        <input
          type="text"
          placeholder="Enter client (optional)"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="px-3 py-2 border-0 bg-transparent focus:outline-none focus:ring-2 rounded-lg"
          style={{
            focusRingColor: "var(--focus-brand)",
            color: "var(--text-primary)",
          }}
        />
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="px-3 py-2 border-0 bg-transparent focus:outline-none focus:ring-2 rounded-lg"
          style={{
            focusRingColor: "var(--focus-brand)",
            color: "var(--text-primary)",
          }}
        >
          <option value="">Select or auto-detect</option>
          <option value="financial-services">Financial Services</option>
          <option value="healthcare">Healthcare</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="retail">Retail</option>
          <option value="technology">Technology</option>
        </select>
        <button
          onClick={handleRunAgent}
          disabled={!industry || isRunning}
          className="primary-btn flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          {isRunning ? "Running..." : "Run Agent"}
        </button>
      </div>

      <div
        className="grid grid-cols-4 w-full gap-3 md:grid-cols-4 sm:grid-cols-2 sm:overflow-x-auto sm:snap-x sm:snap-mandatory"
        role="tablist"
        aria-label="Intelligence Cortex sections"
        style={{ marginBottom: "24px" }}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const badgeCount = getBadgeCount(tab.id)

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`premium-tab sm:snap-start sm:flex-shrink-0 sm:min-w-0 ${isActive ? "active" : ""}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="tab-text truncate">{tab.label}</span>
              {badgeCount > 0 && <span className="tab-badge">{badgeCount}</span>}
            </button>
          )
        })}
      </div>

      {activeTab === "two-speed-transformation" && (
        <div
          className="grid grid-cols-4 w-full gap-3 md:grid-cols-4 sm:grid-cols-2 sm:overflow-x-auto sm:snap-x sm:snap-mandatory"
          role="tablist"
          aria-label="Two-Speed Transformation sections"
          style={{ marginBottom: "24px" }}
        >
          {twoSpeedSubTabs.map((subTab) => {
            const Icon = subTab.icon
            const isActive = activeSubTab === subTab.id

            return (
              <button
                key={subTab.id}
                onClick={() => handleSubTabChange(subTab.id)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`sub-panel-${subTab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={`premium-tab sm:snap-start sm:flex-shrink-0 sm:min-w-0 ${isActive ? "active" : ""}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="tab-text truncate">{subTab.label}</span>
              </button>
            )
          })}
        </div>
      )}

      <div
        className="transition-all duration-200"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </div>
  )
}

const RequirementsContent = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Requirements Gathering
        </h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Discovery, KPIs, and strategy—then auto-generate your Vision pack
        </p>
      </div>

      <div className="space-y-6">
        {/* Run Agent Section */}
        <div className="flex justify-between items-center p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
          <div>
            <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
              Run Agent
            </h3>
            <p style={{ color: "var(--text-muted)" }}>
              Automate requirements gathering and analysis
            </p>
          </div>
          <button
            className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: "var(--grad-primary)" }}
          >
            Run Agent
          </button>
        </div>

        {/* Requirements Gathering Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Surveys */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
              Surveys (Native)
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Design → Distribute → Analyze & Map
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Build custom surveys with AI assistance for comprehensive requirements gathering
            </p>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Responses:</span>
              <span style={{ color: "var(--text)" }}>3</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Completion:</span>
              <span style={{ color: "var(--text)" }}>127</span>
            </div>
          </div>

          {/* Executive Interviews */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
              Executive Interviews
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Prepare → Run → Summarize → Synthesize
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              4-step workspace for conducting structured executive interviews
            </p>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Interviews:</span>
              <span style={{ color: "var(--text)" }}>12/20</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Coverage:</span>
              <span style={{ color: "var(--text)" }}>4/5</span>
            </div>
          </div>

          {/* Stakeholder Mapping */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
              Stakeholder Mapping
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              RACI + Influence Analysis
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Agent proposes stakeholders and maps their roles and influence
            </p>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Stakeholders:</span>
              <span style={{ color: "var(--text)" }}>18</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Coverage:</span>
              <span style={{ color: "var(--text)" }}>92%</span>
            </div>
          </div>

          {/* Workshop Mode */}
          <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
            <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
              Workshop Mode
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              North Star Board
            </p>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Premium sticky-wall experience for collaborative requirements workshops
            </p>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Workshops:</span>
              <span style={{ color: "var(--text)" }}>24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-muted)" }}>Success:</span>
              <span style={{ color: "var(--text)" }}>85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
