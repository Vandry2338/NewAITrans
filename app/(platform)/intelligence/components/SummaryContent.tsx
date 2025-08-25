"use client"

import { useState } from "react"
import {
  FileText,
  Map,
  Building2,
  Globe,
  Shield,
  List,
  X,
  Target,
  Clock,
  AlertTriangle,
  Users,
  BarChart3,
  MessageSquare,
  BookmarkIcon,
  ShareIcon,
  MoreHorizontal,
  Mic,
  Presentation,
} from "lucide-react"
import { useICStore } from "@/lib/store"

export default function SummaryContent() {
  const {
    readiness,
    kpis = [],
    painPoints = [],
    initiatives = [],
    trends = [],
    interviews = [],
    coverage,
    surveys = [],
    surveyResponses = [],
    surveyAnalytics = {},
    northStarFragments = [],
  } = useICStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [previewModal, setPreviewModal] = useState<string | null>(null)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)

  const northStarMetrics = {
    totalFragments: northStarFragments.length,
    completedFragments: northStarFragments.filter(
      (f) => f.impact && f.effort && f.horizon && f.confidence && f.vision && (f.priorities?.length || 0) > 0,
    ).length,
    highImpactFragments: northStarFragments.filter((f) => (f.impact || 0) >= 4).length,
    quickWins: northStarFragments.filter((f) => (f.impact || 0) >= 3 && (f.effort || 0) <= 3 && f.horizon === "Now")
      .length,
    completeness:
      northStarFragments.length > 0
        ? Math.round(
            (northStarFragments.filter(
              (f) => f.impact && f.effort && f.horizon && f.confidence && f.vision && (f.priorities?.length || 0) > 0,
            ).length /
              northStarFragments.length) *
              100,
          )
        : 0,
    laneDistribution: {
      Outcomes: northStarFragments.filter((f) => f.lens === "Outcomes").length,
      Stakeholders: northStarFragments.filter((f) => f.lens === "Stakeholders").length,
      Operations: northStarFragments.filter((f) => f.lens === "Operations").length,
      Experiences: northStarFragments.filter((f) => f.lens === "Experiences").length,
      Taglines: northStarFragments.filter((f) => f.lens === "Taglines").length,
    },
  }

  const requirementGatheringMetrics = {
    workshop: {
      kpisIdentified: kpis.length,
      painPointsMapped: painPoints.length,
      initiativesDefined: initiatives.length,
      readinessScore: readiness || 0,
      northStarFragments: northStarMetrics.totalFragments,
      northStarCompleteness: northStarMetrics.completeness,
    },
    interviews: {
      completed: interviews.length,
      target: coverage?.target || 20,
      unitsCovered: coverage?.unitsCovered?.length || 0,
      areasCovered: coverage?.areasCovered?.length || 0,
      totalFragments: interviews.reduce((sum, interview) => sum + (interview.fragments?.length || 0), 0),
      avgChampionScore:
        interviews.length > 0
          ? Math.round(interviews.reduce((sum, i) => sum + (i.championScore || 0), 0) / interviews.length)
          : 0,
    },
    surveys: {
      active: surveys.filter((s) => s.status === "active").length,
      totalResponses: surveyResponses.length,
      completedResponses: surveyResponses.filter((r) => r.status === "completed").length,
      avgCompletionRate:
        surveys.length > 0
          ? Math.round(
              surveys.reduce((sum, survey) => {
                const analytics = surveyAnalytics[survey.id]
                return sum + (analytics?.stats?.completionRate || 0)
              }, 0) / surveys.length,
            )
          : 0,
      fragmentsGenerated: Object.values(surveyAnalytics).reduce(
        (sum, analytics) => sum + (analytics.fragments?.length || 0),
        0,
      ),
    },
  }

  const overallRequirementReadiness = Math.round(
    requirementGatheringMetrics.workshop.readinessScore * 0.25 +
      Math.min(
        100,
        (requirementGatheringMetrics.interviews.completed / requirementGatheringMetrics.interviews.target) * 100,
      ) *
        0.35 +
      requirementGatheringMetrics.surveys.avgCompletionRate * 0.25 +
      northStarMetrics.completeness * 0.15,
  )

  const composeVisionPack = async () => {
    setIsGenerating(true)
    const toast = document.createElement("div")
    toast.textContent = "Composing your Vision document…"
    toast.className = "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
    document.body.appendChild(toast)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGenerating(false)
    document.body.removeChild(toast)
  }

  const handleExport = async (formats: string[]) => {
    const toast = document.createElement("div")
    toast.textContent = `Exporting ${formats.join(", ")}…`
    toast.className = "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
    document.body.appendChild(toast)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    document.body.removeChild(toast)
    setExportMenuOpen(false)
  }

  const requirementGatheringDeliverables = [
    {
      id: "surveys-native",
      icon: BarChart3,
      title: "Surveys (Native)",
      description:
        "Design → Distribute → Analyze & Map. Build custom surveys with AI Draft, Preview, and Save. Full analytics with theme clustering.",
      type: "Survey Tool",
      status: surveys.length >= 3 && surveyResponses.length >= 127 ? "Ready" : "In Progress",
      metrics: {
        surveys: surveys.length,
        responses: surveyResponses.length,
      },
      completion: Math.min(100, Math.round((surveyResponses.length / 127) * 100)),
    },
    {
      id: "executive-interviews",
      icon: Mic,
      title: "Executive Interviews",
      description:
        "Prepare → Run → Summarize → Synthesize. 4-step workspace with question generation, transcription, and fragment extraction.",
      type: "Interview Tool",
      status: interviews.length >= 12 && (coverage?.unitsCovered?.length || 0) >= 4 ? "Ready" : "In Progress",
      metrics: {
        leaders: `${interviews.length}/20`,
        units: `${coverage?.unitsCovered?.length || 0}/5`,
      },
      completion: Math.min(
        100,
        Math.round(((interviews.length / 20) * 0.6 + ((coverage?.unitsCovered?.length || 0) / 5) * 0.4) * 100),
      ),
    },
    {
      id: "stakeholder-mapping",
      icon: Users,
      title: "Stakeholder Mapping",
      description:
        "RACI + Influence Analysis. Agent proposes stakeholders from financials and filings; refine with RACI analysis.",
      type: "Mapping Tool",
      status: "Ready",
      metrics: {
        stakeholders: 18,
        mapped: "92%",
      },
      completion: 92,
    },
    {
      id: "workshop-mode",
      icon: Presentation,
      title: "Workshop Mode",
      description: "North Star Board. Premium sticky-wall experience to capture North Star fragments during workshops.",
      type: "Workshop Tool",
      status: northStarFragments.length >= 24 && northStarMetrics.completeness >= 85 ? "Ready" : "In Progress",
      metrics: {
        fragments: northStarFragments.length,
        complete: `${northStarMetrics.completeness}%`,
      },
      completion: northStarMetrics.completeness,
    },
  ]

  const deliverableCards = [
    ...requirementGatheringDeliverables,
    {
      id: "strategy-map",
      icon: Map,
      title: "Business Strategy Map",
      description: "Prioritized KPIs + pain points + initiatives, turned into a clear strategy.",
      type: "Strategy Document",
      status:
        kpis.length > 0 && painPoints.length > 0 && interviews.length >= 3 && northStarMetrics.totalFragments >= 5
          ? "Ready"
          : "Awaiting data",
      completion: Math.min(
        100,
        Math.round(((kpis.length / 24) * 0.3 + (painPoints.length / 15) * 0.3 + (interviews.length / 20) * 0.4) * 100),
      ),
      interviewBased: true,
    },
    {
      id: "business-model",
      icon: Building2,
      title: "Business Model Canvas",
      description: "Pre-filled from trends and benchmarks—edit in minutes.",
      type: "Business Model",
      status:
        trends.length > 0 && interviews.length >= 2 && northStarMetrics.highImpactFragments >= 2
          ? "Ready"
          : "Awaiting data",
      completion: Math.min(100, Math.round(((trends.length / 10) * 0.4 + (interviews.length / 20) * 0.6) * 100)),
      interviewBased: true,
    },
    {
      id: "context-diagram",
      icon: Globe,
      title: "Business Context Diagram",
      description: "Market, regulatory, and competitive context on one page.",
      type: "Context Diagram",
      status: interviews.length >= 1 && northStarMetrics.laneDistribution.Stakeholders >= 1 ? "Ready" : "Awaiting data",
      completion: Math.min(
        100,
        Math.round(((interviews.length / 20) * 0.7 + (northStarMetrics.laneDistribution.Stakeholders / 5) * 0.3) * 100),
      ),
      interviewBased: true,
    },
    {
      id: "principles",
      icon: Shield,
      title: "Architecture Principles & Guardrails",
      description: "The non-negotiables that later become automated gates.",
      type: "Architecture Guide",
      status: interviews.length >= 2 && northStarMetrics.laneDistribution.Operations >= 2 ? "Ready" : "Draft",
      completion: Math.min(
        100,
        Math.round(((interviews.length / 20) * 0.6 + (northStarMetrics.laneDistribution.Operations / 5) * 0.4) * 100),
      ),
      interviewBased: true,
    },
    {
      id: "requirements",
      icon: List,
      title: "Requirements Catalog",
      description: "Traceable requirements mapped to process and capability.",
      type: "Requirements Doc",
      status:
        painPoints.length > 0 && interviews.length >= 3 && northStarMetrics.completedFragments >= 5
          ? "Ready"
          : "Awaiting data",
      completion: Math.min(
        100,
        Math.round(
          ((painPoints.length / 15) * 0.4 +
            (interviews.length / 20) * 0.4 +
            (northStarMetrics.completedFragments / 15) * 0.2) *
            100,
        ),
      ),
      interviewBased: true,
    },
    {
      id: "executive",
      icon: FileText,
      title: "Executive One-Pager",
      description: "Board-ready summary with key insights and recommendations.",
      type: "Executive Summary",
      status:
        interviews.length >= 5 && northStarMetrics.laneDistribution.Taglines >= 1 && northStarMetrics.quickWins >= 2
          ? "Ready"
          : "Draft",
      completion: Math.min(
        100,
        Math.round(
          ((interviews.length / 20) * 0.5 +
            (northStarMetrics.laneDistribution.Taglines / 3) * 0.3 +
            (northStarMetrics.quickWins / 5) * 0.2) *
            100,
        ),
      ),
      interviewBased: true,
    },
  ]

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "Survey Tool":
        return "var(--grad-accent-b)"
      case "Interview Tool":
        return "var(--grad-orange)"
      case "Mapping Tool":
        return "var(--grad-accent-a)"
      case "Workshop Tool":
        return "var(--grad-primary)"
      case "Strategy Document":
        return "var(--grad-primary)"
      case "Business Model":
        return "var(--grad-accent-a)"
      case "Context Diagram":
        return "var(--grad-accent-b)"
      case "Architecture Guide":
        return "var(--grad-orange)"
      case "Requirements Doc":
        return "var(--grad-accent-a)"
      case "Executive Summary":
        return "var(--grad-primary)"
      default:
        return "var(--grad-primary)"
    }
  }

  const interviewCoverage = {
    hasMinimumInterviews: interviews.length >= 20,
    hasMinimumUnits: coverage?.unitsCovered?.length >= 5,
    totalFragments: interviews.reduce((sum, interview) => sum + (interview.fragments?.length || 0), 0),
  }

  const visionPackReadiness = Math.min(
    100,
    Math.round(
      (interviews.length / 20) * 30 +
        ((coverage?.unitsCovered?.length || 0) / 5) * 25 +
        (interviewCoverage.totalFragments / 75) * 25 +
        (northStarMetrics.completedFragments / 15) * 20,
    ),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-700">Discovery Summary</span>
          </div>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your KPIs, pain points, trends, and initiatives into a comprehensive Architecture Vision ready for
            executive presentation.
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden">
              <span className="text-sm font-medium text-slate-700">Vision Readiness</span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${readiness || 0}%` }}
                  />
                </div>
                <span className="text-lg font-bold text-blue-600 min-w-[3rem]">{readiness || 0}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Target, label: "KPI Coverage", value: `${kpis.length}/24`, color: "from-teal-500 to-cyan-500" },
            {
              icon: AlertTriangle,
              label: "Pain Points",
              value: painPoints.length,
              color: "from-orange-500 to-red-500",
            },
            { icon: Building2, label: "Initiatives", value: initiatives.length, color: "from-blue-500 to-indigo-500" },
            {
              icon: Users,
              label: "Interviews",
              value: `${interviews.length}/20+`,
              color: "from-amber-500 to-orange-500",
            },
            { icon: Clock, label: "Readiness", value: `${readiness || 0}%`, color: "from-purple-500 to-pink-500" },
          ].map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.label}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{item.value}</div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Requirement Gathering Overview</h2>
            <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-sm font-medium text-blue-700">Overall Readiness</span>
              <span className="text-lg font-bold text-blue-600">{overallRequirementReadiness}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Surveys (Native) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Surveys (Native)</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Surveys</span>
                  <span className="font-medium text-slate-900">{surveys.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Responses</span>
                  <span className="font-medium text-slate-900">{surveyResponses.length}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">Completion</span>
                    <span className="font-bold text-blue-600">
                      {Math.min(100, Math.round((surveyResponses.length / 127) * 100))}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Executive Interviews */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Executive Interviews</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Completed</span>
                  <span className="font-medium text-slate-900">{interviews.length}/20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Units Covered</span>
                  <span className="font-medium text-slate-900">{coverage?.unitsCovered?.length || 0}/5</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">Completion</span>
                    <span className="font-bold text-blue-600">
                      {Math.min(
                        100,
                        Math.round(
                          ((interviews.length / 20) * 0.6 + ((coverage?.unitsCovered?.length || 0) / 5) * 0.4) * 100,
                        ),
                      )}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stakeholder Mapping */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Stakeholder Mapping</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Stakeholders</span>
                  <span className="font-medium text-slate-900">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Mapped</span>
                  <span className="font-medium text-slate-900">92%</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">Completion</span>
                    <span className="font-bold text-blue-600">92%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workshop Mode */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Presentation className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Workshop Mode</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Fragments</span>
                  <span className="font-medium text-slate-900">{northStarFragments.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Complete</span>
                  <span className="font-medium text-slate-900">{northStarMetrics.completedFragments}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-900">Completion</span>
                    <span className="font-bold text-blue-600">{northStarMetrics.completeness}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-bold mb-1 text-blue-600">
                  {requirementGatheringMetrics.interviews.totalFragments +
                    requirementGatheringMetrics.surveys.fragmentsGenerated +
                    northStarMetrics.totalFragments}
                </div>
                <div className="text-sm text-slate-600">Total Fragments Collected</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-bold mb-1 text-blue-600">
                  {requirementGatheringMetrics.interviews.unitsCovered +
                    requirementGatheringMetrics.interviews.areasCovered}
                </div>
                <div className="text-sm text-slate-600">Coverage Areas</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-bold mb-1 text-blue-600">
                  {Math.round(
                    ((requirementGatheringMetrics.interviews.completed +
                      requirementGatheringMetrics.surveys.completedResponses) /
                      (requirementGatheringMetrics.interviews.target +
                        requirementGatheringMetrics.surveys.totalResponses || 1)) *
                      100,
                  )}
                  %
                </div>
                <div className="text-sm text-slate-600">Combined Response Rate</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-lg font-bold mb-1 text-blue-600">
                  {Object.values(northStarMetrics.laneDistribution).filter((count) => count > 0).length}/5
                </div>
                <div className="text-sm text-slate-600">North Star Lanes Covered</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Deliverables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverableCards.map((card) => {
              const IconComponent = card.icon
              const isReady = card.status === "Ready"
              return (
                <div
                  key={card.id}
                  className="rounded-2xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium text-white"
                      style={{ background: getTypeGradient(card.type) }}
                    >
                      {card.type}
                    </span>
                    {card.completion && <span className="text-xs text-gray-500">{card.completion}%</span>}
                  </div>

                  {/* Video Thumbnail */}
                  <div className="relative mb-4 aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-gray-400" />
                    </div>
                    {isReady && (
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        Preview
                      </div>
                    )}
                  </div>

                  {/* Title and Summary */}
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-slate-900">{card.title}</h3>

                  <p className="text-sm mb-4 line-clamp-2 text-slate-600">{card.description}</p>

                  {/* Meta Chips */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        isReady ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {card.status}
                    </span>
                    {card.metrics &&
                      Object.entries(card.metrics).map(([key, value]) => (
                        <span key={key} className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {key}: {value}
                        </span>
                      ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      className="px-4 py-2 rounded-lg font-medium transition-colors text-white"
                      style={{ background: getTypeGradient(card.type) }}
                      onClick={() => setPreviewModal(card.id)}
                      disabled={!isReady}
                    >
                      {isReady ? "Open Preview" : "Preview (awaiting data)"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <BookmarkIcon className="h-4 w-4 text-slate-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <ShareIcon className="h-4 w-4 text-slate-500" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Agent snapshot (after you run it) */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Agent snapshot (after you run it)</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "KPIs selected", count: kpis.length },
              { label: "Pain points", count: painPoints.length },
              { label: "Initiatives", count: initiatives.length },
              { label: "Trends pulled", count: trends.length },
            ].map((item) => (
              <div key={item.label} className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-sm text-slate-600">
                  {item.label} {item.count > 0 ? item.count : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-200">
                <Shield className="w-5 h-5 text-teal-500" />
                <span className="text-sm font-medium text-slate-700">
                  Human-in-the-loop: Agent-drafted. A consultant reviews before export.
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-sm text-slate-600">
                <span>{interviews.length} interviews</span>
                <span>•</span>
                <span>{northStarMetrics.totalFragments} fragments</span>
                <span>•</span>
                <span>{visionPackReadiness}% ready</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setExportMenuOpen(!exportMenuOpen)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Export options
                </button>

                {exportMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-2 p-4 bg-white rounded-2xl shadow-xl border border-slate-200 min-w-48">
                    <div className="space-y-3">
                      {[
                        { id: "pdf", label: "PDF brief", checked: true },
                        { id: "pptx", label: "PPTX deck", checked: true },
                        { id: "json", label: "JSON bundle", checked: true },
                      ].map((option) => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                          <input type="checkbox" className="rounded" defaultChecked={option.checked} />
                          <span className="text-sm font-medium text-slate-700">{option.label}</span>
                        </label>
                      ))}
                      <button
                        onClick={() => handleExport(["PDF", "PPTX", "JSON"])}
                        className="w-full mt-3 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        Export selected
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={composeVisionPack}
                disabled={isGenerating}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                {isGenerating ? "Generating Vision Pack…" : "Generate Vision Pack"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {previewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="max-w-2xl w-full mx-4 p-6 rounded-lg bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Preview sample</h3>
              <button onClick={() => setPreviewModal(null)} className="p-1 rounded transition-colors text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-200">
              <span className="text-slate-400">Preview thumbnail placeholder</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
