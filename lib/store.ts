import { create } from "zustand"
import { devtools } from "zustand/middleware"

export interface KPI {
  id: string
  name: string
  definition: string
  unit: string
  target?: number
  current?: number
  benchmark?: number
  processes?: string[]
  capabilities?: string[]
  function: string
  // Design Studio extensions
  direction?: "up" | "down"
  baseline?: number | null
  industryIds?: string[]
  processKeys?: string[]
  capabilityIds?: string[]
}

export interface PainPoint {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  area: string
  // Design Studio extensions
  severity?: 1 | 2 | 3 | 4 | 5
  frequency?: "low" | "med" | "high"
  industryIds?: string[]
  processKeys?: string[]
  capabilityIds?: string[]
}

export interface Initiative {
  id: string
  title: string
  description: string
  type: "fast-lane" | "core"
  priority: "high" | "medium" | "low"
  // Design Studio extensions
  stage?: "Idea" | "Planned" | "InFlight"
  processKeys?: string[]
  capabilityIds?: string[]
  kpiIds?: string[]
}

export interface Principle {
  id: string
  title: string
  description: string
  category: "security" | "data" | "integration" | "operability"
}

export interface NorthStarFragment {
  id: string
  title: string
  lens: "Outcomes" | "Stakeholders" | "Operations" | "Experiences" | "Tagline"
  vision?: string
  priorities?: string[]
  goals?: string[]
  valueDrivers?: string[]
  capabilities?: string[]
  initiatives?: string[]
  kpiIds?: string[]
  processIds?: string[]
  lob?: string
  persona?: string
  region?: string
  source?: "Interview" | "Workshop" | "Document" | "Agent"
  impact?: number
  effort?: number
  horizon?: "Now" | "Next" | "Later"
  confidence?: number
  createdAt: string
  updatedAt: string
  // Design Studio extensions
  processKeys?: string[]
  capabilityIds?: string[]
}

export interface Interview {
  id: string
  name: string
  role: string
  unit: string
  area: string
  date: string
  durationMin?: number
  recordingUrl?: string
  transcript?: string
  consent: boolean
  highlights: {
    strategicObjectives: string[]
    businessPriorities: string[]
    valueDrivers: string[]
    quickWins: string[]
    expectations: string[]
  }
  fragments: Array<{
    id: string
    text: string
    tags: string[]
    mappings: {
      processId?: string
      capabilityId?: string
      kpiId?: string
    }
    weight: number
  }>
  championScore: number
  reviewer?: {
    name: string
    date: string
  }
}

export interface SurveyQuestion {
  id: string
  type:
    | "single"
    | "multi"
    | "likert"
    | "matrix"
    | "ranking"
    | "short"
    | "long"
    | "number"
    | "date"
    | "section"
    | "consent"
  title: string
  required: boolean
  options?: string[]
  tags: string[]
  mappings?: {
    processId?: string
    capabilityId?: string
    kpiId?: string
  }
}

export interface SurveySection {
  id: string
  title: string
  questions: SurveyQuestion[]
}

export interface Survey {
  id: string
  name: string
  description?: string
  audience: string[]
  language: string
  accessMode: "public" | "code" | "email"
  accessCode?: string
  expiryDate?: string
  consentText: string
  sections: SurveySection[]
  status: "draft" | "active" | "closed"
  createdAt: string
  updatedAt: string
  distribution: {
    shareLink: string
    emailInvites: string[]
    qrCodeGenerated: boolean
    embedCode: string
  }
  settings: {
    identityMode: "anonymous" | "email" | "employee"
    throttleEnabled: boolean
    reminderSchedule?: {
      datetime: string
      message: string
    }
  }
}

export interface SurveyResponse {
  id: string
  surveyId: string
  respondent: {
    name?: string
    email?: string
    employeeId?: string
    role?: string
    unit?: string
    lob?: string
  }
  answers: Array<{
    questionId: string
    value: string | string[] | number
    tags?: string[]
  }>
  status: "started" | "completed" | "abandoned"
  startedAt: string
  completedAt?: string
  durationSec?: number
  ipAddress?: string
}

export interface SurveyAnalytics {
  surveyId: string
  stats: {
    sent: number
    opened: number
    started: number
    completed: number
    avgTimeSec: number
    completionRate: number
    medianTimeSec: number
    dropoutQuestion?: string
    satisfaction?: number
  }
  themes: Array<{
    theme: string
    count: number
    color: string
    responses: string[]
  }>
  taglines: Array<{
    tagline: string
    approved: boolean
    sourceResponseIds: string[]
  }>
  fragments: Array<{
    id: string
    text: string
    tags: string[]
    mappings: {
      processId?: string
      capabilityId?: string
      kpiId?: string
    }
    weight: number
    sourceResponseId: string
    sourceQuestionId: string
  }>
  outputs: {
    fragmentsCreated: number
    initiativesCreated: number
    requirementsUpdated: number
  }
}

export interface Coverage {
  target: number
  completed: number
  unitsCovered: string[]
  areasCovered: string[]
}

export interface Industry {
  id: string
  name: string
  icon?: string
  description?: string
}

export interface ValueChain {
  id: string
  key: "S2P" | "FIN" | "A2D" | "I2M" | "R2R" | "L2C" | "P2F" | "GOV"
  name: string
  description?: string
}

export interface Capability {
  id: string
  name: string
  parentId?: string | null
  processKeys?: string[]
}

export interface DesignInput {
  id: string
  industryId?: string | null
  processKey?: string | null
  lob?: string | null
  capabilityIds: string[]
  kpiIds: string[]
  painPointIds: string[]
  interviewIds: string[]
  surveyIds: string[]
  fragmentIds: string[]
  initiativeIds: string[]
  createdAt: string
  updatedAt: string
}

export interface DesignModel {
  id: string
  name: string
  inputId: string
  views: Array<{
    kind: "C4" | "ValueFlow" | "DataFlow" | "Sequence"
    code: string
    status: "clean" | "out-of-sync"
  }>
  tradeoffs: Array<{
    dimension: string
    option: string
    score: number
    rationale: string
  }>
  sync: {
    docs: "in-sync" | "out-of-sync"
    lastRun: string | null
  }
}

export interface HeatmapCell {
  processKey: string
  capabilityId: string
  score: number // 0..100
  contributors: {
    kpiGap?: number
    painSeverity?: number
    interviewMentions?: number
    fragmentImpact?: number
  }
}

export interface ReferenceModel {
  id: string
  title: string
  summary?: string
  industryIds?: string[]
  processKeys?: ValueChain["key"][]
  capabilityIds?: string[]
  nonFunctionals?: string[]
  views: { kind: "C4" | "ValueFlow" | "DataFlow" | "Sequence"; code: string }[]
  bom?: { name: string; vendor?: string; category?: string }[]
  cloud?: string[]
  aiModels?: string[]
  tradeoffNotes?: string
  tags?: string[]
  status?: "GA" | "Preview" | "Draft"
  updatedAt: string
}

export interface Pattern {
  id: string
  title: string
  kind: "Integration" | "Data" | "AI Agent" | "Governance" | "Observability" | "Security"
  summary?: string
  prerequisites?: string[]
  steps?: string[]
  metrics?: string[]
  relatedReferenceIds?: string[]
  industryIds?: string[]
  processKeys?: ValueChain["key"][]
  capabilityIds?: string[]
  tags?: string[]
  updatedAt: string
}

