import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { sapIndustries } from "../../app/data/industries"
import { sapValueChains } from "../../app/data/valueChains"
import { processFacetsData, type ProcessFacets, getProcessFacets } from "../../app/data/processFacets"

// Transform the data structure to match the store types
const transformIndustries = (rawIndustries: any[]) => {
  return rawIndustries.map(industry => ({
    id: industry.id,
    name: industry.name,
    slug: industry.slug,
    icon: industry.iconUrl,
    description: industry.description,
    valueChainProcessIds: industry.processKeys || [],
    tags: []
  }))
}

type ID = string

export type Industry = {
  id: ID
  name: string
  slug: string
  icon?: string
  description?: string
  valueChainProcessIds: ID[] // E2E Process ids typically used in this industry
  tags?: string[] // sectors, sub-verticals
}

export type ProcessLevel = "E2E" | "Module" | "Subprocess"

export type Process = {
  id: ID
  key: string // Short key like "S2P", "L2C" for E2E processes
  name: string
  slug: string
  level: ProcessLevel
  description?: string
  parentId?: ID // parent for Module/Subprocess
  moduleOrder?: number // for lane sorting
  kpiIds?: ID[]
  capabilityIds?: ID[]
  artifactIds?: ID[] // ref diagrams (value flow, components, etc.)
}

export type CapabilityDomain = {
  id: ID
  name: string
  slug: string
  order?: number
}

export type CapabilityArea = {
  id: ID
  domainId: ID
  name: string
  slug: string
  order?: number
}

export type Capability = {
  id: ID
  areaId: ID
  name: string
  slug: string
  kpiIds?: ID[]
  processIds?: ID[]
  industryIds?: ID[]
}

export type KPI = {
  id: ID
  name: string
  unit?: string
  direction?: "up" | "down"
}

export type PainPoint = {
  id: ID
  title: string
  processIds?: ID[]
  capabilityIds?: ID[]
  industryIds?: ID[]
}

export type ArtifactKind = "ValueFlow" | "Components" | "DataFlow" | "ProcessFlow" | "Other"

export type Artifact = {
  id: ID
  kind: ArtifactKind
  title: string
  thumbUrl?: string
  fileUrl?: string
  source?: "Local" | "External"
  extUrl?: string // e.g., Signavio viewer
}

export type ReferencePackage = {
  id: ID
  title: string
  slug: string
  type: string // Reference type like "Use Case", "Pattern", etc.
  version?: string
  summary: string
  industries: ID[]
  processes: ID[]
  capabilities: ID[]
  products?: string[]
  complexity?: "Low" | "Medium" | "High"
  maturity?: "Concept" | "Preview" | "GA"
  artifacts: ID[] // Artifact ids
  businessValue?: string[]
  keyFeatures?: string[]
  timeline?: "1-2 weeks" | "1-2 months" | "3-6 months"
  availability?: "Sample" | "Download" | "Interactive"
  videoUrl?: string
  links?: { label: string; url: string }[]
  createdAt: string
  updatedAt: string
}

export type GalleryState = {
  industries: Industry[]
  processes: Process[]
  domains: CapabilityDomain[]
  areas: CapabilityArea[]
  capabilities: Capability[]
  kpis: KPI[]
  painPoints: PainPoint[]
  artifacts: Artifact[]
  references: ReferencePackage[]
  processFacets: ProcessFacets[]

  query: string
  filters: {
    industryIds: ID[]
    processIds: ID[]
    capabilityIds: ID[]
    products: string[]
    types: string[]
    complexity?: ("Low" | "Medium" | "High")[]
    timeline?: ("1-2 weeks" | "1-2 months" | "3-6 months")[]
    maturity?: ("Concept" | "Preview" | "GA")[]
  }
  view: "industries" | "processes" | "references" | "bcm"
  pageSize: number
  pageIndex: number
  selectedItemId: string | null
}

