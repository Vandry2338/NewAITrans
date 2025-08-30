import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SolutionBusinessCloudDeploymentPage() {
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
            Solution Business for Cloud Deployment
          </h1>
          <p className="text-xl mt-2" style={{ color: "var(--text-muted)" }}>
            Architecture Views and Process Diagrams
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
              Overview
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              The Solution Business scenario allows to sell complex solutions of bundled items in one integrated process. 
              Below are the 5 key architecture views that provide comprehensive insights into the business process variant.
            </p>
          </div>

          {/* Architecture Views Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Solution Value Flow Diagram */}
            <Link href="/gallery/industry/telecommunications/architecture-views/solution-value-flow" className="block">
              <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                  Solution Value Flow Diagram
                </h3>
                <div className="text-sm mb-3 text-center font-medium" style={{ color: "var(--grad-primary)" }}>
                  Solution Process
                </div>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
                  The Solution Value Flow Diagram depicts all supported business activities contributing to the business process variant.
                </p>
              </div>
            </Link>

            {/* Solution Component Diagram */}
            <Link href="/gallery/industry/telecommunications/architecture-views/solution-components" className="block">
              <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                  Solution Component Diagram
                </h3>
                <div className="text-sm mb-3 text-center font-medium" style={{ color: "var(--grad-primary)" }}>
                  Solution Components
                </div>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
                  The Solution Component Diagram depicts all solution components needed to implement the business process variant.
                </p>
              </div>
            </Link>

            {/* Solution Data Flow Diagram - Transactional */}
            <Link href="/gallery/industry/telecommunications/architecture-views/transactional-data-flows" className="block">
              <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                  Solution Data Flow Diagram
                </h3>
                <div className="text-sm mb-3 text-center font-medium" style={{ color: "var(--grad-primary)" }}>
                  Transactional Data Flows
                </div>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
                  The Solution Data Flow Diagram depicts key flows of transactional data of the business process variant.
                </p>
              </div>
            </Link>

            {/* Solution Data Flow Diagram - Master */}
            <Link href="/gallery/industry/telecommunications/architecture-views/master-data-flows" className="block">
              <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                  Solution Data Flow Diagram
                </h3>
                <div className="text-sm mb-3 text-center font-medium" style={{ color: "var(--grad-primary)" }}>
                  Master Data Flows
                </div>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
                  The Solution Data Flow Diagram depicts key flows of master and configuration data of the business process variant.
                </p>
              </div>
            </Link>

            {/* Solution Process Flow */}
            <Link href="/gallery/industry/telecommunications/architecture-views/solution-process-flow" className="block">
              <div className="rounded-xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-xl mb-4 mx-auto"
                  style={{ background: "var(--grad-primary)" }}
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: "var(--text)", fontFamily: "SAP 72" }}>
                  Solution Process Flow
                </h3>
                <div className="text-sm mb-3 text-center font-medium" style={{ color: "var(--grad-primary)" }}>
                  Solution Business Standard Process Flow
                </div>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>
                  The Solution Process Flow Diagram depicts the overview process flow of the business process variant. It includes solution process flow diagrams to depict sub-processes.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
