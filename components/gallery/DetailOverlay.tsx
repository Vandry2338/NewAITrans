"use client"

import { useState, useEffect, useRef } from "react"
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  PlayIcon,
  LinkIcon,
  ShareIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"
import type { TileContent } from "./TileGrid"

interface DetailOverlayProps {
  content: TileContent | null
  isOpen: boolean
  onClose: () => void
  onOpenFullPage?: (content: TileContent) => void
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "demo", label: "Demo Video" },
  { id: "capabilities", label: "Key Capabilities" },
  { id: "value", label: "Business Value" },
  { id: "solution", label: "Solution" },
  { id: "fit", label: "Fit & Mapping" },
]

export function DetailOverlay({ content, isOpen, onClose, onOpenFullPage }: DetailOverlayProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const overlayRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    console.log("[v0] DetailOverlay render - isOpen:", isOpen, "content:", content?.title)

    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement
      document.body.style.overflow = "hidden"

      const focusableElements = overlayRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusableElements?.length) {
        ;(focusableElements[0] as HTMLElement).focus()
      }
    } else {
      document.body.style.overflow = ""
      previousFocusRef.current?.focus()
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose, content])

  if (!isOpen || !content) {
    console.log("[v0] DetailOverlay not rendering - isOpen:", isOpen, "content exists:", !!content)
    return null
  }

  console.log("[v0] DetailOverlay rendering for:", content.title)

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                About {content.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {content.description}. This solution provides comprehensive functionality for modern business processes,
                enabling teams to work more efficiently and achieve better outcomes through advanced automation and
                analytics.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                Quick Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Category:</span>
                  <span className="ml-2" style={{ color: "var(--text)" }}>
                    {content.category}
                  </span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Vendor:</span>
                  <span className="ml-2" style={{ color: "var(--text)" }}>
                    SAP
                  </span>
                </div>
                {content.version && (
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Version:</span>
                    <span className="ml-2" style={{ color: "var(--text)" }}>
                      {content.version}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case "demo":
        return (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
              {content.demoVideo ? (
                <video className="w-full h-full object-cover" controls poster={content.demoVideo} preload="metadata">
                  <source src={content.demoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <PlayIcon className="h-16 w-16 text-white/60 mx-auto mb-4" />
                    <p className="text-white/80">Demo video coming soon</p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Watch this demo to see {content.title} in action and learn how it can benefit your organization.
            </p>
          </div>
        )
      case "capabilities":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Key Capabilities
            </h3>
            <div className="grid gap-3">
              {[
                "Advanced automation and workflow management",
                "Real-time analytics and reporting",
                "Seamless integration with existing systems",
                "Scalable architecture for enterprise use",
                "Comprehensive security and compliance features",
              ].map((capability, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "var(--brand-royal)" }} />
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      case "value":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Business Value
            </h3>
            <div className="grid gap-4">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 138, 0, 0.1) 0%, rgba(255, 94, 58, 0.1) 100%)",
                  border: "1px solid rgba(255, 138, 0, 0.2)",
                }}
              >
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Efficiency Gains
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Reduce manual work by up to 70% through intelligent automation
                </p>
              </div>
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 138, 0, 0.1) 0%, rgba(255, 94, 58, 0.1) 100%)",
                  border: "1px solid rgba(255, 138, 0, 0.2)",
                }}
              >
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Cost Savings
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Lower operational costs and faster time-to-market
                </p>
              </div>
              <div
                className="p-4 rounded-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(255, 138, 0, 0.1) 0%, rgba(255, 94, 58, 0.1) 100%)",
                  border: "1px solid rgba(255, 138, 0, 0.2)",
                }}
              >
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Better Insights
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Data-driven decision making with real-time analytics
                </p>
              </div>
            </div>
          </div>
        )
      case "solution":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Solution Architecture
            </h3>

            {/* Products */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Products & Components
              </h4>
              <div className="flex flex-wrap gap-2">
                {["SAP Signavio", "SAP S/4HANA", "SAP BTP", "Custom Extensions"].map((product) => (
                  <span
                    key={product}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Data Sources
              </h4>
              <div className="flex flex-wrap gap-2">
                {["S/4HANA", "ECC", "Ariba", "CSV Import", "API Connectors"].map((source) => (
                  <span
                    key={source}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation Steps */}
            <div>
              <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Implementation Timeline
              </h4>
              <div className="space-y-3">
                {[
                  {
                    step: 1,
                    title: "Setup & Configuration",
                    desc: "Initial system setup and basic configuration",
                    weeks: "2-3 weeks",
                  },
                  {
                    step: 2,
                    title: "Integration",
                    desc: "Connect with existing systems and data sources",
                    weeks: "3-4 weeks",
                  },
                  {
                    step: 3,
                    title: "Customization",
                    desc: "Tailor the solution to specific requirements",
                    weeks: "4-6 weeks",
                  },
                  {
                    step: 4,
                    title: "Testing & Go-Live",
                    desc: "Comprehensive testing and production deployment",
                    weeks: "2-3 weeks",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                      style={{ backgroundColor: "var(--brand-royal)" }}
                    >
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h5 className="font-medium" style={{ color: "var(--text)" }}>
                          {item.title}
                        </h5>
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}
                        >
                          {item.weeks}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "fit":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                Fit & Mapping
              </h3>
              <div
                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                style={{ background: "var(--gradient-orange)" }}
              >
                Recommended • 85% fit
              </div>
            </div>

            {/* Context Mapping */}
            <div className="grid gap-4">
              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Industries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Financial Services", "Manufacturing"].map((industry) => (
                    <span
                      key={industry}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Value Chains
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Source to Pay", "Lead to Cash"].map((chain) => (
                    <span
                      key={chain}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
                    >
                      {chain}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Linked KPIs
                </h4>
                <div className="space-y-2">
                  {["Process Cycle Time", "Cost per Transaction", "Automation Rate"].map((kpi) => (
                    <div key={kpi} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--brand-royal)" }} />
                      <span style={{ color: "var(--text)" }}>{kpi}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Linked Pain Points
                </h4>
                <div className="space-y-2">
                  {["Manual data entry", "Process visibility gaps", "Compliance tracking"].map((pain) => (
                    <div key={pain} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent-red)" }} />
                      <span style={{ color: "var(--text)" }}>{pain}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        ref={overlayRef}
        className="w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="overlay-title"
      >
        {/* Header with tabs */}
        <div
          className="sticky top-0 z-10"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 id="overlay-title" className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              {content.title}
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Copy link">
                <LinkIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Share">
                <ShareIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
              </button>
              <button
                className="px-3 py-1 rounded-lg text-sm font-medium text-white transition-colors"
                style={{ background: "var(--gradient-orange)" }}
                title="Add to Blueprint"
              >
                <PlusIcon className="h-4 w-4 inline mr-1" />
                Add to Blueprint
              </button>
              {onOpenFullPage && (
                <button
                  onClick={() => onOpenFullPage(content)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Open full page"
                >
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
                </button>
              )}
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Close">
                <XMarkIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex border-b" style={{ borderColor: "var(--border)" }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab.id ? "border-blue-500" : "border-transparent hover:border-gray-300"
                }`}
                style={{
                  color: activeTab === tab.id ? "var(--brand-royal)" : "var(--text-muted)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ height: "calc(80vh - 140px)" }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
