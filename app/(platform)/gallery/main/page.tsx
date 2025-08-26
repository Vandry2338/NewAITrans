"use client"

import { useSearchParams } from "next/navigation"
import { Building2, Workflow, FileText, Grid3X3, ArrowLeft, Users, TrendingUp, Target, Zap, Shield, Globe, Factory, Car, Banknote, Heart, GraduationCap, Truck, Wifi, Lightbulb, ShoppingBag, Pickaxe } from "lucide-react"
import { useRouter } from "next/navigation"
import { sapIndustries } from "@/app/data/industries"
import { sapValueChains } from "@/app/data/valueChains"

export default function GalleryMainPage() {
  const searchParams = useSearchParams()
  const view = searchParams.get("view")
  const router = useRouter()

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

  const renderContent = () => {
    switch (view) {
      case "industries":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
                SAP Industries & Value Chains
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
                Explore comprehensive SAP solutions across 32 industry sectors and 8 value chain processes
              </p>
            </div>

            {/* Industries Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
                SAP Industries ({sapIndustries.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sapIndustries.map((industry) => {
                  const IconComponent = getIndustryIcon(industry.name)
                  return (
                    <div
                      key={industry.id}
                      className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        border: "1px solid rgba(255,255,255,0.1)"
                      }}
                      onClick={() => router.push(`/gallery/industries/${industry.slug}`)}
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

            {/* Value Chains Section */}
            <div className="space-y-6 mt-12">
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default)" }}>
                SAP Value Chains ({sapValueChains.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sapValueChains.map((valueChain) => (
                  <div
                    key={valueChain.id}
                    className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}
                    onClick={() => router.push(`/gallery/value-chains/${valueChain.id}`)}
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
          </div>
        )

      case "processes":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
                End-to-End Processes & Subprocesses
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
                Comprehensive process mapping and optimization across all SAP value chains
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sapValueChains.map((valueChain) => (
                <div
                  key={valueChain.id}
                  className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                      <Workflow className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                        {valueChain.name}
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                        {valueChain.description.substring(0, 150)}...
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          <strong>Key:</strong> {valueChain.key}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          <strong>Synonyms:</strong> {valueChain.synonyms.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "references":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
                Reference Architectures & Blueprints
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
                Proven architectural patterns and implementation blueprints for SAP transformations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sapIndustries.slice(0, 12).map((industry) => (
                <div
                  key={industry.id}
                  className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-orange-500/20 text-orange-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                        {industry.name} Reference
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                        {industry.description}
                      </p>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        <strong>References:</strong> {industry.counts.references}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "bcm":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
                Business Capability Model (BCM) Categories
              </h1>
              <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
                Strategic business capabilities mapped to SAP solutions and industry best practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sapValueChains.map((valueChain) => (
                <div
                  key={valueChain.id}
                  className="p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text-default)" }}>
                        {valueChain.name} Capabilities
                      </h3>
                      <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                        Core business capabilities for {valueChain.name.toLowerCase()} processes
                      </p>
                      <div className="space-y-2">
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          <strong>Process Key:</strong> {valueChain.key}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          <strong>Focus:</strong> {valueChain.sapLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
              Gallery Main Page
            </h1>
            <p className="text-xl" style={{ color: "var(--text-muted)" }}>
              Select a view from the gallery to explore specific content
            </p>
          </div>
        )
    }
  }

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

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  )
}
