"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Workflow, FileText, Grid3X3, Sparkles, Zap, Users, Brain, Bot, Rocket, Cog } from "lucide-react"
import Ballpit from "@/components/effects/Ballpit"

export default function SolutionsGalleryLandingPage() {
  const router = useRouter()
  const [hoveredTile, setHoveredTile] = useState<string | null>(null)

  const menuItems = [
    {
      key: "topaz-explorer",
      label: "Infosys Topaz Explorer",
      description: "AI-powered solution discovery and recommendation engine",
      icon: Sparkles,
      path: "/gallery/topaz",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      key: "industries",
      label: "Industries & Value Chains",
      description: "Explore solutions by industry sectors and value chains",
      icon: Building2,
      path: "/gallery/main?view=industries",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      key: "processes",
      label: "End-to-End Processes & Subprocesses",
      description: "Browse E2E processes and business modules",
      icon: Workflow,
      path: "/gallery/main?view=processes",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      key: "references",
      label: "Reference Architectures & Blueprints",
      description: "Solution packages, templates and artifacts",
      icon: FileText,
      path: "/gallery/main?view=references",
      gradient: "from-orange-500 to-red-500",
    },
    {
      key: "bcm",
      label: "Business Capability Model (BCM) Categories",
      description: "Capability domains and business areas",
      icon: Grid3X3,
      path: "/gallery/main?view=bcm",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      key: "signavio",
      label: "Signavio",
      description: "Process mining and business process management solutions",
      icon: Cog,
      path: "/gallery/signavio",
      gradient: "from-teal-500 to-blue-500",
    },
    {
      key: "walkme",
      label: "WalkMe",
      description: "Digital adoption platform and user guidance solutions",
      icon: Users,
      path: "/gallery/walkme",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      key: "ai-business",
      label: "AI Business",
      description: "Business-focused AI solutions and use cases",
      icon: Brain,
      path: "/gallery/ai-business",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      key: "generative-ai",
      label: "Generative AI Use Cases", 
      description: "Generative AI applications and implementation patterns",
      icon: Zap,
      path: "/gallery/generative-ai-use-cases",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      key: "ai-agents",
      label: "AI Agents",
      description: "Autonomous AI agents and intelligent automation",
      icon: Bot,
      path: "/gallery/ai-agents",
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      key: "joule",
      label: "SAP Joule",
      description: "SAP's AI copilot for intelligent enterprise automation",
      icon: Brain,
      path: "/gallery/joule",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      key: "accelerators-enhanced",
      label: "Development Accelerators",
      description: "Development tools, templates and accelerators",
      icon: Rocket,
      path: "/gallery/accelerators-section",
      gradient: "from-emerald-500 to-green-500",
    },
  ]

  const handleTileClick = (path: string) => {
    router.push(path)
  }

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="absolute inset-0 overflow-hidden">
        <Ballpit className="w-full h-full opacity-30" followCursor={false} count={150} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center py-16 px-8">
          <h1
            className="text-5xl font-bold mb-6"
            style={{ color: "var(--ai-royal)", fontFamily: "var(--font-sap-72)" }}
          >
            Solutions Gallery
          </h1>
          <p
            className="text-xl max-w-3xl mx-auto"
            style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}
          >
            Discover enterprise solutions, reference architectures, and accelerators tailored to your industry and
            business needs
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl w-full">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.key}
                  className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredTile(item.key)}
                  onMouseLeave={() => setHoveredTile(null)}
                  onClick={() => handleTileClick(item.path)}
                >
                  {/* Tile container with glassmorphism effect */}
                  <div
                    className="relative p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-2xl"
                    style={{
                      background: hoveredTile === item.key ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.08)",
                      borderColor: hoveredTile === item.key ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.1)",
                      minHeight: "240px",
                    }}
                  >
                    {/* Gradient background overlay */}
                    <div
                      className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${item.gradient}`}
                    />

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-br ${item.gradient} shadow-lg`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-3">
                      <h3
                        className="text-lg font-semibold leading-tight"
                        style={{ color: "var(--text-default)", fontFamily: "var(--font-sap-72)" }}
                      >
                        {item.label}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}
                      >
                        {item.description}
                      </p>
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
      </div>
    </div>
  )
}
