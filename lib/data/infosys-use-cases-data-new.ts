export interface InfosysUseCase {
  id: string;
  name: string;
  description: string;
  lastUpdate: string;
  
  // Infosys Platform Classification
  infosysPlatform: "Topaz" | "EdgeVerve AI Next" | "AssistEdge" | "XtractEdge" | "TradeEdge" | "Finacle" | "Cross-Platform";
  infosysSubPlatform?: string;
  
  // Business Classification
  industry: string[];
  sapValueChain: string[];
  valueChainBlock: string[];
  processModule: string[];
  domain: string[];
  
  // Strategic Classification
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  status: "Active" | "Beta" | "Under Development" | "Pilot";
  maturityLevel: "Proof of Concept" | "Pilot" | "Production" | "Scale";
  
  // Infosys-Specific Metadata
  infosysOffering: {
    serviceType: "Consulting" | "Implementation" | "Managed Services" | "Platform" | "Solution";
    deliveryModel: "On-Premise" | "Cloud" | "Hybrid" | "SaaS";
    partnershipLevel: "Strategic" | "Preferred" | "Certified" | "Standard";
    geographicFocus: string[];
    clientSegment: "Enterprise" | "Mid-Market" | "SMB" | "Government" | "All";
  };
  
  // Technology Stack
  aiTechnologies: string[];
  cloudPlatforms: string[];
  integrationCapabilities: string[];
  
  // Business Impact Metrics
  businessMetrics: {
    costSavings?: string;
    timeReduction?: string;
    automationRate?: string;
    revenueImpact?: string;
    productivityGain?: string;
    customerSatisfaction?: string;
  };
  
  // Implementation Details
  implementationComplexity: "Low" | "Medium" | "High";
  roiTimeframe: string;
  typicalProjectDuration: string;
  investmentRange: "< $100K" | "$100K-$500K" | "$500K-$1M" | "$1M-$5M" | "> $5M";
  
  // Client Success Stories
  clientCaseStudies: {
    clientName?: string;
    industry: string;
    challengesSolved: string[];
    businessOutcomes: string[];
    metricsAchieved: string[];
  }[];
  
  // Competitive Positioning
  competitiveAdvantage: string[];
  differentiators: string[];
  marketPosition: "Leader" | "Challenger" | "Visionary" | "Niche Player";
  
  // Content and Resources
  resources: {
    demoUrl?: string;
    caseStudyUrl?: string;
    whitepaperUrl?: string;
    videoUrl?: string;
    brochureUrl?: string;
    webinarUrl?: string;
  };
  
  // Filtering and Search
  tags: string[];
  keywords: string[];
  searchableContent: string;
  
  // Business Context
  painPoints: string[];
  businessOpportunities: string[];
  kpis: string[];
  personas: string[];
  
  // Innovation and Future Roadmap
  innovationLevel: "Breakthrough" | "Advanced" | "Standard" | "Mature";
  scalabilityLevel: "Department" | "Enterprise" | "Global" | "Ecosystem";
  implementationRisk: "Low" | "Medium" | "High";
}