export interface Accelerator {
  id: string
  title: string
  assetType: "Template" | "CLI" | "Connector" | "Notebook" | "SDK"
  summary?: string
  version?: string
  license?: "Apache-2.0" | "MIT" | "Proprietary" | "Other"
  repoUrl?: string
  docsUrl?: string
  industryIds?: string[]
  processKeys?: ValueChain["key"][]
  capabilityIds?: string[]
  tags?: string[]
  updatedAt: string
}

export interface Demo {
  id: string
  title: string
  videoUrl?: string
  durationSec?: number
  scenario?: string
  steps?: string[]
  sampleDataNotes?: string
  industryIds?: string[]
  processKeys?: ValueChain["key"][]
  capabilityIds?: string[]
  tags?: string[]
  updatedAt: string
}

export interface GalleryRegistry {
  references: ReferenceModel[]
  patterns: Pattern[]
  accelerators: Accelerator[]
  demos: Demo[]
}

interface ICState {
  kpis: KPI[]
  painPoints: PainPoint[]
  initiatives: Initiative[]
  principles: Principle[]
  interviews: Interview[]
  coverage: Coverage
  readiness: number
  interviewReadiness: number
  surveys: Survey[]
  surveyResponses: SurveyResponse[]
  surveyAnalytics: Record<string, SurveyAnalytics>
  activeSurvey: Survey | null
  northStarFragments: NorthStarFragment[]
  industries: Industry[]
  valueChains: ValueChain[]
  capabilities: Capability[]
  designInputs: DesignInput[]
  designModels: DesignModel[]
  activeDesignInput: DesignInput | null
  galleryRegistry: GalleryRegistry
  compareItems: Array<{ type: "reference" | "pattern" | "accelerator" | "demo"; id: string }>
  runAgent: (industry: string) => void
  recalcReadiness: () => void
  addInterview: (interview: Omit<Interview, "id">) => void
  updateInterview: (id: string, updates: Partial<Interview>) => void
  deleteInterview: (id: string) => void
  recalcInterviewReadiness: () => void
  createSurvey: (survey: Omit<Survey, "id" | "createdAt" | "updatedAt">) => string
  updateSurvey: (id: string, updates: Partial<Survey>) => void
  deleteSurvey: (id: string) => void
  setActiveSurvey: (survey: Survey | null) => void
  addSurveyResponse: (response: Omit<SurveyResponse, "id">) => void
  updateSurveyAnalytics: (surveyId: string, analytics: Partial<SurveyAnalytics>) => void
  getSurveyById: (id: string) => Survey | undefined
  getResponsesBySurveyId: (surveyId: string) => SurveyResponse[]
  addFragment: (fragment: Omit<NorthStarFragment, "id" | "createdAt" | "updatedAt">) => string
  updateFragment: (id: string, updates: Partial<NorthStarFragment>) => void
  removeFragment: (id: string) => void
  bulkImport: (fragments: Omit<NorthStarFragment, "id" | "createdAt" | "updatedAt">[]) => void
  clusterFragments: (lens?: string) => Promise<{ clusters: Array<{ title: string; fragmentIds: string[] }> }>
  mergeFragments: (fragmentIds: string[], newTitle: string) => void
  getFragmentsByLens: (lens: string) => NorthStarFragment[]
  getBoardCompleteness: () => number
  seedCatalog: (payload: { industries: Industry[]; valueChains: ValueChain[]; capabilities: Capability[] }) => void
  createDesignInput: (payload: Omit<DesignInput, "id" | "createdAt" | "updatedAt">) => string
  updateDesignInput: (id: string, partial: Partial<DesignInput>) => void
  mapEvidence: (payload: { inputId: string; bucket: string; ids: string[] }) => void
  computeHeatmap: (inputId: string) => HeatmapCell[]
  generateDesignModel: (inputId: string) => DesignModel
  syncDocs: (modelId: string) => void
  setActiveDesignInput: (input: DesignInput | null) => void
  seedGallery: (registry: GalleryRegistry) => void
  galleryAddToDesign: (
    itemType: "reference" | "pattern" | "accelerator" | "demo",
    itemId: string,
    context?: any,
  ) => void
  galleryCompareToggle: (itemType: "reference" | "pattern" | "accelerator" | "demo", id: string) => void
  getGalleryAgentView: () => any
  getIndustryStats: (industryId: string) => {
    kpis: number
    painPoints: number
    initiatives: number
    references: number
  }
  getValueChainsByIndustry: (industryId: string) => ValueChain[]
  getIndustriesWithStats: () => {
    id: string
    name: string
    icon?: string | undefined
    description?: string | undefined
    stats: {
      kpis: number
      painPoints: number
      initiatives: number
      references: number
    }
  }[]
}

