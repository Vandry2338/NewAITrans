"use client"

import { useState } from "react"
import { Download, Eye, EyeOff, Plus, FileText, Shield } from "lucide-react"

interface TreeNode {
  id: string
  label: string
  children?: TreeNode[]
}

const treeData: TreeNode[] = [
  {
    id: "context",
    label: "Context",
    children: [
      { id: "users", label: "Users" },
      { id: "systems", label: "External Systems" },
    ],
  },
  {
    id: "containers",
    label: "Containers",
    children: [
      { id: "web-app", label: "Web Application" },
      { id: "api", label: "API Gateway" },
      { id: "database", label: "Database" },
    ],
  },
  {
    id: "components",
    label: "Components",
    children: [
      { id: "auth", label: "Authentication" },
      { id: "business-logic", label: "Business Logic" },
    ],
  },
  {
    id: "data-ai",
    label: "Data & AI",
    children: [
      { id: "ml-pipeline", label: "ML Pipeline" },
      { id: "data-store", label: "Data Store" },
    ],
  },
  {
    id: "security",
    label: "Security",
    children: [
      { id: "policies", label: "Policies" },
      { id: "monitoring", label: "Monitoring" },
    ],
  },
]

const starterSnippets = {
  "C4 Context": `graph TB
    User[User] --> System[System]
    System --> Database[(Database)]
    System --> External[External API]`,
  "C4 Container": `graph TB
    subgraph "System Boundary"
        Web[Web Application]
        API[API Gateway]
        DB[(Database)]
    end
    User --> Web
    Web --> API
    API --> DB`,
  "Service Mesh": `graph LR
    A[Service A] --> Proxy1[Envoy Proxy]
    B[Service B] --> Proxy2[Envoy Proxy]
    Proxy1 --> Proxy2
    Proxy1 --> Control[Control Plane]
    Proxy2 --> Control`,
  "Event-Driven": `graph TD
    Producer[Event Producer] --> Queue[Message Queue]
    Queue --> Consumer1[Consumer 1]
    Queue --> Consumer2[Consumer 2]
    Consumer1 --> Store[(Event Store)]
    Consumer2 --> Store`,
}

