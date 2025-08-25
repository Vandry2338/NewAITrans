"use client"

import { useGalleryStore } from "@/lib/store/gallery"
import SolutionTile from "./SolutionTile"

export default function TileGrid() {
  const { visibleItems, filteredItems, pageIndex, pageSize, setPageIndex } = useGalleryStore()

  const visible = visibleItems()
  const filtered = filteredItems()
  const hasMore = visible.length < filtered.length

  const handleLoadMore = () => {
    setPageIndex(pageIndex + 1)
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg mb-4" style={{ color: "var(--text-muted)" }}>
          No solutions match your current filters
        </p>
        <button
          onClick={() => useGalleryStore.getState().clearFilters()}
          className="px-6 py-3 rounded-xl font-medium transition-colors"
          style={{
            background: "var(--grad-primary)",
            color: "white",
          }}
        >
          Reset Filters
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing {visible.length} of {filtered.length} solutions
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visible.map((item) => (
          <SolutionTile key={item.id} item={item} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 rounded-xl font-medium transition-colors hover:scale-105"
            style={{
              background: "var(--grad-accent-b)",
              color: "white",
            }}
          >
            Load More ({filtered.length - visible.length} remaining)
          </button>
        </div>
      )}
    </div>
  )
}
