"use client"

import { useState } from "react"
import { Users, ArrowRight, Target, BarChart3, Zap, MessageSquare } from "lucide-react"

export default function WalkMePage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "digital-adoption", label: "Digital Adoption", icon: ArrowRight },
    { id: "user-guidance", label: "User Guidance", icon: Target },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "automation", label: "Automation", icon: Zap },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-default)" }}>
              WalkMe
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Digital adoption platform and user guidance solutions for seamless user experience
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
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Digital Adoption Platform
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Accelerate user adoption of digital tools and processes
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Interactive walkthroughs</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Contextual guidance</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>User onboarding</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Feature discovery</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  User Guidance Solutions
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Provide real-time assistance and training to users
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Step-by-step guidance</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Interactive tutorials</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Smart tips</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Help content</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Performance Analytics
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Track user engagement and identify improvement opportunities
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>User behavior insights</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Adoption metrics</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Performance tracking</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>ROI measurement</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Workflow Automation
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Automate repetitive tasks and streamline user workflows
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Task automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Process optimization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Efficiency gains</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Error reduction</span>
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
                  Enterprise Software
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Accelerate user adoption of complex enterprise applications
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>40% faster user onboarding</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>60% reduction in support tickets</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>85% user satisfaction</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  E-commerce
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Guide customers through complex purchasing processes
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>25% increase in conversion</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>30% reduction in cart abandonment</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Improved user experience</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Healthcare
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Train medical staff on new digital health systems
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>50% faster training completion</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>90% compliance rate</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Reduced training costs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
