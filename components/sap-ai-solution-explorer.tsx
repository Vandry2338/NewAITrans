import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  TrendingUp, 
  Building, 
  Target, 
  Award, 
  ExternalLink, 
  Play, 
  Calendar, 
  CheckCircle,
  Brain,
  Zap,
  Cpu,
  BarChart3,
  Users,
  Shield,
  Globe
} from "lucide-react";
import { sapAiUseCases, type SapAiUseCase } from "@/lib/data/sap-ai-use-cases-comprehensive";

interface SapAiSolutionExplorerProps {
  title?: string;
  subtitle?: string;
  focusArea?: "business" | "agents" | "all" | "gen-ai" | "business-ai" | "genai";
}

export default function SapAiSolutionExplorer({ 
  title = "SAP AI Solution Explorer",
  subtitle = "Discover enterprise AI solutions and use cases powered by SAP's artificial intelligence capabilities.",
  focusArea = "all"
}: SapAiSolutionExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<SapAiUseCase | null>(null);
  const [activeToggle, setActiveToggle] = useState<"gen-ai" | "business-ai" | "genai">("gen-ai");

  // Filter use cases based on focus area and active toggle
  const filteredByFocus = sapAiUseCases.filter((useCase: SapAiUseCase) => {
    if (focusArea === "business" || focusArea === "business-ai") {
      return ["Finance", "Operations", "Sales", "Marketing", "HR", "Supply Chain"].includes(useCase.category);
    }
    if (focusArea === "agents" || focusArea === "gen-ai") {
      return ["Customer Service", "Automation", "Analytics", "Processing", "AI Agents", "Generative AI"].includes(useCase.category);
    }
    if (focusArea === "genai") {
      return ["AI Agents", "Generative AI", "Machine Learning", "Natural Language Processing"].includes(useCase.category);
    }
    return true; // "all" shows everything
  });

  // Additional filtering based on active toggle
  const getToggleFilteredUseCases = () => {
    switch (activeToggle) {
      case "gen-ai":
        return filteredByFocus.filter(uc => 
          ["Customer Service", "Automation", "Analytics", "Processing", "AI Agents", "Generative AI"].includes(uc.category)
        );
      case "business-ai":
        return filteredByFocus.filter(uc => 
          ["Finance", "Operations", "Sales", "Marketing", "HR", "Supply Chain"].includes(uc.category)
        );
      case "genai":
        return filteredByFocus.filter(uc => 
          ["AI Agents", "Generative AI", "Machine Learning", "Natural Language Processing", "Computer Vision"].includes(uc.category)
        );
      default:
        return filteredByFocus;
    }
  };

  const toggleFilteredUseCases = getToggleFilteredUseCases();

  const filteredUseCases = toggleFilteredUseCases.filter((useCase: SapAiUseCase) => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.overview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || useCase.category === selectedCategory;
    const matchesVendor = selectedVendor === "all" || useCase.vendor === selectedVendor;
    const matchesTechnology = selectedTechnology === "all" || 
      useCase.technicalSpecs.technology.toLowerCase().includes(selectedTechnology.toLowerCase());

    return matchesSearch && matchesCategory && matchesVendor && matchesTechnology;
  });

  // Get unique values for filters based on toggle selection
  const categories = [...new Set(toggleFilteredUseCases.map(uc => uc.category))].sort();
  const vendors = [...new Set(toggleFilteredUseCases.map(uc => uc.vendor))].sort();
  const technologies = [...new Set(toggleFilteredUseCases.map(uc => uc.technicalSpecs.technology))].sort();

  // Enhanced capabilities with better categorization
  const sapCapabilities = [
    {
      id: "ai-business-suite",
      title: "AI Business Suite",
      description: "Comprehensive AI solutions for core business processes and operations.",
      icon: Building,
      status: "Available",
      category: "business-ai"
    },
    {
      id: "predictive-analytics",
      title: "Predictive Analytics Engine",
      description: "Advanced analytics and forecasting capabilities using machine learning.",
      icon: TrendingUp,
      status: "Available",
      category: "genai"
    },
    {
      id: "intelligent-automation",
      title: "Intelligent Process Automation",
      description: "AI-driven automation for complex business workflows and decisions.",
      icon: Target,
      status: "Available",
      category: "gen-ai"
    },
    {
      id: "conversational-ai",
      title: "Conversational AI Platform",
      description: "Natural language processing and AI agents for customer interactions.",
      icon: Brain,
      status: "Available",
      category: "gen-ai"
    },
    {
      id: "ml-platform",
      title: "Machine Learning Platform",
      description: "Enterprise-grade ML model development, training, and deployment.",
      icon: Cpu,
      status: "Available",
      category: "genai"
    },
    {
      id: "ai-governance",
      title: "AI Governance & Ethics",
      description: "Responsible AI practices, compliance, and risk management.",
      icon: Shield,
      status: "Available",
      category: "business-ai"
    }
  ];

  const getVideoUrl = (useCase: SapAiUseCase): string | null => {
    if (!useCase.visualAssets.hasVideo) return null;
    
    // Handle local video markers
    if (useCase.visualAssets.videoUrl?.startsWith("LOCAL_VIDEO:")) {
      const videoKey = useCase.visualAssets.videoUrl.replace("LOCAL_VIDEO:", "");
      const videoMap: Record<string, string> = {
        "reduce_effort_to_investigate": "/videos/reduce-effort-to-investigate.mp4",
        "reduce_time_summarizing": "/videos/reduce-time-summarizing-new.mp4"
      };
      return videoMap[videoKey] || null;
    }
    
    return useCase.visualAssets.videoUrl || null;
  };

  const getToggleIcon = (toggleId: string) => {
    switch (toggleId) {
      case "gen-ai": return Brain;
      case "business-ai": return Building;
      case "genai": return Cpu;
      default: return Award;
    }
  };

  const getToggleDescription = (toggleId: string) => {
    switch (toggleId) {
      case "gen-ai": return "AI Agents & Automation";
      case "business-ai": return "Business Process AI";
      case "genai": return "Advanced AI & ML";
      default: return "All AI Capabilities";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Premium Header */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: "var(--grad-primary)" }}>
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1
                className="text-4xl font-bold tracking-tight mb-4"
                style={{ color: "var(--text)" }}
              >
                {title}
              </h1>
              <p className="text-xl max-w-4xl mx-auto" style={{ color: "var(--text-muted)" }}>
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Premium Toggle Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl p-2 shadow-lg border" style={{ borderColor: "var(--border)" }}>
              {[
                { id: "gen-ai", label: "Gen AI", description: "AI Agents & Automation" },
                { id: "business-ai", label: "Business AI", description: "Business Process AI" },
                { id: "genai", label: "GenAI", description: "Advanced AI & ML" }
              ].map((toggle) => {
                const IconComponent = getToggleIcon(toggle.id);
                return (
                  <button
                    key={toggle.id}
                    onClick={() => setActiveToggle(toggle.id as any)}
                    className={`px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                      activeToggle === toggle.id
                        ? "text-white shadow-xl transform scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    style={{
                      background: activeToggle === toggle.id ? "var(--grad-primary)" : "transparent",
                      color: activeToggle === toggle.id ? "white" : "var(--text-muted)",
                    }}
                    title={toggle.description}
                  >
                    <IconComponent className="w-5 h-5" />
                    {toggle.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Toggle Description */}
          <div className="text-center mt-6">
            <p className="text-lg font-medium" style={{ color: "var(--text)" }}>
              {getToggleDescription(activeToggle)}
            </p>
          </div>
        </div>

        {/* Key Stats with Premium Styling */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="premium-card p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>{toggleFilteredUseCases.length}+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>AI Use Cases</div>
          </div>
          <div className="premium-card p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--green-600)" }}>{categories.length}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Categories</div>
          </div>
          <div className="premium-card p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--purple-600)" }}>{vendors.length}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Vendors</div>
          </div>
          <div className="premium-card p-6 text-center">
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--orange-600)" }}>Enterprise</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Grade AI</div>
          </div>
        </div>

        {/* Core Capabilities with Premium Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            Core SAP AI Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {sapCapabilities
               .filter(cap => cap.category === activeToggle || cap.category === "all")
               .map((capability) => {
              const IconComponent = capability.icon;
              return (
                <Card key={capability.id} className="premium-card hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: "var(--grad-primary)" }}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                          {capability.title}
                        </h3>
                        <Badge className="text-xs" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                          {capability.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Use Cases Explorer with Premium Styling */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            SAP AI Use Cases Explorer
          </h2>
          
          {/* Enhanced Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <Input
                placeholder="Search use cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 premium-card border-0"
                style={{ backgroundColor: "var(--surface)" }}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="premium-card border-0" style={{ backgroundColor: "var(--surface)" }}>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="premium-card border-0" style={{ backgroundColor: "var(--surface)" }}>
                <SelectValue placeholder="All Vendors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Vendors</SelectItem>
                {vendors.map(vendor => (
                  <SelectItem key={vendor} value={vendor}>{vendor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
              <SelectTrigger className="premium-card border-0" style={{ backgroundColor: "var(--surface)" }}>
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technologies</SelectItem>
                {technologies.map(tech => (
                  <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Showing {filteredUseCases.length} of {toggleFilteredUseCases.length} use cases
            </p>
          </div>

          {/* Use Cases Grid with Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.map((useCase) => {
              const videoUrl = getVideoUrl(useCase);
              return (
                <Card key={useCase.id} className="premium-card hover:shadow-xl transition-all duration-300 border-0 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors" style={{ color: "var(--text)" }}>
                          {useCase.title}
                        </h3>
                        <Badge className="text-xs mb-2" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                          {useCase.category}
                        </Badge>
                      </div>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-primary)" }}>
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {useCase.summary}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-xs">
                        <Building className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <span style={{ color: "var(--text-muted)" }}>{useCase.vendor}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Cpu className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                        <span style={{ color: "var(--text-muted)" }}>{useCase.technicalSpecs.technology}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUseCase(useCase)}
                        className="premium-chip"
                      >
                        View Details
                      </Button>
                      
                      {videoUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredUseCases.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>
                No use cases found
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Use Case Detail Modal */}
      {selectedUseCase && (
        <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                {selectedUseCase.title}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Overview */}
              <div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Overview</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {selectedUseCase.overview}
                </p>
              </div>

              {/* Business Value */}
              <div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Business Value</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {selectedUseCase.businessValue.metrics.map((metric, index) => (
                    <div key={index} className="premium-card p-4 text-center">
                      <div className="text-2xl font-bold mb-1" style={{ color: "var(--blue-600)" }}>
                        {metric.value}
                      </div>
                      <div className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        {metric.name}
                      </div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {metric.description}
                      </div>
                    </div>
                  ))}
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm" style={{ color: "var(--text-muted)" }}>
                  {selectedUseCase.businessValue.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Technical Specifications */}
              <div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Technical Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium" style={{ color: "var(--text)" }}>Platform:</span>
                    <span className="ml-2" style={{ color: "var(--text-muted)" }}>{selectedUseCase.technicalSpecs.platform}</span>
                  </div>
                  <div>
                    <span className="font-medium" style={{ color: "var(--text)" }}>Technology:</span>
                    <span className="ml-2" style={{ color: "var(--text-muted)" }}>{selectedUseCase.technicalSpecs.technology}</span>
                  </div>
                  <div>
                    <span className="font-medium" style={{ color: "var(--text)" }}>Module:</span>
                    <span className="ml-2" style={{ color: "var(--text-muted)" }}>{selectedUseCase.technicalSpecs.module}</span>
                  </div>
                  {selectedUseCase.technicalSpecs.minVersion && (
                    <div>
                      <span className="font-medium" style={{ color: "var(--text)" }}>Min Version:</span>
                      <span className="ml-2" style={{ color: "var(--text-muted)" }}>{selectedUseCase.technicalSpecs.minVersion}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Implementation */}
              <div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Implementation</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {selectedUseCase.implementation}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--text)" }}>Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUseCase.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                <Button className="flex-1" style={{ background: "var(--grad-primary)" }}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
                {getVideoUrl(selectedUseCase) && (
                  <Button variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
