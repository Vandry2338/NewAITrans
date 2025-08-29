"use client"

import React, { useState, useEffect } from 'react'
import { ChevronDown, Building2, Factory, Heart, Banknote, ShoppingCart, DollarSign, Settings, TrendingUp, Filter, BarChart3, Bookmark, CheckCircle } from 'lucide-react'
import Image from 'next/image'

// Extended KPI type for this page
type KPI = {
  kpiId?: string;
  kpiName: string;
  businessFunction?: string;
  e2eProcess?: string;
  industry?: string;
  measurementUnit?: string;
  targetRange?: string;
  industryAverage?: string | number;
  bestInClass?: string | number;
  target?: string;
  icon?: any;
  color?: string;
  industryTrend?: string;
  isBookmarked?: boolean;
};

// Industry and process options (same as KPI catalog)
const INDUSTRIES = [
  "All Industries",
  "Aerospace and Defense",
  "Agribusiness", 
  "Automotive",
  "Banking",
  "Chemicals",
  "Consumer Products",
  "Energy",
  "Engineering and Construction",
  "Financial Services",
  "Food and Beverage",
  "Healthcare",
  "High Tech",
  "Industrial Manufacturing",
  "Life Sciences",
  "Mining",
  "Oil and Gas",
  "Professional Services",
  "Public Sector",
  "Retail",
  "Telecommunications",
  "Transportation and Logistics",
  "Utilities"
];

const PROCESSES = [
  "All Processes",
  "Plan-to-Fulfill",
  "Order-to-Cash",
  "Source-to-Pay",
  "Customer Interaction Management",
  "Workforce Management",
  "Financial Performance",
  "Service Delivery and Maintenance",
  "Network Management",
  "Customer Support",
  "Customer Relationship Management",
  "Customer Experience Management",
  "Customer Retention",
  "Customer Acquisition",
  "Investment Management",
  "Network Performance",
  "Network Capacity Management",
  "Billing & Collections",
  "Billing & Revenue Management",
  "Meter-to-Bill",
  "Grid Reliability",
  "Power Generation",
  "Infrastructure Maintenance",
  "Gas Distribution",
  "Water Distribution",
  "Energy Generation & Supply",
  "Water Treatment & Distribution"
];

const REGIONS = [
  "APJ (Asia Pacific & Japan)",
  "EMEA (Europe, Middle East & Africa)",
  "NA (North America)",
  "LATAM (Latin America)",
  "Global"
];

