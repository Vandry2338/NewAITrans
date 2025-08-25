"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ArrowPathIcon,
  CloudArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import { useICStore } from "@/lib/store"

const tabs = [
  { id: "overview", label: "Overview", href: "/design" },
  { id: "inputs", label: "Design Inputs", href: "/design/inputs" },
  { id: "tradeoffs", label: "Trade-offs", href: "/design/tradeoffs" },
  { id: "views", label: "Architecture Views", href: "/design/views" },
  { id: "docs", label: "Docs & Sync", href: "/design/docs" },
]

const docSections = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    description: "High-level overview and key decisions",
    status: "generated",
    lastUpdated: "2024-01-20T10:30:00Z",
    wordCount: 450,
  },
  {
    id: "architecture-overview",
    title: "Architecture Overview",
    description: "System context and architectural principles",
    status: "generated",
    lastUpdated: "2024-01-20T10:30:00Z",
    wordCount: 1200,
  },
  {
    id: "design-decisions",
    title: "Design Decisions",
    description: "Key architectural decisions and rationale",
    status: "generated",
    lastUpdated: "2024-01-20T10:30:00Z",
    wordCount: 800,
  },
  {
    id: "implementation-guide",
    title: "Implementation Guide",
    description: "Development and deployment guidelines",
    status: "out-of-sync",
    lastUpdated: "2024-01-19T15:20:00Z",
    wordCount: 950,
  },
  {
    id: "api-specifications",
    title: "API Specifications",
    description: "Service interfaces and contracts",
    status: "generating",
    lastUpdated: null,
    wordCount: 0,
  },
  {
    id: "deployment-guide",
    title: "Deployment Guide",
    description: "Infrastructure and deployment procedures",
    status: "pending",
    lastUpdated: null,
    wordCount: 0,
  },
]

const syncTargets = [
  {
    id: "confluence",
    name: "Confluence",
    description: "Corporate wiki and documentation platform",
    status: "connected",
    lastSync: "2024-01-20T09:15:00Z",
    icon: "📚",
  },
  {
    id: "github",
    name: "GitHub Wiki",
    description: "Project repository documentation",
    status: "connected",
    lastSync: "2024-01-20T10:30:00Z",
    icon: "🐙",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Team workspace and knowledge base",
    status: "disconnected",
    lastSync: null,
    icon: "📝",
  },
  {
    id: "sharepoint",
    name: "SharePoint",
    description: "Enterprise document management",
    status: "error",
    lastSync: "2024-01-19T14:45:00Z",
    icon: "📊",
  },
]

