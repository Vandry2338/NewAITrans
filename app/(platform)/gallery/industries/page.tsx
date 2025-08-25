"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline"

interface FilterState {
  businessProcess: string[]
  lineOfBusiness: string[]
  capabilityLevel: { l1: string; l2: string }
  assetType: string[]
  cloudTech: string[]
  aiData: string[]
  status: string
  region: string
}

const businessProcesses = [
  { key: "S2P", name: "Source to Pay", tooltip: "End-to-end procurement process from sourcing to payment" },
  { key: "FIN", name: "Finance", tooltip: "Financial planning, reporting, and management processes" },
  { key: "A2D", name: "Acquire to Decommission", tooltip: "Asset lifecycle management from acquisition to disposal" },
  { key: "I2M", name: "Idea to Market", tooltip: "Product development from concept to market launch" },
  { key: "R2R", name: "Recruit to Retire", tooltip: "Human resources processes from hiring to retirement" },
  { key: "L2C", name: "Lead to Cash", tooltip: "Sales process from lead generation to cash collection" },
  { key: "P2F", name: "Plan to Fulfill", tooltip: "Supply chain planning and fulfillment processes" },
  { key: "GOV", name: "Governance", tooltip: "Risk management, compliance, and governance processes" },
]

const lineOfBusinessOptions = [
  "Finance",
  "Supply Chain",
  "HR",
  "Sales/Service",
  "Manufacturing",
  "IT",
  "Legal",
  "Marketing",
]
const assetTypeOptions = ["Reference Models", "Patterns", "Accelerators", "Demos"]
const cloudTechOptions = ["SAP BTP", "S/4HANA", "Ariba", "Signavio", "Azure", "AWS", "GCP", "Kubernetes"]
const aiDataOptions = ["LLM", "RAG", "Analytics", "MDM", "Eventing", "Machine Learning", "Data Lake"]
const statusOptions = ["GA", "Preview", "Draft"]
const regionOptions = ["Global", "North America", "Europe", "Asia Pacific", "Latin America"]

const sampleIndustries = [
  {
    id: "ind_high-tech",
    name: "High Tech",
    slug: "high-tech",
    description: "Software, hardware, and technology services companies driving digital transformation.",
    icon: "HT",
    stats: { kpis: 24, painPoints: 18, initiatives: 12, references: 8 },
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "ind_banking",
    name: "Banking",
    slug: "banking",
    description: "Financial institutions providing banking services, lending, and wealth management.",
    icon: "BK",
    stats: { kpis: 32, painPoints: 22, initiatives: 15, references: 12 },
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "ind_industrial-mfg",
    name: "Industrial Manufacturing",
    slug: "industrial-manufacturing",
    description: "Manufacturing companies producing industrial equipment, machinery, and components.",
    icon: "IM",
    stats: { kpis: 28, painPoints: 25, initiatives: 18, references: 10 },
    color: "from-orange-500 to-red-600",
  },
  {
    id: "ind_automotive",
    name: "Automotive",
    slug: "automotive",
    description: "Vehicle manufacturers and automotive suppliers focusing on mobility solutions.",
    icon: "AU",
    stats: { kpis: 26, painPoints: 20, initiatives: 14, references: 9 },
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "ind_lifesciences-health",
    name: "Life Sciences & Healthcare",
    slug: "lifesciences-healthcare",
    description: "Pharmaceutical, biotech, and healthcare organizations improving patient outcomes.",
    icon: "LS",
    stats: { kpis: 30, painPoints: 24, initiatives: 16, references: 11 },
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: "ind_consumer-products",
    name: "Consumer Products",
    slug: "consumer-products",
    description: "Companies manufacturing and distributing consumer goods and retail products.",
    icon: "CP",
    stats: { kpis: 22, painPoints: 16, initiatives: 11, references: 7 },
    color: "from-yellow-500 to-orange-600",
  },
]

