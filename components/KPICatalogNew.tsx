"use client"

import React, { useState, useEffect } from "react"
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Bookmark, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Target,
  Award,
  BarChart3,
  Maximize
} from "lucide-react"

// Mock KPI data with comprehensive information
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
    status: "needs-attention"
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
    status: "improving"
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
    formula: "Total invoice processing cost / Number of invoices processed",
    trend: {
      "2022": 22,
      "2023": 20,
      "2024": 18
    },
    yearOverYear: "+18.2%",
    vsIndustry: "-50.0%",
    competitive: [
      { company: "Certis", value: 18, unit: "S$" },
      { company: "Prosegur", value: 16, unit: "S$" },
      { company: "Aetos Group", value: 14, unit: "S$" },
      { company: "Industry Avg", value: 15, unit: "S$" },
      { company: "Securitas", value: 12, unit: "S$" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-50.0%",
    marketRanking: "#4 of 5 analyzed", 
    threeYearTrend: "+18.2%",
    annualOpportunity: "S$1.8M",
    insights: [
      "Cost reduction from S$22 to S$18 shows good progress over 3 years",
      "Still 50% above industry average, indicating significant efficiency opportunities",
      "Process automation could help achieve target of S$12 per invoice"
    ],
    status: "improving"
  },
  {
    id: "FIN-004",
    name: "Budget Variance",
    category: "Financial KPI",
    unit: "%", 
    currentValue: 8,
    target: 5,
    industryAverage: 6,
    description: "Percentage variance between actual and budgeted amounts",
    formula: "|(Actual - Budget) / Budget| × 100",
    trend: {
      "2022": 12,
      "2023": 10,
      "2024": 8
    },
    yearOverYear: "+33.3%",
    vsIndustry: "-60.0%",
    competitive: [
      { company: "Certis", value: 8, unit: "%" },
      { company: "Prosegur", value: 7, unit: "%" },
      { company: "Aetos Group", value: 6, unit: "%" },
      { company: "Industry Avg", value: 6, unit: "%" },
      { company: "Securitas", value: 4, unit: "%" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-60.0%",
    marketRanking: "#4 of 5 analyzed",
    threeYearTrend: "+33.3%",
    annualOpportunity: "S$3.2M",
    insights: [
      "Budget variance has improved significantly from 12% to 8% over 3 years",
      "Still above industry average of 6%, indicating forecasting accuracy needs improvement",
      "Better planning processes could help achieve the 5% target"
    ],
    status: "improving"
  },
  {
    id: "FIN-005",
    name: "Financial Reporting Time", 
    category: "Financial KPI",
    unit: "days",
    currentValue: 12,
    target: 7,
    industryAverage: 10,
    description: "Time to complete financial reporting after period end",
    formula: "Report completion date - Period end date",
    trend: {
      "2022": 15,
      "2023": 13,
      "2024": 12
    },
    yearOverYear: "+20.0%",
    vsIndustry: "-71.4%",
    competitive: [
      { company: "Certis", value: 12, unit: "days" },
      { company: "Prosegur", value: 11, unit: "days" },
      { company: "Aetos Group", value: 9, unit: "days" },
      { company: "Industry Avg", value: 10, unit: "days" },
      { company: "Securitas", value: 7, unit: "days" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-71.4%",
    marketRanking: "#4 of 5 analyzed",
    threeYearTrend: "+20.0%", 
    annualOpportunity: "S$2.5M",
    insights: [
      "Reporting time reduced from 15 to 12 days, showing steady improvement",
      "71.4% slower than industry average indicates significant automation opportunity",
      "Digital reporting tools could help achieve 7-day target"
    ],
    status: "improving"
  },
  {
    id: "HR-001",
    name: "Time-to-Fill Positions",
    category: "HR KPI",
    unit: "days",
    currentValue: 45,
    target: 30,
    industryAverage: 38,
    description: "Average time to fill open positions from posting to offer acceptance",
    formula: "Offer acceptance date - Job posting date",
    trend: {
      "2022": 50,
      "2023": 47,
      "2024": 45
    },
    yearOverYear: "+7%",
    vsIndustry: "-50.0%",
    competitive: [
      { company: "Certis", value: 45, unit: "days" },
      { company: "Prosegur", value: 42, unit: "days" },
      { company: "Aetos Group", value: 35, unit: "days" },
      { company: "Industry Avg", value: 38, unit: "days" },
      { company: "Securitas", value: 28, unit: "days" }
    ],
    ranking: "#4 of 5",
    performanceGap: "-50.0%",
    marketRanking: "#4 of 5 analyzed",
    threeYearTrend: "+7%",
    annualOpportunity: "S$1.9M",
    insights: [
      "Time-to-fill has decreased from 50 to 45 days but still above industry average",
      "50% slower than industry benchmark indicates recruitment process inefficiencies",
      "Streamlined hiring processes and better candidate pipelines needed"
    ],
    status: "needs-attention"
  }
]

interface KPICatalogNewProps {
  searchTerm?: string
  onSearchChange?: (term: string) => void
}

export default function KPICatalogNew({ searchTerm = "", onSearchChange }: KPICatalogNewProps) {
  const [selectedKPI, setSelectedKPI] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"tiles" | "table">("tiles")
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>("All")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("bookmarkedKPIs")
    if (saved) {
      setBookmarkedKPIs(JSON.parse(saved))
    }
    setIsHydrated(true)
  }, [])

  const toggleBookmark = (kpiId: string) => {
    setBookmarkedKPIs(prev => {
      const newBookmarks = prev.includes(kpiId) 
        ? prev.filter(id => id !== kpiId)
        : [...prev, kpiId]
      
      if (typeof window !== "undefined") {
        localStorage.setItem("bookmarkedKPIs", JSON.stringify(newBookmarks))
      }
      return newBookmarks
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-500"
      case "improving": return "bg-blue-500" 
      case "needs-attention": return "bg-orange-500"
      case "critical": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600"
      case "improving": return "text-blue-600"
      case "needs-attention": return "text-orange-600" 
      case "critical": return "text-red-600"
      default: return "text-gray-600"
    }
  }

  const getPerformanceColor = (value: number, target: number, higher_is_better: boolean = true) => {
    const ratio = value / target
    if (higher_is_better) {
      if (ratio >= 1) return "text-green-600"
      if (ratio >= 0.8) return "text-orange-600"
      return "text-red-600"
    } else {
      if (ratio <= 1) return "text-green-600"
      if (ratio <= 1.2) return "text-orange-600"
      return "text-red-600"
    }
  }

  const categories = ["All", ...Array.from(new Set(mockKPIs.map(kpi => kpi.category)))]
  
  const filteredKPIs = mockKPIs.filter(kpi => {
    const matchesSearch = kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kpi.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || kpi.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const renderKPICard = (kpi: any) => {
    const isBookmarked = isHydrated && bookmarkedKPIs.includes(kpi.id)
    const higherIsBetter = !["Cost per Invoice", "Month-End Close Time", "Budget Variance", "Time-to-Fill Positions", "Financial Reporting Time"].includes(kpi.name)
    
    return (
      <div
        key={kpi.id}
        onClick={() => setSelectedKPI(kpi)}
        className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
          fontFamily: '"72", "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {/* Header with bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(kpi.status)}`}></div>
              <span className="text-xs font-medium text-gray-500">{kpi.category}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight">{kpi.name}</h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleBookmark(kpi.id)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-blue-600 text-blue-600" : "text-gray-400"}`} />
          </button>
        </div>

        {/* Current Value Display */}
        <div className="mb-6">
          <div className="flex items-end gap-2 mb-2">
            <span className={`text-3xl font-bold ${getPerformanceColor(kpi.currentValue, kpi.target, higherIsBetter)}`}>
              {kpi.currentValue}{kpi.unit === "S$" ? "S$" : kpi.unit}
            </span>
            <span className="text-sm text-gray-500 mb-1">
              Target: {kpi.target}{kpi.unit === "S$" ? "S$" : kpi.unit}
            </span>
          </div>
          
          {/* Performance indicators */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              {kpi.yearOverYear.startsWith("+") ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={kpi.yearOverYear.startsWith("+") ? "text-green-600" : "text-red-600"}>
                {kpi.yearOverYear}
              </span>
              <span className="text-gray-500">3-Year Trend</span>
            </div>
            
            <div className="flex items-center gap-1">
              <span className={kpi.vsIndustry.startsWith("-") ? "text-red-600" : "text-green-600"}>
                {kpi.vsIndustry}
              </span>
              <span className="text-gray-500">vs Industry</span>
            </div>
          </div>
        </div>

        {/* Industry Comparison */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Industry Avg</span>
            <span className="font-medium">{kpi.industryAverage}{kpi.unit === "S$" ? "S$" : kpi.unit}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Market Ranking</span>
            <span className="font-medium text-orange-600">{kpi.ranking}</span>
          </div>
        </div>

        {/* Expand indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">{kpi.id}</span>
          <Maximize className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Hover effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
      </div>
    )
  }

  const renderExpandedView = (kpi: any) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        style={{ fontFamily: '"72", "Helvetica Neue", Arial, sans-serif' }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{kpi.name}</h2>
                <p className="text-gray-600">Performance Dashboard - 3-Year Analysis & Competitive Benchmarking</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedKPI(null)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Current Performance */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Current Performance</h3>
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {kpi.currentValue}{kpi.unit === "S$" ? "S$" : kpi.unit}
              </div>
              <div className="text-sm text-gray-600">
                Target: {kpi.target}{kpi.unit === "S$" ? "S$" : kpi.unit}
              </div>
            </div>

            {/* 3-Year Trend */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">3-Year Historical Trend</h3>
              </div>
              <div className="space-y-2">
                {Object.entries(kpi.trend).map(([year, value]) => (
                  <div key={year} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{year}</span>
                    <span className="font-medium text-blue-600">{value}{kpi.unit === "S$" ? "S$" : kpi.unit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">Competitive Analysis</h3>
              </div>
              <div className="space-y-2">
                {kpi.competitive.map((comp: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{comp.company}</span>
                    <span className={`font-medium ${comp.company === 'Certis' ? 'text-purple-600' : 'text-blue-600'}`}>
                      {comp.value}{comp.unit === "S$" ? "S$" : comp.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600">{kpi.performanceGap}</div>
              <div className="text-sm text-gray-600">Performance Gap</div>
              <div className="text-xs text-gray-500">vs Industry Benchmark</div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">{kpi.ranking}</div>
              <div className="text-sm text-gray-600">Market Ranking</div>
              <div className="text-xs text-gray-500">{kpi.marketRanking}</div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">{kpi.threeYearTrend}</div>
              <div className="text-sm text-gray-600">3-Year Trend</div>
              <div className="text-xs text-gray-500">Declining</div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">{kpi.annualOpportunity}</div>
              <div className="text-sm text-gray-600">Annual Opportunity</div>
              <div className="text-xs text-gray-500">Process Optimization</div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Key Insights & Analysis</h3>
            <div className="space-y-3">
              {kpi.insights.map((insight: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6" style={{ fontFamily: '"72", "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">KPI Catalog</h2>
          <p className="text-gray-600">Explore key performance indicators with industry benchmarks and competitive analysis</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("tiles")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "tiles" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search KPIs..."
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKPIs.map(renderKPICard)}
      </div>

      {/* Expanded View Modal */}
      {selectedKPI && renderExpandedView(selectedKPI)}
    </div>
  )
}
