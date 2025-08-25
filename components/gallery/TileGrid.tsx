"use client"

import { useState } from "react"
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ContentTile } from "./ContentTile"
import type { GalleryItem } from "../../lib/types/gallery"

interface TileGridProps {
  content: GalleryItem[]
  searchQuery: string
  categoryColor?: string
  onTileClick?: (item: GalleryItem) => void
  onAddToDesign?: (item: GalleryItem) => void
  onShare?: (item: GalleryItem) => void
}

export function TileGrid({
  content,
  searchQuery,
  categoryColor = "var(--blue-100)",
  onTileClick,
  onAddToDesign,
  onShare,
}: TileGridProps) {
  const [showAll, setShowAll] = useState(false)

  const filteredContent = (content || []).filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const displayedContent = showAll ? filteredContent : filteredContent.slice(0, 9)

  return (
    <div className="px-8 py-8">
      {/* 3x3 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {displayedContent.map((item) => (
          <ContentTile
            key={item.id}
            content={item}
            categoryColor={categoryColor}
            onClick={() => onTileClick?.(item)}
            onAddToDesign={() => onAddToDesign?.(item)}
            onShare={() => onShare?.(item)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {!showAll && filteredContent.length > 9 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            Load More ({filteredContent.length - 9} remaining)
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Show Less Button */}
      {showAll && filteredContent.length > 9 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            Show Less
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg mb-2" style={{ color: "var(--text)" }}>
            No content found
          </p>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Try adjusting your search terms
          </p>
        </div>
      )}
    </div>
  )
}
