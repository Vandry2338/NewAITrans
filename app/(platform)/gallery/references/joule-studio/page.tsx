"use client"

import { useState, useRef } from "react"
import { ChevronDownIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ArrowUpTrayIcon, PlayIcon } from "@heroicons/react/24/outline"

// Page data - this would come from your data source
const pageData = {
  "title": "Joule with Joule Studio",
  "subtitle": "Extend Joule with custom Skills & AI Agents using SAP Build and advanced AI capabilities.",
  "tags": ["Generative AI", "Agents", "SAP Build"],
  "updated": {
    "date": "June 25, 2025",
    "by": "sap-team"
  },
  "heroVideo": "/videos/Meet Joule Studio in SAP Build Your Gateway to Build Joule Agents and Skills.mp4",

  "overview": [
    "Joule Studio in SAP Build is a comprehensive platform for developing and enhancing AI capabilities with a user-friendly experience. It empowers both business users and technologists to become AI citizen developers.",
    "This reference architecture outlines how Joule Studio can be leveraged to integrate and extend SAP and non-SAP solutions across cloud and hybrid landscapes, enabling custom Joule Skills and AI Agents that optimize organization-specific automations and outcomes."
  ],

  "architectureNote": "The solution diagram is provided below. You can download it or open it directly in draw.io.",

  "solutionDiagramResources": "You can download the Solution Diagram as a .drawio file for offline use, or view and edit it directly on draw.io. Any online changes must be saved locally if you wish to keep them.",

  "flow": [
    "Use the Joule client (desktop and mobile) as the central entry point across SAP cloud apps for both out-of-the-box and custom capabilities.",
    "Provision Joule Studio as part of SAP Build (Apps, Code, Work Zone, BPA). Set up Joule and SAP Build Process Automation on the build-default plan using SAP Identity Authentication Service (IAS).",
    "Extend Joule by creating capabilities deployed alongside SAP-provided ones: rule-based Joule Skills via APIs and AI Agents that plan and reason across SAP and non-SAP systems.",
    "Leverage SAP AI Core for Large Language Models, and optionally provision document grounding (RAG) to ground agents in enterprise data.",
    "Integrate existing workflows with Joule Skills and AI Agents using SAP BTP Connectivity for seamless cross-system automation.",
    "Use SAP Build lifecycle features to compile and deploy extensions alongside the central Joule instance for unified access.",
    "Integrate via SAP Connectivity service and APIs (Graph, CAP, RAP, OData, destinations, API hubs). Upload API specs or build API actions from scratch.",
    "Rely on SAP Cloud Identity Services (IAS/Directory) for identity, authentication, and federation with third-party identity providers."
  ],

  "characteristics": [
    "Centralized AI solution across hybrid SAP landscapes.",
    "Support for third-party identity providers via SAP Cloud Identity Services; provisioning/user-role assignment from external sources.",
    "Global User ID via SAP Cloud Identity Services – Identity Authentication.",
    "Cloud and on-premise solution integration including SAP ECC, SAP S/4HANA, and S/4HANA Cloud Private Edition."
  ],

  "examples": [
    "Automated Customer Support Agent deployment across SAP and external CRM.",
    "Order Management optimization via Joule Skills for stock checks, processing, and delivery updates.",
    "Procurement negotiation & compliance automation with data from SAP ECC and external sources.",
    "Talent acquisition enhancement in SAP SuccessFactors (AI-assisted requisitions, approvals, publishing).",
    "Supply chain risk monitoring across SAP S/4HANA and third-party systems.",
    "Mass maintenance of scheduling agreements with reduced manual intervention.",
    "Non-repairable parts management with automated goods movements.",
    "Creation of Customer Material Info Records (CMIRs) with validations and approvals."
  ],

  "servicesAndComponents": [
    "SAP Build, Joule Studio",
    "SAP Build",
    "SAP AI Core",
    "Document Grounding",
    "SAP Build Process Automation",
    "SAP Cloud Identity Services",
    "SAP Connectivity service",
    "SAP Destination service"
  ],

  "resources": [
    "Joule Studio (sap.com)",
    "Joule Studio in SAP Build, demo (sap.com)",
    "Build, Deploy, and Extend AI Agents with Joule Studio (SAP Community Blog Posts)",
    "Meet Joule Studio in SAP Build (YouTube)",
    "Agent Builder in Joule Studio (YouTube)",
    "Interactive Value Journey"
  ],

  "viewer": {
    "buttonLabel": "Generate Reference Architecture",
    "hint": "Select a .drawio file to render the diagram.",
    "fileName": "joule-studio.drawio"
  }
}

export default function JouleStudioPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [videoExpanded, setVideoExpanded] = useState(false)

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
    window.open(`/diagrams/joule-studio.drawio`, '_blank')
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
                Examples
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

        {/* Video Section - Above Diagram */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
            See Joule Studio in Action
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Video Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-red-600 to-orange-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-sap-72)" }}>
                      Joule Studio Platform
                    </h3>
                    <p className="text-red-100" style={{ fontFamily: "var(--font-sap-72)" }}>
                      AI-powered development and automation
                    </p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                  >
                    <source src={pageData.heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-red-100">
                  <span style={{ fontFamily: "var(--font-sap-72)" }}>Duration: 2:30</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span style={{ fontFamily: "var(--font-sap-72)" }}>Live Demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-600 to-red-700 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <PlayIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-sap-72)" }}>
                      AI Agent Development
                    </h3>
                    <p className="text-orange-100" style={{ fontFamily: "var(--font-sap-72)" }}>
                      Build and deploy intelligent agents
                    </p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <PlayIcon className="w-16 h-16 text-white opacity-60" />
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-orange-100">
                  <span style={{ fontFamily: "var(--font-sap-72)" }}>Duration: 3:15</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span style={{ fontFamily: "var(--font-sap-72)" }}>Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
