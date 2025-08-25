import type { KPI, PainPoint, Initiative, Interview, Coverage } from "./store"

export interface QuestionBank {
  role: string
  sections: {
    strategicObjectives: string[]
    valueDrivers: string[]
    quickWins: string[]
    constraintsRisks: string[]
    expectations: string[]
  }
}

export interface AnalysisResult {
  highlights: {
    strategicObjectives: string[]
    businessPriorities: string[]
    valueDrivers: string[]
    quickWins: string[]
    expectations: string[]
  }
  fragments: Array<{
    id: string
    text: string
    tags: string[]
    mappings: {
      processId?: string
      capabilityId?: string
      kpiId?: string
    }
    weight: number
  }>
}

export interface QuickWin {
  initiative: string
  payback: string
  complexity: "Low" | "Medium" | "High"
  impact: "Low" | "Medium" | "High"
  description: string
}

export interface ReadinessResult {
  percentage: number
  nextBestActions: string[]
  breakdown: {
    interviews: number
    coverage: number
    fragments: number
    traceability: number
  }
}

export class AgentActions {
  static async generateQuestionBank(
    industry: string,
    roleSet: string[],
    kpis: KPI[],
    painPoints: PainPoint[],
  ): Promise<QuestionBank[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const roleQuestions: Record<string, QuestionBank> = {
      CEO: {
        role: "CEO",
        sections: {
          strategicObjectives: [
            "What are your top 3 strategic priorities for the next 18 months?",
            "How do you define success for digital transformation in your organization?",
            "What competitive advantages are you looking to build or maintain?",
            "How does this transformation align with your long-term vision?",
          ],
          valueDrivers: [
            "What are the primary value drivers you expect from this transformation?",
            "How do you prioritize between revenue growth and cost optimization?",
            "What role does innovation play in your value creation strategy?",
            "How do you measure the success of strategic initiatives?",
          ],
          quickWins: [
            "What immediate improvements would have the biggest impact on your business?",
            "Are there any processes that could be automated quickly for immediate ROI?",
            "What low-hanging fruit have you identified in your operations?",
            "Which customer pain points could we address first?",
          ],
          constraintsRisks: [
            "What are your biggest concerns about this transformation?",
            "What constraints do we need to work within (budget, timeline, resources)?",
            "What risks keep you up at night regarding this initiative?",
            "How do you typically manage change resistance in your organization?",
          ],
          expectations: [
            "What does success look like 12 months from now?",
            "How do you prefer to track progress on strategic initiatives?",
            "What level of involvement do you expect in the transformation process?",
            "How should we communicate progress to the board and stakeholders?",
          ],
        },
      },
      CFO: {
        role: "CFO",
        sections: {
          strategicObjectives: [
            "What are your key financial objectives for this transformation?",
            "How does this initiative fit into your capital allocation strategy?",
            "What financial metrics are most important to track?",
            "How do you balance growth investments with profitability?",
          ],
          valueDrivers: [
            "What ROI expectations do you have for this transformation?",
            "How do you prioritize cost reduction vs. revenue generation opportunities?",
            "What financial efficiencies are you looking to achieve?",
            "How do you measure the financial impact of operational improvements?",
          ],
          quickWins: [
            "What financial processes could be automated for immediate savings?",
            "Are there reporting inefficiencies we could address quickly?",
            "What cost centers have the highest optimization potential?",
            "Which financial controls could be strengthened with technology?",
          ],
          constraintsRisks: [
            "What is the approved budget range for this initiative?",
            "What financial risks are you most concerned about?",
            "How do you typically evaluate and approve technology investments?",
            "What compliance requirements must we consider?",
          ],
          expectations: [
            "What financial reporting do you need throughout the project?",
            "How should we track and communicate ROI progress?",
            "What approval processes should we follow for budget changes?",
            "How do you prefer to structure payment milestones?",
          ],
        },
      },
      COO: {
        role: "COO",
        sections: {
          strategicObjectives: [
            "What operational excellence goals are driving this transformation?",
            "How do you envision operations changing in the next 2-3 years?",
            "What operational capabilities do you need to build or enhance?",
            "How does this align with your operational strategy?",
          ],
          valueDrivers: [
            "What operational efficiencies are you targeting?",
            "How do you balance quality, speed, and cost in operations?",
            "What role does automation play in your operational vision?",
            "How do you measure operational performance and success?",
          ],
          quickWins: [
            "What operational bottlenecks could we address immediately?",
            "Are there manual processes ripe for automation?",
            "What operational data visibility gaps exist today?",
            "Which operational workflows cause the most friction?",
          ],
          constraintsRisks: [
            "What operational disruptions are you most concerned about?",
            "How do we ensure business continuity during the transformation?",
            "What resource constraints do we need to work within?",
            "How do you typically manage operational change?",
          ],
          expectations: [
            "What operational metrics should we track during implementation?",
            "How do you prefer to manage operational changes?",
            "What level of operational disruption is acceptable?",
            "How should we communicate changes to operational teams?",
          ],
        },
      },
    }

    // Return questions for requested roles, with industry-specific customization
    return roleSet.map((role) => {
      const baseQuestions = roleQuestions[role] || roleQuestions.CEO

      // Add industry-specific context to questions
      const industryContext =
        industry === "Financial Services"
          ? " in the financial services context"
          : industry === "Healthcare"
            ? " considering healthcare regulations"
            : industry === "Manufacturing"
              ? " for manufacturing operations"
              : ""

      return {
        ...baseQuestions,
        sections: {
          ...baseQuestions.sections,
          strategicObjectives: baseQuestions.sections.strategicObjectives.map((q) => q + industryContext),
        },
      }
    })
  }

