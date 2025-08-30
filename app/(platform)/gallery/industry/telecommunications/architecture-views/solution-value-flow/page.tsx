import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SolutionValueFlowPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/gallery/industry/telecommunications"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Telecommunications
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
            Solution Value Flow Diagram
          </h1>
          <p className="text-xl mt-2" style={{ color: "var(--text-muted)" }}>
            Solution Process
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Overview
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The Solution Value Flow Diagram depicts all supported business activities contributing to the business process variant. 
              This comprehensive view shows how different business processes interact and flow together to create value for customers.
            </p>
          </div>

          {/* Image */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Solution Value Flow Diagram
            </h3>
            <div className="flex justify-center">
              <img 
                src="/assets/solution process.jpeg"
                alt="Solution Value Flow Diagram showing business process flows"
                className="w-full max-w-5xl h-auto rounded-lg shadow-lg"
                style={{ maxHeight: "800px", objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Key Components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Business Activities
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Core business processes that drive value creation and customer satisfaction in the telecommunications industry.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                Process Integration
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Seamless integration between different business processes to ensure smooth operations and data flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
