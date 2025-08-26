"use client"

import { Suspense } from "react"
import { SectionLayout } from "./SectionLayout"
import type { GalleryItem } from "../../lib/types/gallery"

interface SectionLayoutWrapperProps {
  title: string
  description: string
  content: GalleryItem[]
  categoryColor?: string
  searchPlaceholder?: string
  basePath?: string
  onAddToDesign?: (item: GalleryItem) => void
  onShare?: (item: GalleryItem) => void
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SectionLayoutWrapper(props: SectionLayoutWrapperProps) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SectionLayout {...props} />
    </Suspense>
  )
}
