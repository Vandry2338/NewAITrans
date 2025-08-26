"use client"

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

interface SectionHeaderProps {
  title: string
  description: string
  searchQuery: string
  onSearchChange: (query: string) => void
  searchPlaceholder?: string
}

export function SectionHeader({
  title,
  description,
  searchQuery,
  onSearchChange,
  searchPlaceholder = "Search solutions...",
}: SectionHeaderProps) {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
              {title}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              {description}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative max-w-md">
            <MagnifyingGlassIcon
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
