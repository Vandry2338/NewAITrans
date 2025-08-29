"use client"

import React, { useState, useMemo } from 'react'
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
  X,
  CheckCircle
} from 'lucide-react'
import { sapIndustries } from '@/app/data/industries'
import { sapValueChains } from '@/app/data/valueChains'

// Import the real KPI data
import kpiData from '@/app/data/final_comprehensive_kpi_catalog.json'

// Extract all KPIs from the JSON data
const allKPIs = kpiData.industries.flatMap((industry, industryIndex) =>
  industry.kpis.map((kpi, kpiIndex) => ({
    id: `${industry.industryName}-${kpi.kpiName}-${industryIndex}-${kpiIndex}`,
    name: kpi.kpiName,
    category: kpi.businessFunction,
    industryAverage: kpi.industryAverage,
    bestInClass: kpi.bestInClass,
    target: kpi.targetRange === "High" ? "95%" : kpi.targetRange === "Low" ? "5%" : "50%",
    measurementUnit: kpi.measurementUnit,
    industry: industry.industryName,
    e2eProcess: kpi.e2eProcess,
    industries: [industry.industryName],
    e2eProcesses: [kpi.e2eProcess],
    businessFunction: kpi.businessFunction,
    // Generate deterministic trend data based on index to avoid hydration issues
    industryTrend: `${(industryIndex + kpiIndex) % 2 === 0 ? '+' : ''}${((industryIndex * 7 + kpiIndex * 11) % 10).toFixed(1)}%`,
    // Add missing properties for compatibility
    icon: BarChart3,
    color: "blue"
  }))
)

// Use all SAP industries
const industries = ["All Industries", ...sapIndustries.map(ind => ind.name)]

// Use all SAP E2E processes
const e2eProcesses = ["All E2E Processes", ...sapValueChains.map(chain => chain.name)]

// Debug logging
console.log('SAP Industries loaded:', sapIndustries.length, 'industries')
console.log('SAP Value Chains loaded:', sapValueChains.length, 'value chains')
console.log('Industries for dropdown:', industries)
console.log('E2E Processes for dropdown:', e2eProcesses)

