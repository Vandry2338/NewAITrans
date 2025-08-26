"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  BarChart3,
  Radar,
  Calendar,
  Download,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Filter,
  Eye,
  FileText,
  Target,
  Building2,
  Users,
  Lightbulb,
  Award,
  MapPin,
  Globe,
  Cpu,
  Database,
  Cloud,
  ChevronDown,
  ChevronUp,
  Play,
  Video,
  BookOpen,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Search
} from "lucide-react"
import { useICStore } from "@/lib/store"
import * as d3 from "d3"

interface MatchResult {
  id: string
  title: string
  description: string
  businessDomain: string
  valueCategory: "High" | "Medium" | "Low"
  complexityCategory: "Simple" | "Moderate" | "Complex"
  horizon: "Now" | "Next" | "Later"
  estimatedValue: string
  implementationTime: string
  riskLevel: "Low" | "Medium" | "High"
  priority: "Critical" | "High" | "Medium" | "Low"
  status: "Proposed" | "In Progress" | "Completed"
  stakeholders: string[]
  dependencies: string[]
  successMetrics: string[]
  tags: string[]
}

interface Persona {
  id: string
  title: string
  role: string
  department: string
  influence: "High" | "Medium" | "Low"
  journeyStage: string
  painPoints: string[]
  goals: string[]
  successMetrics: string[]
  touchpoints: string[]
  color: string
  icon: any
  videoUrl?: string
  description: string
  storyboards?: Storyboard[]
}

interface Storyboard {
  id: string
  title: string
  description: string
  imageUrl: string
  stage: string
  personas: string[]
}

interface JourneyStage {
  id: string
  name: string
  description: string
  duration: string
  activities: string[]
  personas: string[]
  status: "completed" | "current" | "upcoming"
  outcomes: string[]
}

