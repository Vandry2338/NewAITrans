"use client"

import { useState, useRef } from "react"
import { ChevronDownIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

// Page data - this would come from your data source
const pageData = {
  "title": "Reference Architecture for Event-Driven Applications",
  "subtitle": "EDA with SAP Integration Suite (Event Mesh / Advanced Event Mesh), CAP, HANA Cloud, and Private Link.",
  "tags": ["SAP BTP", "Event Mesh", "CAP", "HANA Cloud"],
  "updated": {
    "date": "June 15, 2025",
    "by": "sap-team"
  },
  "heroVideo": null, // No specific video available yet

  "overview": [
    "Enterprises are adopting API-First and Event-First strategies to achieve real-time responsiveness and automation alongside SAP ERP. This reference architecture explains how to build event-driven applications on SAP BTP.",
    "At a glance: an asynchronous event broker (Event Mesh or Advanced Event Mesh), a CAP-based extension app (Events-to-Business-Actions framework), SAP HANA Cloud for application data (optionally vectors for GenAI assistance), and secure connectivity via Cloud Connector or Private Link when BTP and S/4HANA share the same hyperscaler."
  ],

  "architectureNote": "The solution diagram is provided below. You can download it or open it directly in draw.io.",
  "solutionDiagramResources": "You can download the Solution Diagram as a .drawio file for offline use, or view and edit it directly on draw.io. Any online changes must be saved locally if you wish to keep them.",

  "flow": [
    "Pre-requisites: Deploy the CAP-based Events-to-Business-Actions framework on Cloud Foundry; configure SAP Integration Suite (Advanced Event Mesh or Event Mesh), SAP HANA Cloud, Destination, Private Link/Cloud Connector, and (optionally) Generative AI Hub. An App Admin signs in to configure decisions and business actions.",
    "1) Source systems (e.g., Azure, AWS, Telco IoT platforms) emit events.",
    "2) Events are published to SAP Integration Suite (Advanced Event Mesh / Event Mesh). The processor module (subscriber) in the framework receives the event.",
    "3) The processor leverages SAP Build Process Automation (Decisions) to initiate business actions (e.g., create Purchase Requisition in S/4HANA).",
    "4) Actions are executed in SAP S/4HANA via Destination + Connectivity (Cloud Connector). If BTP and S/4HANA are on the same hyperscaler, use Private Link for direct private connectivity."
  ],

  "characteristics": [
    "Asynchronous, event-driven integration enabling clean-core extensions on SAP BTP.",
    "Reusable CAP-based 'Events-to-Business-Actions' framework for configurable scenarios.",
    "Choice of SAP Integration Suite: Event Mesh capability or Advanced Event Mesh (multi-broker mesh).",
    "Optional GenAI assistance (e.g., recommendations in the action chain) using HANA Cloud Vector Engine.",
    "Private Link option for secure, private traffic when BTP and S/4HANA run on the same hyperscaler."
  ],

  "examples": [
    "IoT events trigger maintenance or procurement actions in S/4HANA.",
    "Order or supply events from hyperscalers propagate to SAP LoB systems via Event Mesh.",
    "Purchase Requisition creation based on event characteristics and business rules.",
    "Customer or inventory events initiate automated workflows in SAP Build Process Automation."
  ],

  "servicesAndComponents": [
    "SAP BTP, Cloud Foundry Runtime",
    "SAP Integration Suite — Advanced Event Mesh",
    "SAP Integration Suite — Event Mesh capability",
    "SAP Build Process Automation (Decisions, Processes, Automations)",
    "SAP HANA Cloud",
    "SAP Destination service",
    "SAP Connectivity service (with Cloud Connector)",
    "SAP Private Link service (optional, when on same hyperscaler)",
    "SAP Business Application Studio",
    "SAP HTML5 Application Repository",
    "SAP Authorization and Trust Management",
    "SAP Continuous Integration and Delivery",
    "Application Autoscaler",
    "SAP Build Work Zone (optional entry point)"
  ],

  "resources": [
    "SAP Samples (GitHub) — EDA reference content"
  ],

  "viewer": {
    "buttonLabel": "Generate Reference Architecture",
    "hint": "Select a .drawio file to render the diagram.",
    "fileName": "event-driven-applications.drawio"
  }
}

export default function EventDrivenApplicationsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [videoExpanded, setVideoExpanded] = useState(false)
  const viewerRef = useRef<HTMLDivElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.endsWith('.drawio')) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setFileUrl(url)
      
      // Smooth scroll to viewer section
      setTimeout(() => {
        viewerRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleDownload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      const a = document.createElement('a')
      a.href = url
      a.download = selectedFile.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handleOpenInDrawIO = () => {
    // Open the local diagram file directly
    window.open(`/diagrams/vent-driven-apps.drawio`, '_blank')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}>
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-red-600 via-orange-500 to-red-700 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-red-600 via-orange-500 to-red-700 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-sap-72)", lineHeight: "1.1" }}>
              {pageData.title}
            </h1>
            <p className="text-xl mb-6 opacity-90" style={{ fontFamily: "var(--font-sap-72)" }}>
              {pageData.subtitle}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {pageData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Overview
              </h2>
              {pageData.overview.map((paragraph, index) => (
                <p key={index} className="mb-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Flow Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Flow
              </h2>
              <ol className="space-y-2">
                {pageData.flow.map((step, index) => (
                  <li key={index} className="flex items-start">
                    {index === 0 ? (
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0" style={{ fontFamily: "var(--font-sap-72)" }}>
                        P
                      </span>
                    ) : (
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0" style={{ fontFamily: "var(--font-sap-72)" }}>
                        {index}
                      </span>
                    )}
                    <span className="text-xs leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Characteristics Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Characteristics
              </h2>
              <ul className="space-y-1.5">
                {pageData.characteristics.map((characteristic, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {characteristic}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Examples Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Examples
              </h2>
              <ul className="space-y-1.5">
                {pageData.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {example}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services & Components Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Services & Components
              </h2>
              <div className="flex flex-wrap gap-2">
                {pageData.servicesAndComponents.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-50 text-red-700 rounded-md font-medium text-xs"
                    style={{ fontFamily: "var(--font-sap-72)" }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Generate/View Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border shadow-sm p-5 sticky top-8" style={{ borderColor: "var(--border)" }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Generate / View
              </h3>
              
              <button
                onClick={handleOpenInDrawIO}
                className="w-full px-4 py-2.5 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 mb-4 text-sm"
                style={{ background: "linear-gradient(135deg, #dc2626 0%, #ea580c 50%, #dc2626 100%)", fontFamily: "var(--font-sap-72)" }}
              >
                {pageData.viewer.buttonLabel}
              </button>
              
              <p className="text-xs text-center" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                Click to open the reference architecture diagram in draw.io
              </p>
            </div>
          </div>
        </div>

        {/* Video Section - Collapsible */}
        <div className="mt-12">
          <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Demo Video
              </h2>
              <button
                onClick={() => setVideoExpanded(!videoExpanded)}
                className="px-3 py-1.5 bg-red-50 text-red-700 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                style={{ fontFamily: "var(--font-sap-72)" }}
              >
                {videoExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            
            {videoExpanded && pageData.heroVideo && (
              <div className="mt-4">
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-gray-200">
                  <video 
                    className="w-full h-64 object-cover"
                    controls 
                    preload="metadata"
                  >
                    <source src={pageData.heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="text-xs text-center mt-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {pageData.title} - Demo Video
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
