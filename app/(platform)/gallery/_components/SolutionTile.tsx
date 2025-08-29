"use client"

import { useState } from "react"
import { PlayIcon, BookmarkIcon, ShareIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { useGalleryStore, type ReferencePackage } from "@/lib/store/gallery"
import { useRouter } from "next/navigation"

interface SolutionTileProps {
  item: ReferencePackage
}

export default function SolutionTile({ item }: SolutionTileProps) {
  const { setSelectedItemId, industries, processes } = useGalleryStore()
  const router = useRouter()
  const [videoExpanded, setVideoExpanded] = useState(false)

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
    // Use premium red for all tiles
    return "linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #dc2626 100%)"
  }

  // Function to render video thumbnail based on item
  const renderVideoThumbnail = () => {
    if (item.videoUrl) {
      return (
        <div className="relative w-full h-full rounded-lg overflow-hidden bg-black/20 border border-white/20">
          <video 
            className="w-full h-full object-cover"
            preload="metadata"
            muted
          >
            <source src={item.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors">
            <PlayIcon className="h-8 w-8 text-white opacity-80" />
          </div>
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">Demo</div>
        </div>
      )
    } else {
      // Default placeholder for items without video
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <PlayIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-xs text-gray-500">Demo Available</p>
          </div>
        </div>
      )
    }
  }

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(220, 38, 38, 0.2)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
      onClick={handleTileClick}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="px-2 py-1 rounded-lg text-xs font-medium text-white"
          style={{ background: getTypeGradient(item.type) }}
        >
          {item.type}
        </span>
      </div>

      {/* Video Thumbnail */}
      <div className="relative mb-3 aspect-video rounded-lg overflow-hidden bg-gray-100">
        {renderVideoThumbnail()}
      </div>

      {/* Title and Summary */}
      <h3 className="font-semibold text-base mb-2 line-clamp-2" style={{ color: "var(--text)" }}>
        {item.title}
      </h3>

      <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>
        {item.summary}
      </p>

      {/* Meta Chips - Compact */}
      <div className="flex flex-wrap gap-1 mb-3">
        {item.industries?.slice(0, 1).map((industryId) => {
          const industry = industries.find((i) => i.id === industryId)
          return industry ? (
            <span
              key={industry.id}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: "rgba(220, 38, 38, 0.1)", 
                color: "#dc2626"
              }}
            >
              {industry.name}
            </span>
          ) : null
        })}
        {item.processes?.slice(0, 1).map((processId) => {
          const process = processes.find((p) => p.id === processId)
          return process ? (
            <span
              key={process.id}
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{ 
                backgroundColor: "rgba(234, 88, 12, 0.1)", 
                color: "#ea580c"
              }}
            >
              {process.name}
            </span>
          ) : null
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          className="px-3 py-1.5 rounded-lg font-medium transition-colors text-white text-sm"
          style={{ background: getTypeGradient(item.type) }}
          onClick={(e) => {
            e.stopPropagation()
            handleTileClick()
          }}
        >
          Open Overview
        </button>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
            <BookmarkIcon className="h-4 w-4" style={{ color: "#dc2626" }} />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
            <ShareIcon className="h-4 w-4" style={{ color: "#dc2626" }} />
          </button>
        </div>
      </div>
    </div>
  )
}
