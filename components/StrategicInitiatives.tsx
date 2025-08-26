"use client"

import React, { useState } from "react"
import { Building2, Car, Factory, Store, Zap, Film, Banknote, Wheat, Stethoscope, Cpu, Target } from "lucide-react"

// Strategic Initiatives Data
const mockInitiatives = [
  // Education Industry
  {
    id: "edu-1",
    title: "Digital Transformation in Learning",
    hypothesis: "Schools and universities are investing in digital platforms, online learning, and educational technology to enhance access and efficiency",
    valueDriver: "Access & Efficiency",
    horizon: "Fast Lane",
    industry: "Education",
    process: "Service Delivery",
    kpiIds: ["student-engagement", "learning-outcomes"],
    painPointIds: ["technology-gaps", "digital-divide"],
    source: "Deloitte Education Industry Report",
    year: "2024",
    reference: "Expanding virtual classrooms, interactive e-learning content, and data analytics to personalize student learning experiences",
    sourceType: "Industry Report",
    investmentRange: "$1M - $3M",
    timeline: "12-18 months",
    riskLevel: "Low",
    processes: ["curriculum-delivery", "student-assessment", "administrative-services"],
    icon: "cpu",
  },
  {
    id: "edu-2",
    title: "Student Success & Engagement Programs",
    hypothesis: "Implementing mentorship programs, mental health support, and data-driven early warning systems will improve student retention and outcomes",
    valueDriver: "Student Success",
    horizon: "Fast Lane",
    industry: "Education",
    process: "Student Support",
    kpiIds: ["graduation-rates", "student-satisfaction"],
    painPointIds: ["student-retention", "mental-health"],
    source: "Deloitte Education Industry Report",
    year: "2024",
    reference: "Boosting graduation rates and rebuilding public trust by demonstrating better student success and transparency",
    sourceType: "Industry Report",
    investmentRange: "$500K - $2M",
    timeline: "6-12 months",
    riskLevel: "Medium",
    processes: ["student-services", "academic-support", "wellness-programs"],
    icon: "users",
  },
  {
    id: "edu-3",
    title: "Workforce-Aligned Curriculum",
    hypothesis: "Aligning curricula with rapidly evolving workforce needs will ensure graduates' skills match labor market demand",
    valueDriver: "Market Relevance",
    horizon: "Core",
    industry: "Education",
    process: "Curriculum Development",
    kpiIds: ["employment-rates", "industry-partnerships"],
    painPointIds: ["skills-gap", "curriculum-outdated"],
    source: "Deloitte Education Industry Report",
    year: "2024",
    reference: "Updating academic programs, adding practical skills training, and offering alternative credentials alongside degrees",
    sourceType: "Industry Report",
    investmentRange: "$2M - $5M",
    timeline: "18-24 months",
    riskLevel: "Medium",
    processes: ["curriculum-design", "industry-partnerships", "skills-assessment"],
    icon: "target",
  },
  // Construction & Real Estate
  {
    id: "const-1",
    title: "Workforce Development and Safety",
    hypothesis: "Tackling labor shortages through upskilling and diversifying workforce while implementing stricter safety protocols",
    valueDriver: "Workforce Excellence",
    horizon: "Fast Lane",
    industry: "Construction & Real Estate",
    process: "Human Resources",
    kpiIds: ["safety-incidents", "workforce-retention"],
    painPointIds: ["labor-shortage", "safety-concerns"],
    source: "Deloitte Construction Industry Analysis",
    year: "2024",
    reference: "Apprenticeship programs, cross-training, and partnering with schools to attract new talent while emphasizing safety and disaster planning",
    sourceType: "Industry Report",
    investmentRange: "$1M - $4M",
    timeline: "12-18 months",
    riskLevel: "Medium",
    processes: ["recruitment", "training", "safety-management"],
    icon: "building2",
  },
  {
    id: "const-2",
    title: "Digital and Tech Integration",
    hypothesis: "Investing in advanced technologies like BIM, drones, and AI will improve project efficiency and reduce delays",
    valueDriver: "Operational Efficiency",
    horizon: "Core",
    industry: "Construction & Real Estate",
    process: "Project Management",
    kpiIds: ["project-completion-time", "cost-overruns"],
    painPointIds: ["project-delays", "cost-overruns"],
    source: "Deloitte Construction Industry Analysis",
    year: "2024",
    reference: "Digital project management and connected construction tools scaling across the value chain with IoT sensors and digital twins",
    sourceType: "Industry Report",
    investmentRange: "$2M - $8M",
    timeline: "18-36 months",
    riskLevel: "High",
    processes: ["project-planning", "construction-monitoring", "quality-control"],
    icon: "cpu",
  },
  // Financial Services
  {
    id: "fin-1",
    title: "Customer-Centric Digital Banking",
    hypothesis: "Delivering hyper-personalized, seamless customer experiences across all channels will drive growth and retention",
    valueDriver: "Customer Experience",
    horizon: "Fast Lane",
    industry: "Financial Services",
    process: "Customer Service",
    kpiIds: ["customer-satisfaction", "digital-adoption"],
    painPointIds: ["customer-experience", "digital-gaps"],
    source: "Slalom Banking Trends Report",
    year: "2025",
    reference: "Netflix-level personalization in banking with AI-tailored product offers, advice, and communications",
    sourceType: "Industry Report",
    investmentRange: "$5M - $15M",
    timeline: "12-24 months",
    riskLevel: "Medium",
    processes: ["customer-onboarding", "product-recommendations", "support-services"],
    icon: "banknote",
  },
  {
    id: "fin-2",
    title: "Cybersecurity and Fraud Prevention",
    hypothesis: "Investing in advanced security measures and AI-driven fraud detection will maintain customer trust and regulatory compliance",
    valueDriver: "Security & Trust",
    horizon: "Core",
    industry: "Financial Services",
    process: "Risk Management",
    kpiIds: ["fraud-detection-rate", "security-incidents"],
    painPointIds: ["cyber-threats", "fraud-losses"],
    source: "Slalom Banking Trends Report",
    year: "2025",
    reference: "AI and machine learning systems to detect anomalous transactions and thwart fraud in real time",
    sourceType: "Industry Report",
    investmentRange: "$3M - $10M",
    timeline: "6-18 months",
    riskLevel: "High",
    processes: ["threat-detection", "incident-response", "compliance-monitoring"],
    icon: "shield",
  },
  // Technology
  {
    id: "tech-1",
    title: "AI and Machine Learning Integration",
    hypothesis: "Embedding AI and ML into products will add smart features and optimize internal operations",
    valueDriver: "Innovation",
    horizon: "Fast Lane",
    industry: "Technology",
    process: "Product Development",
    kpiIds: ["ai-feature-adoption", "development-efficiency"],
    painPointIds: ["competitive-pressure", "innovation-gaps"],
    source: "McKinsey AI Trends Report",
    year: "2024",
    reference: "AI-driven analytics in enterprise software and machine learning personalization in consumer apps",
    sourceType: "Industry Report",
    investmentRange: "$2M - $12M",
    timeline: "6-18 months",
    riskLevel: "Medium",
    processes: ["research-development", "product-enhancement", "quality-assurance"],
    icon: "cpu",
  },
  // Healthcare
  {
    id: "health-1",
    title: "Telehealth and Virtual Care Expansion",
    hypothesis: "Solidifying telemedicine as a standard component of care delivery will expand access and manage capacity",
    valueDriver: "Access & Efficiency",
    horizon: "Fast Lane",
    industry: "Healthcare",
    process: "Patient Care",
    kpiIds: ["patient-access", "care-efficiency"],
    painPointIds: ["access-barriers", "capacity-constraints"],
    source: "Deloitte Healthcare Trends",
    year: "2025",
    reference: "Virtual visits and digital therapeutics with remote monitoring integrated into care pathways",
    sourceType: "Industry Report",
    investmentRange: "$1M - $5M",
    timeline: "3-12 months",
    riskLevel: "Low",
    processes: ["patient-consultation", "remote-monitoring", "digital-therapeutics"],
    icon: "stethoscope",
  },
  // Manufacturing
  {
    id: "mfg-1",
    title: "Smart Factory & Industry 4.0",
    hypothesis: "Deploying IoT sensors, robotics, and real-time analytics will create smart operations with higher productivity",
    valueDriver: "Operational Excellence",
    horizon: "Core",
    industry: "Manufacturing",
    process: "Production",
    kpiIds: ["equipment-efficiency", "production-quality"],
    painPointIds: ["equipment-downtime", "quality-issues"],
    source: "Deloitte Manufacturing Trends",
    year: "2024",
    reference: "Smart factories with IoT sensors, robotics, and real-time data analytics enabling predictive maintenance",
    sourceType: "Industry Report",
    investmentRange: "$5M - $20M",
    timeline: "18-36 months",
    riskLevel: "High",
    processes: ["production-planning", "quality-control", "maintenance"],
    icon: "factory",
  },
  // Retail
  {
    id: "retail-1",
    title: "Omnichannel Integration",
    hypothesis: "Implementing unified omnichannel strategies will provide seamless customer experiences across all touchpoints",
    valueDriver: "Customer Experience",
    horizon: "Fast Lane",
    industry: "Retail",
    process: "Customer Experience",
    kpiIds: ["customer-satisfaction", "channel-integration"],
    painPointIds: ["channel-silos", "inconsistent-experience"],
    source: "Food Navigator Retail Trends",
    year: "2024",
    reference: "Buy-online-pickup-in-store, real-time inventory visibility, and consistent pricing across channels",
    sourceType: "Industry Report",
    investmentRange: "$2M - $8M",
    timeline: "12-24 months",
    riskLevel: "Medium",
    processes: ["inventory-management", "order-fulfillment", "customer-service"],
    icon: "store",
  },
  // Energy & Utilities
  {
    id: "energy-1",
    title: "Renewable Energy Expansion",
    hypothesis: "Massive investments in renewable generation will drive decarbonization goals and policy incentives",
    valueDriver: "Sustainability",
    horizon: "Core",
    industry: "Energy & Utilities",
    process: "Energy Generation",
    kpiIds: ["renewable-capacity", "carbon-reduction"],
    painPointIds: ["grid-reliability", "energy-transition"],
    source: "Deloitte Energy Industry Report",
    year: "2024",
    reference: "Solar power projected as fastest-growing energy source with large-scale wind farms and solar parks",
    sourceType: "Industry Report",
    investmentRange: "$50M - $500M",
    timeline: "24-60 months",
    riskLevel: "High",
    processes: ["generation-planning", "grid-integration", "energy-storage"],
    icon: "zap",
  },
]

