"use client"

import { useState } from "react"
import { useGalleryStore } from "@/lib/store/gallery"
import { X, GitBranch, Building2, Package, FileText, Briefcase } from "lucide-react"

const processDescriptions = {
  S2P: "Including all activities associated with managing the comprehensive sourcing and procurement of goods and services. It starts with procurement planning and managing spend, followed by sourcing and supplier selection, negotiating and managing supplier contracts, and preparing and executing operational procurement. The next steps are goods receipt, initiating potential returns and claims, processing supplier invoices and accounts payable, including final payment to the supplier, and managing supplier data. The source-to-pay process varies mainly based on the type of product or service being purchased.",
  FIN: "Covers all activities associated with managing the capital structure of a company, from planning, budgeting, and forecasting to managing accounts payable and receivable to managing cash (treasury) to recording and reporting financial data. This process also covers real estate management with a focus on allocation and utilization of property and workspace.",
  A2D: "Covers all activities associated with the lifecycle management of assets. This includes planning asset strategy and investments, defining asset maintenance strategies (such as reactive or proactive improvement work), acquiring or building assets, onboarding assets, and planning and executing asset maintenance, as well as offboarding and decommissioning assets. Throughout the lifecycle, the management of asset data and risks can take place.",
  I2M: "Covers all processes associated with managing the lifecycle of products and services, such as managing the product portfolio and investments, identifying new products and services, finalizing design through prototyping, and testing before handover to manufacturing. After production, activities associated with bringing products and services to market must be managed, including the customer experience, intellectual property, and product compliance.",
  R2R: "Includes all activities associated with hiring the internal and external workforce and managing their lifecycle in the organization. It involves strategizing and planning human resource requirements, identifying and onboarding new talent, developing talent to enable growth, and retaining talent through appropriate reward-and-recognition strategies, as well as managing all recurring and administrative tasks throughout the workforce lifecycle.",
  L2C: "Covers all activities related to marketing and selling products and services, managing and fulfilling sales orders, providing after-sales services, and, finally, invoicing customers, managing accounts receivable, and collecting payment. It also covers the management of customers and channels as foundational elements of the process.",
  P2F: "Involves all activities related to the planning, production, delivery, and fulfillment of products or services as well as aspects such as tracking and tracing, data management, and sustainable manufacturing operations. Products could be tangible or intangible, such as software. Services could be classic field services, such as installation or maintenance, but could also be professional services or software as a service.",
  GOV: "Covers generic processes related to planning and defining enterprise strategy, establishing and managing sustainable operations, enabling streamlined portfolio and project management operations across various business functions and organizational levels.",
}

export default function ProcessesView() {
  const { processes, industries, processFacets } = useGalleryStore()
  const [selectedProcessKey, setSelectedProcessKey] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "vendors" | "industries">("overview")

  const selectedProcess = selectedProcessKey ? processes.find((proc) => proc.key === selectedProcessKey) : null
  const selectedProcessFacets = selectedProcessKey ? processFacets.find(pf => pf.processKey === selectedProcessKey) : null

  const getProcessIndustries = (processKey: string) => {
    return industries.filter((industry) => industry.valueChainProcessIds?.includes(processKey))
  }

  const getProcessProducts = (processKey: string) => {
    const facets = processFacets.find(pf => pf.processKey === processKey)
    const productsGroup = facets?.groups.find((g) => g.id === "products")
    return productsGroup?.options || []
  }

  const getProcessVendors = (processKey: string) => {
    const facets = processFacets.find(pf => pf.processKey === processKey)
    const vendorsGroup = facets?.groups.find((g) => g.id === "vendor")
    return vendorsGroup?.options || []
  }

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: FileText },
    { key: "products" as const, label: "Products", icon: Package },
    { key: "vendors" as const, label: "Vendors", icon: Briefcase },
    { key: "industries" as const, label: "Industries", icon: Building2 },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          End-to-End Processes
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Explore canonical E2E business processes from SAP's Transformation Hub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processes.map((process) => {
          const processIndustries = getProcessIndustries(process.key)
          const processProducts = getProcessProducts(process.key)
          const detailedDescription =
            processDescriptions[process.key as keyof typeof processDescriptions] || process.description

          return (
            <div
              key={process.key}
              onClick={() => setSelectedProcessKey(process.key)}
              className="premium-card p-6 space-y-4 h-full flex flex-col min-h-[280px] cursor-pointer group transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white shadow-lg">
                    <GitBranch size={18} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-medium">
                    {process.key}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-3 gradient-heading">{process.name}</h3>

                <p className="text-sm leading-relaxed line-clamp-6" style={{ color: "var(--text-muted)" }}>
                  {detailedDescription}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 size={14} className="text-blue-600" />
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      {processIndustries.length} industries
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-blue-600" />
                    <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                      {processProducts.length} products
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/5 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          )
        })}
      </div>

      {/* Process Panel Overlay */}
      {selectedProcess && selectedProcessFacets && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSelectedProcessKey(null)} />
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-20 shadow-2xl"
            style={{ backgroundColor: "var(--bg)" }}
          >
            <div
              className="sticky top-0 z-10 p-6 border-b"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                    style={{ background: "var(--grad-accent-a)" }}
                  >
                    <GitBranch size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                      {selectedProcess.name}
                    </h2>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {selectedProcess.key} • End-to-End Process
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProcessKey(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={20} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        activeTab === tab.key ? "text-white shadow-md" : "hover:shadow-sm"
                      }`}
                      style={{
                        backgroundColor: activeTab === tab.key ? "var(--grad-accent-a)" : "var(--bg-subtle)",
                        color: activeTab === tab.key ? "white" : "var(--text)",
                      }}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="p-6">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text)" }}>
                      Process Overview
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                      {processDescriptions[selectedProcess.key as keyof typeof processDescriptions] ||
                        selectedProcess.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: "var(--text)" }}>
                      Process Statistics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedProcessFacets.groups.map((group) => (
                        <div
                          key={group.id}
                          className="p-3 rounded-lg border text-center"
                          style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                        >
                          <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                            {group.options.length}
                          </div>
                          <div className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>
                            {group.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "products" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    SAP Products & Solutions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getProcessProducts(selectedProcess.key).map((product) => (
                      <div
                        key={product.key}
                        className="p-4 rounded-lg border"
                        style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            {product.label}
                          </h4>
                          <span
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}
                          >
                            {product.count} items
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "vendors" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Implementation Partners
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getProcessVendors(selectedProcess.key).map((vendor) => (
                      <div
                        key={vendor.key}
                        className="p-4 rounded-lg border"
                        style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm" style={{ color: "var(--text)" }}>
                            {vendor.label}
                          </h4>
                          <span
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ backgroundColor: "var(--bg)", color: "var(--text-muted)" }}
                          >
                            {vendor.count} solutions
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "industries" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                    Relevant Industries
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getProcessIndustries(selectedProcess.key).map((industry) => (
                      <div
                        key={industry.id}
                        className="p-4 rounded-lg border"
                        style={{ backgroundColor: "var(--bg-subtle)", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-3">
                          <Building2 size={16} style={{ color: "var(--text-muted)" }} />
                          <div>
                            <h4 className="font-medium text-sm" style={{ color: "var(--text)" }}>
                              {industry.name}
                            </h4>
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                              Related references
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
