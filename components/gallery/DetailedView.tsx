"use client"

import { ArrowLeftIcon, PlayIcon, PauseIcon, ShareIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useState, useRef } from "react"
import type { TileContent } from "./TileGrid"

interface DetailedContent extends TileContent {
  overview?: string
  features?: string[]
  requirements?: string[]
  useCases?: string[]
  implementation?: {
    title: string
    steps: string[]
  }
  benefits?: string[]
  documentation?: string
  repository?: string
  support?: string
}

interface DetailedViewProps {
  content: DetailedContent
  onBack: () => void
  onAddToDesign?: (item: DetailedContent) => void
  onShare?: (item: DetailedContent) => void
}

export function DetailedView({ content, onBack, onAddToDesign, onShare }: DetailedViewProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <ArrowLeftIcon className="h-5 w-5" style={{ color: "var(--text)" }} />
              </button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
                    {content.title}
                  </h1>
                  <span
                    className="px-3 py-1 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: "var(--blue-100)",
                      color: "var(--blue-800)",
                    }}
                  >
                    {content.category}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {content.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onAddToDesign?.(content)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                <PlusIcon className="h-4 w-4 inline mr-2" />
                Add to Design
              </button>
              <button
                onClick={() => onShare?.(content)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <ShareIcon className="h-4 w-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Demo Video Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
              Demo Video
            </h2>
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="relative aspect-video">
                {/* Placeholder for actual video - in real implementation, this would be a proper video element */}
                <img
                  src={content.demoVideo || "/placeholder.svg?height=400&width=800&query=demo video"}
                  alt={`${content.title} demo video`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="p-4 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all duration-200 hover:scale-110"
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-8 w-8" style={{ color: "var(--text)" }} />
                    ) : (
                      <PlayIcon className="h-8 w-8" style={{ color: "var(--text)" }} />
                    )}
                  </button>
                </div>
                {content.duration && (
                  <div className="absolute bottom-4 right-4">
                    <span
                      className="px-3 py-1 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        color: "white",
                      }}
                    >
                      {Math.floor(content.duration / 60)}:{(content.duration % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Overview Section */}
          {content.overview && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Overview
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                  {content.overview}
                </p>
              </div>
            </section>
          )}

          {/* Key Features Section */}
          {content.features && content.features.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Key Features
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <ul className="space-y-3">
                  {content.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "var(--blue-500)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Use Cases Section */}
          {content.useCases && content.useCases.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Use Cases
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <p className="text-sm" style={{ color: "var(--text)" }}>
                      {useCase}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Implementation Section */}
          {content.implementation && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                {content.implementation.title}
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <ol className="space-y-4">
                  {content.implementation.steps.map((step, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                        style={{ backgroundColor: "var(--blue-500)" }}
                      >
                        {index + 1}
                      </div>
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          )}

          {/* Benefits Section */}
          {content.benefits && content.benefits.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{
                      backgroundColor: "var(--green-50)",
                      border: "1px solid var(--green-200)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: "var(--green-500)" }}
                    />
                    <span className="text-sm" style={{ color: "var(--green-800)" }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Requirements Section */}
          {content.requirements && content.requirements.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Requirements
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <ul className="space-y-2">
                  {content.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: "var(--orange-500)" }}
                      />
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Technical Details */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
              Technical Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Version
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {content.version || "Latest"}
                </p>
              </div>
              {content.license && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    License
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {content.license}
                  </p>
                </div>
              )}
              <div
                className="rounded-xl p-4"
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                  Category
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {content.category}
                </p>
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
              Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.documentation && (
                <a
                  href={content.documentation}
                  className="rounded-xl p-4 transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Documentation
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    View complete documentation
                  </p>
                </a>
              )}
              {content.repository && (
                <a
                  href={content.repository}
                  className="rounded-xl p-4 transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Repository
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Access source code
                  </p>
                </a>
              )}
              {content.support && (
                <a
                  href={content.support}
                  className="rounded-xl p-4 transition-colors hover:bg-gray-50"
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "var(--text)" }}>
                    Support
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Get help and support
                  </p>
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
