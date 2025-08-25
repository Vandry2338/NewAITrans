"use client"

import { useState } from "react"
import {
  ChevronRight,
  Play,
  FileText,
  Mic,
  BarChart3,
  Lightbulb,
  Download,
  Calendar,
  Upload,
  Clock,
  User,
  Building,
  AlertTriangle,
  MapPin,
  Star,
  CheckCircle,
} from "lucide-react"
import { useICStore } from "@/lib/store"

export default function ExecutiveInterviewsPage() {
  const { readiness } = useICStore()
  const [activeStep, setActiveStep] = useState(0)
  const [isGeneratingKit, setIsGeneratingKit] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [interviewTimer, setInterviewTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentInterview, setCurrentInterview] = useState({
    name: "",
    role: "",
    unit: "",
    area: "",
    date: new Date().toISOString().split("T")[0],
    recording: null,
    transcript: "",
    highlights: {
      strategicObjectives: [],
      businessPriorities: [],
      valueDrivers: [],
      quickWins: [],
      expectations: [],
    },
    fragments: [],
    championScore: 0,
  })

  // Mock data for coverage and readiness
  const coverage = {
    target: 20,
    completed: 3,
    unitsCovered: ["Corporate", "Services"],
    areasCovered: ["Business", "Finance", "Operations"],
  }

  const champions = [
    { role: "CEO", name: "Sarah Chen", score: 95 },
    { role: "CFO", name: "Michael Torres", score: 88 },
    { role: "COO", name: "Lisa Wang", score: 82 },
    { role: "CIO", name: "David Kim", score: 76 },
  ]

  const interviewReadiness = Math.min(
    100,
    Math.round(
      (coverage.completed / coverage.target) * 30 +
        (coverage.unitsCovered.length / 5) * 25 +
        (coverage.areasCovered.length / 5) * 25 +
        (champions.length / 8) * 20,
    ),
  )

  const steps = [
    {
      id: "prepare",
      title: "Prepare",
      description: "Generate role-tailored question packs",
      icon: FileText,
      status: "available",
    },
    {
      id: "run",
      title: "Run",
      description: "Conduct interviews with timer and transcription",
      icon: Mic,
      status: coverage.completed > 0 ? "available" : "locked",
    },
    {
      id: "summarize",
      title: "Summarize",
      description: "Extract highlights and North Star fragments",
      icon: BarChart3,
      status: coverage.completed > 0 ? "available" : "locked",
    },
    {
      id: "synthesize",
      title: "Synthesize",
      description: "Build themes, contradictions, and strategy map",
      icon: Lightbulb,
      status: coverage.completed >= 3 ? "available" : "locked",
    },
  ]

  const runAgent = async () => {
    const toast = document.createElement("div")
    toast.textContent = "Running agent to update drafts and themes..."
    toast.className = "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
    document.body.appendChild(toast)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    document.body.removeChild(toast)
  }

  const generateInterviewKit = async () => {
    setIsGeneratingKit(true)
    const toast = document.createElement("div")
    toast.textContent = "Generating role-tailored interview kit..."
    toast.className = "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
    document.body.appendChild(toast)

    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsGeneratingKit(false)
    document.body.removeChild(toast)
  }

  const transcribeAndAnalyze = async () => {
    setIsTranscribing(true)
    const toast = document.createElement("div")
    toast.textContent = "Transcribing and analyzing interview..."
    toast.className = "fixed top-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50"
    document.body.appendChild(toast)

    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Mock analysis results
    setCurrentInterview((prev) => ({
      ...prev,
      highlights: {
        strategicObjectives: ["Digital transformation acceleration", "Market expansion in APAC"],
        businessPriorities: ["Customer experience improvement", "Operational efficiency"],
        valueDrivers: ["Revenue growth", "Cost optimization", "Risk mitigation"],
        quickWins: ["Process automation", "Data analytics dashboard"],
        expectations: ["Clear ROI metrics", "Phased implementation approach"],
      },
      fragments: [
        { id: 1, text: "We need to accelerate our digital transformation", tags: ["Vision", "Priority"], weight: 0.9 },
        { id: 2, text: "Customer experience is our top priority", tags: ["Priority", "Capability"], weight: 0.8 },
        { id: 3, text: "ROI must be measurable within 6 months", tags: ["Constraint", "KPI"], weight: 0.7 },
      ],
      championScore: 85,
    }))

    setIsTranscribing(false)
    document.body.removeChild(toast)
  }

  const startTimer = () => {
    setIsTimerRunning(true)
    const interval = setInterval(() => {
      setInterviewTimer((prev) => {
        if (prev >= 3600) {
          // 60 minutes
          clearInterval(interval)
          setIsTimerRunning(false)
          return 3600
        }
        return prev + 1
      })
    }, 1000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Prepare
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Generate Interview Kit
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Agent creates role-tailored question packs using Industry + KPI set + pain points
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Role-Specific Question Packs
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["CEO", "CFO", "COO", "CIO", "CHRO", "CPO", "CDO", "GM"].map((role) => (
                    <button
                      key={role}
                      className="p-3 rounded-lg border text-left transition-all hover:scale-105"
                      style={{
                        backgroundColor: "var(--surface-elev-1)",
                        borderColor: "var(--neutral-200)",
                      }}
                    >
                      <div className="font-medium" style={{ color: "var(--text-default)" }}>
                        {role}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        15-20 questions
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Question Sections
                </h3>
                <div className="space-y-2">
                  {[
                    "Strategic objectives",
                    "Value drivers",
                    "Quick wins",
                    "Constraints/risks",
                    "Digital transformation expectations",
                  ].map((section) => (
                    <div key={section} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" style={{ color: "var(--accent-teal)" }} />
                      <span className="text-sm" style={{ color: "var(--text-default)" }}>
                        {section}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={generateInterviewKit}
                disabled={isGeneratingKit}
                className="px-6 py-3 font-semibold rounded-lg transition-all disabled:opacity-50"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                  borderRadius: "var(--radius-chip)",
                }}
              >
                {isGeneratingKit ? "Generating Kit..." : "Generate Interview Kit"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span className="text-sm">Download PDF</span>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors hover:bg-gray-50">
                <FileText className="w-4 h-4" />
                <span className="text-sm">Google Doc</span>
              </button>
              <button className="flex items-center gap-2 p-3 rounded-lg border transition-colors hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Export .ics</span>
              </button>
            </div>

            <div
              className="text-xs p-3 rounded-lg"
              style={{ backgroundColor: "var(--neutral-50)", color: "var(--text-muted)" }}
            >
              <strong>Consent:</strong> All interviews will be recorded and transcribed for analysis. Participants will
              be informed and consent obtained before recording begins.
            </div>
          </div>
        )

      case 1: // Run
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Conduct Interview
              </h2>
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: "var(--brand-royal)" }} />
                  <span className="text-2xl font-mono font-bold" style={{ color: "var(--brand-royal)" }}>
                    {formatTime(interviewTimer)}
                  </span>
                </div>
                <button
                  onClick={startTimer}
                  disabled={isTimerRunning}
                  className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  style={{
                    backgroundColor: isTimerRunning ? "var(--accent-teal)" : "var(--brand-royal)",
                    color: "white",
                  }}
                >
                  {isTimerRunning ? "Recording..." : "Start Timer"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Interview Details
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Executive Name"
                    value={currentInterview.name}
                    onChange={(e) => setCurrentInterview((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 rounded-lg border"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g., CEO, CFO)"
                    value={currentInterview.role}
                    onChange={(e) => setCurrentInterview((prev) => ({ ...prev, role: e.target.value }))}
                    className="w-full p-3 rounded-lg border"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                  <input
                    type="text"
                    placeholder="Business Unit"
                    value={currentInterview.unit}
                    onChange={(e) => setCurrentInterview((prev) => ({ ...prev, unit: e.target.value }))}
                    className="w-full p-3 rounded-lg border"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                  <input
                    type="text"
                    placeholder="Area (Business, Finance, etc.)"
                    value={currentInterview.area}
                    onChange={(e) => setCurrentInterview((prev) => ({ ...prev, area: e.target.value }))}
                    className="w-full p-3 rounded-lg border"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Recording & Transcript
                </h3>
                <div className="space-y-3">
                  <div
                    className="border-2 border-dashed rounded-lg p-6 text-center"
                    style={{ borderColor: "var(--neutral-200)" }}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--text-muted)" }} />
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Upload recording (audio/video)
                    </p>
                    <input type="file" accept="audio/*,video/*" className="hidden" />
                  </div>
                  <textarea
                    placeholder="Or paste transcript here (optional)"
                    value={currentInterview.transcript}
                    onChange={(e) => setCurrentInterview((prev) => ({ ...prev, transcript: e.target.value }))}
                    rows={6}
                    className="w-full p-3 rounded-lg border resize-none"
                    style={{ borderColor: "var(--neutral-200)" }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={transcribeAndAnalyze}
                disabled={isTranscribing}
                className="px-6 py-3 font-semibold rounded-lg transition-all disabled:opacity-50"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                  borderRadius: "var(--radius-chip)",
                }}
              >
                {isTranscribing ? "Transcribing & Analyzing..." : "Transcribe & Analyze"}
              </button>
            </div>
          </div>
        )

      case 2: // Summarize
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Interview Summary
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Auto-filled from analysis, editable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Executive Meta
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm">{currentInterview.name || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm">
                      {currentInterview.role || "Not specified"} - {currentInterview.unit || "Not specified"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    <span className="text-sm">{currentInterview.area || "Not specified"}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium" style={{ color: "var(--text-default)" }}>
                    Champion Score
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: "var(--neutral-200)" }}>
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${currentInterview.championScore}%`,
                          backgroundColor:
                            currentInterview.championScore >= 80 ? "var(--accent-teal)" : "var(--accent-gold)",
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{currentInterview.championScore}/100</span>
                    <button className="text-xs px-2 py-1 rounded" style={{ backgroundColor: "var(--neutral-100)" }}>
                      Change sponsor
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Highlights
                </h3>
                {Object.entries(currentInterview.highlights).map(([key, values]) => (
                  <div key={key} className="space-y-2">
                    <h4 className="text-sm font-medium capitalize" style={{ color: "var(--text-default)" }}>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </h4>
                    <div className="space-y-1">
                      {values.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--brand-royal)" }} />
                          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                North Star Fragments
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Short, potent statements extracted from the interview
              </p>
              <div className="space-y-3">
                {currentInterview.fragments.map((fragment) => (
                  <div
                    key={fragment.id}
                    className="p-4 rounded-lg border"
                    style={{ backgroundColor: "var(--surface-elev-1)", borderColor: "var(--neutral-200)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm flex-1" style={{ color: "var(--text-default)" }}>
                        "{fragment.text}"
                      </p>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="w-3 h-3" style={{ color: "var(--accent-gold)" }} />
                        <span className="text-xs">{fragment.weight}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {fragment.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ backgroundColor: "var(--neutral-100)", color: "var(--text-muted)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3: // Synthesize
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Synthesis & Analysis
              </h2>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Themes, contradictions, and strategic insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Themes Heatmap
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { theme: "Digital Transformation", intensity: 0.9 },
                    { theme: "Customer Experience", intensity: 0.8 },
                    { theme: "Operational Efficiency", intensity: 0.7 },
                    { theme: "Data Analytics", intensity: 0.6 },
                    { theme: "Process Automation", intensity: 0.5 },
                    { theme: "Risk Management", intensity: 0.4 },
                  ].map((item) => (
                    <div
                      key={item.theme}
                      className="p-3 rounded-lg text-center"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${item.intensity})`,
                        color: item.intensity > 0.6 ? "white" : "var(--text-default)",
                      }}
                    >
                      <div className="text-xs font-medium">{item.theme}</div>
                      <div className="text-xs opacity-75">{Math.round(item.intensity * 100)}%</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                  Contradictions Detector
                </h3>
                <div className="space-y-2">
                  {[
                    { issue: "Timeline expectations vary", severity: "high" },
                    { issue: "Budget priorities differ", severity: "medium" },
                    { issue: "Technology preferences", severity: "low" },
                  ].map((item) => (
                    <div
                      key={item.issue}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ backgroundColor: "var(--surface-elev-1)" }}
                    >
                      <AlertTriangle
                        className="w-4 h-4"
                        style={{
                          color:
                            item.severity === "high"
                              ? "var(--accent-red)"
                              : item.severity === "medium"
                                ? "var(--accent-gold)"
                                : "var(--accent-teal)",
                        }}
                      />
                      <span className="text-sm flex-1">{item.issue}</span>
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{ backgroundColor: "var(--neutral-100)" }}
                      >
                        {item.severity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold" style={{ color: "var(--text-default)" }}>
                Quick Wins
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b" style={{ borderColor: "var(--neutral-200)" }}>
                      <th className="text-left p-3 text-sm font-medium">Initiative</th>
                      <th className="text-left p-3 text-sm font-medium">Payback</th>
                      <th className="text-left p-3 text-sm font-medium">Complexity</th>
                      <th className="text-left p-3 text-sm font-medium">Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        initiative: "Process automation dashboard",
                        payback: "3-6 months",
                        complexity: "Low",
                        impact: "High",
                      },
                      {
                        initiative: "Customer data integration",
                        payback: "6-12 months",
                        complexity: "Medium",
                        impact: "High",
                      },
                      {
                        initiative: "Real-time analytics",
                        payback: "12-18 months",
                        complexity: "High",
                        impact: "Medium",
                      },
                    ].map((item, index) => (
                      <tr key={index} className="border-b" style={{ borderColor: "var(--neutral-100)" }}>
                        <td className="p-3 text-sm">{item.initiative}</td>
                        <td className="p-3 text-sm">{item.payback}</td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.complexity === "Low"
                                ? "bg-green-100 text-green-800"
                                : item.complexity === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.complexity}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.impact === "High"
                                ? "bg-green-100 text-green-800"
                                : item.impact === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.impact}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--brand-royal)", color: "white" }}
              >
                Send to Strategic Initiatives Canvas
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--accent-teal)", color: "white" }}
              >
                Build Strategy Map
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-colors"
                style={{ backgroundColor: "var(--accent-gold)", color: "white" }}
              >
                Update Requirements Catalog
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--neutral-0)" }}>
      <div className="flex">
        {/* Left Rail - Sticky Status */}
        <div
          className="w-80 p-6 border-r sticky top-0 h-screen overflow-y-auto"
          style={{
            backgroundColor: "var(--surface-elev-1)",
            borderColor: "var(--neutral-100)",
          }}
        >
          <div className="space-y-6">
            {/* Coverage Rings */}
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Coverage Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--neutral-200)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--brand-royal)"
                        strokeWidth="2"
                        strokeDasharray={`${(coverage.completed / coverage.target) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: "var(--brand-royal)" }}>
                        {coverage.completed}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                      Interviews
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {coverage.completed} / {coverage.target}+ target
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--neutral-200)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--accent-teal)"
                        strokeWidth="2"
                        strokeDasharray={`${(coverage.unitsCovered.length / 5) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: "var(--accent-teal)" }}>
                        {coverage.unitsCovered.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                      Units
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {coverage.unitsCovered.length} / 5 covered
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--neutral-200)"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="var(--accent-gold)"
                        strokeWidth="2"
                        strokeDasharray={`${(coverage.areasCovered.length / 5) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-bold" style={{ color: "var(--accent-gold)" }}>
                        {coverage.areasCovered.length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                      Areas
                    </div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {coverage.areasCovered.length} / 5 covered
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Readiness Meter */}
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Interview Readiness
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Overall Progress
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "var(--brand-royal)" }}>
                    {interviewReadiness}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: "var(--neutral-200)" }}>
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${interviewReadiness}%`,
                      background: "var(--grad-primary)",
                    }}
                  />
                </div>
                <div className="text-xs space-y-1" style={{ color: "var(--text-muted)" }}>
                  <div>• Interviews: {Math.round((coverage.completed / coverage.target) * 100)}%</div>
                  <div>• Unit coverage: {Math.round((coverage.unitsCovered.length / 5) * 100)}%</div>
                  <div>• Area coverage: {Math.round((coverage.areasCovered.length / 5) * 100)}%</div>
                  <div>• Champions identified: {Math.round((champions.length / 8) * 100)}%</div>
                </div>
              </div>
            </div>

            {/* Champion Radar */}
            <div>
              <h3 className="text-sm font-semibold mb-4" style={{ color: "var(--text-default)" }}>
                Top Champions
              </h3>
              <div className="space-y-3">
                {champions.map((champion) => (
                  <div key={champion.role} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-default)" }}>
                        {champion.role}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {champion.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full" style={{ backgroundColor: "var(--neutral-200)" }}>
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${champion.score}%`,
                            backgroundColor:
                              champion.score >= 90
                                ? "var(--accent-teal)"
                                : champion.score >= 80
                                  ? "var(--accent-gold)"
                                  : "var(--brand-sky)",
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium w-8" style={{ color: "var(--text-default)" }}>
                        {champion.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Hero Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <h1 className="gradient-text text-4xl font-bold mb-4">Executive Interviews</h1>
              <p className="text-lg mb-6" style={{ color: "var(--text-muted)" }}>
                Prep fast. Run clean. Auto-analyze. Synthesize to a clear Strategy Map.
              </p>
            </div>

            <div className="ml-8">
              <button
                onClick={runAgent}
                className="flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all hover:scale-105"
                style={{
                  background: "var(--grad-primary)",
                  color: "white",
                  borderRadius: "var(--radius-chip)",
                }}
              >
                <Play className="w-4 h-4" />
                Run Agent
              </button>
            </div>
          </div>

          {/* 4-Step Stepper Navigation */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const IconComponent = step.icon
                const isActive = activeStep === index
                const isCompleted = index < activeStep
                const isLocked = step.status === "locked"

                return (
                  <div key={step.id} className="flex items-center flex-1">
                    <button
                      onClick={() => !isLocked && setActiveStep(index)}
                      disabled={isLocked}
                      className={`flex items-center gap-3 p-4 rounded-lg transition-all ${
                        isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-105"
                      }`}
                      style={{
                        background: isActive
                          ? "var(--grad-tile-strong)"
                          : isCompleted
                            ? "var(--grad-tile)"
                            : "var(--surface-elev-1)",
                        border: `1px solid ${
                          isActive ? "var(--brand-royal)" : isCompleted ? "var(--accent-teal)" : "var(--neutral-200)"
                        }`,
                        borderRadius: "var(--radius-card)",
                      }}
                    >
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: isActive
                            ? "var(--brand-royal)"
                            : isCompleted
                              ? "var(--accent-teal)"
                              : "var(--neutral-200)",
                        }}
                      >
                        <IconComponent
                          className="w-5 h-5"
                          style={{
                            color: isActive || isCompleted ? "white" : "var(--text-muted)",
                          }}
                        />
                      </div>
                      <div className="text-left">
                        <div
                          className="font-semibold"
                          style={{
                            color: isActive ? "var(--brand-royal)" : "var(--text-default)",
                          }}
                        >
                          {step.title}
                        </div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {step.description}
                        </div>
                      </div>
                    </button>
                    {index < steps.length - 1 && (
                      <ChevronRight className="w-5 h-5 mx-4" style={{ color: "var(--neutral-300)" }} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Step Content Placeholder */}
          <div
            className="p-8 rounded-lg border"
            style={{
              backgroundColor: "var(--surface-elev-1)",
              borderColor: "var(--neutral-100)",
              minHeight: "600px",
            }}
          >
            {renderStepContent()}
          </div>

          {/* Bottom Sticky Bar */}
          {activeStep === 2 && (
            <div
              className="fixed bottom-0 left-80 right-0 backdrop-blur-sm border-t p-4 z-40"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderColor: "var(--neutral-100)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                    Agent-drafted. Consultant reviews before export.
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-2 font-medium rounded-lg transition-colors"
                    style={{
                      backgroundColor: "var(--accent-teal)",
                      color: "white",
                      borderRadius: "var(--radius-chip)",
                    }}
                  >
                    Save & Mark Reviewed
                  </button>
                  <button
                    className="px-4 py-2 font-medium rounded-lg transition-colors"
                    style={{
                      background: "var(--grad-primary)",
                      color: "white",
                      borderRadius: "var(--radius-chip)",
                    }}
                  >
                    Export Pack (PDF + JSON)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
