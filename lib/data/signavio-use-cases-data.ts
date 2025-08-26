export interface SignavioUseCase {
  id: string;
  title: string;
  summary: string;
  description: string;
  industry: string[];
  valueChain: string[];
  processModule: string[];
  tags: string[];
  signavio: {
    products: string[];
    capabilities: string[];
  };
  status: string;
  lastUpdated: string;
  painPoints: string[];
  kpis: string[];
  personas: string[];
  opportunities: string[];
  businessValue: string;
  implementation: string;
  metadataSummary: string;
  architecture: {
    components: string[];
    integration: string[];
    dataFlow: string;
  };
  capabilities: string[];
  realWorldExample?: {
    company: string;
    industry: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export const signavioUseCases: SignavioUseCase[] = [
  {
    id: "signavio_uc_001",
    title: "ERP Transformation & System Migration",
    summary: "Accelerate SAP S/4HANA migration with comprehensive process discovery and transformation analysis",
    description: "Build data-driven business cases for ERP transformation by analyzing current state processes, identifying improvement opportunities, and de-risking migration efforts through process intelligence and mining.",
    industry: ["Manufacturing", "Financial Services", "Retail", "Healthcare"],
    valueChain: ["Source to Pay", "Plan to Produce", "Order to Cash", "Record to Report"],
    processModule: ["Procurement", "Production Planning", "Order Management", "Financial Accounting"],
    tags: ["erp-transformation", "s4hana-migration", "process-discovery", "business-case"],
    signavio: {
      products: ["Process Intelligence", "Process Manager", "Process Insights"],
      capabilities: ["Process Mining", "Process Discovery", "Conformance Checking", "Performance Analysis"]
    },
    status: "Active",
    lastUpdated: "2025-07-08",
    painPoints: [
      "Lack of visibility into current process performance",
      "Unknown dependencies and complexities",
      "Risk of disruption during migration",
      "Difficulty building business case for transformation"
    ],
    kpis: [
      "Process Discovery Time",
      "Migration Risk Score",
      "Business Case ROI",
      "Transformation Timeline"
    ],
    personas: ["CIO", "IT Director", "Process Owner", "Project Manager"],
    opportunities: [
      "Accelerated migration timeline",
      "Reduced transformation risks",
      "Data-driven optimization",
      "Process standardization"
    ],
    businessValue: "Reduce ERP transformation risk by 60% and accelerate migration timeline by 40% through comprehensive process analysis",
    implementation: "Medium complexity - 3-6 months implementation with data preparation and stakeholder alignment",
    metadataSummary: "Comprehensive ERP transformation support combining process discovery, analysis, and optimization for successful S/4HANA migration",
    architecture: {
      components: ["Process Intelligence Engine", "Data Connectors", "Analytics Dashboard", "Reporting Suite"],
      integration: ["SAP ECC", "SAP S/4HANA", "Third-party systems", "Data warehouses"],
      dataFlow: "Extract event logs from source systems → Process mining analysis → Discovery of current state → Gap analysis → Future state design → Migration roadmap"
    },
    capabilities: [
      "Automated process discovery",
      "Performance bottleneck identification",
      "Compliance gap analysis",
      "Future state simulation"
    ],
    realWorldExample: {
      company: "Global Manufacturing Company",
      industry: "Manufacturing",
      challenge: "Complex ERP landscape with unclear process dependencies hindering S/4HANA migration",
      solution: "Implemented SAP Signavio Process Intelligence to map current state and identify optimization opportunities",
      results: [
        "60% reduction in migration risk",
        "40% faster migration timeline",
        "25% process efficiency improvement",
        "Clear ROI business case development"
      ]
    }
  },
  {
    id: "signavio_uc_002",
    title: "Financial Process Optimization",
    summary: "Optimize Procure-to-Pay and Order-to-Cash processes through advanced process mining and intelligence",
    description: "Transform financial operations by discovering inefficiencies, automating workflows, and ensuring compliance in core financial processes including procurement, accounts payable, and revenue recognition.",
    industry: ["Financial Services", "Manufacturing", "Retail", "Technology"],
    valueChain: ["Source to Pay", "Order to Cash", "Record to Report"],
    processModule: ["Procurement", "Accounts Payable", "Order Management", "Revenue Recognition"],
    tags: ["financial-processes", "procure-to-pay", "order-to-cash", "process-optimization"],
    signavio: {
      products: ["Process Intelligence", "Process Governance", "Process Manager"],
      capabilities: ["Process Mining", "Workflow Automation", "Compliance Monitoring", "Performance Analytics"]
    },
    status: "Active",
    lastUpdated: "2025-07-08",
    painPoints: [
      "Manual approval processes causing delays",
      "Inconsistent process execution across regions",
      "Poor visibility into process performance",
      "Compliance risks and audit challenges"
    ],
    kpis: [
      "Process Cycle Time",
      "Automation Rate",
      "Compliance Score",
      "Cost per Transaction"
    ],
    personas: ["CFO", "Finance Director", "Process Owner", "Accounts Payable Manager"],
    opportunities: [
      "Automated approval workflows",
      "Reduced processing time",
      "Improved compliance",
      "Cost reduction"
    ],
    businessValue: "Achieve 45% reduction in processing time and 30% cost savings through automated workflows and process optimization",
    implementation: "Medium complexity - 4-8 months with workflow design and system integration",
    metadataSummary: "End-to-end financial process transformation with automated workflows, compliance monitoring, and performance optimization",
    architecture: {
      components: ["Process Mining Engine", "Workflow Automation", "Compliance Dashboard", "Integration Layer"],
      integration: ["SAP ERP", "Banking systems", "Supplier portals", "Approval systems"],
      dataFlow: "Transaction data extraction → Process discovery → Bottleneck identification → Workflow automation → Continuous monitoring"
    },
    capabilities: [
      "Automated invoice processing",
      "Intelligent approval routing",
      "Real-time compliance monitoring",
      "Process performance analytics"
    ],
    realWorldExample: {
      company: "Fortune 500 Technology Company",
      industry: "Technology",
      challenge: "Complex global procurement processes with manual approvals causing 45-day average cycle times",
      solution: "Deployed SAP Signavio Process Intelligence and Governance for automated workflow optimization",
      results: [
        "45% reduction in procurement cycle time",
        "30% cost savings through automation",
        "95% compliance rate achievement",
        "Real-time process visibility"
      ]
    }
  },
  {
    id: "signavio_uc_003",
    title: "Supply Chain Visibility & Optimization",
    summary: "Transform supply chain operations through end-to-end process mining and intelligent automation",
    description: "Achieve comprehensive supply chain visibility by analyzing processes from planning to delivery, identifying bottlenecks, and implementing intelligent automation for optimal performance and resilience.",
    industry: ["Manufacturing", "Retail", "Automotive", "Consumer Goods"],
    valueChain: ["Plan to Produce", "Source to Pay", "Order to Cash"],
    processModule: ["Demand Planning", "Procurement", "Production", "Logistics"],
    tags: ["supply-chain", "logistics", "manufacturing", "automation"],
    signavio: {
      products: ["Process Intelligence", "Process Manager", "Process Insights"],
      capabilities: ["End-to-end Process Mining", "Supply Chain Analytics", "Predictive Analysis", "Automation"]
    },
    status: "Active",
    lastUpdated: "2025-07-08",
    painPoints: [
      "Limited end-to-end supply chain visibility",
      "Unpredictable delivery times",
      "Inventory optimization challenges",
      "Supplier performance variability"
    ],
    kpis: [
      "On-time Delivery Rate",
      "Inventory Turnover",
      "Supply Chain Cost",
      "Supplier Performance Score"
    ],
    personas: ["Supply Chain Director", "Operations Manager", "Procurement Manager", "Logistics Manager"],
    opportunities: [
      "End-to-end process visibility",
      "Predictive supply chain planning",
      "Automated exception handling",
      "Supplier collaboration enhancement"
    ],
    businessValue: "Improve on-time delivery by 35% and reduce supply chain costs by 25% through intelligent automation and optimization",
    implementation: "High complexity - 6-12 months with extensive data integration and stakeholder coordination",
    metadataSummary: "Comprehensive supply chain transformation with end-to-end visibility, predictive analytics, and intelligent automation",
    architecture: {
      components: ["Supply Chain Intelligence", "Predictive Analytics", "Automation Engine", "Collaboration Platform"],
      integration: ["ERP systems", "WMS", "TMS", "Supplier systems", "IoT sensors"],
      dataFlow: "Multi-source data collection → Process discovery → Performance analysis → Predictive modeling → Automated optimization → Continuous monitoring"
    },
    capabilities: [
      "Real-time supply chain monitoring",
      "Predictive demand planning",
      "Automated exception management",
      "Supplier performance analytics"
    ],
    realWorldExample: {
      company: "Global Automotive Manufacturer",
      industry: "Automotive",
      challenge: "Complex global supply chain with limited visibility causing delivery delays and inventory issues",
      solution: "Implemented SAP Signavio for end-to-end supply chain process mining and optimization",
      results: [
        "35% improvement in on-time delivery",
        "25% reduction in supply chain costs",
        "50% faster issue resolution",
        "Enhanced supplier collaboration"
      ]
    }
  },
  {
    id: "signavio_uc_004",
    title: "Customer Experience & Journey Optimization",
    summary: "Enhance customer experience through process mining and journey optimization across all touchpoints",
    description: "Transform customer-facing processes by analyzing customer journeys, identifying pain points, and implementing process improvements that enhance satisfaction and reduce service times.",
    industry: ["Financial Services", "Telecommunications", "Retail", "Healthcare"],
    valueChain: ["Lead to Cash", "Service Delivery"],
    processModule: ["Customer Onboarding", "Service Delivery", "Claims Processing", "Customer Support"],
    tags: ["customer-experience", "customer-journey", "service-optimization", "digital-transformation"],
    signavio: {
      products: ["Process Intelligence", "Process Manager", "Process Governance"],
      capabilities: ["Customer Journey Mining", "Experience Analytics", "Service Optimization", "Digital Process Design"]
    },
    status: "Active",
    lastUpdated: "2025-07-08",
    painPoints: [
      "Poor visibility into customer journey",
      "Inconsistent service delivery",
      "Long resolution times",
      "Customer satisfaction challenges"
    ],
    kpis: [
      "Customer Satisfaction Score",
      "First Call Resolution Rate",
      "Average Resolution Time",
      "Customer Retention Rate"
    ],
    personas: ["Chief Customer Officer", "Service Manager", "Customer Experience Manager", "Process Owner"],
    opportunities: [
      "Enhanced customer journey visibility",
      "Faster service delivery",
      "Improved customer satisfaction",
      "Reduced service costs"
    ],
    businessValue: "Increase customer satisfaction by 40% and reduce service costs by 30% through optimized customer journey processes",
    implementation: "Medium complexity - 3-6 months with customer touchpoint analysis and process redesign",
    metadataSummary: "Customer-centric process transformation focusing on journey optimization, experience enhancement, and service excellence",
    architecture: {
      components: ["Customer Journey Analytics", "Experience Dashboard", "Service Optimization Engine", "Feedback Integration"],
      integration: ["CRM systems", "Service platforms", "Communication channels", "Feedback systems"],
      dataFlow: "Customer interaction data → Journey mapping → Pain point identification → Process optimization → Experience monitoring → Continuous improvement"
    },
    capabilities: [
      "Real-time customer journey tracking",
      "Automated service routing",
      "Experience analytics",
      "Proactive issue resolution"
    ],
    realWorldExample: {
      company: "Leading Telecommunications Provider",
      industry: "Telecommunications",
      challenge: "Poor customer experience with long resolution times and inconsistent service delivery",
      solution: "Deployed SAP Signavio for customer journey analysis and service process optimization",
      results: [
        "40% increase in customer satisfaction",
        "30% reduction in service costs",
        "50% improvement in first call resolution",
        "25% faster issue resolution"
      ]
    }
  },
  {
    id: "signavio_uc_005",
    title: "Compliance & Risk Management",
    summary: "Ensure regulatory compliance and manage risks through continuous process monitoring and automated controls",
    description: "Maintain compliance with industry regulations and manage operational risks through automated monitoring, real-time alerts, and comprehensive audit trails across all business processes.",
    industry: ["Financial Services", "Healthcare", "Energy", "Manufacturing"],
    valueChain: ["Record to Report", "Risk Management", "Compliance"],
    processModule: ["Risk Assessment", "Compliance Monitoring", "Audit Management", "Regulatory Reporting"],
    tags: ["compliance", "risk-management", "regulatory", "audit"],
    signavio: {
      products: ["Process Intelligence", "Process Governance", "Process Manager"],
      capabilities: ["Compliance Monitoring", "Risk Analytics", "Automated Controls", "Audit Trail Management"]
    },
    status: "Active",
    lastUpdated: "2025-07-08",
    painPoints: [
      "Manual compliance monitoring",
      "Regulatory violations and penalties",
      "Lack of audit trail visibility",
      "Inconsistent risk assessment"
    ],
    kpis: [
      "Compliance Rate",
      "Risk Score",
      "Audit Finding Rate",
      "Regulatory Penalty Costs"
    ],
    personas: ["Chief Risk Officer", "Compliance Manager", "Audit Director", "Risk Analyst"],
    opportunities: [
      "Automated compliance monitoring",
      "Real-time risk assessment",
      "Enhanced audit readiness",
      "Reduced regulatory penalties"
    ],
    businessValue: "Achieve 95% compliance rate and reduce regulatory penalties by 80% through automated monitoring and controls",
    implementation: "High complexity - 6-9 months with extensive regulatory mapping and control implementation",
    metadataSummary: "Comprehensive compliance and risk management solution with automated monitoring, real-time analytics, and audit trail management",
    architecture: {
      components: ["Compliance Engine", "Risk Analytics", "Control Automation", "Audit Management", "Regulatory Reporting"],
      integration: ["Core business systems", "Risk management platforms", "Regulatory databases", "Audit tools"],
      dataFlow: "Process execution data → Compliance checking → Risk assessment → Control automation → Alert generation → Audit trail creation → Regulatory reporting"
    },
    capabilities: [
      "Real-time compliance monitoring",
      "Automated risk assessment",
      "Intelligent alert management",
      "Comprehensive audit trails"
    ],
    realWorldExample: {
      company: "Major Financial Institution",
      industry: "Financial Services",
      challenge: "Complex regulatory environment with manual compliance processes leading to violations and penalties",
      solution: "Implemented SAP Signavio for automated compliance monitoring and risk management",
      results: [
        "95% compliance rate achievement",
        "80% reduction in regulatory penalties",
        "60% faster audit preparation",
        "Real-time risk visibility"
      ]
    }
  }
];

export const signavioArchitectures = {
  processIntelligence: {
    name: "SAP Signavio Process Intelligence",
    description: "Advanced process mining and analytics platform for data-driven process optimization",
    components: [
      "Process Mining Engine",
      "Event Log Analysis",
      "Performance Analytics",
      "Compliance Monitoring",
      "Root Cause Analysis"
    ],
    integrations: [
      "SAP S/4HANA",
      "SAP ECC",
      "Third-party Systems",
      "Data Warehouses",
      "Cloud Platforms"
    ]
  },
  processManager: {
    name: "SAP Signavio Process Manager",
    description: "Collaborative business process modeling and documentation platform",
    components: [
      "Process Modeling",
      "Collaboration Tools",
      "Version Control",
      "Process Repository",
      "Integration APIs"
    ],
    integrations: [
      "SAP Build Process Automation",
      "SAP Cloud ALM",
      "Microsoft Office",
      "Sharepoint",
      "BPMN Tools"
    ]
  },
  processGovernance: {
    name: "SAP Signavio Process Governance",
    description: "Workflow automation and process governance platform for operational excellence",
    components: [
      "Workflow Engine",
      "Task Management",
      "Approval Workflows",
      "Process Monitoring",
      "Performance Dashboards"
    ],
    integrations: [
      "SAP systems",
      "Salesforce",
      "Google Workspace",
      "Microsoft 365",
      "Custom APIs"
    ]
  }
};

export const signavioBusinessValueCategories = [
  {
    category: "Process Discovery & Analysis",
    description: "Automated discovery and analysis of business processes",
    benefits: [
      "Same-day process insights",
      "Automated bottleneck identification",
      "Performance benchmarking",
      "Compliance gap analysis"
    ]
  },
  {
    category: "Operational Excellence",
    description: "Continuous process optimization and performance improvement",
    benefits: [
      "25-45% cycle time reduction",
      "30-50% cost savings",
      "95%+ compliance rates",
      "60% faster issue resolution"
    ]
  },
  {
    category: "Digital Transformation",
    description: "Technology-enabled process transformation and automation",
    benefits: [
      "End-to-end automation",
      "Real-time monitoring",
      "Predictive analytics",
      "Intelligent decision-making"
    ]
  },
  {
    category: "Risk & Compliance",
    description: "Automated risk management and compliance monitoring",
    benefits: [
      "Real-time compliance monitoring",
      "80% reduction in penalties",
      "Automated audit trails",
      "Proactive risk mitigation"
    ]
  }
];