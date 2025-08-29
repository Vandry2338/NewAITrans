import React, { useState, useMemo } from 'react'
import { useGalleryStore } from '@/lib/store/gallery'
import { sapIndustries } from '@/app/data/industries'
import { sapValueChains } from '@/app/data/valueChains'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, 
  Grid3X3, 
  List, 
  Info, 
  Bookmark, 
  X, 
  ChevronRight, 
  ChevronDown,
  Search,
  Target,
  Brain,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

// Constants
const PREMIUM_PINK = '#ec4899'
const PREMIUM_PINK_DARK = '#be185d'

// Hard-coded use cases data
const useCases = [
  {
    id: 1,
    title: "Intelligent Invoice Processing",
    summary: "AI-powered invoice capture, validation, and approval workflow using SAP BTP and Generative AI",
    industries: ["Retail", "Manufacturing", "Professional Services"],
    e2eProcesses: ["Source to Pay", "Finance"],
    businessFunctions: ["Finance", "Procurement"],
    productCategories: ["SAP S/4HANA", "SAP BTP"],
    aiTypes: ["Generative AI", "Machine Learning"],
    embeddedInSAP: true,
    outcomes: ["Reduce Cost", "Accelerate Flow"],
    roles: ["CFO", "Procurement"],
    businessValue: "High",
    effort: "Medium",
    kpis: ["Processing Time", "Error Rate"],
    personas: ["Accounts Payable", "Procurement Manager"],
    sourceUrl: "https://help.sap.com",
    lastUpdated: "2025-01-15"
  },
  {
    id: 2,
    title: "Predictive Maintenance",
    summary: "ML-based equipment failure prediction and maintenance scheduling for manufacturing operations",
    industries: ["Industrial Manufacturing", "Oil and Gas", "Utilities"],
    e2eProcesses: ["Acquire to Decommission", "Plan to Fulfill"],
    businessFunctions: ["Operations", "Maintenance"],
    productCategories: ["SAP S/4HANA", "SAP BTP"],
    aiTypes: ["Machine Learning"],
    embeddedInSAP: true,
    outcomes: ["Reduce Cost", "Reduce Risk/Compliance"],
    roles: ["COO", "Operations"],
    businessValue: "High",
    effort: "High",
    kpis: ["Uptime", "Maintenance Cost"],
    personas: ["Maintenance Manager", "Operations Director"],
    sourceUrl: "https://help.sap.com",
    lastUpdated: "2025-01-10"
  },
  {
    id: 3,
    title: "Customer Churn Prediction",
    summary: "AI-driven customer behavior analysis and churn risk assessment for subscription businesses",
    industries: ["Telecommunications", "Media", "Retail"],
    e2eProcesses: ["Lead to Cash", "Inquiry to Resolution"],
    businessFunctions: ["Sales", "Marketing"],
    productCategories: ["SAP S/4HANA", "SAP BTP"],
    aiTypes: ["Machine Learning"],
    embeddedInSAP: false,
    outcomes: ["Grow Revenue", "Delight Customers"],
    roles: ["Sales", "Marketing"],
    businessValue: "High",
    effort: "Medium",
    kpis: ["Customer Retention", "Revenue Growth"],
    personas: ["Sales Manager", "Marketing Director"],
    sourceUrl: "https://help.sap.com",
    lastUpdated: "2025-01-12"
  },
  {
    id: 4,
    title: "Joule-Powered Contract Analysis",
    summary: "Generative AI contract review and risk assessment using SAP Joule and document intelligence",
    industries: ["Professional Services", "Legal", "Insurance"],
    e2eProcesses: ["Source to Pay", "Finance"],
    businessFunctions: ["Legal", "Procurement"],
    productCategories: ["SAP Joule", "SAP BTP"],
    aiTypes: ["Joule", "Generative AI"],
    embeddedInSAP: true,
    outcomes: ["Reduce Risk/Compliance", "Accelerate Flow"],
    roles: ["Legal", "Procurement"],
    businessValue: "Medium",
    effort: "Low",
    kpis: ["Review Time", "Risk Detection"],
    personas: ["Legal Counsel", "Contract Manager"],
    sourceUrl: "https://help.sap.com",
    lastUpdated: "2025-01-08"
  },
  {
    id: 5,
    title: "Supply Chain Optimization",
    summary: "AI-powered demand forecasting and inventory optimization for complex supply networks",
    industries: ["Retail", "Consumer Products", "Wholesale Distribution"],
    e2eProcesses: ["Plan to Fulfill", "Source to Pay"],
    businessFunctions: ["Supply Chain", "Operations"],
    productCategories: ["SAP S/4HANA", "SAP BTP"],
    aiTypes: ["Machine Learning"],
    embeddedInSAP: true,
    outcomes: ["Reduce Cost", "Accelerate Flow"],
    roles: ["Supply Chain", "Operations"],
    businessValue: "High",
    effort: "High",
    kpis: ["Inventory Turnover", "Order Fulfillment"],
    personas: ["Supply Chain Manager", "Operations Director"],
    sourceUrl: "https://help.sap.com",
    lastUpdated: "2025-01-05"
  }
]

