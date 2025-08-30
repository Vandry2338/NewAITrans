import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SolutionComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/gallery/industry/telecommunications/solution-business-cloud-deployment"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Solution Business Cloud Deployment
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
            Solution Component Diagram
          </h1>
          <p className="text-xl mt-2" style={{ color: "var(--text-muted)" }}>
            Solution Components
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Overview
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The Solution Component Diagram depicts all solution components needed to implement the business process variant. 
              This architectural view shows the technical components and their relationships required for successful implementation.
            </p>
          </div>

          {/* Image */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Solution Component Diagram
            </h3>
            <div className="flex justify-center">
              <img 
                src="/assets/Solution Components.jpeg"
                alt="Solution Component Diagram showing technical components and architecture"
                className="w-full max-w-5xl h-auto rounded-lg shadow-lg"
                style={{ maxHeight: "800px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Key Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Technical Architecture
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Core technical components including databases, APIs, services, and integration points required for the solution.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Component Relationships
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                How different components interact and communicate to deliver the complete business solution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