const seedGalleryData: GalleryRegistry = {
  references: [
    {
      id: "microservices-arch",
      title: "Microservices Architecture",
      summary: "Scalable microservices pattern with API gateway and service mesh",
      industryIds: ["financial-services"],
      processKeys: ["l2c"],
      capabilityIds: ["integration", "api-management"],
      views: [
        {
          kind: "C4",
          code: '// C4 Context diagram\nSystem_Boundary(api, "API Layer") {\n  Container(gateway, "API Gateway")\n}',
        },
        { kind: "DataFlow", code: "// Data flow diagram\nClient -> Gateway -> Services -> Database" },
      ],
      bom: [
        { name: "Kong Gateway", vendor: "Kong", category: "API Gateway" },
        { name: "Istio", vendor: "Google", category: "Service Mesh" },
      ],
      cloud: ["SAP BTP", "AWS", "Azure"],
      aiModels: ["GPT-4", "Claude"],
      tradeoffNotes: "Higher complexity vs better scalability",
      tags: ["microservices", "api", "scalability"],
      status: "GA",
      updatedAt: "2024-01-15",
    },
    {
      id: "event-driven-arch",
      title: "Event-Driven Architecture",
      summary: "Asynchronous event processing with message queues",
      industryIds: ["manufacturing"],
      processKeys: ["p2f"],
      capabilityIds: ["integration", "data-streaming"],
      views: [
        { kind: "ValueFlow", code: "// Value stream mapping\nEvent Producer -> Message Queue -> Event Consumer" },
        { kind: "Sequence", code: "// Sequence diagram\nProducer->Queue: publish\nQueue->Consumer: deliver" },
      ],
      bom: [
        { name: "Apache Kafka", vendor: "Apache", category: "Message Queue" },
        { name: "Redis", vendor: "Redis Labs", category: "Cache" },
      ],
      cloud: ["SAP Event Mesh", "AWS EventBridge"],
      tags: ["events", "async", "messaging"],
      status: "GA",
      updatedAt: "2024-01-20",
    },
    {
      id: "data-mesh-pattern",
      title: "Data Mesh Architecture",
      summary: "Decentralized data architecture with domain ownership",
      industryIds: ["retail"],
      processKeys: ["fin"],
      capabilityIds: ["data-analytics", "data-governance"],
      views: [
        {
          kind: "C4",
          code: '// Data mesh components\nSystem(domain1, "Sales Domain")\nSystem(domain2, "Inventory Domain")',
        },
        { kind: "DataFlow", code: "// Data product flow\nDomain -> Data Product -> Consumer" },
      ],
      bom: [
        { name: "Databricks", vendor: "Databricks", category: "Data Platform" },
        { name: "Snowflake", vendor: "Snowflake", category: "Data Warehouse" },
      ],
      cloud: ["SAP Datasphere", "AWS", "Snowflake"],
      tags: ["data-mesh", "analytics", "governance"],
      status: "Preview",
      updatedAt: "2024-02-01",
    },
  ],
  patterns: [
    {
      id: "api-gateway-pattern",
      title: "API Gateway Pattern",
      kind: "Integration",
      summary: "Centralized API management and security gateway",
      prerequisites: ["Microservices architecture", "Authentication system"],
      steps: [
        "Deploy API Gateway",
        "Configure routing rules",
        "Implement authentication",
        "Add rate limiting",
        "Monitor and log requests",
      ],
      metrics: ["Request latency", "Throughput", "Error rate", "Authentication success rate"],
      relatedReferenceIds: ["microservices-arch"],
      industryIds: ["financial-services", "retail"],
      processKeys: ["l2c", "s2p"],
      capabilityIds: ["api-management", "security"],
      tags: ["api", "gateway", "security"],
      updatedAt: "2024-01-10",
    },
    {
      id: "cqrs-pattern",
      title: "CQRS Pattern",
      kind: "Data",
      summary: "Command Query Responsibility Segregation for scalable data access",
      prerequisites: ["Event sourcing", "Separate read/write models"],
      steps: [
        "Separate command and query models",
        "Implement event store",
        "Create read model projections",
        "Handle eventual consistency",
      ],
      metrics: ["Read performance", "Write performance", "Consistency lag"],
      industryIds: ["financial-services"],
      processKeys: ["fin"],
      capabilityIds: ["data-analytics"],
      tags: ["cqrs", "event-sourcing", "scalability"],
      updatedAt: "2024-01-12",
    },
    {
      id: "ai-agent-orchestration",
      title: "AI Agent Orchestration",
      kind: "AI Agent",
      summary: "Multi-agent workflow coordination and task distribution",
      prerequisites: ["AI/ML platform", "Workflow engine"],
      steps: [
        "Define agent capabilities",
        "Create orchestration workflows",
        "Implement agent communication",
        "Monitor agent performance",
      ],
      metrics: ["Task completion rate", "Agent utilization", "Response time"],
      industryIds: ["manufacturing", "retail"],
      processKeys: ["i2m", "p2f"],
      capabilityIds: ["ai-ml"],
      tags: ["ai", "agents", "orchestration"],
      updatedAt: "2024-02-05",
    },
    {
      id: "policy-engine-pattern",
      title: "Policy Engine Pattern",
      kind: "Governance",
      summary: "Dynamic rule evaluation and policy enforcement",
      prerequisites: ["Rule definition language", "Policy repository"],
      steps: [
        "Define policy rules",
        "Implement policy engine",
        "Integrate with applications",
        "Monitor policy violations",
      ],
      metrics: ["Policy evaluation time", "Compliance rate", "Rule coverage"],
      industryIds: ["financial-services"],
      processKeys: ["gov"],
      capabilityIds: ["governance", "compliance"],
      tags: ["policy", "governance", "compliance"],
      updatedAt: "2024-01-25",
    },
  ],
  accelerators: [
    {
      id: "sap-btp-template",
      title: "SAP BTP Application Template",
      assetType: "Template",
      summary: "Production-ready SAP BTP application template with best practices",
      version: "v2.1.0",
      license: "Apache-2.0",
      repoUrl: "https://github.com/sap/btp-template",
      docsUrl: "https://help.sap.com/btp-template",
      industryIds: ["financial-services", "manufacturing"],
      processKeys: ["s2p", "fin"],
      capabilityIds: ["integration", "security"],
      tags: ["sap", "btp", "template"],
      updatedAt: "2024-01-30",
    },
    {
      id: "migration-cli-tool",
      title: "Cloud Migration CLI",
      assetType: "CLI",
      summary: "Command-line tool for automated cloud migration workflows",
      version: "v1.5.2",
      license: "MIT",
      repoUrl: "https://github.com/migration-cli",
      docsUrl: "https://docs.migration-cli.com",
      industryIds: ["retail", "manufacturing"],
      processKeys: ["a2d"],
      capabilityIds: ["cloud-migration"],
      tags: ["migration", "cli", "automation"],
      updatedAt: "2024-02-10",
    },
    {
      id: "kafka-connector",
      title: "Enterprise Kafka Connector",
      assetType: "Connector",
      summary: "High-performance Kafka connector for enterprise systems",
      version: "v3.0.1",
      license: "Proprietary",
      repoUrl: "https://github.com/enterprise/kafka-connector",
      docsUrl: "https://docs.enterprise.com/kafka",
      industryIds: ["financial-services"],
      processKeys: ["l2c", "p2f"],
      capabilityIds: ["data-streaming", "integration"],
      tags: ["kafka", "connector", "streaming"],
      updatedAt: "2024-01-18",
    },
    {
      id: "ml-training-notebook",
      title: "ML Model Training Notebook",
      assetType: "Notebook",
      summary: "Jupyter notebook template for ML model training and evaluation",
      version: "v1.2.0",
      license: "Apache-2.0",
      repoUrl: "https://github.com/ml-notebooks/training",
      docsUrl: "https://ml-notebooks.com/training",
      industryIds: ["retail", "manufacturing"],
      processKeys: ["i2m"],
      capabilityIds: ["ai-ml", "data-analytics"],
      tags: ["ml", "jupyter", "training"],
      updatedAt: "2024-02-03",
    },
  ],
  demos: [
    {
      id: "ai-workflow-demo",
      title: "AI-Powered Business Workflow",
      videoUrl: "https://demo.example.com/ai-workflow.mp4",
      durationSec: 180,
      scenario: "End-to-end AI-powered business process automation",
      steps: [
        "Document ingestion and processing",
        "AI-powered data extraction",
        "Workflow orchestration",
        "Human-in-the-loop validation",
        "Automated decision making",
      ],
      sampleDataNotes: "Uses synthetic invoice and contract data",
      industryIds: ["financial-services", "manufacturing"],
      processKeys: ["s2p", "fin"],
      capabilityIds: ["ai-ml", "workflow"],
      tags: ["ai", "workflow", "automation"],
      updatedAt: "2024-02-08",
    },
    {
      id: "realtime-analytics-demo",
      title: "Real-time Analytics Dashboard",
      videoUrl: "https://demo.example.com/analytics.mp4",
      durationSec: 240,
      scenario: "Live dashboard with streaming data and predictive analytics",
      steps: [
        "Data stream ingestion",
        "Real-time processing",
        "Predictive model inference",
        "Dashboard visualization",
        "Alert generation",
      ],
      sampleDataNotes: "Simulated IoT sensor data and sales transactions",
      industryIds: ["manufacturing", "retail"],
      processKeys: ["p2f", "l2c"],
      capabilityIds: ["data-analytics", "data-streaming"],
      tags: ["analytics", "realtime", "dashboard"],
      updatedAt: "2024-01-28",
    },
    {
      id: "mobile-integration-demo",
      title: "Cross-Platform Mobile Integration",
      videoUrl: "https://demo.example.com/mobile.mp4",
      durationSec: 150,
      scenario: "Mobile app integration with enterprise systems",
      steps: [
        "Mobile app authentication",
        "API integration",
        "Offline data sync",
        "Push notifications",
        "Analytics tracking",
      ],
      sampleDataNotes: "Mock employee and customer data",
      industryIds: ["retail"],
      processKeys: ["r2r", "l2c"],
      capabilityIds: ["mobile", "integration"],
      tags: ["mobile", "integration", "sync"],
      updatedAt: "2024-02-12",
    },
  ],
}

const sampleKPIs = (industry: string): KPI[] => [
  {
    id: "1",
    name: "Revenue Growth Rate",
    definition: "Year-over-year revenue growth percentage",
    unit: "%",
    target: 15,
    current: 12,
    benchmark: 18,
    function: "Finance",
    processes: ["Sales Process"],
    capabilities: ["Revenue Management"],
    industryIds: [industry],
    processKeys: ["FIN"],
    capabilityIds: ["cap-2"],
  },
  {
    id: "2",
    name: "Customer Satisfaction Score",
    definition: "Average customer satisfaction rating",
    unit: "Score",
    target: 4.5,
    current: 4.2,
    benchmark: 4.6,
    function: "Operations",
    processes: ["Customer Service"],
    capabilities: ["Customer Experience"],
    industryIds: [industry],
    processKeys: ["L2C"],
    capabilityIds: ["cap-10"],
  },
]

const samplePP = (industry: string): PainPoint[] => [
  {
    id: "1",
    title: "Manual Data Entry",
    description: "Time-consuming manual processes",
    impact: "high",
    area: "Operations",
    industryIds: [industry],
    processKeys: ["S2P"],
    capabilityIds: ["cap-3"],
  },
  {
    id: "2",
    title: "Legacy System Integration",
    description: "Difficulty integrating with modern systems",
    impact: "medium",
    area: "Technology",
    industryIds: [industry],
    processKeys: ["FIN"],
    capabilityIds: ["cap-2"],
  },
]

const sampleInits = (industry: string): Initiative[] => [
  {
    id: "1",
    title: "Process Automation",
    description: "Automate manual data entry processes",
    type: "fast-lane",
    priority: "high",
    industryIds: [industry],
    processKeys: ["S2P"],
    capabilityIds: ["cap-3"],
    kpiIds: ["1"],
  },
  {
    id: "2",
    title: "System Modernization",
    description: "Upgrade legacy systems",
    type: "core",
    priority: "medium",
    industryIds: [industry],
    processKeys: ["FIN"],
    capabilityIds: ["cap-2"],
    kpiIds: ["2"],
  },
]

const sampleInterviews = (): Interview[] => [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CEO",
    unit: "Corporate",
    area: "Business",
    date: "2024-01-15",
    durationMin: 45,
    consent: true,
    highlights: {
      strategicObjectives: ["Digital transformation acceleration", "Market expansion in APAC"],
      businessPriorities: ["Customer experience improvement", "Operational efficiency"],
      valueDrivers: ["Revenue growth", "Cost optimization", "Risk mitigation"],
      quickWins: ["Process automation", "Data analytics dashboard"],
      expectations: ["Clear ROI metrics", "Phased implementation approach"],
    },
    fragments: [
      {
        id: "1",
        text: "We need to accelerate our digital transformation to stay competitive",
        tags: ["Vision", "Priority"],
        mappings: {},
        weight: 0.9,
      },
      {
        id: "2",
        text: "Customer experience is our top priority for the next 18 months",
        tags: ["Priority", "Capability"],
        mappings: {},
        weight: 0.8,
      },
    ],
    championScore: 95,
  },
  {
    id: "2",
    name: "Michael Torres",
    role: "CFO",
    unit: "Corporate",
    area: "Finance",
    date: "2024-01-18",
    durationMin: 50,
    consent: true,
    highlights: {
      strategicObjectives: ["Cost optimization", "Financial transparency"],
      businessPriorities: ["Budget control", "ROI measurement"],
      valueDrivers: ["Cost reduction", "Process efficiency"],
      quickWins: ["Automated reporting", "Budget tracking tools"],
      expectations: ["Measurable cost savings", "Improved financial visibility"],
    },
    fragments: [
      {
        id: "3",
        text: "ROI must be measurable within 6 months of implementation",
        tags: ["Constraint", "KPI"],
        mappings: {},
        weight: 0.7,
      },
    ],
    championScore: 88,
  },
]

const sampleSurvey = (): Survey => ({
  id: "survey-1",
  name: "Strategic Direction Survey",
  description: "Gathering strategic insights from stakeholders",
  audience: ["Stakeholders", "LoB"],
  language: "English",
  accessMode: "code",
  accessCode: "STR2024",
  consentText: "By participating, you consent to data collection for strategic planning purposes.",
  sections: [
    {
      id: "strategic",
      title: "Strategic Direction",
      questions: [
        {
          id: "q1",
          type: "likert",
          title: "How aligned is your organization with its strategic objectives?",
          required: true,
          tags: ["Vision", "Priority"],
        },
        {
          id: "q2",
          type: "multi",
          title: "What are your top 3 strategic priorities?",
          required: false,
          options: [
            "Digital Transformation",
            "Cost Optimization",
            "Market Expansion",
            "Innovation",
            "Operational Excellence",
          ],
          tags: ["Goal", "Priority"],
        },
      ],
    },
    {
      id: "challenges",
      title: "Operating Challenges",
      questions: [
        {
          id: "q3",
          type: "long",
          title: "Describe your biggest operational pain points",
          required: true,
          tags: ["Process", "Capability"],
        },
      ],
    },
  ],
  status: "active",
  createdAt: "2024-01-20T10:00:00Z",
  updatedAt: "2024-01-20T10:00:00Z",
  distribution: {
    shareLink: "https://survey.ai-platform.com/str2024",
    emailInvites: [],
    qrCodeGenerated: true,
    embedCode: '<iframe src="https://survey.ai-platform.com/str2024" width="600" height="400"></iframe>',
  },
  settings: {
    identityMode: "email",
    throttleEnabled: true,
  },
})

const sampleNorthStarFragments = (): NorthStarFragment[] => [
  {
    id: "nsf-1",
    title: "Increase customer satisfaction by 25%",
    lens: "Outcomes",
    vision: "Become the most customer-centric organization in our industry",
    priorities: ["Customer Experience", "Digital Transformation"],
    goals: ["Reduce response time", "Improve NPS score"],
    valueDrivers: ["Customer Satisfaction", "Revenue Growth"],
    lob: "Customer Success",
    source: "Workshop",
    impact: 5,
    effort: 3,
    horizon: "Next",
    confidence: 85,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    processKeys: ["L2C"],
    capabilityIds: ["cap-10"],
  },
  {
    id: "nsf-2",
    title: "C-Suite alignment on digital strategy",
    lens: "Stakeholders",
    vision: "United leadership driving transformation",
    priorities: ["Strategic Alignment", "Change Management"],
    goals: ["Executive buy-in", "Clear communication"],
    valueDrivers: ["Organizational Alignment", "Decision Speed"],
    lob: "Executive",
    source: "Interview",
    impact: 4,
    effort: 2,
    horizon: "Now",
    confidence: 90,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    processKeys: ["GOV"],
    capabilityIds: ["cap-7"],
  },
  {
    id: "nsf-3",
    title: "Automate manual reporting processes",
    lens: "Operations",
    vision: "Streamlined operations with minimal manual intervention",
    priorities: ["Process Optimization", "Automation"],
    goals: ["Reduce manual work", "Improve accuracy"],
    valueDrivers: ["Cost Saving", "Productivity"],
    lob: "Finance",
    source: "Workshop",
    impact: 3,
    effort: 4,
    horizon: "Next",
    confidence: 75,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    processKeys: ["FIN"],
    capabilityIds: ["cap-2"],
  },
  {
    id: "nsf-4",
    title: "Seamless omnichannel experience",
    lens: "Experiences",
    vision: "Consistent experience across all touchpoints",
    priorities: ["Customer Experience", "Digital Channels"],
    goals: ["Channel integration", "Consistent messaging"],
    valueDrivers: ["Customer Satisfaction", "Brand Consistency"],
    lob: "Marketing",
    source: "Document",
    impact: 5,
    effort: 5,
    horizon: "Later",
    confidence: 60,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    processKeys: ["L2C"],
    capabilityIds: ["cap-10"],
  },
  {
    id: "nsf-5",
    title: "Innovation drives our competitive advantage",
    lens: "Tagline",
    vision: "Leading through continuous innovation",
    priorities: ["Innovation", "Market Leadership"],
    goals: ["Increase R&D investment", "Faster time-to-market"],
    valueDrivers: ["Competitive Advantage", "Market Share"],
    lob: "R&D",
    source: "Agent",
    impact: 4,
    effort: 3,
    horizon: "Now",
    confidence: 80,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    processKeys: ["I2M"],
    capabilityIds: ["cap-12"],
  },
]

const seedIndustries = (): Industry[] => [
  {
    id: "ind_aerospace-defence",
    name: "Aerospace & Defence",
    icon: "AD",
    description: "Defense contractors, aerospace manufacturers, and aviation services",
  },
  {
    id: "ind_agribusiness",
    name: "Agribusiness",
    icon: "AG",
    description: "Agricultural production, food processing, and agtech solutions",
  },
  {
    id: "ind_automotive",
    name: "Automotive",
    icon: "AU",
    description: "Vehicle manufacturers and automotive suppliers focusing on mobility solutions",
  },
  {
    id: "ind_banking",
    name: "Banking",
    icon: "BK",
    description: "Financial institutions providing banking services, lending, and wealth management",
  },
  {
    id: "ind_chemicals",
    name: "Chemicals",
    icon: "CH",
    description: "Chemical manufacturing, petrochemicals, and specialty materials",
  },
  {
    id: "ind_consumer-products",
    name: "Consumer Products",
    icon: "CP",
    description: "Companies manufacturing and distributing consumer goods and retail products",
  },
  {
    id: "ind_construction-realestate",
    name: "Construction & Real Estate",
    icon: "CR",
    description: "Construction companies, real estate development, and property management",
  },
  {
    id: "ind_government",
    name: "Government",
    icon: "GV",
    description: "Public sector organizations, agencies, and government services",
  },
  {
    id: "ind_high-tech",
    name: "High Tech",
    icon: "HT",
    description: "Software, hardware, and technology services companies driving digital transformation",
  },
  {
    id: "ind_education-research",
    name: "Education & Research",
    icon: "ED",
    description: "Educational institutions, research organizations, and academic services",
  },
  {
    id: "ind_industrial-mfg",
    name: "Industrial Manufacturing",
    icon: "IM",
    description: "Manufacturing companies producing industrial equipment, machinery, and components",
  },
  {
    id: "ind_insurance",
    name: "Insurance",
    icon: "IN",
    description: "Insurance providers, risk management, and actuarial services",
  },
  {
    id: "ind_lifesciences-health",
    name: "Life Sciences & Healthcare",
    icon: "LS",
    description: "Pharmaceutical, biotech, and healthcare organizations improving patient outcomes",
  },
  {
    id: "ind_media-sports-ent",
    name: "Media, Sports & Entertainment",
    icon: "ME",
    description: "Media companies, sports organizations, and entertainment industry",
  },
  {
    id: "ind_mill-products",
    name: "Mill Products",
    icon: "MP",
    description: "Paper, pulp, and forest products manufacturing",
  },
  {
    id: "ind_mining",
    name: "Mining",
    icon: "MN",
    description: "Mining operations, mineral extraction, and resource management",
  },
  {
    id: "ind_oil-gas-energy",
    name: "Oil, Gas & Energy",
    icon: "OG",
    description: "Energy companies, oil & gas operations, and renewable energy",
  },
  {
    id: "ind_prof-services",
    name: "Professional Services",
    icon: "PS",
    description: "Consulting, legal, accounting, and professional service organizations",
  },
]

const seedValueChains = (): ValueChain[] => [
  {
    id: "vc_s2p",
    key: "S2P",
    name: "Source to Pay",
    description: "End-to-end procurement process from sourcing to payment",
  },
  { id: "vc_fin", key: "FIN", name: "Finance", description: "Financial planning, reporting, and management processes" },
  {
    id: "vc_a2d",
    key: "A2D",
    name: "Acquire to Decommission",
    description: "Asset lifecycle management from acquisition to disposal",
  },
  {
    id: "vc_i2m",
    key: "I2M",
    name: "Idea to Market",
    description: "Product development from concept to market launch",
  },
  {
    id: "vc_r2r",
    key: "R2R",
    name: "Recruit to Retire",
    description: "Human resources processes from hiring to retirement",
  },
  {
    id: "vc_l2c",
    key: "L2C",
    name: "Lead to Cash",
    description: "Sales process from lead generation to cash collection",
  },
  { id: "vc_p2f", key: "P2F", name: "Plan to Fulfill", description: "Supply chain planning and fulfillment processes" },
  {
    id: "vc_gov",
    key: "GOV",
    name: "Governance",
    description: "Risk management, compliance, and governance processes",
  },
]

const seedCapabilities = (): Capability[] => [
  { id: "cap-1", name: "Customer Management", processKeys: ["L2C"] },
  { id: "cap-2", name: "Financial Planning", processKeys: ["FIN"] },
  { id: "cap-3", name: "Supply Chain", processKeys: ["S2P", "P2F"] },
  { id: "cap-4", name: "Product Development", processKeys: ["I2M"] },
  { id: "cap-5", name: "Human Resources", processKeys: ["R2R"] },
  { id: "cap-6", name: "Asset Management", processKeys: ["A2D"] },
  { id: "cap-7", name: "Risk Management", processKeys: ["GOV"] },
  { id: "cap-8", name: "Data Analytics", processKeys: ["FIN", "L2C", "GOV"] },
  { id: "cap-9", name: "Process Automation", processKeys: ["S2P", "FIN", "P2F"] },
  { id: "cap-10", name: "Customer Experience", processKeys: ["L2C"] },
  { id: "cap-11", name: "Compliance Management", processKeys: ["GOV", "FIN"] },
  { id: "cap-12", name: "Innovation Management", processKeys: ["I2M"] },
]

