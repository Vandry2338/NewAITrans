"use client"

import { useState } from "react"
import { Workflow, ArrowLeft, Search, Filter, ChevronDown, ChevronRight, Clock, Users, Target, Zap, Shield, Globe, Factory, Car, Banknote, Heart, GraduationCap, Truck, Wifi, Lightbulb } from "lucide-react"
import { useRouter } from "next/navigation"
import { sapValueChains } from "@/app/data/valueChains"
import { sapIndustries } from "@/app/data/industries"

export default function ProcessesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)
  const [expandedProcesses, setExpandedProcesses] = useState<Set<string>>(new Set())

  const toggleProcessExpansion = (processId: string) => {
    const newExpanded = new Set(expandedProcesses)
    if (newExpanded.has(processId)) {
      newExpanded.delete(processId)
    } else {
      newExpanded.add(processId)
    }
    setExpandedProcesses(newExpanded)
  }

  const getProcessIcon = (processKey: string) => {
    const iconMap: { [key: string]: any } = {
      "S2P": Factory,
      "FIN": Banknote,
      "A2D": Shield,
      "I2M": Lightbulb,
      "R2R": Users,
      "L2C": Target,
      "P2F": Workflow,
      "GOV": Globe,
    }
    return iconMap[processKey] || Workflow
  }

  const getProcessColor = (processKey: string) => {
    const colorMap: { [key: string]: string } = {
      "S2P": "from-blue-500 to-cyan-500",
      "FIN": "from-green-500 to-emerald-500",
      "A2D": "from-purple-500 to-pink-500",
      "I2M": "from-yellow-500 to-orange-500",
      "R2R": "from-indigo-500 to-blue-500",
      "L2C": "from-red-500 to-pink-500",
      "P2F": "from-teal-500 to-green-500",
      "GOV": "from-gray-500 to-slate-500",
    }
    return colorMap[processKey] || "from-gray-500 to-slate-500"
  }

  const filteredProcesses = sapValueChains.filter(process =>
    process.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getIndustriesUsingProcess = (processKey: string) => {
    return sapIndustries.filter(industry => 
      industry.processKeys.includes(processKey as any)
    )
  }

  const renderProcessCard = (process: any) => {
    const IconComponent = getProcessIcon(process.key)
    const gradient = getProcessColor(process.key)
    const isExpanded = expandedProcesses.has(process.id)
    const industriesUsingProcess = getIndustriesUsingProcess(process.key)

    return (
      <div
        key={process.id}
        className="rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        {/* Process Header */}
        <div
          className="p-6 cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => toggleProcessExpansion(process.id)}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg" style={{ color: "var(--text-default)" }}>
                  {process.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-white/20 to-white/10 text-white">
                    {process.key}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                  ) : (
                    <ChevronRight className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
                  )}
                </div>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
                {process.description}
              </p>
              <div className="flex items-center space-x-4 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{industriesUsingProcess.length} industries</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>End-to-end process</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-white/10">
            <div className="pt-4 space-y-4">
              {/* Synonyms */}
              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text-default)" }}>
                  Alternative Names
                </h4>
                <div className="flex flex-wrap gap-2">
                  {process.synonyms.map((synonym: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded-full text-xs bg-white/10 text-white"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>

              {/* Industries Using This Process */}
              {industriesUsingProcess.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text-default)" }}>
                    Industries Using This Process
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {industriesUsingProcess.map((industry) => (
                      <div
                        key={industry.id}
                        className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {industry.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Details */}
              <div>
                <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text-default)" }}>
                  Process Overview
                </h4>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {process.description}
                </p>
              </div>

              {/* Source Information */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
                  <span>Source: SAP Transformation Hub</span>
                  <span>Last updated: {new Date(process.retrieved_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 mb-8 px-4 py-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          style={{ color: "var(--text-default)" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Gallery</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-default)" }}>
            End-to-End Processes & Subprocesses
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Comprehensive process mapping and optimization across all SAP value chains
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                placeholder="Search processes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ color: "var(--text-default)" }}
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors">
              <Filter className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
              <span style={{ color: "var(--text-default)" }}>Filter</span>
            </button>
          </div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            {filteredProcesses.length} of {sapValueChains.length} processes
          </div>
        </div>

        {/* Processes Grid */}
        <div className="space-y-6">
          {filteredProcesses.map(renderProcessCard)}
        </div>

        {/* Empty State */}
        {filteredProcesses.length === 0 && (
          <div className="text-center py-16">
            <Workflow className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--text-muted)" }} />
            <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text-default)" }}>
              No processes found
            </h3>
            <p style={{ color: "var(--text-muted)" }}>
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
