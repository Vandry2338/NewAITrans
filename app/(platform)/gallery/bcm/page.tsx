"use client"

import { useState } from "react"
import { Grid3X3, ArrowLeft, Search, Filter, Target, Workflow, Building2, Users, Shield, Globe, Factory, Car, Banknote, Heart, GraduationCap, Truck, Wifi, Lightbulb, ShoppingBag, Pickaxe, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { sapValueChains } from "@/app/data/valueChains"
import { sapIndustries } from "@/app/data/industries"

export default function BcmPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"capabilities" | "domains" | "maturity">("capabilities")

  const getCapabilityIcon = (capabilityKey: string) => {
    const iconMap: { [key: string]: any } = {
      "S2P": Factory,
      "FIN": Banknote,
      "A2D": Shield,
      "I2M": Lightbulb,
      "R2R": Users,
      "L2C": Target,
      "P2F": Workflow,
      "GOV": Globe,
    }
    return iconMap[capabilityKey] || Target
  }

  const getCapabilityColor = (capabilityKey: string) => {
    const colorMap: { [key: string]: string } = {
      "S2P": "from-blue-500 to-cyan-500",
      "FIN": "from-green-500 to-emerald-500",
      "A2D": "from-purple-500 to-pink-500",
      "I2M": "from-yellow-500 to-orange-500",
      "R2R": "from-indigo-500 to-blue-500",
      "L2C": "from-red-500 to-pink-500",
      "P2F": "from-teal-500 to-green-500",
      "GOV": "from-gray-500 to-slate-500",
    }
    return colorMap[capabilityKey] || "from-gray-500 to-slate-500"
  }

  const filteredCapabilities = sapValueChains.filter(capability =>
    capability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    capability.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    capability.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getIndustriesUsingCapability = (capabilityKey: string) => {
    return sapIndustries.filter(industry => 
      industry.processKeys.includes(capabilityKey as any)
    )
  }

  const renderCapabilitiesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Business Capabilities ({filteredCapabilities.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search capabilities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCapabilities.map((capability) => {
          const IconComponent = getCapabilityIcon(capability.key)
          const gradient = getCapabilityColor(capability.key)
          const industriesUsingCapability = getIndustriesUsingCapability(capability.key)

          return (
            <div
              key={capability.id}
              className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                    {capability.name} Capabilities
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    Core business capabilities for {capability.name.toLowerCase()} processes
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      <strong>Process Key:</strong> {capability.key}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      <strong>Industries:</strong> {industriesUsingCapability.length}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      <strong>Focus:</strong> {capability.sapLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderDomainsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Capability Domains
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customer Management Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Customer Management
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Customer acquisition, retention, and relationship management capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> L2C, Customer Service
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> High
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operations Management Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Operations Management
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Core business operations and process management capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> P2F, S2P, A2D
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> High
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology & Innovation Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Technology & Innovation
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Technology strategy, innovation, and digital transformation capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> I2M, GOV
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> Medium
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Management Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
              <Banknote className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Financial Management
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Financial planning, accounting, and reporting capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> FIN, Record to Report
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> High
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Human Resources Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Human Resources
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Workforce management and employee lifecycle capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> R2R, Talent Management
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> High
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Governance & Compliance Domain */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-gray-500 to-slate-500 shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Governance & Compliance
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Risk management, compliance, and governance capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Capabilities:</strong> GOV, Risk Management
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Maturity:</strong> Medium
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderMaturityView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Capability Maturity Assessment
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search maturity levels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* High Maturity Capabilities */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                High Maturity (Level 4-5)
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Optimized and continuously improving capabilities
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Examples:</strong> FIN, R2R, L2C
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Characteristics:</strong> Measured, Optimized
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medium Maturity Capabilities */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg">
              <Workflow className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Medium Maturity (Level 2-3)
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Defined and managed capabilities with room for improvement
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Examples:</strong> I2M, GOV, A2D
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Characteristics:</strong> Defined, Managed
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emerging Capabilities */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Emerging Capabilities (Level 1)
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Initial and ad-hoc capabilities requiring development
              </p>
              <div className="space-y-2">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Examples:</strong> AI/ML, Blockchain, IoT
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  <strong>Characteristics:</strong> Initial, Ad-hoc
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          style={{ color: "var(--text-default)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gallery</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
            Business Capability Model (BCM) Categories
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Strategic business capabilities mapped to SAP solutions and industry best practices
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 p-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
            <button
              onClick={() => setSelectedCategory("capabilities")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "capabilities"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Business Capabilities
            </button>
            <button
              onClick={() => setSelectedCategory("domains")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "domains"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Capability Domains
            </button>
            <button
              onClick={() => setSelectedCategory("maturity")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "maturity"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Maturity Assessment
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedCategory === "capabilities" && renderCapabilitiesView()}
        {selectedCategory === "domains" && renderDomainsView()}
        {selectedCategory === "maturity" && renderMaturityView()}
      </div>
    </div>
  )
}