// Extended KPI data including the new 30 Signavio-style process KPIs
const EXTENDED_KPI_DATA = [
  /* ======================= UTILITIES (15) - NEW SIGNAVIO STYLE ======================= */
  {
    kpiName: "Process Cycle Time",
    businessFunction: "Operations",
    e2eProcess: "Grid Reliability",
    measurementUnit: "hours",
    industryAverage: "24",
    bestInClass: "≤12",
    targetRange: "Low",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Efficiency Ratio",
    businessFunction: "Operations",
    e2eProcess: "Power Generation",
    measurementUnit: "%",
    industryAverage: "78%",
    bestInClass: "≥92%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Automation Level",
    businessFunction: "Operations",
    e2eProcess: "Meter-to-Bill",
    measurementUnit: "%",
    industryAverage: "65%",
    bestInClass: "≥85%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Compliance Rate",
    businessFunction: "Operations",
    e2eProcess: "Water Treatment & Distribution",
    measurementUnit: "%",
    industryAverage: "89%",
    bestInClass: "≥98%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Cost per Transaction",
    businessFunction: "Finance",
    e2eProcess: "Billing & Collections",
    measurementUnit: "$",
    industryAverage: "12.50",
    bestInClass: "≤8.00",
    targetRange: "Low",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Error Rate",
    businessFunction: "Operations",
    e2eProcess: "Grid Reliability",
    measurementUnit: "%",
    industryAverage: "3.2%",
    bestInClass: "≤1.0%",
    targetRange: "Low",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Throughput",
    businessFunction: "Operations",
    e2eProcess: "Energy Management",
    measurementUnit: "transactions/hour",
    industryAverage: "150",
    bestInClass: "≥250",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Lead Time",
    businessFunction: "Operations",
    e2eProcess: "Infrastructure Maintenance",
    measurementUnit: "days",
    industryAverage: "14",
    bestInClass: "≤7",
    targetRange: "Low",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Quality Score",
    businessFunction: "Operations",
    e2eProcess: "Water Treatment & Distribution",
    measurementUnit: "score",
    industryAverage: "7.8",
    bestInClass: "≥9.0",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Resource Utilization",
    businessFunction: "Operations",
    e2eProcess: "Power Generation",
    measurementUnit: "%",
    industryAverage: "72%",
    bestInClass: "≥88%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process SLA Achievement",
    businessFunction: "Operations",
    e2eProcess: "Grid Reliability",
    measurementUnit: "%",
    industryAverage: "87%",
    bestInClass: "≥95%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Rework Rate",
    businessFunction: "Operations",
    e2eProcess: "Billing & Collections",
    measurementUnit: "%",
    industryAverage: "8.5%",
    bestInClass: "≤3.0%",
    targetRange: "Low",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Standardization Level",
    businessFunction: "Operations",
    e2eProcess: "Workforce Management",
    measurementUnit: "%",
    industryAverage: "76%",
    bestInClass: "≥90%",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Innovation Index",
    businessFunction: "Operations",
    e2eProcess: "Energy Generation & Supply",
    measurementUnit: "score",
    industryAverage: "6.2",
    bestInClass: "≥8.5",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Customer Impact Score",
    businessFunction: "Customer Service",
    e2eProcess: "Customer Interaction Management",
    measurementUnit: "score",
    industryAverage: "7.1",
    bestInClass: "≥8.8",
    targetRange: "High",
    industry: "Utilities",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },

  /* ================== TELECOMMUNICATIONS (15) - NEW SIGNAVIO STYLE ================== */
  {
    kpiName: "Process Response Time",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "ms",
    industryAverage: "45",
    bestInClass: "≤20",
    targetRange: "Low",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Availability Rate",
    businessFunction: "Operations",
    e2eProcess: "Network Performance",
    measurementUnit: "%",
    industryAverage: "99.7%",
    bestInClass: "≥99.95%",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Scalability Index",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "score",
    industryAverage: "7.3",
    bestInClass: "≥8.7",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Optimization Level",
    businessFunction: "Operations",
    e2eProcess: "Network Performance",
    measurementUnit: "%",
    industryAverage: "68%",
    bestInClass: "≥85%",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Maturity Score",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "score",
    industryAverage: "6.8",
    bestInClass: "≥8.2",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Agility Index",
    businessFunction: "Operations",
    e2eProcess: "Network Performance",
    measurementUnit: "score",
    industryAverage: "6.5",
    bestInClass: "≥8.0",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Efficiency Gap",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "%",
    industryAverage: "22%",
    bestInClass: "≤8%",
    targetRange: "Low",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Performance Index",
    businessFunction: "Operations",
    e2eProcess: "Network Performance",
    measurementUnit: "score",
    industryAverage: "7.0",
    bestInClass: "≥8.5",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Reliability Score",
    businessFunction: "Operations",
    e2eProcess: "Network Reliability",
    measurementUnit: "score",
    industryAverage: "8.1",
    bestInClass: "≥9.2",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Improvement Rate",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "%",
    industryAverage: "12%",
    bestInClass: "≥25%",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Cost Efficiency",
    businessFunction: "Finance",
    e2eProcess: "Financial Performance",
    measurementUnit: "score",
    industryAverage: "6.9",
    bestInClass: "≥8.3",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Time to Market",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "days",
    industryAverage: "45",
    bestInClass: "≤25",
    targetRange: "Low",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Customer Satisfaction",
    businessFunction: "Customer Service",
    e2eProcess: "Customer Experience Management",
    measurementUnit: "score",
    industryAverage: "7.4",
    bestInClass: "≥8.6",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Innovation Rate",
    businessFunction: "Operations",
    e2eProcess: "Network Management",
    measurementUnit: "%",
    industryAverage: "18%",
    bestInClass: "≥35%",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  },
  {
    kpiName: "Process Excellence Score",
    businessFunction: "Operations",
    e2eProcess: "Network Performance",
    measurementUnit: "score",
    industryAverage: "7.2",
    bestInClass: "≥8.8",
    targetRange: "High",
    industry: "Telecommunications",
    icon: BarChart3,
    color: "blue",
    isBookmarked: false
  }
];

