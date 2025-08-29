import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Bot, Brain, MessageSquare, ExternalLink, Play, Target, Award, Building, CheckCircle } from "lucide-react";
import { jouleUseCases, type JouleUseCase } from "@/lib/data/joule-use-cases-data";
import JouleLogo from "@/components/logos/joule-logo";

export default function JouleAiAgentExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedValueChain, setSelectedValueChain] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedUseCase, setSelectedUseCase] = useState<JouleUseCase | null>(null);

  const filteredUseCases = jouleUseCases.filter((useCase: JouleUseCase) => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "all" || useCase.industry.includes(selectedIndustry);
    const matchesValueChain = selectedValueChain === "all" || useCase.valueChain.includes(selectedValueChain);
    const matchesStatus = selectedStatus === "all" || useCase.status === selectedStatus;

    return matchesSearch && matchesIndustry && matchesValueChain && matchesStatus;
  });

  // Get unique values for filters
  const industries = [...new Set(jouleUseCases.flatMap(uc => uc.industry))].sort();
  const valueChains = [...new Set(jouleUseCases.flatMap(uc => uc.valueChain))].sort();
  const statuses = [...new Set(jouleUseCases.map(uc => uc.status))].sort();

  const jouleCapabilities = [
    {
      id: "conversational-ai",
      title: "Conversational AI Interface",
      description: "Natural language interactions for intuitive business process automation.",
      icon: MessageSquare,
      status: "Available"
    },
    {
      id: "intelligent-automation",
      title: "Intelligent Process Automation", 
      description: "AI-driven automation that learns and adapts to business workflows.",
      icon: Brain,
      status: "Available"
    },
    {
      id: "enterprise-integration",
      title: "Enterprise System Integration",
      description: "Seamless integration with SAP and third-party enterprise systems.",
      icon: Building,
      status: "Available"
    }
  ];

  const getBusinessValueMetrics = (useCase: JouleUseCase) => {
    if (typeof useCase.businessValue === 'string') {
      return null;
    }
    return useCase.businessValue?.metrics || [];
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Video Header Section */}
      <div className="relative h-96 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src="/videos/Joule Agents SAP Business AI Planning Agents for Improved Decision-Making  Demo.mp4"
        />
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-5xl font-bold mb-4" style={{ lineHeight: "1.1" }}>
              Joule Agents
            </h1>
            <p className="text-2xl mb-6 opacity-90">
              SAP Business AI Planning Agents for Improved Decision-Making
            </p>
          </div>
        </div>
      </div>

      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-4">
                <JouleLogo className="w-24 h-24" />
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>SAP Joule</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>AI Copilot</div>
                </div>
              </div>
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
              SAP Joule AI Agent Explorer
            </h1>
            <p className="text-lg text-center" style={{ color: "var(--text-muted)" }}>
              Discover intelligent AI agents powered by SAP Joule for enterprise automation and assistance
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>{filteredUseCases.length}+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>AI Agents</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>{industries.length}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Industries</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>Enterprise</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Ready</div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            SAP Joule Core Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jouleCapabilities.map((capability) => {
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

        {/* Demo Videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            See SAP Joule in Action
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Demo Video 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">AI Agent Automation</h3>
                    <p className="text-blue-100">Intelligent process automation with Joule</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/joule-demo-thumbnail-1.jpg"
                  >
                    <source src="/videos/reduce-effort-to-investigate.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-blue-100">
                  <span>Duration: 2:30</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Live Demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Video 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-600 to-pink-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Smart Summarization</h3>
                    <p className="text-purple-100">AI-powered document analysis and insights</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/joule-demo-thumbnail-2.jpg"
                  >
                    <source src="/videos/reduce-time-summarizing-new.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-purple-100">
                  <span>Duration: 3:15</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Live Demo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Video 3 - Placeholder for future content */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Conversational AI</h3>
                    <p className="text-emerald-100">Natural language business assistance</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-medium">Demo Coming Soon</p>
                      <p className="text-xs opacity-80">Interactive AI conversation demo</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-emerald-100">
                  <span>Duration: TBD</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Agents Explorer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            SAP Joule AI Agents & Use Cases
          </h2>
          
          {/* Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <Input
                placeholder="Search AI agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}
              />
            </div>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedValueChain} onValueChange={setSelectedValueChain}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Value Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Value Chains</SelectItem>
                {valueChains.map(chain => (
                  <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* AI Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.slice(0, 12).map((useCase: JouleUseCase) => {
              const metrics = getBusinessValueMetrics(useCase);
              return (
                <Card key={useCase.id} className="border hover:shadow-lg transition-all duration-300 cursor-pointer" 
                      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
                      onClick={() => setSelectedUseCase(useCase)}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="text-xs" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                        {useCase.sapProducts[0] || "SAP Joule"}
                      </Badge>
                      <div className="flex items-center gap-2">
                        {useCase.demoVideoUrl && (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--blue-100)" }}>
                            <Play className="w-3 h-3" style={{ color: "var(--blue-600)" }} />
                          </div>
                        )}
                        <Badge className="text-xs" style={{ backgroundColor: getStatusColor(useCase.status), color: "white" }}>
                          {useCase.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-3 line-clamp-2" style={{ color: "var(--text)" }}>
                      {useCase.title}
                    </h3>
                    
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                      {useCase.summary}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                          <span className="font-medium">Value Chain:</span> {useCase.valueChain[0] || "General"}
                        </div>
                      </div>
                      
                      {metrics && metrics.length > 0 && (
                        <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--blue-50)" }}>
                          <div className="text-sm font-medium" style={{ color: "var(--blue-800)" }}>
                            🎯 {metrics[0].name}: {metrics[0].value}
                          </div>
                        </div>
                      )}
                      
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
                    </div>
                    
                    <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {useCase.capabilities.length} capabilities
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {filteredUseCases.length === 0 && (
            <div className="text-center py-12">
              <Bot className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>No AI agents found</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AI Agent Detail Modal */}
      {selectedUseCase && (
        <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" style={{ backgroundColor: "var(--bg)" }}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "var(--grad-primary)" }}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{selectedUseCase.title}</h2>
                  <p style={{ color: "var(--text-muted)" }}>SAP Joule • {selectedUseCase.status}</p>
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

              {/* Demo Video Section */}
              {selectedUseCase.demoVideoUrl && (
                <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Demo Video</h3>
                  <div className="relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <video 
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      controls
                      src={selectedUseCase.demoVideoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Business Value</h3>
                  <div className="space-y-3">
                    {typeof selectedUseCase.businessValue === 'string' ? (
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {selectedUseCase.businessValue}
                      </p>
                    ) : (
                      selectedUseCase.businessValue?.metrics?.map((metric, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                          <Target className="h-5 w-5" style={{ color: "var(--blue-600)" }} />
                          <div>
                            <div className="font-medium text-sm" style={{ color: "var(--text)" }}>
                              {metric.name}: {metric.value}
                            </div>
                            {metric.description && (
                              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                                {metric.description}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Key Capabilities</h3>
                  <div className="space-y-2">
                    {selectedUseCase.capabilities.slice(0, 6).map((capability, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: "var(--blue-600)" }} />
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
                          {capability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Architecture & Integration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    <div className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>Components</div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {selectedUseCase.architecture.components.join(", ")}
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                    <div className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>Integration</div>
                    <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                      {selectedUseCase.architecture.integration.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                  <div className="font-medium text-sm mb-1" style={{ color: "var(--text)" }}>Data Flow</div>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {selectedUseCase.architecture.dataFlow}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'available':
      return 'var(--blue-600)';
    case 'planned':
      return 'var(--orange-500)';
    case 'planned q3 2025':
      return 'var(--yellow-500)';
    default:
      return 'var(--gray-500)';
  }
}