export default function BlueprintCanvas() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [mermaidCode, setMermaidCode] = useState(starterSnippets["C4 Context"])
  const [showPreview, setShowPreview] = useState(true)
  const [version] = useState("v0.1")
  const [timestamp] = useState(new Date().toLocaleString())
  const [adrs, setAdrs] = useState<string[]>([])
  const [fitnessFunction, setFitnessFunction] = useState("")
  const [properties, setProperties] = useState({
    name: "",
    tech: "",
    dependencies: "",
    sloNotes: "",
  })

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNode(nodeId)
    // Load skeleton for selected node
    if (nodeId === "context") {
      setMermaidCode(starterSnippets["C4 Context"])
    } else if (nodeId === "containers") {
      setMermaidCode(starterSnippets["C4 Container"])
    }
  }

  const handleSnippetSelect = (snippet: string) => {
    setMermaidCode(starterSnippets[snippet as keyof typeof starterSnippets])
  }

  const handleExport = (format: string) => {
    // Simulate export functionality
    const blob = new Blob([format === "mmd" ? mermaidCode : `Exported ${format.toUpperCase()}`], {
      type: format === "mmd" ? "text/plain" : "application/octet-stream",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `blueprint.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const generateADR = () => {
    const newADR = `ADR-${adrs.length + 1}: ${properties.name || "Architecture Decision"}`
    setAdrs([...adrs, newADR])
  }

  const TreeItem = ({ node, level = 0 }: { node: TreeNode; level?: number }) => (
    <div>
      <div
        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${selectedNode === node.id ? "ring-2" : ""}`}
        style={{
          backgroundColor: selectedNode === node.id ? "var(--blue-50)" : "transparent",
          color: selectedNode === node.id ? "var(--blue-800)" : "var(--text)",
          paddingLeft: `${level * 12 + 8}px`,
          ringColor: selectedNode === node.id ? "var(--blue-300)" : "transparent",
        }}
        onClick={() => handleNodeSelect(node.id)}
      >
        <span className="text-sm font-medium">{node.label}</span>
      </div>
      {node.children?.map((child) => (
        <TreeItem key={child.id} node={child} level={level + 1} />
      ))}
    </div>
  )

  const leftPanel = (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold" style={{ color: "var(--blue-800)" }}>
          Architecture Tree
        </h3>
      </div>

      <div className="space-y-1">
        {treeData.map((node) => (
          <TreeItem key={node.id} node={node} />
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          className="w-full flex items-center gap-2 p-2 rounded text-sm border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-3 h-3" />
          Add View
        </button>
        <button
          className="w-full flex items-center gap-2 p-2 rounded text-sm border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-3 h-3" />
          Add Container
        </button>
        <button
          className="w-full flex items-center gap-2 p-2 rounded text-sm border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <Plus className="w-3 h-3" />
          Add Component
        </button>
      </div>
    </div>
  )

  const centerPanel = (
    <div className="space-y-4 h-full flex flex-col">
      {/* Version strip */}
      <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
        <div className="flex items-center gap-4">
          <span
            className="px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: "var(--blue-50)",
              color: "var(--blue-700)",
            }}
          >
            {version}
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {timestamp}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1.5 rounded text-sm font-medium text-white"
            style={{ background: "var(--grad-primary)" }}
          >
            Save
          </button>
          <button
            className="px-3 py-1.5 rounded text-sm border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            Discard
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => handleSnippetSelect(e.target.value)}
            className="px-3 py-1.5 rounded border text-sm"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <option value="">Starter Snippets</option>
            {Object.keys(starterSnippets).map((snippet) => (
              <option key={snippet} value={snippet}>
                {snippet}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {showPreview ? "Hide" : "Show"} Preview
          </button>
          <button
            onClick={() => handleExport("svg")}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Download className="w-3 h-3" />
            Export SVG
          </button>
          <button
            onClick={() => handleExport("mmd")}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Download className="w-3 h-3" />
            Download .mmd
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="flex-1 flex gap-4">
        <div className="flex-1">
          <textarea
            value={mermaidCode}
            onChange={(e) => setMermaidCode(e.target.value)}
            className="w-full h-full p-4 rounded border font-mono text-sm resize-none"
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            placeholder="Enter Mermaid diagram code..."
          />
        </div>

        {showPreview && (
          <div
            className="flex-1 p-4 rounded border flex items-center justify-center"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--blue-50)" }}
              >
                <Eye className="w-8 h-8" style={{ color: "var(--blue-600)" }} />
              </div>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Mermaid Preview
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                Live preview would render here
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold mb-4" style={{ color: "var(--blue-800)" }}>
          Properties
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
              Name
            </label>
            <input
              type="text"
              value={properties.name}
              onChange={(e) => setProperties({ ...properties, name: e.target.value })}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
              Technology
            </label>
            <input
              type="text"
              value={properties.tech}
              onChange={(e) => setProperties({ ...properties, tech: e.target.value })}
              className="w-full px-3 py-2 rounded border text-sm"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
              Dependencies
            </label>
            <textarea
              value={properties.dependencies}
              onChange={(e) => setProperties({ ...properties, dependencies: e.target.value })}
              className="w-full px-3 py-2 rounded border text-sm h-20 resize-none"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)" }}>
              SLO Notes
            </label>
            <textarea
              value={properties.sloNotes}
              onChange={(e) => setProperties({ ...properties, sloNotes: e.target.value })}
              className="w-full px-3 py-2 rounded border text-sm h-20 resize-none"
              style={{
                backgroundColor: "var(--bg)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold" style={{ color: "var(--text)" }}>
            ADRs
          </h4>
          <button
            onClick={generateADR}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <FileText className="w-3 h-3" />
            Generate ADR
          </button>
        </div>
        <div className="space-y-2">
          {adrs.map((adr, index) => (
            <div
              key={index}
              className="p-2 rounded text-xs"
              style={{
                backgroundColor: "var(--surface)",
                color: "var(--text-muted)",
              }}
            >
              {adr}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold" style={{ color: "var(--text)" }}>
            Fitness Functions
          </h4>
          <button
            className="flex items-center gap-1 px-2 py-1 rounded text-xs border transition-colors"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
          >
            <Shield className="w-3 h-3" />
            Add Function
          </button>
        </div>
        {fitnessFunction && (
          <div
            className="p-2 rounded text-xs"
            style={{
              backgroundColor: "var(--surface)",
              color: "var(--text-muted)",
            }}
          >
            {fitnessFunction}
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6 h-full">
      <header>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          Solution Blueprint → Canvas
        </h1>
      </header>

      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <div
          className="w-[24%] rounded-lg p-4 overflow-auto"
          style={{
            backgroundColor: "var(--bg)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          {leftPanel}
        </div>

        <div
          className="flex-1 rounded-lg p-4 overflow-auto"
          style={{
            backgroundColor: "var(--bg)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          {centerPanel}
        </div>

        <div
          className="w-[28%] rounded-lg p-4 overflow-auto"
          style={{
            backgroundColor: "var(--bg)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  )
}