export const useICStore = create<ICState>()(
  devtools(
    (set, get) => ({
      kpis: [],
      painPoints: [],
      initiatives: [],
      principles: [],
      interviews: [],
      coverage: {
        target: 20,
        completed: 0,
        unitsCovered: [],
        areasCovered: [],
      },
      readiness: 0,
      interviewReadiness: 0,
      surveys: [],
      surveyResponses: [],
      surveyAnalytics: {},
      activeSurvey: null,
      northStarFragments: [],
      industries: [],
      valueChains: [],
      capabilities: [],
      designInputs: [],
      designModels: [],
      activeDesignInput: null,
      galleryRegistry: seedGalleryData,
      compareItems: [],

      getIndustryStats: (industryId: string) => {
        const state = get()
        const kpiCount = state.kpis.filter((kpi) => kpi.industry === industryId).length
        const painPointCount = state.painPoints.filter((pp) => pp.industry === industryId).length
        const initiativeCount = state.initiatives.filter((init) => init.industry === industryId).length
        const referenceCount = state.galleryRegistry.references.filter((ref) =>
          ref.tags?.some((tag) => tag.toLowerCase().includes(industryId.replace("ind_", "").replace("-", " "))),
        ).length

        return {
          kpis: kpiCount || Math.floor(Math.random() * 30) + 15, // Fallback to random if no data
          painPoints: painPointCount || Math.floor(Math.random() * 25) + 10,
          initiatives: initiativeCount || Math.floor(Math.random() * 20) + 8,
          references: referenceCount || Math.floor(Math.random() * 15) + 5,
        }
      },

      getValueChainsByIndustry: (industryId: string) => {
        const state = get()
        // Return all value chains for now, could be filtered by industry relevance later
        return state.valueChains
      },

      getIndustriesWithStats: () => {
        const state = get()
        return state.industries.map((industry) => ({
          ...industry,
          stats: get().getIndustryStats(industry.id),
        }))
      },

      runAgent: (industry: string) => {
        const seeded = get().kpis.length === 0 ? sampleKPIs(industry) : []
        const seededPP = get().painPoints.length === 0 ? samplePP(industry) : []
        const seededInit = get().initiatives.length === 0 ? sampleInits(industry) : []
        const seededInterviews = get().interviews.length === 0 ? sampleInterviews() : []
        const seededSurvey = get().surveys.length === 0 ? [sampleSurvey()] : []
        const seededFragments = get().northStarFragments.length === 0 ? sampleNorthStarFragments() : []

        const seededIndustries = get().industries.length === 0 ? seedIndustries() : []
        const seededValueChains = get().valueChains.length === 0 ? seedValueChains() : []
        const seededCapabilities = get().capabilities.length === 0 ? seedCapabilities() : []

        set((s) => ({
          kpis: [...s.kpis, ...seeded],
          painPoints: [...s.painPoints, ...seededPP],
          initiatives: [...s.initiatives, ...seededInit],
          interviews: [...s.interviews, ...seededInterviews],
          surveys: [...s.surveys, ...seededSurvey],
          northStarFragments: [...s.northStarFragments, ...seededFragments],
          industries: [...s.industries, ...seededIndustries],
          valueChains: [...s.valueChains, ...seededValueChains],
          capabilities: [...s.capabilities, ...seededCapabilities],
        }))
        get().recalcReadiness()
        get().recalcInterviewReadiness()
      },
      recalcReadiness: () => {
        const s = get()
        const mappedKpiRatio = s.kpis.length ? s.kpis.filter((k) => k.processes?.length).length / s.kpis.length : 0
        const fragmentsBonus = Math.min(s.northStarFragments.length / 20, 1) * 10
        const ok =
          mappedKpiRatio >= 0.7 && s.painPoints.length >= 8 && s.initiatives.length >= 3 && s.principles.length >= 4
        set({
          readiness: Math.round(
            mappedKpiRatio * 35 +
              (Math.min(s.painPoints.length, 12) / 12) * 25 +
              (Math.min(s.initiatives.length, 6) / 6) * 15 +
              (Math.min(s.principles.length, 6) / 6) * 15 +
              fragmentsBonus,
          ),
        })
      },
      addInterview: (interview) => {
        const newInterview: Interview = {
          ...interview,
          id: Date.now().toString(),
        }
        set((s) => ({
          interviews: [...s.interviews, newInterview],
        }))
        get().recalcInterviewReadiness()
      },
      updateInterview: (id, updates) => {
        set((s) => ({
          interviews: s.interviews.map((interview) => (interview.id === id ? { ...interview, ...updates } : interview)),
        }))
        get().recalcInterviewReadiness()
      },
      deleteInterview: (id) => {
        set((s) => ({
          interviews: s.interviews.filter((interview) => interview.id !== id),
        }))
        get().recalcInterviewReadiness()
      },
      recalcInterviewReadiness: () => {
        const s = get()
        const interviews = s.interviews
        const completed = interviews.length
        const target = s.coverage.target

        const unitsCovered = [...new Set(interviews.map((i) => i.unit))]
        const areasCovered = [...new Set(interviews.map((i) => i.area))]

        const totalFragments = interviews.reduce((sum, i) => sum + i.fragments.length, 0)

        const initiativesLinked = Math.min(s.initiatives.length, Math.floor(totalFragments / 5))

        const traceabilityPercent =
          interviews.length > 0 ? Math.min(100, (totalFragments / (interviews.length * 3)) * 100) : 0

        const newCoverage: Coverage = {
          target,
          completed,
          unitsCovered: unitsCovered,
          areasCovered: areasCovered,
        }

        const interviewReadiness = Math.min(
          100,
          Math.round(
            (completed / target) * 30 +
              (unitsCovered.length / 5) * 25 +
              (areasCovered.length / 5) * 25 +
              (Math.min(totalFragments, 75) / 75) * 20,
          ),
        )

        set({
          coverage: newCoverage,
          interviewReadiness,
        })
      },
      createSurvey: (survey) => {
        const id = `survey-${Date.now()}`
        const now = new Date().toISOString()
        const newSurvey: Survey = {
          ...survey,
          id,
          createdAt: now,
          updatedAt: now,
        }
        set((s) => ({
          surveys: [...s.surveys, newSurvey],
          activeSurvey: newSurvey,
        }))
        return id
      },
      updateSurvey: (id, updates) => {
        const now = new Date().toISOString()
        set((s) => ({
          surveys: s.surveys.map((survey) => (survey.id === id ? { ...survey, ...updates, updatedAt: now } : survey)),
          activeSurvey: s.activeSurvey?.id === id ? { ...s.activeSurvey, ...updates, updatedAt: now } : s.activeSurvey,
        }))
      },
      deleteSurvey: (id) => {
        set((s) => ({
          surveys: s.surveys.filter((survey) => survey.id !== id),
          surveyResponses: s.surveyResponses.filter((response) => response.surveyId !== id),
          activeSurvey: s.activeSurvey?.id === id ? null : s.activeSurvey,
        }))
        const { [id]: removed, ...remainingAnalytics } = get().surveyAnalytics
        set({ surveyAnalytics: remainingAnalytics })
      },
      setActiveSurvey: (survey) => {
        set({ activeSurvey: survey })
      },
      addSurveyResponse: (response) => {
        const newResponse: SurveyResponse = {
          ...response,
          id: `response-${Date.now()}`,
        }
        set((s) => ({
          surveyResponses: [...s.surveyResponses, newResponse],
        }))
      },
      updateSurveyAnalytics: (surveyId, analytics) => {
        set((s) => ({
          surveyAnalytics: {
            ...s.surveyAnalytics,
            [surveyId]: {
              ...s.surveyAnalytics[surveyId],
              ...analytics,
              surveyId,
            },
          },
        }))
      },
      getSurveyById: (id) => {
        return get().surveys.find((survey) => survey.id === id)
      },
      getResponsesBySurveyId: (surveyId) => {
        return get().surveyResponses.filter((response) => response.surveyId === surveyId)
      },
      addFragment: (fragment) => {
        const now = new Date().toISOString()
        const id = `nsf-${Date.now()}`
        const newFragment: NorthStarFragment = {
          ...fragment,
          id,
          createdAt: now,
          updatedAt: now,
        }
        set((s) => ({
          northStarFragments: [...s.northStarFragments, newFragment],
        }))
        get().recalcReadiness()
        return id
      },
      updateFragment: (id, updates) => {
        const now = new Date().toISOString()
        set((s) => ({
          northStarFragments: s.northStarFragments.map((fragment) =>
            fragment.id === id ? { ...fragment, ...updates, updatedAt: now } : fragment,
          ),
        }))
        get().recalcReadiness()
      },
      removeFragment: (id) => {
        set((s) => ({
          northStarFragments: s.northStarFragments.filter((fragment) => fragment.id !== id),
        }))
        get().recalcReadiness()
      },
      bulkImport: (fragments) => {
        const now = new Date().toISOString()
        const newFragments: NorthStarFragment[] = fragments.map((fragment, index) => ({
          ...fragment,
          id: `nsf-import-${Date.now()}-${index}`,
          createdAt: now,
          updatedAt: now,
        }))
        set((s) => ({
          northStarFragments: [...s.northStarFragments, ...newFragments],
        }))
        get().recalcReadiness()
      },
      clusterFragments: async (lens) => {
        const fragments = lens ? get().northStarFragments.filter((f) => f.lens === lens) : get().northStarFragments

        const clusters: Array<{ title: string; fragmentIds: string[] }> = []
        const processed = new Set<string>()

        fragments.forEach((fragment) => {
          if (processed.has(fragment.id)) return

          const similar = fragments.filter(
            (f) => !processed.has(f.id) && f.title.toLowerCase().includes(fragment.title.toLowerCase().split(" ")[0]),
          )

          if (similar.length > 1) {
            clusters.push({
              title: `${fragment.title.split(" ")[0]} Cluster`,
              fragmentIds: similar.map((f) => f.id),
            })
            similar.forEach((f) => processed.add(f.id))
          }
        })

        return { clusters }
      },
      mergeFragments: (fragmentIds, newTitle) => {
        const fragments = get().northStarFragments.filter((f) => fragmentIds.includes(f.id))
        if (fragments.length < 2) return

        const mergedFragment: NorthStarFragment = {
          ...fragments[0],
          id: `nsf-merged-${Date.now()}`,
          title: newTitle,
          priorities: [...new Set(fragments.flatMap((f) => f.priorities || []))],
          goals: [...new Set(fragments.flatMap((f) => f.goals || []))],
          valueDrivers: [...new Set(fragments.flatMap((f) => f.valueDrivers || []))],
          capabilities: [...new Set(fragments.flatMap((f) => f.capabilities || []))],
          initiatives: [...new Set(fragments.flatMap((f) => f.initiatives || []))],
          kpiIds: [...new Set(fragments.flatMap((f) => f.kpiIds || []))],
          processIds: [...new Set(fragments.flatMap((f) => f.processIds || []))],
          impact: Math.max(...fragments.map((f) => f.impact || 0)),
          effort: Math.round(fragments.reduce((sum, f) => sum + (f.effort || 0), 0) / fragments.length),
          confidence: Math.round(fragments.reduce((sum, f) => sum + (f.confidence || 0), 0) / fragments.length),
          updatedAt: new Date().toISOString(),
        }

        set((s) => ({
          northStarFragments: [...s.northStarFragments.filter((f) => !fragmentIds.includes(f.id)), mergedFragment],
        }))
        get().recalcReadiness()
      },
      getFragmentsByLens: (lens) => {
        return get().northStarFragments.filter((f) => f.lens === lens)
      },
      getBoardCompleteness: () => {
        const fragments = get().northStarFragments
        if (fragments.length === 0) return 0

        const totalFragments = fragments.length
        const withLinks = fragments.filter(
          (f) => (f.kpiIds && f.kpiIds.length > 0) || (f.processIds && f.processIds.length > 0),
        ).length
        const withScoring = fragments.filter((f) => f.impact && f.effort && f.horizon).length

        return Math.round(
          (totalFragments / 20) * 40 + (withLinks / totalFragments) * 35 + (withScoring / totalFragments) * 25,
        )
      },
      seedCatalog: ({ industries, valueChains, capabilities }) => {
        set((s) => ({
          industries: [...s.industries, ...industries],
          valueChains: [...s.valueChains, ...valueChains],
          capabilities: [...s.capabilities, ...capabilities],
        }))
      },
      createDesignInput: (payload) => {
        const now = new Date().toISOString()
        const id = `input-${Date.now()}`
        const newInput: DesignInput = {
          ...payload,
          id,
          createdAt: now,
          updatedAt: now,
        }
        set((s) => ({
          designInputs: [...s.designInputs, newInput],
          activeDesignInput: newInput,
        }))
        return id
      },
      updateDesignInput: (id, partial) => {
        const now = new Date().toISOString()
        set((s) => ({
          designInputs: s.designInputs.map((input) =>
            input.id === id ? { ...input, ...partial, updatedAt: now } : input,
          ),
          activeDesignInput:
            s.activeDesignInput?.id === id
              ? { ...s.activeDesignInput, ...partial, updatedAt: now }
              : s.activeDesignInput,
        }))
      },
      mapEvidence: ({ inputId, bucket, ids }) => {
        const updates: Partial<DesignInput> = {}

        switch (bucket) {
          case "kpis":
            updates.kpiIds = [...(get().designInputs.find((i) => i.id === inputId)?.kpiIds || []), ...ids]
            break
          case "painPoints":
            updates.painPointIds = [...(get().designInputs.find((i) => i.id === inputId)?.painPointIds || []), ...ids]
            break
          case "interviews":
            updates.interviewIds = [...(get().designInputs.find((i) => i.id === inputId)?.interviewIds || []), ...ids]
            break
          case "surveys":
            updates.surveyIds = [...(get().designInputs.find((i) => i.id === inputId)?.surveyIds || []), ...ids]
            break
          case "fragments":
            updates.fragmentIds = [...(get().designInputs.find((i) => i.id === inputId)?.fragmentIds || []), ...ids]
            break
          case "initiatives":
            updates.initiativeIds = [...(get().designInputs.find((i) => i.id === inputId)?.initiativeIds || []), ...ids]
            break
        }

        get().updateDesignInput(inputId, updates)
      },
      computeHeatmap: (inputId) => {
        const input = get().designInputs.find((i) => i.id === inputId)
        if (!input) return []

        const { kpiIds = [], painPointIds = [], interviewIds = [], fragmentIds = [] } = input
        const { kpis, painPoints, interviews, northStarFragments, valueChains, capabilities } = get()

        const heatmapCells: HeatmapCell[] = []

        valueChains.forEach((process) => {
          capabilities.forEach((capability) => {
            if (!capability.processKeys?.includes(process.key)) return

            const relevantKpis = kpis.filter((k) => kpiIds.includes(k.id) && k.processKeys?.includes(process.key))
            const kpiGap =
              relevantKpis.length > 0
                ? (relevantKpis.reduce((sum, k) => {
                    const gap = k.target && k.current ? Math.abs(k.target - k.current) / k.target : 0.5
                    return sum + gap
                  }, 0) /
                    relevantKpis.length) *
                  100
                : 0

            const relevantPains = painPoints.filter(
              (p) => painPointIds.includes(p.id) && p.processKeys?.includes(process.key),
            )
            const painSeverity =
              relevantPains.length > 0
                ? (relevantPains.reduce((sum, p) => {
                    const severity = p.severity || (p.impact === "high" ? 5 : p.impact === "medium" ? 3 : 1)
                    return sum + severity
                  }, 0) /
                    relevantPains.length) *
                  20
                : 0

            const relevantInterviews = interviews.filter((i) => interviewIds.includes(i.id))
            const interviewMentions =
              relevantInterviews.reduce((sum, i) => {
                const mentions = i.fragments.filter((f) => f.mappings.capabilityId === capability.id).length
                return sum + mentions
              }, 0) * 10

            const relevantFragments = northStarFragments.filter(
              (f) => fragmentIds.includes(f.id) && f.processKeys?.includes(process.key),
            )
            const fragmentImpact =
              relevantFragments.length > 0
                ? (relevantFragments.reduce((sum, f) => sum + (f.impact || 0), 0) / relevantFragments.length) * 20
                : 0

            const score = Math.min(
              100,
              Math.round(kpiGap * 0.4 + painSeverity * 0.3 + interviewMentions * 0.15 + fragmentImpact * 0.15),
            )

            if (score > 0) {
              heatmapCells.push({
                processKey: process.key,
                capabilityId: capability.id,
                score,
                contributors: { kpiGap, painSeverity, interviewMentions, fragmentImpact },
              })
            }
          })
        })

        return heatmapCells
      },
      generateDesignModel: (inputId) => {
        const input = get().designInputs.find((i) => i.id === inputId)
        if (!input) throw new Error("Design input not found")

        const modelId = `model-${Date.now()}`
        const model: DesignModel = {
          id: modelId,
          name: `Architecture Model ${new Date().toLocaleDateString()}`,
          inputId,
          views: [
            {
              kind: "C4",
              code: `// C4 System Context\nsystem "Business System" {\n  // Generated from design inputs\n}`,
              status: "clean",
            },
            {
              kind: "ValueFlow",
              code: `// Value Flow Diagram\nflow "End-to-End Process" {\n  // Generated from value chains\n}`,
              status: "clean",
            },
            {
              kind: "DataFlow",
              code: `// Data Flow Diagram\ndata "Information Flow" {\n  // Generated from capabilities\n}`,
              status: "clean",
            },
            {
              kind: "Sequence",
              code: `// Sequence Diagram\nsequence "Process Flow" {\n  // Generated from processes\n}`,
              status: "clean",
            },
          ],
          tradeoffs: [
            { dimension: "Latency", option: "Low", score: 8, rationale: "Optimized for performance" },
            { dimension: "Scale", option: "High", score: 7, rationale: "Designed for growth" },
            { dimension: "Cost", option: "Medium", score: 6, rationale: "Balanced approach" },
            { dimension: "Portability", option: "High", score: 9, rationale: "Cloud-native design" },
            { dimension: "Reliability", option: "High", score: 8, rationale: "Fault-tolerant architecture" },
          ],
          sync: {
            docs: "out-of-sync",
            lastRun: null,
          },
        }

        set((s) => ({
          designModels: [...s.designModels, model],
        }))

        return model
      },
      syncDocs: (modelId) => {
        const now = new Date().toISOString()
        set((s) => ({
          designModels: s.designModels.map((model) =>
            model.id === modelId
              ? {
                  ...model,
                  views: model.views.map((view) => ({ ...view, status: "clean" as const })),
                  sync: { docs: "in-sync" as const, lastRun: now },
                }
              : model,
          ),
        }))
      },
      setActiveDesignInput: (input) => {
        set({ activeDesignInput: input })
      },
      seedGallery: (registry: GalleryRegistry) => {
        set({ galleryRegistry: registry })
      },

      galleryAddToDesign: (
        itemType: "reference" | "pattern" | "accelerator" | "demo",
        itemId: string,
        context?: any,
      ) => {
        const { galleryRegistry, activeDesignInput } = get()

        // Find the item in the gallery
        let item: any = null
        switch (itemType) {
          case "reference":
            item = galleryRegistry.references.find((r) => r.id === itemId)
            break
          case "pattern":
            item = galleryRegistry.patterns.find((p) => p.id === itemId)
            break
          case "accelerator":
            item = galleryRegistry.accelerators.find((a) => a.id === itemId)
            break
          case "demo":
            item = galleryRegistry.demos.find((d) => d.id === itemId)
            break
        }

        if (!item) return

        // Create or update design input with the item's context
        if (activeDesignInput) {
          const updates: Partial<DesignInput> = {}

          if (item.industryIds?.length) {
            // Use first industry if available
            updates.industryId = item.industryIds[0]
          }

          if (item.processKeys?.length) {
            // Use first process if available
            updates.processKey = item.processKeys[0]
          }

          if (item.capabilityIds?.length) {
            updates.capabilityIds = [...new Set([...activeDesignInput.capabilityIds, ...item.capabilityIds])]
          }

          get().updateDesignInput(activeDesignInput.id, updates)
        } else {
          // Create new design input
          const newInput: Omit<DesignInput, "id" | "createdAt" | "updatedAt"> = {
            industryId: item.industryIds?.[0] || null,
            processKey: item.processKeys?.[0] || null,
            lob: null,
            capabilityIds: item.capabilityIds || [],
            kpiIds: [],
            painPointIds: [],
            interviewIds: [],
            surveyIds: [],
            fragmentIds: [],
            initiativeIds: [],
          }

          const inputId = get().createDesignInput(newInput)
          const createdInput = get().designInputs.find((di) => di.id === inputId)
          if (createdInput) {
            get().setActiveDesignInput(createdInput)
          }
        }
      },

      galleryCompareToggle: (itemType: "reference" | "pattern" | "accelerator" | "demo", id: string) => {
        set((state) => {
          const existingIndex = state.compareItems.findIndex((item) => item.type === itemType && item.id === id)

          if (existingIndex >= 0) {
            // Remove from compare
            return {
              compareItems: state.compareItems.filter((_, index) => index !== existingIndex),
            }
          } else if (state.compareItems.length < 3) {
            // Add to compare (max 3 items)
            return {
              compareItems: [...state.compareItems, { type: itemType, id }],
            }
          }

          return state
        })
      },

      getGalleryAgentView: () => {
        const state = get()
        return {
          meta: {
            timestamp: new Date().toISOString(),
            version: "1.0.0",
            totalItems: {
              industries: state.industries.length,
              valueChains: state.valueChains.length,
              capabilities: state.capabilities.length,
              references: state.galleryRegistry.references.length,
              patterns: state.galleryRegistry.patterns.length,
              accelerators: state.galleryRegistry.accelerators.length,
              demos: state.galleryRegistry.demos.length,
            },
          },
          catalog: {
            industries: state.industries.map((i) => ({
              id: i.id,
              name: i.name,
              description: i.description,
              valueChains: i.valueChainKeys,
              capabilities: i.capabilityIds,
            })),
            valueChains: state.valueChains.map((v) => ({
              key: v.key,
              name: v.name,
              description: v.description,
              capabilities: v.capabilityIds,
            })),
            capabilities: state.capabilities.map((c) => ({
              id: c.id,
              name: c.name,
              level: c.level,
              parent: c.parentId,
              processes: c.processKeys,
            })),
          },
          gallery: {
            references: state.galleryRegistry.references.map((r) => ({
              id: r.id,
              title: r.title,
              summary: r.summary,
              industries: r.industryIds,
              processes: r.processKeys,
              capabilities: r.capabilityIds,
              views: r.views.map((v) => v.kind),
              cloud: r.cloud,
              status: r.status,
              tags: r.tags,
            })),
            patterns: state.galleryRegistry.patterns.map((p) => ({
              id: p.id,
              title: p.title,
              kind: p.kind,
              summary: p.summary,
              industries: p.industryIds,
              processes: p.processKeys,
              capabilities: p.capabilityIds,
              tags: p.tags,
            })),
            accelerators: state.galleryRegistry.accelerators.map((a) => ({
              id: a.id,
              title: a.title,
              type: a.assetType,
              version: a.version,
              license: a.license,
              industries: a.industryIds,
              processes: a.processKeys,
              capabilities: a.capabilityIds,
              tags: a.tags,
            })),
            demos: state.galleryRegistry.demos.map((d) => ({
              id: d.id,
              title: d.title,
              duration: d.durationSec,
              scenario: d.scenario,
              industries: d.industryIds,
              processes: d.processKeys,
              capabilities: d.capabilityIds,
              tags: d.tags,
            })),
          },
        }
      },
    }),
    { name: "ic-store" },
  ),
)