export default function KnowYourBusinessContent() {
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedProcess, setSelectedProcess] = useState("All Processes")
  const [selectedKPIs, setSelectedKPIs] = useState<KPI[]>([])
  const [filteredKPIs, setFilteredKPIs] = useState<KPI[]>([])
  const [selectedRegion, setSelectedRegion] = useState("APJ (Asia Pacific & Japan)")
  const [includeCompetitorAnalysis, setIncludeCompetitorAnalysis] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<Set<string>>(new Set())

  // Get selected KPIs from localStorage (where KPI Catalog saves them)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("bookmarkedKPIs")
        if (saved) {
          const bookmarkedIds = JSON.parse(saved)
          // Create simple KPI objects from the IDs
          const kpis = bookmarkedIds.map((id: string, index: number) => ({
            kpiId: id,
            kpiName: `KPI ${id.slice(-3)}`,
            businessFunction: ["Finance", "Operations", "Customer Service", "HR", "Sales"][index % 5],
            e2eProcess: ["Plan-to-Fulfill", "Order-to-Cash", "Source-to-Pay", "Customer Interaction Management", "Workforce Management"][index % 5],
            industry: ["Manufacturing", "Retail", "Banking", "Healthcare", "Technology"][index % 5],
            measurementUnit: "%",
            targetRange: ["Low", "Medium", "High"][index % 3],
            icon: BarChart3,
            color: "blue"
          }))
          setSelectedKPIs(kpis)
        }
      } catch (error) {
        console.warn("Could not load selected KPIs:", error)
      }
    }
  }, [])

  // Filter KPIs based on selected industry and process
  useEffect(() => {
    let filtered: KPI[] = []
    
    // Only show KPIs if user has actively selected something (not default "All" values)
    if (selectedIndustry !== "All Industries" || selectedProcess !== "All Processes") {
      filtered = EXTENDED_KPI_DATA
      
      if (selectedIndustry !== "All Industries") {
        filtered = filtered.filter(kpi => kpi.industry === selectedIndustry)
      }
      
      if (selectedProcess !== "All Processes") {
        filtered = filtered.filter(kpi => kpi.e2eProcess === selectedProcess)
      }
    }
    
    setFilteredKPIs(filtered)
  }, [selectedIndustry, selectedProcess])

  // Toggle bookmark for a KPI
  const toggleBookmark = (kpiName: string, industry: string) => {
    const key = `${kpiName}::${industry}`
    setBookmarkedKPIs(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  // Add KPIs to Customer Canvas
  const addToCustomerCanvas = () => {
    setShowConfirmation(true)
    setTimeout(() => setShowConfirmation(false), 3000) // Hide after 3 seconds
  }

  // Remove a KPI from the selection
  const removeKPI = (kpiId: string) => {
    setSelectedKPIs(prev => prev.filter(kpi => kpi.kpiId !== kpiId))
    // Also remove from localStorage
    try {
      const saved = localStorage.getItem("bookmarkedKPIs")
      if (saved) {
        const bookmarkedIds = JSON.parse(saved)
        const updatedIds = bookmarkedIds.filter((id: string) => id !== kpiId)
        localStorage.setItem("bookmarkedKPIs", JSON.stringify(updatedIds))
      }
    } catch (error) {
      console.warn("Could not update localStorage:", error)
    }
  }

  // Clear all selections
  const clearAll = () => {
    setSelectedKPIs([])
    localStorage.removeItem("bookmarkedKPIs")
  }

  return (
    <div className="space-y-8">
      {/* Main Content - Left Wording, Right Video */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Wording */}
        <div className="space-y-8">
          {/* First Section */}
          <div className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: "var(--border)" }}>
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-sap-72)', color: "var(--text)" }}>
              Supporting Your Transformation Journey, Every Step of the Way.
            </h2>
            
            <div className="space-y-4">
              <p className="text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Modernize your operations and confidently de-risk your business transformation. Our platform empowers you to:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-blue-600 mb-1">Improve Continuously:</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Gain the data-driven insights needed to enhance how your business runs, every single day.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-blue-600 mb-1">Accelerate with AI:</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Leverage generative AI to fast-track your transformation goals and unlock new efficiencies.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-1 bg-blue-600 rounded-full"></div>
                  <div>
                    <p className="font-bold text-blue-600 mb-1">Achieve Process Excellence:</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Discover powerful solutions for optimizing your workflows from end to end.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Video */}
        <div className="space-y-8">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/videos/UI-Web-Animation-01-3 (1).mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          {/* BPM Tool Logos */}
          <div className="flex justify-between items-center px-4">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <Image src="/assets/walkme-logo.png" alt="WalkMe" width={64} height={64} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <Image src="/assets/signavio-logo.jpeg" alt="SAP Signavio" width={64} height={64} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <Image src="/assets/celonis.png" alt="Celonis" width={64} height={64} />
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-24 h-24 mx-auto flex items-center justify-center">
                <Image src="/assets/infosysbpm.png" alt="Infosys BPM" width={64} height={64} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-lg font-semibold mb-6 text-center" style={{ color: "var(--text)" }}>
          Filter Your Results
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Industry Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-3 text-center" style={{ color: "var(--text)" }}>
              Industry
            </label>
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                  backgroundColor: "var(--surface)"
                }}
              >
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={20} style={{ color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>

          {/* Process Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-3 text-center" style={{ color: "var(--text)" }}>
              E2E Process
            </label>
            <div className="relative">
              <select
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text)",
                  backgroundColor: "var(--surface)"
                }}
              >
                {PROCESSES.map((process) => (
                  <option key={process} value={process}>{process}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown size={20} style={{ color: "var(--text-muted)" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Results Section */}
      {filteredKPIs.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              {filteredKPIs.length} KPIs Found
            </h3>
            <div className="text-sm" style={{ color: "var(--text-muted)" }}>
              {selectedIndustry !== "All Industries" && `Industry: ${selectedIndustry}`}
              {selectedProcess !== "All Processes" && ` • Process: ${selectedProcess}`}
            </div>
          </div>
          
          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredKPIs.map((kpi, index) => {
              const isBookmarked = bookmarkedKPIs.has(`${kpi.kpiName}::${kpi.industry}`)
              
              // Calculate gauge percentage based on industry average vs best in class
              const getGaugePercentage = () => {
                if (typeof kpi.industryAverage === 'string' && kpi.industryAverage.includes('%')) {
                  return parseFloat(kpi.industryAverage.replace('%', ''))
                }
                if (typeof kpi.industryAverage === 'number') {
                  return kpi.industryAverage
                }
                return 75 // Default fallback
              }
              
              const gaugePercentage = getGaugePercentage()
              const gaugeColor = gaugePercentage >= 80 ? '#10B981' : gaugePercentage >= 60 ? '#F59E0B' : '#EF4444'
              
              return (
                <div key={index} className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition-all duration-300 relative" style={{ borderColor: "var(--border)" }}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-2xl" />
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(kpi.kpiName, kpi.industry!)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    style={{ color: isBookmarked ? "#3B82F6" : "var(--text-muted)" }}
                  >
                    <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                  </button>
                  
                  {/* KPI Header */}
                  <div className="mb-4 pr-12">
                    <h4 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: "var(--text)" }}>
                      {kpi.kpiName}
                    </h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {kpi.businessFunction} • {kpi.e2eProcess}
                    </p>
                  </div>
                  
                  {/* Circular Gauge Chart */}
                  <div className="text-center mb-4">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      {/* Gauge Background */}
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background Circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                        />
                        {/* Gauge Fill */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={gaugeColor}
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - gaugePercentage / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Center Value */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold" style={{ color: gaugeColor }}>
                            {gaugePercentage}%
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Current
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar Section */}
                  <div className="space-y-3">
                    {/* Main Value Display */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {kpi.industryAverage}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Industry Average
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span style={{ color: "var(--text-muted)" }}>0</span>
                        <span style={{ color: "var(--text-muted)" }}>Target: {kpi.targetRange === "High" ? "95%" : kpi.targetRange === "Low" ? "5%" : "50%"}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${gaugePercentage}%`,
                            backgroundColor: gaugeColor
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Bottom Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="text-center p-2 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                        <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                          {kpi.bestInClass}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Best in Class
                        </div>
                      </div>
                      <div className="text-center p-2 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                        <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>
                          {kpi.measurementUnit}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          Unit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action Bar - Add KPIs to Customer Canvas */}
          <div className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: "var(--border)" }}>
            <div className="text-center mb-6">
              <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                Add KPIs to Customer Canvas
              </h4>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Configure your KPI analysis with regional and competitive insights
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {/* Competitor Analysis Toggle */}
              <button
                onClick={() => setIncludeCompetitorAnalysis(!includeCompetitorAnalysis)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  includeCompetitorAnalysis 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {includeCompetitorAnalysis ? '✓' : '+'} Add Competitor Analysis
              </button>
              
              {/* Region Dropdown */}
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-6 py-3 border rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text)",
                    backgroundColor: "var(--surface)"
                  }}
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={20} style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
              
              {/* Add Button */}
              <button
                onClick={addToCustomerCanvas}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

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
              Your KPIs have been added to the Customer Canvas with {includeCompetitorAnalysis ? 'competitor analysis' : 'standard analysis'} for {selectedRegion}.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
