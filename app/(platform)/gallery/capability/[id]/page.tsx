"use client"

import { useParams } from "next/navigation"
import { ArrowLeftIcon, PlusIcon, MapIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function CapabilityDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { capabilities, valueChains, galleryRegistry, galleryAddToDesign } = useICStore()

  const capability = capabilities.find((c) => c.id === id)
  const capabilityName = capability?.name || id.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())

  // Get parent and children capabilities
  const parentCapability = capability?.parentId ? capabilities.find((c) => c.id === capability.parentId) : null
  const childCapabilities = capabilities.filter((c) => c.parentId === id)

  // Get related processes
  const relatedProcesses = valueChains.filter((vc) => capability?.processKeys?.includes(vc.key))

  // Get related gallery items
  const relatedReferences = galleryRegistry.references.filter((r) => r.capabilityIds?.includes(id))
  const relatedPatterns = galleryRegistry.patterns.filter((p) => p.capabilityIds?.includes(id))
  const relatedAccelerators = galleryRegistry.accelerators.filter((a) => a.capabilityIds?.includes(id))

  const handleAddToDesign = () => {
    if (capability) {
      galleryAddToDesign("reference", capability.id, { capabilityIds: [capability.id] })
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
              {capabilityName}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Business capability overview and relationships
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Capability Overview */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Capability Description
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                {capability
                  ? `${capabilityName} encompasses the organizational ability to perform specific business functions and deliver value through coordinated processes, people, and technology.`
                  : "This capability provides essential business functions and supports key organizational processes."}
              </p>

              {/* Hierarchy */}
              <div className="mb-6">
                <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                  Capability Hierarchy
                </h3>
                <div className="space-y-2">
                  {parentCapability && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Parent:
                      </span>
                      <Link
                        href={`/gallery/capability/${parentCapability.id}`}
                        className="text-sm font-medium hover:underline"
                        style={{ color: "var(--blue-600)" }}
                      >
                        {parentCapability.name}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Current:
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {capabilityName}
                    </span>
                  </div>
                  {childCapabilities.length > 0 && (
                    <div>
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Children:
                      </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {childCapabilities.map((child) => (
                          <Link
                            key={child.id}
                            href={`/gallery/capability/${child.id}`}
                            className="px-2 py-1 rounded-lg text-xs font-medium hover:scale-105 transition-all"
                            style={{
                              backgroundColor: "var(--blue-100)",
                              color: "var(--blue-800)",
                            }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Processes */}
              <div>
                <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                  Related Processes ({relatedProcesses.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedProcesses.map((process) => (
                    <Link
                      key={process.id}
                      href={`/gallery/process/${process.key.toLowerCase()}`}
                      className="px-3 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all"
                      style={{
                        backgroundColor: "var(--green-100)",
                        color: "var(--green-800)",
                      }}
                    >
                      {process.name}
                    </Link>
                  ))}
                  {relatedProcesses.length === 0 && (
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      No processes mapped yet
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Linked Gallery Items */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Linked Gallery Items
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Reference Models */}
                <div>
                  <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Reference Models ({relatedReferences.length})
                  </h3>
                  <div className="space-y-2">
                    {relatedReferences.slice(0, 3).map((ref) => (
                      <Link
                        key={ref.id}
                        href={`/gallery/reference/${ref.id}`}
                        className="block p-3 rounded-lg transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
                          {ref.title}
                        </div>
                        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                          {ref.views.length} views
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            galleryAddToDesign("reference", ref.id)
                          }}
                          className="mt-2 px-2 py-1 rounded text-xs font-medium transition-colors hover:scale-105"
                          style={{
                            background: "var(--grad-accent-b)",
                            color: "white",
                          }}
                        >
                          Add to Design
                        </button>
                      </Link>
                    ))}
                    {relatedReferences.length === 0 && (
                      <div className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>
                        No reference models
                      </div>
                    )}
                  </div>
                </div>

                {/* Patterns */}
                <div>
                  <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Patterns ({relatedPatterns.length})
                  </h3>
                  <div className="space-y-2">
                    {relatedPatterns.slice(0, 3).map((pattern) => (
                      <Link
                        key={pattern.id}
                        href={`/gallery/pattern/${pattern.id}`}
                        className="block p-3 rounded-lg transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
                          {pattern.title}
                        </div>
                        <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                          {pattern.kind}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            galleryAddToDesign("pattern", pattern.id)
                          }}
                          className="px-2 py-1 rounded text-xs font-medium transition-colors hover:scale-105"
                          style={{
                            background: "var(--grad-accent-b)",
                            color: "white",
                          }}
                        >
                          Add to Design
                        </button>
                      </Link>
                    ))}
                    {relatedPatterns.length === 0 && (
                      <div className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>
                        No patterns available
                      </div>
                    )}
                  </div>
                </div>

                {/* Accelerators */}
                <div>
                  <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Accelerators ({relatedAccelerators.length})
                  </h3>
                  <div className="space-y-2">
                    {relatedAccelerators.slice(0, 3).map((accelerator) => (
                      <Link
                        key={accelerator.id}
                        href={`/gallery/accelerator/${accelerator.id}`}
                        className="block p-3 rounded-lg transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
                          {accelerator.title}
                        </div>
                        <div className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                          {accelerator.assetType} • {accelerator.version}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            galleryAddToDesign("accelerator", accelerator.id)
                          }}
                          className="px-2 py-1 rounded text-xs font-medium transition-colors hover:scale-105"
                          style={{
                            background: "var(--grad-accent-b)",
                            color: "white",
                          }}
                        >
                          Add to Design
                        </button>
                      </Link>
                    ))}
                    {relatedAccelerators.length === 0 && (
                      <div className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>
                        No accelerators available
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Quick Stats
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Processes:</span>
                  <span style={{ color: "var(--text)" }}>{relatedProcesses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>References:</span>
                  <span style={{ color: "var(--text)" }}>{relatedReferences.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Patterns:</span>
                  <span style={{ color: "var(--text)" }}>{relatedPatterns.length}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Accelerators:</span>
                  <span style={{ color: "var(--text)" }}>{relatedAccelerators.length}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleAddToDesign}
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105"
                  style={{
                    background: "var(--grad-primary)",
                    color: "white",
                  }}
                >
                  Add to Design
                </button>
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Export Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
