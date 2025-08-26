"use client"

import { X } from "lucide-react"

interface ItemOverlayProps {
  itemId: string
  onClose: () => void
  className?: string
}

export function ItemOverlay({ itemId, onClose, className = "" }: ItemOverlayProps) {
  // Mock item data - in a real implementation, you would fetch this based on itemId
  const itemData = {
    id: itemId,
    name: `Item ${itemId}`,
    description: "This is a detailed description of the selected item. It provides comprehensive information about the solution, pattern, or reference architecture.",
    category: "Solution",
    maturity: "Mature",
    complexity: "Medium",
    solutions: 15,
    processes: 8,
    industries: ["Manufacturing", "Healthcare", "Financial Services"],
    tags: ["AI", "Automation", "Digital Transformation"],
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        style={{ backgroundColor: "var(--surface)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              {itemData.name}
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {itemData.category} • {itemData.maturity} • {itemData.complexity} Complexity
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
              Description
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {itemData.description}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "var(--surface-subtle)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {itemData.solutions}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Solutions Available
              </div>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "var(--surface-subtle)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {itemData.processes}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Related Processes
              </div>
            </div>
            <div className="text-center p-4 rounded-xl" style={{ backgroundColor: "var(--surface-subtle)" }}>
              <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {itemData.industries.length}
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Applicable Industries
              </div>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
              Applicable Industries
            </h3>
            <div className="flex flex-wrap gap-2">
              {itemData.industries.map((industry) => (
                <span
                  key={industry}
                  className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {itemData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              className="px-6 py-3 rounded-lg font-medium transition-colors"
              style={{
                background: "var(--grad-primary)",
                color: "white",
              }}
            >
              View Solutions
            </button>
            <button
              className="px-6 py-3 rounded-lg font-medium border transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              Download Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemOverlay
