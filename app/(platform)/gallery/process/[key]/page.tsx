"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { ArrowLeftIcon, PlusIcon, MapIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function ProcessDetailPage() {
  const params = useParams()
  const key = params.key as string
  const [activeTab, setActiveTab] = useState("overview")

  const { valueChains, kpis, painPoints, capabilities, galleryRegistry, galleryAddToDesign } = useICStore()

  const process = valueChains.find((vc) => vc.key.toLowerCase() === key.toLowerCase())
  const processName = process?.name || key.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  // Get related data for this process
  const processKPIs = kpis.filter((k) => k.processKeys?.includes(process?.key || key.toUpperCase()))
  const processPainPoints = painPoints.filter((p) => p.processKeys?.includes(process?.key || key.toUpperCase()))
  const processCapabilities = capabilities.filter((c) => c.processKeys?.includes(process?.key || key.toUpperCase()))

  // Get related references from gallery
  const relatedReferences = galleryRegistry.references.filter((r) =>
    r.processKeys?.includes(process?.key || key.toUpperCase()),
  )
  const relatedPatterns = galleryRegistry.patterns.filter((p) =>
    p.processKeys?.includes(process?.key || key.toUpperCase()),
  )

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture Hints" },
    { id: "documents", label: "Documents" },
  ]

  const handleAddToDesign = () => {
    if (process) {
      galleryAddToDesign("reference", process.id, { processKey: process.key })
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/gallery" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "var(--text)" }} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              {processName}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {process?.description || "End-to-end value chain analysis"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={handleAddToDesign}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--grad-primary)",
                color: "white",
              }}
            >
              <PlusIcon className="h-4 w-4 inline mr-2" />
              Add to Design
            </button>
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              <MapIcon className="h-4 w-4 inline mr-2" />
              Map Evidence
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? "shadow-sm" : "hover:scale-105"
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? "var(--blue-50)" : "transparent",
                color: activeTab === tab.id ? "var(--blue-800)" : "var(--text)",
                border: `1px solid ${activeTab === tab.id ? "var(--blue-200)" : "transparent"}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                  Process Definition
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  {process?.description ||
                    "Comprehensive end-to-end process covering all aspects of the value chain with common variants and industry-specific adaptations."}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                  Canonical KPIs ({processKPIs.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {processKPIs.map((kpi) => (
                    <div
                      key={kpi.id}
                      className="p-3 rounded-lg border cursor-pointer hover:scale-105 transition-all"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        {kpi.name}
                      </span>
                      <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {kpi.definition}
                      </div>
                    </div>
                  ))}
                  {processKPIs.length === 0 && (
                    <div className="col-span-full text-center py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      No KPIs defined for this process yet
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                  Common Pain Points ({processPainPoints.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {processPainPoints.map((pain) => (
                    <div
                      key={pain.id}
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <h5 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                        {pain.title}
                      </h5>
                      <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                        {pain.description}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          pain.impact === "high"
                            ? "bg-red-100 text-red-800"
                            : pain.impact === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {pain.impact} impact
                      </span>
                    </div>
                  ))}
                  {processPainPoints.length === 0 && (
                    <div className="col-span-full text-center py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                      No pain points identified for this process yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                  Architecture Hints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                      Related Capabilities ({processCapabilities.length})
                    </h4>
                    <div className="space-y-2">
                      {processCapabilities.map((capability) => (
                        <Link
                          key={capability.id}
                          href={`/gallery/capability/${capability.id}`}
                          className="block p-3 rounded-lg transition-colors hover:bg-gray-50"
                          style={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                            {capability.name}
                          </span>
                        </Link>
                      ))}
                      {processCapabilities.length === 0 && (
                        <div className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>
                          No capabilities mapped yet
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                      Related Patterns ({relatedPatterns.length})
                    </h4>
                    <div className="space-y-2">
                      {relatedPatterns.map((pattern) => (
                        <Link
                          key={pattern.id}
                          href={`/gallery/pattern/${pattern.id}`}
                          className="block p-3 rounded-lg transition-colors hover:bg-gray-50"
                          style={{
                            backgroundColor: "var(--surface)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                              {pattern.title}
                            </span>
                            <span
                              className="px-2 py-1 rounded-lg text-xs font-medium"
                              style={{
                                backgroundColor: "var(--purple-100)",
                                color: "var(--purple-800)",
                              }}
                            >
                              {pattern.kind}
                            </span>
                          </div>
                        </Link>
                      ))}
                      {relatedPatterns.length === 0 && (
                        <div className="text-sm text-center py-4" style={{ color: "var(--text-muted)" }}>
                          No patterns available yet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                No Documents Yet
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Linked assets and documentation will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
