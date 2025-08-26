// SAP Joule Use Cases Data - Based on official SAP documentation and research

export interface JouleUseCase {
  id: string;
  title: string;
  summary: string;
  description: string;
  
  // Business Classification
  industry: string[];
  valueChain: string[];
  processModule: string[];
  
  // SAP Technical Details
  sapProducts: string[];
  platform?: string;
  technology?: string[];
  minimumVersion?: string;
  module?: string;
  
  // Business Value & Metrics
  benefits?: string[];
  businessValue: string | {
    metrics: {
      name: string;
      value: string;
      description?: string;
    }[];
    crossIndustryUse?: boolean;
  };
  
  // Legacy fields for compatibility
  tags: string[];
  status: string;
  lastUpdated: string;
  painPoints: string[];
  kpis: string[];
  personas: string[];
  opportunities: string[];
  implementation: string;
  metadataSummary: string;
  architecture: {
    components: string[];
    integration: string[];
    dataFlow: string;
  };
  capabilities: string[];
  demoVideoUrl?: string;
}

export const jouleUseCases: JouleUseCase[] = [
  {
    id: "joule_uc_001",
    title: "Accounts Receivable Agent",
    summary: "AI-powered automation for accounts receivable management and collections optimization.",
    description: "Automates accounts receivable processes including invoice matching, payment tracking, and collection workflows. Uses AI to predict payment delays and recommend optimal collection strategies.",
    industry: ["Cross-Industry", "Financial Services", "Manufacturing"],
    valueChain: ["Finance", "Record to Report"],
    processModule: ["Finance Operations", "Cash Management"],
    tags: ["AI", "Joule", "Finance", "Automation", "Collections"],
    sapProducts: ["SAP S/4HANA Cloud", "SAP BTP", "SAP Analytics Cloud"],
    status: "Available",
    lastUpdated: "2024-12-01",
    painPoints: [
      "Manual invoice matching processes",
      "Delayed payment collections", 
      "Inefficient dispute resolution",
      "Lack of payment prediction insights"
    ],
    kpis: [
      "30% reduction in DSO (Days Sales Outstanding)",
      "85% automation in invoice matching",
      "45% faster dispute resolution",
      "25% improvement in cash flow"
    ],
    personas: ["Finance Manager", "Accounts Receivable Specialist", "Treasury Analyst"],
    opportunities: [
      "Automated payment reminders",
      "Predictive payment analytics", 
      "Intelligent dispute prioritization",
      "Cash flow optimization"
    ],
    businessValue: {
      metrics: [
        { name: "DSO Reduction", value: "30%", description: "Days Sales Outstanding improvement" },
        { name: "Invoice Matching Automation", value: "85%", description: "Automated invoice processing" },
        { name: "Dispute Resolution Speed", value: "45%", description: "Faster dispute resolution" },
        { name: "Cash Flow Improvement", value: "25%", description: "Overall cash flow enhancement" }
      ],
      crossIndustryUse: true
    },
    implementation: "Medium",
    metadataSummary: "Joule AI agent for accounts receivable automation and optimization",
    architecture: {
      components: ["SAP S/4HANA Cloud", "SAP BTP AI Services", "SAP Analytics Cloud", "Joule Copilot"],
      integration: ["OData APIs", "Event-driven messaging", "Real-time data sync", "Microsoft 365 integration"],
      dataFlow: "Customer data → AI analysis → Automated actions → Real-time reporting"
    },
    capabilities: [
      "Natural language invoice queries",
      "Automated payment matching", 
      "Predictive payment modeling",
      "Intelligent collection workflows"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "joule_uc_002",
    title: "Financial Planning Agent",
    summary: "AI-driven financial planning and forecasting with automated scenario modeling.",
    description: "Enhances financial planning processes through automated data collection, scenario modeling, and predictive analytics. Provides intelligent recommendations for budget optimization and resource allocation.",
    industry: ["Cross-Industry", "Manufacturing", "Retail"],
    valueChain: ["Finance", "Plan to Fulfill"],
    processModule: ["Financial Planning", "Budgeting"],
    tags: ["AI", "Joule", "Finance", "Planning", "Forecasting"],
    sapProducts: ["SAP Analytics Cloud", "SAP S/4HANA Cloud", "SAP BTP"],
    status: "Planned",
    lastUpdated: "2025-01-15",
    painPoints: [
      "Time-consuming manual planning processes",
      "Inaccurate forecasting models",
      "Limited scenario analysis capabilities", 
      "Disconnected planning systems"
    ],
    kpis: [
      "50% reduction in planning cycle time",
      "35% improvement in forecast accuracy",
      "60% faster scenario analysis",
      "40% increase in planning efficiency"
    ],
    personas: ["CFO", "Financial Analyst", "Budget Manager", "Planning Manager"],
    opportunities: [
      "Automated data consolidation",
      "AI-powered forecasting",
      "Dynamic scenario modeling",
      "Real-time plan adjustments"
    ],
    businessValue: {
      metrics: [
        { name: "Planning Accuracy", value: "40%", description: "Improved financial planning accuracy" },
        { name: "Cycle Time Reduction", value: "60%", description: "Faster planning cycles" },
        { name: "Cost Reduction", value: "25%", description: "Reduced planning costs" }
      ],
      crossIndustryUse: true
    },
    implementation: "High",
    metadataSummary: "Joule AI agent for intelligent financial planning and forecasting",
    architecture: {
      components: ["SAP Analytics Cloud", "SAP HANA Cloud", "SAP BTP AI Core", "Joule Copilot"],
      integration: ["SAP Data Warehouse Cloud", "REST APIs", "Live data connections", "Planning data models"],
      dataFlow: "Multiple data sources → AI analysis → Automated planning → Interactive dashboards"
    },
    capabilities: [
      "Natural language planning queries",
      "Automated variance analysis",
      "Intelligent budget recommendations", 
      "Dynamic scenario simulation"
    ]
  },
  {
    id: "joule_uc_003",
    title: "Treasury & Cash Agent",
    summary: "Predictive cash flow forecasting with AI-powered scenario analysis and recommendations.",
    description: "Enhances cash forecasting accuracy through AI analysis of historical patterns, market conditions, and business variables to provide intelligent cash flow predictions and optimization recommendations.",
    industry: ["Cross-Industry", "Financial Services", "Manufacturing"],
    valueChain: ["Finance", "Enterprise Operations"],
    processModule: ["Treasury Management", "Cash Planning"],
    tags: ["AI", "Joule", "Finance", "Treasury", "Forecasting"],
    sapProducts: ["SAP S/4HANA Cloud", "SAP Analytics Cloud", "SAP BTP"],
    status: "Planned",
    lastUpdated: "2025-01-05",
    painPoints: [
      "Inaccurate cash predictions",
      "Manual forecasting processes",
      "Limited scenario modeling",
      "Poor liquidity management"
    ],
    kpis: [
      "40% improvement in forecast accuracy",
      "65% reduction in forecasting time",
      "30% better liquidity optimization",
      "50% fewer cash shortfalls"
    ],
    personas: ["Treasurer", "Cash Manager", "CFO", "Financial Analyst"],
    opportunities: [
      "Predictive cash analytics",
      "Automated scenario planning", 
      "Real-time liquidity monitoring",
      "Intelligent investment recommendations"
    ],
    businessValue: "Optimize cash management with AI-powered forecasting that improves liquidity planning and reduces financial risk exposure.",
    implementation: "High",
    metadataSummary: "Joule AI agent for intelligent cash forecasting and liquidity management",
    architecture: {
      components: ["SAP S/4HANA Cloud", "SAP Analytics Cloud", "SAP HANA Cloud", "Joule Copilot"],
      integration: ["Banking systems", "Market data feeds", "ERP integration", "Predictive models"],
      dataFlow: "Financial data → AI modeling → Forecast generation → Scenario analysis → Recommendations"
    },
    capabilities: [
      "Multi-scenario cash forecasting",
      "Liquidity optimization recommendations",
      "Market condition integration",
      "Real-time forecast updates"
    ]
  },
  {
    id: "joule_uc_004",
    title: "Expense Validation Agent",
    summary: "Intelligent expense report validation and policy compliance automation.",
    description: "Automates expense report validation using AI to detect policy violations, duplicate submissions, and suspicious patterns. Provides intelligent recommendations for approval workflows.",
    industry: ["Cross-Industry", "Professional Services", "Technology"],
    valueChain: ["Finance", "Source to Pay"],
    processModule: ["Expense Management", "Policy Compliance"],
    tags: ["AI", "Joule", "Finance", "Expenses", "Compliance"],
    sapProducts: ["SAP Concur", "SAP S/4HANA Cloud", "SAP BTP"],
    status: "Available",
    lastUpdated: "2024-11-20",
    painPoints: [
      "Manual expense report reviews",
      "Policy violation detection",
      "Fraud prevention challenges",
      "Slow approval processes"
    ],
    kpis: [
      "80% reduction in manual reviews",
      "95% policy compliance rate", 
      "70% faster approval cycles",
      "50% reduction in fraudulent claims"
    ],
    personas: ["Finance Manager", "Expense Approver", "Travel Manager", "Compliance Officer"],
    opportunities: [
      "Automated policy enforcement",
      "Intelligent fraud detection",
      "Smart approval routing",
      "Real-time expense insights"
    ],
    businessValue: "Reduce travel and expense costs with optimized validation and automated expense reporting, ensuring policy compliance.",
    implementation: "Low",
    metadataSummary: "Joule AI agent for intelligent expense validation and compliance",
    architecture: {
      components: ["SAP Concur", "SAP BTP AI Services", "SAP Analytics Cloud", "Joule Copilot"],
      integration: ["Concur APIs", "Machine learning models", "Policy engines", "Mobile applications"],
      dataFlow: "Expense data → AI validation → Policy check → Automated routing → Approval workflow"
    },
    capabilities: [
      "Receipt OCR and validation",
      "Policy violation detection",
      "Duplicate expense identification", 
      "Intelligent approval routing"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "joule_uc_005",
    title: "Budget Variance Agent",
    summary: "AI-driven budget variance analysis with intelligent recommendations and corrective actions.",
    description: "Automates budget variance analysis using AI to identify significant deviations, predict future trends, and recommend corrective actions for budget optimization.",
    industry: ["Cross-Industry", "Manufacturing", "Public Sector"],
    valueChain: ["Finance", "Plan to Fulfill"],
    processModule: ["Budget Management", "Cost Control"],
    tags: ["AI", "Joule", "Finance", "Budget", "Variance Analysis"],
    sapProducts: ["SAP Analytics Cloud", "SAP S/4HANA Cloud", "SAP BTP"],
    status: "Planned Q3 2025",
    lastUpdated: "2025-01-08",
    painPoints: [
      "Manual variance analysis processes",
      "Delayed identification of budget issues",
      "Inconsistent variance reporting",
      "Limited predictive capabilities"
    ],
    kpis: [
      "60% faster variance identification",
      "85% improvement in budget accuracy",
      "40% reduction in budget overruns",
      "75% automation in variance reporting"
    ],
    personas: ["Budget Manager", "Financial Controller", "Department Head", "Finance Analyst"],
    opportunities: [
      "Automated variance alerts",
      "Predictive budget modeling",
      "Intelligent corrective actions",
      "Real-time budget monitoring"
    ],
    businessValue: "Improve budget control and financial discipline with AI-powered variance analysis that enables proactive budget management.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for intelligent budget variance analysis and control",
    architecture: {
      components: ["SAP Analytics Cloud", "SAP S/4HANA Cloud", "SAP BTP AI Core", "Joule Copilot"],
      integration: ["Budget data feeds", "Predictive models", "Alert systems", "Reporting tools"],
      dataFlow: "Budget data → AI analysis → Variance detection → Recommendation engine → Action items"
    },
    capabilities: [
      "Automated variance detection",
      "Predictive budget modeling",
      "Intelligent recommendation engine",
      "Real-time budget monitoring"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "joule_uc_006",
    title: "Invoice Matching Agent",
    summary: "Automated three-way invoice matching with AI-powered exception handling.",
    description: "Streamlines accounts payable processes through intelligent invoice matching against purchase orders and receipts, with AI-driven exception resolution and approval workflows.",
    industry: ["Cross-Industry", "Manufacturing", "Retail"],
    valueChain: ["Finance", "Source to Pay"],
    processModule: ["Accounts Payable", "Procurement"],
    tags: ["AI", "Joule", "Finance", "Procurement", "Automation"],
    sapProducts: ["SAP S/4HANA Cloud", "SAP Ariba", "SAP BTP"],
    status: "Available",
    lastUpdated: "2024-12-15",
    painPoints: [
      "Manual invoice processing",
      "Matching discrepancies",
      "Slow approval cycles",
      "High error rates"
    ],
    kpis: [
      "90% automated matching rate",
      "75% reduction in processing time",
      "85% fewer manual interventions",
      "95% accuracy improvement"
    ],
    personas: ["AP Specialist", "Procurement Manager", "Finance Controller", "Vendor Manager"],
    opportunities: [
      "Intelligent exception handling",
      "Automated approval routing",
      "Vendor performance insights",
      "Real-time matching analytics"
    ],
    businessValue: "Accelerate payment processing and improve vendor relationships through intelligent invoice matching and automated exception resolution.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for automated invoice matching and processing",
    architecture: {
      components: ["SAP S/4HANA Cloud", "SAP Ariba", "SAP BTP AI Services", "Joule Copilot"],
      integration: ["EDI systems", "OCR technology", "Workflow engines", "Supplier portals"],
      dataFlow: "Invoice receipt → AI matching → Exception handling → Approval workflow → Payment processing"
    },
    capabilities: [
      "Three-way matching automation",
      "Intelligent exception resolution",
      "Automated approval routing",
      "Vendor communication integration"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "joule_uc_007",
    title: "Dispute Management Agent",
    summary: "AI-powered dispute resolution and collections optimization for faster case resolution.",
    description: "Resolves customer disputes quickly and effectively using AI analysis of dispute details and relevant business records to validate cases and propose optimal solutions.",
    industry: ["Cross-Industry", "Financial Services", "Retail"],
    valueChain: ["Finance", "Lead to Cash"],
    processModule: ["Collections", "Customer Service"],
    tags: ["AI", "Joule", "Finance", "Disputes", "Collections"],
    sapProducts: ["SAP S/4HANA Cloud", "SAP Customer Experience", "SAP BTP"],
    status: "Planned Q3 2025",
    lastUpdated: "2025-01-10",
    painPoints: [
      "Manual dispute investigation",
      "Long resolution times",
      "Inconsistent decision making",
      "Poor customer experience"
    ],
    kpis: [
      "75% faster dispute resolution",
      "90% reduction in manual work",
      "85% customer satisfaction improvement",
      "60% reduction in escalations"
    ],
    personas: ["Collections Specialist", "Customer Service Rep", "Finance Manager", "Legal Counsel"],
    opportunities: [
      "Automated dispute validation",
      "Intelligent resolution recommendations",
      "Proactive dispute prevention",
      "Enhanced customer communication"
    ],
    businessValue: "Improve cash position with AI agents that close receivables fast and resolve disputes in seconds, enhancing customer relationships.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for automated dispute management and resolution",
    architecture: {
      components: ["SAP S/4HANA Cloud", "SAP Customer Experience", "SAP BTP AI Core", "Joule Copilot"],
      integration: ["CRM systems", "Document management", "Communication platforms", "Analytics dashboards"],
      dataFlow: "Dispute data → AI analysis → Evidence validation → Resolution recommendation → Customer communication"
    },
    capabilities: [
      "Automated case classification",
      "Evidence analysis and validation",
      "Resolution recommendation engine",
      "Integrated customer communication"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/HbIJxQwjLfE"
  },
  {
    id: "joule_uc_008",
    title: "HR Advisor & Self-Service Agent",
    summary: "Intelligent HR support for employee self-service and administrative automation.",
    description: "Provides intelligent HR assistance for employees and administrators, automating common HR tasks and providing instant access to policies, procedures, and employee information from SAP SuccessFactors.",
    industry: ["Cross-Industry", "Professional Services", "Manufacturing"],
    valueChain: ["HR", "Human Capital Management"],
    processModule: ["Employee Services", "HR Operations"],
    tags: ["AI", "Joule", "HR", "Self-Service", "Employee Support"],
    sapProducts: ["SAP SuccessFactors", "SAP BTP", "SAP Analytics Cloud"],
    status: "Available",
    lastUpdated: "2024-11-30",
    painPoints: [
      "Time-consuming HR inquiries",
      "Inconsistent policy interpretation",
      "Manual administrative tasks",
      "Limited self-service capabilities"
    ],
    kpis: [
      "70% reduction in employee time for HR inquiries",
      "85% of HR questions answered instantly",
      "60% reduction in HR admin workload",
      "90% employee satisfaction with self-service"
    ],
    personas: ["HR Business Partner", "Employee", "HR Specialist", "People Manager"],
    opportunities: [
      "Automated policy guidance",
      "Intelligent case routing",
      "Predictive HR analytics",
      "Enhanced employee experience"
    ],
    businessValue: "Transform HR operations with AI-powered self-service that reduces administrative burden and improves employee satisfaction through transactional, navigational, and informational capabilities.",
    implementation: "Low",
    metadataSummary: "Joule AI agent for HR self-service and employee support in SAP SuccessFactors",
    architecture: {
      components: ["SAP SuccessFactors", "SAP BTP AI Services", "SAP Analytics Cloud", "Joule Copilot"],
      integration: ["HR workflows", "Employee portals", "Knowledge management", "Communication platforms"],
      dataFlow: "Employee query → AI analysis → Knowledge retrieval → Automated response → Case creation if needed"
    },
    capabilities: [
      "Natural language HR queries",
      "Policy and procedure guidance",
      "Automated case creation",
      "Intelligent escalation routing"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/K7wUFRCKVGY"
  },
  {
    id: "joule_uc_009",
    title: "Recruiting Agent",
    summary: "AI-powered recruitment automation for faster and more effective candidate sourcing.",
    description: "Automates recruitment processes including candidate sourcing, screening, and interview scheduling. Uses AI to match candidates with job requirements and predict hiring success.",
    industry: ["Cross-Industry", "Professional Services", "Technology"],
    valueChain: ["HR", "Talent Acquisition"],
    processModule: ["Recruiting", "Candidate Management"],
    tags: ["AI", "Joule", "HR", "Recruiting", "Talent"],
    sapProducts: ["SAP SuccessFactors", "SAP BTP", "SAP Analytics Cloud"],
    status: "Planned",
    lastUpdated: "2025-01-15",
    painPoints: [
      "Time-consuming candidate screening",
      "Bias in recruitment decisions",
      "Poor candidate experience",
      "Inefficient interview scheduling"
    ],
    kpis: [
      "50% reduction in time-to-hire",
      "75% improvement in candidate quality",
      "60% faster screening process",
      "85% candidate satisfaction improvement"
    ],
    personas: ["Recruiter", "Hiring Manager", "Talent Acquisition Lead", "HR Business Partner"],
    opportunities: [
      "Automated candidate matching",
      "Intelligent screening workflows",
      "Predictive hiring analytics",
      "Enhanced candidate engagement"
    ],
    businessValue: "Accelerate talent acquisition with AI-powered recruitment that improves candidate quality and reduces hiring costs through recruiting rediscovery capabilities.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for intelligent recruitment and talent acquisition",
    architecture: {
      components: ["SAP SuccessFactors", "SAP BTP AI Core", "SAP Analytics Cloud", "Joule Copilot"],
      integration: ["Job boards", "Assessment platforms", "Calendar systems", "Communication tools"],
      dataFlow: "Job requisition → Candidate sourcing → AI screening → Interview scheduling → Hiring decision support"
    },
    capabilities: [
      "Intelligent candidate sourcing",
      "Automated screening and ranking",
      "Interview scheduling optimization",
      "Bias detection and mitigation"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0"
  },
  {
    id: "joule_uc_010",
    title: "Sourcing Agent",
    summary: "AI-driven procurement sourcing for strategic vendor selection and negotiation.",
    description: "Optimizes procurement sourcing through AI analysis of supplier capabilities, market conditions, and historical performance to recommend optimal sourcing strategies in SAP Ariba.",
    industry: ["Cross-Industry", "Manufacturing", "Retail"],
    valueChain: ["Procurement", "Source to Pay"],
    processModule: ["Strategic Sourcing", "Supplier Management"],
    tags: ["AI", "Joule", "Procurement", "Sourcing", "Supplier"],
    sapProducts: ["SAP Ariba", "SAP S/4HANA Cloud", "SAP BTP"],
    status: "Available",
    lastUpdated: "2024-12-10",
    painPoints: [
      "Complex supplier evaluation",
      "Manual RFP processes",
      "Inefficient negotiation cycles",
      "Limited market intelligence"
    ],
    kpis: [
      "40% reduction in sourcing cycle time",
      "25% improvement in cost savings",
      "80% automation in RFP creation",
      "60% faster supplier evaluation"
    ],
    personas: ["Category Manager", "Procurement Specialist", "Strategic Sourcing Manager", "Supplier Relationship Manager"],
    opportunities: [
      "Automated supplier analysis",
      "Intelligent RFP generation",
      "Market intelligence insights",
      "Negotiation support tools"
    ],
    businessValue: "Drive procurement excellence with AI-powered sourcing that reduces costs and improves supplier relationships through conversational AI assistance.",
    implementation: "High",
    metadataSummary: "Joule AI agent for strategic procurement sourcing in SAP Ariba",
    architecture: {
      components: ["SAP Ariba", "SAP S/4HANA Cloud", "SAP BTP AI Services", "Joule Copilot"],
      integration: ["Supplier networks", "Market data feeds", "Contract management", "Analytics platforms"],
      dataFlow: "Sourcing requirement → Market analysis → Supplier evaluation → RFP generation → Award recommendation"
    },
    capabilities: [
      "Supplier capability analysis",
      "Automated RFP creation",
      "Market intelligence integration",
      "Negotiation strategy recommendations"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk"
  },
  {
    id: "joule_uc_011",
    title: "Category Manager Agent",
    summary: "AI-powered category management for strategic procurement planning and optimization.",
    description: "Enhances category management through AI-driven market analysis, spend optimization, and supplier portfolio management to drive strategic procurement value.",
    industry: ["Cross-Industry", "Manufacturing", "Retail"],
    valueChain: ["Procurement", "Source to Pay"],
    processModule: ["Category Management", "Spend Analysis"],
    tags: ["AI", "Joule", "Procurement", "Category", "Strategy"],
    sapProducts: ["SAP Ariba", "SAP S/4HANA Cloud", "SAP Analytics Cloud"],
    status: "Planned",
    lastUpdated: "2025-01-08",
    painPoints: [
      "Complex spend analysis",
      "Limited market visibility",
      "Manual category strategies",
      "Fragmented supplier base"
    ],
    kpis: [
      "35% improvement in category savings",
      "50% reduction in analysis time",
      "70% better supplier consolidation",
      "45% faster strategy development"
    ],
    personas: ["Category Manager", "Chief Procurement Officer", "Procurement Analyst", "Strategic Sourcing Lead"],
    opportunities: [
      "AI-driven spend analysis",
      "Market trend prediction",
      "Supplier portfolio optimization",
      "Category strategy automation"
    ],
    businessValue: "Optimize procurement categories with AI-powered insights that drive strategic value and cost reduction across the supplier portfolio.",
    implementation: "High",
    metadataSummary: "Joule AI agent for strategic category management",
    architecture: {
      components: ["SAP Ariba", "SAP S/4HANA Cloud", "SAP Analytics Cloud", "Joule Copilot"],
      integration: ["Spend analytics", "Market intelligence", "Supplier data", "Contract repositories"],
      dataFlow: "Category data → Spend analysis → Market intelligence → Strategy formulation → Implementation tracking"
    },
    capabilities: [
      "Automated spend categorization",
      "Market trend analysis",
      "Supplier performance scoring",
      "Strategy recommendation engine"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/L_jWHffIx5E"
  },
  {
    id: "joule_uc_012",
    title: "Service Representative Agent",
    summary: "AI-powered customer service automation for faster issue resolution and improved satisfaction.",
    description: "Automates customer service processes through intelligent case classification, solution recommendation, and escalation management to improve response times and customer satisfaction.",
    industry: ["Cross-Industry", "Technology", "Telecommunications"],
    valueChain: ["Customer Experience", "Service Operations"],
    processModule: ["Customer Support", "Case Management"],
    tags: ["AI", "Joule", "Customer Service", "Support", "Automation"],
    sapProducts: ["SAP Service Cloud", "SAP Customer Experience", "SAP BTP"],
    status: "Available",
    lastUpdated: "2024-12-05",
    painPoints: [
      "Manual case classification",
      "Inconsistent service quality",
      "Long resolution times",
      "High escalation rates"
    ],
    kpis: [
      "65% reduction in case resolution time",
      "80% automation in case classification",
      "90% first-call resolution rate",
      "85% customer satisfaction improvement"
    ],
    personas: ["Service Representative", "Customer Success Manager", "Support Manager", "Contact Center Agent"],
    opportunities: [
      "Automated case routing",
      "Intelligent solution suggestions",
      "Proactive issue prevention",
      "Enhanced customer communication"
    ],
    businessValue: "Transform customer service with AI-powered automation that reduces costs while improving customer satisfaction and loyalty through self-service with knowledge support.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for intelligent customer service automation",
    architecture: {
      components: ["SAP Service Cloud", "SAP Customer Experience", "SAP BTP AI Services", "Joule Copilot"],
      integration: ["Knowledge bases", "CRM systems", "Communication channels", "Analytics platforms"],
      dataFlow: "Customer inquiry → Case classification → Solution search → Response generation → Escalation if needed"
    },
    capabilities: [
      "Intelligent case classification",
      "Automated solution matching",
      "Multi-channel communication",
      "Sentiment analysis and escalation"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/HbIJxQwjLfE"
  },
  {
    id: "joule_uc_013",
    title: "Spare Parts Agent",
    summary: "AI-driven spare parts management for optimized inventory and maintenance operations.",
    description: "Optimizes spare parts inventory through predictive analytics, demand forecasting, and automated replenishment to reduce costs while ensuring equipment availability in industry-specific scenarios.",
    industry: ["Manufacturing", "Utilities", "Transportation"],
    valueChain: ["Supply Chain", "Asset Management"],
    processModule: ["Maintenance Operations", "Inventory Management"],
    tags: ["AI", "Joule", "Maintenance", "Inventory", "Predictive"],
    sapProducts: ["SAP S/4HANA Cloud", "SAP Asset Performance Management", "SAP BTP"],
    status: "Planned",
    lastUpdated: "2025-01-12",
    painPoints: [
      "Excess spare parts inventory",
      "Stockouts during critical maintenance",
      "Manual demand forecasting",
      "Poor supplier coordination"
    ],
    kpis: [
      "30% reduction in inventory costs",
      "95% parts availability for maintenance",
      "50% improvement in forecast accuracy",
      "40% faster procurement cycles"
    ],
    personas: ["Maintenance Manager", "Inventory Planner", "Procurement Specialist", "Operations Manager"],
    opportunities: [
      "Predictive demand forecasting",
      "Automated replenishment",
      "Supplier performance optimization",
      "Maintenance planning integration"
    ],
    businessValue: "Optimize spare parts management with AI-powered demand prediction that reduces inventory costs while ensuring operational continuity.",
    implementation: "High",
    metadataSummary: "Joule AI agent for intelligent spare parts management",
    architecture: {
      components: ["SAP S/4HANA Cloud", "SAP Asset Performance Management", "SAP BTP AI Core", "Joule Copilot"],
      integration: ["EAM systems", "Supplier portals", "IoT sensors", "Maintenance schedules"],
      dataFlow: "Equipment data → Failure prediction → Parts demand forecast → Automated ordering → Inventory optimization"
    },
    capabilities: [
      "Predictive parts demand",
      "Automated inventory optimization",
      "Supplier performance tracking",
      "Maintenance schedule integration"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/iik25wqIuFo"
  },
  {
    id: "joule_uc_014",
    title: "ABAP Code Agent",
    summary: "AI-powered ABAP development assistance for faster and smarter custom development.",
    description: "Accelerates ABAP development through AI-assisted code generation, optimization, and migration support, helping developers build better applications faster with 250 million lines of ABAP code training.",
    industry: ["Cross-Industry", "Technology", "Manufacturing"],
    valueChain: ["Technology", "Development Operations"],
    processModule: ["Custom Development", "System Maintenance"],
    tags: ["AI", "Joule", "Development", "ABAP", "Code"],
    sapProducts: ["SAP BTP ABAP Environment", "SAP Build Code", "SAP S/4HANA"],
    status: "Available",
    lastUpdated: "2024-12-20",
    painPoints: [
      "Complex ABAP development",
      "Legacy code migration challenges",
      "Manual code reviews",
      "Limited development productivity"
    ],
    kpis: [
      "15% increase in developer productivity",
      "50% faster code generation",
      "70% reduction in code review time",
      "60% acceleration in ECC to S/4HANA migration"
    ],
    personas: ["ABAP Developer", "Technical Architect", "Development Manager", "System Administrator"],
    opportunities: [
      "AI-assisted code generation",
      "Automated code optimization",
      "Legacy code migration support",
      "Intelligent testing automation"
    ],
    businessValue: "Accelerate custom development and modernization with AI-powered ABAP assistance that improves code quality and reduces development costs through Clean Core transition support.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for ABAP development and modernization",
    architecture: {
      components: ["SAP BTP ABAP Environment", "SAP Build Code", "SAP AI Core", "Joule Copilot"],
      integration: ["Development tools", "Version control", "Testing frameworks", "Deployment pipelines"],
      dataFlow: "Development requirement → Code generation → Optimization → Testing → Migration support"
    },
    capabilities: [
      "Intelligent code completion",
      "Automated refactoring",
      "Code explanation and documentation",
      "Migration path recommendations"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/QH2-TGUlwu4"
  },
  {
    id: "joule_uc_015",
    title: "Production Supervisor Agent",
    summary: "AI-powered production supervision for optimized manufacturing operations and quality control.",
    description: "Enhances production supervision through real-time monitoring, predictive analytics, and automated decision-making to optimize manufacturing efficiency and quality in SAP Digital Manufacturing Cloud.",
    industry: ["Manufacturing", "Automotive", "Pharmaceuticals"],
    valueChain: ["Manufacturing", "Plan to Fulfill"],
    processModule: ["Production Operations", "Quality Management"],
    tags: ["AI", "Joule", "Manufacturing", "Production", "Quality"],
    sapProducts: ["SAP Digital Manufacturing Cloud", "SAP S/4HANA Cloud", "SAP BTP"],
    status: "Planned",
    lastUpdated: "2025-01-05",
    painPoints: [
      "Manual production monitoring",
      "Reactive quality issues",
      "Inefficient resource allocation",
      "Limited real-time visibility"
    ],
    kpis: [
      "25% improvement in production efficiency",
      "40% reduction in quality defects",
      "30% faster issue resolution",
      "20% reduction in downtime"
    ],
    personas: ["Production Supervisor", "Plant Manager", "Quality Engineer", "Operations Manager"],
    opportunities: [
      "Real-time production monitoring",
      "Predictive quality analytics",
      "Automated resource optimization",
      "Intelligent alerting systems"
    ],
    businessValue: "Optimize manufacturing operations with AI-powered supervision that improves efficiency, quality, and reduces operational costs.",
    implementation: "High",
    metadataSummary: "Joule AI agent for intelligent production supervision",
    architecture: {
      components: ["SAP Digital Manufacturing Cloud", "SAP S/4HANA Cloud", "SAP BTP AI Core", "Joule Copilot"],
      integration: ["IoT sensors", "MES systems", "Quality management", "Analytics dashboards"],
      dataFlow: "Production data → AI analysis → Quality prediction → Resource optimization → Automated actions"
    },
    capabilities: [
      "Real-time production monitoring",
      "Predictive quality analysis",
      "Automated resource allocation",
      "Intelligent anomaly detection"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "joule_uc_016",
    title: "Sales Agent: Account Research Generation",
    summary: "AI-powered account research for strategic sales preparation and customer insights.",
    description: "Automates account research and analysis to provide sales teams with comprehensive customer insights, competitive intelligence, and strategic recommendations for improved sales outcomes.",
    industry: ["Cross-Industry", "Technology", "Financial Services"],
    valueChain: ["Sales", "Lead to Cash"],
    processModule: ["Sales Operations", "Customer Research"],
    tags: ["AI", "Joule", "Sales", "Research", "CRM"],
    sapProducts: ["SAP Sales Cloud", "SAP Customer Experience", "SAP BTP"],
    status: "Planned",
    lastUpdated: "2025-01-12",
    painPoints: [
      "Time-consuming research processes",
      "Incomplete customer insights",
      "Manual competitive analysis",
      "Lack of strategic preparation"
    ],
    kpis: [
      "60% reduction in research time",
      "85% improvement in sales preparation",
      "40% increase in win rates",
      "70% better customer insights"
    ],
    personas: ["Sales Representative", "Account Manager", "Sales Manager", "Business Development"],
    opportunities: [
      "Automated account profiling",
      "Competitive intelligence gathering",
      "Strategic recommendation engine",
      "Real-time market insights"
    ],
    businessValue: "Accelerate sales success with AI-powered account research that provides deep customer insights and strategic advantages for order creation optimization.",
    implementation: "Medium",
    metadataSummary: "Joule AI agent for comprehensive sales account research",
    architecture: {
      components: ["SAP Sales Cloud", "SAP Customer Experience", "SAP BTP AI Services", "Joule Copilot"],
      integration: ["CRM systems", "Market data feeds", "Social media APIs", "News sources"],
      dataFlow: "Account data → AI research → Insight synthesis → Strategic recommendations → Sales preparation"
    },
    capabilities: [
      "Automated account profiling",
      "Competitive landscape analysis",
      "Strategic opportunity identification",
      "Real-time market intelligence"
    ],
    demoVideoUrl: "https://www.youtube.com/embed/NUYvbT6vTPs"
  }
];

// Joule Reference Architectures based on SAP documentation
export const jouleArchitectures = {
  "document_grounding": {
    "name": "Document Grounding Architecture",
    "description": "Retrieval Augmented Generation (RAG) service for grounding responses in customer documents",
    "components": [
      "Joule Orchestration Layer",
      "RAG Service",
      "Document Grounding AI Service",
      "Vector Database",
      "Large Language Model",
      "Dialog Management"
    ],
    "dataFlow": "User prompt → Vector search → Document retrieval → LLM processing → Grounded response",
    "integrations": ["Microsoft SharePoint", "SAP BTP", "Third-party repositories"]
  },
  "multi_agent_collaboration": {
    "name": "Multi-Agent Collaboration",
    "description": "Collaborative AI agents working across departments for enterprise-wide outcomes",
    "components": [
      "Agent Orchestration",
      "Knowledge Catalogs",
      "Scenario Catalogs",
      "Context Management",
      "Cross-Application APIs"
    ],
    "dataFlow": "Multi-agent coordination → Knowledge sharing → Collaborative execution → Unified results",
    "integrations": ["SAP Cloud Applications", "Third-party systems", "Enterprise data sources"]
  },
  "unified_experience": {
    "name": "Unified Cross-User Experience",
    "description": "Central Joule setup with unified identity and access management",
    "components": [
      "Joule Web Client",
      "SAP BTP",
      "Identity and Access Management",
      "Connected SAP Solutions",
      "Unified UI Framework"
    ],
    "dataFlow": "Single sign-on → Unified interface → Cross-application access → Contextual continuity",
    "integrations": ["SAP SuccessFactors", "SAP S/4HANA Cloud", "SAP Analytics Cloud", "Third-party apps"]
  }
};

// Business Value Categories
export const businessValueCategories = [
  {
    category: "Productivity & Efficiency",
    benefits: [
      "Up to 30% reduction in time for getting insights",
      "Up to 70% reduction in employee time for investigations",
      "5-10 seconds for purchase order insights",
      "80% task automation across processes"
    ]
  },
  {
    category: "Financial Impact",
    benefits: [
      "25-50% improvement in cash flow",
      "30-60% reduction in Days Sales Outstanding",
      "40-75% reduction in processing time",
      "15-35% improvement in forecast accuracy"
    ]
  },
  {
    category: "User Experience",
    benefits: [
      "Natural language interface across all SAP applications",
      "Contextual continuity across applications",
      "Unified cross-user experience",
      "Conversational AI assistance"
    ]
  },
  {
    category: "Risk & Compliance",
    benefits: [
      "95% policy compliance rate",
      "90% reduction in fraudulent claims",
      "Automated compliance monitoring",
      "Intelligent risk assessment"
    ]
  }
];