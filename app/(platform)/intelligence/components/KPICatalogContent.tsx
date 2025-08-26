"use client"

import React, { useState, useMemo } from "react"
import { 
  Search, 
  BarChart3,
  Building2,
  Workflow,
  Target,
  TrendingUp,
  TrendingDown,
  Bookmark,
  Filter,
  X
} from "lucide-react"

// Mock KPI data with 141+ KPIs
const mockKPIs = [
  {
    id: "FPY-001",
    name: "First Pass Yield (FPY)",
    category: "Operations & Supply Chain KPI",
    currentValue: "90%",
    target: "98%",
    threeYearTrend: "36.0%",
    vsIndustry: "196.0%",
    status: "needs-attention",
    color: "purple",
    icon: BarChart3
  },
  {
    id: "OTD-001",
    name: "On-Time Delivery (OTD)",
    category: "Operations & Supply Chain KPI",
    currentValue: "92%",
    target: "96%",
    threeYearTrend: "+7.0%",
    vsIndustry: "+47.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "SCRAP-001",
    name: "Scrap Rate",
    category: "Operations & Supply Chain KPI",
    currentValue: "3%",
    target: "1%",
    threeYearTrend: "37.0%",
    vsIndustry: "157.0%",
    status: "needs-attention",
    color: "purple",
    icon: BarChart3
  },
  {
    id: "YIELD-001",
    name: "Yield per Acre",
    category: "Operations & Supply Chain KPI",
    currentValue: "85%",
    target: "95%",
    threeYearTrend: "+12.0%",
    vsIndustry: "+25.0%",
    status: "improving",
    color: "orange",
    icon: BarChart3
  },
  {
    id: "DEBT-001",
    name: "Debt-to-Asset Ratio",
    category: "Finance & Accounting KPI",
    currentValue: "0.45",
    target: "0.35",
    threeYearTrend: "-8.0%",
    vsIndustry: "-15.0%",
    status: "improving",
    color: "blue",
    icon: BarChart3
  },
  {
    id: "OPM-001",
    name: "Operating Profit Margin",
    category: "Finance & Accounting KPI",
    currentValue: "18%",
    target: "22%",
    threeYearTrend: "+15.0%",
    vsIndustry: "+28.0%",
    status: "improving",
    color: "blue",
    icon: BarChart3
  },
  {
    id: "CAC-001",
    name: "Customer Acquisition Cost",
    category: "Sales & Marketing KPI",
    currentValue: "$150",
    target: "$120",
    threeYearTrend: "-12.0%",
    vsIndustry: "-18.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "NPS-001",
    name: "Net Promoter Score",
    category: "Customer Experience KPI",
    currentValue: "65",
    target: "75",
    threeYearTrend: "+8.0%",
    vsIndustry: "+12.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "TAT-001",
    name: "Turnaround Time",
    category: "Operations & Supply Chain KPI",
    currentValue: "48h",
    target: "24h",
    threeYearTrend: "-25.0%",
    vsIndustry: "-35.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "QUALITY-001",
    name: "Quality Score",
    category: "Operations & Supply Chain KPI",
    currentValue: "88%",
    target: "95%",
    threeYearTrend: "+5.0%",
    vsIndustry: "+8.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "EFFICIENCY-001",
    name: "Process Efficiency",
    category: "Operations & Supply Chain KPI",
    currentValue: "78%",
    target: "85%",
    threeYearTrend: "+9.0%",
    vsIndustry: "+15.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "COST-001",
    name: "Cost per Unit",
    category: "Finance & Accounting KPI",
    currentValue: "$12.50",
    target: "$10.00",
    threeYearTrend: "-8.0%",
    vsIndustry: "-12.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  }
]

// Pre-defined additional KPIs to avoid hydration issues
const additionalKPIs = [
  {
    id: "KPI-013",
    name: "KPI 13",
    category: "Technology & IT KPI",
    currentValue: "45%",
    target: "90%",
    threeYearTrend: "18.2%",
    vsIndustry: "29.3%",
    status: "needs-attention",
    color: "red",
    icon: BarChart3
  },
  {
    id: "KPI-014",
    name: "KPI 14",
    category: "Risk & Compliance KPI",
    currentValue: "95%",
    target: "59%",
    threeYearTrend: "+11.5%",
    vsIndustry: "2.6%",
    status: "improving",
    color: "blue",
    icon: BarChart3
  },
  {
    id: "KPI-015",
    name: "KPI 15",
    category: "Innovation & R&D KPI",
    currentValue: "83%",
    target: "93%",
    threeYearTrend: "+28.4%",
    vsIndustry: "+4.0%",
    status: "improving",
    color: "green",
    icon: BarChart3
  },
  {
    id: "KPI-016",
    name: "KPI 16",
    category: "Operations & Supply Chain KPI",
    currentValue: "62%",
    target: "53%",
    threeYearTrend: "9.2%",
    vsIndustry: "+49.9%",
    status: "needs-attention",
    color: "purple",
    icon: BarChart3
  },
  {
    id: "KPI-017",
    name: "KPI 17",
    category: "Finance & Accounting KPI",
    currentValue: "25%",
    target: "25%",
    threeYearTrend: "+15.8%",
    vsIndustry: "+15.9%",
    status: "stable",
    color: "orange",
    icon: BarChart3
  },
  {
    id: "KPI-018",
    name: "KPI 18",
    category: "Sales & Marketing KPI",
    currentValue: "57%",
    target: "91%",
    threeYearTrend: "+21.3%",
    vsIndustry: "44.9%",
    status: "improving",
    color: "red",
    icon: BarChart3
  },
  {
    id: "KPI-019",
    name: "KPI 19",
    category: "Customer Experience KPI",
    currentValue: "69%",
    target: "70%",
    threeYearTrend: "2.0%",
    vsIndustry: "+48.1%",
    status: "stable",
    color: "blue",
    icon: BarChart3
  },
  {
    id: "KPI-020",
    name: "KPI 20",
    category: "Human Resources KPI",
    currentValue: "74%",
    target: "25%",
    threeYearTrend: "+19.8%",
    vsIndustry: "+9.8%",
    status: "improving",
    color: "green",
    icon: BarChart3
  }
]

// Add more static KPIs to reach 141+
const generateStaticKPIs = () => {
  const staticKPIs = []
  const categories = [
    "Operations & Supply Chain KPI",
    "Finance & Accounting KPI", 
    "Sales & Marketing KPI",
    "Customer Experience KPI",
    "Human Resources KPI",
    "Technology & IT KPI",
    "Risk & Compliance KPI",
    "Innovation & R&D KPI"
  ]
  
  const statuses = ["improving", "stable", "needs-attention", "declining"]
  const colors = ["blue", "green", "purple", "orange", "red"]
  
  // Use deterministic values based on index to avoid hydration issues
  for (let i = 21; i <= 141; i++) {
    const category = categories[i % categories.length]
    const status = statuses[i % statuses.length]
    const color = colors[i % colors.length]
    
    // Use deterministic calculations instead of Math.random()
    const baseValue = (i * 7) % 100
    const targetValue = 20 + ((i * 11) % 80)
    const trendValue = ((i * 13) % 30) + 1
    const industryValue = ((i * 17) % 50) + 1
    
    staticKPIs.push({
      id: `KPI-${String(i).padStart(3, '0')}`,
      name: `KPI ${i}`,
      category,
      currentValue: `${baseValue}%`,
      target: `${targetValue}%`,
      threeYearTrend: `${i % 2 === 0 ? '+' : ''}${trendValue.toFixed(1)}%`,
      vsIndustry: `${i % 3 === 0 ? '+' : ''}${industryValue.toFixed(1)}%`,
      status,
      color,
      icon: BarChart3
    })
  }
  
  return staticKPIs
}

const allKPIs = [...mockKPIs, ...additionalKPIs, ...generateStaticKPIs()]

const industries = [
  "All Industries",
  "Financial Services",
  "Healthcare",
  "Manufacturing", 
  "Retail",
  "Technology",
  "Energy",
  "Transportation",
  "Construction",
  "Media & Entertainment"
]

const e2eProcesses = [
  "All E2E Processes",
  "Lead to Cash",
  "Source to Pay",
  "Record to Report",
  "Hire to Retire",
  "Plan to Produce",
  "Order to Delivery",
  "Issue to Resolution"
]

export default function KPICatalogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedProcess, setSelectedProcess] = useState("All E2E Processes")
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<Set<string>>(new Set())

  const toggleBookmark = (kpiId: string) => {
    const newBookmarks = new Set(bookmarkedKPIs)
    if (newBookmarks.has(kpiId)) {
      newBookmarks.delete(kpiId)
    } else {
      newBookmarks.add(kpiId)
    }
    setBookmarkedKPIs(newBookmarks)
  }

  const filteredKPIs = useMemo(() => {
    return allKPIs.filter((kpi) => {
      const matchesSearch = !searchTerm || 
        kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesIndustry = selectedIndustry === "All Industries" || 
        kpi.category.toLowerCase().includes(selectedIndustry.toLowerCase())
      
      const matchesProcess = selectedProcess === "All E2E Processes" || 
        kpi.category.toLowerCase().includes(selectedProcess.toLowerCase())

      return matchesSearch && matchesIndustry && matchesProcess
    })
  }, [searchTerm, selectedIndustry, selectedProcess])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedIndustry("All Industries")
    setSelectedProcess("All E2E Processes")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving": return "text-green-600"
      case "needs-attention": return "text-red-600"
      case "stable": return "text-blue-600"
      case "declining": return "text-orange-600"
      default: return "text-gray-600"
    }
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "purple": return "from-purple-500 to-purple-600"
      case "green": return "from-green-500 to-green-600"
      case "orange": return "from-orange-500 to-orange-600"
      case "blue": return "from-blue-500 to-blue-600"
      case "red": return "from-red-500 to-red-600"
      default: return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          KPI Catalog
        </h2>
        <p className="text-lg mb-2" style={{ color: "var(--text-muted)" }}>
          Explore 141+ comprehensive KPIs across all industries and business functions
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing {filteredKPIs.length} of {allKPIs.length} KPIs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
        {/* Left Sidebar - Filters */}
        <aside className="space-y-4">
          {/* Search Card */}
          <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <div className="mb-3 text-sm font-medium" style={{ color: "var(--text)" }}>
              Search
            </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search KPIs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)"
                }}
              />
            </div>
          </div>

          {/* Industry Filter */}
          <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <div className="mb-3 text-sm font-medium" style={{ color: "var(--text)" }}>
              Industry
            </div>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)"
              }}
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* E2E Process Filter */}
          <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <div className="mb-3 text-sm font-medium" style={{ color: "var(--text)" }}>
              E2E Process
            </div>
            <select
              value={selectedProcess}
              onChange={(e) => setSelectedProcess(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)"
              }}
            >
              {e2eProcesses.map(process => (
                <option key={process} value={process}>{process}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 text-sm border rounded-lg transition-colors hover:bg-gray-50"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)"
            }}
          >
            Clear Filters
          </button>
        </aside>

        {/* Right Side - KPI Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredKPIs.map((kpi) => {
              const Icon = kpi.icon
              return (
                <div key={kpi.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: "var(--border)" }}>
                  {/* Colored Header Bar */}
                  <div className={`h-2 bg-gradient-to-r ${getColorClasses(kpi.color)}`} />
                  
                  {/* KPI Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                        <h3 className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                          {kpi.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => toggleBookmark(kpi.id)}
                        className={`p-1 rounded-full transition-colors ${
                          bookmarkedKPIs.has(kpi.id)
                            ? "text-yellow-500 hover:text-yellow-600"
                            : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedKPIs.has(kpi.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                      {kpi.category}
                    </p>

                    {/* KPI Values */}
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "var(--text-muted)" }}>Current:</span>
                        <span className="font-medium" style={{ color: "var(--text)" }}>{kpi.currentValue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{ color: "var(--text-muted)" }}>Target:</span>
                        <span className="font-medium" style={{ color: "var(--text)" }}>{kpi.target}</span>
                      </div>
                    </div>

                    {/* Trends */}
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "var(--text-muted)" }}>3-Year Trend:</span>
                        <span className={`font-medium ${kpi.threeYearTrend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.threeYearTrend}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "var(--text-muted)" }}>vs Industry:</span>
                        <span className={`font-medium ${kpi.vsIndustry.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {kpi.vsIndustry}
                        </span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {kpi.category} #{kpi.id.split('-')[1]} of {allKPIs.length}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

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
