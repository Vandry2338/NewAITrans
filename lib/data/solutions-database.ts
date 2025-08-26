// Solutions Database - Local store of SAP and Infosys accelerators, use cases, and solutions

export interface Solution {
  id: number
  title: string
  description: string
  tags: string[]
  domain: string // Business domain like "Lead to Cash", "Plan to Fulfill", etc.
  capability: string // Specific capability within domain
  complexity: number // 1-10 scale (10 = highest complexity)
  impact: number // 1-10 scale (10 = highest impact)
  duration: number // Implementation duration in weeks
  kpiIds: string[]
  initiativeIds: string[]
  painPointIds: string[]
  category: 'SAP' | 'Infosys' | 'Custom' | 'Partner'
  roi: number // Expected ROI multiplier (e.g., 2.5 = 250% ROI)
  confidence: number // 1-10 confidence in success
  caseStudyUrl?: string
  brief: string // Detailed description for solution brief
}

export const solutionsDatabase: Solution[] = [
  // SAP Solutions
  {
    id: 1,
    title: "SAP S/4HANA Cloud for Finance",
    description: "Modern finance processes with real-time insights and automated workflows",
    tags: ["finance", "erp", "cloud", "automation", "real-time"],
    domain: "Record to Report",
    capability: "Financial Management",
    complexity: 8,
    impact: 9,
    duration: 24,
    kpiIds: ["financial-close-time", "audit-compliance", "reporting-accuracy"],
    initiativeIds: ["fin-1", "fin-2"],
    painPointIds: ["manual-finance", "compliance-gaps"],
    category: "SAP",
    roi: 3.2,
    confidence: 9,
    brief: "Transform finance operations with intelligent automation, real-time financial insights, and built-in compliance. Reduces financial close time by 50% and improves audit readiness."
  },
  {
    id: 2,
    title: "SAP Ariba for Procurement",
    description: "End-to-end procurement solution with supplier collaboration",
    tags: ["procurement", "supplier", "sourcing", "spend-management"],
    domain: "Source to Pay",
    capability: "Procurement Management",
    complexity: 6,
    impact: 8,
    duration: 16,
    kpiIds: ["procurement-savings", "supplier-performance", "contract-compliance"],
    initiativeIds: ["const-1"],
    painPointIds: ["supplier-issues", "procurement-inefficiency"],
    category: "SAP",
    roi: 2.8,
    confidence: 8,
    brief: "Streamline procurement with automated sourcing, contract management, and supplier collaboration. Achieves 15-20% cost savings through better spend visibility and supplier negotiations."
  },
  {
    id: 3,
    title: "SAP SuccessFactors HCM",
    description: "Comprehensive human capital management in the cloud",
    tags: ["hr", "talent", "performance", "recruitment", "cloud"],
    domain: "Recruit to Retire",
    capability: "Human Resources",
    complexity: 7,
    impact: 8,
    duration: 20,
    kpiIds: ["employee-satisfaction", "retention-rate", "time-to-hire"],
    initiativeIds: ["const-1", "mfg-1"],
    painPointIds: ["talent-shortage", "hr-inefficiencies"],
    category: "SAP",
    roi: 2.5,
    confidence: 8,
    brief: "Modernize HR with AI-driven talent management, performance optimization, and employee experience. Improves retention by 25% and reduces time-to-hire by 40%."
  },
  {
    id: 4,
    title: "SAP Customer Experience Suite",
    description: "Integrated customer experience across sales, service, and marketing",
    tags: ["crm", "customer-experience", "sales", "marketing", "service"],
    domain: "Lead to Cash",
    capability: "Customer Relationship Management",
    complexity: 7,
    impact: 9,
    duration: 18,
    kpiIds: ["customer-satisfaction", "sales-conversion", "customer-retention"],
    initiativeIds: ["fin-1", "retail-1"],
    painPointIds: ["customer-experience", "sales-inefficiency"],
    category: "SAP",
    roi: 3.5,
    confidence: 8,
    brief: "Deliver exceptional customer experiences with unified sales, marketing, and service processes. Increases customer satisfaction by 30% and improves sales conversion by 25%."
  },
  {
    id: 5,
    title: "SAP Integrated Business Planning",
    description: "Real-time planning and forecasting across the enterprise",
    tags: ["planning", "forecasting", "supply-chain", "demand", "analytics"],
    domain: "Plan to Fulfill",
    capability: "Supply Chain Planning",
    complexity: 8,
    impact: 8,
    duration: 22,
    kpiIds: ["forecast-accuracy", "inventory-turnover", "service-level"],
    initiativeIds: ["mfg-1", "retail-1"],
    painPointIds: ["demand-forecasting", "inventory-optimization"],
    category: "SAP",
    roi: 2.7,
    confidence: 7,
    brief: "Optimize planning with AI-powered demand sensing and integrated business planning. Improves forecast accuracy by 35% and reduces inventory costs by 20%."
  },

  // Infosys Solutions
  {
    id: 6,
    title: "Infosys Helix for Customer Intelligence",
    description: "AI-powered customer analytics and personalization platform",
    tags: ["ai", "analytics", "customer", "personalization", "machine-learning"],
    domain: "Lead to Cash",
    capability: "Customer Analytics",
    complexity: 6,
    impact: 8,
    duration: 12,
    kpiIds: ["customer-engagement", "personalization-score", "campaign-effectiveness"],
    initiativeIds: ["fin-1", "retail-1", "tech-1"],
    painPointIds: ["customer-insights", "personalization"],
    category: "Infosys",
    roi: 3.0,
    confidence: 8,
    brief: "Transform customer experience with AI-driven insights and personalization. Increases customer engagement by 40% and improves campaign effectiveness by 60%."
  },
  {
    id: 7,
    title: "Infosys Live Enterprise Suite",
    description: "Cloud-native platform for real-time business operations",
    tags: ["cloud-native", "real-time", "microservices", "api", "integration"],
    domain: "Enterprise Architecture",
    capability: "Platform Modernization",
    complexity: 9,
    impact: 9,
    duration: 36,
    kpiIds: ["system-availability", "response-time", "scalability"],
    initiativeIds: ["tech-1", "fin-2"],
    painPointIds: ["legacy-systems", "scalability-issues"],
    category: "Infosys",
    roi: 4.0,
    confidence: 7,
    brief: "Build a future-ready enterprise with cloud-native architecture, real-time data processing, and seamless integration. Reduces operational costs by 30% and improves agility."
  },
  {
    id: 8,
    title: "Infosys Procurement Transformation",
    description: "AI-driven procurement optimization and supplier management",
    tags: ["procurement", "ai", "optimization", "supplier", "automation"],
    domain: "Source to Pay",
    capability: "Procurement Optimization",
    complexity: 5,
    impact: 7,
    duration: 14,
    kpiIds: ["procurement-savings", "supplier-performance", "process-efficiency"],
    initiativeIds: ["const-2", "mfg-1"],
    painPointIds: ["procurement-inefficiency", "supplier-issues"],
    category: "Infosys",
    roi: 2.3,
    confidence: 8,
    brief: "Optimize procurement through AI-powered spend analytics, automated sourcing, and intelligent supplier management. Achieves 12-18% cost savings and improves process efficiency by 45%."
  },
  {
    id: 9,
    title: "Infosys Manufacturing Intelligence",
    description: "IoT-enabled smart manufacturing and predictive maintenance",
    tags: ["iot", "manufacturing", "predictive", "maintenance", "quality"],
    domain: "Plan to Fulfill",
    capability: "Manufacturing Operations",
    complexity: 7,
    impact: 8,
    duration: 20,
    kpiIds: ["equipment-efficiency", "quality-score", "downtime-reduction"],
    initiativeIds: ["mfg-1"],
    painPointIds: ["equipment-downtime", "quality-issues"],
    category: "Infosys",
    roi: 3.1,
    confidence: 8,
    brief: "Transform manufacturing with IoT sensors, predictive analytics, and quality management. Reduces unplanned downtime by 40% and improves overall equipment effectiveness by 25%."
  },
  {
    id: 10,
    title: "Infosys Cybersecurity Suite",
    description: "Comprehensive cybersecurity with AI-powered threat detection",
    tags: ["cybersecurity", "ai", "threat-detection", "compliance", "monitoring"],
    domain: "Enterprise Security",
    capability: "Security Management",
    complexity: 6,
    impact: 9,
    duration: 16,
    kpiIds: ["security-incidents", "compliance-score", "threat-response-time"],
    initiativeIds: ["fin-2", "health-1"],
    painPointIds: ["cyber-threats", "compliance-gaps"],
    category: "Infosys",
    roi: 2.8,
    confidence: 8,
    brief: "Protect enterprise assets with AI-powered threat detection, automated response, and compliance management. Reduces security incidents by 60% and improves compliance posture."
  },

  // Quick Win Solutions
  {
    id: 11,
    title: "Automated Invoice Processing",
    description: "AI-powered invoice automation for accounts payable",
    tags: ["automation", "ai", "invoice", "accounts-payable", "ocr"],
    domain: "Source to Pay",
    capability: "Invoice Management",
    complexity: 3,
    impact: 7,
    duration: 8,
    kpiIds: ["invoice-processing-time", "accuracy-rate", "cost-per-invoice"],
    initiativeIds: ["fin-1"],
    painPointIds: ["manual-invoice", "processing-delays"],
    category: "Custom",
    roi: 2.2,
    confidence: 9,
    brief: "Automate invoice processing with OCR and AI validation. Reduces processing time by 70% and improves accuracy to 99%+. Quick implementation with immediate ROI."
  },
  {
    id: 12,
    title: "Employee Self-Service Portal",
    description: "Modern employee portal for HR services and information",
    tags: ["employee", "self-service", "hr", "portal", "mobile"],
    domain: "Recruit to Retire",
    capability: "Employee Experience",
    complexity: 4,
    impact: 6,
    duration: 10,
    kpiIds: ["employee-satisfaction", "hr-efficiency", "self-service-adoption"],
    initiativeIds: ["const-1"],
    painPointIds: ["hr-inefficiencies", "employee-experience"],
    category: "Custom",
    roi: 1.8,
    confidence: 9,
    brief: "Empower employees with self-service capabilities for common HR tasks. Reduces HR workload by 40% and improves employee satisfaction scores."
  },
  {
    id: 13,
    title: "Real-time Dashboard Suite",
    description: "Executive dashboards with real-time KPI monitoring",
    tags: ["dashboard", "real-time", "kpi", "analytics", "visualization"],
    domain: "Enterprise Analytics",
    capability: "Performance Management",
    complexity: 4,
    impact: 7,
    duration: 6,
    kpiIds: ["decision-making-speed", "data-visibility", "executive-efficiency"],
    initiativeIds: ["fin-1", "tech-1"],
    painPointIds: ["data-visibility", "reporting-delays"],
    category: "Custom",
    roi: 2.0,
    confidence: 9,
    brief: "Provide executives with real-time visibility into key business metrics. Improves decision-making speed by 50% and enhances operational visibility."
  },
  {
    id: 14,
    title: "Mobile Customer App",
    description: "Native mobile app for customer engagement and self-service",
    tags: ["mobile", "customer", "engagement", "self-service", "app"],
    domain: "Lead to Cash",
    capability: "Customer Engagement",
    complexity: 5,
    impact: 8,
    duration: 12,
    kpiIds: ["customer-engagement", "mobile-adoption", "service-requests"],
    initiativeIds: ["retail-1", "health-1"],
    painPointIds: ["customer-experience", "service-access"],
    category: "Custom",
    roi: 2.4,
    confidence: 8,
    brief: "Enhance customer experience with a modern mobile app offering self-service capabilities. Increases customer engagement by 45% and reduces service call volume by 30%."
  },
  {
    id: 15,
    title: "Predictive Analytics Platform",
    description: "Machine learning platform for business forecasting and insights",
    tags: ["machine-learning", "predictive", "analytics", "forecasting", "ai"],
    domain: "Enterprise Analytics",
    capability: "Predictive Analytics",
    complexity: 7,
    impact: 9,
    duration: 18,
    kpiIds: ["forecast-accuracy", "prediction-value", "analytical-maturity"],
    initiativeIds: ["tech-1", "retail-1", "mfg-1"],
    painPointIds: ["forecasting-accuracy", "data-insights"],
    category: "Custom",
    roi: 3.8,
    confidence: 7,
    brief: "Leverage machine learning for accurate business forecasting and predictive insights. Improves forecast accuracy by 40% and enables proactive decision-making."
  }
]

// Business domains for radar chart axes
export const businessDomains = [
  "Lead to Cash",
  "Source to Pay", 
  "Plan to Fulfill",
  "Recruit to Retire",
  "Record to Report",
  "Enterprise Architecture",
  "Enterprise Security",
  "Enterprise Analytics"
]

// Confidence rings for radar chart
export const confidenceRings = [
  { name: "Core", description: "High confidence, immediate value", threshold: 8 },
  { name: "Adjacent", description: "Promising, needs validation", threshold: 6 },
  { name: "Frontier", description: "Experimental, long-term", threshold: 0 }
]
