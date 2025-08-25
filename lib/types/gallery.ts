export type FitSignal = {
  source: "KPI" | "PainPoint" | "Initiative" | "Process" | "Capability"
  id: string
  weight?: number // 0..1
}

export type GalleryItem = {
  id: string
  title: string
  summary: string
  category: "Use Case" | "Template" | "Tool" | "Dashboard" | "Engine" | "Accelerator" | "Agent"
  vendor: "SAP" | "WalkMe" | "Infosys" | "Open" | "Other"

  // Context & mapping
  industries: string[]
  valueChains: string[]
  processes: { e2e: string; subprocessIds?: string[] }[]
  capabilities: string[]
  personas?: string[]

  // Discovery links (drive recommendations)
  kpiIds?: string[]
  painPointIds?: string[]
  initiativeIds?: string[]

  tags?: string[]
  maturity?: "Idea" | "Pilot" | "Production"
  complexity?: "Low" | "Medium" | "High"
  estTimelineWeeks?: number

  benefits?: { metric: string; value: string; unit?: string; source?: string }[]
  demo?: { videoUrl?: string; interactiveUrl?: string; images?: string[] }

  solution?: {
    products: string[]
    dataSources?: string[]
    architectureImg?: string
    preReqs?: string[]
    steps?: { label: string; detail?: string }[]
    roles?: string[]
    securityNotes?: string[]
  }

  links?: { docs?: string[]; repo?: string; external?: string[] }
  version?: string
  lastUpdated?: string

  // Runtime (computed)
  fitScore?: number // 0..100 for current client context
  fitSignals?: FitSignal[]
}
