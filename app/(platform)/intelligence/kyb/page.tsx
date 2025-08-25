"use client"

import { useState, useEffect } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock KPI data for dashboard
const enhancedKPIData = {
  "customer-acquisition-cost": {
    id: "customer-acquisition-cost",
    name: "Customer Acquisition Cost",
    process: "Sales & Marketing",
    current: 180,
    target: 150,
    benchmark: 140,
    unit: "$",
    trend: [160, 170, 175, 180],
    status: "at-risk",
    description: "The total cost of acquiring a new customer, including marketing and sales expenses.",
    businessValue: [
      "Optimize marketing spend and improve ROI on customer acquisition campaigns",
      "Identify most cost-effective channels and scale successful acquisition strategies",
    ],
  },
  "net-promoter-score": {
    id: "net-promoter-score",
    name: "Net Promoter Score",
    process: "Customer Experience",
    current: 42,
    target: 50,
    benchmark: 55,
    unit: "Score",
    trend: [38, 40, 41, 42],
    status: "at-risk",
    description: "Measures customer loyalty and likelihood to recommend your product or service.",
    businessValue: [
      "Improve customer retention and reduce churn through enhanced satisfaction",
      "Drive organic growth through positive word-of-mouth and referrals",
    ],
  },
  "revenue-growth-rate": {
    id: "revenue-growth-rate",
    name: "Revenue Growth Rate",
    process: "Financial Performance",
    current: 15,
    target: 12,
    benchmark: 18,
    unit: "%",
    trend: [10, 12, 14, 15],
    status: "on-track",
    description: "Percentage increase in revenue over a specific period, indicating business expansion.",
    businessValue: [
      "Track business expansion and market penetration effectiveness",
      "Validate product-market fit and scaling strategies",
    ],
  },
  "employee-satisfaction": {
    id: "employee-satisfaction",
    name: "Employee Satisfaction",
    process: "Human Resources",
    current: 8.2,
    target: 8.5,
    benchmark: 8.0,
    unit: "/10",
    trend: [7.8, 8.0, 8.1, 8.2],
    status: "on-track",
    description: "Average satisfaction score of employees.",
    businessValue: [
      "Boost productivity and morale through employee engagement",
      "Reduce turnover and improve recruitment efforts",
    ],
  },
  "system-uptime": {
    id: "system-uptime",
    name: "System Uptime",
    process: "IT Operations",
    current: 99.2,
    target: 99.9,
    benchmark: 99.5,
    unit: "%",
    trend: [98.8, 99.0, 99.1, 99.2],
    status: "critical",
    description: "Percentage of time the system is operational.",
    businessValue: [
      "Ensure high availability of services to customers",
      "Minimize downtime and improve user experience",
    ],
  },
  "time-to-resolution": {
    id: "time-to-resolution",
    name: "Time to Resolution",
    process: "Support Services",
    current: 4.2,
    target: 2.0,
    benchmark: 3.5,
    unit: "hours",
    trend: [5.0, 4.8, 4.5, 4.2],
    status: "critical",
    description: "Average time taken to resolve customer issues.",
    businessValue: [
      "Enhance customer service efficiency and satisfaction",
      "Reduce operational costs associated with unresolved issues",
    ],
  },
}

const industries = ["Financial Services", "Technology", "Healthcare", "Manufacturing"]

// Function to get bookmarked KPIs from localStorage
const getBookmarkedKPIs = () => {
  if (typeof window !== "undefined") {
    const bookmarked = localStorage.getItem("bookmarkedKPIs")
    const bookmarkedIds = bookmarked ? JSON.parse(bookmarked) : []
    return bookmarkedIds.map((id: string) => enhancedKPIData[id as keyof typeof enhancedKPIData]).filter(Boolean)
  }
  return []
}

// Function to group KPIs by process
const groupKPIsByProcess = (kpis: any[]) => {
  const grouped = kpis.reduce((acc, kpi) => {
    const process = kpi.process || "Other"
    if (!acc[process]) {
      acc[process] = []
    }
    acc[process].push(kpi)
    return acc
  }, {})

  return Object.entries(grouped).map(([process, kpis]) => ({
    process,
    count: (kpis as any[]).length,
    onTrack: (kpis as any[]).filter((k) => k.status === "on-track").length,
    atRisk: (kpis as any[]).filter((k) => k.status === "at-risk").length,
    critical: (kpis as any[]).filter((k) => k.status === "critical").length,
  }))
}

