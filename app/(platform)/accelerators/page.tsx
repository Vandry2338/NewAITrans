"use client"

import { useState } from "react"
import { Search, X, Download, Copy, ExternalLink } from "lucide-react"

interface AcceleratorItem {
  id: string
  title: string
  description: string
  category: string
  tags: string[]
  setupTime: string
  overview: string
  deliverables: string[]
  demoUrl?: string
}

const acceleratorItems: AcceleratorItem[] = [
  {
    id: "kyc-genai-spine",
    title: "KYC GenAI Spine",
    description: "AI-powered customer verification with automated document processing and risk assessment.",
    category: "AI Use Cases",
    tags: ["Finance"],
    setupTime: "2-3 days",
    overview:
      "Complete KYC automation using generative AI for document analysis, identity verification, and compliance scoring.",
    deliverables: ["Diagrams-as-code", "Terraform/BTP stubs", "OPA policies", "Jira stories JSON"],
    demoUrl: "https://demo.example.com/kyc",
  },
  {
    id: "warranty-claims-triage",
    title: "Warranty Claims Triage",
    description: "Intelligent warranty claim processing with automated categorization and priority scoring.",
    category: "AI Use Cases",
    tags: ["Ops"],
    setupTime: "1-2 days",
    overview:
      "AI-driven warranty claim analysis that automatically categorizes, prioritizes, and routes claims for optimal processing.",
    deliverables: ["Diagrams-as-code", "Terraform/BTP stubs", "Jira stories JSON"],
  },
  {
    id: "btp-event-mesh-starter",
    title: "BTP Event Mesh Starter",
    description: "SAP BTP Event Mesh foundation with pre-configured channels and event schemas.",
    category: "SAP BTP Blueprints",
    tags: ["Supply Chain"],
    setupTime: "3-4 days",
    overview: "Production-ready event mesh architecture for SAP BTP with standardized event patterns and monitoring.",
    deliverables: ["Diagrams-as-code", "Terraform/BTP stubs", "OPA policies"],
  },
  {
    id: "procure-to-pay-guardrails",
    title: "Procure-to-Pay Guardrails",
    description: "Automated compliance policies and risk controls for procurement processes.",
    category: "Agents",
    tags: ["Risk"],
    setupTime: "2-3 days",
    overview:
      "Comprehensive policy framework ensuring procurement compliance with automated risk detection and mitigation.",
    deliverables: ["OPA policies", "Jira stories JSON", "Terraform/BTP stubs"],
  },
  {
    id: "rag-sap-docs",
    title: "RAG on SAP Docs",
    description: "Retrieval-augmented generation system for SAP documentation and knowledge base queries.",
    category: "AI Use Cases",
    tags: ["Ops"],
    setupTime: "1-2 days",
    overview:
      "AI-powered documentation assistant that provides contextual answers from SAP knowledge bases using RAG architecture.",
    deliverables: ["Diagrams-as-code", "Terraform/BTP stubs", "Jira stories JSON"],
  },
  {
    id: "signavio-backlog-bridge",
    title: "Signavio → Backlog Bridge",
    description: "Automated process model to development backlog synchronization and story generation.",
    category: "Process Tools",
    tags: ["CX"],
    setupTime: "2-3 days",
    overview:
      "Seamless integration between Signavio process models and development backlogs with automated story creation.",
    deliverables: ["Diagrams-as-code", "Jira stories JSON"],
  },
]

const categories = ["AI Use Cases", "SAP BTP Blueprints", "Agents", "Process Tools"]
const tags = ["Finance", "Supply Chain", "CX", "Ops", "Risk"]

export default function Accelerators() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<AcceleratorItem | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredItems = acceleratorItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || item.category === selectedCategory
    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleAddToProject = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCopySlug = () => {
    if (selectedItem) {
      navigator.clipboard.writeText(selectedItem.id)
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ color: "var(--ai-royal)" }}>
          Accelerators Library
        </h1>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search accelerators…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${!selectedCategory ? "ring-2" : ""}`}
              style={{
                backgroundColor: !selectedCategory ? "var(--surface)" : "transparent",
                color: "var(--text)",
                border: "1px solid var(--border)",
                ringColor: !selectedCategory ? "var(--blue-500)" : "transparent",
              }}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${selectedCategory === category ? "ring-2" : ""}`}
                style={{
                  backgroundColor: selectedCategory === category ? "var(--surface)" : "transparent",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                  ringColor: selectedCategory === category ? "var(--blue-500)" : "transparent",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${selectedTags.includes(tag) ? "ring-1" : ""}`}
                style={{
                  backgroundColor: selectedTags.includes(tag) ? "var(--blue-50)" : "transparent",
                  color: selectedTags.includes(tag) ? "var(--blue-700)" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                  ringColor: selectedTags.includes(tag) ? "var(--blue-300)" : "transparent",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </header>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--bg)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-2)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-1)"
              }}
            >
              {/* Header pill */}
              <div className="h-1 rounded-t-lg" style={{ background: "var(--grad-primary)" }} />

              <div className="p-4">
                <h3 className="font-bold text-sm tracking-tight mb-2" style={{ color: "var(--blue-800)" }}>
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center justify-between text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                  <span>{item.category}</span>
                  <span>•</span>
                  <span>{item.setupTime}</span>
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="w-full py-1.5 px-3 rounded text-xs font-medium border transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text)",
                    backgroundColor: "transparent",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p style={{ color: "var(--text-muted)" }}>No accelerators found matching your criteria.</p>
        </div>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
          onClick={() => setSelectedItem(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelectedItem(null)}
        >
          <div
            className="w-96 h-full overflow-auto p-6 space-y-6"
            style={{ backgroundColor: "var(--bg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                {selectedItem.title}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded hover:bg-opacity-10"
                style={{ backgroundColor: "var(--surface)" }}
              >
                <X className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
              </button>
            </div>

            <p style={{ color: "var(--text-muted)" }}>{selectedItem.overview}</p>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                What you get
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.deliverables.map((deliverable) => (
                  <span
                    key={deliverable}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: "var(--blue-50)",
                      color: "var(--blue-700)",
                    }}
                  >
                    {deliverable}
                  </span>
                ))}
              </div>
            </div>

            {selectedItem.demoUrl && (
              <div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                  Demo
                </h3>
                <a
                  href={selectedItem.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:underline"
                  style={{ color: "var(--blue-600)" }}
                >
                  View Demo <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleAddToProject}
                className="w-full py-2 px-4 rounded font-medium text-white"
                style={{ background: "var(--grad-cta)" }}
              >
                Add to Project
              </button>

              <div className="flex gap-2">
                <button
                  onClick={handleCopySlug}
                  className="flex-1 py-2 px-3 rounded text-sm border transition-colors flex items-center justify-center gap-2"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <Copy className="w-3 h-3" />
                  Copy ID
                </button>
                <button
                  className="flex-1 py-2 px-3 rounded text-sm border transition-colors flex items-center justify-center gap-2"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-muted)",
                  }}
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {showSuccess && (
        <div
          className="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg"
          style={{ backgroundColor: "var(--surface)", color: "var(--text)" }}
        >
          Added to project successfully!
        </div>
      )}
    </div>
  )
}
