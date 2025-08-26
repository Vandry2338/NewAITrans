"use client"

import { useState } from "react"
import { FileText, ArrowLeft, Search, Filter, Building2, Workflow, Target, Zap, Shield, Globe, Factory, Car, Banknote, Heart, GraduationCap, Truck, Wifi, Lightbulb, ShoppingBag, Pickaxe, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { sapIndustries } from "@/app/data/industries"
import { sapValueChains } from "@/app/data/valueChains"

export default function ReferencesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"architectures" | "blueprints" | "templates">("architectures")

  const getIndustryIcon = (industryName: string) => {
    const iconMap: { [key: string]: any } = {
      "Aerospace and Defense": Shield,
      "Agribusiness": Globe,
      "Automotive": Car,
      "Banking": Banknote,
      "Chemicals": Factory,
      "Consumer Products": ShoppingBag,
      "Defense and Security": Shield,
      "Engineering, Construction and Operations": Building2,
      "Healthcare": Heart,
      "Higher Education and Research": GraduationCap,
      "Insurance": Shield,
      "Life Sciences": Heart,
      "Manufacturing": Factory,
      "Media": Lightbulb,
      "Mining": Pickaxe,
      "Oil and Gas": Zap,
      "Pharmaceuticals": Heart,
      "Professional Services": Users,
      "Public Sector": Building2,
      "Real Estate": Building2,
      "Retail": ShoppingBag,
      "Sports and Entertainment": Lightbulb,
      "Technology": Zap,
      "Telecommunications": Wifi,
      "Travel and Transportation": Truck,
      "Utilities": Zap,
      "Wholesale Distribution": Truck,
    }
    return iconMap[industryName] || Building2
  }

  const filteredIndustries = sapIndustries.filter(industry =>
    industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    industry.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderArchitecturesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Enterprise Architectures ({filteredIndustries.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search architectures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIndustries.map((industry) => {
          const IconComponent = getIndustryIcon(industry.name)
          return (
            <div
              key={industry.id}
              className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30 transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                    {industry.name} Architecture
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {industry.description}
                  </p>
                  <div className="space-y-2">
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      <strong>References:</strong> {industry.counts.references}
                    </div>
                    {industry.processKeys.length > 0 && (
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        <strong>Processes:</strong> {industry.processKeys.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderBlueprintsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Solution Blueprints ({sapValueChains.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search blueprints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sapValueChains.map((valueChain) => (
          <div
            key={valueChain.id}
            className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                <Workflow className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                  {valueChain.name} Blueprint
                </h3>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  {valueChain.description.substring(0, 120)}...
                </p>
                <div className="space-y-2">
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <strong>Process Key:</strong> {valueChain.key}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    <strong>Synonyms:</strong> {valueChain.synonyms.slice(0, 2).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTemplatesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          Implementation Templates
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Integration Templates */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-green-500/20 text-green-400 group-hover:bg-green-500/30 transition-colors">
              <Workflow className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Integration Patterns
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Pre-built integration patterns for SAP systems
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> Technical Architecture
              </div>
            </div>
          </div>
        </div>

        {/* Deployment Templates */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30 transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Deployment Templates
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Infrastructure and deployment automation templates
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> DevOps
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Guides */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/30 transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Configuration Guides
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Step-by-step configuration and setup guides
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> Implementation
              </div>
            </div>
          </div>
        </div>

        {/* Security Guidelines */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition-colors">
              <Shield className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Security Guidelines
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Security best practices and compliance templates
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> Security
              </div>
            </div>
          </div>
        </div>

        {/* Performance Optimization */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30 transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Performance Optimization
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Performance tuning and optimization templates
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> Performance
              </div>
            </div>
          </div>
        </div>

        {/* Scalability Patterns */}
        <div className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-lg bg-teal-500/20 text-teal-400 group-hover:bg-teal-500/30 transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                Scalability Patterns
              </h3>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                Enterprise scalability and growth patterns
              </p>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                <strong>Category:</strong> Architecture
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
            Reference Architectures & Blueprints
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Proven architectural patterns and implementation blueprints for SAP transformations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 p-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
            <button
              onClick={() => setSelectedCategory("architectures")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "architectures"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Enterprise Architectures
            </button>
            <button
              onClick={() => setSelectedCategory("blueprints")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "blueprints"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Solution Blueprints
            </button>
            <button
              onClick={() => setSelectedCategory("templates")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === "templates"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Implementation Templates
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedCategory === "architectures" && renderArchitecturesView()}
        {selectedCategory === "blueprints" && renderBlueprintsView()}
        {selectedCategory === "templates" && renderTemplatesView()}
      </div>
    </div>
  )
}