export type GalleryActions = {
  setView(v: GalleryState["view"]): void
  setQuery(q: string): void
  setFilters(patch: Partial<GalleryState["filters"]>): void
  clearFilters(): void
  setPageIndex(i: number): void
  setSelectedItemId(id: string | null): void
  // Derived selectors
  itemsByView(): ReferencePackage[] // for "references" grid
  visibleItems(): ReferencePackage[] // filtered and paginated items
  filteredItems(): ReferencePackage[] // filtered but not paginated
  industriesWithCounts(): Array<Industry & { solutionCount: number }>
  processesTree(): Process[] // E2E roots with children
  bcmTree(): Array<CapabilityDomain & { areas: Array<CapabilityArea & { capabilities: Capability[] }> }>
  getProcessFacets(processKey: string): ProcessFacets | undefined
  loadFromUrl(): void
  syncToUrl(): void
}

const sampleDomains: CapabilityDomain[] = [
  { id: "dom_finance", name: "Finance & Accounting", slug: "finance-accounting", order: 1 },
  { id: "dom_procurement", name: "Procurement & Supply Chain", slug: "procurement-supply-chain", order: 2 },
  { id: "dom_sales", name: "Sales & Marketing", slug: "sales-marketing", order: 3 },
  { id: "dom_manufacturing", name: "Manufacturing & Operations", slug: "manufacturing-operations", order: 4 },
  { id: "dom_hr", name: "Human Resources", slug: "human-resources", order: 5 },
  { id: "dom_it", name: "Information Technology", slug: "information-technology", order: 6 },
]

const sampleAreas: CapabilityArea[] = [
  // Finance & Accounting
  {
    id: "area_financial_accounting",
    domainId: "dom_finance",
    name: "Financial Accounting",
    slug: "financial-accounting",
    order: 1,
  },
  {
    id: "area_management_accounting",
    domainId: "dom_finance",
    name: "Management Accounting",
    slug: "management-accounting",
    order: 2,
  },
  { id: "area_treasury", domainId: "dom_finance", name: "Treasury & Risk", slug: "treasury-risk", order: 3 },
  // Procurement & Supply Chain
  {
    id: "area_strategic_sourcing",
    domainId: "dom_procurement",
    name: "Strategic Sourcing",
    slug: "strategic-sourcing",
    order: 1,
  },
  {
    id: "area_operational_procurement",
    domainId: "dom_procurement",
    name: "Operational Procurement",
    slug: "operational-procurement",
    order: 2,
  },
  {
    id: "area_supplier_management",
    domainId: "dom_procurement",
    name: "Supplier Management",
    slug: "supplier-management",
    order: 3,
  },
  // Sales & Marketing
  {
    id: "area_marketing",
    domainId: "dom_sales",
    name: "Marketing & Campaign Management",
    slug: "marketing-campaign",
    order: 1,
  },
  { id: "area_sales_management", domainId: "dom_sales", name: "Sales Management", slug: "sales-management", order: 2 },
  { id: "area_customer_service", domainId: "dom_sales", name: "Customer Service", slug: "customer-service", order: 3 },
  // Manufacturing & Operations
  {
    id: "area_production_planning",
    domainId: "dom_manufacturing",
    name: "Production Planning",
    slug: "production-planning",
    order: 1,
  },
  {
    id: "area_manufacturing_execution",
    domainId: "dom_manufacturing",
    name: "Manufacturing Execution",
    slug: "manufacturing-execution",
    order: 2,
  },
  {
    id: "area_quality_management",
    domainId: "dom_manufacturing",
    name: "Quality Management",
    slug: "quality-management",
    order: 3,
  },
  // Human Resources
  {
    id: "area_talent_acquisition",
    domainId: "dom_hr",
    name: "Talent Acquisition",
    slug: "talent-acquisition",
    order: 1,
  },
  { id: "area_talent_management", domainId: "dom_hr", name: "Talent Management", slug: "talent-management", order: 2 },
  {
    id: "area_workforce_analytics",
    domainId: "dom_hr",
    name: "Workforce Analytics",
    slug: "workforce-analytics",
    order: 3,
  },
]

