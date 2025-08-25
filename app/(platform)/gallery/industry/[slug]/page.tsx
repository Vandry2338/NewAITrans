"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Building2,
  Package,
  GitBranch,
  TrendingUp,
  Car,
  ShoppingCart,
  HardHat,
  Factory,
  Briefcase,
  Building,
  Store,
  Zap,
  Plane,
  Heart,
  Phone,
  Film,
  Banknote,
  Shield,
  Wheat,
  Stethoscope,
  Fuel,
  FlaskConical,
  GraduationCap,
  Truck,
  Cpu,
  Pickaxe,
  Hammer,
  Rocket,
  UserCheck,
  Calendar,
  FileText,
  Bookmark,
} from "lucide-react"
import { industries } from "../../../../../data/industries"
import { valueChains } from "../../../../../data/valueChains"
import { processFacets } from "../../../../../data/processFacets"

const industryIcons: Record<string, any> = {
  automotive: Car,
  "consumer-products": ShoppingCart,
  "engineering-construction-and-operations": HardHat,
  "industrial-manufacturing": Factory,
  "professional-services": Briefcase,
  "public-sector": Building,
  retail: Store,
  utilities: Zap,
  "travel-and-transportation": Plane,
  "life-sciences": Heart,
  telecommunications: Phone,
  media: Film,
  banking: Banknote,
  insurance: Shield,
  agribusiness: Wheat,
  healthcare: Stethoscope,
  "oil-and-gas": Fuel,
  chemicals: FlaskConical,
  "higher-education-and-research": GraduationCap,
  "wholesale-distribution": Truck,
  "high-tech": Cpu,
  mining: Pickaxe,
  "mill-products": Hammer,
  "aerospace-and-defense": Rocket,
  "defense-and-security": UserCheck,
}

const industryDescriptions: Record<string, string> = {
  automotive:
    "Deliver innovative solutions on the road to new mobility, while running a profitable automotive business.",
  "consumer-products":
    "Embrace intelligent technologies and next-gen business processes to deliver personalization with a purpose.",
  "engineering-construction-and-operations":
    "Convert bids into profitable contracts and deliver projects on time and on budget by digitalizing expertise and assets.",
  "industrial-manufacturing": "Accelerate digitalization and drive strategic and sustainable growth",
  "professional-services":
    "Meet client needs and generate revenue by blending data and processes and managing workers in the cloud.",
  "public-sector":
    "Empower governments and public sector organizations to deliver the core objectives of the public sector with intelligent solutions and automated processes.",
  retail: "Give shoppers and consumers the products and personalized shopping experiences they want.",
  utilities: "Inspire and shape a digital world.",
  telecommunications:
    "The telecommunications industry is primed to shape how people interact and how business gets done. By combining the Internet of Things and 5G/Edge connectivity with machine learning (ML) and artificial intelligence (AI), telcos will empower digital inclusion throughout the world and enable digital transformation across all verticals.",
}

const telecommunicationsContent = {
  about:
    "The telecommunications industry is primed to shape how people interact and how business gets done. By combining the Internet of Things and 5G/Edge connectivity with machine learning (ML) and artificial intelligence (AI), telcos will empower digital inclusion throughout the world and enable digital transformation across all verticals. In response to industry trends that are reshaping the telco landscape, telcos themselves need to digitally transform as well, and evolve from communication service providers to digital service providers, shifting from a focus on products to a focus on customer experience. This means eliminating gaps between back-office, customer engagement, and network operations systems, and streamlining to deliver the best customer experience across channels. A focus on sustainability is nonnegotiable, and it starts with meeting global obligations by providing deep transparency to ensure compliance and proactively address regulations. From there, telcos must work to make processes increasingly sustainable and efficient with a solution portfolio that will address circular business models, reduce waste and carbon footprints, and drive social responsibility across the value chain. Once telcos have established this essential foundation, they can create the sustainable products, services, and business models that the world demands.",

  strategicPriorities: [
    "Customer Centricity",
    "Supply Chain and Asset Lifecycle Excellence",
    "Revenue Stream Diversification",
    "Intelligent Connectivity",
  ],
}

