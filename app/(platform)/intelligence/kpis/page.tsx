"use client"

import React, { useState } from "react"
import { 
  Search, 
  Grid3X3, 
  List, 
  Bookmark, 
  X, 
  Target,
  Building2,
  Workflow,
  FileText,
  Users,
  Zap,
  ChevronDown,
  ChevronUp
} from "lucide-react"

// Mock KPI data structure - replace with your actual data import
const mockKPIs = [
  {
    id: "FIN-001",
    name: "Month-End Close Time",
    category: "Financial KPI",
    unit: "days",
    currentValue: 8,
    target: 5,
    industryAverage: 7,
    description: "Time taken to complete month-end financial closing process",
    formula: "Date of close - Last day of month",
    trend: {
      "2022": 10,
      "2023": 9,
      "2024": 8
    },
    yearOverYear: "+20.0%",
    vsIndustry: "-60.0%",
    competitive: [
      { company: "Certis", value: 8, unit: "days" },
      { company: "Prosegur", value: 6, unit: "days" },
      { company: "Aetos Group", value: 5, unit: "days" },
      { company: "Industry Avg", value: 7, unit: "days" },
      { company: "Securitas", value: 4, unit: "days" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-80.0%",
    marketRanking: "#4 of 5 analyzed",
    threeYearTrend: "-13.5%",
    annualOpportunity: "S$4.7M",
    insights: [
      "Despite 90% digitalization efforts, month-end close remains 80% slower than industry standards",
      "3-year improvement trend (+13.5%) indicates progress from 10→8 days, but acceleration needed",
      "Ranking #4 of 5 among peers - significant underperformance vs Securitas (4 days)"
    ],
    status: "needs-attention",
    industry: "Financial Services",
    businessFunction: "Finance & Accounting",
    e2eProcess: "Record to Report"
  },
  {
    id: "FIN-002", 
    name: "Invoice Accuracy Rate",
    category: "Financial KPI",
    unit: "%",
    currentValue: 88,
    target: 95,
    industryAverage: 92,
    description: "Percentage of invoices processed without errors",
    formula: "(Error-free invoices / Total invoices) × 100",
    trend: {
      "2022": 85,
      "2023": 87,
      "2024": 88
    },
    yearOverYear: "+3.5%",
    vsIndustry: "-7.4%",
    competitive: [
      { company: "Certis", value: 88, unit: "%" },
      { company: "Prosegur", value: 90, unit: "%" },
      { company: "Aetos Group", value: 94, unit: "%" },
      { company: "Industry Avg", value: 92, unit: "%" },
      { company: "Securitas", value: 96, unit: "%" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-7.4%",
    marketRanking: "#4 of 5 analyzed",
    threeYearTrend: "+3.5%",
    annualOpportunity: "S$2.1M",
    insights: [
      "Invoice accuracy has improved steadily from 85% to 88% over 3 years",
      "Still 7.4% below industry average and significantly behind Securitas at 96%",
      "Automation initiatives show promise but need acceleration to reach target"
    ],
    status: "improving",
    industry: "Financial Services",
    businessFunction: "Finance & Accounting",
    e2eProcess: "Source to Pay"
  },
  {
    id: "FIN-003",
    name: "Cost per Invoice",
    category: "Financial KPI", 
    unit: "S$",
    currentValue: 18,
    target: 12,
    industryAverage: 15,
    description: "Average cost to process a single invoice",
    formula: "Total processing costs / Number of invoices processed",
    trend: {
      "2022": 22,
      "2023": 20,
      "2024": 18
    },
    yearOverYear: "+10.0%",
    vsIndustry: "-20.0%",
    competitive: [
      { company: "Certis", value: 18, unit: "S$" },
      { company: "Prosegur", value: 16, unit: "S$" },
      { company: "Aetos Group", value: 14, unit: "S$" },
      { company: "Industry Avg", value: 15, unit: "S$" },
      { company: "Securitas", value: 12, unit: "S$" }
    ],
    ranking: "#3 of 5",
    performanceGap: "-33.3%",
    marketRanking: "#3 of 5 analyzed",
    threeYearTrend: "+18.2%",
    annualOpportunity: "S$3.2M",
    insights: [
      "Cost reduction from S$22 to S$18 shows efficiency gains",
      "Still 33.3% above target and 20% above industry average",
      "Digital transformation initiatives driving cost reduction"
    ],
    status: "improving",
    industry: "Financial Services",
    businessFunction: "Finance & Accounting",
    e2eProcess: "Source to Pay"
  }
]

export default function KPIsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<Set<string>>(new Set())
  const [expandedKPIs, setExpandedKPIs] = useState<Set<string>>(new Set())

  // Get unique values for filters
  const categories = Array.from(new Set(mockKPIs.map(kpi => kpi.category)))
  const statuses = Array.from(new Set(mockKPIs.map(kpi => kpi.status)))

  // Filter KPIs based on search and filters
  const filteredKPIs = mockKPIs.filter(kpi => {
    const matchesSearch = !searchTerm || 
      kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kpi.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === "all" || kpi.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || kpi.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleBookmark = (kpiId: string) => {
    const newBookmarks = new Set(bookmarkedKPIs)
    if (newBookmarks.has(kpiId)) {
      newBookmarks.delete(kpiId)
    } else {
      newBookmarks.add(kpiId)
    }
    setBookmarkedKPIs(newBookmarks)
  }

  const toggleExpanded = (kpiId: string) => {
    const newExpanded = new Set(expandedKPIs)
    if (newExpanded.has(kpiId)) {
      newExpanded.delete(kpiId)
    } else {
      newExpanded.add(kpiId)
    }
    setExpandedKPIs(newExpanded)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedStatus("all")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving": return "text-green-600 bg-green-100"
      case "needs-attention": return "text-red-600 bg-red-100"
      case "stable": return "text-blue-600 bg-blue-100"
      case "declining": return "text-orange-600 bg-orange-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "improving": return "Improving"
      case "needs-attention": return "Needs Attention"
      case "stable": return "Stable"
      case "declining": return "Declining"
      default: return status
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "financial kpi": return <Target className="w-4 h-4" />
      case "operational kpi": return <Workflow className="w-4 h-4" />
      case "customer kpi": return <Users className="w-4 h-4" />
      case "technology kpi": return <Zap className="w-4 h-4" />
      default: return <Building2 className="w-4 h-4" />
    }
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

        <div className="space-y-6">
          {/* Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Total KPIs</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--blue-600)" }}>{mockKPIs.length}</p>
                </div>
                <Target className="w-8 h-8" style={{ color: "var(--blue-600)" }} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Categories</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--blue-600)" }}>{categories.length}</p>
                </div>
                <Building2 className="w-8 h-8" style={{ color: "var(--blue-600)" }} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Improving</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--blue-600)" }}>{mockKPIs.filter(k => k.status === "improving").length}</p>
                </div>
                <Workflow className="w-8 h-8" style={{ color: "var(--blue-600)" }} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Needs Attention</p>
                  <p className="text-2xl font-bold" style={{ color: "var(--blue-600)" }}>{mockKPIs.filter(k => k.status === "needs-attention").length}</p>
                </div>
                <FileText className="w-8 h-8" style={{ color: "var(--blue-600)" }} />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Search KPIs by name, description, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: "var(--border)" }}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      viewMode === "grid" 
                        ? "text-white border-transparent" 
                        : "hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: viewMode === "grid" ? "var(--blue-600)" : "transparent",
                      borderColor: viewMode === "grid" ? "transparent" : "var(--border)",
                      color: viewMode === "grid" ? "white" : "var(--text)"
                    }}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      viewMode === "list" 
                        ? "text-white border-transparent" 
                        : "hover:bg-gray-50"
                    }`}
                    style={{
                      backgroundColor: viewMode === "list" ? "var(--blue-600)" : "transparent",
                      borderColor: viewMode === "list" ? "transparent" : "var(--border)",
                      color: viewMode === "list" ? "white" : "var(--text)"
                    }}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: "var(--border)" }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ borderColor: "var(--border)" }}
                >
                  <option value="all">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{getStatusText(status)}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Showing {filteredKPIs.length} of {mockKPIs.length} KPIs
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm hover:text-gray-700 flex items-center gap-1 transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  <X className="w-3 h-3" />
                  Clear filters
                </button>
              </div>
            </div>
          </div>

          {/* KPI Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKPIs.map((kpi) => (
                <div key={kpi.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>{kpi.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(kpi.category)}
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>{kpi.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(kpi.id)}
                      className={`p-2 rounded-full transition-colors ${
                        bookmarkedKPIs.has(kpi.id)
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedKPIs.has(kpi.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                    {kpi.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>Current:</span>
                      <span className="font-medium" style={{ color: "var(--text)" }}>{kpi.currentValue} {kpi.unit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>Target:</span>
                      <span className="font-medium" style={{ color: "var(--text)" }}>{kpi.target} {kpi.unit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>Industry Avg:</span>
                      <span className="font-medium" style={{ color: "var(--text)" }}>{kpi.industryAverage} {kpi.unit}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: "var(--text-muted)" }}>YoY Change:</span>
                      <span className={`font-medium ${kpi.yearOverYear.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.yearOverYear}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                      {getStatusText(kpi.status)}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpanded(kpi.id)}
                    className="mt-4 w-full text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                    style={{ color: "var(--blue-600)" }}
                  >
                    {expandedKPIs.has(kpi.id) ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {expandedKPIs.has(kpi.id) && (
                    <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Formula</h4>
                        <p className="text-sm font-mono p-2 rounded" style={{ color: "var(--text-muted)", backgroundColor: "var(--surface)" }}>{kpi.formula}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Competitive Analysis</h4>
                        <div className="space-y-2">
                          {kpi.competitive.map((comp, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span style={{ color: "var(--text-muted)" }}>{comp.company}</span>
                              <span className="font-medium" style={{ color: "var(--text)" }}>{comp.value} {comp.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Key Insights</h4>
                        <ul className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                          {kpi.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1" style={{ color: "var(--blue-500)" }}>•</span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Performance Gap:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.performanceGap}</span>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Annual Opportunity:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.annualOpportunity}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredKPIs.map((kpi) => (
                <div key={kpi.id} className="bg-white rounded-lg border p-6" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg" style={{ color: "var(--text)" }}>{kpi.name}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                          {getStatusText(kpi.status)}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{kpi.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Category:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.category}</span>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Current:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.currentValue} {kpi.unit}</span>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Target:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.target} {kpi.unit}</span>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>YoY:</span>
                          <span className={`font-medium ml-2 ${kpi.yearOverYear.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.yearOverYear}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBookmark(kpi.id)}
                      className={`p-2 rounded-full transition-colors ml-4 ${
                        bookmarkedKPIs.has(kpi.id)
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarkedKPIs.has(kpi.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleExpanded(kpi.id)}
                    className="text-sm font-medium flex items-center gap-1 transition-colors"
                    style={{ color: "var(--blue-600)" }}
                  >
                    {expandedKPIs.has(kpi.id) ? (
                      <>
                        Show less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {expandedKPIs.has(kpi.id) && (
                    <div className="mt-4 pt-4 border-t space-y-4" style={{ borderColor: "var(--border)" }}>
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Formula</h4>
                        <p className="text-sm font-mono p-2 rounded" style={{ color: "var(--text-muted)", backgroundColor: "var(--surface)" }}>{kpi.formula}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Competitive Analysis</h4>
                        <div className="space-y-2">
                          {kpi.competitive.map((comp, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span style={{ color: "var(--text-muted)" }}>{comp.company}</span>
                              <span className="font-medium" style={{ color: "var(--text)" }}>{comp.value} {comp.unit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>Key Insights</h4>
                        <ul className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                          {kpi.insights.map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1" style={{ color: "var(--blue-500)" }}>•</span>
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Performance Gap:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.performanceGap}</span>
                        </div>
                        <div>
                          <span style={{ color: "var(--text-muted)" }}>Annual Opportunity:</span>
                          <span className="font-medium ml-2" style={{ color: "var(--text)" }}>{kpi.annualOpportunity}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredKPIs.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>No KPIs found</h3>
              <p style={{ color: "var(--text-muted)" }}>Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
