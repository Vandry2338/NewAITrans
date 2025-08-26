"use client"

import { useState } from "react"
import {
  FileText,
  Layers,
  Building,
  Cpu,
  Database,
  Cloud,
  Shield,
  Zap,
  Users,
  Target,
  Rocket,
  BookOpen,
} from "lucide-react"

interface ReferencesViewProps {
  onItemSelect?: (itemId: string) => void
  className?: string
}

const referenceData = [
  {
    id: "enterprise-architecture",
    name: "Enterprise Architecture",
    description: "Comprehensive enterprise architecture frameworks and patterns",
    icon: Building,
    category: "Framework",
    maturity: "Mature",
    solutions: 25,
  },
  {
    id: "microservices-patterns",
    name: "Microservices Patterns",
    description: "Microservices architecture patterns and best practices",
    icon: Cpu,
    category: "Pattern",
    maturity: "Mature",
    solutions: 18,
  },
  {
    id: "data-architecture",
    name: "Data Architecture",
    description: "Data modeling, governance and integration patterns",
    icon: Database,
    category: "Architecture",
    maturity: "Mature",
    solutions: 22,
  },
  {
    id: "cloud-native",
    name: "Cloud Native",
    description: "Cloud-native application development patterns",
    icon: Cloud,
    category: "Pattern",
    maturity: "Emerging",
    solutions: 15,
  },
  {
    id: "security-patterns",
    name: "Security Patterns",
    description: "Security architecture and implementation patterns",
    icon: Shield,
    category: "Security",
    maturity: "Mature",
    solutions: 20,
  },
  {
    id: "integration-patterns",
    name: "Integration Patterns",
    description: "System integration and API design patterns",
    icon: Zap,
    category: "Pattern",
    maturity: "Mature",
    solutions: 16,
  },
  {
    id: "user-experience",
    name: "User Experience",
    description: "UX design patterns and accessibility guidelines",
    icon: Users,
    category: "Design",
    maturity: "Emerging",
    solutions: 12,
  },
  {
    id: "business-processes",
    name: "Business Processes",
    description: "Standardized business process templates",
    icon: Target,
    category: "Template",
    maturity: "Mature",
    solutions: 30,
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    description: "Digital transformation roadmaps and strategies",
    icon: Rocket,
    category: "Strategy",
    maturity: "Emerging",
    solutions: 14,
  },
  {
    id: "knowledge-management",
    name: "Knowledge Management",
    description: "Knowledge management and documentation frameworks",
    icon: BookOpen,
    category: "Framework",
    maturity: "Mature",
    solutions: 11,
  },
  {
    id: "quality-assurance",
    name: "Quality Assurance",
    description: "QA frameworks and testing methodologies",
    icon: Shield,
    category: "Framework",
    maturity: "Mature",
    solutions: 19,
  },
  {
    id: "agile-frameworks",
    name: "Agile Frameworks",
    description: "Agile development and project management frameworks",
    icon: Layers,
    category: "Framework",
    maturity: "Mature",
    solutions: 17,
  },
]

export function ReferencesView({ onItemSelect, className = "" }: ReferencesViewProps) {
  const [selectedReference, setSelectedReference] = useState<string | null>(null)

  const handleReferenceClick = (referenceId: string) => {
    setSelectedReference(referenceId)
    onItemSelect?.(referenceId)
  }

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "Mature":
        return "bg-green-100 text-green-800"
      case "Emerging":
        return "bg-yellow-100 text-yellow-800"
      case "Experimental":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Framework":
        return "from-blue-500 to-cyan-500"
      case "Pattern":
        return "from-green-500 to-emerald-500"
      case "Architecture":
        return "from-purple-500 to-pink-500"
      case "Security":
        return "from-red-500 to-orange-500"
      case "Design":
        return "from-indigo-500 to-blue-500"
      case "Template":
        return "from-teal-500 to-green-500"
      case "Strategy":
        return "from-violet-500 to-purple-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Reference Architectures & Blueprints
        </h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Solution packages, templates and artifacts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {referenceData.map((reference) => {
          const Icon = reference.icon
          return (
            <div
              key={reference.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleReferenceClick(reference.id)}
            >
              <div
                className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: selectedReference === reference.id ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                  borderColor: selectedReference === reference.id ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  minHeight: "220px",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${getCategoryColor(reference.category)} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "var(--text-default)" }}
                  >
                    {reference.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {reference.description}
                  </p>
                  
                  {/* Stats and Badges */}
                  <div className="space-y-2">
                    <div className="flex justify-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaturityColor(reference.maturity)}`}>
                        {reference.maturity}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {reference.category}
                      </span>
                    </div>
                    
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {reference.solutions} Solutions Available
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--grad-primary)",
                      color: "white",
                    }}
                  >
                    Explore →
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReferencesView
