"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Building2, Package, GitBranch, TrendingUp } from "lucide-react"
import { industries } from "../../../../../data/industries"

export default function IndustryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "solutions" | "value-chain" | "blueprint" | "transformation" | "roadmap">("overview")


  const industry = industries.find((ind) => ind.slug === params.slug)

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
            Industry Not Found
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            The requested industry could not be found.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--blue-600)",
              color: "white",
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: Building2 },
    { key: "solutions" as const, label: "Solutions", icon: Package },
    { key: "value-chain" as const, label: "Core Value Chain", icon: GitBranch },
    { key: "blueprint" as const, label: "Process Blueprint", icon: GitBranch },
    { key: "transformation" as const, label: "Transformation", icon: TrendingUp },
    { key: "roadmap" as const, label: "Roadmap", icon: TrendingUp },
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
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" style={{ color: "var(--text)" }} />
              </button>
                <div>
                <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
                    {industry.name}
                  </h1>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {industry.description}
                  </p>
              </div>
            </div>
          </div>

          <div className="flex gap-1 mt-6">
            {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </div>
                </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        <div className="max-w-6xl mx-auto">
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div
              className="rounded-2xl p-8"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
                <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Industry Overview
              </h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {industry.description}
                </p>
                
                {/* Telecommunications-specific content */}
                {industry.slug === "telecommunications" && (
                  <div className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Industry Transformation Tile */}
                      <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                        style={{
                          backgroundColor: "white",
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Industry Transformation</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                          The telecommunications industry is primed to shape how people interact and how business gets done. By combining IoT and 5G/Edge connectivity with ML and AI, telcos will empower digital inclusion worldwide.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          Telcos need to evolve from communication service providers to digital service providers, shifting focus from products to customer experience and eliminating gaps between back-office, customer engagement, and network operations systems.
                        </p>
                      </div>

                      {/* Sustainability Focus Tile */}
                      <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                        style={{
                          backgroundColor: "white",
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Sustainability Focus</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                          A focus on sustainability is nonnegotiable, starting with meeting global obligations through deep transparency to ensure compliance and proactively address regulations.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          Telcos must work to make processes increasingly sustainable and efficient with solutions that address circular business models, reduce waste and carbon footprints, and drive social responsibility across the value chain.
                        </p>
                      </div>

                      {/* Strategic Priorities Tile */}
                      <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                        style={{
                          backgroundColor: "white",
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Strategic Priorities</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                          The Telecommunication industry focuses on four strategic priorities:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <span className="font-medium">Customer Centricity</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <span className="font-medium">Supply Chain & Asset Lifecycle Excellence</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <span className="font-medium">Revenue Stream Diversification</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <span className="font-medium">Intelligent Connectivity</span>
                          </div>
                        </div>
                      </div>

                      {/* TM Forum APIs Tile */}
                      <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                        style={{
                          backgroundColor: "white",
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>TM Forum APIs</h3>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                          The Open API program of the TM Forum is a global initiative to enable end-to-end seamless connectivity, interoperability, and portability across complex ecosystem-based services.
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                          The Open API suite provides standard REST-based APIs that enable rapid, repeatable, and flexible integration among operations and management systems, making it easier to create, build, and operate complex innovative services. These APIs are used in the SAP Telco and Utilities Accelerator.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                  </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                  <Building2 className="h-8 w-8 mb-4" style={{ color: "var(--blue-600)" }} />
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                    Key Processes
                </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Core business processes and workflows specific to this industry.
                  </p>
                        </div>

                <div
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Package className="h-8 w-8 mb-4" style={{ color: "var(--green-600)" }} />
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                    Solutions
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Industry-specific solutions and best practices for digital transformation.
                  </p>
                        </div>

                <div
                  className="rounded-xl p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <TrendingUp className="h-8 w-8 mb-4" style={{ color: "var(--purple-600)" }} />
                        <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                    Transformation
                        </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Strategic guidance for industry-specific transformation initiatives.
                        </p>
                      </div>
                  </div>
              </div>
          )}

          {activeTab === "solutions" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Industry Solutions
              </h2>
              
              {/* Telecommunications-specific solutions */}
              {industry.slug === "telecommunications" ? (
                <div className="space-y-6">
                  <div className="rounded-2xl p-8 border"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Industry Cloud Solutions from SAP</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Business Network Freight Collaboration</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Streamlined freight collaboration and logistics management</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Business Network Global Track and Trace</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>End-to-end visibility across global supply chains</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Cloud for Real Estate for SAP Intelligent Real Estate</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Intelligent real estate portfolio management</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Entitlement Management</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Comprehensive entitlement and license management</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Market Rates Management</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Dynamic pricing and market rate optimization</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--text-muted)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP Profitability and Performance Management</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Advanced profitability analysis and performance insights</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                          <div>
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>SAP S/4HANA Cloud for projects, collaborative project management</span>
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Collaborative project management and execution</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                  <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                    Solutions Coming Soon
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Industry-specific solutions and templates will be available in the next release.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "value-chain" && (
            <div className="space-y-8">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Core Value Chain
              </h2>
              
              {/* Telecommunications-specific value chain */}
              {industry.slug === "telecommunications" ? (
                <div className="space-y-12">
                  {/* Core Value Chain Section */}
                  <div className="rounded-2xl p-8 border"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Core Value Chain</h3>
                    
                    {/* Core Value Chain Image */}
                    <div className="mb-8">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Core Value Chain Process Flow</h4>
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="/assets/core value chain.jpeg" 
                          alt="Core Value Chain Process Flow Diagram"
                          className="w-full max-w-6xl h-auto rounded-lg shadow-lg"
                          style={{ maxHeight: "600px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="font-semibold text-lg mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Core Business Processes</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Plan, Build & Operate</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Capital Project Management</li>
                            <li>• Supply Chain Planning for Network Equipment</li>
                            <li>• Network Asset Management</li>
                            <li>• Field Service Management</li>
                            <li>• Real Estate</li>
                            <li>• Environment, Health & Safety</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Acquire & Retain</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Customer Insights</li>
                            <li>• Marketing Customer Engagement</li>
                            <li>• Omnichannel Commerce</li>
                            <li>• Retail Store Operation</li>
                            <li>• Sales Execution</li>
                            <li>• Omnichannel Customer Service</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Fulfill & Deliver</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Supply Chain Planning for Commercial Devices</li>
                            <li>• Omnichannel Inventory & Order Response</li>
                            <li>• Device Lifecycle Management</li>
                            <li>• Warehouse Management</li>
                            <li>• Transportation Management</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Bill & Settle</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Billing & Revenue Innovation Management</li>
                            <li>• Enterprise Business Monetization</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Analyze & Optimize</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Profitability Analysis</li>
                            <li>• Holistic Steering & Reporting</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Supporting Functions Section */}
                  <div className="rounded-2xl p-8 border"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Supporting Functions</h3>
                    
                    {/* Supporting Functions Image */}
                    <div className="mb-8">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Supporting Functions Architecture</h4>
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="/assets/supporting function.jpeg" 
                          alt="Supporting Functions Architecture"
                          className="w-full max-w-6xl h-auto rounded-lg shadow-lg"
                          style={{ maxHeight: "600px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h4 className="font-semibold text-lg mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Supporting Infrastructure</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Technology Stack</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• Network Infrastructure</li>
                            <li>• Cloud Platforms</li>
                            <li>• Security Systems</li>
                            <li>• Data Management</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-4">
                            <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Operational Support</h5>
                          </div>
                          <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                            <li>• IT Operations</li>
                            <li>• Service Management</li>
                            <li>• Quality Assurance</li>
                            <li>• Performance Monitoring</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Technology Platform Section */}
                  <div className="rounded-2xl p-8 border"
                    style={{
                      backgroundColor: "white",
                      borderColor: "rgba(0, 0, 0, 0.1)",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Business Technology Platform</h3>
                    
                    {/* BTP Image */}
                    <div className="mb-8">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Business Technology Platform</h4>
                      </div>
                      <div className="flex justify-center">
                        <img 
                          src="/assets/btp.jpeg" 
                          alt="SAP Business Technology Platform Architecture"
                          className="w-full max-w-6xl h-auto rounded-lg shadow-lg"
                          style={{ maxHeight: "600px", objectFit: "contain" }}
                        />
                      </div>
                    </div>
                    
                    {/* BTP Functions */}
                    <div className="space-y-6">
                      <h4 className="font-semibold text-lg mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>BTP Functions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Integration Services</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• API Management</li>
                            <li>• Event Mesh</li>
                            <li>• Workflow Management</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Analytics & AI</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• Data Intelligence</li>
                            <li>• Machine Learning</li>
                            <li>• Business Intelligence</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Development</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• SAP Build Apps</li>
                            <li>• SAP Build Process Automation</li>
                            <li>• SAP Build Work Zone</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Security</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• Identity Authentication</li>
                            <li>• Authorization Management</li>
                            <li>• Threat Detection</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Database & Data</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• SAP HANA Cloud</li>
                            <li>• Data Management</li>
                            <li>• Data Warehousing</li>
                          </ul>
                        </div>
                        <div className="rounded-xl p-4 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                          style={{
                            backgroundColor: "white",
                            borderColor: "rgba(0, 0, 0, 0.1)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <div className="flex items-center mb-3">
                            <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: "var(--grad-primary)" }}></div>
                            <h5 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Operations</h5>
                          </div>
                          <ul className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                            <li>• Monitoring & Alerting</li>
                            <li>• Performance Management</li>
                            <li>• Service Management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <GitBranch className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                  <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                    Core Value Chain Coming Soon
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Value chain diagrams and process flows will be available in the next release.
                  </p>
                </div>
              )}
            </div>
          )}

        {activeTab === "blueprint" && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Process Blueprint
            </h2>
            
            {/* Telecommunications-specific process blueprint */}
            {industry.slug === "telecommunications" ? (
              <div className="space-y-8">
                <div className="rounded-2xl p-8 border"
                  style={{
                    backgroundColor: "white",
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Solution Variants</h3>
                  <p className="text-base mb-8" style={{ color: "var(--text-muted)", fontFamily: "SAP 72" }}>
                    Comprehensive process blueprints for telecommunications business operations and customer management.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Solution Business for Cloud Deployment */}
                    <Link href="/gallery/industry/telecommunications/solution-business-cloud-deployment" className="block">
                      <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                        style={{
                          backgroundColor: "white",
                          borderColor: "rgba(0, 0, 0, 0.1)",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: "var(--grad-primary)" }}
                            >
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                        <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Solution Business for Cloud Deployment</h4>
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>The Solution Business scenario allows to sell complex solutions of bundled items in one integrated process.</p>
                        
                        <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          <span className="font-medium">5 Architecture Views</span>
                        </div>
                      </div>
                    </Link>



                    {/* Network-Based Sales Processing for Hybrid Deployment */}
                    <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Network-Based Sales Processing for Hybrid Deployment</h4>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>An order-to-invoice process connecting SAP S/4HANA and SAP Business Network</p>
                      <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="font-medium">4 Architecture Views</span>
                      </div>
                    </div>

                    {/* Solution Business for Hybrid Deployment */}
                    <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Solution Business for Hybrid Deployment</h4>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>The scenario Solution Business allows to sell complex solutions of bundled items in one integrated quote-to-cash process.</p>
                      <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="font-medium">5 Architecture Views</span>
                      </div>
                    </div>

                    {/* Subscription and Usage Business for Cloud Deployment */}
                    <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Subscription and Usage Business for Cloud Deployment</h4>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>Subscription and Usage Business allows managing subscriptions and the respective invoicing and accounting processes.</p>
                      <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="font-medium">5 Architecture Views</span>
                      </div>
                    </div>

                    {/* Acquire to Decommission for Hybrid Deployment */}
                    <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Acquire to Decommission for Hybrid Deployment</h4>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>Manage within Design to Operate all aspects of an industrial product as it is received, onboarded and maintained on-site.</p>
                      <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="font-medium">3 Architecture Views</span>
                      </div>
                    </div>

                    {/* Network-Based Sales Processing for Cloud Deployment */}
                    <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ background: "var(--grad-primary)" }}
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "var(--text-muted)" }}>Solution Variant</span>
                        </div>
                      </div>
                      <h4 className="font-semibold text-base mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Network-Based Sales Processing for Cloud Deployment</h4>
                      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>An order-to-invoice process connecting SAP S/4HANA Cloud and SAP Business Network</p>
                      <div className="flex items-center space-x-2 text-sm" style={{ color: "var(--text-muted)" }}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="font-medium">4 Architecture Views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <GitBranch className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Process Blueprints Coming Soon
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Interactive process blueprints and documentation will be available in the next release.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "transformation" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Transformation
            </h2>
            
            {/* Telecommunications-specific transformation */}
            {industry.slug === "telecommunications" ? (
              <div className="space-y-6">
                <div className="rounded-2xl p-8 border"
                  style={{
                    backgroundColor: "white",
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                    Value Accelerators & Enterprise Architecture
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Process Design and Standardization for SAP Services Content */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Design and Standardization for SAP Services Content</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models for 15+ industries, including chemicals, mining, oil and gas, utilities, fashion, retail, and more.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Process Design and Standardization for SAP Services Content RDEngineering */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Design and Standardization for SAP Services Content RDEngineering and Sustainability</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for standardization in process design workshops and fit-to-standard assessments.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Process Landscape and Enterprise Architecture Design */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Landscape and Enterprise Architecture Design</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Accelerate process landscape and enterprise architecture design using SAP Signavio Process Manager, leveraging SAP S/4HANA best practices and business capability models.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Process Design and Standardization for SAP Services Content Environment Health and Safety */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Design and Standardization for SAP Services Content Environment Health and Safety</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for standardization in process design workshops and fit-to-standard assessments.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Process Design and Standardization for SAP Services Content Connected Assets */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Design and Standardization for SAP Services Content Connected Assets</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models using SAP Signavio for standardization in process design workshops and fit-to-standard assessments.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Process Design and Standardization for SAP Standard Content for Industries */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Process Design and Standardization for SAP Standard Content for Industries</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        The accelerator offers industry-specific value chains and process models for 15+ sectors, including chemicals, mining, oil & gas, utilities, retail, airlines, and more.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Assortment and Product Lifecycle Management (Retail) */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Assortment and Product Lifecycle Management (Retail)</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Manages the lifecycle of retail products, including assortment strategy, sourcing, global assortment definition, price planning, and product data management.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          1 Artifact
                        </span>
                      </div>
                    </div>

                    {/* Deliver Product to Fulfill (Inbound) */}
                    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl border"
                      style={{
                        backgroundColor: "white",
                        borderColor: "rgba(0, 0, 0, 0.1)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 mx-auto"
                        style={{ background: "var(--grad-primary)" }}
                      >
                        <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-sm mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>Deliver Product to Fulfill (Inbound)</h4>
                      <p className="text-xs mb-4 text-center leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Inbound logistics management, including transportation, dock and yard logistics, product receiving, and performance analysis and monitoring.
                      </p>
                      <div className="text-center pt-2 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          2 Artifacts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Transformation Coming Soon
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Digital transformation roadmaps and implementation guides will be available in the next release.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Roadmap
            </h2>
            
            {/* Telecommunications-specific roadmap */}
            {industry.slug === "telecommunications" ? (
              <div className="space-y-6">
                <div className="rounded-2xl p-8 border"
                  style={{
                    backgroundColor: "white",
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                    Telecommunications Transformation Roadmap
                  </h3>
                  
                  {/* Roadmap Image */}
                  <div className="mb-8">
                    <div className="flex justify-center">
                      <img 
                        src="/assets/roadmap.jpeg" 
                        alt="Telecommunications Transformation Roadmap"
                        className="w-full max-w-6xl h-auto rounded-lg shadow-lg"
                        style={{ maxHeight: "600px", objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Roadmap Coming Soon
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Industry-specific roadmaps will be available in the next release.
                </p>
              </div>
            )}
          </div>
        )}
          </div>
      </div>


    </div>
  )
}
