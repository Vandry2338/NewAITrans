"use client"

import { useState } from "react"
import { Rocket, Code, Zap, Target, BarChart3, Users } from "lucide-react"

export default function DevelopmentAcceleratorsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Rocket },
    { id: "code-templates", label: "Code Templates", icon: Code },
    { id: "development-tools", label: "Development Tools", icon: Zap },
    { id: "best-practices", label: "Best Practices", icon: Target },
    { id: "frameworks", label: "Frameworks", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-default)" }}>
              Development Accelerators
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Development tools, templates and accelerators for faster enterprise application development
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
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Code Templates
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Pre-built code templates for common enterprise patterns
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>API templates</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Database models</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Authentication patterns</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Testing frameworks</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Development Tools
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Automated tools to streamline development workflows
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Code generators</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Scaffolding tools</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Build automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Deployment scripts</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Best Practices
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Proven development patterns and methodologies
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Architecture patterns</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Security guidelines</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Performance optimization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Testing strategies</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Frameworks
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Enterprise-grade development frameworks and libraries
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Backend frameworks</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Frontend libraries</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Data access layers</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Integration patterns</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Industry Use Cases */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-default)" }}>
              Development Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Faster Development
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Accelerate application development with pre-built components
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>50% faster development</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Reduced boilerplate</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Consistent patterns</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Quality Assurance
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Built-in quality checks and testing frameworks
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Automated testing</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Code quality tools</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Security scanning</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Team Productivity
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Standardized development practices across teams
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Reduced onboarding time</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Consistent code style</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Knowledge sharing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
