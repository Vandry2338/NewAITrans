"use client"

import { useState } from "react"
import { useGalleryStore } from "@/lib/store/gallery"
import { X, Layers, Building2, TrendingUp, Package, Target, ExternalLink } from "lucide-react"

export default function BcmView() {
  const { bcmTree, references, processes, industries, kpis, setFilters, setView } = useGalleryStore()
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)

  const selectedDomain = selectedDomainId ? bcmTree().find((domain) => domain.id === selectedDomainId) : null
  const selectedArea = selectedAreaId
    ? selectedDomain?.areas.find((area) => area.id === selectedAreaId)
    : selectedDomain?.areas[0]

  const getCapabilitySolutions = (capabilityId: string) => {
    return references.filter((ref) => ref.capabilities.includes(capabilityId))
  }

  const getCapabilityProcesses = (capabilityId: string) => {
    return processes.filter((proc) => proc.capabilityIds?.includes(capabilityId))
  }

  const getCapabilityIndustries = (capabilityId: string) => {
    return industries.filter((ind) => {
      // Check if any of the industry's value chains include processes that use this capability
      return ind.valueChainProcessIds.some((processId) => {
        const process = processes.find((p) => p.id === processId)
        return process?.capabilityIds?.includes(capabilityId)
      })
    })
  }

  const getCapabilityKPIs = (capabilityId: string) => {
    const capability = selectedArea?.capabilities.find((cap) => cap.id === capabilityId)
    return capability?.kpiIds ? kpis.filter((kpi) => capability.kpiIds!.includes(kpi.id)) : []
  }

  const handleExploreSolutions = (capabilityId: string) => {
    setFilters({ capabilityIds: [capabilityId] })
    setView("references")
    setSelectedDomainId(null)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Business Capability Model (BCM) Categories
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Explore capabilities organized by domain and area, with linked processes, industries, and solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bcmTree().map((domain) => (
          <div
            key={domain.id}
            onClick={() => setSelectedDomainId(domain.id)}
            className="rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                style={{ background: "var(--grad-accent-b)" }}
              >
                BCM Domain
              </span>
              <span className="text-xs text-gray-500">{domain.areas.length} areas</span>
            </div>

            <div className="relative mb-4 aspect-video rounded-xl overflow-hidden bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Layers className="h-8 w-8 text-gray-400" />
              </div>
            </div>

            <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: "var(--text)" }}>
              {domain.name}
            </h3>

            <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-muted)" }}>
              {domain.areas.reduce((total, area) => total + area.capabilities.length, 0)} capabilities across{" "}
              {domain.areas.length} areas
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {domain.areas.slice(0, 2).map((area) => (
                <span key={area.id} className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                  {area.name}
                </span>
              ))}
              {domain.areas.length > 2 && (
                <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  +{domain.areas.length - 2} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
                style={{ background: "var(--grad-accent-b)" }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedDomainId(domain.id)
                }}
              >
                Explore Domain
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BCM Drill-Down Drawer */}
      {selectedDomain && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black bg-opacity-50" onClick={() => setSelectedDomainId(null)} />
          <div className="w-full max-w-6xl h-full overflow-y-auto" style={{ backgroundColor: "var(--bg)" }}>
            <div
              className="sticky top-0 z-10 p-6 border-b"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ background: "var(--grad-accent-b)" }}
                  >
                    <Layers size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                      {selectedDomain.name}
                    </h2>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {selectedDomain.areas.length} areas •{" "}
                      {selectedDomain.areas.reduce((total, area) => total + area.capabilities.length, 0)} capabilities
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDomainId(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>
            </div>

            <div className="flex h-full">
              {/* Areas List */}
              <div className="w-80 border-r p-6" style={{ borderColor: "var(--border)" }}>
                <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Capability Areas
                </h3>
                <div className="space-y-2">
                  {selectedDomain.areas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setSelectedAreaId(area.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        selectedArea?.id === area.id ? "shadow-md" : "hover:shadow-sm"
                      }`}
                      style={{
                        backgroundColor: selectedArea?.id === area.id ? "var(--grad-accent-b)" : "var(--bg-subtle)",
                        color: selectedArea?.id === area.id ? "white" : "var(--text)",
                      }}
                    >
                      <div className="font-medium text-sm mb-1">{area.name}</div>
                      <div
                        className="text-xs"
                        style={{
                          color: selectedArea?.id === area.id ? "rgba(255,255,255,0.8)" : "var(--text-muted)",
                        }}
                      >
                        {area.capabilities.length} capabilities
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Capabilities Table */}
              <div className="flex-1 p-6">
                {selectedArea && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="font-semibold text-lg" style={{ color: "var(--text)" }}>
                          {selectedArea.name} Capabilities
                        </h3>
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {selectedArea.capabilities.length} capabilities in this area
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {selectedArea.capabilities.map((capability) => {
                        const solutions = getCapabilitySolutions(capability.id)
                        const capabilityProcesses = getCapabilityProcesses(capability.id)
                        const capabilityIndustries = getCapabilityIndustries(capability.id)
                        const capabilityKPIs = getCapabilityKPIs(capability.id)

                        return (
                          <div
                            key={capability.id}
                            className="p-4 rounded-lg border"
                            style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                                  {capability.name}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <TrendingUp size={14} style={{ color: "var(--text-muted)" }} />
                                      <span style={{ color: "var(--text-muted)" }}>Processes</span>
                                    </div>
                                    <div className="space-y-1">
                                      {capabilityProcesses.slice(0, 2).map((process) => (
                                        <div key={process.id} className="text-xs" style={{ color: "var(--text)" }}>
                                          {process.name}
                                        </div>
                                      ))}
                                      {capabilityProcesses.length > 2 && (
                                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                          +{capabilityProcesses.length - 2} more
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Building2 size={14} style={{ color: "var(--text-muted)" }} />
                                      <span style={{ color: "var(--text-muted)" }}>Industries</span>
                                    </div>
                                    <div className="space-y-1">
                                      {capabilityIndustries.slice(0, 2).map((industry) => (
                                        <div key={industry.id} className="text-xs" style={{ color: "var(--text)" }}>
                                          {industry.name}
                                        </div>
                                      ))}
                                      {capabilityIndustries.length > 2 && (
                                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                          +{capabilityIndustries.length - 2} more
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Target size={14} style={{ color: "var(--text-muted)" }} />
                                      <span style={{ color: "var(--text-muted)" }}>KPIs</span>
                                    </div>
                                    <div className="space-y-1">
                                      {capabilityKPIs.slice(0, 2).map((kpi) => (
                                        <div key={kpi.id} className="text-xs" style={{ color: "var(--text)" }}>
                                          {kpi.name}
                                        </div>
                                      ))}
                                      {capabilityKPIs.length > 2 && (
                                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                          +{capabilityKPIs.length - 2} more
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <Package size={14} style={{ color: "var(--text-muted)" }} />
                                      <span style={{ color: "var(--text-muted)" }}>Solutions</span>
                                    </div>
                                    <div className="text-xs mb-2" style={{ color: "var(--text)" }}>
                                      {solutions.length} available
                                    </div>
                                    {solutions.length > 0 && (
                                      <button
                                        onClick={() => handleExploreSolutions(capability.id)}
                                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-md hover:shadow-sm transition-all"
                                        style={{ background: "var(--grad-accent-b)", color: "white" }}
                                      >
                                        <ExternalLink size={12} />
                                        Explore solutions
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
