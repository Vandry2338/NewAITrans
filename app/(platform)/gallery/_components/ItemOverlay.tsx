"use client"

import { useState, useEffect } from "react"
import { XMarkIcon, PlayIcon } from "@heroicons/react/24/outline"
import { useGalleryStore } from "@/lib/store/gallery"

interface ItemOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export default function ItemOverlay({ isOpen, onClose }: ItemOverlayProps) {
  const { selectedItemId, references, industries, processes, artifacts } = useGalleryStore()
  const [activeTab, setActiveTab] = useState("overview")

  const item = references.find((i) => i.id === selectedItemId)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!item) return null

  const itemArtifacts = artifacts.filter((art) => item.artifacts.includes(art.id))

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "demo", label: "Demo Video" },
    { id: "capabilities", label: "Key Capabilities" },
    { id: "business-value", label: "Business Value" },
    { id: "solution", label: "Solution" },
    { id: "implementation", label: "Implementation" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
        style={{ backgroundColor: "var(--bg)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: "var(--grad-primary)", color: "white" }}
              >
                Reference Architecture
              </span>
              {item.version && (
                <span
                  className="px-2 py-1 rounded-md text-xs"
                  style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}
                >
                  v{item.version}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              {item.title}
            </h2>
            <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {item.industries.slice(0, 2).map((industryId) => {
                const industry = industries.find((i) => i.id === industryId)
                return industry ? <span key={industryId}>{industry.name}</span> : null
              })}
              {item.processes.slice(0, 2).map((processId) => {
                const process = processes.find((p) => p.id === processId)
                return process ? <span key={processId}>• {process.name}</span> : null
              })}
              {item.timeline && <span>• {item.timeline}</span>}
              {item.maturity && <span>• {item.maturity}</span>}
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <XMarkIcon className="h-6 w-6" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>

        {/* Sticky Tab Bar */}
        <div
          className="sticky top-0 border-b px-6 py-3"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id ? "text-white shadow-md" : "hover:shadow-sm"
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? "var(--grad-primary)" : "var(--bg-subtle)",
                  color: activeTab === tab.id ? "white" : "var(--text)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                  Summary
                </h3>
                <p style={{ color: "var(--text-muted)" }}>{item.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Package Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    {item.version && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Version:</span>
                        <span style={{ color: "var(--text)" }}>{item.version}</span>
                      </div>
                    )}
                    {item.timeline && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Timeline:</span>
                        <span style={{ color: "var(--text)" }}>{item.timeline}</span>
                      </div>
                    )}
                    {item.maturity && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Maturity:</span>
                        <span style={{ color: "var(--text)" }}>{item.maturity}</span>
                      </div>
                    )}
                    {item.availability && (
                      <div className="flex justify-between">
                        <span style={{ color: "var(--text-muted)" }}>Availability:</span>
                        <span style={{ color: "var(--text)" }}>{item.availability}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Products & Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.products?.map((product) => (
                      <span
                        key={product}
                        className="px-2 py-1 rounded-md text-xs font-medium"
                        style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text)" }}
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "demo" && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                Demo Video
              </h3>
              {item.videoUrl ? (
                <div
                  className="aspect-video rounded-xl flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <div className="text-center text-white">
                    <PlayIcon className="h-16 w-16 mx-auto mb-2" />
                    <p className="text-sm">Click to play demo video</p>
                  </div>
                </div>
              ) : (
                <div
                  className="aspect-video rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--bg-subtle)" }}
                >
                  <p style={{ color: "var(--text-muted)" }}>No demo video available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "capabilities" && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                Key Capabilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.keyFeatures?.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border"
                    style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "var(--blue-500)" }}
                      />
                      <span style={{ color: "var(--text)" }}>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "business-value" && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                Business Value & Benefits
              </h3>
              <div className="space-y-3">
                {item.businessValue?.map((value, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border"
                    style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                        style={{ backgroundColor: "var(--green-500)" }}
                      >
                        ✓
                      </div>
                      <span style={{ color: "var(--text)" }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                Solution Artifacts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {itemArtifacts.map((artifact) => (
                  <div
                    key={artifact.id}
                    className="border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="aspect-video rounded-lg mb-3 overflow-hidden">
                      <img
                        src={artifact.thumbUrl || "/placeholder.svg?height=120&width=200"}
                        alt={artifact.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-sm mb-2" style={{ color: "var(--text)" }}>
                      {artifact.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span
                        className="px-2 py-1 rounded-md text-xs"
                        style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}
                      >
                        {artifact.kind}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="px-3 py-1 text-xs rounded-md hover:shadow-sm transition-all"
                          style={{ background: "var(--grad-primary)", color: "white" }}
                        >
                          View
                        </button>
                        {artifact.fileUrl && (
                          <button
                            className="px-3 py-1 text-xs rounded-md border hover:shadow-sm transition-all"
                            style={{ borderColor: "var(--border)", color: "var(--text)" }}
                          >
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "implementation" && (
            <div>
              <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                Implementation Guidance
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Timeline & Prerequisites
                  </h4>
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Estimated Timeline:</span>
                        <div style={{ color: "var(--text)" }}>{item.timeline || "Not specified"}</div>
                      </div>
                      <div>
                        <span style={{ color: "var(--text-muted)" }}>Availability:</span>
                        <div style={{ color: "var(--text)" }}>{item.availability || "Contact for details"}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {item.links && item.links.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                      Additional Resources
                    </h4>
                    <div className="space-y-2">
                      {item.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-3 rounded-lg border hover:shadow-md transition-all"
                          style={{ borderColor: "var(--border)" }}
                        >
                          <span style={{ color: "var(--text)" }}>{link.label}</span>
                          <span style={{ color: "var(--text-muted)" }}>→</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
