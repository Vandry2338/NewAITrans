"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Building2, Package, GitBranch, TrendingUp } from "lucide-react"
import { industries } from "../../../../../data/industries"

export default function IndustryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "solutions" | "value-chain" | "blueprint" | "transformation">("overview")

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
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                Industry Solutions
              </h2>
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Solutions Coming Soon
                    </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Industry-specific solutions and templates will be available in the next release.
                    </p>
                  </div>
              </div>
          )}

          {activeTab === "value-chain" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                Core Value Chain
              </h2>
              <div className="text-center py-12">
                <GitBranch className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Value Chain Analysis Coming Soon
                    </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Detailed value chain mapping and process analysis will be available in the next release.
                    </p>
            </div>
          </div>
        )}

        {activeTab === "blueprint" && (
          <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                Process Blueprint
              </h2>
              <div className="text-center py-12">
                <GitBranch className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Process Blueprints Coming Soon
                      </h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Interactive process blueprints and documentation will be available in the next release.
                        </p>
                      </div>
          </div>
        )}

        {activeTab === "transformation" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                Transformation Guide
                </h2>
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                  Transformation Guidance Coming Soon
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Strategic transformation guidance and roadmaps will be available in the next release.
                      </p>
                    </div>
                      </div>
            )}
          </div>
      </div>
    </div>
  )
}