export default function IndustryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [activeTab, setActiveTab] = useState<"overview" | "solutions" | "value-chain" | "blueprint" | "transformation">(
    "overview",
  )

  const [blueprintView, setBlueprintView] = useState<"main" | "solution-business">("main")

  const industry = industries.find((ind) => ind.slug === slug)

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
            Industry Not Found
          </h1>
          <p style={{ color: "var(--text-muted)" }}>The requested industry could not be found.</p>
        </div>
      </div>
    )
  }

  const IconComponent = industryIcons[industry.slug] || Building2
  const description = industryDescriptions[industry.slug] || `Explore solutions and processes for ${industry.name}`

  const getIndustryValueChains = () => {
    if (!industry.processKeys) return []
    return valueChains.filter((chain) => industry.processKeys.includes(chain.key))
  }

  const getIndustryProcessFacets = () => {
    if (!industry.processKeys) return []
    return industry.processKeys.map((key) => processFacets[key]).filter(Boolean)
  }

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: Building2 },
    { key: "solutions" as const, label: "Solutions", icon: Package },
    { key: "value-chain" as const, label: "Core Value Chain", icon: GitBranch },
    { key: "blueprint" as const, label: "Process Blueprint", icon: GitBranch },
    { key: "transformation" as const, label: "Transformation", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div
        className="sticky top-0 z-10 border-b backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeft className="h-5 w-5" style={{ color: "var(--text)" }} />
              </button>
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {industry.name}
                  </h1>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {industry.processKeys.length} E2E Processes • {industry.counts.references} Solutions
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? "text-white shadow-lg transform scale-105"
                      : "hover:shadow-md hover:scale-102"
                  }`}
                  style={{
                    background:
                      activeTab === tab.key
                        ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                        : "rgba(255, 255, 255, 0.9)",
                    color: activeTab === tab.key ? "white" : "var(--text)",
                    backdropFilter: "blur(12px)",
                    border:
                      activeTab === tab.key
                        ? "1px solid rgba(59, 130, 246, 0.3)"
                        : "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow:
                      activeTab === tab.key
                        ? "0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                        : "0 2px 8px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Industry Overview
              </h2>

              {industry.slug === "telecommunications" ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                      About
                    </h3>
                    <p className="text-base mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {telecommunicationsContent.about}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
                      Strategic Priorities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {telecommunicationsContent.strategicPriorities.map((priority, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                              style={{
                                background: `linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)`,
                                boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                              }}
                            >
                              <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4
                                className="font-semibold text-lg mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                                style={{ color: "var(--text)" }}
                              >
                                {priority}
                              </h4>
                              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-lg mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {description}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--bg-subtle)" }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    {industry.processKeys.length}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    E2E Processes
                  </div>
                </div>
                <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--bg-subtle)" }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    {industry.counts.references}
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Reference Solutions
                  </div>
                </div>
                <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--bg-subtle)" }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    100%
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    SAP Validated
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "solutions" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
              Available Solutions
            </h2>

            {industry.slug === "telecommunications" && (
              <div
                className="rounded-2xl p-8 mb-8"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--text)" }}>
                  Industry Cloud Solutions from SAP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "SAP Business Network Freight Collaboration",
                    "SAP Business Network Global Track and Trace",
                    "SAP Cloud for Real Estate for SAP Intelligent Real Estate",
                    "SAP Entitlement Management",
                    "SAP Market Rates Management",
                    "SAP Profitability and Performance Management",
                    "SAP S/4HANA Cloud for projects, collaborative project management",
                  ].map((solution, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4
                            className="font-semibold text-base mb-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                            style={{ color: "var(--text)" }}
                          >
                            {solution}
                          </h4>
                          <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getIndustryProcessFacets().map((facet) => (
                <div
                  key={facet.processKey}
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{
                        background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                        color: "white",
                      }}
                    >
                      {facet.processKey}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                    {facet.processKey} Solutions
                  </h3>
                  <div className="space-y-3">
                    {facet.groups
                      .find((g) => g.key === "products")
                      ?.options.slice(0, 4)
                      .map((product) => (
                        <div
                          key={product.key}
                          className="flex items-center justify-between p-3 rounded-lg"
                          style={{ backgroundColor: "var(--bg-subtle)" }}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                            {product.label}
                          </span>
                          <span
                            className="text-xs px-2 py-1 rounded"
                            style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}
                          >
                            {product.count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "value-chain" && (
          <div className="space-y-12">
            {/* Section 1: Core Value Chain */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-8" style={{ color: "var(--text)" }}>
                Core Value Chain
              </h2>
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {industry.slug === "telecommunications" ? (
                  <div className="text-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%208-18-25%20at%2012.04%20AM-doAmSOEYy1gaCSQ7YbLd6TqPOX5NHI.jpeg"
                      alt="Telecommunications Core Value Chain Diagram"
                      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
                      style={{ maxHeight: "600px", objectFit: "contain" }}
                    />
                    <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      The core value chain shows the main business processes: Plan, Build, and Operate; Acquire and
                      Retain; Fulfill and Deliver; Bill and Settle; and Analyze and Optimize. Each stage encompasses
                      specific functions critical to telecommunications operations.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {getIndustryValueChains().map((process) => (
                      <div
                        key={process.key}
                        className="rounded-xl p-6 hover:shadow-lg transition-all duration-200"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium"
                            style={{
                              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                              color: "white",
                            }}
                          >
                            {process.key}
                          </span>
                        </div>
                        <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                          {process.sapLabel}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          {process.description.substring(0, 120)}...
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Supporting Functions */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-8" style={{ color: "var(--text)" }}>
                Supporting Functions
              </h2>
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {industry.slug === "telecommunications" ? (
                  <div className="text-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%208-18-25%20at%2012.05%20AM-9ELGr5Dk1nNgwfLt2vBo65mgjQIXP0.jpeg"
                      alt="Telecommunications Supporting Functions Diagram"
                      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
                      style={{ maxHeight: "600px", objectFit: "contain" }}
                    />
                    <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      Supporting functions include Human Resources (talent management, payroll, core HR delivery),
                      Sourcing and Procurement (central procurement, supplier management, various procurement
                      processes), and Finance (invoice management, financial planning, treasury, and compliance
                      functions).
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                      Supporting Functions
                    </h3>
                    <p className="text-base" style={{ color: "var(--text-muted)" }}>
                      Supporting functions diagram will be displayed here for {industry.name}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Business Technology Platform */}
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold mb-8" style={{ color: "var(--text)" }}>
                Business Technology Platform
              </h2>
              <div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}
              >
                {industry.slug === "telecommunications" ? (
                  <div className="text-center">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Image%208-18-25%20at%2012.05%20AM-W0QOUhaGkALPoajYWsx5GlOKbPZWSl.jpeg"
                      alt="Telecommunications Business Technology Platform Diagram"
                      className="w-full max-w-5xl mx-auto rounded-xl shadow-lg"
                      style={{ maxHeight: "600px", objectFit: "contain" }}
                    />
                    <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      The Business Technology Platform encompasses Integration Suite, Data and Analytics (with data
                      preparation, cataloging, storage, and integration), Application Development and Automation
                      (including low-code/no-code development and process automation), and Artificial Intelligence (AI
                      business services and lifecycle management).
                    </p>
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                      Business Technology Platform
                    </h3>
                    <p className="text-base" style={{ color: "var(--text-muted)" }}>
                      Business Technology Platform diagram will be displayed here for {industry.name}.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "blueprint" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
                Process Blueprint
              </h2>
              {blueprintView !== "main" && (
                <button
                  onClick={() => setBlueprintView("main")}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200"
                  style={{
                    background: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    color: "var(--text)",
                  }}
                >
                  <ArrowLeft size={16} />
                  Back to Main
                </button>
              )}
            </div>

            {industry.slug === "telecommunications" ? (
              <>
                {blueprintView === "main" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Solution Process */}
                    <div
                      className="group cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                      onClick={() => setBlueprintView("solution-business")}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <GitBranch className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Solution Value Flow Diagram
                          </span>
                        </div>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Solution Process
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Value Flow Diagram depicts all supported business activities contributing to the
                        business process variant.
                      </p>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                    </div>

                    {/* Solution Components */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Solution Component Diagram
                          </span>
                        </div>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Solution Components
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Component Diagram depicts all solution components needed to implement the business
                        process variant.
                      </p>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                    </div>

                    {/* Transactional Data Flows */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Solution Data Flow Diagram
                          </span>
                        </div>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Transactional Data Flows
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Data Flow Diagram depicts key flows of transactional data of the business process
                        variant.
                      </p>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                    </div>

                    {/* Master Data Flows */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Solution Data Flow Diagram
                          </span>
                        </div>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Master Data Flows
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Data Flow Diagram depicts key flows of master and configuration data of the
                        business process variant.
                      </p>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                    </div>

                    {/* Solution Business Standard Process Flow */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <GitBranch className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span
                            className="px-3 py-1 rounded-lg text-xs font-medium mb-3 inline-block"
                            style={{
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "#3b82f6",
                              border: "1px solid rgba(59, 130, 246, 0.2)",
                            }}
                          >
                            Solution Process Flow
                          </span>
                        </div>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Solution Business Standard Process Flow
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Process Flow Diagram depicts the overview process flow of the business process
                        variant. It includes solution process flow diagrams to depict sub-processes.
                      </p>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"></div>
                    </div>
                  </div>
                )}

                {blueprintView === "solution-business" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Solution Business for Cloud Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Solution Business for Cloud Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The Solution Business scenario allows to sell complex solutions of bundled items in one
                        integrated process.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>5 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>

                    {/* Network-Based Sales Processing for Hybrid Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Network-Based Sales Processing for Hybrid Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        An order-to-invoice process connecting SAP S/4HANA and SAP Business Network.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>4 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>

                    {/* Solution Business for Hybrid Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Solution Business for Hybrid Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        The scenario Solution Business allows to sell complex solutions of bundled items in one
                        integrated quote-to-cash process.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>5 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>

                    {/* Subscription and Usage Business for Cloud Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Subscription and Usage Business for Cloud Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        Subscription and Usage Business allows managing subscriptions and the respective invoicing and
                        accounting processes.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>5 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>

                    {/* Acquire to Decommission for Hybrid Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Acquire to Decommission for Hybrid Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        Manage within Design to Operate all aspects of an industrial product as it is received,
                        on-boarded and maintained on-site.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>3 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>

                    {/* Network-Based Sales Processing for Cloud Deployment */}
                    <div
                      className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        boxShadow: "0 8px 32px rgba(59, 130, 246, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            boxShadow: "0 4px 16px rgba(59, 130, 246, 0.3)",
                          }}
                        >
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "rgba(59, 130, 246, 0.1)",
                            color: "#3b82f6",
                            border: "1px solid rgba(59, 130, 246, 0.2)",
                          }}
                        >
                          Solution Variant
                        </span>
                      </div>
                      <h3
                        className="font-semibold text-lg mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-blue-800 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                        style={{ color: "var(--text)" }}
                      >
                        Network-Based Sales Processing for Cloud Deployment
                      </h3>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                        An order-to-invoice process connecting SAP S/4HANA Cloud and SAP Business Network.
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                        <Building2 size={14} />
                        <span>4 Architecture Views</span>
                      </div>
                      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500 mt-4"></div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {getIndustryValueChains().map((process) => (
                  <div
                    key={process.key}
                    className="rounded-xl p-8 hover:shadow-lg transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-xl mb-2" style={{ color: "var(--text)" }}>
                          {process.sapLabel} Blueprint
                        </h3>
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{
                            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                            color: "white",
                          }}
                        >
                          {process.key}
                        </span>
                      </div>
                    </div>
                    <p className="text-base mb-6 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {process.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-subtle)" }}>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                          Planning
                        </h4>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          Strategic planning and resource allocation
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-subtle)" }}>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                          Execution
                        </h4>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          Process implementation and monitoring
                        </p>
                      </div>
                      <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--bg-subtle)" }}>
                        <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                          Optimization
                        </h4>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          Continuous improvement and analytics
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "transformation" && (
          <div className="space-y-8">
            {industry?.slug === "telecommunications" ? (
              <>
                <h2 className="text-2xl font-semibold mb-6" style={{ color: "var(--text)" }}>
                  Transformation Accelerators
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Value Accelerator Tiles */}
                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--blue-600)" }}
                        >
                          Value Accelerator
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Process Design and Standardization for SAP Services Content RDEngineering and Sustainability
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for
                        standardization in process design workshops and fit-to-standard assessments.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        1 Artifact
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--blue-600)" }}
                        >
                          Value Accelerator
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Process Design and Standardization for SAP Services Content Environment Health and Safety
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for
                        standardization in process design workshops and fit-to-standard assessments.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        1 Artifact
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--blue-600)" }}
                        >
                          Value Accelerator
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Process Design and Standardization for SAP Services Content Connected Assets
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for
                        standardization in process design workshops and fit-to-standard assessments.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        1 Artifact
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--blue-600)" }}
                        >
                          Value Accelerator
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Process Design and Standardization for SAP Services Content
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models for 15+ industries,
                        including chemicals, mining, oil and gas, utilities, fashion, retail, and more.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        1 Artifact
                      </span>
                    </div>
                  </div>

                  {/* Enterprise Architecture Tiles */}
                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Assortment and Product Lifecycle Management (Retail)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Manages the lifecycle of retail products, including assortment strategy, sourcing, global
                        assortment definition, price planning, and product data management.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        1 Artifact
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Deliver Product to Fulfill (Inbound)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Inbound logistics management, including transportation, dock and yard logistics, product
                        receiving, and performance analysis and monitoring.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Order to Fulfill (Physical Products)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Managing customer orders and contracts, then fulfilling processes to deliver physical products.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Plan to Optimize Marketing and Merchandising
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Strategy and planning for marketing, sales, and customer service in B2C, including sales
                        performance management, pricing, and promotions planning.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Enterprise Architecture Tiles - Second Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Request to Service (B2C, Recommerce)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Offers support to B2C customers for trade-ins, handling inquiries and complaints before, during,
                        and after the process.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Manage Assets
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Covers asset lifecycle activities: master data management, risk management, environmental
                        concerns, secure asset data management, and collaboration between communities.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Design to Release (Generic)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Covers activities from product/service design to manufacturing handover, including design,
                        modeling, prototyping, testing, sourcing, costing, and production preparation.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>

                  <div className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[320px] group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                        >
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--green-600)" }}
                        >
                          Enterprise Architecture
                        </span>
                      </div>
                      <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3 leading-tight" style={{ color: "var(--text)" }}>
                        Deliver Product to Fulfill (Outbound Without Warehousing)
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Outbound logistics involves product shipment, transportation management, delivery, and
                        performance analysis, without warehouse management.
                      </p>
                    </div>
                    <div
                      className="flex items-center gap-2 pt-4 border-t"
                      style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}
                    >
                      <FileText className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                        2 Artifacts
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Default transformation content for other industries
              <>
                <h2 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
                  Transformation Roadmap
                </h2>
                <div
                  className="rounded-xl p-8"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Assessment
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Evaluate current state and identify transformation opportunities
                      </p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Implementation
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Deploy solutions and optimize processes for maximum impact
                      </p>
                    </div>
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                        Optimization
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Continuous improvement and scaling across the organization
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
