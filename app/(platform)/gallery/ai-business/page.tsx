"use client"

import { useState } from "react"
import { Brain, Target, BarChart3, Zap, Users, Building } from "lucide-react"

export default function AIBusinessPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Brain },
    { id: "intelligent-automation", label: "Intelligent Automation", icon: Zap },
    { id: "predictive-analytics", label: "Predictive Analytics", icon: BarChart3 },
    { id: "customer-intelligence", label: "Customer Intelligence", icon: Users },
    { id: "business-optimization", label: "Business Optimization", icon: Target },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-default)" }}>
              AI Business
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Business-focused AI solutions and use cases for enterprise transformation
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 rounded-lg" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    background: isActive ? "var(--grad-primary)" : "transparent",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Intelligent Automation
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Automate complex business processes with AI-powered decision making
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Process automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Smart workflows</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Decision automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Cognitive RPA</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Predictive Analytics
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Forecast trends and make data-driven business decisions
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Trend forecasting</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Risk assessment</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Demand prediction</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Performance optimization</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Customer Intelligence
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Understand customer behavior and personalize experiences
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Behavioral analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Personalization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Sentiment analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Churn prediction</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Business Optimization
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Optimize business operations and resource allocation
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Resource optimization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Cost reduction</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Efficiency improvement</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Quality enhancement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Industry Use Cases */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-default)" }}>
              Industry Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Retail & E-commerce
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Personalize shopping experiences and optimize inventory
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>30% increase in conversion</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>25% reduction in inventory costs</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>40% improvement in customer satisfaction</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Manufacturing
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Optimize production processes and predict maintenance needs
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>20% increase in productivity</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>35% reduction in downtime</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Predictive maintenance</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Financial Services
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Enhance risk management and fraud detection
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>90% fraud detection accuracy</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>60% faster risk assessment</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Real-time monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
