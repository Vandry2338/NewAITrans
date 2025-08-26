"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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
  Play
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

export default function CustomerCanvas() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          🎯 Customer Canvas
        </h1>
        
        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Customer Journey Mapping
          </h2>
          <p className="text-blue-700">
            Visualize and optimize your customer experience across all touchpoints.
          </p>
        </div>
        
        <div className="bg-green-100 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">
            Interactive Canvas
          </h2>
          <p className="text-green-700">
            Drag and drop elements to create comprehensive customer journey maps.
          </p>
        </div>
        
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-red-800 mb-4">
            Analytics & Insights
          </h2>
          <p className="text-red-700">
            Track customer behavior patterns and identify optimization opportunities.
          </p>
        </div>
      </div>
    </div>
  )
}