const sampleCapabilities: Capability[] = [
  // Financial Accounting
  {
    id: "cap_financial_reporting",
    areaId: "area_financial_accounting",
    name: "Financial Reporting",
    slug: "financial-reporting",
    kpiIds: ["kpi_financial_accuracy"],
    processIds: ["proc_finance"],
  },
  {
    id: "cap_accounts_payable",
    areaId: "area_financial_accounting",
    name: "Accounts Payable",
    slug: "accounts-payable",
    processIds: ["proc_source_to_pay"],
  },
  {
    id: "cap_accounts_receivable",
    areaId: "area_financial_accounting",
    name: "Accounts Receivable",
    slug: "accounts-receivable",
    processIds: ["proc_lead_to_cash"],
  },
  // Management Accounting
  {
    id: "cap_budgeting",
    areaId: "area_management_accounting",
    name: "Budgeting & Forecasting",
    slug: "budgeting-forecasting",
    kpiIds: ["kpi_budget_accuracy"],
  },
  { id: "cap_cost_accounting", areaId: "area_management_accounting", name: "Cost Accounting", slug: "cost-accounting" },
  // Strategic Sourcing
  {
    id: "cap_strategic_sourcing",
    areaId: "area_strategic_sourcing",
    name: "Strategic Sourcing",
    slug: "strategic-sourcing",
    kpiIds: ["kpi_cost_savings"],
    processIds: ["proc_source_to_pay"],
  },
  {
    id: "cap_contract_management",
    areaId: "area_strategic_sourcing",
    name: "Contract Management",
    slug: "contract-management",
  },
  // Operational Procurement
  {
    id: "cap_operational_procurement",
    areaId: "area_operational_procurement",
    name: "Operational Procurement",
    slug: "operational-procurement",
    processIds: ["proc_source_to_pay"],
  },
  {
    id: "cap_invoice_management",
    areaId: "area_operational_procurement",
    name: "Invoice Management",
    slug: "invoice-management",
  },
  // Sales Management
  {
    id: "cap_lead_management",
    areaId: "area_sales_management",
    name: "Lead Management",
    slug: "lead-management",
    kpiIds: ["kpi_conversion_rate"],
    processIds: ["proc_lead_to_cash"],
  },
  {
    id: "cap_opportunity_management",
    areaId: "area_sales_management",
    name: "Opportunity Management",
    slug: "opportunity-management",
  },
  // Talent Management
  {
    id: "cap_performance_management",
    areaId: "area_talent_management",
    name: "Performance Management",
    slug: "performance-management",
    kpiIds: ["kpi_employee_satisfaction"],
    processIds: ["proc_recruit_to_retire"],
  },
  {
    id: "cap_learning_development",
    areaId: "area_talent_management",
    name: "Learning & Development",
    slug: "learning-development",
  },
]

const sampleKPIs: KPI[] = [
  { id: "kpi_cost_savings", name: "Cost Savings", unit: "%", direction: "up" },
  { id: "kpi_cycle_time", name: "Cycle Time", unit: "days", direction: "down" },
  { id: "kpi_conversion_rate", name: "Lead Conversion Rate", unit: "%", direction: "up" },
  { id: "kpi_revenue_growth", name: "Revenue Growth", unit: "%", direction: "up" },
  { id: "kpi_employee_satisfaction", name: "Employee Satisfaction", unit: "score", direction: "up" },
  { id: "kpi_retention_rate", name: "Employee Retention Rate", unit: "%", direction: "up" },
  { id: "kpi_financial_accuracy", name: "Financial Report Accuracy", unit: "%", direction: "up" },
  { id: "kpi_budget_accuracy", name: "Budget Forecast Accuracy", unit: "%", direction: "up" },
  { id: "kpi_inventory_turnover", name: "Inventory Turnover", unit: "ratio", direction: "up" },
  { id: "kpi_order_accuracy", name: "Order Accuracy", unit: "%", direction: "up" },
]

const samplePainPoints: PainPoint[] = [
  {
    id: "pain_manual_processes",
    title: "Manual, error-prone processes",
    processIds: ["proc_source_to_pay", "proc_finance"],
  },
  {
    id: "pain_data_silos",
    title: "Disconnected data silos",
    capabilityIds: ["cap_financial_reporting", "cap_lead_management"],
  },
  { id: "pain_compliance_risk", title: "Compliance and audit risks", processIds: ["proc_governance", "proc_finance"] },
  {
    id: "pain_supplier_visibility",
    title: "Limited supplier visibility",
    processIds: ["proc_source_to_pay"],
    capabilityIds: ["cap_strategic_sourcing"],
  },
  {
    id: "pain_customer_experience",
    title: "Inconsistent customer experience",
    processIds: ["proc_lead_to_cash"],
    industryIds: ["ind_retail", "ind_banking"],
  },
]

