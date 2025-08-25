"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  EyeIcon,
  CodeBracketIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline"
import { useICStore } from "@/lib/store"

const tabs = [
  { id: "overview", label: "Overview", href: "/design" },
  { id: "inputs", label: "Design Inputs", href: "/design/inputs" },
  { id: "tradeoffs", label: "Trade-offs", href: "/design/tradeoffs" },
  { id: "views", label: "Architecture Views", href: "/design/views" },
  { id: "docs", label: "Docs & Sync", href: "/design/docs" },
]

const viewTypes = [
  {
    id: "C4",
    name: "C4 System Context",
    description: "High-level system context and boundaries",
    icon: "🏗️",
  },
  {
    id: "ValueFlow",
    name: "Value Flow",
    description: "Business value streams and process flows",
    icon: "💰",
  },
  {
    id: "DataFlow",
    name: "Data Flow",
    description: "Information architecture and data movement",
    icon: "📊",
  },
  {
    id: "Sequence",
    name: "Sequence Diagram",
    description: "Interaction patterns and message flows",
    icon: "🔄",
  },
]

export default function ArchitectureViewsPage() {
  const pathname = usePathname()
  const [selectedView, setSelectedView] = useState<string>("C4")
  const [showCode, setShowCode] = useState(false)

  const { designModels, syncDocs } = useICStore()

  // Get the most recent model or create sample data
  const currentModel =
    designModels.length > 0
      ? designModels[designModels.length - 1]
      : {
          id: "sample-model",
          name: "Sample Architecture Model",
          inputId: "sample-input",
          views: [
            {
              kind: "C4" as const,
              code: `@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

title System Context Diagram for Financial Services Platform

Person(customer, "Customer", "Banking customer using mobile and web channels")
Person(employee, "Employee", "Bank employee managing customer accounts")

System(banking_system, "Banking Platform", "Core banking system handling accounts, transactions, and customer management")

System_Ext(payment_gateway, "Payment Gateway", "External payment processing system")
System_Ext(credit_bureau, "Credit Bureau", "External credit scoring and verification")
System_Ext(regulatory_system, "Regulatory Reporting", "Government compliance and reporting systems")

Rel(customer, banking_system, "Uses", "HTTPS/Mobile App")
Rel(employee, banking_system, "Manages", "Web Portal")
Rel(banking_system, payment_gateway, "Processes payments", "API/HTTPS")
Rel(banking_system, credit_bureau, "Checks credit", "API/HTTPS")
Rel(banking_system, regulatory_system, "Reports compliance", "Secure API")

@enduml`,
              status: "clean" as const,
            },
            {
              kind: "ValueFlow" as const,
              code: `@startuml
!theme plain
title Lead to Cash Value Flow

|Customer|
start
:Customer Interest;
:Product Research;

|Sales|
:Lead Qualification;
:Needs Assessment;
:Proposal Creation;

|Customer|
:Proposal Review;
if (Approved?) then (yes)
  |Sales|
  :Contract Negotiation;
  :Deal Closure;
  
  |Operations|
  :Order Processing;
  :Service Delivery;
  
  |Finance|
  :Invoice Generation;
  :Payment Collection;
  :Revenue Recognition;
  
  |Customer|
  :Service Utilization;
  stop
else (no)
  |Sales|
  :Follow-up Strategy;
  stop
endif

@enduml`,
              status: "clean" as const,
            },
            {
              kind: "DataFlow" as const,
              code: `@startuml
!theme plain
title Data Flow Architecture

package "Data Sources" {
  [Customer Data]
  [Transaction Data]
  [Product Data]
  [External APIs]
}

package "Data Ingestion" {
  [API Gateway]
  [Event Streaming]
  [Batch Processing]
}

package "Data Processing" {
  [Data Validation]
  [Transformation Engine]
  [Business Rules]
}

package "Data Storage" {
  database "Operational DB" as OperationalDB
  database "Data Warehouse" as DataWarehouse
  database "Data Lake" as DataLake
}

package "Data Services" {
  [Analytics API]
  [Reporting Service]
  [ML Pipeline]
}

package "Data Consumers" {
  [Web Application]
  [Mobile App]
  [Business Intelligence]
  [Regulatory Reports]
}

[Customer Data] --> [API Gateway]
[Transaction Data] --> [Event Streaming]
[Product Data] --> [Batch Processing]
[External APIs] --> [API Gateway]

[API Gateway] --> [Data Validation]
[Event Streaming] --> [Transformation Engine]
[Batch Processing] --> [Business Rules]

[Data Validation] --> OperationalDB
[Transformation Engine] --> DataWarehouse
[Business Rules] --> DataLake

OperationalDB --> [Analytics API]
DataWarehouse --> [Reporting Service]
DataLake --> [ML Pipeline]

[Analytics API] --> [Web Application]
[Reporting Service] --> [Business Intelligence]
[ML Pipeline] --> [Mobile App]
[Analytics API] --> [Regulatory Reports]

@enduml`,
              status: "clean" as const,
            },
            {
              kind: "Sequence" as const,
              code: `@startuml
title Customer Account Opening Sequence

actor Customer
participant "Web Portal" as Portal
participant "API Gateway" as Gateway
participant "Account Service" as Account
participant "Identity Service" as Identity
participant "Notification Service" as Notification
database "Customer DB" as DB

Customer -> Portal: Submit application
Portal -> Gateway: POST /accounts/apply
Gateway -> Identity: Validate customer
Identity -> Gateway: Customer verified

Gateway -> Account: Create account request
Account -> DB: Store application
DB -> Account: Application stored

Account -> Identity: Create user profile
Identity -> DB: Store user data
DB -> Identity: Profile created

Account -> Notification: Send welcome email
Notification -> Customer: Welcome email sent

Account -> Gateway: Account created
Gateway -> Portal: Success response
Portal -> Customer: Account confirmation

@enduml`,
              status: "clean" as const,
            },
          ],
          tradeoffs: [],
          sync: {
            docs: "out-of-sync" as const,
            lastRun: null,
          },
        }

  const selectedViewData = currentModel.views.find((v) => v.kind === selectedView)

  const handleSyncDocs = () => {
    if (currentModel.id !== "sample-model") {
      syncDocs(currentModel.id)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Top Navigation Tabs */}
      <div
        className="sticky top-0 z-10 border-b"
        style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
      >
        <div className="px-8 py-4">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? "shadow-sm" : "hover:scale-[1.02]"
                  }`}
                  style={{
                    backgroundColor: isActive ? "var(--blue-50)" : "transparent",
                    color: isActive ? "var(--blue-800)" : "var(--text)",
                    border: `1px solid ${isActive ? "var(--blue-200)" : "transparent"}`,
                  }}
                >
                  {tab.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--text)" }}>
                Architecture Views
              </h1>
              <p className="text-base" style={{ color: "var(--text-muted)" }}>
                Generated architecture diagrams and code views from your design inputs.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentModel && (
                <div
                  className="px-4 py-2 text-sm rounded-lg border"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  Model: {currentModel.name}
                </div>
              )}
              <button
                onClick={() => setShowCode(!showCode)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                  showCode ? "ring-2 ring-blue-500" : ""
                }`}
                style={{
                  backgroundColor: showCode ? "var(--blue-50)" : "var(--surface)",
                  borderColor: showCode ? "var(--blue-200)" : "var(--border)",
                  color: showCode ? "var(--blue-800)" : "var(--text)",
                }}
              >
                <CodeBracketIcon className="h-4 w-4 inline mr-2" />
                {showCode ? "Hide Code" : "Show Code"}
              </button>
              <button
                onClick={handleSyncDocs}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                }}
              >
                <ArrowPathIcon className="h-4 w-4 inline mr-2" />
                Regenerate Views
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* View Type Selector */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)" }}>
                View Types
              </h3>
              <div className="space-y-2">
                {viewTypes.map((viewType) => {
                  const isActive = selectedView === viewType.id
                  const hasView = currentModel.views.some((v) => v.kind === viewType.id)

                  return (
                    <button
                      key={viewType.id}
                      onClick={() => setSelectedView(viewType.id)}
                      disabled={!hasView}
                      className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                        isActive ? "shadow-sm" : "hover:scale-[1.02]"
                      } ${!hasView ? "opacity-50 cursor-not-allowed" : ""}`}
                      style={{
                        backgroundColor: isActive ? "var(--blue-50)" : "var(--surface)",
                        borderColor: isActive ? "var(--blue-200)" : "var(--border)",
                      }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{viewType.icon}</span>
                        <div className="flex-1">
                          <div
                            className="font-medium text-sm"
                            style={{ color: isActive ? "var(--blue-800)" : "var(--text)" }}
                          >
                            {viewType.name}
                          </div>
                          {hasView && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircleIcon className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-green-600">Generated</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs" style={{ color: isActive ? "var(--blue-700)" : "var(--text-muted)" }}>
                        {viewType.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Status Panel */}
              <div
                className="mt-6 p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <h4 className="font-medium mb-3" style={{ color: "var(--text)" }}>
                  Generation Status
                </h4>
                <div className="space-y-2">
                  {currentModel.views.map((view) => (
                    <div key={view.kind} className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {view.kind}
                      </span>
                      <div className="flex items-center gap-1">
                        {view.status === "clean" ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        ) : (
                          <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                        )}
                        <span
                          className="text-xs"
                          style={{
                            color: view.status === "clean" ? "var(--green-600)" : "var(--yellow-600)",
                          }}
                        >
                          {view.status === "clean" ? "Up to date" : "Out of sync"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main View Area */}
            <div className="lg:col-span-3">
              {selectedViewData ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                        {viewTypes.find((v) => v.id === selectedView)?.name}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {viewTypes.find((v) => v.id === selectedView)?.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 rounded-lg border transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                        }}
                        title="Copy to clipboard"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                      <button
                        className="p-2 rounded-lg border transition-colors hover:bg-gray-50"
                        style={{
                          backgroundColor: "var(--surface)",
                          borderColor: "var(--border)",
                        }}
                        title="View fullscreen"
                      >
                        <EyeIcon className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>

                  {showCode ? (
                    <div
                      className="p-6 rounded-2xl border"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium" style={{ color: "var(--text)" }}>
                          PlantUML Source Code
                        </h4>
                        <span
                          className="px-2 py-1 text-xs rounded"
                          style={{
                            backgroundColor: "var(--gray-100)",
                            color: "var(--gray-700)",
                          }}
                        >
                          {selectedView}
                        </span>
                      </div>
                      <pre
                        className="text-sm overflow-x-auto p-4 rounded-lg"
                        style={{
                          backgroundColor: "var(--gray-900)",
                          color: "var(--gray-100)",
                        }}
                      >
                        <code>{selectedViewData.code}</code>
                      </pre>
                    </div>
                  ) : (
                    <div
                      className="p-8 rounded-2xl border min-h-[600px] flex items-center justify-center"
                      style={{
                        backgroundColor: "var(--surface)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <div className="text-center">
                        <div
                          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl"
                          style={{ background: "var(--grad-primary)" }}
                        >
                          {viewTypes.find((v) => v.id === selectedView)?.icon}
                        </div>
                        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                          {viewTypes.find((v) => v.id === selectedView)?.name}
                        </h4>
                        <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                          Diagram rendering would appear here in a production environment.
                        </p>
                        <div
                          className="p-4 rounded-lg text-sm"
                          style={{
                            backgroundColor: "var(--blue-50)",
                            color: "var(--blue-800)",
                          }}
                        >
                          <strong>Note:</strong> This is a preview. In production, PlantUML diagrams would be rendered
                          using a diagram service or client-side renderer.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="p-8 rounded-2xl border min-h-[600px] flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="text-center">
                    <ExclamationTriangleIcon
                      className="w-16 h-16 mx-auto mb-4"
                      style={{ color: "var(--yellow-500)" }}
                    />
                    <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                      View Not Available
                    </h4>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      This view type hasn't been generated yet. Try regenerating views or check your design inputs.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
