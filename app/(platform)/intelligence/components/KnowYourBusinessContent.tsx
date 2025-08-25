"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function KnowYourBusinessContent() {
  const [bookmarkedKPIs, setBookmarkedKPIs] = useState<string[]>([])
  const [kpiData, setKpiData] = useState<any[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bookmarkedKPIs")
      if (saved) {
        setBookmarkedKPIs(JSON.parse(saved))
      }
    }
  }, [])

  useEffect(() => {
    if (bookmarkedKPIs.length > 0) {
      const mockData = bookmarkedKPIs.map((id, index) => ({
        id,
        name: `KPI ${id.slice(-3)}`,
        process: ["Sales", "Marketing", "Operations", "Finance", "HR"][index % 5],
        current: Math.floor(Math.random() * 100) + 50,
        target: Math.floor(Math.random() * 50) + 100,
        unit: "%",
        trend: Math.random() > 0.5 ? "up" : "down",
      }))
      setKpiData(mockData)
    }
  }, [bookmarkedKPIs])

  const processData = kpiData.reduce((acc, kpi) => {
    const existing = acc.find((item) => item.process === kpi.process)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ process: kpi.process, count: 1 })
    }
    return acc
  }, [] as any[])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-8">
      {bookmarkedKPIs.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Selected KPIs Overview</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">KPIs by Process</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={processData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="process" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Process Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={processData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ process, percent }) => `${process} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {processData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi) => {
          const progress = kpi.target ? (kpi.current / kpi.target) * 100 : 0
          const status = progress >= 100 ? "excellent" : progress >= 80 ? "good" : "needs-attention"

          return (
            <div
              key={kpi.id}
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{kpi.name}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {kpi.process}
                    </span>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status === "excellent" ? "bg-green-500" : status === "good" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {kpi.current}
                      {kpi.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Target</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {kpi.target}
                      {kpi.unit}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        status === "excellent"
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : status === "good"
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : "bg-gradient-to-r from-red-400 to-red-600"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]">
                  View Analytics
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {bookmarkedKPIs.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No KPIs Selected</h3>
            <p className="text-gray-500 mb-6">
              Go to the KPI Catalog and bookmark the metrics you want to track for your business.
            </p>
            <button
              onClick={() => (window.location.href = "/intelligence")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse KPI Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