export default function DocsAndSyncPage() {
  const pathname = usePathname()
  const [selectedSection, setSelectedSection] = useState<string>("executive-summary")
  const [isGenerating, setIsGenerating] = useState(false)

  const { designModels, syncDocs } = useICStore()

  const currentModel = designModels.length > 0 ? designModels[designModels.length - 1] : null
  const selectedSectionData = docSections.find((s) => s.id === selectedSection)

  const handleGenerateDocs = async () => {
    setIsGenerating(true)

    // Simulate documentation generation
    setTimeout(() => {
      if (currentModel) {
        syncDocs(currentModel.id)
      }
      setIsGenerating(false)
      alert("Documentation generated successfully!")
    }, 2000)
  }

  const handleSyncToTarget = (targetId: string) => {
    alert(`Syncing to ${syncTargets.find((t) => t.id === targetId)?.name}...`)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    return new Date(dateString).toLocaleDateString() + " " + new Date(dateString).toLocaleTimeString()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "generated":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case "generating":
        return <ClockIcon className="h-4 w-4 text-blue-500 animate-spin" />
      case "out-of-sync":
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
      case "pending":
        return <ClockIcon className="h-4 w-4 text-gray-400" />
      default:
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
    }
  }

  const getSyncStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <ExclamationTriangleIcon className="h-4 w-4 text-gray-400" />
      case "error":
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
      default:
        return <ClockIcon className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top Navigation Tabs */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="px-8 py-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? "shadow-sm" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--blue-50)" : "transparent",
                    color: isActive ? "var(--blue-800)" : "var(--text)",
                    border: `1px solid ${isActive ? "var(--blue-200)" : "transparent"}`,
                  }}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
                Documentation & Sync
              </h1>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>
                Generate comprehensive architecture documentation and sync across platforms.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentModel && (
                <div
                  className="px-4 py-2 text-sm rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  Model: {currentModel.name}
                </div>
              )}
              <button
                onClick={handleGenerateDocs}
                disabled={isGenerating}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                <ArrowPathIcon className={`h-4 w-4 inline mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating..." : "Generate Docs"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Documentation Sections */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                  Documentation Sections
                </h3>
                <button
                  className="px-3 py-1 text-sm rounded-lg border transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  <CloudArrowDownIcon className="h-4 w-4 inline mr-1" />
                  Export All
                </button>
              </div>

              <div className="space-y-4">
                {docSections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                      selectedSection === section.id ? "ring-2 ring-blue-500" : ""
                    }`}
                    style={{
                      backgroundColor: selectedSection === section.id ? "var(--blue-50)" : "var(--surface)",
                      borderColor: selectedSection === section.id ? "var(--blue-200)" : "var(--border)",
                    }}
                    onClick={() => setSelectedSection(section.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold" style={{ color: "var(--text)" }}>
                            {section.title}
                          </h4>
                          {getStatusIcon(section.status)}
                        </div>
                        <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                          {section.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                          <span>Last updated: {formatDate(section.lastUpdated)}</span>
                          {section.wordCount > 0 && <span>{section.wordCount} words</span>}
                          <span
                            className={`px-2 py-1 rounded-full ${
                              section.status === "generated"
                                ? "bg-green-100 text-green-800"
                                : section.status === "generating"
                                  ? "bg-blue-100 text-blue-800"
                                  : section.status === "out-of-sync"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {section.status.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          className="p-2 rounded-lg border transition-colors hover:bg-gray-50"
                          style={{
                            backgroundColor: "var(--surface)",
                            borderColor: "var(--border)",
                          }}
                          title="Download section"
                        >
                          <CloudArrowDownIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                        </button>
                        <button
                          className="p-2 rounded-lg border transition-colors hover:bg-gray-50"
                          style={{
                            backgroundColor: "var(--surface)",
                            borderColor: "var(--border)",
                          }}
                          title="Regenerate section"
                        >
                          <ArrowPathIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Preview */}
              {selectedSectionData && (
                <div
                  className="mt-8 p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h4 className="font-semibold mb-4" style={{ color: "var(--text)" }}>
                    {selectedSectionData.title} Preview
                  </h4>

                  {selectedSectionData.status === "generated" ? (
                    <div className="prose max-w-none">
                      <div
                        className="p-4 rounded-lg text-sm"
                        style={{
                          backgroundColor: "var(--gray-50)",
                          color: "var(--text)",
                        }}
                      >
                        <h5 className="font-medium mb-2">Sample Content:</h5>
                        <p className="mb-3">
                          This section contains comprehensive documentation about{" "}
                          {selectedSectionData.title.toLowerCase()}. The content is automatically generated from your
                          design inputs, architecture models, and trade-off analysis.
                        </p>
                        <p className="mb-3">
                          Key topics covered include system requirements, architectural patterns, implementation
                          guidelines, and best practices specific to your chosen architecture scenario.
                        </p>
                        <p>
                          <strong>Note:</strong> This is a preview. The full documentation would contain detailed
                          technical specifications, diagrams, code examples, and implementation guidance.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ClockIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {selectedSectionData.status === "generating"
                          ? "Documentation is being generated..."
                          : "This section has not been generated yet."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sync Targets */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--text)" }}>
                Sync Targets
              </h3>

              <div className="space-y-4 mb-8">
                {syncTargets.map((target) => (
                  <div
                    key={target.id}
                    className="p-4 rounded-xl border"
                    style={{
                      backgroundColor: "var(--surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{target.icon}</span>
                        <div>
                          <h4 className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            {target.name}
                          </h4>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            {target.description}
                          </p>
                        </div>
                      </div>
                      {getSyncStatusIcon(target.status)}
                    </div>

                    <div
                      className="flex items-center justify-between text-xs mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span>Last sync: {formatDate(target.lastSync)}</span>
                      <span
                        className={`px-2 py-1 rounded-full ${
                          target.status === "connected"
                            ? "bg-green-100 text-green-800"
                            : target.status === "disconnected"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {target.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSyncToTarget(target.id)}
                        disabled={target.status === "disconnected"}
                        className="flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
                        style={{
                          background: target.status === "connected" ? "var(--grad-primary)" : "var(--gray-300)",
                          color: target.status === "connected" ? "white" : "var(--gray-600)",
                        }}
                      >
                        Sync Now
                      </button>
                      <button
                        className="px-3 py-2 text-xs font-medium rounded-lg border transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                        }}
                      >
                        <Cog6ToothIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sync Settings */}
              <div
                className="p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h4 className="font-medium text-sm mb-3" style={{ color: "var(--text)" }}>
                  Sync Settings
                </h4>
                <div className="space-y-3 text-xs">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span style={{ color: "var(--text)" }}>Auto-sync on model changes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span style={{ color: "var(--text)" }}>Include diagrams in sync</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span style={{ color: "var(--text)" }}>Notify on sync completion</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