export default function IndustriesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [selectedIndustry, setSelectedIndustry] = useState<(typeof sampleIndustries)[0] | null>(null)
  const [highlightedIndustry, setHighlightedIndustry] = useState<string | null>(null)
  const [showPresetCallout, setShowPresetCallout] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    businessProcess: [],
    lineOfBusiness: [],
    capabilityLevel: { l1: "", l2: "" },
    assetType: [],
    cloudTech: [],
    aiData: [],
    status: "",
    region: "",
  })

  const [expandedSections, setExpandedSections] = useState({
    businessProcess: true,
    lineOfBusiness: true,
    capabilityLevel: false,
    assetType: false,
    cloudTech: false,
    aiData: false,
    status: false,
    region: false,
  })

  const [isMappingTrayOpen, setIsMappingTrayOpen] = useState(false)
  const [mappingContext, setMappingContext] = useState<{
    industryId?: string
    processKeys?: string[]
    industryName?: string
  }>({})

  const tabs = [
    { id: "industries", label: "Industries" },
    { id: "processes", label: "Processes" },
    { id: "capabilities", label: "Capabilities" },
    { id: "reference-models", label: "Reference Models" },
    { id: "patterns", label: "Patterns" },
    { id: "accelerators", label: "Accelerators" },
    { id: "demos", label: "Demos" },
  ]

  const [activeTab, setActiveTab] = useState("industries")

  const updateURL = useCallback(
    (newFilters: FilterState, newSearchQuery: string) => {
      const params = new URLSearchParams()

      // Add search query
      if (newSearchQuery) {
        params.set("search", newSearchQuery)
      }

      // Add filter parameters
      if (newFilters.businessProcess.length > 0) {
        params.set("process", newFilters.businessProcess.join(","))
      }
      if (newFilters.lineOfBusiness.length > 0) {
        params.set("lob", newFilters.lineOfBusiness.join(","))
      }
      if (newFilters.assetType.length > 0) {
        params.set("asset", newFilters.assetType.join(","))
      }
      if (newFilters.cloudTech.length > 0) {
        params.set("cloud", newFilters.cloudTech.join(","))
      }
      if (newFilters.aiData.length > 0) {
        params.set("ai", newFilters.aiData.join(","))
      }
      if (newFilters.status) {
        params.set("status", newFilters.status)
      }
      if (newFilters.region) {
        params.set("region", newFilters.region)
      }
      if (newFilters.capabilityLevel.l1) {
        params.set("l1", newFilters.capabilityLevel.l1)
      }
      if (newFilters.capabilityLevel.l2) {
        params.set("l2", newFilters.capabilityLevel.l2)
      }

      const newURL = params.toString() ? `/gallery/industries?${params.toString()}` : "/gallery/industries"
      router.replace(newURL, { scroll: false })
    },
    [router],
  )

  useEffect(() => {
    const process = searchParams.get("process")
    const industry = searchParams.get("industry")
    const asset = searchParams.get("asset")
    const cloud = searchParams.get("cloud")
    const lob = searchParams.get("lob")
    const ai = searchParams.get("ai")
    const status = searchParams.get("status")
    const region = searchParams.get("region")
    const l1 = searchParams.get("l1")
    const l2 = searchParams.get("l2")
    const search = searchParams.get("search")

    // Parse URL parameters into filter state
    const newFilters: FilterState = {
      businessProcess: process ? process.split(",") : [],
      lineOfBusiness: lob ? lob.split(",") : [],
      capabilityLevel: { l1: l1 || "", l2: l2 || "" },
      assetType: asset ? asset.split(",") : [],
      cloudTech: cloud ? cloud.split(",") : [],
      aiData: ai ? ai.split(",") : [],
      status: status || "",
      region: region || "",
    }

    setFilters(newFilters)

    if (search) {
      setSearchQuery(search)
    }

    // Handle preset behaviors
    if (process) {
      setExpandedSections((prev) => ({ ...prev, businessProcess: true }))
      setShowPresetCallout(true)
      setTimeout(() => setShowPresetCallout(false), 5000) // Hide after 5 seconds
    }

    // Handle industry highlighting and auto-open
    if (industry) {
      const targetIndustry = sampleIndustries.find((ind) => ind.slug === industry)
      if (targetIndustry) {
        setHighlightedIndustry(targetIndustry.id)
        // Auto-open industry detail on first load
        setTimeout(() => {
          setSelectedIndustry(targetIndustry)
        }, 500)
      }
    }
  }, [searchParams])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const updateFilter = (section: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [section]: value }
    setFilters(newFilters)
    updateURL(newFilters, searchQuery)
  }

  const toggleArrayFilter = (
    section: "businessProcess" | "lineOfBusiness" | "assetType" | "cloudTech" | "aiData",
    value: string,
  ) => {
    const newFilters = {
      ...filters,
      [section]: filters[section].includes(value)
        ? filters[section].filter((item) => item !== value)
        : [...filters[section], value],
    }
    setFilters(newFilters)
    updateURL(newFilters, searchQuery)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    updateURL(filters, query)
  }

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      businessProcess: [],
      lineOfBusiness: [],
      capabilityLevel: { l1: "", l2: "" },
      assetType: [],
      cloudTech: [],
      aiData: [],
      status: "",
      region: "",
    }
    setFilters(clearedFilters)
    setSearchQuery("")
    setHighlightedIndustry(null)
    setShowPresetCallout(false)
    router.replace("/gallery/industries", { scroll: false })
  }

  const applyFilters = () => {
    console.log("[v0] Applying filters:", filters)
    // Filters are already applied via URL synchronization
  }

  const openIndustryDetail = (industry: (typeof sampleIndustries)[0]) => {
    setSelectedIndustry(industry)
    // Update URL to include industry parameter
    const params = new URLSearchParams(searchParams.toString())
    params.set("industry", industry.slug)
    router.replace(`/gallery/industries?${params.toString()}`, { scroll: false })
  }

  const closeIndustryDetail = () => {
    setSelectedIndustry(null)
    setHighlightedIndustry(null)
    // Remove industry parameter from URL
    const params = new URLSearchParams(searchParams.toString())
    params.delete("industry")
    const newURL = params.toString() ? `/gallery/industries?${params.toString()}` : "/gallery/industries"
    router.replace(newURL, { scroll: false })
  }

  const openMappingTray = (industryId: string, industryName: string, processKeys: string[] = []) => {
    setMappingContext({
      industryId,
      processKeys: processKeys.length > 0 ? processKeys : filters.businessProcess,
      industryName,
    })
    setIsMappingTrayOpen(true)
  }

  const filteredIndustries = sampleIndustries.filter((industry) => {
    if (
      searchQuery &&
      !industry.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !industry.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply other filter logic here as needed
    // For now, just search filtering is implemented

    return true
  })

  const generateActiveFilters = () => {
    const activeFilters: string[] = []

    filters.businessProcess.forEach((process) => {
      const processName = businessProcesses.find((p) => p.key === process)?.name || process
      activeFilters.push(`Process: ${processName}`)
    })

    filters.lineOfBusiness.forEach((lob) => {
      activeFilters.push(`LoB: ${lob}`)
    })

    filters.assetType.forEach((asset) => {
      activeFilters.push(`Asset: ${asset}`)
    })

    filters.cloudTech.forEach((cloud) => {
      activeFilters.push(`Cloud: ${cloud}`)
    })

    filters.aiData.forEach((ai) => {
      activeFilters.push(`AI: ${ai}`)
    })

    if (filters.status) {
      activeFilters.push(`Status: ${filters.status}`)
    }

    if (filters.region) {
      activeFilters.push(`Region: ${filters.region}`)
    }

    if (filters.capabilityLevel.l1) {
      activeFilters.push(`L1: ${filters.capabilityLevel.l1}`)
    }

    if (filters.capabilityLevel.l2) {
      activeFilters.push(`L2: ${filters.capabilityLevel.l2}`)
    }

    return activeFilters
  }

  const activeFilters = generateActiveFilters()

  const FilterSection = ({
    title,
    section,
    children,
    count = 0,
  }: {
    title: string
    section: keyof typeof expandedSections
    children: React.ReactNode
    count?: number
  }) => (
    <div className="border-b border-gray-100/50 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900" style={{ fontFamily: "var(--font-sap-72)" }}>
            {title}
          </span>
          {count > 0 && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{count}</span>
          )}
        </div>
        {expandedSections[section] ? (
          <ChevronUpIcon className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        )}
      </button>
      {expandedSections[section] && <div className="px-4 pb-4">{children}</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20">
      <div className="border-b border-gray-100/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-3xl font-bold tracking-tight text-gray-900"
                style={{ fontFamily: "var(--font-sap-72)" }}
              >
                Solutions Gallery
              </h1>
              <p className="mt-2 text-gray-600" style={{ fontFamily: "var(--font-sap-72)" }}>
                Explore industries, processes, capabilities, and reference architectures.
              </p>
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/80 border border-gray-200/50 hover:bg-gray-50/80 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="mt-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {activeTab === "industries" && (
        <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100/50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="relative mb-4">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search industries..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/50 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                style={{ fontFamily: "var(--font-sap-72)" }}
              />
            </div>

            {showPresetCallout && filters.businessProcess.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800" style={{ fontFamily: "var(--font-sap-72)" }}>
                  Filtered by{" "}
                  {filters.businessProcess.map((p) => businessProcesses.find((bp) => bp.key === p)?.name).join(", ")}
                </p>
              </div>
            )}

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500" style={{ fontFamily: "var(--font-sap-72)" }}>
                  Active filters:
                </span>
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm border border-blue-200/50"
                    style={{ fontFamily: "var(--font-sap-72)" }}
                  >
                    {filter}
                    <button
                      onClick={() => {
                        // Handle individual filter removal
                        // This would need more complex logic to remove specific filters
                        // For now, just clear all for simplicity
                        clearAllFilters()
                      }}
                      className="ml-1 hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab !== "industries" && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "var(--font-sap-72)" }}>
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600" style={{ fontFamily: "var(--font-sap-72)" }}>
              Content for {tabs.find((t) => t.id === activeTab)?.label} coming soon.
            </p>
          </div>
        </div>
      )}

      {selectedIndustry && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={closeIndustryDetail}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-sap-72)" }}>
                      {selectedIndustry.name}
                    </h2>
                    <p className="text-blue-100 text-sm" style={{ fontFamily: "var(--font-sap-72)" }}>
                      {selectedIndustry.description}
                    </p>
                  </div>
                  <button onClick={closeIndustryDetail} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <h3
                      className="text-lg font-semibold text-gray-900 mb-4"
                      style={{ fontFamily: "var(--font-sap-72)" }}
                    >
                      Value Chains
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {businessProcesses.slice(0, 6).map((process) => (
                        <div key={process.key} className="p-4 bg-gray-50 rounded-xl border border-gray-200/50">
                          <h4 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: "var(--font-sap-72)" }}>
                            {process.name}
                          </h4>
                          <p className="text-sm text-gray-600" style={{ fontFamily: "var(--font-sap-72)" }}>
                            {process.tooltip}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => openMappingTray(selectedIndustry.id, selectedIndustry.name)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                      >
                        Use in Design
                      </button>
                      <button
                        onClick={() => openMappingTray(selectedIndustry.id, selectedIndustry.name)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                      >
                        Map Evidence
                      </button>
                    </div>
                  </div>

                  {/* Right Rail */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sap-72)" }}>
                        Top KPIs
                      </h4>
                      <div className="space-y-2">
                        {["Revenue Growth", "Customer Satisfaction", "Time to Market", "Operational Efficiency"].map(
                          (kpi) => (
                            <div key={kpi} className="p-3 bg-blue-50 rounded-lg">
                              <span
                                className="text-sm font-medium text-blue-900"
                                style={{ fontFamily: "var(--font-sap-72)" }}
                              >
                                {kpi}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sap-72)" }}>
                        Common Pain Points
                      </h4>
                      <div className="space-y-2">
                        {["Legacy System Integration", "Data Silos", "Manual Processes", "Compliance Complexity"].map(
                          (pain) => (
                            <div key={pain} className="p-3 bg-orange-50 rounded-lg">
                              <span
                                className="text-sm font-medium text-orange-900"
                                style={{ fontFamily: "var(--font-sap-72)" }}
                              >
                                {pain}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-sap-72)" }}>
                        Related References
                      </h4>
                      <div className="space-y-2">
                        {[
                          "Digital Transformation Framework",
                          "Cloud Migration Pattern",
                          "API Integration Accelerator",
                        ].map((ref) => (
                          <div key={ref} className="p-3 bg-purple-50 rounded-lg">
                            <span
                              className="text-sm font-medium text-purple-900"
                              style={{ fontFamily: "var(--font-sap-72)" }}
                            >
                              {ref}
                            </span>
                          </div>
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

      {isMappingTrayOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMappingTrayOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Context Banner */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg" style={{ fontFamily: "var(--font-sap-72)" }}>
                    Mapping Tray
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 bg-white/20 rounded-full">Industry: {mappingContext.industryName}</span>
                    {mappingContext.processKeys && mappingContext.processKeys.length > 0 && (
                      <span className="px-2 py-1 bg-white/20 rounded-full">
                        Processes:{" "}
                        {mappingContext.processKeys
                          .map((key) => businessProcesses.find((p) => p.key === key)?.name || key)
                          .join(", ")}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsMappingTrayOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Evidence Buckets */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "KPIs", count: 12, color: "blue" },
                  { name: "Pain Points", count: 8, color: "orange" },
                  { name: "Interviews", count: 5, color: "green" },
                  { name: "Surveys", count: 3, color: "purple" },
                  { name: "North Star Fragments", count: 15, color: "teal" },
                  { name: "Initiatives", count: 7, color: "indigo" },
                ].map((bucket) => (
                  <div key={bucket.name} className="bg-gray-50 rounded-xl p-4 border border-gray-200/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900" style={{ fontFamily: "var(--font-sap-72)" }}>
                        {bucket.name}
                      </h4>
                      <span
                        className={`px-2 py-1 bg-${bucket.color}-100 text-${bucket.color}-700 rounded-full text-xs font-medium`}
                      >
                        {bucket.count}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <button
                        className={`w-full px-3 py-2 bg-${bucket.color}-600 text-white rounded-lg hover:bg-${bucket.color}-700 transition-colors text-sm font-medium`}
                      >
                        Add New
                      </button>
                      <button className="w-full px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                        Link Existing
                      </button>
                      <button className="w-full px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        AI Suggest
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    console.log("[v0] Saving mapping context:", mappingContext)
                    setIsMappingTrayOpen(false)
                    // Show success toast
                  }}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  Save to Design Inputs
                </button>
                <button
                  onClick={() => setIsMappingTrayOpen(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
