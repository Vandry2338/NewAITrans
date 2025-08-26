"use client"

import { useState } from "react"
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline"

interface FilterBarProps {
  query?: string
  onQueryChange?: (query: string) => void
  onFiltersChange?: (filters: any) => void
  className?: string
}

export function FilterBar({ query = "", onQueryChange, onFiltersChange, className = "" }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [localQuery, setLocalQuery] = useState(query)
  const [filters, setFilters] = useState({
    industryIds: [] as string[],
    processIds: [] as string[],
    types: [] as string[],
    complexity: [] as string[],
  })

  const hasActiveFilters = Object.values(filters).some((arr) => arr.length > 0)

  const handleFilterChange = (filterType: keyof typeof filters, value: string, checked: boolean) => {
    const currentValues = filters[filterType] as string[]
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)
    const newFilters = { ...filters, [filterType]: newValues }
    
    setFilters(newFilters)
    onFiltersChange?.(newFilters)
  }

  const handleQueryChange = (newQuery: string) => {
    setLocalQuery(newQuery)
    onQueryChange?.(newQuery)
  }

  const clearFilters = () => {
    const clearedFilters = {
      industryIds: [],
      processIds: [],
      types: [],
      complexity: [],
    }
    setFilters(clearedFilters)
    onFiltersChange?.(clearedFilters)
  }

  // Mock data for demonstration
  const industries = [
    { id: "1", name: "Manufacturing" },
    { id: "2", name: "Healthcare" },
    { id: "3", name: "Financial Services" },
    { id: "4", name: "Retail" },
    { id: "5", name: "Energy" },
  ]

  const processes = [
    { id: "1", name: "Order to Cash" },
    { id: "2", name: "Procure to Pay" },
    { id: "3", name: "Plan to Produce" },
    { id: "4", name: "Record to Report" },
    { id: "5", name: "Hire to Retire" },
  ]

  return (
    <div className={`sticky top-0 z-40 border-b bg-white/80 backdrop-blur-sm ${className}`} style={{ borderColor: "var(--border)" }}>
      <div className="px-8 py-4">
        {/* Search and Filter Toggle */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search solutions..."
              value={localQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border transition-colors"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
              hasActiveFilters ? "bg-blue-50 text-blue-700 border-blue-200" : ""
            }`}
            style={{
              backgroundColor: hasActiveFilters ? "var(--blue-50)" : "var(--surface)",
              color: hasActiveFilters ? "var(--blue-700)" : "var(--text)",
              border: `1px solid ${hasActiveFilters ? "var(--blue-200)" : "var(--border)"}`,
            }}
          >
            <FunnelIcon className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {Object.values(filters).reduce((acc, arr) => acc + arr.length, 0)}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Clear all
            </button>
          )}
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.industryIds.map((id) => {
              const industry = industries.find((i) => i.id === id)
              return industry ? (
                <span
                  key={id}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {industry.name}
                  <button
                    onClick={() => handleFilterChange("industryIds", id, false)}
                    className="hover:bg-blue-200 rounded-full p-0.5"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              ) : null
            })}
            {/* Add similar pills for other filter types */}
          </div>
        )}

        {/* Expandable Filter Drawers */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 border">
            {/* Industry Filter */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Industry</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {industries.map((industry) => (
                  <label key={industry.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.industryIds.includes(industry.id)}
                      onChange={(e) => handleFilterChange("industryIds", industry.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    {industry.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Process Filter */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Process</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {processes.map((process) => (
                  <label key={process.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.processIds.includes(process.id)}
                      onChange={(e) => handleFilterChange("processIds", process.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    {process.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Solution Type Filter */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Solution Type</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  "Use Case",
                  "Reference Architecture",
                  "Pattern",
                  "Accelerator",
                  "Demo",
                  "Tool",
                  "Template",
                  "Agent",
                ].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={(e) => handleFilterChange("types", type, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Complexity Filter */}
            <div>
              <h4 className="font-medium mb-2 text-sm">Complexity</h4>
              <div className="space-y-2">
                {["Low", "Medium", "High"].map((complexity) => (
                  <label key={complexity} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.complexity.includes(complexity)}
                      onChange={(e) => handleFilterChange("complexity", complexity, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    {complexity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar
