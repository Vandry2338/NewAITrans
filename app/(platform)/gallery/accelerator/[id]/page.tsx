"use client"

import { useParams } from "next/navigation"
import { ArrowLeftIcon, PlusIcon, LinkIcon, DocumentTextIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useICStore } from "@/lib/store"

export default function AcceleratorDetailPage() {
  const params = useParams()
  const id = params.id as string

  const { galleryRegistry, galleryAddToDesign } = useICStore()

  const accelerator = galleryRegistry.accelerators.find((a) => a.id === id)

  if (!accelerator) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Accelerator Not Found
          </h1>
          <Link href="/gallery" className="text-blue-600 hover:underline">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToDesign = () => {
    galleryAddToDesign("accelerator", accelerator.id)
  }

  const getLicenseColor = (license: string) => {
    switch (license) {
      case "Apache-2.0":
      case "MIT":
        return { bg: "var(--green-100)", color: "var(--green-800)" }
      case "Proprietary":
        return { bg: "var(--red-100)", color: "var(--red-800)" }
      default:
        return { bg: "var(--gray-100)", color: "var(--gray-800)" }
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Template":
        return { bg: "var(--blue-100)", color: "var(--blue-800)" }
      case "CLI":
        return { bg: "var(--purple-100)", color: "var(--purple-800)" }
      case "Connector":
        return { bg: "var(--orange-100)", color: "var(--orange-800)" }
      case "Notebook":
        return { bg: "var(--teal-100)", color: "var(--teal-800)" }
      case "SDK":
        return { bg: "var(--indigo-100)", color: "var(--indigo-800)" }
      default:
        return { bg: "var(--gray-100)", color: "var(--gray-800)" }
    }
  }

  const licenseColors = getLicenseColor(accelerator.license || "Other")
  const typeColors = getTypeColor(accelerator.assetType)

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
                {accelerator.title}
              </h1>
              <span
                className="px-3 py-1 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: typeColors.bg,
                  color: typeColors.color,
                }}
              >
                {accelerator.assetType}
              </span>
              {accelerator.version && (
                <span
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    backgroundColor: "var(--gray-100)",
                    color: "var(--gray-800)",
                  }}
                >
                  {accelerator.version}
                </span>
              )}
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {accelerator.summary || "Development accelerator to speed up implementation"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAddToDesign}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--grad-primary)",
                color: "white",
              }}
            >
              <PlusIcon className="h-4 w-4 inline mr-2" />
              Add to Design
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
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
                Overview
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
                {accelerator.summary ||
                  `The ${accelerator.title} ${accelerator.assetType.toLowerCase()} provides ready-to-use components and tools to accelerate your development process. This accelerator includes best practices, templates, and automation to help you get started quickly while maintaining high quality standards.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Key Features
                  </h3>
                  <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                    <li>• Production-ready {accelerator.assetType.toLowerCase()} components</li>
                    <li>• Best practices and coding standards</li>
                    <li>• Comprehensive documentation</li>
                    <li>• Easy integration and customization</li>
                    <li>• Regular updates and maintenance</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                    Benefits
                  </h3>
                  <ul className="text-sm space-y-2" style={{ color: "var(--text-muted)" }}>
                    <li>• Reduced development time</li>
                    <li>• Lower risk of implementation errors</li>
                    <li>• Consistent architecture patterns</li>
                    <li>• Faster time to market</li>
                    <li>• Proven scalability and reliability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Usage Steps */}
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
                Usage Steps
              </h2>
              <div className="space-y-4">
                {[
                  `Download the ${accelerator.assetType.toLowerCase()} from the repository`,
                  "Review the documentation and prerequisites",
                  "Configure the settings for your environment",
                  "Run the setup or installation process",
                  "Customize according to your requirements",
                  "Test and validate the implementation",
                ].map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{
                        backgroundColor: typeColors.bg,
                        color: typeColors.color,
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
            </div>

            {/* Resources */}
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
                Resources & Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {accelerator.repoUrl && (
                  <a
                    href={accelerator.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-gray-50"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <LinkIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
                    <div>
                      <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                        Repository
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Source code and releases
                      </div>
                    </div>
                  </a>
                )}
                {accelerator.docsUrl && (
                  <a
                    href={accelerator.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg transition-colors hover:bg-gray-50"
                    style={{
                      backgroundColor: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <DocumentTextIcon className="h-5 w-5" style={{ color: "var(--text-muted)" }} />
                    <div>
                      <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                        Documentation
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        Setup guides and API reference
                      </div>
                    </div>
                  </a>
                )}
                {!accelerator.repoUrl && !accelerator.docsUrl && (
                  <div className="col-span-full text-center py-8 text-sm" style={{ color: "var(--text-muted)" }}>
                    Resource links will be available soon
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Accelerator Info */}
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
                Accelerator Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Type:
                  </span>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      backgroundColor: typeColors.bg,
                      color: typeColors.color,
                    }}
                  >
                    {accelerator.assetType}
                  </span>
                </div>
                {accelerator.version && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Version:
                    </span>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                      {accelerator.version}
                    </span>
                  </div>
                )}
                {accelerator.license && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                      License:
                    </span>
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: licenseColors.bg,
                        color: licenseColors.color,
                      }}
                    >
                      {accelerator.license}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Updated:
                  </span>
                  <span className="text-sm" style={{ color: "var(--text)" }}>
                    {new Date(accelerator.updatedAt).toLocaleDateString()}
                  </span>
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
                {accelerator.tags?.map((tag, index) => (
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
                  onClick={handleAddToDesign}
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105"
                  style={{
                    background: "var(--grad-primary)",
                    color: "white",
                  }}
                >
                  Add to Design
                </button>
                {accelerator.repoUrl && (
                  <a
                    href={accelerator.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors hover:scale-105"
                    style={{
                      backgroundColor: "var(--surface)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    View Repository
                  </a>
                )}
                <button
                  className="w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:scale-105"
                  style={{
                    backgroundColor: "var(--surface)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