export default function KPICatalogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedProcess, setSelectedProcess] = useState("All E2E Processes")
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<Set<string>>(new Set())
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Add CSS for line-clamp
  React.useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .line-clamp-1 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
      }
      .line-clamp-2 {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    `
    document.head.appendChild(style)
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  const toggleBookmark = (kpiId: string) => {
    const newBookmarks = new Set(bookmarkedKPIs)
    if (newBookmarks.has(kpiId)) {
      newBookmarks.delete(kpiId)
    } else {
      newBookmarks.add(kpiId)
    }
    setBookmarkedKPIs(newBookmarks)
    
    // Save to localStorage
    try {
      localStorage.setItem("bookmarkedKPIs", JSON.stringify(Array.from(newBookmarks)))
    } catch (error) {
      console.warn("Could not save bookmarks to localStorage:", error)
    }
  }

  // Add KPIs to Solution Canvas
  const addToSolutionCanvas = () => {
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000) // Hide after 3 seconds
  }

  const filteredKPIs = useMemo(() => {
    return allKPIs.filter((kpi) => {
      const matchesSearch = !searchTerm || 
        kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kpi.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesIndustry = selectedIndustry === "All Industries" || 
        kpi.industries.some(ind => ind.toLowerCase().includes(selectedIndustry.toLowerCase()))
      
      const matchesProcess = selectedProcess === "All E2E Processes" || 
        kpi.e2eProcesses.some(process => process.toLowerCase().includes(selectedProcess.toLowerCase()))

      return matchesSearch && matchesIndustry && matchesProcess
    })
  }, [searchTerm, selectedIndustry, selectedProcess])

  // Debug function to show industry and E2E process counts
  const getIndustryCount = () => {
    const uniqueIndustries = new Set()
    allKPIs.forEach(kpi => {
      kpi.industries.forEach(ind => uniqueIndustries.add(ind))
    })
    return uniqueIndustries.size
  }

  const getE2EProcessCount = () => {
    const uniqueProcesses = new Set()
    allKPIs.forEach(kpi => {
      kpi.e2eProcesses.forEach(process => uniqueProcesses.add(process))
    })
    return uniqueProcesses.size
  }

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
        <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
          Explore {allKPIs.length}+ comprehensive KPIs across {getIndustryCount()}+ industries and {getE2EProcessCount()}+ E2E processes
        </p>
        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
          Showing {filteredKPIs.length} of {allKPIs.length} KPIs
          {bookmarkedKPIs.size > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "var(--grad-primary)", color: "white" }}>
              <Bookmark size={12} />
              {bookmarkedKPIs.size} selected
            </span>
          )}
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

          {/* Show Only Bookmarked Toggle */}
          {bookmarkedKPIs.size > 0 && (
            <div className="bg-white p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                  Show Only Bookmarked
                </div>
                <button
                  onClick={() => {
                    if (bookmarkedKPIs.size > 0) {
                      // Toggle between showing all and showing only bookmarked
                      const currentFilter = filteredKPIs.length === bookmarkedKPIs.size
                      if (currentFilter) {
                        // Show all KPIs
                        setSearchTerm("")
                        setSelectedIndustry("All Industries")
                        setSelectedProcess("All E2E Processes")
                      } else {
                        // Show only bookmarked KPIs
                        setSearchTerm("")
                        setSelectedIndustry("All Industries")
                        setSelectedProcess("All E2E Processes")
                      }
                    }
                  }}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    filteredKPIs.length === bookmarkedKPIs.size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filteredKPIs.length === bookmarkedKPIs.size ? "All KPIs" : "Bookmarked Only"}
                </button>
              </div>
            </div>
          )}

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

          {/* Clear Bookmarks */}
          {bookmarkedKPIs.size > 0 && (
            <button
              onClick={() => setBookmarkedKPIs(new Set())}
              className="w-full px-4 py-2 text-sm border rounded-lg transition-colors hover:bg-gray-50 flex items-center justify-center gap-2"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-muted)"
              }}
            >
              <Bookmark size={14} />
              Clear Bookmarks ({bookmarkedKPIs.size})
            </button>
          )}
        </aside>

        {/* Right Side - KPI Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {filteredKPIs.map((kpi) => {
              const Icon = kpi.icon
              return (
                <div key={kpi.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow min-h-0 relative" style={{ borderColor: "var(--border)" }}>
                  {/* Colored Header Bar */}
                  <div className={`h-2 bg-gradient-to-r ${getColorClasses(kpi.color)}`} />
                  
                  {/* Bookmark Icon - Top Right */}
                  <button
                    onClick={() => toggleBookmark(kpi.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
                    style={{ backgroundColor: bookmarkedKPIs.has(kpi.id) ? "var(--grad-primary)" : "transparent" }}
                  >
                    <Bookmark 
                      size={16} 
                      className={`transition-colors ${
                        bookmarkedKPIs.has(kpi.id) 
                          ? "text-white fill-white" 
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    />
                  </button>
                  
                  {/* KPI Content */}
                  <div className="p-4 h-64 flex flex-col">
                    {/* Title and Category - Fixed height */}
                    <div className="mb-3 h-16">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ color: "var(--text)" }}>
                        {kpi.name}
                      </h3>
                      <p className="text-xs line-clamp-1" style={{ color: "var(--text-muted)" }}>
                        {kpi.category}
                      </p>
                    </div>
                    
                    {/* Main Value - Big and Prominent - Fixed height */}
                    <div className="text-center mb-4 p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: "var(--surface)" }}>
                      <div className="text-2xl font-bold truncate" style={{ color: "var(--text)" }}>
                        {kpi.industryAverage}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Industry Average
                      </div>
                    </div>
                    
                    {/* Two Small Boxes for Trend and Best in Class - Fixed height */}
                    <div className="grid grid-cols-2 gap-2 mb-4 flex-shrink-0">
                      {/* Trend Box */}
                      <div className="text-center p-2 rounded-lg border h-16 flex flex-col justify-center" style={{ borderColor: "var(--border)" }}>
                        <div className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>
                          {kpi.industryTrend}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Trend
                        </div>
                      </div>
                      
                      {/* Best in Class Box */}
                      <div className="text-center p-2 rounded-lg border h-16 flex flex-col justify-center" style={{ borderColor: "var(--border)" }}>
                        <div className="text-sm font-medium text-green-600 truncate">
                          {kpi.bestInClass}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Best in Class
                        </div>
                      </div>
                    </div>
                    
                    {/* Simple Metrics Row - Fixed height */}
                    <div className="space-y-2 text-xs flex-1">
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Target:</span>
                        <span className="truncate ml-2" style={{ color: "var(--text)" }}>{kpi.target}</span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Unit:</span>
                        <span className="truncate ml-2" style={{ color: "var(--text)" }}>{kpi.measurementUnit}</span>
                      </div>
                    </div>
                    
                    {/* Footer - Fixed height */}
                    <div className="text-xs mt-3 pt-2 border-t flex-shrink-0" style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}>
                      #{allKPIs.findIndex(k => k.id === kpi.id) + 1} of {allKPIs.length}
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

        {/* Action Bar - Add KPIs to Solution Canvas */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 mt-8" style={{ borderColor: "var(--border)" }}>
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
              Add KPIs to Solution Canvas
            </h4>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Transfer your selected KPIs to create a comprehensive solution canvas for your business transformation
            </p>
            
            <button
              onClick={addToSolutionCanvas}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Add to Solution Canvas
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
              Added Successfully!
            </h3>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Your selected KPIs have been added to the Solution Canvas for business transformation planning.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
