"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { ArrowLeftIcon, PlusIcon, DocumentArrowDownIcon, CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function ReferenceModelDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [selectedView, setSelectedView] = useState<string | null>(null)

  const { galleryRegistry, galleryAddToDesign, galleryCompareToggle, compareItems } = useICStore()

  const referenceModel = galleryRegistry.references.find((r) => r.id === id)
  const isInCompare = compareItems.some((item) => item.type === "reference" && item.id === id)

  if (!referenceModel) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Reference Model Not Found
          </h1>
          <Link href="/gallery" className="text-blue-600 hover:underline">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToDesign = () => {
    galleryAddToDesign("reference", referenceModel.id)
  }

  const handleCompareToggle = () => {
    galleryCompareToggle("reference", referenceModel.id)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/gallery" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "var(--text)" }} />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              {referenceModel.title}
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {referenceModel.summary || "Reference architecture model"}
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
              href="/design/views"
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {referenceModel.industryIds?.map((industryId) => (
            <span
              key={industryId}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: "var(--green-100)",
                color: "var(--green-800)",
              }}
            >
              {industryId}
            </span>
          ))}
          {referenceModel.processKeys?.map((processKey) => (
            <span
              key={processKey}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: "var(--blue-100)",
                color: "var(--blue-800)",
              }}
            >
              {processKey}
            </span>
          ))}
          {referenceModel.capabilityIds?.map((capabilityId) => (
            <span
              key={capabilityId}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: "var(--purple-100)",
                color: "var(--purple-800)",
              }}
            >
              {capabilityId}
            </span>
          ))}
          <span
            className="px-3 py-1 rounded-lg text-xs font-medium"
            style={{
              backgroundColor:
                referenceModel.status === "GA"
                  ? "var(--green-100)"
                  : referenceModel.status === "Preview"
                    ? "var(--yellow-100)"
                    : "var(--gray-100)",
              color:
                referenceModel.status === "GA"
                  ? "var(--green-800)"
                  : referenceModel.status === "Preview"
                    ? "var(--yellow-800)"
                    : "var(--gray-800)",
            }}
          >
            {referenceModel.status}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Views Gallery */}
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
                Architecture Views
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {referenceModel.views.map((view, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedView(selectedView === view.kind ? null : view.kind)}
                    className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                      selectedView === view.kind ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{
                      backgroundColor: selectedView === view.kind ? "var(--blue-50)" : "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
                      {view.kind}
                    </div>
                    <EyeIcon className="h-5 w-5 mx-auto" style={{ color: "var(--text-muted)" }} />
                  </button>
                ))}
              </div>

              {selectedView && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium" style={{ color: "var(--text)" }}>
                      {selectedView} View
                    </h3>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:scale-105"
                        style={{
                          backgroundColor: "var(--blue-100)",
                          color: "var(--blue-800)",
                        }}
                      >
                        Copy Code
                      </button>
                      <button
                        onClick={handleAddToDesign}
                        className="px-3 py-1 rounded-lg text-xs font-medium transition-colors hover:scale-105"
                        style={{
                          background: "var(--grad-accent-b)",
                          color: "white",
                        }}
                      >
                        Add to Design
                      </button>
                    </div>
                  </div>
                  <pre
                    className="text-xs p-3 rounded-lg overflow-x-auto"
                    style={{
                      backgroundColor: "var(--bg)",
                      color: "var(--text)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {referenceModel.views.find((v) => v.kind === selectedView)?.code || "// Code not available"}
                  </pre>
                </div>
              )}
            </div>

            {/* Bill of Materials */}
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
                Bill of Materials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {referenceModel.bom?.map((component, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>
                      {component.name}
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {component.vendor && `Vendor: ${component.vendor}`}
                      {component.category && ` • Category: ${component.category}`}
                    </div>
                  </div>
                )) || (
                  <div className="col-span-full text-center py-4 text-sm" style={{ color: "var(--text-muted)" }}>
                    No components listed
                  </div>
                )}
              </div>
            </div>

            {/* Trade-off Notes */}
            {referenceModel.tradeoffNotes && (
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
                  Trade-off Notes
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {referenceModel.tradeoffNotes}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Non-functionals */}
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
                Non-functionals
              </h3>
              <div className="space-y-2">
                {referenceModel.nonFunctionals?.map((nf, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--text)",
                    }}
                  >
                    {nf}
                  </div>
                )) || (
                  <div className="text-xs text-center py-2" style={{ color: "var(--text-muted)" }}>
                    No requirements specified
                  </div>
                )}
              </div>
            </div>

            {/* Cloud Services */}
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
                Cloud Services
              </h3>
              <div className="flex flex-wrap gap-1">
                {referenceModel.cloud?.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: "var(--blue-100)",
                      color: "var(--blue-800)",
                    }}
                  >
                    {service}
                  </span>
                )) || (
                  <div className="text-xs text-center py-2" style={{ color: "var(--text-muted)" }}>
                    No cloud services specified
                  </div>
                )}
              </div>
            </div>

            {/* AI Models */}
            {referenceModel.aiModels && referenceModel.aiModels.length > 0 && (
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
                  AI Models
                </h3>
                <div className="flex flex-wrap gap-1">
                  {referenceModel.aiModels.map((model, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: "var(--purple-100)",
                        color: "var(--purple-800)",
                      }}
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Download Options */}
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
                Downloads
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  Download PDF
                </button>
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <DocumentArrowDownIcon className="h-4 w-4" />
                  Download PPTX
                </button>
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
