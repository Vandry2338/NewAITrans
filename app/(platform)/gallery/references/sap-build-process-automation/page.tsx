"use client"

import { useState, useRef } from "react"
import { ChevronDownIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

// Page data - this would come from your data source
const pageData = {
  "title": "Integrate and Extend with SAP Build Process Automation",
  "subtitle": "Low-code/no-code workflows & RPA to integrate and extend SAP and non-SAP processes",
  "tags": ["SAP Build", "Microsoft Azure", "Amazon Web Services", "Google Cloud Platform"],
  "updated": {
    "date": "May 14, 2025",
    "by": "fabianleh"
  },
  "heroVideo": "/videos/What is SAP Build Process Automation.mp4",

  "overview": [
    "SAP Build Process Automation enables business users and technologists to adapt, improve and innovate processes with low-code/no-code workflow management and robotic process automation.",
    "This reference architecture shows how to integrate and extend SAP and non-SAP solutions across cloud and hybrid landscapes, aligned with the Robotic Process Automation use-case pattern."
  ],

  "architectureNote": "The solution diagram is provided below. You can download it or open it directly in draw.io.",
  "solutionDiagramResources": "You can download the Solution Diagram as a .drawio file for offline use, or view and edit it directly on draw.io. Any online changes must be saved locally if you wish to keep them.",

  "flow": [
    "Access via web and mobile: SAP Build Work Zone (Standard/Advanced), Build Work Zone Advanced mobile app, or SAP Mobile Start.",
    "Identity & authentication via SAP Cloud Identity Services (IAS/Directory), with optional federation to a customer-owned IdP.",
    "Built-in BPA components (Decisions, Process Visibility, Processes, Automations) are part of the subscription and not separately provisioned.",
    "Integration through SAP Connectivity service; APIs via Graph, CAP, RAP, OData, API hubs, or uploaded specs/actions.",
    "Process triggers: events, APIs, schedules, and forms (BPA Forms, UI5 apps, or Build Apps).",
    "Transport content across environments via manual export/import or SAP Cloud Transport Management."
  ],

  "characteristics": [
    "Central process-automation solution across hybrid SAP landscapes; SAP Task Center as a centralized task inbox.",
    "Support for third-party identity providers via SAP Cloud Identity Services; provisioning from external sources.",
    "Global User ID via SAP Cloud Identity Services – Identity Authentication.",
    "Cloud and on-premise integration (e.g., SAP ECC, SAP S/4HANA, S/4HANA Cloud Private Edition).",
    "Predefined content available via the integrated store."
  ],

  "examples": [
    "Mass maintenance of scheduling agreements with approvals and automated master-data updates.",
    "Non-repairable parts auto-recording with goods movements for spare parts.",
    "Creation and approval of mass job requisitions in SAP SuccessFactors EC.",
    "Automated creation of Customer Material Info Records (CMIRs) with validation and approval."
  ],

  "servicesAndComponents": [
    "SAP Build Process Automation",
    "SAP Build Apps",
    "SAP Build Code",
    "SAP Build Work Zone",
    "Joule Studio",
    "SAP Business Application Studio",
    "SAP Connectivity service",
    "SAP Destination service",
    "SAP Document Management service (integration option)",
    "SAP Cloud Identity Services",
    "SAP Integration Suite"
  ],

  "resources": [
    "SAP Build Process Automation — Community Blog Posts",
    "SAP Build Process Automation — Help Portal",
    "SAP Build Process Automation — Tutorials",
    "SAP Build Process Automation — Learning Journeys"
  ],

  "relatedMissions": [
    "Process and approve your invoices with SAP Build Process Automation",
    "Extend SAP S/4HANA with SAP Build Process Automation",
    "Extend Pre-built Automation Procurement Packages in SAP Build Process Automation"
  ],

  "viewer": {
    "buttonLabel": "Generate Reference Architecture",
    "hint": "Select a .drawio file to render the diagram.",
    "fileName": "sap-build-process-automation.drawio"
  }
}

export default function SAPBuildProcessAutomationPage() {
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
    // Open the draw.io diagram directly
    window.open(`https://embed.diagrams.net/?embed=1&spin=1&modified=unsavedChanges&proto=json#R${encodeURIComponent('/diagrams/sap-build-process-automation.drawio')}`, '_blank')
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
                    <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs mr-3 flex-shrink-0" style={{ fontFamily: "var(--font-sap-72)" }}>
                      {index + 1}
                    </span>
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
                    <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
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
                Examples in an SAP Context
              </h2>
              <ul className="space-y-1.5">
                {pageData.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
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

            {/* Resources Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Resources
              </h2>
              <ul className="space-y-1.5">
                {pageData.resources.map((resource, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {resource}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Missions Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Related Missions
              </h2>
              <ul className="space-y-1.5">
                {pageData.relatedMissions.map((mission, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {mission}
                    </span>
                  </li>
                ))}
              </ul>
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