export default function SolutionCanvas() {
  const [activeView, setActiveView] = useState<"heatmap" | "radar" | "roadmap">("heatmap")
  const [filterDomain, setFilterDomain] = useState("All")
  const [selectedSolution, setSelectedSolution] = useState<MatchResult | null>(null)
  const [showPersonaJourney, setShowPersonaJourney] = useState(false)
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null)
  
  const heatmapRef = useRef<HTMLDivElement>(null)
  const radarRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)

  // Get data from store
  const initiatives = useICStore((state) => state.initiatives)
  const kpis = useICStore((state) => state.kpis)
  const painPoints = useICStore((state) => state.painPoints)

  // Mock data for the graphs
  const mockData = useMemo(() => [
    {
      id: "1",
      title: "Financial Reporting Automation",
      businessDomain: "Finance",
      valueCategory: "High" as const,
      complexityCategory: "Medium" as const,
      horizon: "Now" as const,
      estimatedValue: "$2.5M",
      implementationTime: "6 months",
      priority: "High" as const,
      tags: ["AI", "Automation", "Finance"]
    },
    {
      id: "2",
      title: "Customer Service AI",
      businessDomain: "Operations",
      valueCategory: "High" as const,
      complexityCategory: "Complex" as const,
      horizon: "Next" as const,
      estimatedValue: "$1.8M",
      implementationTime: "9 months",
      priority: "Critical" as const,
      tags: ["AI", "Customer Experience", "Operations"]
    },
    {
      id: "3",
      title: "Data Integration Platform",
      businessDomain: "Technology",
      valueCategory: "Medium" as const,
      complexityCategory: "Medium" as const,
      horizon: "Later" as const,
      estimatedValue: "$3.2M",
      implementationTime: "12 months",
      priority: "Medium" as const,
      tags: ["Data", "Integration", "Platform"]
    }
  ], [])

  // Mock persona data with videos and storyboards
  const personas: Persona[] = useMemo(() => [
    {
      id: "1",
      title: "Chief Financial Officer",
      role: "Strategic Decision Maker",
      department: "Finance",
      influence: "High",
      journeyStage: "Evaluation & Planning",
      painPoints: [
        "Limited visibility into real-time financial performance across business units",
        "Manual reporting processes taking 3-5 days to complete",
        "Difficulty tracking ROI on transformation initiatives"
      ],
      goals: [
        "Achieve 15% improvement in financial reporting accuracy and speed",
        "Reduce manual reporting time by 80%",
        "Implement real-time KPI dashboards"
      ],
      successMetrics: ["Reporting accuracy", "Time to insight", "Cost savings"],
      touchpoints: ["Monthly reviews", "Quarterly planning", "Annual budgeting"],
      color: "from-blue-500 to-blue-700",
      icon: Users,
      videoUrl: "/videos/cfo-transformation-journey.mp4",
      description: "Strategic leader focused on financial transformation and operational efficiency",
      storyboards: [
        {
          id: "1",
          title: "Current State Assessment",
          description: "CFO reviewing manual financial reports and identifying pain points",
          imageUrl: "/images/storyboards/cfo-current-state.jpg",
          stage: "Awareness",
          personas: ["CFO", "Finance Team"]
        },
        {
          id: "2",
          title: "Solution Evaluation",
          description: "CFO evaluating AI-powered financial reporting solutions",
          imageUrl: "/images/storyboards/cfo-solution-eval.jpg",
          stage: "Research",
          personas: ["CFO", "IT Director", "Vendors"]
        }
      ]
    },
    {
      id: "2",
      title: "IT Director",
      role: "Technology Leader",
      department: "Technology",
      influence: "High",
      journeyStage: "Implementation Planning",
      painPoints: [
        "Legacy system integration challenges",
        "Security and compliance requirements",
        "Resource constraints for transformation projects"
      ],
      goals: [
        "Modernize technology infrastructure",
        "Ensure security and compliance",
        "Optimize resource allocation"
      ],
      successMetrics: ["System uptime", "Security score", "Project delivery"],
      touchpoints: ["Technology reviews", "Security audits", "Project planning"],
      color: "from-purple-500 to-purple-700",
      icon: Cpu,
      videoUrl: "/videos/it-director-tech-journey.mp4",
      description: "Technology leader driving digital transformation and infrastructure modernization",
      storyboards: [
        {
          id: "3",
          title: "Technology Assessment",
          description: "IT Director analyzing current infrastructure and identifying modernization needs",
          imageUrl: "/images/storyboards/it-assessment.jpg",
          stage: "Planning",
          personas: ["IT Director", "Architecture Team"]
        }
      ]
    },
    {
      id: "3",
      title: "Operations Manager",
      role: "Process Owner",
      department: "Operations",
      influence: "Medium",
      journeyStage: "Process Optimization",
      painPoints: [
        "Inefficient manual processes",
        "Lack of real-time operational visibility",
        "Difficulty measuring process performance"
      ],
      goals: [
        "Streamline operational processes",
        "Improve real-time visibility",
        "Enhance process performance metrics"
      ],
      successMetrics: ["Process efficiency", "Cycle time", "Cost per transaction"],
      touchpoints: ["Daily operations", "Process reviews", "Performance monitoring"],
      color: "from-orange-500 to-orange-700",
      icon: Target,
      videoUrl: "/videos/operations-manager-process-journey.mp4",
      description: "Operations leader focused on process optimization and efficiency improvement",
      storyboards: [
        {
          id: "4",
          title: "Process Mapping",
          description: "Operations Manager mapping current processes and identifying optimization opportunities",
          imageUrl: "/images/storyboards/ops-process-mapping.jpg",
          stage: "Implementation",
          personas: ["Operations Manager", "Process Team"]
        }
      ]
    }
  ], [])

  // D3.js Heatmap
  useEffect(() => {
    if (!heatmapRef.current || activeView !== "heatmap") return

    const svg = d3.select(heatmapRef.current).select("svg")
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const width = 400 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const svgElement = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create heatmap data
    const data = mockData.map((item, i) => ({
      x: item.businessDomain,
      y: item.priority,
      value: item.valueCategory === "High" ? 3 : item.valueCategory === "Medium" ? 2 : 1,
      item
    }))

    const xScale = d3.scaleBand()
      .domain([...new Set(data.map(d => d.x))])
      .range([0, width])
      .padding(0.1)

    const yScale = d3.scaleBand()
      .domain(["Low", "Medium", "High", "Critical"])
      .range([0, height])
      .padding(0.1)

    const colorScale = d3.scaleSequential()
      .domain([1, 3])
      .interpolator(d3.interpolateReds)

    // Add heatmap cells
    svgElement.selectAll(".heatmap-cell")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "heatmap-cell")
      .attr("x", d => xScale(d.x)!)
      .attr("y", d => yScale(d.y)!)
      .attr("width", xScale.bandwidth())
      .attr("height", yScale.bandwidth())
      .attr("fill", d => colorScale(d.value))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", function(event, d) {
        d3.select(this).attr("stroke-width", 2).attr("stroke", "#000")
        // Show tooltip
        svg.append("text")
          .attr("class", "tooltip")
          .attr("x", event.pageX - 100)
          .attr("y", event.pageY - 10)
          .text(d.item.title)
          .attr("fill", "#000")
          .attr("font-size", "12px")
      })
      .on("mouseout", function() {
        d3.select(this).attr("stroke-width", 1).attr("stroke", "#fff")
        svg.selectAll(".tooltip").remove()
      })

    // Add axes
    svgElement.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))

    svgElement.append("g")
      .call(d3.axisLeft(yScale))

    // Add labels
    svgElement.append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .style("text-anchor", "middle")
      .text("Business Domain")

    svgElement.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Priority Level")

  }, [activeView, mockData])

  // D3.js Radar Chart
  useEffect(() => {
    if (!radarRef.current || activeView !== "radar") return

    const svg = d3.select(radarRef.current).select("svg")
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const width = 400 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom
    const radius = Math.min(width, height) / 2

    const svgElement = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${width/2 + margin.left},${height/2 + margin.top})`)

    // Radar chart data
    const radarData = [
      { axis: "Business Value", value: 0.8 },
      { axis: "Technical Complexity", value: 0.6 },
      { axis: "Implementation Time", value: 0.7 },
      { axis: "Risk Level", value: 0.4 },
      { axis: "Resource Requirements", value: 0.5 }
    ]

    const angleSlice = (Math.PI * 2) / radarData.length

    // Create scales
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 1])

    // Draw the circular grid
    const levels = 5
    for (let level = 1; level <= levels; level++) {
      svgElement.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", (rScale(level / levels)))
        .attr("fill", "none")
        .attr("stroke", "#ddd")
        .attr("stroke-width", 0.5)
    }

    // Draw the axes
    radarData.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2
      const lineCoords = [
        [0, 0],
        [rScale(1) * Math.cos(angle), rScale(1) * Math.sin(angle)]
      ]

      svgElement.append("line")
        .attr("x1", lineCoords[0][0])
        .attr("y1", lineCoords[0][1])
        .attr("x2", lineCoords[1][0])
        .attr("y2", lineCoords[1][1])
        .attr("stroke", "#999")
        .attr("stroke-width", 1)

      // Add axis labels
      svgElement.append("text")
        .attr("x", rScale(1.1) * Math.cos(angle))
        .attr("y", rScale(1.1) * Math.sin(angle))
        .text(d.axis)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
    })

    // Draw the radar line
    const radarLine = d3.line<{x: number, y: number}>()
      .x(d => d.x)
      .y(d => d.y)

    const radarPoints = radarData.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2
      return {
        x: rScale(d.value) * Math.cos(angle),
        y: rScale(d.value) * Math.sin(angle)
      }
    })

    svgElement.append("path")
      .datum(radarPoints)
      .attr("d", radarLine)
      .attr("fill", "rgba(59, 130, 246, 0.2)")
      .attr("stroke", "rgb(59, 130, 246)")
      .attr("stroke-width", 2)

    // Add data points
    svgElement.selectAll(".radar-point")
      .data(radarPoints)
      .enter()
      .append("circle")
      .attr("class", "radar-point")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 3)
      .attr("fill", "rgb(59, 130, 246)")

  }, [activeView])

  // D3.js Roadmap
  useEffect(() => {
    if (!roadmapRef.current || activeView !== "roadmap") return

    const svg = d3.select(roadmapRef.current).select("svg")
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const width = 400 - margin.left - margin.right
    const height = 300 - margin.top - margin.bottom

    const svgElement = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Roadmap data
    const roadmapData = [
      { phase: "Phase 1", start: 0, end: 3, title: "Foundation", items: ["Infrastructure", "Security"] },
      { phase: "Phase 2", start: 3, end: 6, title: "Core Systems", items: ["Data Platform", "APIs"] },
      { phase: "Phase 3", start: 6, end: 9, title: "Advanced Features", items: ["AI/ML", "Analytics"] },
      { phase: "Phase 4", start: 9, end: 12, title: "Optimization", items: ["Performance", "Scale"] }
    ]

    const xScale = d3.scaleLinear()
      .domain([0, 12])
      .range([0, width])

    const yScale = d3.scaleBand()
      .domain(roadmapData.map(d => d.phase))
      .range([0, height])
      .padding(0.3)

    // Draw timeline
    svgElement.append("line")
      .attr("x1", 0)
      .attr("y1", height / 2)
      .attr("x2", width)
      .attr("y2", height / 2)
      .attr("stroke", "#999")
      .attr("stroke-width", 2)

    // Draw phases
    roadmapData.forEach((phase, i) => {
      const x = xScale(phase.start)
      const y = yScale(phase.phase)!
      const phaseWidth = xScale(phase.end) - xScale(phase.start)

      // Phase rectangle
      svgElement.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", phaseWidth)
        .attr("height", yScale.bandwidth())
        .attr("fill", d3.schemeCategory10[i % 10])
        .attr("opacity", 0.7)
        .attr("rx", 5)

      // Phase title
      svgElement.append("text")
        .attr("x", x + phaseWidth / 2)
        .attr("y", y + yScale.bandwidth() / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .text(phase.title)
        .attr("fill", "#fff")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")

      // Phase items
      phase.items.forEach((item, j) => {
        svgElement.append("text")
          .attr("x", x + 5)
          .attr("y", y + 15 + j * 15)
          .text(item)
          .attr("fill", "#333")
          .attr("font-size", "10px")
      })
    })

    // Add x-axis
    svgElement.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `${d} months`))

    // Add y-axis
    svgElement.append("g")
      .call(d3.axisLeft(yScale))

  }, [activeView])

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6" style={{ color: "var(--text)" }}>
              🎯 Solution Canvas
            </h1>
            <p className="text-xl mb-8" style={{ color: "var(--text-muted)" }}>
              Comprehensive transformation planning and solution mapping with stakeholder journey analysis
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Tabs */}
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "heatmap" | "radar" | "roadmap")} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="heatmap" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Priority Heatmap
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center gap-2">
              <Radar className="w-4 h-4" />
              Impact Radar
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Transformation Roadmap
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters and Controls */}
        <div className="premium-card p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5" style={{ color: "var(--text-muted)" }} />
            <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              Filters & Controls
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                Business Domain
              </label>
              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Domains</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                Priority Level
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                Time Horizon
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select horizon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Horizons</SelectItem>
                  <SelectItem value="now">Now (0-6 months)</SelectItem>
                  <SelectItem value="next">Next (6-18 months)</SelectItem>
                  <SelectItem value="later">Later (18+ months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Graph Display */}
        <div className="premium-card p-6 mb-8">
          <div className="flex justify-center">
            {activeView === "heatmap" && (
              <div ref={heatmapRef} className="text-center">
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  🔥 Priority Heatmap
                </h3>
                <svg></svg>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  Shows priority vs. business domain matrix with value intensity
                </p>
              </div>
            )}
            
            {activeView === "radar" && (
              <div ref={radarRef} className="text-center">
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  📊 Impact Radar
                </h3>
                <svg></svg>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  Multi-dimensional impact analysis across key factors
                </p>
              </div>
            )}
            
            {activeView === "roadmap" && (
              <div ref={roadmapRef} className="text-center">
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  🗺️ Transformation Roadmap
                </h3>
                <svg></svg>
                <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                  Timeline and milestone planning for transformation phases
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Solutions Table */}
        <div className="premium-card p-6 mb-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
            Transformation Solutions Overview
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>Initiative</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>Solution</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>AI Solution</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>Complexity</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>Business Value</th>
                  <th className="text-left p-3 font-semibold" style={{ color: "var(--text)" }}>Timeline</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 text-gray-700">
                      <div className="font-medium">{item.title}</div>
                    </td>
                    <td className="p-3 text-gray-700">
                      <div className="font-medium">{item.businessDomain} Transformation</div>
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {item.tags.includes("AI") ? "AI-Powered" : "Digital"}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.complexityCategory === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {item.complexityCategory}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.valueCategory === "Medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {item.valueCategory}
                      </span>
                    </td>
                    <td className="p-3 text-gray-700">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {item.implementationTime}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Persona Journey Section - Collapsible */}
        <div className="premium-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
              👥 Persona Journey Analysis
            </h3>
            <Button
              onClick={() => setShowPersonaJourney(!showPersonaJourney)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {showPersonaJourney ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Persona Journey
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Explore Persona Journey
                </>
              )}
            </Button>
          </div>

          {showPersonaJourney && (
            <div className="space-y-8">
              <p className="text-lg" style={{ color: "var(--text-muted)" }}>
                Understanding stakeholder perspectives and transformation journey stages with interactive videos and storyboards
              </p>

              {/* Persona Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personas.map((persona) => (
                  <Card key={persona.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedPersona(persona)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${persona.color} flex items-center justify-center`}>
                          <persona.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg" style={{ color: "var(--text)" }}>
                            {persona.title}
                          </CardTitle>
                          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {persona.role}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                        {persona.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium" style={{ color: "var(--text)" }}>
                            {persona.journeyStage}
                          </span>
                        </div>
                        
                        {persona.videoUrl && (
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-green-500" />
                            <span className="text-xs text-green-600">Video Available</span>
                          </div>
                        )}
                        
                        {persona.storyboards && persona.storyboards.length > 0 && (
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-purple-500" />
                            <span className="text-xs text-purple-600">{persona.storyboards.length} Storyboards</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Journey Stages */}
              <div className="premium-card p-6">
                <h4 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  Transformation Journey Stages
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { stage: "Awareness", status: "completed", description: "Identified need for digital transformation", icon: Lightbulb },
                    { stage: "Research", status: "completed", description: "Evaluated market solutions and best practices", icon: Target },
                    { stage: "Planning", status: "current", description: "Developing implementation roadmap", icon: Target },
                    { stage: "Implementation", status: "upcoming", description: "Execute transformation initiatives", icon: Zap },
                    { stage: "Optimization", status: "upcoming", description: "Continuous improvement and scaling", icon: TrendingUp }
                  ].map((step, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        step.status === "completed" ? "bg-green-500" :
                        step.status === "current" ? "bg-blue-500" : "bg-gray-300"
                      }`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <h5 className="font-semibold mb-2" style={{ color: "var(--text)" }}>
                        {step.stage}
                      </h5>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Persona Detail Modal */}
      <Dialog open={!!selectedPersona} onOpenChange={() => setSelectedPersona(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPersona && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selectedPersona.color} flex items-center justify-center`}>
                    <selectedPersona.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">{selectedPersona.title}</div>
                    <div className="text-sm font-normal text-gray-600">{selectedPersona.role}</div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Video Section */}
                {selectedPersona.videoUrl && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Video className="w-5 h-5 text-green-500" />
                      Transformation Journey Video
                    </h4>
                    <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-full object-cover"
                        src={selectedPersona.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                )}

                {/* Pain Points & Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Pain Points
                    </h4>
                    <ul className="space-y-2">
                      {selectedPersona.painPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-500" />
                      Goals
                    </h4>
                    <ul className="space-y-2">
                      {selectedPersona.goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Storyboards */}
                {selectedPersona.storyboards && selectedPersona.storyboards.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                      Storyboards
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPersona.storyboards.map((storyboard) => (
                        <div key={storyboard.id} className="border rounded-lg p-4">
                          <div className="aspect-video bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                            <div className="text-center">
                              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Storyboard Image</p>
                            </div>
                          </div>
                          <h5 className="font-semibold mb-2">{storyboard.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">{storyboard.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{storyboard.stage}</Badge>
                            <span className="text-xs text-gray-500">
                              {storyboard.personas.join(", ")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Success Metrics */}
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Success Metrics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPersona.successMetrics.map((metric, index) => (
                      <Badge key={index} variant="secondary">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
