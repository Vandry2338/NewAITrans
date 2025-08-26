"use client"

import { useState } from "react"
import { Building2, Workflow, FileText, ArrowLeft, Users, TrendingUp, Target, Zap, Shield, Globe, Factory, Car, Banknote, Heart, GraduationCap, Truck, Wifi, Lightbulb, ShoppingBag, Pickaxe, Search, Filter } from "lucide-react"
import { useRouter } from "next/navigation"
import { sapIndustries } from "@/app/data/industries"
import { sapValueChains } from "@/app/data/valueChains"

export default function IndustriesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"industries" | "value-chains">("industries")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

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

  const filteredValueChains = sapValueChains.filter(valueChain =>
    valueChain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    valueChain.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const renderIndustriesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          SAP Industries ({filteredIndustries.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search industries..."
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
              onClick={() => setSelectedIndustry(industry.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                    {industry.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                    {industry.description}
                  </p>
                  <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{industry.counts.references} references</span>
                    {industry.processKeys.length > 0 && (
                      <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                        {industry.processKeys.length} processes
                      </span>
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

  const renderValueChainsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
          SAP Value Chains ({filteredValueChains.length})
        </h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
            <input
              type="text"
              placeholder="Search value chains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
              style={{ color: "var(--text-default)" }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredValueChains.map((valueChain) => (
          <div
            key={valueChain.id}
            className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-green-500/20 text-green-400 group-hover:bg-green-500/30 transition-colors">
                <Workflow className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                  {valueChain.name}
                </h3>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                  {valueChain.description.substring(0, 120)}...
                </p>
                <div className="flex items-center space-x-2 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                    {valueChain.key}
                  </span>
                  {valueChain.synonyms.slice(0, 2).map((synonym, idx) => (
                    <span key={idx} className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
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
            SAP Industries & Value Chains
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Explore comprehensive SAP solutions across industry sectors and value chain processes
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 p-1 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("industries")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "industries"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Industries ({sapIndustries.length})
            </button>
            <button
              onClick={() => setActiveTab("value-chains")}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "value-chains"
                  ? "bg-white/20 text-white shadow-sm"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              Value Chains ({sapValueChains.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "industries" ? renderIndustriesView() : renderValueChainsView()}
      </div>
    </div>
  )
}
