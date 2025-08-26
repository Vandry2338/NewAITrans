"use client"

import { useEffect } from "react"
import { ReadonlyURLSearchParams } from "next/navigation"
import { useGalleryStore } from "@/lib/store/gallery"
import Hero from "../_components/Hero"
import FilterBar from "../_components/FilterBar"
import ItemOverlay from "../_components/ItemOverlay"

import IndustriesView from "../_components/IndustriesView"
import ProcessesView from "../_components/ProcessesView"
import ReferencesView from "../_components/ReferencesView"
import BcmView from "../_components/BcmView"

interface SolutionsGalleryClientProps {
  searchParams: ReadonlyURLSearchParams
}

export default function SolutionsGalleryClient({ searchParams }: SolutionsGalleryClientProps) {
  const { selectedItemId, setSelectedItemId, view, setView } = useGalleryStore()

  // Initialize view from searchParams on mount
  useEffect(() => {
    const viewParam = searchParams.get("view") as "industries" | "processes" | "references" | "bcm" | null
    if (viewParam && viewParam !== view) {
      setView(viewParam)
    }
  }, [searchParams, view, setView])

  const handleCloseOverlay = () => {
    setSelectedItemId(null)
  }

  const viewOptions = [
    {
      key: "industries" as const,
      label: "Industries & Value Chains",
      description: "Explore by industry and value chains",
    },
    {
      key: "processes" as const,
      label: "End-to-End Processes & Subprocesses",
      description: "Browse E2E processes and modules",
    },
    {
      key: "references" as const,
      label: "Reference Architectures & Blueprints",
      description: "Solution packages and artifacts",
    },
    {
      key: "bcm" as const,
      label: "Business Capability Model (BCM) Categories",
      description: "Capability domains and areas",
    },
  ]

  const renderViewContent = () => {
    switch (view) {
      case "industries":
        return <IndustriesView />
      case "processes":
        return <ProcessesView />
      case "references":
        return <ReferencesView />
      case "bcm":
        return <BcmView />
      default:
        return <IndustriesView />
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <Hero />

      <FilterBar />

      <div
        className="sticky top-0 z-40 px-8 py-4 border-b backdrop-blur-sm"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--bg-subtle)" }}>
            {viewOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setView(option.key)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 text-center ${
                  view === option.key ? "text-white shadow-lg" : "hover:shadow-sm"
                }`}
                style={{
                  background: view === option.key ? "var(--grad-primary)" : "transparent",
                  color: view === option.key ? "white" : "var(--text)",
                }}
                title={option.description}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 py-8">{renderViewContent()}</div>

      {selectedItemId && <ItemOverlay isOpen={!!selectedItemId} onClose={handleCloseOverlay} />}
    </div>
  )
}
