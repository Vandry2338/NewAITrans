"use client"

import { PlayIcon, BookmarkIcon, ShareIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { useGalleryStore, type ReferencePackage } from "@/lib/store/gallery"
import { useRouter } from "next/navigation"

interface SolutionTileProps {
  item: ReferencePackage
}

export default function SolutionTile({ item }: SolutionTileProps) {
  const { setSelectedItemId, industries, processes } = useGalleryStore()
  const router = useRouter()

  const handleTileClick = () => {
    // Navigate to specific page for certain tiles
    if (item.slug === "genai-btp") {
      router.push("/gallery/references/genai-btp")
    } else if (item.slug === "joule-studio") {
      router.push("/gallery/references/joule-studio")
    } else if (item.slug === "event-driven-applications") {
      router.push("/gallery/references/event-driven-applications")
    } else if (item.slug === "sap-build-process-automation") {
      router.push("/gallery/references/sap-build-process-automation")
    } else {
      // Default behavior - open overlay
      setSelectedItemId(item.id)
    }
  }

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "Use Case":
        return "var(--grad-orange)"
      case "Reference Architecture":
        return "var(--grad-primary)"
      case "Pattern":
        return "var(--grad-accent-a)"
      case "Accelerator":
        return "var(--grad-accent-b)"
      default:
        return "var(--grad-primary)"
    }
  }

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      onClick={handleTileClick}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-3 py-1 rounded-lg text-xs font-medium text-white"
          style={{ background: getTypeGradient(item.type) }}
        >
          {item.type}
        </span>
      </div>

      {/* Video Thumbnail */}
      <div className="relative mb-4 aspect-video rounded-xl overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayIcon className="h-8 w-8 text-gray-400" />
        </div>
        {item.videoUrl && (
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Demo</div>
        )}
      </div>

      {/* Title and Summary */}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: "var(--text)" }}>
        {item.title}
      </h3>

      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-muted)" }}>
        {item.summary}
      </p>

      {/* Meta Chips */}
      <div className="flex flex-wrap gap-1 mb-4">
        {item.industries.slice(0, 1).map((industryId) => {
          const industry = industries.find((i) => i.id === industryId)
          return industry ? (
            <span key={industryId} className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              {industry.name}
            </span>
          ) : null
        })}
        {item.processes.slice(0, 2).map((processId) => {
          const process = processes.find((p) => p.id === processId)
          return process ? (
            <span key={processId} className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              {process.name}
            </span>
          ) : null
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
          style={{ background: getTypeGradient(item.type) }}
          onClick={(e) => {
            e.stopPropagation()
            handleTileClick()
          }}
        >
          Open Overview
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <BookmarkIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ShareIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <EllipsisHorizontalIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          </button>
        </div>
      </div>
    </div>
  )
}
