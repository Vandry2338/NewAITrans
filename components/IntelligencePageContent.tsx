"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Gauge, LineChart, Rocket, Presentation, Sparkles, TrendingUp, Target, Zap, Settings, Users, Grid3X3, BarChart3 } from "lucide-react"
import { useICStore } from "@/lib/store"
import { toast } from "sonner"

// Import content components - TEMPORARILY COMMENTED OUT DUE TO MISSING COMPONENTS
// import KPICatalogContent from "../app/intelligence/components/KPICatalogContent"
// import KnowYourBusinessContent from "../app/intelligence/components/KnowYourBusinessContent"
// import RequirementsGatheringContent from "../app/intelligence/components/RequirementsGatheringContent"
// import TwoSpeedContent from "../app/intelligence/components/TwoSpeedContent"
// import SummaryContent from "../app/intelligence/components/SummaryContent"

const tabs = [
  { id: "kpis", label: "KPI Catalog", icon: Gauge },
  { id: "kyb", label: "Know Your Business", icon: LineChart },
  { id: "two-speed-transformation", label: "Two-Speed Transformation", icon: Rocket },
  { id: "requirements-gathering", label: "Requirements Gathering", icon: Settings },
  { id: "summary", label: "Summary", icon: Presentation },
]

const twoSpeedSubTabs = [
  { id: "industry-trends", label: "Industry Trends", icon: TrendingUp },
  { id: "pain-point-canvas", label: "Pain Point Canvas", icon: Target },
  { id: "strategic-initiatives", label: "Strategic Initiatives", icon: Zap },
  { id: "solution-canvas", label: "Customer Canvas", icon: Grid3X3 },
  { id: "persona-journey", label: "Solution Canvas", icon: Users },
]

export default function IntelligencePageContent() {
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

    console.log("URL params:", { tab, subTab, normalizedTab })
    console.log("Current state:", { activeTab, activeSubTab })
    console.log("Available tabs:", tabs.map(t => t.id))
    console.log("Available twoSpeedSubTabs:", twoSpeedSubTabs.map(t => t.id))

    if (tabs.some((t) => t.id === normalizedTab)) {
      setActiveTab(normalizedTab)
      console.log("Set activeTab to:", normalizedTab)
    } else {
      console.log("Tab not found in available tabs:", normalizedTab)
    }

    if (twoSpeedSubTabs.some((t) => t.id === subTab)) {
      setActiveSubTab(subTab)
      console.log("Set activeSubTab to:", subTab)
    } else {
      console.log("SubTab not found in available twoSpeedSubTabs:", subTab)
    }
  }, [searchParams])

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    const params = new URLSearchParams()
    params.set("tab", tabId)
    if (tabId === "two-speed-transformation") {
      // Preserve existing sub parameter or default to industry-trends
      const currentSub = searchParams.get("sub") || "industry-trends"
      params.set("sub", currentSub)
      setActiveSubTab(currentSub)
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
    console.log("renderContent called with:", { activeTab, activeSubTab })
    console.log("URL search params:", searchParams.toString())
    
    switch (activeTab) {
          case "kpis":
      console.log("Rendering KPICatalogContent")
      return <div className="p-6 text-center">KPI Catalog Content - Component Missing</div>
    case "kyb":
      console.log("Rendering KnowYourBusinessContent")
      return <div className="p-6 text-center">Know Your Business Content - Component Missing</div>
    case "requirements-gathering":
      console.log("Rendering RequirementsGatheringContent")
      return <div className="p-6 text-center">Requirements Gathering Content - Component Missing</div>
    case "two-speed-transformation":
      console.log("Rendering TwoSpeedContent with activeSubTab:", activeSubTab)
      console.log("TwoSpeedContent will receive activeSubTab:", activeSubTab)
      return <div className="p-6 text-center">Two Speed Content - Component Missing (SubTab: {activeSubTab})</div>
    case "summary":
      console.log("Rendering SummaryContent")
      return <div className="p-6 text-center">Summary Content - Component Missing</div>
    default:
      console.log("Rendering default KPICatalogContent")
      return <div className="p-6 text-center">Default Content - Component Missing</div>
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Main Container with proper spacing */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4" style={{ color: "#0070f3", fontFamily: '"72", sans-serif' }}>
            Discovery
          </h1>
          <p className="text-xl text-gray-600" style={{ fontFamily: '"72", sans-serif' }}>
            Discovery, KPIs, and strategy—then auto-generate your Vision pack.
          </p>
        </div>

        {/* Run Bar Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Enter client (optional)"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 max-w-xs"
            />
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 max-w-xs"
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {isRunning ? "Running..." : "Run Agent"}
            </button>
          </div>
        </div>

        {/* Main Tabs Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div
            className="tab-grid"
            role="tablist"
            aria-label="Intelligence Cortex sections"
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
        </div>

        {/* Sub Tabs Section */}
        {activeTab === "two-speed-transformation" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div
              className="sub-tab-grid"
              role="tablist"
              aria-label="Two-Speed Transformation sections"
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
          </div>
        )}

        {/* Content Section */}
        <div
          className="transition-all duration-200"
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