const industryIcons: Record<string, any> = {
  Technology: Cpu,
  "Financial Services": Banknote,
  Manufacturing: Factory,
  "Energy & Utilities": Zap,
  Retail: Store,
  Automotive: Car,
  Healthcare: Stethoscope,
  Agriculture: Wheat,
  "Media & Entertainment": Film,
  "Construction & Real Estate": Building2,
  Education: Target,
  default: Target,
}

const processColors: Record<string, string> = {
  "Service Delivery": "from-blue-500 to-blue-700",
  "Student Support": "from-green-500 to-green-700",
  "Curriculum Development": "from-purple-500 to-purple-700",
  "Human Resources": "from-orange-500 to-orange-700",
  "Project Management": "from-teal-500 to-teal-700",
  "Customer Service": "from-blue-500 to-blue-700",
  "Risk Management": "from-red-500 to-red-700",
  "Product Development": "from-indigo-500 to-indigo-700",
  "Patient Care": "from-green-500 to-green-700",
  Production: "from-gray-500 to-gray-700",
  "Customer Experience": "from-pink-500 to-pink-700",
  "Energy Generation": "from-yellow-500 to-yellow-700",
  default: "from-gray-500 to-gray-700",
}

export default function StrategicInitiatives() {
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null)
  const [selectedIndustryFilter, setSelectedIndustryFilter] = useState<string>("All")
  const [selectedInitiatives, setSelectedInitiatives] = useState<string[]>([])

  // Get unique industries for filtering
  const availableIndustries = ["All", ...Array.from(new Set(mockInitiatives.map(initiative => initiative.industry)))]
  
  // Filter initiatives based on selected industry
  const filteredInitiatives = selectedIndustryFilter === "All" 
    ? mockInitiatives 
    : mockInitiatives.filter(initiative => initiative.industry === selectedIndustryFilter)

  const handleInitiativeSelection = (initiativeId: string) => {
    setSelectedInitiatives(prev => 
      prev.includes(initiativeId) 
        ? prev.filter(id => id !== initiativeId)
        : [...prev, initiativeId]
    )
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Strategic Initiatives by Industry
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Industry-mapped strategic initiatives with source references and process alignment
        </p>
      </div>

      {/* Industry Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableIndustries.map((industry) => (
          <button
            key={industry}
            onClick={() => setSelectedIndustryFilter(industry)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedIndustryFilter === industry
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-300'
            }`}
            style={{ fontFamily: '"72", "Helvetica Neue", Arial, sans-serif' }}
          >
            {industry}
          </button>
        ))}
      </div>

      {/* Progress Summary - Matching Industry Trends Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="premium-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                {selectedInitiatives.length}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Selected
              </p>
            </div>
          </div>
        </div>

        <div className="premium-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                {filteredInitiatives.length}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Available
              </p>
            </div>
          </div>
        </div>

        <div className="premium-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                {availableIndustries.length - 1}
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
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--text-default)" }}>
                {Math.round((selectedInitiatives.length / filteredInitiatives.length) * 100) || 0}
              </p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    % Selected
                  </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      {selectedInitiatives.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-800">
              {selectedInitiatives.length} initiative{selectedInitiatives.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedInitiatives([])}
                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => {
                  // TODO: Implement add to board functionality
                  alert(`Adding ${selectedInitiatives.length} initiatives to your board!`)
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Board
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInitiatives.map((initiative) => {
          const IconComponent = industryIcons[initiative.industry] || industryIcons.default
          const processColorClass = processColors[initiative.process] || processColors.default
          const isSelected = selectedInitiatives.includes(initiative.id)

          return (
            <div
              key={initiative.id}
              onClick={() => setSelectedInitiative(initiative)}
              className={`group rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
              style={{
                backgroundColor: isSelected ? "#eff6ff" : "white",
                borderColor: isSelected ? "#3b82f6" : "rgba(0, 0, 0, 0.1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Icon and Industry Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg"
                    style={{ background: "var(--grad-primary)" }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleInitiativeSelection(initiative.id)
                    }}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    {initiative.industry}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {initiative.year}
                  </div>
                </div>
              </div>

              {/* Title and Hypothesis */}
              <h4 className="font-semibold text-lg mb-3 line-clamp-2" style={{ color: "var(--text-default)" }}>
                {initiative.title}
              </h4>

              <p className="text-sm mb-4 line-clamp-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {initiative.hypothesis}
              </p>

              {/* Process and Value Driver Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${processColorClass}`}
                >
                  {initiative.process}
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(46, 138, 246, 0.1)",
                    color: "var(--blue-600)",
                  }}
                >
                  {initiative.valueDriver}
                </span>
              </div>

              {/* Horizon Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    initiative.horizon === "Fast Lane"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  }`}
                >
                  {initiative.horizon}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {initiative.kpiIds.length} KPIs
                  </span>
                </div>
              </div>

              {/* Source Reference */}
              <div className="pt-3 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                <div className="text-xs font-medium mb-1" style={{ color: "var(--text)" }}>
                  Source: {initiative.source}
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {initiative.reference}
                </div>
              </div>

              {/* Hover Effect Indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-xs text-center font-medium" style={{ color: "var(--blue-600)" }}>
                  Click to view details →
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Initiative Detail Modal */}
      {selectedInitiative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{ boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-xl"
                  style={{ background: "var(--grad-primary)" }}
                >
                  {React.createElement(industryIcons[selectedInitiative.industry] || industryIcons.default, {
                    className: "h-8 w-8 text-white",
                  })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {selectedInitiative.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {selectedInitiative.industry} • {selectedInitiative.year}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInitiative(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                  Hypothesis
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {selectedInitiative.hypothesis}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Process
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${
                      processColors[selectedInitiative.process] || processColors.default
                    }`}
                  >
                    {selectedInitiative.process}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                    Value Driver
                  </h4>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(46, 138, 246, 0.1)",
                      color: "var(--blue-600)",
                    }}
                  >
                    {selectedInitiative.valueDriver}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                  Source Reference
                </h4>
                <div className="p-4 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                  <div className="font-medium mb-1" style={{ color: "var(--text)" }}>
                    {selectedInitiative.source} ({selectedInitiative.year})
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {selectedInitiative.reference}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: "rgba(0, 0, 0, 0.1)" }}>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  <strong>{selectedInitiative.kpiIds.length}</strong> linked KPIs
                </div>
                <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                  <strong>{selectedInitiative.painPointIds.length}</strong> pain points addressed
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
