"use client"

import type React from "react"

import { useState } from "react"
import { useICStore } from "@/lib/store"
import {
  Plus,
  Sparkles,
  Upload,
  Download,
  HelpCircle,
  Grid,
  List,
  X,
  Save,
  Link,
  FileText,
  Trash2,
  Settings,
  BarChart3,
  Mic,
  Users,
  Target,
  TrendingUp,
  Share,
  BookmarkIcon,
  ChevronDown,
} from "lucide-react"

const mockInitiatives = [
  {
    id: "1",
    title: "Cloud Migration",
    description: "Migrate legacy systems to the cloud for scalability and cost efficiency.",
    speed: "fast",
    timeline: "Q4 2024",
  },
  {
    id: "2",
    title: "Data Analytics Platform",
    description: "Implement a centralized data analytics platform to improve decision-making.",
    speed: "core",
    timeline: "Q1 2025",
  },
  {
    id: "3",
    title: "Customer Experience Enhancement",
    description: "Enhance customer experience through personalized interactions and improved support.",
    speed: "fast",
    timeline: "Q2 2025",
  },
]

interface TwoSpeedContentProps {
  activeSubTab: string
}

const PAIN_POINTS_DATA = [
  {
    id: "pp_001",
    title: "Manual Invoice Processing",
    description: "Time-consuming manual invoice processing leading to delays and errors",
    industries: ["manufacturing", "retail", "healthcare"],
    process: "s2p",
    priority: "High",
  },
  {
    id: "pp_002",
    title: "Supplier Performance Issues",
    description: "Inconsistent supplier quality and delivery performance",
    industries: ["manufacturing", "automotive", "aerospace-defense"],
    process: "s2p",
    priority: "Medium",
  },
  {
    id: "pp_003",
    title: "Contract Management Inefficiencies",
    description: "Poor contract lifecycle management and compliance tracking",
    industries: ["manufacturing", "healthcare", "financial-services"],
    process: "s2p",
    priority: "Medium",
  },
  {
    id: "pp_004",
    title: "Lead Generation Challenges",
    description: "Difficulty in identifying and qualifying potential customers",
    industries: ["technology", "financial-services", "retail"],
    process: "l2c",
    priority: "High",
  },
  {
    id: "pp_005",
    title: "Sales Process Inefficiencies",
    description: "Lengthy sales cycles and poor conversion rates",
    industries: ["technology", "manufacturing", "healthcare"],
    process: "l2c",
    priority: "High",
  },
  {
    id: "pp_006",
    title: "Customer Onboarding Delays",
    description: "Slow and complex customer onboarding processes",
    industries: ["financial-services", "technology", "healthcare"],
    process: "l2c",
    priority: "Medium",
  },
  {
    id: "pp_007",
    title: "Production Line Downtime",
    description: "Unplanned equipment failures causing production delays",
    industries: ["manufacturing", "automotive", "aerospace-defense"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_008",
    title: "Quality Control Issues",
    description: "Inconsistent product quality leading to customer complaints",
    industries: ["manufacturing", "automotive", "healthcare"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_009",
    title: "Manual Production Planning",
    description: "Inefficient manual planning processes affecting productivity",
    industries: ["manufacturing", "automotive", "retail"],
    process: "p2f",
    priority: "Medium",
  },
  {
    id: "pp_010",
    title: "Asset Tracking Difficulties",
    description: "Poor visibility into asset location and utilization",
    industries: ["manufacturing", "healthcare", "logistics"],
    process: "a2d",
    priority: "Medium",
  },
  {
    id: "pp_011",
    title: "Maintenance Scheduling Issues",
    description: "Reactive maintenance leading to unexpected downtime",
    industries: ["manufacturing", "utilities", "transportation"],
    process: "a2d",
    priority: "High",
  },
  {
    id: "pp_012",
    title: "Asset Performance Monitoring",
    description: "Limited real-time monitoring of asset performance",
    industries: ["manufacturing", "utilities", "oil-gas"],
    process: "a2d",
    priority: "Medium",
  },
  {
    id: "pp_013",
    title: "Manual Financial Reporting",
    description: "Time-intensive manual financial reporting processes",
    industries: ["financial-services", "manufacturing", "healthcare"],
    process: "r2r",
    priority: "High",
  },
  {
    id: "pp_014",
    title: "Month-End Close Delays",
    description: "Extended month-end closing processes affecting decision-making",
    industries: ["financial-services", "manufacturing", "retail"],
    process: "r2r",
    priority: "Medium",
  },
  {
    id: "pp_015",
    title: "Compliance Reporting Challenges",
    description: "Difficulty meeting regulatory reporting requirements",
    industries: ["financial-services", "healthcare", "insurance"],
    process: "r2r",
    priority: "High",
  },
  {
    id: "pp_016",
    title: "Inventory Management Issues",
    description: "Poor inventory visibility leading to stockouts or overstock",
    industries: ["retail", "manufacturing", "healthcare"],
    process: "i2m",
    priority: "High",
  },
  {
    id: "pp_017",
    title: "Demand Forecasting Inaccuracy",
    description: "Inaccurate demand predictions affecting inventory levels",
    industries: ["retail", "manufacturing", "automotive"],
    process: "i2m",
    priority: "Medium",
  },
  {
    id: "pp_018",
    title: "Warehouse Optimization",
    description: "Inefficient warehouse layout and picking processes",
    industries: ["retail", "logistics", "manufacturing"],
    process: "i2m",
    priority: "Medium",
  },
  {
    id: "pp_019",
    title: "Budget Planning Inefficiencies",
    description: "Time-consuming and inaccurate budget planning processes",
    industries: ["financial-services", "manufacturing", "healthcare"],
    process: "fin",
    priority: "Medium",
  },
  {
    id: "pp_020",
    title: "Cash Flow Management",
    description: "Poor visibility into cash flow and working capital",
    industries: ["financial-services", "manufacturing", "retail"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_021",
    title: "Risk Assessment Challenges",
    description: "Inadequate risk identification and mitigation processes",
    industries: ["financial-services", "insurance", "healthcare"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_022",
    title: "Compliance Monitoring",
    description: "Difficulty monitoring and ensuring regulatory compliance",
    industries: ["financial-services", "healthcare", "insurance"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_023",
    title: "Audit Trail Management",
    description: "Poor audit trail visibility and documentation",
    industries: ["financial-services", "healthcare", "manufacturing"],
    process: "gov",
    priority: "Medium",
  },
  // Utilities Industry Pain Points
  {
    id: "pp_024",
    title: "Aging Infrastructure and Grid Modernization",
    description: "Many utility assets including power generation facilities and transmission lines are rapidly aging and insufficient to meet current and future energy demands. Modernizing legacy systems to integrate smart grids and handle increasing demands is complicated by supply chain disruptions for critical components.",
    industries: ["Utilities"],
    process: "a2d",
    priority: "High",
  },
  {
    id: "pp_025",
    title: "Extreme Weather and Climate Resilience",
    description: "The frequency and intensity of extreme weather events are increasing, leading to substantial costs due to infrastructure damage, service disruptions, and increased reactive maintenance. Building climate-resilient infrastructure is a major financial and operational burden.",
    industries: ["Utilities"],
    process: "a2d",
    priority: "High",
  },
  {
    id: "pp_026",
    title: "Regulatory Complexity and Rate Case Delays",
    description: "The process for obtaining rate case approvals to recover capital investment costs is often slow and bureaucratic, lagging behind market dynamics. This hinders utilities' ability to invest in necessary upgrades and innovations, impacting financial health and capacity to meet evolving demands.",
    industries: ["Utilities"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_027",
    title: "Cybersecurity and Critical Infrastructure Protection",
    description: "Utilities face increasing cybersecurity threats targeting critical infrastructure, with potential for widespread service disruptions and national security implications. The convergence of IT and OT systems creates new vulnerabilities that require specialized security measures and significant investment.",
    industries: ["Utilities"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_028",
    title: "Renewable Energy Integration Challenges",
    description: "Integrating increasing amounts of variable renewable energy sources creates grid stability and management challenges. The intermittent nature of solar and wind power requires new grid management approaches, energy storage solutions, and forecasting capabilities.",
    industries: ["Utilities"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_029",
    title: "Workforce Aging and Skills Gap",
    description: "The utility workforce is aging with many experienced workers approaching retirement, creating knowledge transfer challenges. Simultaneously, the industry needs new skills for digital technologies, renewable energy, and smart grid operations that are in short supply.",
    industries: ["Utilities"],
    process: "r2r",
    priority: "High",
  },
  {
    id: "pp_030",
    title: "Customer Expectations and Digital Transformation",
    description: "Customers increasingly expect digital self-service options, real-time information, and personalized experiences similar to other industries. Utilities must invest in digital platforms, mobile apps, and customer engagement technologies while maintaining reliable core services.",
    industries: ["Utilities"],
    process: "l2c",
    priority: "Medium",
  },
  {
    id: "pp_031",
    title: "Energy Storage and Grid Stability",
    description: "The need for large-scale energy storage to support renewable integration and grid stability presents technical and economic challenges. Battery storage costs, technology limitations, and integration complexities require significant investment and expertise.",
    industries: ["Utilities"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_032",
    title: "Distributed Energy Resources Management",
    description: "The proliferation of rooftop solar, electric vehicles, and other distributed energy resources creates new challenges for grid management, planning, and revenue models. Utilities must adapt to bidirectional power flows and prosumer customers.",
    industries: ["Utilities"],
    process: "p2f",
    priority: "Medium",
  },
  {
    id: "pp_033",
    title: "Financial Constraints and Investment Needs",
    description: "Utilities face enormous capital requirements for infrastructure modernization, renewable energy, and grid resilience while managing regulatory constraints on rate increases. Balancing investment needs with affordability concerns creates ongoing financial pressure.",
    industries: ["Utilities"],
    process: "fin",
    priority: "High",
  },
  // Telecommunications Industry Pain Points
  {
    id: "pp_034",
    title: "Privacy, Security, and Trust Challenges",
    description: "The rapid adoption of Generative AI in telecommunications introduces new complexities in data privacy and security. Customers demand greater transparency regarding AI usage, and cyberattacks are becoming more sophisticated, placing unprecedented pressure on telcos' trust credentials.",
    industries: ["Telecommunications"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_035",
    title: "Talent, Skills, and Culture Management",
    description: "Poor internal collaboration and missing skills are significant inhibitors to transformation. The prevalence of remote working exacerbates challenges in collaboration and upskilling, with employees anticipating major changes in HR functions.",
    industries: ["Telecommunications"],
    process: "r2r",
    priority: "High",
  },
  {
    id: "pp_036",
    title: "Ineffective Technology Transformation",
    description: "Despite high confidence in AI's potential, ensuring effective integration of emerging technologies like process automation, software-based networks, and AI remains challenging. Strategic choices regarding use case prioritization and performance measurement are crucial hurdles.",
    industries: ["Telecommunications"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_037",
    title: "Capital Allocation and Investment Optimization",
    description: "Telcos face immense pressure to invest heavily in new technologies like 5G and fiber optics while maintaining existing networks. The challenge lies in optimizing substantial capital expenditures to ensure adequate returns and prevent overinvestment.",
    industries: ["Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_038",
    title: "New Service Monetization Challenges",
    description: "As traditional revenue streams mature, telcos struggle to effectively monetize new offerings like IoT, enterprise solutions, and cloud services. This requires different pricing strategies, sales approaches, and operational models compared to established business.",
    industries: ["Telecommunications"],
    process: "l2c",
    priority: "High",
  },
  {
    id: "pp_039",
    title: "Intensifying Market Competition",
    description: "The telecommunications market faces heightened competition from new entrants, Over-The-Top (OTT) players, and hyperscale cloud providers. This puts significant pressure on pricing, customer retention, and market share for traditional telcos.",
    industries: ["Telecommunications"],
    process: "l2c",
    priority: "High",
  },
  {
    id: "pp_040",
    title: "Regulatory and Policy Uncertainty",
    description: "Telcos operate within a heavily regulated environment where shifts in regulations can profoundly impact operations and profitability. Areas include spectrum allocation, net neutrality, data privacy, and competition laws, creating uncertainty that deters investment.",
    industries: ["Telecommunications"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_041",
    title: "Value Chain Disruption",
    description: "Hyperscale cloud providers and satellite companies are emerging as significant threats. Telcos lag in R&D spending compared to network equipment providers, potentially limiting long-term innovation capabilities and market relevance.",
    industries: ["Telecommunications"],
    process: "p2f",
    priority: "High",
  },
  {
    id: "pp_042",
    title: "Regulatory Landscape Adaptation",
    description: "Industry leaders anticipate broadening regulatory issues including AI regulation, digital markets, and network supplier regulation. Established areas are evolving with new spectrum sharing rules and expanding pricing regulations driven by consumer protection policies.",
    industries: ["Telecommunications"],
    process: "gov",
    priority: "High",
  },
  {
    id: "pp_043",
    title: "Operating Model Optimization",
    description: "Asset-light strategies involving carving out tower, fiber, and data center assets are gaining traction, but opportunities to reconfigure operating models for greater value creation are often overlooked. Many executives believe more strategic operational restructuring is needed beyond cost elimination.",
    industries: ["Utilities"],
    process: "p2f",
    priority: "Medium",
  },
  // Additional Finance Pain Points
  {
    id: "pp_044",
    title: "Invoice Processing Delays",
    description: "Manual processing causing extended invoice processing times, impacting cash flow and vendor relationships.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Critical",
  },
  {
    id: "pp_045",
    title: "Extended Payment Cycles",
    description: "Long payment cycles straining vendor relationships and financial liquidity.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Critical",
  },
  {
    id: "pp_046",
    title: "Poor DSO Management",
    description: "High Days Sales Outstanding negatively impacting working capital.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_047",
    title: "Slow Month-End Close",
    description: "Extended financial closing periods delaying strategic reporting.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_048",
    title: "Budget Variance Issues",
    description: "Frequent budget variances indicating weak forecasting accuracy.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Medium",
  },
  {
    id: "pp_049",
    title: "Manual Financial Closing Process",
    description: "Financial closing involves many manual tasks that are time-consuming, error-prone, and lack real-time visibility into progress.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Critical",
  },
  {
    id: "pp_050",
    title: "Inter-Company Reconciliation Delays",
    description: "Manual IC reconciliations require extensive offline coordination and add pressure to tight month-end close schedules.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Critical",
  },
  {
    id: "pp_051",
    title: "Payment-Invoice Matching Inefficiency",
    description: "Difficulty matching customer payments to open AR invoices causes delays and high Days Sales Outstanding.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_052",
    title: "Asset Depreciation Visibility Gap",
    description: "Lack of understanding how depreciation logic works causes issues during financial closing.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Medium",
  },
  {
    id: "pp_053",
    title: "Cost Center Analysis Bottleneck",
    description: "Manual analysis of cost center reports is time-consuming and delays actionable insights.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_054",
    title: "Expense Report Processing Inefficiency",
    description: "Hotel expenses and receipts need manual re-keying and verification, causing errors and delays.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  {
    id: "pp_055",
    title: "Journal Entry Processing Delays",
    description: "Manual journal entry preparation and lack of mass upload capabilities delay period-end close.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "Critical",
  },
  {
    id: "pp_056",
    title: "Supply Chain Document Processing Gap",
    description: "Manual processing of freight documents and purchase orders causes delays and errors.",
    industries: ["Utilities", "Telecommunications"],
    process: "fin",
    priority: "High",
  },
  // Human Resources Pain Points
  {
    id: "pp_057",
    title: "Extreme Employee Turnover",
    description: "Excessive turnover rates significantly increasing recruitment and training costs.",
    industries: ["Utilities", "Telecommunications"],
    process: "r2r",
    priority: "Critical",
  },
  {
    id: "pp_058",
    title: "Extended Time-to-Fill Positions",
    description: "Slow recruitment process negatively affecting operational continuity.",
    industries: ["Utilities", "Telecommunications"],
    process: "r2r",
    priority: "Critical",
  },
  {
    id: "pp_059",
    title: "Slow Employee Onboarding",
    description: "Prolonged onboarding impacting new hire productivity.",
    industries: ["Utilities", "Telecommunications"],
    process: "r2r",
    priority: "High",
  },
  {
    id: "pp_060",
    title: "Payroll Processing Delays",
    description: "Delayed payroll processing causing employee dissatisfaction.",
    industries: ["Utilities", "Telecommunications"],
    process: "r2r",
    priority: "High",
  },
  // Operations Pain Points
  {
    id: "pp_061",
    title: "Poor Incident Response Time",
    description: "Slow response times impacting service level agreements and customer trust.",
    industries: ["Utilities", "Telecommunications"],
    process: "p2f",
    priority: "Critical",
  },
  {
    id: "pp_062",
    title: "Manual Resource Allocation",
    description: "Manual workforce scheduling causing staffing inefficiencies.",
    industries: ["Utilities", "Telecommunications"],
    process: "p2f",
    priority: "High",
  },
  // Procurement Pain Points
  {
    id: "pp_063",
    title: "Supplier Risk Management Gaps",
    description: "Limited capability in proactive supplier risk monitoring.",
    industries: ["Utilities", "Telecommunications"],
    process: "s2p",
    priority: "High",
  },
  // Technology Pain Points
  {
    id: "pp_064",
    title: "Limited AI and Automation Adoption",
    description: "Minimal use of AI capabilities limiting operational efficiency.",
    industries: ["Utilities", "Telecommunications"],
    process: "p2f",
    priority: "High",
  },
  // Customer Pain Points
  {
    id: "pp_065",
    title: "Customer Data Fragmentation",
    description: "Siloed customer data affecting relationship management and sales growth.",
    industries: ["Utilities", "Telecommunications"],
    process: "l2c",
    priority: "High",
  },
]

// Industries for the filter
const industries = [
  "All Industries",
  "High Technology",
  "Professional Services", 
  "Aerospace and Defense",
  "Agribusiness",
  "Automotive",
  "Banking",
  "Chemicals",
  "Consumer Products",
  "Construction",
  "Defense",
  "Education",
  "Energy",
  "Engineering and Construction",
  "Financial Services",
  "Food and Beverage",
  "Government",
  "Healthcare",
  "High Tech",
  "Hospitality",
  "Insurance",
  "Life Sciences",
  "Logistics",
  "Manufacturing",
  "Media and Entertainment",
  "Mining",
  "Oil and Gas",
  "Pharmaceuticals",
  "Public Sector",
  "Real Estate",
  "Retail",
  "Telecommunications",
  "Transportation",
  "Travel and Tourism",
  "Utilities"
]

const PROCESS_CONFIG = {
  s2p: {
    label: "Source to Pay",
    shortLabel: "S2P",
    color: "from-blue-500 to-blue-600",
    textColor: "text-blue-700",
    bgColor: "bg-blue-50",
  },
  l2c: {
    label: "Lead to Cash",
    shortLabel: "L2C",
    color: "from-green-500 to-green-600",
    textColor: "text-green-700",
    bgColor: "bg-green-50",
  },
  p2f: {
    label: "Plan to Fulfill",
    shortLabel: "P2F",
    color: "from-orange-500 to-orange-600",
    textColor: "text-orange-700",
    bgColor: "bg-orange-50",
  },
  a2d: {
    label: "Acquire to Dispose",
    shortLabel: "A2D",
    color: "from-purple-500 to-purple-600",
    textColor: "text-purple-700",
    bgColor: "bg-purple-50",
  },
  r2r: {
    label: "Record to Report",
    shortLabel: "R2R",
    color: "from-red-500 to-red-600",
    textColor: "text-red-700",
    bgColor: "bg-red-50",
  },
  i2m: {
    label: "Inventory to Move",
    shortLabel: "I2M",
    color: "from-teal-500 to-teal-600",
    textColor: "text-teal-700",
    bgColor: "bg-teal-50",
  },
  fin: {
    label: "Financial Management",
    shortLabel: "FIN",
    color: "from-indigo-500 to-indigo-600",
    textColor: "text-indigo-700",
    bgColor: "bg-indigo-50",
  },
  gov: {
    label: "Governance & Risk",
    shortLabel: "GOV",
    color: "from-gray-500 to-gray-600",
    textColor: "text-gray-700",
    bgColor: "bg-gray-50",
  },
}

export default function TwoSpeedContent({ activeSubTab }: { activeSubTab: string }) {
  const [requirementMode, setRequirementMode] = useState("surveys")
  const [surveyStep, setSurveyStep] = useState("design")
  const [boardView, setBoardView] = useState<"workshop" | "table">("workshop")
  const [selectedFragment, setSelectedFragment] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [aiAssistOpen, setAiAssistOpen] = useState(false)
  const [selectedFragments, setSelectedFragments] = useState<string[]>([])
  const [aiProcessing, setAiProcessing] = useState(false)
  const [selectedPriorities, setSelectedPriorities] = useState<{ [key: string]: string }>({})
  const [selectedPainPoints, setSelectedPainPoints] = useState<string[]>([])
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries")
  const [selectedProcess, setSelectedProcess] = useState("All Processes")
  const [bookmarkedTrends, setBookmarkedTrends] = useState<string[]>([])
  const [trendPriorities, setTrendPriorities] = useState<{ [key: string]: string }>({})

  const {
    painPoints,
    initiatives,
    interviews = [],
    coverage,
    northStarFragments = [],
    updateFragment,
    removeFragment,
    kpis = [],
  } = useICStore()
  const [setupExpanded, setSetupExpanded] = useState(false)
  const [surveyName, setSurveyName] = useState("Strategic Direction Survey")
  const [selectedAudience, setSelectedAudience] = useState<string[]>(["Stakeholders"])
  const [surveyQuestions, setSurveyQuestions] = useState<any[]>([])
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [accessCode, setAccessCode] = useState("STR2024")
  const [identityMode, setIdentityMode] = useState<"anonymous" | "email" | "employee">("email")
  const [throttleEnabled, setThrottleEnabled] = useState(true)

  const surveyStats = {
    sent: 156,
    opened: 142,
    started: 98,
    completed: 73,
    avgTimeSec: 680,
    completionRate: 74.5,
  }

  const questionTypes = [
    { id: "single", name: "Single choice", icon: "◯" },
    { id: "multi", name: "Multiple choice", icon: "☑" },
    { id: "likert", name: "Likert (1–5)", icon: "⭐" },
    { id: "matrix", name: "Matrix", icon: "⊞" },
    { id: "ranking", name: "Ranking", icon: "↕" },
    { id: "short", name: "Short text", icon: "Aa" },
    { id: "long", name: "Long text", icon: "¶" },
    { id: "number", name: "Number", icon: "#" },
    { id: "date", name: "Date", icon: "📅" },
    { id: "section", name: "Section break", icon: "—" },
    { id: "consent", name: "Consent", icon: "✓" },
  ]

  const surveySections = [
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
        {
          id: "q4",
          type: "ranking",
          title: "Rank these areas by improvement urgency",
          options: ["Technology", "Processes", "People", "Data"],
          tags: ["Process", "Priority"],
        },
      ],
    },
    {
      id: "outcomes",
      title: "Value & Outcomes",
      questions: [
        {
          id: "q5",
          type: "single",
          title: "What is your primary success metric?",
          options: ["Revenue Growth", "Cost Reduction", "Customer Satisfaction", "Market Share"],
          tags: ["KPI", "Value Driver"],
        },
        {
          id: "q6",
          type: "short",
          title: "What would constitute a quick win in your area?",
          tags: ["Value Driver", "Quick Win"],
        },
      ],
    },
  ]

  // Mock North Star fragments data
  const mockFragments = [
    {
      id: "f1",
      title: "Increase customer satisfaction by 25%",
      lens: "Outcomes" as const,
      lob: "Customer Success",
      impact: 5,
      effort: 3,
      horizon: "Next" as const,
      confidence: 85,
      vision: "Become the most customer-centric organization in our industry",
      priorities: ["Customer Experience", "Digital Transformation"],
      goals: ["Reduce response time", "Improve NPS score"],
      valueDrivers: ["Customer Satisfaction", "Revenue Growth"],
    },
    {
      id: "f2",
      title: "C-Suite alignment on digital strategy",
      lens: "Stakeholders" as const,
      lob: "Executive",
      impact: 4,
      effort: 2,
      horizon: "Now" as const,
      confidence: 90,
      vision: "United leadership driving transformation",
      priorities: ["Strategic Alignment", "Change Management"],
      goals: ["Executive buy-in", "Clear communication"],
      valueDrivers: ["Organizational Alignment", "Decision Speed"],
    },
    {
      id: "f3",
      title: "Automate manual reporting processes",
      lens: "Operations" as const,
      lob: "Finance",
      impact: 3,
      effort: 4,
      horizon: "Next" as const,
      confidence: 75,
      vision: "Streamlined operations with minimal manual intervention",
      priorities: ["Process Optimization", "Automation"],
      goals: ["Reduce manual work", "Improve accuracy"],
      valueDrivers: ["Cost Saving", "Productivity"],
    },
    {
      id: "f4",
      title: "Seamless omnichannel experience",
      lens: "Experiences" as const,
      lob: "Marketing",
      impact: 5,
      effort: 5,
      horizon: "Later" as const,
      confidence: 60,
      vision: "Consistent experience across all touchpoints",
      priorities: ["Customer Experience", "Digital Channels"],
      goals: ["Channel integration", "Consistent messaging"],
      valueDrivers: ["Customer Satisfaction", "Brand Consistency"],
    },
    {
      id: "f5",
      title: "Innovation drives our competitive advantage",
      lens: "Taglines" as const,
      lob: "R&D",
      impact: 4,
      effort: 3,
      horizon: "Now" as const,
      confidence: 80,
      vision: "Leading through continuous innovation",
      priorities: ["Innovation", "Market Leadership"],
      goals: ["Increase R&D investment", "Faster time-to-market"],
      valueDrivers: ["Competitive Advantage", "Market Share"],
    },
  ]

  const filterChips = [
    "Outcomes",
    "Stakeholders",
    "Operations",
    "Experiences",
    "Taglines",
    "Vision",
    "Strategic Priorities",
    "Goals",
    "Value Drivers",
    "Capabilities",
    "Initiatives",
  ]

  const lanes = ["Outcomes", "Stakeholders", "Operations", "Experiences", "Taglines"]

  const getFragmentsByLane = (lane: string) => {
    return northStarFragments.filter((f) => f.lens === lane)
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 4) return "var(--accent-teal)"
    if (impact >= 3) return "var(--accent-gold)"
    return "var(--brand-sky)"
  }

  const getHorizonColor = (horizon: string) => {
    switch (horizon) {
      case "Now":
        return "var(--accent-teal)"
      case "Next":
        return "var(--accent-gold)"
      case "Later":
        return "var(--brand-sky)"
      default:
        return "var(--neutral-400)"
    }
  }

  const selectedFragmentData = selectedFragment ? northStarFragments.find((f) => f.id === selectedFragment) : null

  const handleAiCluster = async () => {
    setAiProcessing(true)
    try {
      // Simulate AI clustering logic
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Group fragments by similarity (mock implementation)
      const clusters = new Map<string, string[]>()
      northStarFragments.forEach((fragment) => {
        const key = fragment.lens + "_" + (fragment.priorities?.[0] || "general")
        if (!clusters.has(key)) clusters.set(key, [])
        clusters.get(key)?.push(fragment.id)
      })

      console.log("[v0] AI Clustering completed:", clusters)
      alert("AI clustering completed! Similar fragments have been grouped.")
    } finally {
      setAiProcessing(false)
      setAiAssistOpen(false)
    }
  }

  const handleAiMerge = async () => {
    if (selectedFragments.length < 2) {
      alert("Please select at least 2 fragments to merge")
      return
    }

    setAiProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] AI Merge completed for fragments:", selectedFragments)
      alert(`Successfully merged ${selectedFragments.length} fragments into one.`)
      setSelectedFragments([])
    } finally {
      setAiProcessing(false)
      setAiAssistOpen(false)
    }
  }

  const handleGenerateStrategyMap = async () => {
    setAiProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))
      console.log("[v0] Strategy Map generation completed")
      alert("Strategy Map generated! Check the Summary tab for the new deliverable.")
    } finally {
      setAiProcessing(false)
      setAiAssistOpen(false)
    }
  }

  const handleSuggestQuickWins = async () => {
    setAiProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const quickWins = northStarFragments
        .filter((f) => f.impact >= 3 && f.effort <= 3 && f.horizon === "Now")
        .slice(0, 3)
      console.log("[v0] Quick wins suggested:", quickWins)
      alert(`Found ${quickWins.length} potential quick wins based on high impact, low effort criteria.`)
    } finally {
      setAiProcessing(false)
      setAiAssistOpen(false)
    }
  }

  const handleAutoTag = async () => {
    setAiProcessing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("[v0] Auto-tagging completed")
      alert("Auto-tagging completed! Fragments have been tagged with relevant KPIs and processes.")
    } finally {
      setAiProcessing(false)
      setAiAssistOpen(false)
    }
  }

  const renderInspectorPanel = () => {
    if (!selectedFragmentData) return null

    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="premium-card h-full rounded-none">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: "var(--neutral-100)" }}>
            <h3 className="font-semibold gradient-heading">Fragment Inspector</h3>
            <button
              onClick={() => setSelectedFragment(null)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={selectedFragmentData.title}
                  onChange={(e) => updateFragment(selectedFragmentData.id, { title: e.target.value })}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: "var(--neutral-200)" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Lens
                </label>
                <select
                  value={selectedFragmentData.lens}
                  onChange={(e) => updateFragment(selectedFragmentData.id, { lens: e.target.value as any })}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: "var(--neutral-200)" }}
                >
                  <option value="Outcomes">Outcomes</option>
                  <option value="Stakeholders">Stakeholders</option>
                  <option value="Operations">Operations</option>
                  <option value="Experiences">Experiences</option>
                  <option value="Tagline">Taglines</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Vision (one-liner)
                </label>
                <input
                  type="text"
                  value={selectedFragmentData.vision || ""}
                  onChange={(e) => updateFragment(selectedFragmentData.id, { vision: e.target.value })}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: "var(--neutral-200)" }}
                  placeholder="Enter vision statement..."
                />
              </div>
            </div>

            {/* Strategic Elements */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Strategic Elements
              </h4>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Strategic Priorities
                </label>
                <div className="space-y-2">
                  {(selectedFragmentData.priorities || []).map((priority, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={priority}
                        onChange={(e) => {
                          const newPriorities = [...(selectedFragmentData.priorities || [])]
                          newPriorities[idx] = e.target.value
                          updateFragment(selectedFragmentData.id, { priorities: newPriorities })
                        }}
                        className="flex-1 p-2 rounded border text-sm"
                        style={{ borderColor: "var(--neutral-200)" }}
                      />
                      <button
                        onClick={() => {
                          const newPriorities = (selectedFragmentData.priorities || []).filter((_, i) => i !== idx)
                          updateFragment(selectedFragmentData.id, { priorities: newPriorities })
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newPriorities = [...(selectedFragmentData.priorities || []), ""]
                      updateFragment(selectedFragmentData.id, { priorities: newPriorities })
                    }}
                    className="text-sm px-2 py-1 rounded transition-colors"
                    style={{ background: "var(--grad-primary)", color: "white" }}
                  >
                    <Plus className="w-3 h-3 inline mr-1" />
                    Add Priority
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Strategic Goals
                </label>
                <div className="space-y-2">
                  {(selectedFragmentData.goals || []).map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={goal}
                        onChange={(e) => {
                          const newGoals = [...(selectedFragmentData.goals || [])]
                          newGoals[idx] = e.target.value
                          updateFragment(selectedFragmentData.id, { goals: newGoals })
                        }}
                        className="flex-1 p-2 rounded border text-sm"
                        style={{ borderColor: "var(--neutral-200)" }}
                      />
                      <button
                        onClick={() => {
                          const newGoals = (selectedFragmentData.goals || []).filter((_, i) => i !== idx)
                          updateFragment(selectedFragmentData.id, { goals: newGoals })
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newGoals = [...(selectedFragmentData.goals || []), ""]
                      updateFragment(selectedFragmentData.id, { goals: newGoals })
                    }}
                    className="text-sm px-2 py-1 rounded transition-colors"
                    style={{ background: "var(--grad-primary)", color: "white" }}
                  >
                    <Plus className="w-3 h-3 inline mr-1" />
                    Add Goal
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Value Drivers
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    "Cost Saving",
                    "Time to Value",
                    "Productivity",
                    "Revenue Growth",
                    "Risk Mitigation",
                    "Customer Satisfaction",
                  ].map((driver) => (
                    <button
                      key={driver}
                      onClick={() => {
                        const current = selectedFragmentData.valueDrivers || []
                        const newDrivers = current.includes(driver)
                          ? current.filter((d) => d !== driver)
                          : [...current, driver]
                        updateFragment(selectedFragmentData.id, { valueDrivers: newDrivers })
                      }}
                      className="premium-chip text-xs transition-colors"
                      style={{
                        background: (selectedFragmentData.valueDrivers || []).includes(driver)
                          ? "var(--grad-primary)"
                          : "var(--surface-elev-1)",
                        color: (selectedFragmentData.valueDrivers || []).includes(driver)
                          ? "white"
                          : "var(--text-default)",
                        border: (selectedFragmentData.valueDrivers || []).includes(driver)
                          ? "none"
                          : "1px solid var(--neutral-200)",
                      }}
                    >
                      {driver}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Links
              </h4>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Linked KPIs
                </label>
                <div className="space-y-2">
                  {kpis
                    .filter((kpi) => (selectedFragmentData.kpiIds || []).includes(kpi.id))
                    .map((kpi) => (
                      <div
                        key={kpi.id}
                        className="flex items-center justify-between p-2 rounded"
                        style={{ background: "var(--surface-elev-1)" }}
                      >
                        <span className="text-sm" style={{ color: "var(--text-default)" }}>
                          {kpi.name}
                        </span>
                        <button
                          onClick={() => {
                            const newKpiIds = (selectedFragmentData.kpiIds || []).filter((id) => id !== kpi.id)
                            updateFragment(selectedFragmentData.id, { kpiIds: newKpiIds })
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const newKpiIds = [...(selectedFragmentData.kpiIds || []), e.target.value]
                        updateFragment(selectedFragmentData.id, { kpiIds: newKpiIds })
                        e.target.value = ""
                      }
                    }}
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  >
                    <option value="">Link to KPI...</option>
                    {kpis
                      .filter((kpi) => !(selectedFragmentData.kpiIds || []).includes(kpi.id))
                      .map((kpi) => (
                        <option key={kpi.id} value={kpi.id}>
                          {kpi.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Meta Information
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    LoB
                  </label>
                  <input
                    type="text"
                    value={selectedFragmentData.lob || ""}
                    onChange={(e) => updateFragment(selectedFragmentData.id, { lob: e.target.value })}
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    Region
                  </label>
                  <input
                    type="text"
                    value={selectedFragmentData.region || ""}
                    onChange={(e) => updateFragment(selectedFragmentData.id, { region: e.target.value })}
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
                  Source
                </label>
                <select
                  value={selectedFragmentData.source || "Workshop"}
                  onChange={(e) => updateFragment(selectedFragmentData.id, { source: e.target.value as any })}
                  className="w-full p-2 rounded border"
                  style={{ borderColor: "var(--neutral-200)" }}
                >
                  <option value="Interview">Interview</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Document">Document</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>
            </div>

            {/* Scoring */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Scoring
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    Impact (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selectedFragmentData.impact || 1}
                    onChange={(e) =>
                      updateFragment(selectedFragmentData.id, { impact: Number.parseInt(e.target.value) })
                    }
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    Effort (1-5)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={selectedFragmentData.effort || 1}
                    onChange={(e) =>
                      updateFragment(selectedFragmentData.id, { effort: Number.parseInt(e.target.value) })
                    }
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    Horizon
                  </label>
                  <select
                    value={selectedFragmentData.horizon || "Next"}
                    onChange={(e) => updateFragment(selectedFragmentData.id, { horizon: e.target.value as any })}
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  >
                    <option value="Now">Now</option>
                    <option value="Next">Next</option>
                    <option value="Later">Later</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block" style={{ color: "var(--text-default)" }}>
                    Confidence (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={selectedFragmentData.confidence || 50}
                    onChange={(e) =>
                      updateFragment(selectedFragmentData.id, { confidence: Number.parseInt(e.target.value) })
                    }
                    className="w-full p-2 rounded border text-sm"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Actions
              </h4>

              <div className="space-y-2">
                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{ background: "var(--grad-primary)", color: "white" }}
                >
                  <FileText className="w-4 h-4" />
                  Convert to Strategy Map Element
                </button>

                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    background: "var(--surface-elev-1)",
                    color: "var(--text-default)",
                    border: "1px solid var(--neutral-200)",
                  }}
                >
                  <Link className="w-4 h-4" />
                  Link to Initiative
                </button>

                <button
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    background: "var(--surface-elev-1)",
                    color: "var(--text-default)",
                    border: "1px solid var(--neutral-200)",
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Create KPI Gap
                </button>

                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this fragment?")) {
                      removeFragment(selectedFragmentData.id)
                      setSelectedFragment(null)
                    }
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Fragment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderNorthStarBoard = () => {
    if (boardView === "table") {
      return (
        <div className="premium-card">
          <div className="p-4 border-b" style={{ borderColor: "var(--neutral-100)" }}>
            <h4 className="font-semibold" style={{ color: "var(--text-default)" }}>
              North Star Fragments - Table View
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Title
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Lens
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    LoB
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Impact
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Effort
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Horizon
                  </th>
                  <th className="text-left p-3 text-sm font-medium" style={{ color: "var(--text-default)" }}>
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody>
                {northStarFragments.map((fragment) => (
                  <tr
                    key={fragment.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    style={{ borderColor: "var(--neutral-100)" }}
                    onClick={() => setSelectedFragment(fragment.id)}
                  >
                    <td className="p-3">
                      <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                        {fragment.title}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className="premium-chip text-xs"
                        style={{
                          background: "var(--grad-primary)",
                          color: "white",
                        }}
                      >
                        {fragment.lens}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {fragment.lob}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getImpactColor(fragment.impact || 0) }}
                        />
                        <span className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                          {fragment.impact}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="text-sm" style={{ color: "var(--text-default)" }}>
                        {fragment.effort}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className="text-xs px-2 py-1 rounded"
                        style={{
                          backgroundColor: getHorizonColor(fragment.horizon || "Next"),
                          color: "white",
                        }}
                      >
                        {fragment.horizon}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-sm" style={{ color: "var(--text-default)" }}>
                        {fragment.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {/* Top Bar */}
        <div className="premium-card p-4">
          <div className="flex items-center justify-between mb-4">
            {/* Left: Title + Badge */}
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold gradient-heading">North Star Board</h2>
              <span
                className="premium-chip text-xs"
                style={{
                  background: "var(--grad-accent-a)",
                  color: "white",
                }}
              >
                Workshop
              </span>
            </div>

            {/* Right: Toolbar */}
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                style={{ background: "var(--grad-primary)", color: "white" }}
              >
                <Plus className="w-4 h-4" />
                New note
              </button>

              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    background: "var(--surface-elev-1)",
                    color: "var(--text-default)",
                    border: "1px solid var(--neutral-200)",
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Import ▾
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setAiAssistOpen(!aiAssistOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    background: aiAssistOpen ? "var(--grad-primary)" : "var(--surface-elev-1)",
                    color: aiAssistOpen ? "white" : "var(--text-default)",
                    border: aiAssistOpen ? "none" : "1px solid var(--neutral-200)",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Assist ▾
                </button>

                {aiAssistOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-64 premium-card p-2 shadow-lg z-50"
                    style={{ borderRadius: "12px" }}
                  >
                    <div className="space-y-1">
                      <button
                        onClick={handleAiCluster}
                        disabled={aiProcessing}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--grad-accent-a)" }}
                        >
                          <span className="text-white text-sm">🔗</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                            Cluster Similar Fragments
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            Group fragments by theme and priority
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={handleAiMerge}
                        disabled={aiProcessing || selectedFragments.length < 2}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--grad-accent-b)" }}
                        >
                          <span className="text-white text-sm">⚡</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                            Merge Selected Fragments
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            {selectedFragments.length} selected
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={handleGenerateStrategyMap}
                        disabled={aiProcessing}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--grad-primary)" }}
                        >
                          <span className="text-white text-sm">🗺️</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                            Generate Strategy Map
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            Create visual strategy from fragments
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={handleSuggestQuickWins}
                        disabled={aiProcessing}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--accent-teal)" }}
                        >
                          <span className="text-white text-sm">⚡</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                            Suggest Quick Wins
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            High impact, low effort opportunities
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={handleAutoTag}
                        disabled={aiProcessing}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50"
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "var(--accent-gold)" }}
                        >
                          <span className="text-white text-sm">🏷️</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: "var(--text-default)" }}>
                            Auto-Tag Fragments
                          </div>
                          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                            Link to KPIs, processes, capabilities
                          </div>
                        </div>
                      </button>
                    </div>

                    {aiProcessing && (
                      <div className="mt-3 p-3 rounded-lg" style={{ background: "var(--surface-elev-2)" }}>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm" style={{ color: "var(--text-default)" }}>
                            AI processing...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    background: "var(--surface-elev-1)",
                    color: "var(--text-default)",
                    border: "1px solid var(--neutral-200)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export ▾
                </button>
              </div>

              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors"
                style={{
                  background: "var(--surface-elev-1)",
                  color: "var(--text-default)",
                  border: "1px solid var(--neutral-200)",
                }}
              >
                <HelpCircle className="w-4 h-4" />
                Help
              </button>
            </div>
          </div>

          {/* Center: Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setActiveFilters((prev) => (prev.includes(chip) ? prev.filter((f) => f !== chip) : [...prev, chip]))
                }}
                className="premium-chip text-sm transition-colors"
                style={{
                  background: activeFilters.includes(chip) ? "var(--grad-primary)" : "var(--surface-elev-1)",
                  color: activeFilters.includes(chip) ? "white" : "var(--text-default)",
                  border: activeFilters.includes(chip) ? "none" : "1px solid var(--neutral-200)",
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
              View:
            </span>
            <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid var(--neutral-200)" }}>
              <button
                onClick={() => setBoardView("workshop")}
                className="px-3 py-1 text-sm font-medium transition-colors"
                style={{
                  background: boardView === "workshop" ? "var(--grad-primary)" : "var(--surface-elev-1)",
                  color: boardView === "workshop" ? "white" : "var(--text-default)",
                }}
              >
                <Grid className="w-4 h-4 inline mr-1" />
                Workshop Mode
              </button>
              <button
                onClick={() => setBoardView("table")}
                className="px-3 py-1 text-sm font-medium transition-colors"
                style={{
                  background: boardView === "table" ? "var(--grad-primary)" : "var(--surface-elev-1)",
                  color: boardView === "table" ? "white" : "var(--text-default)",
                }}
              >
                <List className="w-4 h-4 inline mr-1" />
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* 5-Lane Board */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 min-h-[600px]">
          {lanes.map((lane) => (
            <div key={lane} className="space-y-3">
              {/* Lane Header */}
              <div
                className="p-3 rounded-lg text-center font-semibold"
                style={{
                  background: "var(--grad-accent-b)",
                  color: "white",
                }}
              >
                {lane}
              </div>

              {/* Lane Content */}
              <div className="space-y-3 min-h-[500px] p-2 rounded-lg" style={{ background: "var(--surface-elev-1)" }}>
                {getFragmentsByLane(lane).map((fragment) => (
                  <div
                    key={fragment.id}
                    onClick={() => setSelectedFragment(fragment.id)}
                    className="premium-card p-3 cursor-pointer hover:shadow-md transition-all"
                    style={{
                      borderRadius: "12px",
                      border: selectedFragments.includes(fragment.id)
                        ? "2px solid var(--brand-royal)"
                        : "1px solid var(--neutral-200)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <input
                        type="checkbox"
                        checked={selectedFragments.includes(fragment.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          setSelectedFragments((prev) =>
                            e.target.checked ? [...prev, fragment.id] : prev.filter((id) => id !== fragment.id),
                          )
                        }}
                        className="mt-1"
                      />
                    </div>

                    {/* Title */}
                    <div className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: "var(--text-default)" }}>
                      {fragment.title}
                    </div>

                    {/* Chips */}
                    <div className="flex gap-1 mb-2">
                      <span
                        className="premium-chip text-xs"
                        style={{
                          background: "var(--grad-primary)",
                          color: "white",
                        }}
                      >
                        {fragment.lens}
                      </span>
                      {fragment.lob && (
                        <span
                          className="premium-chip text-xs"
                          style={{
                            background: "var(--neutral-100)",
                            color: "var(--text-muted)",
                          }}
                        >
                          {fragment.lob}
                        </span>
                      )}
                    </div>

                    {/* Micro-meta */}
                    <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getImpactColor(fragment.impact || 0) }}
                        />
                        <span>Impact {fragment.impact}</span>
                      </div>
                      <span>•</span>
                      <span>Effort {fragment.effort}</span>
                      <span>•</span>
                      <span style={{ color: getHorizonColor(fragment.horizon || "Next") }}>{fragment.horizon}</span>
                      <span>•</span>
                      <span>{fragment.confidence}%</span>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {getFragmentsByLane(lane).length === 0 && (
                  <div
                    className="h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center p-4"
                    style={{ borderColor: "var(--neutral-300)" }}
                  >
                    <div
                      className="text-sm mb-2"
                      style={{
                        background: "var(--grad-accent-b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Drop ideas here
                    </div>
                    <button
                      className="text-xs px-2 py-1 rounded transition-colors"
                      style={{
                        background: "var(--grad-primary)",
                        color: "white",
                      }}
                    >
                      + New note
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="premium-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
              Board Completeness
            </span>
            <span className="text-sm font-medium" style={{ color: "var(--brand-royal)" }}>
              85%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: "85%",
                background: "var(--grad-primary)",
              }}
            />
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Based on notes count, KPI/process links, and impact/effort/horizon completion
          </div>
        </div>
      </div>
    )
  }

  const renderSurveyDesign = () => {
    return (
      <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Survey: {surveyName}
          </h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/80 hover:shadow-md">
              <Save className="w-4 h-4" />
              Save
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-lg hover:scale-105">
              <Sparkles className="w-4 h-4" />
              AI Assist
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 p-1 bg-gray-100/60 backdrop-blur-sm rounded-xl">
          <button
            onClick={() => setSurveyStep("design")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              surveyStep === "design"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setSurveyStep("distribute")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              surveyStep === "distribute"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Distribute
          </button>
          <button
            onClick={() => setSurveyStep("analyze")}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              surveyStep === "analyze"
                ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
            }`}
          >
            Analyze
          </button>
        </div>

        {/* Design Step */}
        {surveyStep === "design" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Survey Sections */}
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900">Survey Sections</h4>
                <div className="space-y-3">
                  {surveySections.map((section) => (
                    <div
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedSection === section.id
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm"
                          : "bg-white/40 hover:bg-white/60 border border-transparent hover:border-gray-200/50"
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{section.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{section.questions.length} questions</div>
                    </div>
                  ))}
                </div>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/80 hover:shadow-md">
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900">Question Types</h4>
                <div className="grid grid-cols-2 gap-3">
                  {questionTypes.map((type) => (
                    <div
                      key={type.id}
                      className="p-4 rounded-xl cursor-pointer transition-all duration-200 bg-white/40 hover:bg-white/60 border border-transparent hover:border-gray-200/50 hover:shadow-sm flex items-center gap-3"
                    >
                      <span className="text-xl">{type.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel: Selected Section */}
            <div className="space-y-6">
              {selectedSection ? (
                <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {surveySections.find((s) => s.id === selectedSection)?.title}
                    </h4>
                    <button className="p-2.5 rounded-lg transition-all duration-200 bg-white/40 hover:bg-white/60 text-gray-500 hover:text-gray-700">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {surveySections
                      .find((s) => s.id === selectedSection)
                      ?.questions.map((question) => (
                        <div key={question.id} className="p-4 rounded-xl bg-white/40 border border-gray-100/50">
                          <div className="font-medium text-sm text-gray-900">{question.title}</div>
                          <div className="text-xs text-gray-500 mt-1">{question.type}</div>
                        </div>
                      ))}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/80 hover:shadow-md">
                    <Plus className="w-4 h-4" />
                    Add Question
                  </button>
                </div>
              ) : (
                <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-8 shadow-sm">
                  <p className="text-center text-gray-500">Select a section to view questions</p>
                </div>
              )}
            </div>

            {/* Right Panel: Survey Settings */}
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-6 space-y-4 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900">Survey Settings</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                    <input
                      type="text"
                      value={surveyName}
                      onChange={(e) => setSurveyName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Audience</label>
                    <select
                      multiple
                      value={selectedAudience}
                      onChange={(e) =>
                        setSelectedAudience(Array.from(e.target.selectedOptions, (option) => option.value))
                      }
                      className="w-full p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    >
                      <option value="Stakeholders">Stakeholders</option>
                      <option value="Employees">Employees</option>
                      <option value="Customers">Customers</option>
                      <option value="Partners">Partners</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Access Code</label>
                    <input
                      type="text"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Identity Mode</label>
                    <select
                      value={identityMode}
                      onChange={(e) => setIdentityMode(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm focus:bg-white/80 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    >
                      <option value="anonymous">Anonymous</option>
                      <option value="email">Email</option>
                      <option value="employee">Employee ID</option>
                    </select>
                  </div>
                  <label className="inline-flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={throttleEnabled}
                      onChange={() => setThrottleEnabled(!throttleEnabled)}
                      className="w-5 h-5 text-blue-600 bg-white/60 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Throttle Responses</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Distribute Step */}
        {surveyStep === "distribute" && (
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Distribute Survey
            </h3>
            <p className="text-gray-600">Share your survey with the selected audience.</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Survey Link</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={`${window.location.origin}/survey/${accessCode}`}
                    readOnly
                    className="flex-1 p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm"
                  />
                  <button className="px-4 py-3 rounded-xl font-medium transition-all duration-200 bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:bg-white/80 hover:shadow-md">
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Embed Code</label>
                <textarea
                  readOnly
                  value={`<iframe src="${window.location.origin}/survey/${accessCode}" width="600" height="400"></iframe>`}
                  className="w-full p-3 rounded-xl border border-gray-200/50 text-sm bg-white/60 backdrop-blur-sm h-24 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Analyze Step */}
        {surveyStep === "analyze" && (
          <div className="bg-white/60 backdrop-blur-sm border border-white/20 rounded-xl p-8 space-y-6 shadow-sm">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Analyze Survey Results
            </h3>
            <p className="text-gray-600">Review survey statistics and responses.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(surveyStats).map(([key, value]) => (
                <div
                  key={key}
                  className="p-6 rounded-xl bg-white/40 border border-gray-100/50 hover:bg-white/60 transition-all duration-200"
                >
                  <div className="font-medium text-sm text-gray-600 mb-2">{key}</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSubContent = () => {
    const handlePriorityChange = (painPointId: string, priority: string) => {
      setSelectedPriorities((prev) => ({
        ...prev,
        [painPointId]: priority,
      }))
    }

    const togglePainPointSelection = (painPointId: string) => {
      setSelectedPainPoints((prev) =>
        prev.includes(painPointId) ? prev.filter((id) => id !== painPointId) : [...prev, painPointId],
      )
    }

    const toggleTrendBookmark = (trendId: string, e: React.MouseEvent) => {
      e.stopPropagation()
      setBookmarkedTrends((prev) => (prev.includes(trendId) ? prev.filter((id) => id !== trendId) : [...prev, trendId]))
    }

    const handleTrendPriorityChange = (trendId: string, priority: string) => {
      setTrendPriorities((prev) => ({
        ...prev,
        [trendId]: priority,
      }))
    }

    const industryTrendsData = [
      {
        id: "trend_001",
        title: "Artificial Intelligence and Generative AI",
        description:
          "The adoption of AI and generative AI in manufacturing is accelerating, with a focus on targeted, high-ROI investments. This includes leveraging AI for predictive maintenance, optimizing production processes, and enabling virtual operations through technologies like digital twins, machine learning, augmented reality (AR), and virtual reality (VR).",
        industry: "Manufacturing",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "75%",
        growth: "+28%",
        drivers: ["Technological Advancements", "Operational Efficiency", "Cost Reduction"],
        businessImpact:
          "Improved operational efficiency, reduced unplanned downtime, enhanced decision-making through data-driven insights, increased automation, and the potential for 'dark factories' (fully automated facilities).",
      },
      {
        id: "trend_002",
        title: "Smart Factories and Industry 4.0 Technologies",
        description:
          "The continued rise of smart factories involves moving from sporadic implementation of smart manufacturing equipment to full-fledged systems that leverage data analytics and communication between machinery and central monitoring tools.",
        industry: "Manufacturing",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "68%",
        growth: "+25%",
        drivers: ["Equipment Modernization", "Competitive Pressure", "Cost Reduction"],
        businessImpact:
          "More proactive and effective maintenance, greater insight into process efficiency, reduction in overall operating costs, and enhanced ability to adapt to changing market demands.",
      },
      {
        id: "trend_003",
        title: "Supply Chain Resilience and Reassessment",
        description:
          "Manufacturers are reassessing and transforming their supply chains to tackle disruptions and elevated costs with greater agility and efficiency. This involves diversifying sourcing, implementing data-driven inventory management, and utilizing technologies like blockchain for traceability.",
        industry: "Manufacturing",
        process: "source-to-pay",
        impact: "High",
        adoption: "72%",
        growth: "+22%",
        drivers: ["Supply Chain Disruptions", "Flexibility Needs", "Technology Availability"],
        businessImpact:
          "Reduced vulnerability to supply chain shocks, improved inventory management, enhanced traceability, and greater overall supply chain resilience.",
      },
      {
        id: "trend_004",
        title: "Sustainability and Carbon Neutrality",
        description:
          "There is an increased focus on sustainability and carbon neutrality in manufacturing, driven by environmental, social, and governance (ESG) concerns. This includes adopting sustainable manufacturing processes, pursuing carbon-neutral practices, integrating renewable energy, and exploring carbon capture technologies.",
        industry: "Manufacturing",
        process: "governance",
        impact: "Medium",
        adoption: "64%",
        growth: "+30%",
        drivers: ["ESG Concerns", "Regulatory Requirements", "Technology Advancements"],
        businessImpact:
          "Reduced environmental footprint, improved brand reputation, compliance with evolving regulations, and potential cost savings through energy efficiency.",
      },
      {
        id: "trend_005",
        title: "Talent and Workforce Strategy",
        description:
          "Addressing the ongoing talent challenges in manufacturing, including skilled labor shortages and the need for a long-term workforce strategy. This involves improving the worker experience, adopting an ecosystem approach to talent development, and leveraging digital tools for advanced talent planning.",
        industry: "Manufacturing",
        process: "recruit-to-retire",
        impact: "High",
        adoption: "58%",
        growth: "+18%",
        drivers: ["Aging Workforce", "Skills Gap", "Employee Turnover"],
        businessImpact:
          "Reduced labor shortages, improved employee retention, enhanced workforce capabilities, and better alignment of talent with future manufacturing needs.",
      },
      {
        id: "trend_006",
        title: "Digital Transformation and AI Integration",
        description:
          "The healthcare industry is rapidly adopting digital technologies, including artificial intelligence (AI) and generative AI, to enhance efficiency, automate processes, improve data management, and deliver more personalized patient care.",
        industry: "Healthcare",
        process: "idea-to-market",
        impact: "High",
        adoption: "71%",
        growth: "+35%",
        drivers: ["Digital Adoption Gap", "Efficiency Needs", "AI Potential"],
        businessImpact:
          "Significant improvements in administrative, financial, and clinical efficiencies; enhanced staff productivity; better data connectivity and interoperability; potential for reduced costs; and improved patient outcomes through predictive analytics and personalized care.",
      },
      {
        id: "trend_007",
        title: "Enhanced Customer Experience and Patient-Centric Care",
        description:
          "There is an increasing emphasis on delivering personalized, convenient, and seamless healthcare experiences for patients. This includes leveraging digital tools for appointment scheduling, medication reminders, virtual care, remote monitoring, and personalized navigation.",
        industry: "Healthcare",
        process: "lead-to-cash",
        impact: "High",
        adoption: "66%",
        growth: "+27%",
        drivers: ["Consumer Expectations", "Member Engagement", "Care Guidance"],
        businessImpact:
          "Improved patient satisfaction, better health outcomes through proactive engagement and preventive measures, increased utilization of benefits, and potential for reduced healthcare spending by guiding patients to appropriate care.",
      },
      {
        id: "trend_008",
        title: "Addressing Healthcare Workforce Challenges",
        description:
          "The healthcare industry faces persistent global workforce shortages, high rates of burnout among clinical staff, and difficulties in hiring and retaining talent. Strategies are being implemented to invest in retention, engagement, and the well-being of healthcare employees.",
        industry: "Healthcare",
        process: "recruit-to-retire",
        impact: "High",
        adoption: "59%",
        growth: "+20%",
        drivers: ["Workforce Shortages", "Burnout", "Hiring Costs"],
        businessImpact:
          "Reduced administrative burdens for clinicians, increased productivity and efficiency of staff, improved job satisfaction and retention rates, and ultimately, enhanced patient care quality.",
      },
      {
        id: "trend_009",
        title: "Shift Towards Value-Based Care and Cost Reduction",
        description:
          "Healthcare systems are increasingly focusing on integrated care models and proactive management of chronic conditions to reduce costs, eliminate waste, and improve overall health outcomes.",
        industry: "Healthcare",
        process: "source-to-pay",
        impact: "High",
        adoption: "62%",
        growth: "+24%",
        drivers: ["Rising Costs", "Efficiency Needs", "Chronic Conditions"],
        businessImpact:
          "Reduced healthcare expenditures, improved health outcomes through holistic and integrated care, increased patient satisfaction, and more effective management of high-cost conditions.",
      },
      {
        id: "trend_010",
        title: "Specialized and Condition-Specific Care Models",
        description:
          "A growing trend towards clinical excellence and tailored care programs for specific conditions, such as women's health, musculoskeletal (MSK) conditions, oncology, and cardiodiabesity.",
        industry: "Healthcare",
        process: "recruit-to-retire",
        impact: "Medium",
        adoption: "48%",
        growth: "+32%",
        drivers: ["Cost Impact", "Care Fragmentation", "Personalization"],
        businessImpact:
          "Improved patient outcomes for specific conditions, reduced costs associated with fragmented care and late interventions, enhanced patient satisfaction through tailored support, and more efficient resource allocation within the healthcare system.",
      },
      {
        id: "trend_011",
        title: "AI-Driven Transformation (including Generative AI)",
        description:
          "AI, particularly Generative AI, is revolutionizing financial services by enhancing customer experience through personalized advice and 24/7 support, automating back-office operations like data processing and risk compliance, and enabling more efficient decision-making.",
        industry: "Financial Services",
        process: "lead-to-cash",
        impact: "High",
        adoption: "78%",
        growth: "+31%",
        drivers: ["AI Advancements", "Customer Experience", "Operational Efficiency"],
        businessImpact:
          "Improved customer satisfaction, increased operational efficiency, reduced costs, faster and more informed decision-making, development of new products and services, and a shift towards human-machine collaboration.",
      },
      {
        id: "trend_012",
        title: "Digitalization and Enhanced Customer Experience",
        description:
          "The financial services industry is undergoing a significant digital transformation, moving towards digital-only banking, embedded finance, and banking-as-a-service models. This trend focuses on delivering hyper-personalized, seamless, and proactive customer experiences through digital channels.",
        industry: "Financial Services",
        process: "lead-to-cash",
        impact: "High",
        adoption: "82%",
        growth: "+26%",
        drivers: ["Customer Expectations", "Digital Natives", "FinTech Competition"],
        businessImpact:
          "Increased customer loyalty, expanded reach to underserved populations, improved operational efficiency through digital processes, and the creation of new revenue streams through integrated services.",
      },
      {
        id: "trend_013",
        title: "Cybersecurity and Data Trust",
        description:
          "With the increasing digitalization of financial services, cybersecurity remains a critical concern. This trend emphasizes the implementation of advanced security frameworks, real-time threat detection, adaptive fraud prevention, and secure cloud environments.",
        industry: "Financial Services",
        process: "finance-treasury-risk",
        impact: "High",
        adoption: "89%",
        growth: "+19%",
        drivers: ["Cyber Threats", "Data Volume", "Regulatory Requirements"],
        businessImpact:
          "Enhanced data protection, reduced financial losses due to fraud, improved regulatory compliance, strengthened brand reputation, and a competitive advantage for firms demonstrating superior security.",
      },
      {
        id: "trend_014",
        title: "Decentralized Finance (DeFi) and Blockchain Adoption",
        description:
          "Blockchain technology is extending beyond cryptocurrencies to disrupt traditional financial models. DeFi and tokenized assets offer the potential for faster, more transparent, and cost-effective transactions across various financial activities.",
        industry: "Financial Services",
        process: "governance",
        impact: "Medium",
        adoption: "45%",
        growth: "+42%",
        drivers: ["Transparency Demand", "Cost Reduction", "Technology Evolution"],
        businessImpact:
          "Transformation of traditional financial models, emergence of new financial products and services, increased efficiency in cross-border payments and asset transfers, and the need for evolving regulatory frameworks.",
      },
      {
        id: "trend_015",
        title: "Regulatory Technology (RegTech) and Compliance Automation",
        description:
          "RegTech is becoming essential for financial firms to navigate the ever-evolving and complex regulatory landscape. This trend involves leveraging AI and automation to streamline compliance processes, provide real-time monitoring, and ensure adherence to regulatory requirements.",
        industry: "Financial Services",
        process: "finance-record-to-report",
        impact: "High",
        adoption: "73%",
        growth: "+23%",
        drivers: ["Regulatory Complexity", "Real-time Monitoring", "AI Automation"],
        businessImpact:
          "Reduced compliance costs, improved accuracy and efficiency of regulatory reporting, proactive identification and mitigation of risks, and enhanced ability to adapt to new regulations and policy changes.",
      },
      {
        id: "trend_016",
        title: "Agentic AI",
        description:
          "Agentic AI refers to autonomous machine 'agents' that go beyond the query-and-response functionality of generative chatbots. These agents can perform enterprise-related tasks independently without human intervention, acting as 'virtual coworkers' that can autonomously plan and execute multistep workflows.",
        industry: "Technology",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "52%",
        growth: "+48%",
        drivers: ["AI Foundation Models", "Automation Demand", "Minimal Oversight"],
        businessImpact:
          "Significant impact on business operations by automating complex workflows, reducing human intervention, and increasing efficiency. This can lead to cost savings, improved productivity, and new possibilities for service delivery.",
      },
      {
        id: "trend_017",
        title: "Spatial Computing",
        description:
          "Spatial computing involves the symbiosis of advanced computer systems (VR, AR, AI, and IoT) with humans, creating immersive and interactive digital environments that blend with the physical world.",
        industry: "Technology",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "38%",
        growth: "+55%",
        drivers: ["VR/AR Advancements", "Hardware Release", "Immersive Experiences"],
        businessImpact:
          "Profound impact on various sectors including education, training, retail, and entertainment by blurring the boundaries between physical and digital worlds. It enables more engaging and efficient solutions, particularly in areas where the cost of human error is high.",
      },
      {
        id: "trend_018",
        title: "Nuclear Power for AI Infrastructure",
        description:
          "This trend involves the growing interest and investment in nuclear energy solutions to meet the rapidly increasing energy demands of AI and other high-energy technologies. It focuses on developing clean and reliable power sources to support the massive computational needs of AI.",
        industry: "Technology",
        process: "idea-to-market",
        impact: "High",
        adoption: "28%",
        growth: "+67%",
        drivers: ["AI Energy Consumption", "Renewable Limitations", "Stable Power"],
        businessImpact:
          "Reshaping energy infrastructure planning and investment in the technology sector. It will drive innovation in reactor technology and waste management, potentially leading to more sustainable and scalable AI deployments.",
      },
      {
        id: "trend_019",
        title: "Neuromorphic Computing",
        description:
          "Neuromorphic computing is an innovative computational approach that mimics the architecture and functionality of the human brain. Unlike traditional sequential processing, neuromorphic systems process information in parallel, leveraging brain-like structures for a significant leap in performance.",
        industry: "Technology",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "22%",
        growth: "+72%",
        drivers: ["Computing Limitations", "Energy Efficiency", "AI Workloads"],
        businessImpact:
          "Revolutionizing AI processing capabilities, enabling faster and more efficient execution of complex algorithms. This will impact areas requiring high-speed, parallel processing, such as advanced AI, real-time data analysis, and scientific simulations.",
      },
      {
        id: "trend_020",
        title: "Post-Quantum Cryptography",
        description:
          "Post-quantum cryptography focuses on developing and implementing new encryption methods that are resistant to attacks from quantum computers. This trend addresses the future threat posed by quantum computers' ability to break current cryptographic standards.",
        industry: "Technology",
        process: "finance-treasury-risk",
        impact: "High",
        adoption: "35%",
        growth: "+58%",
        drivers: ["Quantum Computing", "Security Threats", "Data Protection"],
        businessImpact:
          "A fundamental shift in cybersecurity strategies and infrastructure. Businesses will need to invest in upgrading their encryption systems to quantum-resistant algorithms to protect data integrity and confidentiality.",
      },
      {
        id: "trend_021",
        title: "AI-Powered Personalization and Efficiency",
        description:
          "Retailers are increasingly leveraging Artificial Intelligence (AI), including generative AI, to create hyper-personalized shopping experiences, streamline operations, and enhance customer engagement. This involves AI agents for personalized recommendations, virtual assistants, dynamic content creation, and optimizing back-end processes.",
        industry: "Retail",
        process: "lead-to-cash",
        impact: "High",
        adoption: "69%",
        growth: "+29%",
        drivers: ["Conversion Rates", "Customer Satisfaction", "Operational Efficiency"],
        businessImpact:
          "Significant improvements in customer experience, leading to higher conversion rates and stronger brand loyalty. Enhanced operational efficiency through optimized inventory, supply chain management, and product design.",
      },
      {
        id: "trend_022",
        title: "Evolution of Omnichannel and Digital Commerce",
        description:
          "The retail landscape continues to evolve towards a seamless omnichannel experience, integrating online and offline channels. This includes the rapid growth of e-commerce, mobile shopping, live shopping, and the expansion of online marketplaces.",
        industry: "Retail",
        process: "lead-to-cash",
        impact: "High",
        adoption: "76%",
        growth: "+21%",
        drivers: ["Consumer Convenience", "E-commerce Growth", "Mobile Shopping"],
        businessImpact:
          "Increased sales through diverse channels, enhanced customer engagement, and new revenue streams. Retailers must invest in robust digital infrastructure and integrate various touchpoints to provide a cohesive customer experience.",
      },
      {
        id: "trend_023",
        title: "The Value-Seeking Consumer and Private Label Growth",
        description:
          "Consumers are increasingly focused on value, driven by economic pressures and inflation. This leads to a shift in purchasing behavior, with shoppers seeking deals, trading down to more affordable brands, and prioritizing private label products.",
        industry: "Retail",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "81%",
        growth: "+15%",
        drivers: ["Economic Pressure", "Inflation", "Value Maximization"],
        businessImpact:
          "Increased competition based on price and value, leading to a loyalty crisis for some brands. Growth in private label market share and a need for retailers to adapt their pricing and promotional strategies.",
      },
      {
        id: "trend_024",
        title: "Supply Chain Optimization and Inventory Management",
        description:
          "Retailers are focusing on optimizing their supply chains and inventory management to enhance efficiency, reduce costs, and improve responsiveness. This involves leveraging advanced technologies like AI for demand forecasting, warehouse automation, and real-time inventory visibility.",
        industry: "Retail",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "67%",
        growth: "+26%",
        drivers: ["Supply Chain Lessons", "Cost Reduction", "Technology Advancement"],
        businessImpact:
          "Improved profitability through reduced storage costs and optimized stock levels. Enhanced ability to meet consumer demand and minimize out-of-stock situations.",
      },
      {
        id: "trend_025",
        title: "Data-Driven Decision Making and Cybersecurity",
        description:
          "The increasing reliance on data to understand consumer behavior, personalize experiences, and optimize operations necessitates robust data analytics capabilities. Alongside this, the evolving cybersecurity landscape demands increased investment in protecting sensitive consumer data.",
        industry: "Retail",
        process: "finance-treasury-risk",
        impact: "High",
        adoption: "74%",
        growth: "+24%",
        drivers: ["Consumer Insights", "Data Complexity", "Cyber Threats"],
        businessImpact:
          "Better-informed business decisions, leading to improved marketing, merchandising, and overall consumer experience. However, it also creates significant challenges in terms of data management, privacy compliance, and cybersecurity investments.",
      },
      {
        id: "trend_026",
        title: "Increasing Data Centers",
        description:
          "Approximately 75% of the top 35 electric power utilities in the United States have reported a rise in electricity demand from data centers. These energy-intensive facilities currently consume 6% to 8% of total annual electricity generation, and this is expected to rise to 11% to 15% by 2030.",
        industry: "Energy",
        process: "acquire-to-decommission",
        impact: "High",
        adoption: "75%",
        growth: "+38%",
        drivers: ["Generative AI", "Machine Learning", "Cryptocurrency Mining"],
        businessImpact:
          "Utilities are deploying advanced technologies to increase efficiencies of current infrastructure, ensuring reliability through multiple sources of electricity, and addressing cost concerns through tariff approaches.",
      },
      {
        id: "trend_027",
        title: "Greater Nuclear Integration",
        description:
          "Nuclear energy is gaining renewed interest as a reliable, carbon-free baseload power source. This trend involves utilities implementing strategies to boost nuclear power use, including extending the life of existing nuclear plants and exploring new advanced nuclear technologies.",
        industry: "Energy",
        process: "idea-to-market",
        impact: "High",
        adoption: "42%",
        growth: "+45%",
        drivers: ["Clean Baseload Power", "Energy Independence", "Technology Advancement"],
        businessImpact:
          "Greater nuclear integration can help meet the escalating electricity demand, reduce carbon emissions, and enhance grid stability. It can also lead to significant investments in nuclear infrastructure and research.",
      },
      {
        id: "trend_028",
        title: "Distributed Energy Resources Integration",
        description:
          "Utilities are increasingly looking at sum-of-parts solutions by integrating distributed energy resources (DERs) such as rooftop solar, battery storage, and electric vehicles into the grid. This involves managing these decentralized energy sources to optimize grid performance and reliability.",
        industry: "Energy",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "58%",
        growth: "+33%",
        drivers: ["Renewable Growth", "Battery Storage", "Electric Vehicles"],
        businessImpact:
          "DER integration can lead to a more flexible and resilient grid, reduced transmission losses, and increased energy independence. It also requires new grid management strategies and technologies.",
      },
      {
        id: "trend_029",
        title: "Workforce 2.0",
        description:
          "Utilities are cultivating a new generation of talent and embracing new skills to address the evolving demands of the energy transition. This involves focusing on technology empowerment, modular skills development, and fostering an innovation culture.",
        industry: "Energy",
        process: "recruit-to-retire",
        impact: "High",
        adoption: "51%",
        growth: "+27%",
        drivers: ["Technology Advancement", "Aging Workforce", "Complex Grid"],
        businessImpact:
          "Workforce 2.0 aims to ensure utilities have the necessary talent to navigate the energy transition, improve operational efficiency, and drive innovation. It involves significant investment in training, reskilling, and attracting new talent.",
      },
      {
        id: "trend_030",
        title: "Carbon Management",
        description:
          "Some utilities are exploring a toolkit to manage 'last mile' emissions, focusing on strategies to reduce carbon emissions that are difficult to abate. This includes carbon capture and storage (CCS), offsets, and other innovative approaches.",
        industry: "Energy",
        process: "governance",
        impact: "Medium",
        adoption: "39%",
        growth: "+41%",
        drivers: ["Decarbonization Goals", "Regulatory Pressure", "Hard-to-Abate Emissions"],
        businessImpact:
          "Carbon management strategies aim to accelerate the transition to a low-carbon economy, reduce environmental impact, and enhance the sustainability of energy operations.",
      },
      {
        id: "trend_031",
        title: "Electric Vehicle (EV) Adoption Increases Worldwide",
        description:
          "The global automotive industry is experiencing a significant shift towards electric vehicles (EVs), including Battery Electric Vehicles (BEVs) and Plug-in Hybrid Electric Vehicles (PHEVs). This trend is characterized by substantial growth in EV sales and an increasing share of EVs on the road.",
        industry: "Automotive",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "68%",
        growth: "+34%",
        drivers: ["Regulatory Requirements", "Battery Technology", "Charging Infrastructure"],
        businessImpact:
          "This trend impacts business operations by necessitating significant investments in EV research and development, manufacturing capabilities, and supply chain adjustments. It also drives changes in sales and marketing strategies.",
      },
      {
        id: "trend_032",
        title: "Autonomous Vehicles (AVs) Transform the Auto Industry",
        description:
          "The development and deployment of autonomous vehicles, ranging from advanced driver-assistance systems (ADAS) to fully self-driving cars, are fundamentally changing the automotive landscape. This involves integrating sophisticated sensors, AI, and software to enable vehicles to perceive their environment.",
        industry: "Automotive",
        process: "idea-to-market",
        impact: "High",
        adoption: "43%",
        growth: "+52%",
        drivers: ["AI Advancement", "Safety Potential", "Regulatory Evolution"],
        businessImpact:
          "The rise of AVs impacts business operations by requiring substantial R&D investments, fostering partnerships between traditional automakers and tech companies, and creating new business models such as robotaxi services.",
      },
      {
        id: "trend_033",
        title: "Increased Vehicle Connectivity",
        description:
          "Modern vehicles are becoming increasingly connected, integrating with digital ecosystems through embedded systems, smartphones, and cloud-based services. This connectivity enables a wide range of features, including in-car infotainment, navigation, remote diagnostics, over-the-air (OTA) updates, and enhanced safety features.",
        industry: "Automotive",
        process: "plan-to-fulfill",
        impact: "Medium",
        adoption: "72%",
        growth: "+28%",
        drivers: ["Digital Integration", "5G Technology", "Revenue Streams"],
        businessImpact:
          "This trend impacts business operations by requiring automakers to develop expertise in software, cybersecurity, and data management. It shifts the focus from purely hardware-centric manufacturing to a more software-defined vehicle architecture.",
      },
      {
        id: "trend_034",
        title: "Shift Towards Online Vehicle Purchases",
        description:
          "The automotive retail landscape is undergoing a transformation with a growing preference for online vehicle purchases. This trend involves consumers researching, configuring, financing, and even completing the purchase of vehicles entirely or partially through digital platforms.",
        industry: "Automotive",
        process: "lead-to-cash",
        impact: "Medium",
        adoption: "56%",
        growth: "+36%",
        drivers: ["Digital Behavior", "Convenience", "Transparent Pricing"],
        businessImpact:
          "This trend impacts business operations by requiring traditional dealerships to invest in digital sales channels, enhance their online presence, and integrate online and offline customer experiences.",
      },
      {
        id: "trend_035",
        title: "Semiconductor Shortage and Supply Chain Resilience",
        description:
          "The automotive industry has been severely impacted by a global shortage of semiconductors, critical components for various vehicle systems, from infotainment to engine control units. This shortage has led to production cuts, delays in vehicle deliveries, and increased costs.",
        industry: "Automotive",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "89%",
        growth: "+12%",
        drivers: ["Semiconductor Demand", "Manufacturing Disruptions", "Vehicle Complexity"],
        businessImpact:
          "This trend significantly impacts business operations by disrupting production schedules, leading to reduced vehicle output and lost sales. Automakers are forced to prioritize certain models or features, and some have resorted to redesigning vehicles.",
      },
      {
        id: "trend_036",
        title: "Generative AI Integration",
        description:
          "Telcos are actively exploring and implementing Generative AI (Gen AI) across their operations. This involves using Gen AI to enhance customer service through AI voice agents and personalized engagement, improve business processes, and potentially build new Gen AI data centers.",
        industry: "Telecommunications",
        process: "lead-to-cash",
        impact: "High",
        adoption: "61%",
        growth: "+39%",
        drivers: ["AI Investment", "Data Traffic", "Operational Efficiency"],
        businessImpact:
          "Impacts include transformed customer experiences, streamlined business processes, potential new revenue streams from AI-powered services, and a shift in how telcos manage and monetize their network infrastructure.",
      },
      {
        id: "trend_037",
        title: "Industry Consolidation and M&A",
        description:
          "The telecommunications industry is experiencing accelerated consolidation through mergers and acquisitions (M&A). This trend is driven by larger players seeking to solidify their market position, expand fiber coverage, and improve managed services.",
        industry: "Telecommunications",
        process: "acquire-to-decommission",
        impact: "High",
        adoption: "73%",
        growth: "+18%",
        drivers: ["Competition", "Infrastructure Funding", "Market Fragmentation"],
        businessImpact:
          "Consolidation leads to a more concentrated market, potentially impacting competition and service diversity. It allows companies to achieve economies of scale, improve operational efficiency, and gain access to new technologies and customer bases.",
      },
      {
        id: "trend_038",
        title: "Cloud Consumption and Modernization",
        description:
          "There is a continued and accelerating shift towards cloud technology adoption within the telecommunications sector. This involves migrating legacy infrastructure to cloud-based solutions, embracing containerization, microservices, and virtualization.",
        industry: "Telecommunications",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "78%",
        growth: "+25%",
        drivers: ["Legacy Infrastructure", "Flexibility Needs", "Digital Transformation"],
        businessImpact:
          "This trend leads to more agile and efficient network operations, improved service delivery, and the ability to rapidly deploy new services. It also creates opportunities for telcos to offer cloud-based services to enterprises.",
      },
      {
        id: "trend_039",
        title: "Managed Cybersecurity Services",
        description:
          "Telecommunications companies are increasingly offering managed cybersecurity solutions as part of their service portfolios. This includes bundling security services like active monitoring, proactive threat detection, and remediation with existing products.",
        industry: "Telecommunications",
        process: "finance-record-to-report",
        impact: "Medium",
        adoption: "65%",
        growth: "+31%",
        drivers: ["AI-Driven Attacks", "Compliance Requirements", "Internal Capacity"],
        businessImpact:
          "This expands telcos' service offerings beyond core connectivity, creating new revenue opportunities. It helps businesses secure their operations and data, reducing their cybersecurity risks and compliance burdens.",
      },
      {
        id: "trend_040",
        title: "5G Evolution and 6G Development",
        description:
          "5G continues its global rollout and is expected to become the dominant communication standard for smartphones. There's also significant investment in 5G Standalone (SA) networks for higher speeds, lower latency, and new use cases like VR/AR and IoT.",
        industry: "Telecommunications",
        process: "idea-to-market",
        impact: "High",
        adoption: "71%",
        growth: "+22%",
        drivers: ["Connectivity Demand", "Advanced Applications", "Future Standards"],
        businessImpact:
          "This leads to enhanced mobile broadband experiences, new opportunities for private 5G networks, and the enablement of advanced technologies like smart cities and autonomous driving.",
      },
      {
        id: "trend_041",
        title: "Growth of Data Centers and Digital Infrastructure",
        description:
          "The demand for data centers is skyrocketing due to the widespread growth of artificial intelligence (AI) and data services. This trend reflects a significant growth opportunity in digital infrastructure, with data centers ranking as a top sectoral prospect globally.",
        industry: "Real Estate",
        process: "finance-treasury-risk",
        impact: "High",
        adoption: "67%",
        growth: "+44%",
        drivers: ["AI Growth", "Data Consumption", "Digital Infrastructure"],
        businessImpact:
          "This trend leads to significant investment opportunities in specialized real estate, but also requires highly technical expertise and substantial capital. It impacts traditional real estate by shifting focus towards specialized, high-tech facilities.",
      },
      {
        id: "trend_042",
        title: "Impact of Elevated Interest Rates and Cost of Capital",
        description:
          "The real estate industry is facing a 'higher for longer' interest rate environment, leading to elevated costs of capital. This creates significant concerns around refinancing risks for maturing commercial mortgages that were originally underwritten at lower interest rates.",
        industry: "Real Estate",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "92%",
        growth: "+8%",
        drivers: ["Central Bank Policies", "Economic Uncertainties", "Maturing Loans"],
        businessImpact:
          "This trend impacts business operations by increasing borrowing costs, making capital for acquisitions more expensive and harder to attain. It puts pressure on property valuations and can lead to a more defensive posture for real estate organizations.",
      },
      {
        id: "trend_043",
        title: "Increased Focus on Technology Adoption, Especially Generative AI",
        description:
          "Real estate organizations are increasingly recognizing the need to invest in data and technology capabilities, with a particular emphasis on generative artificial intelligence (Gen AI). This adoption is seen as a key area for future spending and transformative change within the industry.",
        industry: "Real Estate",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "48%",
        growth: "+47%",
        drivers: ["Technology Emergence", "Limited Capabilities", "Competitive Advantage"],
        businessImpact:
          "Technology adoption will transform business operations by automating processes, enhancing data analysis, and improving decision-making. It will require significant investment in IT infrastructure and talent development.",
      },
      {
        id: "trend_044",
        title: "Sustainability and ESG Integration",
        description:
          "There is a growing financial imperative for investing in sustainable real estate strategies. This includes prioritizing sustainability, resilience, and affordability in building design and operation to create more livable and future-ready spaces.",
        industry: "Real Estate",
        process: "idea-to-market",
        impact: "Medium",
        adoption: "63%",
        growth: "+29%",
        drivers: ["Climate Awareness", "Regulatory Pressure", "Financial Benefits"],
        businessImpact:
          "This trend impacts business operations by requiring new building standards, retrofitting existing properties, and integrating ESG considerations into investment and development decisions.",
      },
      {
        id: "trend_045",
        title: "Shifting Geographic Preferences and Market Nuances",
        description:
          "Geographic preferences in real estate investment are evolving, with a nuanced picture emerging across different regions. While some areas like Sun Belt markets continue to attract investment, there's a renewed look at Snow Belt markets, and a 'corrugated' recovery is expected globally.",
        industry: "Real Estate",
        process: "finance-treasury-risk",
        impact: "Medium",
        adoption: "76%",
        growth: "+14%",
        drivers: ["Economic Disparities", "Demographic Changes", "Geopolitical Factors"],
        businessImpact:
          "This trend requires real estate businesses to adopt more strategic and localized investment approaches. It impacts portfolio diversification, risk assessment, and the need for in-depth market analysis.",
      },
      {
        id: "trend_046",
        title: "The Rise of AI in Agriculture",
        description:
          "Artificial intelligence is transforming agriculture, enabling farmers to make data-driven decisions that improve efficiency, sustainability, and productivity. From real-time crop monitoring to predictive analytics, AI-driven tools are optimizing agricultural practices.",
        industry: "Agriculture",
        process: "idea-to-market",
        impact: "High",
        adoption: "54%",
        growth: "+42%",
        drivers: ["Data-Driven Decisions", "Efficiency Needs", "R&D Enhancement"],
        businessImpact:
          "Improved efficiency, sustainability, and productivity; optimized agricultural practices; precise resource allocation and higher yields; accelerated new product discovery and R&D.",
      },
      {
        id: "trend_047",
        title: "Carbon Utilization and Remote Sensing",
        description:
          "Agriculture is becoming a powerful tool for carbon removal and climate resilience. Carbon utilization is rapidly emerging as a game-changing trend in AgroTech, with innovations that sequester carbon in soils, create value from agricultural waste, and support regenerative farming.",
        industry: "Agriculture",
        process: "idea-to-market",
        impact: "High",
        adoption: "41%",
        growth: "+51%",
        drivers: ["Carbon Markets", "MRV Technologies", "Climate Solutions"],
        businessImpact:
          "Agriculture contributing to climate solutions, turning sustainable farming practices into economic opportunities, enhanced soil fertility, conversion of atmospheric CO2 into soil-enriching compounds.",
      },
      {
        id: "trend_048",
        title: "The Shift to Regenerative Agriculture",
        description:
          "Regenerative agriculture is shifting from a sustainability goal to a technology-driven movement that is redefining how we grow food. AI, automation, and market-driven incentives are now accelerating the transition to soil restoration, biodiversity enhancement, and long-term farm resilience.",
        industry: "Agriculture",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "47%",
        growth: "+38%",
        drivers: ["Soil Health Depletion", "Technology Advancement", "Market Incentives"],
        businessImpact:
          "Restored soil health, enhanced biodiversity, long-term farm resilience, profitable and scalable farming approach, natural soil enrichment.",
      },
      {
        id: "trend_049",
        title: "Breakthroughs in Ag Biotechnology",
        description:
          "Agricultural biotechnology is at the forefront of climate adaptation and food security, providing farmers with highly resilient crops, biological solutions, and AI-driven breeding techniques that enhance sustainability. Advances in synthetic biology, microbiome-based inputs, and RNA-driven crop protection are unlocking new levels of resilience.",
        industry: "Agriculture",
        process: "recruit-to-retire",
        impact: "High",
        adoption: "38%",
        growth: "+58%",
        drivers: ["Climate Change", "Resilient Crops", "Synthetic Biology"],
        businessImpact:
          "Highly resilient crops, enhanced sustainability, improved climate adaptation and food security, enhanced soil biodiversity, optimized plant nutrition, increased yields in extreme conditions.",
      },
      {
        id: "trend_050",
        title: "Controlled Environment Agriculture (CEA)",
        description:
          "CEA encompasses indoor or greenhouse farming, but with highly controlled environmental variables like light, temperature, humidity, and CO2 levels to optimize plant growth. This form of agriculture is typically seen in urban environments and includes aeroponic farming, hydroponic and aquaponic farming, and vertical farming.",
        industry: "Agriculture",
        process: "plan-to-fulfill",
        impact: "Medium",
        adoption: "35%",
        growth: "+49%",
        drivers: ["Outdoor Farming Risks", "Sustainable Production", "Technology Innovation"],
        businessImpact:
          "Year-round crop production, localized food systems, reduced transportation emissions, less land and water usage, potential elimination of pesticides and herbicides.",
      },
      {
        id: "trend_051",
        title: "On Location: Experiential Entertainment on the Rise",
        description:
          "The famous 'flywheel' that has spun for years within several of the largest conglomerates is gaining traction throughout the industry. This model, which brings franchise movie and television IP to life through a wide range of in-person experiences, will expand further as companies aim to expand engagement with consumers.",
        industry: "Media & Entertainment",
        process: "lead-to-cash",
        impact: "Medium",
        adoption: "52%",
        growth: "+33%",
        drivers: ["Consumer Desire", "IP Licensing", "High Margins"],
        businessImpact:
          "Diversify revenue base and help to offset declines in other parts of the business, such as linear TV. For brick-and-mortar developments that prove popular, revenue from ticket sales, food and beverage, merchandise and other sources can far exceed fixed costs.",
      },
      {
        id: "trend_052",
        title: "AI is Ready for its Close-up",
        description:
          "The spotlight is on AI across sectors, as companies look to broaden early AI adoption into mainstream application. Traditional AI uses, including the automation of front- and back-office processes and transactions, remain high priorities for cost-conscious executives, particularly across finance, legal, IT and customer support organizations.",
        industry: "Media & Entertainment",
        process: "plan-to-fulfill",
        impact: "High",
        adoption: "64%",
        growth: "+37%",
        drivers: ["GenAI Development", "Content Production", "Cost Reduction"],
        businessImpact:
          "Maximizing AI advantage, establishing proper risk governance and controls, including fair use, safety, copyright norms and talent compensation. Executives will push AI pilot project teams to prove ROI before broad deployment.",
      },
      {
        id: "trend_053",
        title: "Are We There Yet? The Journey to Sustainable DTC Profitability",
        description:
          "If this year marked the turning point when major streaming services shifted from reporting significant quarterly losses to breaking even or better, then performance in 2025 will confirm whether the path to DTC profitability is secure.",
        industry: "Media & Entertainment",
        process: "finance-record-to-report",
        impact: "High",
        adoption: "78%",
        growth: "+19%",
        drivers: ["Advertising Sales", "Price Increases", "Content Spending"],
        businessImpact:
          "The critical question will be: how many of these scaled services can co-exist? M&E companies that do not see a way to compete with top tier players will need to move more aggressively to explore some form of streaming consolidation.",
      },
      {
        id: "trend_054",
        title: "Linear TV: Harvest or Divest",
        description:
          "Linear TV has arrived at a strategic crossroads: harvest or divest. For many years, linear TV was the dominant force in media and entertainment, but its audience and revenue have been steadily declining. Companies will be forced to make difficult decisions about the future of their linear TV assets.",
        industry: "Media & Entertainment",
        process: "lead-to-cash",
        impact: "High",
        adoption: "85%",
        growth: "+8%",
        drivers: ["Declining Audience", "Streaming Competition", "Viewing Habits"],
        businessImpact:
          "Companies will need to decide whether to continue investing in linear TV, harvest its remaining value, or divest their linear TV assets. This will lead to further consolidation in the industry and a shift towards digital-first strategies.",
      },
      {
        id: "trend_055",
        title: "The Creator Economy: Empowering the Next Generation of Storytellers",
        description:
          "The creator economy continues to grow, empowering a new generation of storytellers and content creators. We will see further growth in this area, with more individuals and small businesses creating and distributing their own content across various platforms.",
        industry: "Media & Entertainment",
        process: "recruit-to-retire",
        impact: "Medium",
        adoption: "71%",
        growth: "+26%",
        drivers: ["Content Creation Tools", "Social Media Platforms", "Diverse Content"],
        businessImpact:
          "Traditional media companies will need to adapt to this new landscape by collaborating with creators, acquiring creator-led businesses, or developing their own creator platforms. This will lead to a more fragmented and diverse media landscape.",
      },
    ]

    const allIndustries = ["All Industries", ...Array.from(new Set(industryTrendsData.map((trend) => trend.industry)))]
    const allProcesses = ["All Processes", ...Array.from(new Set(industryTrendsData.map((trend) => trend.process)))]

    const filteredTrends = industryTrendsData.filter((trend) => {
      const industryMatch = selectedIndustry === "All Industries" || trend.industry === selectedIndustry
      const processMatch = selectedProcess === "All Processes" || trend.process === selectedProcess
      return industryMatch && processMatch
    })

    const processColors = {
      "idea-to-market": "from-purple-500 to-purple-600",
      "lead-to-cash": "from-green-500 to-green-600",
      "plan-to-fulfill": "from-orange-500 to-orange-600",
      "source-to-pay": "from-blue-500 to-blue-600",
      "acquire-to-decommission": "from-red-500 to-red-600",
      "recruit-to-retire": "from-teal-500 to-teal-600",
      "finance-record-to-report": "from-indigo-500 to-indigo-600",
      governance: "from-gray-500 to-gray-600",
    }

    switch (activeSubTab) {
      case "industry-trends":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="premium-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                      {filteredTrends.length}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Active Trends
                    </p>
                  </div>
                </div>
              </div>

              <div className="premium-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                      {Math.round(
                        filteredTrends.reduce((acc, trend) => acc + Number.parseInt(trend.adoption), 0) /
                          filteredTrends.length,
                      )}
                      %
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Avg Adoption
                    </p>
                  </div>
                </div>
              </div>

              <div className="premium-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                      {allIndustries.length - 1}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Industries
                    </p>
                  </div>
                </div>
              </div>

              <div className="premium-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                      {allProcesses.length - 1}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Processes
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="premium-card p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-default)" }}>
                    Industry Trends Analysis
                  </h2>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Filter by industry and process to explore relevant trends
                  </p>
                </div>

                <div className="flex gap-3">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="px-4 py-2 rounded-lg border text-sm font-medium min-w-[180px]"
                    style={{
                      backgroundColor: "var(--surface-elev-1)",
                      borderColor: "var(--stroke-soft)",
                      color: "var(--text-default)",
                    }}
                  >
                    {allIndustries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedProcess}
                    onChange={(e) => setSelectedProcess(e.target.value)}
                    className="px-4 py-2 rounded-lg border text-sm font-medium min-w-[180px]"
                    style={{
                      backgroundColor: "var(--surface-elev-1)",
                      borderColor: "var(--stroke-soft)",
                      color: "var(--text-default)",
                    }}
                  >
                    {allProcesses.map((process) => (
                      <option key={process} value={process}>
                        {process}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {bookmarkedTrends.length > 0 && (
              <div className="premium-card p-6 space-y-4 animate-in slide-in-from-top duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <BookmarkIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                        Selected Trends ({bookmarkedTrends.length})
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        Manage priority and group by process
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookmarkedTrends([])}
                    className="px-3 py-1 text-xs rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {/* Group by process */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(
                    bookmarkedTrends.reduce(
                      (acc, trendId) => {
                        const trend = industryTrendsData.find((t) => t.id === trendId)
                        if (trend) {
                          if (!acc[trend.process]) acc[trend.process] = []
                          acc[trend.process].push(trend)
                        }
                        return acc
                      },
                      {} as Record<string, typeof industryTrendsData>,
                    ),
                  ).map(([process, trends]) => (
                    <div key={process} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                          style={{
                            background: `linear-gradient(135deg, ${processColors[process as keyof typeof processColors] || "#3b82f6"})`,
                          }}
                        >
                          {process.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                          ({trends.length})
                        </span>
                      </div>

                      <div className="space-y-2">
                        {trends.map((trend) => (
                          <div
                            key={trend.id}
                            className="p-3 rounded-lg border transition-all duration-200 hover:shadow-md animate-in fade-in duration-300"
                            style={{
                              backgroundColor: "var(--surface-elev-1)",
                              borderColor: "var(--stroke-soft)",
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="font-medium text-sm line-clamp-2 mb-1"
                                  style={{ color: "var(--text-default)" }}
                                >
                                  {trend.title}
                                </h4>
                                <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                                  {trend.industry} • {trend.adoption} adoption
                                </p>
                                <select
                                  value={trendPriorities[trend.id] || "Medium"}
                                  onChange={(e) => handleTrendPriorityChange(trend.id, e.target.value)}
                                  className="w-full px-2 py-1 text-xs border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  style={{
                                    backgroundColor: "var(--surface-elev-2)",
                                    borderColor: "var(--stroke-soft)",
                                    color: "var(--text-default)",
                                  }}
                                >
                                  <option value="High">High Priority</option>
                                  <option value="Medium">Medium Priority</option>
                                  <option value="Low">Low Priority</option>
                                </select>
                              </div>
                              <button
                                onClick={(e) => toggleTrendBookmark(trend.id, e)}
                                className="p-1 rounded hover:bg-red-100 transition-colors"
                              >
                                <X className="w-3 h-3 text-red-500" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="premium-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--stroke-soft)" }}>
                      <th
                        className="text-left py-4 px-6 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Trend
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Industry
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Process
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Metrics
                      </th>
                      <th
                        className="text-left py-4 px-4 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Impact
                      </th>
                      <th
                        className="text-center py-4 px-4 font-semibold text-sm"
                        style={{ color: "var(--text-default)" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrends.map((trend, index) => {
                      const isBookmarked = bookmarkedTrends.includes(trend.id)

                      return (
                        <tr
                          key={trend.id}
                          className="border-b transition-all duration-200 hover:bg-gradient-to-r hover:from-transparent hover:to-blue-50/30"
                          style={{ borderColor: "var(--stroke-soft)" }}
                        >
                          {/* Trend Column */}
                          <td className="py-6 px-6">
                            <div className="space-y-2">
                              <h3
                                className="font-semibold text-base leading-tight"
                                style={{ color: "var(--text-default)" }}
                              >
                                {trend.title}
                              </h3>
                              <p
                                className="text-sm leading-relaxed line-clamp-2"
                                style={{ color: "var(--text-muted)" }}
                              >
                                {trend.description}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {trend.drivers.slice(0, 2).map((driver, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 rounded-md text-xs font-medium"
                                    style={{
                                      backgroundColor: "var(--surface-elev-2)",
                                      color: "var(--text-muted)",
                                    }}
                                  >
                                    {driver}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>

                          {/* Industry Column */}
                          <td className="py-6 px-4">
                            <span
                              className="px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap inline-block"
                              style={{
                                backgroundColor: "var(--surface-elev-2)",
                                color: "var(--text-default)",
                              }}
                            >
                              {trend.industry}
                            </span>
                          </td>

                          {/* Process Column */}
                          <td className="py-6 px-4">
                            <span
                              className="px-3 py-1 rounded-lg text-sm font-medium text-white whitespace-nowrap inline-block"
                              style={{
                                background: processColors[trend.process as keyof typeof processColors]
                                  ? `linear-gradient(135deg, ${
                                      processColors[trend.process as keyof typeof processColors].includes("purple")
                                        ? "#8b5cf6, #7c3aed"
                                        : processColors[trend.process as keyof typeof processColors].includes("green")
                                          ? "#10b981, #059669"
                                          : processColors[trend.process as keyof typeof processColors].includes(
                                                "orange",
                                              )
                                            ? "#f59e0b, #d97706"
                                            : processColors[trend.process as keyof typeof processColors].includes(
                                                  "blue",
                                                )
                                              ? "#3b82f6, #2563eb"
                                              : processColors[trend.process as keyof typeof processColors].includes(
                                                    "red",
                                                  )
                                                ? "#ef4444, #dc2626"
                                                : processColors[trend.process as keyof typeof processColors].includes(
                                                      "teal",
                                                    )
                                                  ? "#14b8a6, #0d9488"
                                                  : processColors[trend.process as keyof typeof processColors].includes(
                                                        "indigo",
                                                      )
                                                    ? "#6366f1, #4f46e5"
                                                    : "#6b7280, #4b5563"
                                    })`
                                  : "linear-gradient(135deg, #6b7280, #4b5563)",
                              }}
                            >
                              {/* Use shorter process labels */}
                              {trend.process === "idea-to-market"
                                ? "I2M"
                                : trend.process === "lead-to-cash"
                                  ? "L2C"
                                  : trend.process === "plan-to-fulfill"
                                    ? "P2F"
                                    : trend.process === "source-to-pay"
                                      ? "S2P"
                                      : trend.process === "acquire-to-decommission"
                                        ? "A2D"
                                        : trend.process === "recruit-to-retire"
                                          ? "R2R"
                                          : trend.process === "finance-record-to-report"
                                            ? "F2R"
                                            : trend.process === "governance"
                                              ? "GOV"
                                              : trend.process.toUpperCase()}
                            </span>
                          </td>

                          {/* Metrics Column */}
                          <td className="py-6 px-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                                  Adoption:
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                  {trend.adoption}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                                  Growth:
                                </span>
                                <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                  {trend.growth}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Impact Column */}
                          <td className="py-6 px-4">
                            <span
                              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                                trend.impact === "High"
                                  ? "bg-red-100 text-red-800"
                                  : trend.impact === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {trend.impact}
                            </span>
                          </td>

                          {/* Actions Column */}
                          <td className="py-6 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={(e) => toggleTrendBookmark(trend.id, e)}
                                className={`p-2 rounded-lg transition-all duration-200 ${
                                  isBookmarked
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                                    : "hover:bg-gray-100"
                                }`}
                                title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                              >
                                <BookmarkIcon
                                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                                  style={{ color: isBookmarked ? "white" : "var(--text-muted)" }}
                                />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Share trend"
                              >
                                <Share className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                              </button>
                              <button
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Download trend data"
                              >
                                <Download className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredTrends.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium mb-2" style={{ color: "var(--text-default)" }}>
                  No trends found
                </p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        )

      case "pain-point-canvas":
        const processOrder = ["s2p", "l2c", "p2f", "a2d", "r2r", "i2m", "fin", "gov"]
        
        // Filter pain points based on selected industry
        const filteredPainPoints = selectedIndustry === "All Industries" 
          ? PAIN_POINTS_DATA 
          : PAIN_POINTS_DATA.filter((painPoint) => 
              painPoint.industries.some(ind => 
                ind.toLowerCase() === selectedIndustry.toLowerCase() ||
                ind.toLowerCase().includes(selectedIndustry.toLowerCase()) ||
                selectedIndustry.toLowerCase().includes(ind.toLowerCase())
              )
            )
        
        // Debug logging
        console.log("Selected Industry:", selectedIndustry)
        console.log("Total Pain Points:", PAIN_POINTS_DATA.length)
        console.log("Filtered Pain Points:", filteredPainPoints.length)
        console.log("Utilities Pain Points:", PAIN_POINTS_DATA.filter(pp => pp.industries.includes("Utilities")).length)
        console.log("Telecommunications Pain Points:", PAIN_POINTS_DATA.filter(pp => pp.industries.includes("Telecommunications")).length)
        
        const selectedCount = selectedPainPoints.length
        const totalCount = filteredPainPoints.length

        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold" style={{ color: "var(--brand-navy-900)" }}>
                Pain Point Canvas
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Identify and prioritize business pain points across key processes
              </p>
            </div>

            {/* Industry Filter */}
            <div className="bg-white rounded-2xl border shadow-sm p-6" style={{ borderColor: "var(--border)" }}>
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                  Industry
                </label>
                <div className="relative">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    style={{ borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: "var(--text-muted)" }} />
                </div>
              </div>
              
              {/* Debug Info */}
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs">
                <div><strong>Selected Industry:</strong> {selectedIndustry}</div>
                <div><strong>Total Pain Points:</strong> {PAIN_POINTS_DATA.length}</div>
                <div><strong>Filtered Pain Points:</strong> {filteredPainPoints.length}</div>
                <div><strong>Utilities Count:</strong> {PAIN_POINTS_DATA.filter(pp => pp.industries.includes("Utilities")).length}</div>
                <div><strong>Telecommunications Count:</strong> {PAIN_POINTS_DATA.filter(pp => pp.industries.includes("Telecommunications")).length}</div>
              </div>
            </div>

            {/* Pain Point Canvas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {processOrder.map((processKey) => {
                const processConfig = PROCESS_CONFIG[processKey]
                const processPainPoints = filteredPainPoints.filter((pp) => pp.process === processKey)

                return (
                  <div key={processKey} className="flex flex-col h-full">
                    {/* Process Header */}
                    <div
                      className="rounded-2xl p-6 transition-all duration-200 mb-4"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${processConfig.color}`}
                        >
                          {processConfig.shortLabel}
                        </span>
                      </div>
                      <h4 className="font-semibold text-lg" style={{ color: "var(--text)" }}>
                        {processConfig.label}
                      </h4>
                    </div>

                    {/* Pain Point Cards */}
                    <div className="flex flex-col gap-4 flex-1">
                      {processPainPoints.map((painPoint) => {
                        const isSelected = selectedPainPoints.includes(painPoint.id)
                        const selectedPriority = selectedPriorities[painPoint.id] || painPoint.priority

                        return (
                          <div
                            key={painPoint.id}
                            className="rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col"
                            style={{
                              backgroundColor: isSelected ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.8)",
                              backdropFilter: "blur(10px)",
                              border: isSelected
                                ? "1px solid rgba(59, 130, 246, 0.3)"
                                : "1px solid rgba(255, 255, 255, 0.2)",
                              boxShadow: isSelected
                                ? "0 8px 25px -5px rgba(59, 130, 246, 0.2)"
                                : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                              height: "400px" // Exact fixed height for all cards
                            }}
                            onClick={() => togglePainPointSelection(painPoint.id)}
                          >
                            {/* Header with process label and checkbox - fixed height */}
                            <div className="flex items-center justify-between mb-4 h-8 flex-shrink-0">
                              <span
                                className={`px-3 py-1 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${processConfig.color}`}
                              >
                                {processConfig.shortLabel}
                              </span>
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                  isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300"
                                }`}
                              >
                                {isSelected && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>

                            {/* Title - flexible height */}
                            <div className="mb-4 flex-shrink-0">
                              <h3
                                className="font-semibold text-lg leading-tight"
                                style={{ color: "var(--text)" }}
                              >
                                {painPoint.title}
                              </h3>
                            </div>

                            {/* Description - flexible height */}
                            <div className="mb-4 flex-1">
                              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                {painPoint.description}
                              </p>
                            </div>

                            {/* Industry tags - flexible height */}
                            <div className="mb-4 flex-shrink-0">
                              <div className="flex flex-wrap gap-1 items-center">
                                {painPoint.industries.slice(0, 2).map((industry) => (
                                  <span
                                    key={industry}
                                    className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Priority selector - flexible height at bottom */}
                            <div className="flex-shrink-0 mt-auto">
                              <label
                                className="text-xs font-medium mb-2 block"
                                style={{ color: "var(--text-muted)" }}
                              >
                                Business Impact Priority
                              </label>
                              <select
                                value={selectedPriority}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  handlePriorityChange(painPoint.id, e.target.value)
                                }}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                              </select>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Summary Section */}
            {selectedCount > 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-lg mb-4" style={{ color: "var(--brand-navy-900)" }}>
                  Selected Pain Points Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {["Critical", "High", "Medium", "Low"].map((priority) => {
                    const count = selectedPainPoints.filter(
                      (id) =>
                        (selectedPriorities[id] || PAIN_POINTS_DATA.find((pp) => pp.id === id)?.priority) === priority,
                    ).length

                    return (
                      <div key={priority} className="text-center p-3 bg-white rounded-lg border">
                        <div
                          className={`text-2xl font-bold ${
                            priority === "Critical"
                              ? "text-red-800"
                              : priority === "High"
                                ? "text-red-600"
                                : priority === "Medium"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                          }`}
                        >
                          {count}
                        </div>
                        <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                          {priority} Priority
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )

      case "strategic-initiatives":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockInitiatives.map((initiative) => (
                <div key={initiative.id} className="premium-card p-4 space-y-3">
                  <h4 className="font-semibold mb-2" style={{ color: "var(--brand-navy-900)" }}>
                    {initiative.title}
                  </h4>
                  <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                    {initiative.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        initiative.speed === "fast" ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {initiative.speed === "fast" ? "Fast Lane" : "Core"}
                    </span>
                    <span style={{ color: "var(--text-primary)" }}>{initiative.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case "solution-canvas":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--brand-navy-900)" }}>
                Solution Canvas
              </h3>
              <p className="text-lg" style={{ color: "var(--text-primary)" }}>
                Design and evaluate solution approaches for identified pain points and strategic initiatives
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Solution Options */}
              <div className="space-y-6">
                <h4 className="font-semibold text-lg" style={{ color: "var(--brand-navy-900)" }}>
                  Solution Options
                </h4>
                
                <div className="space-y-4">
                  <div className="premium-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">1</span>
                      </div>
                      <h5 className="font-semibold" style={{ color: "var(--brand-navy-900)" }}>
                        AI-Powered Automation
                      </h5>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                      Implement intelligent automation for manual processes using AI and machine learning.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">High Impact</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Fast Lane</span>
                    </div>
                  </div>

                  <div className="premium-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-bold">2</span>
                      </div>
                      <h5 className="font-semibold" style={{ color: "var(--brand-navy-900)" }}>
                        Cloud Migration
                      </h5>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                      Modernize infrastructure by migrating legacy systems to cloud platforms.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800">Medium Impact</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Core</span>
                    </div>
                  </div>

                  <div className="premium-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <span className="text-purple-600 font-bold">3</span>
                      </div>
                      <h5 className="font-semibold" style={{ color: "var(--brand-navy-900)" }}>
                        Process Redesign
                      </h5>
                    </div>
                    <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                      Redesign business processes to eliminate inefficiencies and improve customer experience.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Medium Impact</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Fast Lane</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Matrix */}
              <div className="space-y-6">
                <h4 className="font-semibold text-lg" style={{ color: "var(--brand-navy-900)" }}>
                  Evaluation Matrix
                </h4>
                
                <div className="premium-card p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                          <th className="text-left py-2" style={{ color: "var(--text)" }}>Solution</th>
                          <th className="text-left py-2" style={{ color: "var(--text)" }}>ROI</th>
                          <th className="text-left py-2" style={{ color: "var(--text)" }}>Complexity</th>
                          <th className="text-left py-2" style={{ color: "var(--text)" }}>Timeline</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                          <td className="py-2" style={{ color: "var(--text)" }}>AI Automation</td>
                          <td className="py-2 text-green-600 font-medium">High</td>
                          <td className="py-2 text-orange-600 font-medium">Medium</td>
                          <td className="py-2" style={{ color: "var(--text)" }}>6-12 months</td>
                        </tr>
                        <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                          <td className="py-2" style={{ color: "var(--text)" }}>Cloud Migration</td>
                          <td className="py-2 text-blue-600 font-medium">Medium</td>
                          <td className="py-2 text-red-600 font-medium">High</td>
                          <td className="py-2" style={{ color: "var(--text)" }}>12-18 months</td>
                        </tr>
                        <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                          <td className="py-2" style={{ color: "var(--text)" }}>Process Redesign</td>
                          <td className="py-2 text-green-600 font-medium">High</td>
                          <td className="py-2 text-green-600 font-medium">Low</td>
                          <td className="py-2" style={{ color: "var(--text)" }}>3-6 months</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="premium-card p-4">
                  <h5 className="font-semibold mb-3" style={{ color: "var(--brand-navy-900)" }}>
                    Recommendation
                  </h5>
                  <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>
                    Based on the evaluation, <strong>Process Redesign</strong> offers the best balance of high impact, 
                    low complexity, and fast implementation timeline.
                  </p>
                  <button className="w-full px-4 py-2 rounded-lg font-medium transition-colors"
                    style={{
                      background: "var(--grad-cta)",
                      color: "white",
                    }}>
                    Create Solution Roadmap
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case "requirements":
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--brand-navy-900)" }}>
                Requirements Gathering
              </h3>
              <p className="text-lg" style={{ color: "var(--text-primary)" }}>
                Discovery, KPIs, and strategy—then auto-generate your Vision pack
              </p>
            </div>

            <div className="space-y-6">
              {/* Run Agent Section */}
              <div className="flex justify-between items-center p-4 rounded-lg border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                <div>
                  <h3 className="font-semibold text-lg mb-2" style={{ color: "var(--text)" }}>
                    Run Agent
                  </h3>
                  <p style={{ color: "var(--text-muted)" }}>
                    Automate requirements gathering and analysis
                  </p>
                </div>
                <button
                  className="px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                  style={{ background: "var(--grad-primary)" }}
                >
                  Run Agent
                </button>
              </div>

              {/* Requirements Gathering Methods */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Surveys */}
                <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                    Surveys (Native)
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Design → Distribute → Analyze & Map
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Build custom surveys with AI assistance for comprehensive requirements gathering
                  </p>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Responses:</span>
                    <span style={{ color: "var(--text)" }}>3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Completion:</span>
                    <span style={{ color: "var(--text)" }}>127</span>
                  </div>
                </div>

                {/* Executive Interviews */}
                <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                    Executive Interviews
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Prepare → Run → Summarize → Synthesize
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    4-step workspace for conducting structured executive interviews
                  </p>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Interviews:</span>
                    <span style={{ color: "var(--text)" }}>12/20</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Coverage:</span>
                    <span style={{ color: "var(--text)" }}>92%</span>
                  </div>
                </div>

                {/* Stakeholder Mapping */}
                <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                    Stakeholder Mapping
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    RACI + Influence Analysis
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Agent proposes stakeholders and maps their roles and influence
                  </p>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Stakeholders:</span>
                    <span style={{ color: "var(--text)" }}>18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Coverage:</span>
                    <span style={{ color: "var(--text)" }}>92%</span>
                  </div>
                </div>

                {/* Workshop Mode */}
                <div className="p-6 rounded-xl border" style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                    Workshop Mode
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    North Star Board
                  </p>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Premium sticky-wall experience for collaborative requirements workshops
                  </p>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Workshops:</span>
                    <span style={{ color: "var(--text)" }}>24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--text-muted)" }}>Success:</span>
                    <span style={{ color: "var(--text)" }}>85%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {renderSubContent()}
      {selectedFragment && renderInspectorPanel()}
    </div>
  )
}
