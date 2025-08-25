export interface Industry {
  id: string
  name: string // matches SAP industry name
  e2e: string[] // list from the SAP E2E set
}

export interface Kpi {
  id: string
  name: string
  description?: string
  unit: string
  direction: "up-good" | "down-good"
  frequency: "daily" | "weekly" | "monthly" | "quarterly"
  industry: string[] // e.g., ["Industrial Manufacturing"]
  e2e?: string[] // e.g., ["Source to Pay"]
  process?: string[] // fine-grain process names
  capability?: string[] // capability tags for LeanIX mapping
  benchmarks?: { median?: number; topQuartile?: number }
  target?: number
  current?: number
  status?: "on-track" | "at-risk" | "critical"
}

export interface PainPoint {
  id: string
  title: string
  description?: string
  industry?: string
  e2e?: string[]
  process?: string[]
  capability?: string[]
  severity: "High" | "Medium" | "Low"
  businessImpactScore: 1 | 2 | 3 | 4 | 5
  evidenceLinks?: string[]
  linkedKpis?: string[] // Kpi.id[]
}

export interface Initiative {
  id: string
  title: string
  hypothesis: string
  targetKpis: string[] // Kpi.id[]
  linkedPainPoints: string[] // PainPoint.id[]
  expectedImpact: { type: "money" | "percent"; value: number }
  effort: "S" | "M" | "L"
  paybackMonths?: number
  owner?: string
  timeline?: string // e.g., "Q1–Q2"
  industry?: string
  e2e?: string[]
  process?: string[]
  capability?: string[]
  status?: "draft" | "backlog" | "in-flight" | "done"
}

export interface BacklogItem {
  id: string
  source: "initiative" | "refactor" | "ops"
  refId: string // Initiative.id
  priorityScore: number // computed f(impact, effort, risk)
  trace: {
    kpis: string[]
    painPoints: string[]
    mappings: { e2e?: string[]; process?: string[]; capability?: string[] }
  }
}

export interface WorkspaceState {
  industry: string
  clientName?: string
}

// SAP E2E Process definitions
export const E2E_PROCESSES = [
  "Source to Pay",
  "Finance",
  "Acquire to Decommission",
  "Idea to Market",
  "Recruit to Retire",
  "Lead to Cash",
  "Plan to Fulfill",
  "Governance",
] as const

export const INDUSTRIES = [
  "Manufacturing",
  "Retail",
  "Technology",
  "Financial Services",
  "Healthcare",
  "Energy & Utilities",
  "Automotive",
  "Aerospace & Defense",
] as const

export type E2EProcess = (typeof E2E_PROCESSES)[number]
export type IndustryType = (typeof INDUSTRIES)[number]

export type Id = string

export type ProcessE2E =
  | "Source to Pay"
  | "Finance"
  | "Acquire to Decommission"
  | "Idea to Market"
  | "Recruit to Retire"
  | "Lead to Cash"
  | "Plan to Fulfill"
  | "Governance"

export interface KPI {
  id: Id
  name: string
  definition: string
  unit: string
  current?: number
  target?: number
  benchmark?: number
  industry?: string
  function?: string
  processes: ProcessE2E[]
  capabilities: string[]
  tags?: string[]
}

export interface PainPoint {
  id: Id
  title: string
  description: string
  function?: string
  process: ProcessE2E
  capability: string
  kpiIds: Id[]
  impact: 1 | 2 | 3 | 4 | 5
  urgency: 1 | 2 | 3 | 4 | 5
  source: "Agent" | "Manual"
}

export interface Initiative {
  id: Id
  title: string
  hypothesis: string
  valueDriver: "Cost" | "Speed" | "Quality" | "Experience" | "Revenue"
  kpiIds: Id[]
  painPointIds: Id[]
  horizon: "Fast Lane" | "Core"
}

export interface Requirement {
  id: Id
  text: string
  type: "Functional" | "Non-Functional"
  sourceRef: { kind: "PainPoint" | "KPI" | "Interview"; id: Id }
  process?: ProcessE2E
  capability?: string
  priority: "H" | "M" | "L"
}

export interface Principle {
  id: Id
  name: string
  category: "Security" | "Data" | "Integration" | "Operability"
  rationale: string
  implications: string[]
}

export interface DiscoveryWorkspace {
  clientName?: string
  industry?: string
  kpis: KPI[]
  painPoints: PainPoint[]
  initiatives: Initiative[]
  requirements: Requirement[]
  principles: Principle[]
}