  static async transcribeAndTag(audioOrTranscript: string | File, industry: string): Promise<AnalysisResult> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis based on transcript content
    const transcript = typeof audioOrTranscript === "string" ? audioOrTranscript : "Mock transcript from audio file"

    // Extract key themes and generate fragments
    const mockResult: AnalysisResult = {
      highlights: {
        strategicObjectives: [
          "Accelerate digital transformation initiatives",
          "Improve customer experience across all touchpoints",
          "Expand market presence in emerging segments",
        ],
        businessPriorities: [
          "Operational efficiency improvements",
          "Data-driven decision making",
          "Technology modernization",
        ],
        valueDrivers: [
          "Revenue growth through innovation",
          "Cost optimization via automation",
          "Risk mitigation through better controls",
        ],
        quickWins: ["Process automation in finance", "Customer portal enhancements", "Real-time reporting dashboard"],
        expectations: [
          "Measurable ROI within 6 months",
          "Minimal business disruption",
          "Clear communication throughout",
        ],
      },
      fragments: [
        {
          id: Date.now().toString(),
          text: "We need to accelerate our digital transformation to stay competitive",
          tags: ["Vision", "Priority", "Digital"],
          mappings: {},
          weight: 0.9,
        },
        {
          id: (Date.now() + 1).toString(),
          text: "Customer experience is our top priority for the next 18 months",
          tags: ["Priority", "Capability", "Customer"],
          mappings: {},
          weight: 0.8,
        },
        {
          id: (Date.now() + 2).toString(),
          text: "ROI must be measurable and achieved within 6 months",
          tags: ["Constraint", "KPI", "Timeline"],
          mappings: {},
          weight: 0.7,
        },
      ],
    }