export const infosysUseCases: InfosysUseCase[] = [
  {
    id: "TOPAZ-FIN-001",
    name: "Accounts Payable AI Agent",
    description: "Autonomous AI-first invoice processing agent that redefines accounts payable operations with end-to-end workflow management and advanced decision-making capabilities.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "Infosys BPM",
    
    industry: ["Financial Services", "Cross-Industry"],
    sapValueChain: ["Source to Pay", "Record to Report"],
    valueChainBlock: ["Accounts Payable", "Invoice Processing"],
    processModule: ["Invoice Processing", "Workflow Management", "Decision Support"],
    domain: ["Finance", "Operations"],
    
    tier: "Tier 1",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Platform",
      deliveryModel: "Cloud",
      partnershipLevel: "Strategic",
      geographicFocus: ["Global", "MENA", "North America", "Europe"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Large Language Models", "Cognitive Computing", "Machine Learning"],
    cloudPlatforms: ["Microsoft Azure", "Multi-Cloud"],
    integrationCapabilities: ["Microsoft AI Stack", "Azure AI Foundry", "Cognitive Services"],
    
    businessMetrics: {
      costSavings: "60% reduction in processing costs",
      timeReduction: "85% faster invoice processing",
      automationRate: "90% touchless processing",
      productivityGain: "90% efficiency improvement"
    },
    
    implementationComplexity: "High",
    roiTimeframe: "6-12 months",
    typicalProjectDuration: "3-6 months",
    investmentRange: "$500K-$1M",
    
    clientCaseStudies: [
      {
        clientName: "Americana Restaurants",
        industry: "Retail",
        challengesSolved: ["Manual invoice processing", "Workflow inconsistencies", "Scale management"],
        businessOutcomes: ["Faster processing", "Enhanced accuracy", "Improved efficiency"],
        metricsAchieved: ["85% speed improvement", "95% accuracy", "60% cost reduction"]
      }
    ],
    
    competitiveAdvantage: ["Autonomous AI-first approach", "Microsoft AI Stack integration", "End-to-end workflow management"],
    differentiators: ["Fully autonomous processing", "Advanced decision-making", "Proven customer success"],
    marketPosition: "Leader",
    
    resources: {
      caseStudyUrl: "https://www.infosysbpm.com/newsroom/press-releases/infosys-bpm-unveils-ai-agents-to-revolutionize-finance-and-accounting-services.html"
    },
    
    tags: ["Finance", "Accounts Payable", "Invoice Processing", "Autonomous AI", "Microsoft Integration"],
    keywords: ["invoice", "accounts payable", "autonomous", "AI", "workflow"],
    searchableContent: "Accounts Payable AI Agent Autonomous invoice processing Microsoft AI Stack",
    
    painPoints: ["Manual invoice processing delays", "Inconsistent approval workflows", "High processing costs", "Error-prone manual data entry"],
    businessOpportunities: ["Significant efficiency gains", "Enhanced accuracy", "Improved user experience", "Reduced manual dependencies"],
    kpis: ["Invoice processing speed", "Processing accuracy", "Cost per invoice", "Workflow efficiency"],
    personas: ["Accounts Payable Manager", "Finance Operations Specialist", "CFO"],
    
    innovationLevel: "Advanced",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Medium"
  },
  {
    id: "TOPAZ-FIN-002",
    name: "Financial Statement Analysis Agent",
    description: "AI-powered financial statement analysis and reporting automation with real-time insights into cash flow, expenses, and profitability.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "Financial Services",
    
    industry: ["Financial Services"],
    sapValueChain: ["Record to Report"],
    valueChainBlock: ["Financial Planning", "Financial Reporting"],
    processModule: ["Financial Analysis", "Reporting", "Compliance"],
    domain: ["Finance"],
    
    tier: "Tier 2",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Solution",
      deliveryModel: "Cloud",
      partnershipLevel: "Preferred",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Machine Learning", "Generative AI", "Large Language Models"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["ERP Systems", "Financial Databases"],
    
    businessMetrics: {
      timeReduction: "80% faster financial analysis",
      automationRate: "75% automated reporting",
      productivityGain: "3x analysis speed improvement"
    },
    
    implementationComplexity: "Medium",
    roiTimeframe: "3-9 months",
    typicalProjectDuration: "2-4 months",
    investmentRange: "$100K-$500K",
    
    clientCaseStudies: [
      {
        industry: "Financial Services",
        challengesSolved: ["Manual analysis delays", "Inconsistent reporting", "Limited real-time insights"],
        businessOutcomes: ["Real-time insights", "Automated compliance", "Enhanced accuracy"],
        metricsAchieved: ["80% time reduction", "95% accuracy improvement", "50% cost savings"]
      }
    ],
    
    competitiveAdvantage: ["Real-time analysis capabilities", "Infosys Topaz integration", "Comprehensive compliance support"],
    differentiators: ["AI-powered insights", "Real-time processing", "Regulatory compliance"],
    marketPosition: "Challenger",
    
    resources: {},
    
    tags: ["Finance", "Financial Analysis", "Reporting", "Compliance"],
    keywords: ["financial", "analysis", "reporting", "compliance", "real-time"],
    searchableContent: "Financial Statement Analysis Agent AI-powered reporting real-time insights",
    
    painPoints: ["Manual financial analysis delays", "Inconsistent reporting formats", "Limited real-time insights", "Compliance complexity"],
    businessOpportunities: ["Real-time financial insights", "Automated compliance reporting", "Improved decision-making speed", "Enhanced accuracy"],
    kpis: ["Analysis speed", "Report accuracy", "Compliance rate", "Decision speed"],
    personas: ["CFO", "Financial Analyst", "Finance Manager"],
    
    innovationLevel: "Standard",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Low"
  },
  {
    id: "TOPAZ-FIN-003",
    name: "Risk Assessment and Management Agent",
    description: "Comprehensive risk assessment across IT infrastructure, applications, cloud environments, and third-party systems with automated risk management frameworks.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "GRC Services",
    
    industry: ["Financial Services", "Cross-Industry"],
    sapValueChain: ["Record to Report"],
    valueChainBlock: ["Risk Assessment", "Compliance Monitoring"],
    processModule: ["Risk Analysis", "Compliance", "Security"],
    domain: ["Risk Management", "Compliance"],
    
    tier: "Tier 1",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Solution",
      deliveryModel: "Hybrid",
      partnershipLevel: "Strategic",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Machine Learning", "Predictive Analytics", "Cognitive Computing"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["GRC Platforms", "Security Tools"],
    
    businessMetrics: {
      timeReduction: "75% faster risk detection",
      automationRate: "80% automated assessment",
      productivityGain: "4x improvement in risk analysis"
    },
    
    implementationComplexity: "High",
    roiTimeframe: "6-18 months",
    typicalProjectDuration: "4-8 months",
    investmentRange: "$500K-$1M",
    
    clientCaseStudies: [
      {
        industry: "Financial Services",
        challengesSolved: ["Manual risk processes", "Inconsistent evaluation", "Limited monitoring"],
        businessOutcomes: ["Automated risk identification", "Real-time monitoring", "Improved compliance"],
        metricsAchieved: ["75% faster detection", "90% automation", "60% cost reduction"]
      }
    ],
    
    competitiveAdvantage: ["Comprehensive risk coverage", "Real-time monitoring", "Automated frameworks"],
    differentiators: ["AI-driven risk assessment", "Continuous monitoring", "Integrated compliance"],
    marketPosition: "Leader",
    
    resources: {},
    
    tags: ["Risk Management", "Compliance", "Security", "Automation"],
    keywords: ["risk", "assessment", "compliance", "security", "monitoring"],
    searchableContent: "Risk Assessment Management Agent comprehensive risk IT infrastructure",
    
    painPoints: ["Manual risk assessment processes", "Inconsistent risk evaluation", "Limited real-time monitoring", "Complex compliance requirements"],
    businessOpportunities: ["Automated risk identification", "Real-time risk monitoring", "Improved compliance posture", "Reduced risk exposure"],
    kpis: ["Risk detection speed", "Assessment accuracy", "Compliance rate", "Risk exposure"],
    personas: ["Chief Risk Officer", "Risk Analyst", "Compliance Manager"],
    
    innovationLevel: "Advanced",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Medium"
  },
  {
    id: "TOPAZ-FIN-004",
    name: "Fraud Prevention Agent",
    description: "Multi-variant fraud detection system with real-time monitoring, behavioral analytics, and advanced pattern recognition for comprehensive fraud prevention.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "Financial Services",
    
    industry: ["Financial Services", "Banking"],
    sapValueChain: ["Lead to Cash", "Record to Report"],
    valueChainBlock: ["Fraud Detection", "Risk Management"],
    processModule: ["Transaction Monitoring", "Fraud Analysis", "Risk Assessment"],
    domain: ["Security", "Risk Management"],
    
    tier: "Tier 1",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Solution",
      deliveryModel: "Cloud",
      partnershipLevel: "Strategic",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Machine Learning", "Behavioral Analytics", "Pattern Recognition"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["Banking Systems", "Payment Platforms"],
    
    businessMetrics: {
      timeReduction: "90% faster fraud detection",
      automationRate: "85% automated monitoring",
      productivityGain: "5x improvement in detection speed"
    },
    
    implementationComplexity: "High",
    roiTimeframe: "3-12 months",
    typicalProjectDuration: "4-8 months",
    investmentRange: "$1M-$5M",
    
    clientCaseStudies: [
      {
        industry: "Banking",
        challengesSolved: ["Manual fraud detection", "Slow response times", "High false positives"],
        businessOutcomes: ["Real-time detection", "Reduced false positives", "Enhanced security"],
        metricsAchieved: ["90% faster detection", "70% reduction in false positives", "80% cost savings"]
      }
    ],
    
    competitiveAdvantage: ["Multi-variant detection", "Real-time processing", "Advanced analytics"],
    differentiators: ["Behavioral biometrics", "Pattern recognition", "Quantum AI exploration"],
    marketPosition: "Leader",
    
    resources: {},
    
    tags: ["Fraud Prevention", "Security", "Banking", "Real-time"],
    keywords: ["fraud", "detection", "security", "banking", "real-time"],
    searchableContent: "Fraud Prevention Agent multi-variant detection real-time monitoring",
    
    painPoints: ["Manual fraud detection", "Slow response times", "High false positives", "Complex fraud patterns"],
    businessOpportunities: ["Real-time fraud detection", "Reduced losses", "Enhanced customer trust", "Improved security"],
    kpis: ["Detection speed", "False positive rate", "Fraud prevention rate", "Customer satisfaction"],
    personas: ["Security Manager", "Risk Analyst", "Fraud Investigator"],
    
    innovationLevel: "Advanced",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Medium"
  },
  {
    id: "TOPAZ-HOR-001",
    name: "Email Sending Agent",
    description: "AI-based cognitive assistant for automated email query responses with NLP intelligence and RPA integration for comprehensive email automation.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "Applied AI Solutions",
    
    industry: ["Cross-Industry"],
    sapValueChain: ["Lead to Cash", "Source to Pay"],
    valueChainBlock: ["Customer Service", "Communication"],
    processModule: ["Email Processing", "Customer Support", "Vendor Communication"],
    domain: ["Operations", "Customer Service"],
    
    tier: "Tier 2",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Platform",
      deliveryModel: "Cloud",
      partnershipLevel: "Preferred",
      geographicFocus: ["Global"],
      clientSegment: "All"
    },
    
    aiTechnologies: ["Natural Language Processing", "Machine Learning", "RPA"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["Email Systems", "CRM", "ERP"],
    
    businessMetrics: {
      timeReduction: "80% faster response times",
      automationRate: "75% automated responses",
      productivityGain: "4x improvement in email processing"
    },
    
    implementationComplexity: "Medium",
    roiTimeframe: "3-6 months",
    typicalProjectDuration: "2-4 months",
    investmentRange: "$100K-$500K",
    
    clientCaseStudies: [
      {
        industry: "Customer Service",
        challengesSolved: ["Manual email responses", "Inconsistent replies", "High response times"],
        businessOutcomes: ["Faster responses", "Consistent quality", "Improved satisfaction"],
        metricsAchieved: ["80% faster responses", "95% consistency", "60% cost reduction"]
      }
    ],
    
    competitiveAdvantage: ["NLP intelligence", "RPA integration", "Multi-process support"],
    differentiators: ["Intent recognition", "Personalized responses", "Scalable automation"],
    marketPosition: "Challenger",
    
    resources: {},
    
    tags: ["Email", "Automation", "Customer Service", "NLP"],
    keywords: ["email", "automation", "customer service", "NLP", "responses"],
    searchableContent: "Email Sending Agent AI-based cognitive assistant automated responses",
    
    painPoints: ["Manual email processing", "Inconsistent responses", "High response times", "Resource constraints"],
    businessOpportunities: ["Automated responses", "Consistent quality", "Improved customer satisfaction", "Cost reduction"],
    kpis: ["Response time", "Response quality", "Customer satisfaction", "Cost per email"],
    personas: ["Customer Service Manager", "Operations Manager", "Support Agent"],
    
    innovationLevel: "Standard",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Low"
  },
  {
    id: "TOPAZ-HOR-002",
    name: "File Search Agent",
    description: "AI-powered document search and retrieval system with enhanced capabilities for intelligent document management and natural language query processing.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "AWS GenAI",
    
    industry: ["Healthcare", "Legal", "Cross-Industry"],
    sapValueChain: ["Record to Report", "Technology Foundation"],
    valueChainBlock: ["Document Management", "Knowledge Management"],
    processModule: ["Document Search", "Information Retrieval", "Knowledge Base"],
    domain: ["Operations", "Knowledge Management"],
    
    tier: "Tier 2",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Platform",
      deliveryModel: "Cloud",
      partnershipLevel: "Preferred",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Natural Language Processing", "Semantic Search", "Document AI"],
    cloudPlatforms: ["AWS", "Multi-Cloud"],
    integrationCapabilities: ["AWS GenAI", "Document Management Systems"],
    
    businessMetrics: {
      timeReduction: "75% faster document retrieval",
      automationRate: "80% automated search",
      productivityGain: "5x improvement in search accuracy"
    },
    
    implementationComplexity: "Medium",
    roiTimeframe: "3-9 months",
    typicalProjectDuration: "2-6 months",
    investmentRange: "$100K-$500K",
    
    clientCaseStudies: [
      {
        industry: "Healthcare",
        challengesSolved: ["Manual document search", "Poor search accuracy", "Time-consuming retrieval"],
        businessOutcomes: ["Faster search", "Better accuracy", "Improved accessibility"],
        metricsAchieved: ["75% faster retrieval", "90% search accuracy", "50% cost reduction"]
      }
    ],
    
    competitiveAdvantage: ["AI-powered extraction", "Enhanced search capabilities", "Multi-format support"],
    differentiators: ["Semantic search", "Natural language queries", "Automated enrichment"],
    marketPosition: "Challenger",
    
    resources: {},
    
    tags: ["Document Search", "AI", "Knowledge Management", "Healthcare"],
    keywords: ["document", "search", "retrieval", "AI", "knowledge"],
    searchableContent: "File Search Agent AI-powered document search retrieval system",
    
    painPoints: ["Poor search accuracy", "Time-consuming retrieval", "Information silos", "Manual processes"],
    businessOpportunities: ["Improved accessibility", "Better search accuracy", "Enhanced knowledge management", "Faster retrieval"],
    kpis: ["Search accuracy", "Retrieval time", "User satisfaction", "Document coverage"],
    personas: ["Knowledge Manager", "Research Analyst", "Information Specialist"],
    
    innovationLevel: "Standard",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Low"
  },
  {
    id: "TOPAZ-HOR-003",
    name: "Agentic RAG Agent",
    description: "Advanced retrieval-augmented generation system with autonomous agent capabilities for sophisticated information retrieval and context-aware response generation.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "LLM Integration",
    
    industry: ["Cross-Industry"],
    sapValueChain: ["Technology Foundation", "Lead to Cash"],
    valueChainBlock: ["Knowledge Management", "Customer Support"],
    processModule: ["Information Retrieval", "Content Generation", "Decision Support"],
    domain: ["AI", "Knowledge Management"],
    
    tier: "Tier 3",
    status: "Beta",
    maturityLevel: "Pilot",
    
    infosysOffering: {
      serviceType: "Platform",
      deliveryModel: "Cloud",
      partnershipLevel: "Strategic",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Large Language Models", "Vector Databases", "Semantic Search"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["LLM Platforms", "Vector Databases", "Knowledge Systems"],
    
    businessMetrics: {
      timeReduction: "90% faster information retrieval",
      automationRate: "85% automated responses",
      productivityGain: "6x improvement in response quality"
    },
    
    implementationComplexity: "High",
    roiTimeframe: "6-12 months",
    typicalProjectDuration: "4-8 months",
    investmentRange: "$500K-$1M",
    
    clientCaseStudies: [
      {
        industry: "Technology",
        challengesSolved: ["Poor context retrieval", "Inconsistent responses", "Knowledge gaps"],
        businessOutcomes: ["Enhanced accuracy", "Contextual responses", "Better user experience"],
        metricsAchieved: ["90% accuracy improvement", "85% context relevance", "70% user satisfaction"]
      }
    ],
    
    competitiveAdvantage: ["Autonomous retrieval", "Context-aware generation", "Multi-step reasoning"],
    differentiators: ["Adaptive RAG", "Real-time knowledge integration", "Autonomous agents"],
    marketPosition: "Visionary",
    
    resources: {},
    
    tags: ["RAG", "AI Agents", "LLM", "Knowledge Management"],
    keywords: ["RAG", "retrieval", "generation", "AI", "agents"],
    searchableContent: "Agentic RAG Agent retrieval-augmented generation autonomous capabilities",
    
    painPoints: ["Poor context retrieval", "Inconsistent responses", "Knowledge gaps", "Information silos"],
    businessOpportunities: ["Enhanced accuracy", "Contextual responses", "Improved user experience", "Scalable knowledge"],
    kpis: ["Response accuracy", "Context relevance", "User satisfaction", "Knowledge coverage"],
    personas: ["AI Researcher", "Knowledge Engineer", "Product Manager"],
    
    innovationLevel: "Breakthrough",
    scalabilityLevel: "Enterprise",
    implementationRisk: "High"
  },
  {
    id: "TOPAZ-HOR-004",
    name: "SDLC Automation Agent",
    description: "Comprehensive software development lifecycle automation with end-to-end development assistance, code generation, and self-healing capabilities.",
    lastUpdate: "2025-07-08",
    
    infosysPlatform: "Topaz",
    infosysSubPlatform: "GitHub Copilot Integration",
    
    industry: ["Technology", "Cross-Industry"],
    sapValueChain: ["Technology Foundation"],
    valueChainBlock: ["Development", "Testing", "Deployment"],
    processModule: ["Code Generation", "Testing", "Quality Assurance"],
    domain: ["Software Development", "DevOps"],
    
    tier: "Tier 1",
    status: "Active",
    maturityLevel: "Production",
    
    infosysOffering: {
      serviceType: "Platform",
      deliveryModel: "Cloud",
      partnershipLevel: "Strategic",
      geographicFocus: ["Global"],
      clientSegment: "Enterprise"
    },
    
    aiTechnologies: ["Code Generation", "Machine Learning", "Natural Language Processing"],
    cloudPlatforms: ["Multi-Cloud"],
    integrationCapabilities: ["GitHub Copilot", "Microsoft Tools", "Development Environments"],
    
    businessMetrics: {
      timeReduction: "80% faster code generation",
      automationRate: "70% automated development tasks",
      productivityGain: "90% improvement in development speed"
    },
    
    implementationComplexity: "High",
    roiTimeframe: "3-9 months",
    typicalProjectDuration: "3-6 months",
    investmentRange: "$500K-$1M",
    
    clientCaseStudies: [
      {
        industry: "Software Development",
        challengesSolved: ["Manual coding", "Testing delays", "Quality issues"],
        businessOutcomes: ["Faster development", "Better quality", "Reduced costs"],
        metricsAchieved: ["80% faster coding", "90% test automation", "60% cost reduction"]
      }
    ],
    
    competitiveAdvantage: ["End-to-end SDLC", "Multi-persona support", "Self-healing capabilities"],
    differentiators: ["GitHub Copilot integration", "Autonomous iteration", "Multi-language support"],
    marketPosition: "Leader",
    
    resources: {},
    
    tags: ["SDLC", "Code Generation", "Automation", "GitHub Copilot"],
    keywords: ["SDLC", "development", "automation", "code", "generation"],
    searchableContent: "SDLC Automation Agent comprehensive software development lifecycle",
    
    painPoints: ["Manual coding processes", "Testing delays", "Quality issues", "Development bottlenecks"],
    businessOpportunities: ["Faster development", "Better code quality", "Reduced costs", "Enhanced productivity"],
    kpis: ["Development speed", "Code quality", "Test coverage", "Time to market"],
    personas: ["Software Developer", "DevOps Engineer", "Tech Lead"],
    
    innovationLevel: "Advanced",
    scalabilityLevel: "Enterprise",
    implementationRisk: "Medium"
  }
];

export const infosysFilterOptions = {
  platforms: ["Topaz", "EdgeVerve AI Next", "AssistEdge", "XtractEdge", "TradeEdge", "Finacle", "Cross-Platform"],
  industries: ["Financial Services", "Healthcare", "Banking", "Cross-Industry", "Technology", "Legal", "Retail", "Government"],
  domains: ["Finance", "Operations", "Risk Management", "Compliance", "Security", "Customer Service", "AI", "Knowledge Management", "Software Development", "DevOps"],
  tiers: ["Tier 1", "Tier 2", "Tier 3"],
  status: ["Active", "Beta", "Under Development", "Pilot"],
  maturityLevels: ["Proof of Concept", "Pilot", "Production", "Scale"],
  serviceTypes: ["Consulting", "Implementation", "Managed Services", "Platform", "Solution"],
  deliveryModels: ["On-Premise", "Cloud", "Hybrid", "SaaS"],
  partnershipLevels: ["Strategic", "Preferred", "Certified", "Standard"],
  clientSegments: ["Enterprise", "Mid-Market", "SMB", "Government", "All"],
  complexityLevels: ["Low", "Medium", "High"],
  innovationLevels: ["Breakthrough", "Advanced", "Standard", "Mature"],
  marketPositions: ["Leader", "Challenger", "Visionary", "Niche Player"],
  scalabilityLevels: ["Department", "Enterprise", "Global", "Ecosystem"],
  riskLevels: ["Low", "Medium", "High"]
};