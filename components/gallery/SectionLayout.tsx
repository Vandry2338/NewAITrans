"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SectionHeader } from "./SectionHeader"
import { TileGrid } from "./TileGrid"
import { DetailOverlay } from "./DetailOverlay"
import type { GalleryItem } from "../../lib/types/gallery"

interface SectionLayoutProps {
  title: string
  description: string
  content: GalleryItem[]
  categoryColor?: string
  searchPlaceholder?: string
  basePath?: string
  onAddToDesign?: (item: GalleryItem) => void
  onShare?: (item: GalleryItem) => void
}

export function SectionLayout({
  title,
  description,
  content,
  categoryColor,
  searchPlaceholder,
  basePath,
  onAddToDesign,
  onShare,
}: SectionLayoutProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const itemId = searchParams.get("item")
    const section = searchParams.get("section")

    if (itemId) {
      const item = content.find((c) => c.id === itemId)
      if (item) {
        setSelectedItem(item)
        setIsOverlayOpen(true)
      }
    }
  }, [searchParams, content])

  const handleTileClick = (item: GalleryItem) => {
    console.log("[v0] Tile clicked:", item.title)
    setSelectedItem(item)
    setIsOverlayOpen(true)

    const newUrl = new URL(window.location.href)
    newUrl.searchParams.set("item", item.id)
    newUrl.searchParams.set("section", "overview")
    window.history.pushState({}, "", newUrl.toString())
  }

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false)
    setSelectedItem(null)

    const newUrl = new URL(window.location.href)
    newUrl.searchParams.delete("item")
    newUrl.searchParams.delete("section")
    window.history.pushState({}, "", newUrl.toString())
  }

  const handleOpenFullPage = (item: GalleryItem) => {
    if (basePath) {
      router.push(`${basePath}/${item.id}`)
    }
  }

  const handleAddToDesign = (item: GalleryItem) => {
    onAddToDesign?.(item)
    console.log("[v0] Adding to design:", item.title)
  }

  const handleShare = (item: GalleryItem) => {
    onShare?.(item)
    console.log("[v0] Sharing:", item.title)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <SectionHeader
        title={title}
        description={description}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={searchPlaceholder}
      />

      <TileGrid
        content={content}
        searchQuery={searchQuery}
        categoryColor={categoryColor}
        onTileClick={handleTileClick}
        onAddToDesign={handleAddToDesign}
        onShare={handleShare}
      />

      <DetailOverlay
        content={selectedItem}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
        onOpenFullPage={handleOpenFullPage}
      />
    </div>
  )
}