export default function KnowYourBusinessPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("Financial Services")
  // State for bookmarked KPIs
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<any[]>([])

  useEffect(() => {
    setBookmarkedKPIs(getBookmarkedKPIs())
  }, [])

  const processData = groupKPIsByProcess(bookmarkedKPIs)
  const chartColors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "var(--green-600)"
      case "at-risk":
        return "var(--orange-600)"
      case "critical":
        return "var(--red-600)"
      default:
        return "var(--text-muted)"
    }
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
            Know Your Business
          </h1>
          <p className="mt-2 text-lg" style={{ color: "var(--text-muted)" }}>
            Your selected KPIs snapshot & performance analysis
          </p>
        </div>

        {bookmarkedKPIs.length > 0 && (
          <div className="mb-8">
            <div
              className="p-6 rounded-2xl border shadow-lg"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text)" }}>
                KPI Performance by Process
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Process Distribution Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                    Process Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={processData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ process, count }) => `${process}: ${count}`}
                      >
                        {processData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Status by Process Chart */}
                <div>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                    Status by Process
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={processData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="process" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="onTrack" stackId="a" fill="#10B981" name="On Track" />
                      <Bar dataKey="atRisk" stackId="a" fill="#F59E0B" name="At Risk" />
                      <Bar dataKey="critical" stackId="a" fill="#EF4444" name="Critical" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            className="p-6 rounded-xl border shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)",
            }}
          >
            <div className="text-3xl font-bold" style={{ color: "var(--text)" }}>
              {bookmarkedKPIs.length}
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Selected KPIs
            </div>
          </div>

          <div
            className="p-6 rounded-xl border shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
            }}
          >
            <div className="text-3xl font-bold text-green-600">
              {bookmarkedKPIs.filter((k) => k.status === "on-track").length}
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              On Track
            </div>
          </div>

          <div
            className="p-6 rounded-xl border shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              background: "linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)",
            }}
          >
            <div className="text-3xl font-bold text-orange-600">
              {bookmarkedKPIs.filter((k) => k.status === "at-risk").length}
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              At Risk
            </div>
          </div>

          <div
            className="p-6 rounded-xl border shadow-sm"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)",
            }}
          >
            <div className="text-3xl font-bold text-red-600">
              {bookmarkedKPIs.filter((k) => k.status === "critical").length}
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Critical
            </div>
          </div>
        </div>

        {bookmarkedKPIs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedKPIs.map((kpi) => (
              <div
                key={kpi.id}
                className="p-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: "var(--text)" }}>
                      {kpi.name}
                    </h3>
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-700)" }}
                    >
                      {kpi.process}
                    </span>
                  </div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getStatusColor(kpi.status) }} />
                </div>

                {/* Enhanced Gauge Visualization */}
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-3">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--border)"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={getStatusColor(kpi.status)}
                          strokeWidth="3"
                          strokeDasharray={`${getProgressPercentage(kpi.current, kpi.target)}, 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold" style={{ color: "var(--text)" }}>
                          {kpi.current}
                        </span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {kpi.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Metrics */}
                <div className="space-y-3 mb-6">
                  <div
                    className="flex justify-between items-center p-2 rounded-lg"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      Current:
                    </span>
                    <span className="font-bold" style={{ color: "var(--text)" }}>
                      {kpi.current} {kpi.unit}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-2 rounded-lg"
                    style={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      Target:
                    </span>
                    <span className="font-bold" style={{ color: "var(--text)" }}>
                      {kpi.target} {kpi.unit}
                    </span>
                  </div>
                  <div
                    className="flex justify-between items-center p-2 rounded-lg"
                    style={{ backgroundColor: "rgba(245, 158, 11, 0.05)" }}
                  >
                    <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                      Industry:
                    </span>
                    <span className="font-bold" style={{ color: "var(--text)" }}>
                      {kpi.benchmark} {kpi.unit}
                    </span>
                  </div>
                </div>

                {/* Enhanced Action Button */}
                <button
                  className="w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    color: "white",
                  }}
                  onClick={() => console.log(`Add ${kpi.name} to Focus Backlog`)}
                >
                  <PlusIcon className="h-4 w-4" />
                  Add to Focus Backlog
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
              No KPIs Selected
            </h3>
            <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
              Go to the KPI Catalog and bookmark the metrics you want to track
            </p>
            <button
              className="px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                color: "white",
              }}
              onClick={() => (window.location.href = "/intelligence")}
            >
              Browse KPI Catalog
            </button>
          </div>
        )}

        {/* Industry Selector */}
        <div className="mb-6">
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-4 py-2 rounded-lg border text-sm font-medium"
            style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
