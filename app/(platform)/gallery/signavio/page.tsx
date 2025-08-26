"use client"

import { useState } from "react"
import { Cog, Workflow, BarChart3, Users, Building, Target, Zap } from "lucide-react"

export default function SignavioPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Cog },
    { id: "process-mining", label: "Process Mining", icon: Workflow },
    { id: "bpm", label: "Business Process Management", icon: BarChart3 },
    { id: "collaboration", label: "Collaboration", icon: Users },
    { id: "analytics", label: "Analytics", icon: Target },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-teal-500 to-blue-500">
              <Cog className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-default)" }}>
              Signavio
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Process mining and business process management solutions for enterprise transformation
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
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500">
                  <Workflow className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Process Mining
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Discover, analyze, and optimize business processes with AI-powered insights
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Process discovery</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Performance analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Bottleneck identification</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Compliance monitoring</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Business Process Management
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Design, model, and execute business processes with visual tools
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Visual process modeling</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Workflow automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Process governance</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Version control</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Collaboration Tools
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Enable teams to work together on process improvement initiatives
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Real-time collaboration</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Comment and feedback</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Approval workflows</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Team management</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-500">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Advanced Analytics
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Gain insights into process performance and optimization opportunities
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Performance metrics</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Trend analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Predictive insights</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Custom dashboards</span>
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
                  Manufacturing
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Optimize production processes and reduce cycle times
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>15% cycle time reduction</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>20% efficiency improvement</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>30% cost savings</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Healthcare
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Streamline patient care workflows and improve outcomes
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>25% faster patient processing</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>40% reduction in wait times</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Improved compliance</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Financial Services
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Automate compliance processes and reduce operational risk
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>50% faster compliance checks</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>90% error reduction</div>
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