    return mockResult
  }

  static async extractFragments(texts: string[]): Promise<
    Array<{
      id: string
      text: string
      tags: string[]
      mappings: { processId?: string; capabilityId?: string; kpiId?: string }
      weight: number
    }>
  > {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Process and normalize fragments
    const fragments = texts.map((text, index) => ({
      id: (Date.now() + index).toString(),
      text: text.trim(),
      tags: this.extractTags(text),
      mappings: {},
      weight: this.calculateWeight(text),
    }))

    // Deduplicate similar fragments
    return this.deduplicateFragments(fragments)
  }

  static async buildStrategyMap(
    fragments: Array<{ text: string; tags: string[]; weight: number }>,
    kpis: KPI[],
    painPoints: PainPoint[],
  ): Promise<{
    themes: Array<{ name: string; fragments: string[]; weight: number }>
    mappings: Array<{ fragment: string; kpi?: string; painPoint?: string }>
    priorities: Array<{ item: string; score: number; rationale: string }>
  }> {
    // Simulate strategy map generation
    await new Promise((resolve) => setTimeout(resolve, 2500))

    return {
      themes: [
        {
          name: "Digital Transformation",
          fragments: fragments.filter((f) => f.tags.includes("Digital")).map((f) => f.text),
          weight: 0.9,
        },
        {
          name: "Customer Experience",
          fragments: fragments.filter((f) => f.tags.includes("Customer")).map((f) => f.text),
          weight: 0.8,
        },
        {
          name: "Operational Excellence",
          fragments: fragments.filter((f) => f.tags.includes("Process")).map((f) => f.text),
          weight: 0.7,
        },
      ],
      mappings: fragments.map((f) => ({
        fragment: f.text,
        kpi: kpis.find((k) => f.tags.some((tag) => k.name.toLowerCase().includes(tag.toLowerCase())))?.name,
        painPoint: painPoints.find((p) => f.tags.some((tag) => p.title.toLowerCase().includes(tag.toLowerCase())))
          ?.title,
      })),
      priorities: [
        { item: "Customer Experience Platform", score: 95, rationale: "High executive alignment and clear ROI" },
        { item: "Process Automation Suite", score: 88, rationale: "Quick wins with measurable impact" },
        { item: "Data Analytics Infrastructure", score: 82, rationale: "Foundation for data-driven decisions" },
      ],
    }
  }

  static async computeReadiness(state: {
    interviews: Interview[]
    coverage: Coverage
    kpis: KPI[]
    painPoints: PainPoint[]
    initiatives: Initiative[]
  }): Promise<ReadinessResult> {
    // Simulate readiness calculation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const interviewScore = Math.min(100, (state.interviews.length / state.coverage.target) * 100)
    const coverageScore = Math.min(100, (state.coverage.unitsCovered.length / 5) * 100)
    const fragmentScore = Math.min(100, (state.interviews.reduce((sum, i) => sum + i.fragments.length, 0) / 75) * 100)
    const traceabilityScore =
      state.interviews.length > 0
        ? Math.min(
            100,
            (state.interviews.filter((i) => i.fragments.some((f) => Object.keys(f.mappings).length > 0)).length /
              state.interviews.length) *
              100,
          )
        : 0

    const overallReadiness = Math.round(
      interviewScore * 0.3 + coverageScore * 0.25 + fragmentScore * 0.25 + traceabilityScore * 0.2,
    )

    const nextActions = []
    if (interviewScore < 80) nextActions.push("Conduct more executive interviews")
    if (coverageScore < 80) nextActions.push("Expand coverage across business units")
    if (fragmentScore < 80) nextActions.push("Extract more strategic fragments")
    if (traceabilityScore < 80) nextActions.push("Map fragments to KPIs and processes")

    return {
      percentage: overallReadiness,
      nextBestActions: nextActions,
      breakdown: {
        interviews: Math.round(interviewScore),
        coverage: Math.round(coverageScore),
        fragments: Math.round(fragmentScore),
        traceability: Math.round(traceabilityScore),
      },
    }
  }

  static async suggestQuickWins(
    fragments: Array<{ text: string; tags: string[]; weight: number }>,
    benchmarks?: any[],
  ): Promise<QuickWin[]> {
    // Simulate quick wins analysis
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const quickWins: QuickWin[] = [
      {
        initiative: "Process Automation Dashboard",
        payback: "3-6 months",
        complexity: "Low",
        impact: "High",
        description: "Automate manual reporting and data entry processes",
      },
      {
        initiative: "Customer Data Integration",
        payback: "6-12 months",
        complexity: "Medium",
        impact: "High",
        description: "Unify customer data across systems for 360-degree view",
      },
      {
        initiative: "Real-time Analytics Platform",
        payback: "12-18 months",
        complexity: "High",
        impact: "Medium",
        description: "Enable real-time decision making with live dashboards",
      },
      {
        initiative: "Mobile Employee Portal",
        payback: "2-4 months",
        complexity: "Low",
        impact: "Medium",
        description: "Improve employee productivity with mobile access",
      },
      {
        initiative: "AI-Powered Customer Support",
        payback: "8-15 months",
        complexity: "High",
        impact: "High",
        description: "Reduce support costs while improving response times",
      },
    ]

    // Filter and rank based on fragments
    return quickWins
      .sort((a, b) => {
        const aRelevance = fragments.filter((f) =>
          f.text.toLowerCase().includes(a.initiative.toLowerCase().split(" ")[0]),
        ).length
        const bRelevance = fragments.filter((f) =>
          f.text.toLowerCase().includes(b.initiative.toLowerCase().split(" ")[0]),
        ).length
        return bRelevance - aRelevance
      })
      .slice(0, 5)
  }

  // Helper methods
  private static extractTags(text: string): string[] {
    const tagMap: Record<string, string[]> = {
      digital: ["Digital", "Technology"],
      customer: ["Customer", "Experience"],
      process: ["Process", "Operations"],
      data: ["Data", "Analytics"],
      roi: ["KPI", "Financial"],
      risk: ["Risk", "Constraint"],
      vision: ["Vision", "Strategy"],
      priority: ["Priority", "Important"],
    }

    const tags: string[] = []
    const lowerText = text.toLowerCase()

    Object.entries(tagMap).forEach(([keyword, associatedTags]) => {
      if (lowerText.includes(keyword)) {
        tags.push(...associatedTags)
      }
    })

    return [...new Set(tags)] // Remove duplicates
  }

  private static calculateWeight(text: string): number {
    // Simple weight calculation based on text characteristics
    let weight = 0.5

    // Increase weight for strategic keywords
    const strategicKeywords = ["vision", "strategy", "priority", "critical", "essential", "must"]
    strategicKeywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) weight += 0.1
    })

    // Increase weight for urgency indicators
    const urgencyKeywords = ["immediately", "asap", "urgent", "now", "quickly"]
    urgencyKeywords.forEach((keyword) => {
      if (text.toLowerCase().includes(keyword)) weight += 0.05
    })

    // Increase weight for quantifiable statements
    if (/\d+/.test(text)) weight += 0.1

    return Math.min(1.0, Math.max(0.1, weight))
  }

  private static deduplicateFragments(
    fragments: Array<{
      id: string
      text: string
      tags: string[]
      mappings: { processId?: string; capabilityId?: string; kpiId?: string }
      weight: number
    }>,
  ): Array<{
    id: string
    text: string
    tags: string[]
    mappings: { processId?: string; capabilityId?: string; kpiId?: string }
    weight: number
  }> {
    const unique: typeof fragments = []

    fragments.forEach((fragment) => {
      const isDuplicate = unique.some((existing) => {
        const similarity = this.calculateSimilarity(fragment.text, existing.text)
        return similarity > 0.8
      })

      if (!isDuplicate) {
        unique.push(fragment)
      }
    })

    return unique
  }

  private static calculateSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/)
    const words2 = text2.toLowerCase().split(/\s+/)

    const intersection = words1.filter((word) => words2.includes(word))
    const union = [...new Set([...words1, ...words2])]

    return intersection.length / union.length
  }
}
