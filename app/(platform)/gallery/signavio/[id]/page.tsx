"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DetailedView } from "@/components/gallery/DetailedView"

interface DetailedContent {
  id: string
  title: string
  description: string
  category: string
  version?: string
  license?: string
  duration?: number
  demoVideo?: string
  overview?: string
  features?: string[]
  requirements?: string[]
  useCases?: string[]
  implementation?: {
    title: string
    steps: string[]
  }
  benefits?: string[]
  documentation?: string
  repository?: string
  support?: string
}

export default function SignavioDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [content, setContent] = useState<DetailedContent | null>(null)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const mockContent: Record<string, DetailedContent> = {
      "process-mining-starter": {
        id: "process-mining-starter",
        title: "Process Mining Starter",
        description: "Quick setup for process discovery and analysis",
        category: "Template",
        version: "v2.1.0",
        demoVideo: "/placeholder.svg?height=400&width=800",
        overview:
          "The Process Mining Starter provides a comprehensive foundation for organizations beginning their process discovery journey. This template includes pre-configured dashboards, standard KPIs, and automated data connectors that enable rapid deployment of process mining capabilities across your enterprise.",
        features: [
          "Pre-built process discovery dashboards",
          "Automated data ingestion from SAP systems",
          "Standard process KPI templates",
          "Real-time process monitoring",
          "Compliance tracking and reporting",
          "Integration with Signavio Process Manager",
        ],
        useCases: [
          "Order-to-Cash process optimization",
          "Procure-to-Pay efficiency analysis",
          "Customer service process improvement",
          "Compliance monitoring and auditing",
        ],
        implementation: {
          title: "Implementation Steps",
          steps: [
            "Connect your data sources using the automated connectors",
            "Configure the pre-built dashboards for your specific processes",
            "Set up KPI thresholds and alerting rules",
            "Train your team on the process mining interface",
            "Begin continuous monitoring and optimization",
          ],
        },
        benefits: [
          "Reduce implementation time by 70%",
          "Standardized approach to process mining",
          "Built-in best practices and templates",
          "Seamless integration with existing SAP landscape",
        ],
        requirements: [
          "SAP ECC 6.0 or S/4HANA system access",
          "Signavio Process Intelligence license",
          "Minimum 8GB RAM for local installation",
          "Network connectivity to source systems",
        ],
        documentation: "https://docs.signavio.com/process-mining-starter",
        repository: "https://github.com/signavio/process-mining-starter",
        support: "https://support.signavio.com",
      },
      // Add more mock content for other items...
    }

    const foundContent = mockContent[params.id]
    if (foundContent) {
      setContent(foundContent)
    }
  }, [params.id])

  const handleBack = () => {
    router.push("/gallery/signavio")
  }

  const handleAddToDesign = (item: DetailedContent) => {
    console.log("[v0] Adding to design:", item.title)
    // Implement add to design functionality
  }

  const handleShare = (item: DetailedContent) => {
    console.log("[v0] Sharing:", item.title)
    // Implement share functionality
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
            Content Not Found
          </h1>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            The requested content could not be found.
          </p>
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-xl font-medium transition-colors"
            style={{
              background: "var(--grad-primary)",
              color: "white",
            }}
          >
            Back to Signavio Solutions
          </button>
        </div>
      </div>
    )
  }

  return <DetailedView content={content} onBack={handleBack} onAddToDesign={handleAddToDesign} onShare={handleShare} />
}
