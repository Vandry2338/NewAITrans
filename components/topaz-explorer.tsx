import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, Bot, Zap, Search, ExternalLink, Target, Award } from "lucide-react";
import { infosysUseCases, type InfosysUseCase } from "@/lib/data/infosys-use-cases-data";
import InfosysTopazLogo from "@/components/logos/infosys-topaz-logo";

export default function TopazExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<InfosysUseCase | null>(null);

  const filteredUseCases = infosysUseCases.filter((useCase: InfosysUseCase) => {
    const matchesSearch = !searchTerm || 
      useCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.searchableContent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = selectedPlatform === "all" || useCase.infosysPlatform === selectedPlatform;
    const matchesIndustry = selectedIndustry === "all" || useCase.industry.includes(selectedIndustry);

    return matchesSearch && matchesPlatform && matchesIndustry;
  });

  const topazCapabilities = [
    {
      id: "ai-first",
      title: "AI-First Architecture",
      description: "Built-in AI capabilities across the entire platform with pre-trained models.",
      icon: Brain,
      status: "Available"
    },
    {
      id: "knowledge-graph",
      title: "Enterprise Knowledge Graph",
      description: "Unified knowledge representation enabling intelligent data discovery.",
      icon: Bot,
      status: "Available"
    },
    {
      id: "low-code",
      title: "Low-Code AI Development",
      description: "Drag-and-drop interface for building AI applications without extensive coding.",
      icon: Zap,
      status: "Available"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <InfosysTopazLogo width={320} height={80} />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight mb-2 text-center"
              style={{
                background: "var(--grad-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Infosys Topaz AI Platform
            </h1>
            <p className="text-lg text-center" style={{ color: "var(--text-muted)" }}>
              AI-first solutions and platforms using generative AI technologies for enterprise transformation.
            </p>
          </div>
          </div>
        </div>
            
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>12,000+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>AI Use Cases</div>
              </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>50+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Industry Solutions</div>
              </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>Enterprise</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Grade AI</div>
              </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            Core Platform Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topazCapabilities.map((capability) => {
              const IconComponent = capability.icon;
              return (
                <Card key={capability.id} className="border hover:shadow-lg transition-all duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ background: "var(--grad-primary)" }}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
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

        {/* Use Cases Explorer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            Topaz Use Cases
          </h2>
          
          {/* Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <Input
                placeholder="Search use cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
              />
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Topaz">Topaz</SelectItem>
                <SelectItem value="EdgeVerve AI Next">EdgeVerve AI Next</SelectItem>
                <SelectItem value="AssistEdge">AssistEdge</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                <SelectItem value="Financial Services">Financial Services</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Use Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.slice(0, 12).map((useCase: InfosysUseCase) => (
              <Card key={useCase.id} className="border hover:shadow-lg transition-all duration-300 cursor-pointer" 
                    style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                    onClick={() => setSelectedUseCase(useCase)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                    <Badge className="text-xs" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                        {useCase.infosysPlatform}
                      </Badge>
                    <Badge className="text-xs" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
                      {useCase.status}
                      </Badge>
                    </div>
                    
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                      {useCase.name}
                    </h3>
                    
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {useCase.industry.slice(0, 2).map((industry, index) => (
                        <Badge key={index} variant="outline" className="text-xs" style={{ borderColor: "var(--border)" }}>
                            {industry}
                          </Badge>
                        ))}
                        {useCase.industry.length > 2 && (
                        <Badge variant="outline" className="text-xs" style={{ borderColor: "var(--border)" }}>
                            +{useCase.industry.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        <span className="font-medium">Complexity:</span> {useCase.implementationComplexity}
                      </div>
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        <span className="font-medium">Timeline:</span> {useCase.typicalProjectDuration}
                        </div>
                    </div>
                    </div>
                    
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center justify-between">
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {useCase.domain.length} domains
                        </div>
                      <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

          {/* No Results */}
          {filteredUseCases.length === 0 && (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>No use cases found</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Use Case Detail Modal */}
      {selectedUseCase && (
        <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--bg)" }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-primary)" }}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{selectedUseCase.name}</h2>
                  <p style={{ color: "var(--text-muted)" }}>{selectedUseCase.infosysPlatform}</p>
              </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Description</h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {selectedUseCase.description}
                    </p>
                  </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Key Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedUseCase.aiTechnologies?.slice(0, 6).map((tech, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                      <Award className="h-5 w-5" style={{ color: "var(--blue-600)" }} />
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Business Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedUseCase.businessMetrics || {}).filter(([_, value]) => value).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                      <Target className="h-5 w-5" style={{ color: "var(--blue-600)" }} />
                      <span className="text-sm" style={{ color: "var(--text)" }}>
                        {key}: {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
