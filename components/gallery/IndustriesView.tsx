"use client"

import { useState } from "react"
import {
  Building2,
  Car,
  ShoppingCart,
  HardHat,
  Factory,
  Briefcase,
  Building,
  Store,
  Zap,
  Plane,
  Heart,
  Phone,
  Film,
  Banknote,
  Shield,
  Wheat,
  Stethoscope,
  Fuel,
  FlaskConical,
  GraduationCap,
  Truck,
  Cpu,
  Pickaxe,
  Hammer,
  Rocket,
  UserCheck,
} from "lucide-react"

interface IndustriesViewProps {
  onItemSelect?: (itemId: string) => void
  className?: string
}

const industryData = [
  {
    id: "automotive",
    name: "Automotive",
    description: "Deliver innovative solutions on the road to new mobility, while running a profitable automotive business.",
    icon: Car,
    solutions: 24,
    processes: 12,
  },
  {
    id: "consumer-products",
    name: "Consumer Products",
    description: "Embrace intelligent technologies and next-gen business processes to deliver personalization with a purpose.",
    icon: ShoppingCart,
    solutions: 18,
    processes: 8,
  },
  {
    id: "engineering-construction",
    name: "Engineering, Construction & Operations",
    description: "Convert bids into profitable contracts and deliver projects on time and on budget by digitalizing expertise and assets.",
    icon: HardHat,
    solutions: 32,
    processes: 15,
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    description: "Accelerate digitalization and drive strategic and sustainable growth",
    icon: Factory,
    solutions: 28,
    processes: 14,
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Meet client needs and generate revenue by blending data and processes and managing workers in the cloud.",
    icon: Briefcase,
    solutions: 22,
    processes: 10,
  },
  {
    id: "public-sector",
    name: "Public Sector",
    description: "Empower governments and public sector organizations to deliver the core objectives of the public sector with intelligent solutions and automated processes.",
    icon: Building,
    solutions: 35,
    processes: 18,
  },
  {
    id: "retail",
    name: "Retail",
    description: "Give shoppers and consumers the products and personalized shopping experiences they want.",
    icon: Store,
    solutions: 20,
    processes: 9,
  },
  {
    id: "utilities",
    name: "Utilities",
    description: "Inspire and shape a digital world.",
    icon: Zap,
    solutions: 16,
    processes: 7,
  },
  {
    id: "travel-transportation",
    name: "Travel & Transportation",
    description: "Digitalize to provide a reliable, personalized experience while driving innovation in the digital enterprise and increasing profitability",
    icon: Plane,
    solutions: 26,
    processes: 13,
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    description: "Ensure better patient outcomes with innovation in pharma supply chain planning and digital manufacturing excellence.",
    icon: Heart,
    solutions: 30,
    processes: 16,
  },
  {
    id: "telecommunications",
    name: "Telecommunications",
    description: "Shaping how people interact and how business gets done",
    icon: Phone,
    solutions: 19,
    processes: 11,
  },
  {
    id: "media",
    name: "Media & Entertainment",
    description: "Helping media and entertainment companies reach new audiences, manage revenue and drive content profitability in the cloud",
    icon: Film,
    solutions: 15,
    processes: 6,
  },
  {
    id: "banking",
    name: "Banking",
    description: "Enable Financial Services organizations supporting financial supply chains in networks of agile, resilient, intelligent and sustainable enterprises",
    icon: Banknote,
    solutions: 33,
    processes: 17,
  },
  {
    id: "insurance",
    name: "Insurance",
    description: "Digitize end to end processes by leveraging sustainable intelligent technologies across the insurance front, middle and back office and its ecosystems.",
    icon: Shield,
    solutions: 21,
    processes: 9,
  },
  {
    id: "agribusiness",
    name: "Agribusiness",
    description: "Transform and grow in an integrated industry ecosystem to sustainably feed the world.",
    icon: Wheat,
    solutions: 14,
    processes: 5,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Improve patient outcomes and deliver cost-effective care.",
    icon: Stethoscope,
    solutions: 29,
    processes: 15,
  },
]

export function IndustriesView({ onItemSelect, className = "" }: IndustriesViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)

  const handleIndustryClick = (industryId: string) => {
    setSelectedIndustry(industryId)
    onItemSelect?.(industryId)
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
          Industries & Value Chains
        </h2>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Explore solutions by industry sectors and value chains
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryData.map((industry) => {
          const Icon = industry.icon
          return (
            <div
              key={industry.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => handleIndustryClick(industry.id)}
            >
              <div
                className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: selectedIndustry === industry.id ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                  borderColor: selectedIndustry === industry.id ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                  minHeight: "200px",
                }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3
                    className="text-lg font-semibold leading-tight"
                    style={{ color: "var(--text-default)" }}
                  >
                    {industry.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {industry.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex justify-center gap-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    <span>{industry.solutions} Solutions</span>
                    <span>{industry.processes} Processes</span>
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

export default IndustriesView
