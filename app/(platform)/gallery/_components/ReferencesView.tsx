"use client"

import { useGalleryStore } from "@/lib/store/gallery"
import SolutionTile from "./SolutionTile"

export default function ReferencesView() {
  const { itemsByView, pageIndex, pageSize, setPageIndex } = useGalleryStore()

  const filtered = itemsByView()
  const visible = filtered.slice(0, pageSize * (pageIndex + 1))
  const hasMore = visible.length < filtered.length

  const handleLoadMore = () => {
    setPageIndex(pageIndex + 1)
  }

  if (filtered.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text)" }}>
            Reference Architectures & Blueprints
          </h2>
          <p className="text-lg mb-4" style={{ color: "var(--text-muted)" }}>
            No reference packages match your current filters
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
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Reference Architectures & Blueprints
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Explore solution packages with detailed artifacts, business value, and implementation guidance
        </p>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Showing {visible.length} of {filtered.length} reference packages
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
