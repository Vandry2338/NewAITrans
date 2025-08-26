"use client"

import { useState } from "react"
import {
  Workflow,
  ShoppingCart,
  CreditCard,
  Factory,
  FileText,
  Users,
  TrendingUp,
  Package,
  Truck,
  Calculator,
  Shield,
  Heart,
  Plane,
  Building,
  Zap,
} from "lucide-react"

interface ProcessesViewProps {
  onItemSelect?: (itemId: string) => void
  className?: string
}

const processData = [
  {
    id: "order-to-cash",
    name: "Order to Cash",
    description: "End-to-end process from customer order to cash collection",
    icon: ShoppingCart,
    subprocesses: 8,
    solutions: 15,
    complexity: "Medium",
  },
  {
    id: "procure-to-pay",
    name: "Procure to Pay",
    description: "Complete procurement process from requisition to payment",
    icon: CreditCard,
    subprocesses: 6,
    solutions: 12,
    complexity: "Medium",
  },
  {
    id: "plan-to-produce",
    name: "Plan to Produce",
    description: "Production planning and execution processes",
    icon: Factory,
    subprocesses: 10,
    solutions: 18,
    complexity: "High",
  },
  {
    id: "record-to-report",
    name: "Record to Report",
    description: "Financial accounting and reporting processes",
    icon: FileText,
    subprocesses: 7,
    solutions: 14,
    complexity: "Medium",
  },
  {
    id: "hire-to-retire",
    name: "Hire to Retire",
    description: "Complete employee lifecycle management",
    icon: Users,
    subprocesses: 9,
    solutions: 16,
    complexity: "Medium",
  },
  {
    id: "lead-to-cash",
    name: "Lead to Cash",
    description: "Sales process from lead generation to cash collection",
    icon: TrendingUp,
    subprocesses: 12,
    solutions: 22,
    complexity: "High",
  },
  {
    id: "source-to-pay",
    name: "Source to Pay",
    description: "Strategic sourcing and procurement processes",
    icon: Package,
    subprocesses: 8,
    solutions: 13,
    complexity: "Medium",
  },
  {
    id: "logistics",
    name: "Logistics & Distribution",
    description: "Transportation, warehousing and distribution processes",
    icon: Truck,
    subprocesses: 6,
    solutions: 11,
    complexity: "Medium",
  },
  {
    id: "financial-planning",
    name: "Financial Planning & Analysis",
    description: "Budgeting, forecasting and financial analysis",
    icon: Calculator,
    subprocesses: 5,
    solutions: 9,
    complexity: "Low",
  },
  {
    id: "risk-management",
    name: "Risk Management",
    description: "Risk identification, assessment and mitigation",
    icon: Shield,
    subprocesses: 7,
    solutions: 12,
    complexity: "Medium",
  },
  {
    id: "quality-management",
    name: "Quality Management",
    description: "Quality control and assurance processes",
    icon: Heart,
    subprocesses: 6,
    solutions: 10,
    complexity: "Medium",
  },
  {
    id: "travel-expense",
    name: "Travel & Expense",
    description: "Travel booking and expense management",
    icon: Plane,
    subprocesses: 4,
    solutions: 7,
    complexity: "Low",
  },
  {
    id: "asset-management",
    name: "Asset Management",
    description: "Asset lifecycle and maintenance management",
    icon: Building,
    subprocesses: 8,
    solutions: 13,
    complexity: "Medium",
  },
  {
    id: "energy-management",
    name: "Energy Management",
    description: "Energy consumption monitoring and optimization",
    icon: Zap,
    subprocesses: 5,
    solutions: 8,
    complexity: "Low",
  },
]

export function ProcessesView({ onItemSelect, className = "" }: ProcessesViewProps) {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)

  const handleProcessClick = (processId: string) => {
    setSelectedProcess(processId)
    onItemSelect?.(processId)
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          End-to-End Processes & Subprocesses
        </h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Browse E2E processes and business modules
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processData.map((process) => {
          const Icon = process.icon
          return (
            <div
              key={process.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleProcessClick(process.id)}
            >
              <div
                className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: selectedProcess === process.id ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                  borderColor: selectedProcess === process.id ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  minHeight: "220px",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "var(--text-default)" }}
                  >
                    {process.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {process.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{process.subprocesses} Subprocesses</span>
                    <span>{process.solutions} Solutions</span>
                  </div>

                  {/* Complexity Badge */}
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(process.complexity)}`}>
                      {process.complexity} Complexity
                    </span>
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

export default ProcessesView