const sampleArtifacts: Artifact[] = [
  {
    id: "art_s2p_value_flow",
    kind: "ValueFlow",
    title: "Source to Pay Value Flow",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=S2P+Value+Flow",
  },
  {
    id: "art_s2p_components",
    kind: "Components",
    title: "S2P Solution Architecture",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=S2P+Architecture",
  },
  {
    id: "art_s2p_data_flow",
    kind: "DataFlow",
    title: "S2P Data Integration",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=S2P+Data+Flow",
  },
  {
    id: "art_s2p_process_flow",
    kind: "ProcessFlow",
    title: "S2P Process Flow",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=S2P+Process",
  },
  {
    id: "art_l2c_value_flow",
    kind: "ValueFlow",
    title: "Lead to Cash Value Flow",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=L2C+Value+Flow",
  },
  {
    id: "art_l2c_components",
    kind: "Components",
    title: "L2C Solution Architecture",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=L2C+Architecture",
  },
  {
    id: "art_finance_components",
    kind: "Components",
    title: "Finance Platform Architecture",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=Finance+Architecture",
  },
  {
    id: "art_hr_data_flow",
    kind: "DataFlow",
    title: "HR Data Integration",
    thumbUrl: "/placeholder.svg?height=200&width=300&text=HR+Data+Flow",
  },
]

const sampleReferences: any[] = [
  {
    id: "ref_joule_studio",
    title: "Joule with Joule Studio",
    slug: "joule-studio",
    type: "Reference Architecture",
    summary: "Extend Joule with custom Skills & AI Agents using SAP Build and advanced AI capabilities.",
    industries: ["ind_manufacturing"],
    processes: ["s2p"],
    capabilities: ["cap_strategic_sourcing"],
    products: ["SAP Build", "SAP AI Core", "Joule"],
    maturity: "GA",
    artifacts: ["art_s2p_value_flow"],
    businessValue: [
      "Custom AI agent development",
      "Enhanced Joule capabilities",
      "Rapid AI solution deployment",
    ],
    keyFeatures: [
      "Custom Skills development",
      "AI Agent creation",
      "SAP Build integration",
      "Joule extension framework",
    ],
    timeline: "1-2 months",
    availability: "Interactive",
    videoUrl: "/placeholder.mp4",
  },
  {
    id: "ref_genai_btp",
    title: "Generative AI on SAP BTP",
    slug: "genai-btp",
    type: "Reference Architecture",
    summary: "CAP + HANA Cloud (Vector) + Generative AI Hub for enterprise AI applications.",
    industries: ["ind_manufacturing"],
    processes: ["s2p"],
    capabilities: ["cap_strategic_sourcing"],
    products: ["SAP BTP", "SAP HANA Cloud", "SAP Generative AI Hub"],
    maturity: "GA",
    artifacts: ["art_s2p_value_flow"],
    businessValue: [
      "Enterprise AI capabilities",
      "Vector search and analytics",
      "Scalable AI infrastructure",
    ],
    keyFeatures: [
      "CAP application framework",
      "HANA Cloud Vector Engine",
      "Generative AI Hub",
      "Enterprise AI governance",
    ],
    timeline: "3-6 months",
    availability: "Interactive",
    videoUrl: "/placeholder.mp4",
  },
  {
    id: "ref_event_driven_apps",
    title: "Reference Architecture for Event-Driven Applications",
    slug: "event-driven-applications",
    type: "Reference Architecture",
    summary: "EDA with SAP Integration Suite (Event Mesh / Advanced Event Mesh), CAP, HANA Cloud, and Private Link.",
    industries: ["ind_manufacturing"],
    processes: ["s2p"],
    capabilities: ["cap_strategic_sourcing"],
    products: ["SAP BTP", "SAP Integration Suite", "SAP HANA Cloud"],
    maturity: "GA",
    artifacts: ["art_s2p_value_flow"],
    businessValue: [
      "Real-time responsiveness",
      "Asynchronous integration",
      "Clean-core extensions",
    ],
    keyFeatures: [
      "Event Mesh capabilities",
      "CAP-based framework",
      "Private Link connectivity",
      "Multi-broker support",
    ],
    timeline: "3-6 months",
    availability: "Interactive",
    videoUrl: "/placeholder.mp4",
  },
  {
    id: "ref_sap_build_process_automation",
    title: "Integrate and Extend with SAP Build Process Automation",
    slug: "sap-build-process-automation",
    type: "Reference Architecture",
    summary: "Low-code/no-code workflows & RPA to integrate and extend SAP and non-SAP processes.",
    industries: ["ind_manufacturing"],
    processes: ["s2p"],
    capabilities: ["cap_strategic_sourcing"],
    products: ["SAP Build Process Automation", "SAP Build Apps", "SAP Build Code", "SAP Build Work Zone"],
    maturity: "GA",
    artifacts: ["art_s2p_value_flow"],
    businessValue: [
      "Low-code process automation",
      "RPA integration",
      "Hybrid landscape support",
    ],
    keyFeatures: [
      "Workflow management",
      "Robotic process automation",
      "SAP integration",
      "Third-party connectivity",
    ],
    timeline: "1-2 months",
    availability: "Interactive",
    videoUrl: "/placeholder.mp4",
  },
]

export const useGalleryStore = create<GalleryState & GalleryActions>()(
  devtools(
    (set, get) => ({
      // Initial state
      industries: transformIndustries(sapIndustries),
      processes: sapValueChains,
      domains: sampleDomains,
      areas: sampleAreas,
      capabilities: sampleCapabilities,
      kpis: sampleKPIs,
      painPoints: samplePainPoints,
      artifacts: sampleArtifacts,
      references: sampleReferences,
      processFacets: processFacetsData,
      query: "",
      filters: {
        industryIds: [],
        processIds: [],
        capabilityIds: [],
        products: [],
        types: [],
        complexity: [],
        timeline: [],
        maturity: [],
      },
      view: "industries", // default view
      pageSize: 9,
      pageIndex: 0,
      selectedItemId: null,

      // Actions
      setView: (v: GalleryState["view"]) => {
        set({ view: v, pageIndex: 0 })
        get().syncToUrl()
      },

      setQuery: (q: string) => {
        set({ query: q, pageIndex: 0 })
        get().syncToUrl()
      },

      setFilters: (patch: Partial<GalleryState["filters"]>) => {
        set((state) => ({
          filters: { ...state.filters, ...patch },
          pageIndex: 0,
        }))
        get().syncToUrl()
      },

      clearFilters: () => {
        set({
          query: "",
          filters: {
            industryIds: [],
            processIds: [],
            capabilityIds: [],
            products: [],
            types: [],
            complexity: [],
            timeline: [],
            maturity: [],
          },
          pageIndex: 0,
        })
        get().syncToUrl()
      },

      setPageIndex: (i: number) => {
        set({ pageIndex: i })
      },

      setSelectedItemId: (id: string | null) => {
        set({ selectedItemId: id })
        get().syncToUrl()
      },

      // New selectors for 4-pane views
      itemsByView: () => {
        const { references, query, filters } = get()

        return references.filter((item) => {
          // Text search
          if (
            query &&
            !item.title.toLowerCase().includes(query.toLowerCase()) &&
            !item.summary.toLowerCase().includes(query.toLowerCase())
          ) {
            return false
          }

          // Apply filters
          if (filters.industryIds.length > 0 && !filters.industryIds.some((id) => item.industries.includes(id))) {
            return false
          }
          if (filters.processIds.length > 0 && !filters.processIds.some((id) => item.processes.includes(id))) {
            return false
          }
          if (filters.capabilityIds.length > 0 && !filters.capabilityIds.some((id) => item.capabilities.includes(id))) {
            return false
          }
          if (filters.products.length > 0 && !filters.products.some((product) => item.products?.includes(product))) {
            return false
          }
          if (
            filters.timeline &&
            filters.timeline.length > 0 &&
            (!item.timeline || !filters.timeline.includes(item.timeline))
          ) {
            return false
          }
          if (
            filters.maturity &&
            filters.maturity.length > 0 &&
            (!item.maturity || !filters.maturity.includes(item.maturity))
          ) {
            return false
          }

          return true
        })
      },

      filteredItems: () => {
        return get().itemsByView()
      },

      visibleItems: () => {
        const { pageIndex, pageSize } = get()
        const filtered = get().filteredItems()
        const start = pageIndex * pageSize
        const end = start + pageSize
        return filtered.slice(start, end)
      },

      industriesWithCounts: () => {
        const { industries, references } = get()
        return industries.map((industry) => ({
          ...industry,
          solutionCount: references.filter((ref) => ref.industries.includes(industry.id)).length,
        }))
      },

      processesTree: () => {
        const { processes } = get()
        const e2eProcesses = processes.filter((p) => p.level === "E2E")
        return e2eProcesses.map((e2e) => ({
          ...e2e,
          children: processes
            .filter((p) => p.parentId === e2e.id)
            .sort((a, b) => (a.moduleOrder || 0) - (b.moduleOrder || 0)),
        }))
      },

      bcmTree: () => {
        const { domains, areas, capabilities } = get()
        return domains
          .map((domain) => ({
            ...domain,
            areas: areas
              .filter((area) => area.domainId === domain.id)
              .map((area) => ({
                ...area,
                capabilities: capabilities.filter((cap) => cap.areaId === area.id),
              }))
              .sort((a, b) => (a.order || 0) - (b.order || 0)),
          }))
          .sort((a, b) => (a.order || 0) - (b.order || 0))
      },

      getProcessFacets: (processKey: string) => {
        return getProcessFacets(processKey)
      },

      // URL persistence with view parameter
      loadFromUrl: () => {
        if (typeof window === "undefined") return

        const params = new URLSearchParams(window.location.search)
        const query = params.get("q") || ""
        const view = (params.get("view") as GalleryState["view"]) || "industries"
        const selectedItemId = params.get("item")

        // Parse filters from URL
        const filters = {
          industryIds: params.get("industries")?.split(",").filter(Boolean) || [],
          processIds: params.get("processes")?.split(",").filter(Boolean) || [],
          capabilityIds: params.get("capabilities")?.split(",").filter(Boolean) || [],
          products: params.get("products")?.split(",").filter(Boolean) || [],
          complexity: (params.get("complexity")?.split(",").filter(Boolean) as ("Low" | "Medium" | "High")[]) || [],
          timeline:
            (params.get("timeline")?.split(",").filter(Boolean) as ("1-2 weeks" | "1-2 months" | "3-6 months")[]) || [],
          maturity: (params.get("maturity")?.split(",").filter(Boolean) as ("Concept" | "Preview" | "GA")[]) || [],
        }

        set({ query, view, filters: { ...filters, types: [] }, selectedItemId })
      },

      syncToUrl: () => {
        if (typeof window === "undefined") return

        const { query, view, filters, selectedItemId } = get()
        const params = new URLSearchParams()

        if (query) params.set("q", query)
        if (view !== "industries") params.set("view", view)
        if (selectedItemId) params.set("item", selectedItemId)

        // Add filters to URL
        if (filters.industryIds.length) params.set("industries", filters.industryIds.join(","))
        if (filters.processIds.length) params.set("processes", filters.processIds.join(","))
        if (filters.capabilityIds.length) params.set("capabilities", filters.capabilityIds.join(","))
        if (filters.products.length) params.set("products", filters.products.join(","))
        if (filters.complexity && filters.complexity.length) params.set("complexity", filters.complexity.join(","))
        if (filters.timeline && filters.timeline.length) params.set("timeline", filters.timeline.join(","))
        if (filters.maturity && filters.maturity.length) params.set("maturity", filters.maturity.join(","))

        const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
        window.history.replaceState({}, "", newUrl)
      },
    }),
    { name: "gallery-store" },
  ),
)
