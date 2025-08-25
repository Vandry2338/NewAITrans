"use client"

import { useParams } from "next/navigation"
import { ArrowLeftIcon, PlayIcon, ClockIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function DemoDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { galleryRegistry } = useICStore()

  const demo = galleryRegistry.demos.find((d) => d.id === id)

  if (!demo) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Demo Not Found
          </h1>
          <Link href="/gallery" className="text-blue-600 hover:underline">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/gallery" className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" style={{ color: "var(--text)" }} />
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {demo.title}
              </h1>
              {demo.durationSec && (
                <span
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: "var(--red-100)",
                    color: "var(--red-800)",
                  }}
                >
                  <ClockIcon className="h-3 w-3" />
                  {formatDuration(demo.durationSec)}
                </span>
              )}
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {demo.scenario || "Interactive demonstration of key features and capabilities"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
              style={{
                background: "var(--grad-primary)",
                color: "white",
              }}
            >
              <PlayIcon className="h-4 w-4" />
              Open Demo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="aspect-video rounded-xl overflow-hidden mb-4"
                style={{ backgroundColor: "var(--surface)" }}
              >
                {demo.videoUrl ? (
                  <video controls className="w-full h-full object-cover" poster="/placeholder.svg?height=400&width=600">
                    <source src={demo.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <PlayIcon className="h-16 w-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
                      <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                        Demo Video
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Video content will be available soon
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                    {demo.title}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {demo.scenario}
                  </p>
                </div>
                {demo.durationSec && (
                  <div className="text-right">
                    <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      Duration
                    </div>
                    <div className="text-lg font-bold" style={{ color: "var(--text)" }}>
                      {formatDuration(demo.durationSec)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scenario Steps */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                Demo Scenario
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                {demo.scenario ||
                  "This demonstration walks through key features and use cases, showing how the solution addresses real-world business challenges and delivers measurable value."}
              </p>

              <h3 className="font-medium mb-4" style={{ color: "var(--text)" }}>
                Demo Steps
              </h3>
              <div className="space-y-4">
                {demo.steps?.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: "var(--blue-100)",
                        color: "var(--blue-800)",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: "var(--text)" }}>
                        {step}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="space-y-4">
                    {[
                      "Introduction and overview of the solution",
                      "Key features and capabilities demonstration",
                      "Real-world use case scenarios",
                      "Integration and deployment options",
                      "Results and benefits summary",
                    ].map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                          style={{
                            backgroundColor: "var(--blue-100)",
                            color: "var(--blue-800)",
                          }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: "var(--text)" }}>
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sample Data Notes */}
            {demo.sampleDataNotes && (
              <div
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>
                  Sample Data & Setup
                </h2>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {demo.sampleDataNotes}
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Demo Info */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Demo Details
              </h3>
              <div className="space-y-2 text-sm">
                {demo.durationSec && (
                  <div className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>Duration:</span>
                    <span style={{ color: "var(--text)" }}>{formatDuration(demo.durationSec)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Industries:</span>
                  <span style={{ color: "var(--text)" }}>{demo.industryIds?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Processes:</span>
                  <span style={{ color: "var(--text)" }}>{demo.processKeys?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--text-muted)" }}>Updated:</span>
                  <span style={{ color: "var(--text)" }}>{new Date(demo.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {demo.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: "var(--gray-100)",
                      color: "var(--gray-800)",
                    }}
                  >
                    {tag}
                  </span>
                )) || (
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    No tags available
                  </span>
                )}
              </div>
            </div>

            {/* Related Industries/Processes */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Applicable To
              </h3>
              <div className="space-y-3">
                {demo.industryIds && demo.industryIds.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                      Industries:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {demo.industryIds.map((industryId, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: "var(--green-100)",
                            color: "var(--green-800)",
                          }}
                        >
                          {industryId}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {demo.processKeys && demo.processKeys.length > 0 && (
                  <div>
                    <div className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                      Processes:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {demo.processKeys.map((processKey, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: "var(--blue-100)",
                            color: "var(--blue-800)",
                          }}
                        >
                          {processKey}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {(!demo.industryIds || demo.industryIds.length === 0) &&
                  (!demo.processKeys || demo.processKeys.length === 0) && (
                    <div className="text-xs text-center py-2" style={{ color: "var(--text-muted)" }}>
                      Applicable to all industries and processes
                    </div>
                  )}
              </div>
            </div>

            {/* Actions */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 2px 4px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                Actions
              </h3>
              <div className="space-y-2">
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: "var(--grad-primary)",
                    color: "white",
                  }}
                >
                  <PlayIcon className="h-4 w-4" />
                  Open Demo
                </button>
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Share Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
