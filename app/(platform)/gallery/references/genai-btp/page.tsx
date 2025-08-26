"use client"

import { useState, useRef } from "react"
import { ChevronDownIcon, ArrowDownTrayIcon, ArrowTopRightOnSquareIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"

// Page data - this would come from your data source
const pageData = {
  "title": "Generative AI on SAP BTP",
  "subtitle": "CAP + HANA Cloud (Vector) + Generative AI Hub for enterprise AI applications.",
  "tags": ["Amazon Web Services", "Microsoft Azure", "Google Cloud Platform", "Generative AI"],
  "updated": {
    "date": "May 20, 2025",
    "by": "kay-schmitteckert"
  },
  "heroVideo": "/videos/SAP BTP AI Best Practices 1 Access to Generative AI Models Intro.mp4",
  "overview": [
    "Harness the power of Generative AI (GenAI) in your applications on SAP BTP, providing a robust framework for optimizing AI-driven application development and data management.",
    "This Reference Architecture uses a CAP-based backend for application logic, SAP HANA Cloud (including embeddings for similarity search via the Vector Engine), and the Generative AI Hub as a central access point to foundation models and LLMs. It integrates LLMs via the Generative AI Hub in SAP AI Core, enabling patterns such as Retrieval Augmented Generation (RAG) with embeddings. The architecture supports both Cloud Foundry and Kyma runtimes."
  ],
  "architectureNote": "The solution diagram is provided below. You can download it or open it directly in draw.io.",
  "solutionDiagramResources": "You can download the Solution Diagram as a .drawio file for offline use, or view and edit it directly on draw.io. Any online changes must be saved locally if you wish to keep them.",
  "servicesAndRoles": {
    "cap": "CAP provides languages, libraries, and tools for building enterprise-grade services and applications (Java, JavaScript, TypeScript). In this RA, CAP owns application and domain logic, integrates SAP/non-SAP systems, and manages data in SAP HANA Cloud. Plugins (e.g., CAP LLM Plugin) and SDKs such as SAP Cloud SDK for AI—together with LangChain—support GenAI development.",
    "genaiHub": "The Generative AI Hub offers secure, harmonized access to foundation models (LLMs) hosted on SAP BTP or by external providers (Azure, Google, AWS), simplifying integration into business processes. Typical patterns include RAG, AI Agents, and Conversational AI via standardized APIs.",
    "orchestration": [
      { "name": "Templating", "desc": "Compose prompts with placeholders filled during inference." },
      { "name": "Content Filtering", "desc": "Restrict the types of content passed to and from the model." },
      { "name": "Data Masking", "desc": "Anonymize or pseudonymize sensitive data before processing." },
      { "name": "Grounding", "desc": "Integrate external, domain-specific, or real-time data (RAG) to improve relevance." }
    ],
    "hana": {
      "vectorEngine": [
        "Multi-model database: relational, graph, spatial, JSON + vectors in one system.",
        "Semantic & similarity search on documents and process data.",
        "Personalized recommendations and improved LLM outputs with contextual data."
      ],
      "knowledgeGraphEngine": [
        "Native triplestore with RDF/SPARQL and transaction support.",
        "Interoperability between SQL and SPARQL for complex reasoning.",
        "Interconnected corporate knowledge to power GenAI and deeper insights."
      ]
    }
  },
  "scenarios": [
    "Basic Prompting via the Generative AI Hub",
    "Semantic Search & Embeddings with HANA Cloud Vector Engine",
    "Retrieval Augmented Generation (RAG) with enterprise documents/data",
    "Multi-Tenancy for GenAI on SAP BTP",
    "Vibe Coding with Cline and SAP AI Core"
  ],
  "examples": [
    "Sample CAP application using ai-sdk-js",
    "GenAI Mail Insights — CAP + GenAI + RAG on SAP BTP",
    "CAP App: Semantic Search with Generative AI Hub + HANA Cloud Vector Engine"
  ],
  "viewer": {
    "buttonLabel": "Generate Reference Architecture",
    "hint": "Select a .drawio file to render the diagram.",
    "fileName": "genai-btp.drawio"
  }
}

export default function GenAIBTPPage() {
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
    window.open(`/diagrams/genai-btp.drawio`, '_blank')
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

            {/* Key Services & Roles Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Key Services & Roles
              </h2>
              
              {/* CAP Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  CAP
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {pageData.servicesAndRoles.cap}
                </p>
              </div>

              {/* Generative AI Hub Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Generative AI Hub
                </h3>
                <p className="text-xs mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {pageData.servicesAndRoles.genaiHub}
                </p>
                
                <h4 className="text-base font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Orchestration Capabilities
                </h4>
                <ul className="space-y-1.5">
                  {pageData.servicesAndRoles.orchestration.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <div>
                        <span className="font-semibold text-xs" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                          {item.name}:
                        </span>
                        <span className="text-xs ml-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* HANA Cloud Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  HANA Cloud
                </h3>
                
                <h4 className="text-base font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Vector Engine
                </h4>
                <ul className="space-y-1.5 mb-3">
                  {pageData.servicesAndRoles.hana.vectorEngine.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <h4 className="text-base font-semibold mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Knowledge Graph Engine
                </h4>
                <ul className="space-y-1.5">
                  {pageData.servicesAndRoles.hana.knowledgeGraphEngine.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scenarios Card */}
            <div className="bg-white rounded-xl border shadow-sm p-5" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Scenarios
              </h2>
              <ul className="space-y-1.5">
                {pageData.scenarios.map((scenario, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-1 h-1 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>{scenario}</span>
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
                    <span className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>{example}</span>
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