// Data arrays
const industries = ["All", ...sapIndustries.map(ind => ind.name)]
const outcomes = ["All", "Reduce Cost", "Grow Revenue", "Reduce Risk/Compliance", "Delight Customers", "Accelerate Flow"]
const roles = ["All", "CFO", "COO", "Supply Chain", "Sales", "Procurement", "HR", "IT"]
const modes = ["All", "Embedded in SAP", "Joule", "Generative AI", "Machine Learning"]
const e2eProcesses = ["All", ...sapValueChains.map(chain => chain.name)]
const businessFunctions = ["All", "Finance", "Operations", "Sales", "Marketing", "Supply Chain", "Legal", "HR", "IT"]
const productCategories = ["All", "SAP S/4HANA", "SAP BTP", "SAP SuccessFactors", "SAP Ariba", "SAP Fieldglass"]

interface SapAiSolutionExplorerProps {
  title?: string;
  subtitle?: string;
  focusArea?: "business" | "agents" | "all" | "gen-ai" | "business-ai" | "genai";
}

export default function SapAiSolutionExplorer({ 
  title = "SAP AI Use Cases",
  subtitle = "Discover enterprise AI solutions and use cases powered by SAP's artificial intelligence capabilities.",
  focusArea = "all"
}: SapAiSolutionExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedOutcome, setSelectedOutcome] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedMode, setSelectedMode] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedE2E, setSelectedE2E] = useState<string>("all");
  const [selectedBusinessFunction, setSelectedBusinessFunction] = useState<string>("all");
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>("all");

  // Filter use cases based on all selected criteria
  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase: any) => {
      const matchesSearch = !searchTerm || 
        useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        useCase.overview.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesIndustry = selectedIndustry === "all" || 
        useCase.industries.some((ind: string) => ind.toLowerCase().includes(selectedIndustry.toLowerCase()));
      
      const matchesOutcome = selectedOutcome === "all" || 
        useCase.outcomes.some((outcome: string) => 
          outcome.toLowerCase().includes(selectedOutcome.toLowerCase().replace(" ", ""))
        );
      
      const matchesRole = selectedRole === "all" || 
        useCase.roles.some((role: string) => role.toLowerCase().includes(selectedRole.toLowerCase()));
      
      const matchesMode = selectedMode === "all" || 
        (selectedMode === "Embedded in SAP" && useCase.embeddedInSAP) ||
        (selectedMode === "Joule" && useCase.aiTypes.some((type: string) => type.includes("Joule"))) ||
        (selectedMode === "Generative AI" && useCase.aiTypes.some((type: string) => type.includes("Generative AI"))) ||
        (selectedMode === "Machine Learning" && useCase.aiTypes.some((type: string) => type.includes("Machine Learning")));
      
      const matchesE2E = selectedE2E === "all" || 
        useCase.e2eProcesses.some((process: string) => process.toLowerCase().includes(selectedE2E.toLowerCase()));
      
      const matchesBusinessFunction = selectedBusinessFunction === "all" || 
        useCase.businessFunctions.some((func: string) => func.toLowerCase().includes(selectedBusinessFunction.toLowerCase()));
      
      const matchesProductCategory = selectedProductCategory === "all" || 
        useCase.productCategories.some((category: string) => category.toLowerCase().includes(selectedProductCategory.toLowerCase()));

      return matchesSearch && matchesIndustry && matchesOutcome && matchesRole && 
             matchesMode && matchesE2E && matchesBusinessFunction && matchesProductCategory;
    });
  }, [searchTerm, selectedIndustry, selectedOutcome, selectedRole, selectedMode, 
      selectedE2E, selectedBusinessFunction, selectedProductCategory]);

  // Sort use cases
  const sortedUseCases = useMemo(() => {
    const sorted = [...filteredUseCases];
    switch (sortBy) {
      case "businessValue":
        return sorted.sort((a, b) => {
          const aValue = a.businessValue.length;
          const bValue = b.businessValue.length;
          return bValue - aValue;
        });
      case "timeToValue":
        return sorted.sort((a, b) => {
          const aDate = new Date(a.lastUpdated);
          const bDate = new Date(b.lastUpdated);
          return bDate.getTime() - aDate.getTime();
        });
      case "newest":
        return sorted.sort((a, b) => {
          const aDate = new Date(a.lastUpdated);
          const bDate = new Date(b.lastUpdated);
          return bDate.getTime() - aDate.getTime();
        });
      default: // relevance
        return sorted;
    }
  }, [filteredUseCases, sortBy]);

  // Starter collections
  const quickWins = sortedUseCases.slice(0, 4);
  const financeFavorites = sortedUseCases.filter(uc => uc.businessFunctions.includes("Finance")).slice(0, 4);
  const supplyChainInsights = sortedUseCases.filter(uc => 
    uc.businessFunctions.includes("Supply Chain") || uc.e2eProcesses.some(process => process.includes("Supply Chain"))
  ).slice(0, 4);

  const resetFilters = () => {
    setSelectedIndustry("all");
    setSelectedOutcome("all");
    setSelectedRole("all");
    setSelectedMode("all");
    setSelectedE2E("all");
    setSelectedBusinessFunction("all");
    setSelectedProductCategory("all");
    setSearchTerm("");
  };

  const isFilterActive = selectedIndustry !== "all" || selectedOutcome !== "all" || 
                        selectedRole !== "all" || selectedMode !== "all" || 
                        selectedE2E !== "all" || selectedBusinessFunction !== "all" || 
                        selectedProductCategory !== "all" || searchTerm !== "";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 
                  className="text-4xl font-bold tracking-tight mb-2"
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  {title}
                </h1>
                <p className="text-lg" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {subtitle}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {sortedUseCases.length} results
                </span>
                {isFilterActive && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    style={{ fontFamily: "var(--font-sap-72)" }}
                  >
                    Reset filters
                  </Button>
                )}
              </div>
            </div>

            {/* On-Ramp Chips */}
            <div className="space-y-6">
              {/* Mode Toggles */}
              <div className="flex justify-center">
                <div className="flex flex-wrap gap-3 justify-center">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setSelectedMode(mode === "All" ? "all" : mode)}
                      className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        selectedMode === (mode === "All" ? "all" : mode)
                          ? 'text-white shadow-lg'
                          : 'text-gray-700 hover:text-gray-900 hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: selectedMode === (mode === "All" ? "all" : mode) 
                          ? PREMIUM_PINK 
                          : 'var(--surface)',
                        fontFamily: "var(--font-sap-72)"
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Outcome Toggles */}
              <div className="flex justify-center">
                <div className="flex flex-wrap gap-3 justify-center">
                  {outcomes.map((outcome) => (
                    <button
                      key={outcome}
                      onClick={() => setSelectedOutcome(outcome === "All" ? "all" : outcome)}
                      className={`px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        selectedOutcome === (outcome === "All" ? "all" : outcome)
                          ? 'text-white shadow-lg'
                          : 'text-gray-700 hover:text-gray-900 hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: selectedOutcome === (outcome === "All" ? "all" : outcome) 
                          ? PREMIUM_PINK 
                          : 'var(--surface)',
                        fontFamily: "var(--font-sap-72)"
                      }}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Role Chips */}
            <div>
              <h3 className="text-sm font-medium mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                Role
              </h3>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role === "All" ? "all" : role)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedOutcome === (role === "All" ? "all" : role)
                        ? 'text-white'
                        : 'text-gray-700 hover:text-gray-900'
                    }`}
                    style={{
                      backgroundColor: selectedRole === (role === "All" ? "all" : role) 
                        ? PREMIUM_PINK 
                        : 'var(--surface)',
                      fontFamily: "var(--font-sap-72)"
                    }}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Starter Collections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
            Starter Collections
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Wins */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Quick Wins (≤4 weeks)
              </h3>
              <div className="space-y-3">
                {quickWins.map((useCase) => (
                  <Card 
                    key={useCase.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    onClick={() => setSelectedUseCase(useCase)}
                  >
                    <div className="w-full h-1" style={{ backgroundColor: PREMIUM_PINK }}></div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.title}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                          High Value
                        </span>
                        <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          Low Effort
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Finance Favorites */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Finance Favorites
              </h3>
              <div className="space-y-3">
                {financeFavorites.map((useCase) => (
                  <Card 
                    key={useCase.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    onClick={() => setSelectedUseCase(useCase)}
                  >
                    <div className="w-full h-1" style={{ backgroundColor: PREMIUM_PINK }}></div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.title}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                          High Value
                        </span>
                        <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          Medium Effort
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Supply Chain Insights */}
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                Supply Chain Insights
              </h3>
              <div className="space-y-3">
                {supplyChainInsights.map((useCase) => (
                  <Card 
                    key={useCase.id} 
                    className="cursor-pointer hover:shadow-md transition-all duration-200"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    onClick={() => setSelectedUseCase(useCase)}
                  >
                    <div className="w-full h-1" style={{ backgroundColor: PREMIUM_PINK }}></div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.title}
                      </h4>
                      <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.summary}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                          High Value
                        </span>
                        <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          High Effort
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-8">
          {/* Left Rail - Progressive Filters */}
          <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--text-muted)" }} />
                  <Input
                    placeholder="Search use cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}
                  />
                </div>
              </div>

              {/* Filter Sections */}
              <div className="space-y-6">
                {/* Role Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    Role
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {roles.slice(1).map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedRole === role}
                          onChange={() => setSelectedRole(selectedRole === role ? "all" : role)}
                          className="rounded"
                        />
                        <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {role}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Industry Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    Industry
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {sapIndustries.slice(0, 10).map((industry) => (
                      <label key={industry.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedIndustry === industry.name}
                          onChange={() => setSelectedIndustry(selectedIndustry === industry.name ? "all" : industry.name)}
                          className="rounded"
                        />
                        <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {industry.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* E2E Process Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    E2E Process
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {sapValueChains.map((process) => (
                      <label key={process.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedE2E === process.name}
                          onChange={() => setSelectedE2E(selectedE2E === process.name ? "all" : process.name)}
                          className="rounded"
                        />
                        <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {process.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Business Function Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    Business Function
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {businessFunctions.slice(1).map((func) => (
                      <label key={func} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBusinessFunction === func}
                          onChange={() => setSelectedBusinessFunction(selectedBusinessFunction === func ? "all" : func)}
                          className="rounded"
                        />
                        <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {func}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Product Category Filter */}
                <div>
                  <h4 className="text-sm font-medium mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    Product Category
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {productCategories.slice(1).map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedProductCategory === category}
                          onChange={() => setSelectedProductCategory(selectedProductCategory === category ? "all" : category)}
                          className="rounded"
                        />
                        <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  <Grid3X3 className="w-4 h-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  style={{ fontFamily: "var(--font-sap-72)" }}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}
                >
                  <option value="relevance">Relevance</option>
                  <option value="businessValue">Business Value</option>
                  <option value="timeToValue">Time to Value</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setShowFilters(true)}
                className="w-full"
                style={{ fontFamily: "var(--font-sap-72)" }}
              >
                <Filter className="w-4 h-4 mr-2" />
                Show Filters
              </Button>
            </div>

            {/* Results Grid */}
            {sortedUseCases.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "space-y-4"}>
                {sortedUseCases.map((useCase) => (
                  <Card 
                    key={useCase.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    onClick={() => setSelectedUseCase(useCase)}
                  >
                    {/* Premium Pink top bar */}
                    <div className="w-full h-1" style={{ backgroundColor: PREMIUM_PINK }}></div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge 
                          className="text-xs" 
                          style={{ 
                            backgroundColor: "rgba(236, 72, 153, 0.1)", 
                            color: PREMIUM_PINK,
                            fontFamily: "var(--font-sap-72)"
                          }}
                        >
                          {useCase.businessFunctions.join(", ")}
                        </Badge>
                        <Badge 
                          className="text-xs" 
                          style={{ 
                            backgroundColor: "var(--surface)", 
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-sap-72)"
                          }}
                        >
                          {useCase.productCategories.join(", ")}
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-lg mb-3 line-clamp-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.title}
                      </h3>
                      
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.summary}
                      </p>
                      
                      {/* Badges Row */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {useCase.aiTypes.slice(0, 3).map((tag, index) => (
                          <Badge 
                            key={index} 
                            variant="outline" 
                            className="text-xs"
                            style={{ borderColor: "var(--border)", fontFamily: "var(--font-sap-72)" }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      {/* AI Type Chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {useCase.aiTypes.some(type => type.includes("Machine Learning")) && (
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: "rgba(236, 72, 153, 0.1)", 
                              color: PREMIUM_PINK,
                              fontFamily: "var(--font-sap-72)"
                            }}
                          >
                            ML
                          </Badge>
                        )}
                        {useCase.aiTypes.some(type => type.includes("Generative AI")) && (
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: "rgba(236, 72, 153, 0.1)", 
                              color: PREMIUM_PINK,
                              fontFamily: "var(--font-sap-72)"
                            }}
                          >
                            GenAI
                          </Badge>
                        )}
                        {useCase.embeddedInSAP && (
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: "rgba(236, 72, 153, 0.1)", 
                              color: PREMIUM_PINK,
                              fontFamily: "var(--font-sap-72)"
                            }}
                          >
                            Embedded
                          </Badge>
                        )}
                      </div>
                      
                      {/* Payoff vs Effort */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <span style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                          High Value
                        </span>
                        <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                          Medium Effort
                        </span>
                      </div>
                      
                      {/* Footer Actions */}
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                        <Button 
                          size="sm"
                          style={{ 
                            backgroundColor: PREMIUM_PINK,
                            fontFamily: "var(--font-sap-72)"
                          }}
                          className="hover:bg-pink-600"
                        >
                          View Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)" }} />
                <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  No use cases found
                </h3>
                <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  onClick={resetFilters}
                  className="mt-4"
                  style={{ 
                    backgroundColor: PREMIUM_PINK,
                    fontFamily: "var(--font-sap-72)"
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Use Case Detail Modal */}
      {selectedUseCase && (
        <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--bg)" }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: PREMIUM_PINK }}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                    {selectedUseCase.title}
                  </h2>
                  <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                    {selectedUseCase.productCategories.join(", ")}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* What it does */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  What it does
                </h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                  {selectedUseCase.overview}
                </p>
              </div>

              {/* How it helps */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  How it helps
                </h3>
                <div className="space-y-2">
                  {selectedUseCase.outcomes.map((benefit: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5" style={{ color: PREMIUM_PINK }} />
                      <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where it runs */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Where it runs
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    className="text-sm"
                    style={{ 
                      backgroundColor: "rgba(236, 72, 153, 0.1)", 
                      color: PREMIUM_PINK,
                      fontFamily: "var(--font-sap-72)"
                    }}
                  >
                    {selectedUseCase.productCategories.join(", ")}
                  </Badge>
                  <Badge 
                    className="text-sm"
                    style={{ 
                      backgroundColor: "rgba(236, 72, 153, 0.1)", 
                      color: PREMIUM_PINK,
                      fontFamily: "var(--font-sap-72)"
                    }}
                  >
                    {selectedUseCase.aiTypes.join(", ")}
                  </Badge>
                </div>
              </div>

              {/* Implementation Details */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Implementation Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    <div className="text-2xl font-bold mb-2" style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                      4-6 weeks
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      Time to Value
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    <div className="text-2xl font-bold mb-2" style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                      Medium
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      Complexity
                    </div>
                  </div>
                  <div className="text-center p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    <div className="text-2xl font-bold mb-2" style={{ color: PREMIUM_PINK, fontFamily: "var(--font-sap-72)" }}>
                      SAP S/4HANA
                    </div>
                    <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      Prerequisites
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                  Actions
                </h3>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    style={{ 
                      backgroundColor: PREMIUM_PINK,
                      fontFamily: "var(--font-sap-72)"
                    }}
                    className="hover:bg-pink-600"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open SAP Source
                  </Button>
                  <Button variant="outline" style={{ fontFamily: "var(--font-sap-72)" }}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                  <Button variant="outline" style={{ fontFamily: "var(--font-sap-72)" }}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
