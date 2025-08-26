"use client"

import { useState } from "react"
import {
  Grid3X3,
  Building,
  Users,
  Cpu,
  Database,
  Shield,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Heart,
  Rocket,
  BookOpen,
  Settings,
  BarChart3,
  FileText,
} from "lucide-react"

interface BcmViewProps {
  onItemSelect?: (itemId: string) => void
  className?: string
}

const bcmData = [
  {
    id: "strategy-management",
    name: "Strategy Management",
    description: "Strategic planning, governance and performance management capabilities",
    icon: Target,
    category: "Strategic",
    maturity: "Mature",
    subcapabilities: 8,
    solutions: 22,
  },
  {
    id: "customer-management",
    name: "Customer Management",
    description: "Customer relationship management and customer experience capabilities",
    icon: Users,
    category: "Customer",
    maturity: "Mature",
    subcapabilities: 12,
    solutions: 28,
  },
  {
    id: "product-management",
    name: "Product Management",
    description: "Product development, lifecycle management and innovation capabilities",
    icon: Cpu,
    category: "Product",
    maturity: "Mature",
    subcapabilities: 10,
    solutions: 25,
  },
  {
    id: "service-management",
    name: "Service Management",
    description: "Service delivery, support and operations management capabilities",
    icon: Heart,
    category: "Service",
    maturity: "Mature",
    subcapabilities: 9,
    solutions: 20,
  },
  {
    id: "enterprise-management",
    name: "Enterprise Management",
    description: "Corporate governance, risk management and compliance capabilities",
    icon: Building,
    category: "Governance",
    maturity: "Mature",
    subcapabilities: 11,
    solutions: 24,
  },
  {
    id: "technology-management",
    name: "Technology Management",
    description: "IT infrastructure, architecture and technology governance capabilities",
    icon: Zap,
    category: "Technology",
    maturity: "Mature",
    subcapabilities: 15,
    solutions: 32,
  },
  {
    id: "data-management",
    name: "Data Management",
    description: "Data governance, analytics and information management capabilities",
    icon: Database,
    category: "Data",
    maturity: "Emerging",
    subcapabilities: 8,
    solutions: 18,
  },
  {
    id: "security-management",
    name: "Security Management",
    description: "Cybersecurity, privacy and risk management capabilities",
    icon: Shield,
    category: "Security",
    maturity: "Mature",
    subcapabilities: 7,
    solutions: 16,
  },
  {
    id: "operations-management",
    name: "Operations Management",
    description: "Operational excellence, process optimization and quality management",
    icon: Settings,
    category: "Operations",
    maturity: "Mature",
    subcapabilities: 13,
    solutions: 30,
  },
  {
    id: "financial-management",
    name: "Financial Management",
    description: "Financial planning, accounting and performance management capabilities",
    icon: BarChart3,
    category: "Financial",
    maturity: "Mature",
    subcapabilities: 9,
    solutions: 21,
  },
  {
    id: "human-resources",
    name: "Human Resources",
    description: "Talent management, workforce planning and HR operations capabilities",
    icon: Users,
    category: "People",
    maturity: "Mature",
    subcapabilities: 11,
    solutions: 23,
  },
  {
    id: "supply-chain",
    name: "Supply Chain Management",
    description: "Supply chain planning, execution and optimization capabilities",
    icon: Globe,
    category: "Operations",
    maturity: "Mature",
    subcapabilities: 12,
    solutions: 26,
  },
  {
    id: "innovation-management",
    name: "Innovation Management",
    description: "Research, development and innovation management capabilities",
    icon: Rocket,
    category: "Strategic",
    maturity: "Emerging",
    subcapabilities: 6,
    solutions: 14,
  },
  {
    id: "knowledge-management",
    name: "Knowledge Management",
    description: "Knowledge capture, sharing and organizational learning capabilities",
    icon: BookOpen,
    category: "Strategic",
    maturity: "Emerging",
    subcapabilities: 5,
    solutions: 12,
  },
  {
    id: "change-management",
    name: "Change Management",
    description: "Organizational change, transformation and adoption management capabilities",
    icon: TrendingUp,
    category: "Strategic",
    maturity: "Emerging",
    subcapabilities: 7,
    solutions: 15,
  },
]

export function BcmView({ onItemSelect, className = "" }: BcmViewProps) {
  const [selectedCapability, setSelectedCapability] = useState<string | null>(null)

  const handleCapabilityClick = (capabilityId: string) => {
    setSelectedCapability(capabilityId)
    onItemSelect?.(capabilityId)
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
      case "Strategic":
        return "from-purple-500 to-pink-500"
      case "Customer":
        return "from-blue-500 to-cyan-500"
      case "Product":
        return "from-green-500 to-emerald-500"
      case "Service":
        return "from-red-500 to-orange-500"
      case "Governance":
        return "from-indigo-500 to-blue-500"
      case "Technology":
        return "from-teal-500 to-green-500"
      case "Data":
        return "from-violet-500 to-purple-500"
      case "Security":
        return "from-red-500 to-pink-500"
      case "Operations":
        return "from-orange-500 to-red-500"
      case "Financial":
        return "from-emerald-500 to-teal-500"
      case "People":
        return "from-cyan-500 to-blue-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Business Capability Model (BCM) Categories
        </h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Capability domains and business areas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bcmData.map((capability) => {
          const Icon = capability.icon
          return (
            <div
              key={capability.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleCapabilityClick(capability.id)}
            >
              <div
                className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: selectedCapability === capability.id ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                  borderColor: selectedCapability === capability.id ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  minHeight: "220px",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br ${getCategoryColor(capability.category)} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "var(--text-default)" }}
                  >
                    {capability.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {capability.description}
                  </p>
                  
                  {/* Stats and Badges */}
                  <div className="space-y-2">
                    <div className="flex justify-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaturityColor(capability.maturity)}`}>
                        {capability.maturity}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {capability.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span>{capability.subcapabilities} Subcapabilities</span>
                      <span>{capability.solutions} Solutions</span>
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

export default BcmView
