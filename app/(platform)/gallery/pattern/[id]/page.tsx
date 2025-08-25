"use client"

import { useParams } from "next/navigation"
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function PatternDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { galleryRegistry, galleryAddToDesign, galleryCompareToggle, compareItems } = useICStore()

  const pattern = galleryRegistry.patterns.find((p) => p.id === id)
  const isInCompare = compareItems.some((item) => item.type === "pattern" && item.id === id)

  // Get related references
  const relatedReferences =
    pattern?.relatedReferenceIds
      ?.map((refId) => galleryRegistry.references.find((r) => r.id === refId))
      .filter(Boolean) || []

  if (!pattern) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Pattern Not Found
          </h1>
          <Link href="/gallery" className="text-blue-600 hover:underline">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToDesign = () => {
    galleryAddToDesign("pattern", pattern.id)
  }

  const handleCompareToggle = () => {
    galleryCompareToggle("pattern", pattern.id)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/gallery" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "var(--text)" }} />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {pattern.title}
              </h1>
              <span
                className="px-3 py-1 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: "var(--purple-100)",
                  color: "var(--purple-800)",
                }}
              >
                {pattern.kind}
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {pattern.summary || "Design pattern for common architectural challenges"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCompareToggle}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                isInCompare ? "bg-blue-100 text-blue-800" : ""
              }`}
              style={{
                backgroundColor: isInCompare ? "var(--blue-100)" : "var(--surface)",
                color: isInCompare ? "var(--blue-800)" : "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              {isInCompare ? "Remove from Compare" : "Add to Compare"}
            </button>
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
            <Link
              href="/design"
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text)",
                border: "1px solid var(--border)",
              }}
            >
              Open in Design Studio
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* What & When to Use */}
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
                What & When to Use
              </h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                {pattern.summary ||
                  `The ${pattern.title} pattern provides a proven solution for ${pattern.kind.toLowerCase()} challenges in enterprise architectures. This pattern is particularly useful when you need to address common architectural concerns while maintaining flexibility and scalability.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Use When:
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                    <li>• You need proven {pattern.kind.toLowerCase()} solutions</li>
                    <li>• Scalability and maintainability are priorities</li>
                    <li>• Team expertise aligns with pattern complexity</li>
                    <li>• Long-term architectural consistency is important</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Avoid When:
                  </h3>
                  <ul className="text-sm space-y-1" style={{ color: "var(--text-muted)" }}>
                    <li>• Simple solutions would suffice</li>
                    <li>• Team lacks necessary expertise</li>
                    <li>• Rapid prototyping is the priority</li>
                    <li>• Pattern overhead exceeds benefits</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Prerequisites */}
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
                Prerequisites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pattern.prerequisites?.map((prereq, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span className="text-sm" style={{ color: "var(--text)" }}>
                      {prereq}
                    </span>
                  </div>
                )) || (
                  <div className="col-span-full text-center py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                    No specific prerequisites defined
                  </div>
                )}
              </div>
            </div>

            {/* Implementation Steps */}
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
                Implementation Steps
              </h2>
              <div className="space-y-4">
                {pattern.steps?.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: "var(--blue-100)",
                        color: "var(--blue-800)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: "var(--text)" }}>
                        {step}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                    Implementation steps will be provided based on your specific requirements
                  </div>
                )}
              </div>
            </div>

            {/* Success Metrics */}
            {pattern.metrics && pattern.metrics.length > 0 && (
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
                  Success Metrics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pattern.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pattern Info */}
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
                Pattern Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Category:</span>
                  <span style={{ color: "var(--text)" }}>{pattern.kind}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Industries:</span>
                  <span style={{ color: "var(--text)" }}>{pattern.industryIds?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Processes:</span>
                  <span style={{ color: "var(--text)" }}>{pattern.processKeys?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Updated:</span>
                  <span style={{ color: "var(--text)" }}>{new Date(pattern.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Related References */}
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
                Related References
              </h3>
              <div className="space-y-2">
                {relatedReferences.map((ref) => (
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
                      {ref.views.length} views • {ref.status}
                    </div>
                  </Link>
                ))}
                {relatedReferences.length === 0 && (
                  <div className="text-xs text-center py-4" style={{ color: "var(--text-muted)" }}>
                    No related references
                  </div>
                )}
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
                <Link
                  href="/design"
                  className="block w-full px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Open in Design Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
