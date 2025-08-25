"use client"

import { PlusIcon, ShareIcon, PlayIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import type { TileContent } from "./TileGrid"

interface ContentTileProps {
  content: TileContent
  categoryColor?: string
  onClick?: () => void
  onAddToDesign?: () => void
  onShare?: () => void
}

export function ContentTile({
  content,
  categoryColor = "var(--blue-100)",
  onClick,
  onAddToDesign,
  onShare,
}: ContentTileProps) {
  const getCategoryGradient = (category: string) => {
    const categoryLower = category.toLowerCase()
    if (categoryLower.includes("active") || categoryLower.includes("template") || categoryLower.includes("ai tool")) {
      return "var(--gradient-accent-orange)"
    }
    if (categoryLower.includes("tool") || categoryLower.includes("engine")) {
      return "var(--gradient-primary)"
    }
    if (categoryLower.includes("analytics") || categoryLower.includes("reporting")) {
      return "var(--gradient-accent-a)"
    }
    return "var(--gradient-accent-b)"
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return null
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const mockContextData = {
    industries: ["Financial Services", "Manufacturing"],
    valueChains: ["Source to Pay", "Lead to Cash"],
    processes: ["Purchase Requisition", "Invoice Processing"],
    complexity: "Medium" as const,
    estTimelineWeeks: 8,
    vendor: "SAP" as const,
    fitScore: 85,
  }

  return (
    <div
      className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] cursor-pointer group relative"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        e.currentTarget.style.borderImage =
          "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3)) 1"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        e.currentTarget.style.borderImage = "none"
      }}
      onClick={() => {
        console.log("[v0] Tile clicked:", content.title)
        onClick?.()
      }}
    >
      {mockContextData.fitScore >= 70 && (
        <div className="absolute top-3 right-3 z-10">
          <div
            className="px-2 py-1 rounded-lg text-xs font-medium text-white backdrop-blur-sm"
            style={{
              background: "var(--gradient-orange)",
              boxShadow: "0 2px 8px rgba(255, 138, 0, 0.3)",
            }}
          >
            Recommended • {mockContextData.fitScore}%
          </div>
        </div>
      )}

      {/* Demo Video Thumbnail - Fixed 16:9 aspect ratio */}
      <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100" style={{ aspectRatio: "16/9" }}>
        {content.demoVideo ? (
          <img
            src={content.demoVideo || "/placeholder.svg"}
            alt={`${content.title} demo`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-200">
          <PlayIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>

        {/* Duration chip */}
        {content.duration && (
          <div className="absolute top-3 left-3">
            <span
              className="px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              }}
            >
              {formatDuration(content.duration)}
            </span>
          </div>
        )}
      </div>

      {/* Category Badge and Version */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-3 py-1 rounded-lg text-xs font-medium text-white"
          style={{
            background: getCategoryGradient(content.category),
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {content.category}
        </span>
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {content.version}
        </span>
      </div>

      {/* Title and Description */}
      <h3
        className="font-bold text-lg mb-2 line-clamp-1"
        style={{
          color: "var(--text)",
          fontFamily: "var(--font-sans)",
        }}
      >
        {content.title}
      </h3>

      <p className="text-sm mb-4 line-clamp-1" style={{ color: "var(--text-muted)" }}>
        {content.description}
      </p>

      <div className="mb-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {mockContextData.industries.slice(0, 1).map((industry) => (
            <span
              key={industry}
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: "rgba(11, 42, 111, 0.1)",
                color: "var(--brand-royal)",
                border: "1px solid rgba(11, 42, 111, 0.2)",
              }}
            >
              {industry}
            </span>
          ))}
          {mockContextData.valueChains.slice(0, 1).map((chain) => (
            <span
              key={chain}
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: "rgba(20, 184, 166, 0.1)",
                color: "var(--accent-teal)",
                border: "1px solid rgba(20, 184, 166, 0.2)",
              }}
            >
              {chain}
            </span>
          ))}
          {mockContextData.processes.slice(0, 1).map((process) => (
            <span
              key={process}
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: "rgba(79, 70, 229, 0.1)",
                color: "var(--brand-cobalt)",
                border: "1px solid rgba(79, 70, 229, 0.2)",
              }}
            >
              {process}
            </span>
          ))}
          {mockContextData.industries.length + mockContextData.valueChains.length + mockContextData.processes.length >
            3 && (
            <span
              className="px-2 py-1 rounded-md text-xs font-medium"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
            >
              +
              {mockContextData.industries.length +
                mockContextData.valueChains.length +
                mockContextData.processes.length -
                3}
            </span>
          )}
        </div>

        <div className="text-xs" style={{ color: "var(--text-muted)" }}>
          {mockContextData.complexity} • {mockContextData.estTimelineWeeks}w est. • {mockContextData.vendor}
        </div>
      </div>

      {/* License (for accelerators) */}
      {content.license && (
        <div className="mb-4">
          <span
            className="px-2 py-1 rounded-lg text-xs font-medium"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            {content.license}
          </span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg text-white"
          style={{
            background: mockContextData.fitScore >= 70 ? "var(--gradient-orange)" : "var(--gradient-primary)",
            boxShadow:
              mockContextData.fitScore >= 70 ? "0 2px 4px rgba(255, 138, 0, 0.2)" : "0 2px 4px rgba(59, 130, 246, 0.2)",
          }}
          onMouseEnter={(e) => {
            const shadowColor = mockContextData.fitScore >= 70 ? "rgba(255, 138, 0, 0.4)" : "rgba(59, 130, 246, 0.4)"
            e.currentTarget.style.boxShadow = `0 4px 12px ${shadowColor}`
          }}
          onMouseLeave={(e) => {
            const shadowColor = mockContextData.fitScore >= 70 ? "rgba(255, 138, 0, 0.2)" : "rgba(59, 130, 246, 0.2)"
            e.currentTarget.style.boxShadow = `0 2px 4px ${shadowColor}`
          }}
          onClick={(e) => {
            e.stopPropagation()
            console.log("[v0] Open Demo button clicked:", content.title)
            onClick?.()
          }}
        >
          {content.demo?.interactiveUrl ? "Open Demo" : "View Details"}
        </button>

        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              console.log("[v0] Add to Design clicked:", content.title)
              onAddToDesign?.()
            }}
            title="Add to Design"
          >
            <PlusIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              console.log("[v0] Share clicked:", content.title)
              onShare?.()
            }}
            title="Share"
          >
            <ShareIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              console.log("[v0] More options clicked:", content.title)
              // Handle overflow menu
            }}
            title="More options"
          >
            <EllipsisHorizontalIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>
      </div>
    </div>
  )
}
