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
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<InfosysUseCase | null>(null);

  const filteredUseCases = infosysUseCases.filter((useCase: InfosysUseCase) => {
    const matchesSearch = !searchTerm || 
      useCase.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.searchableContent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPlatform = selectedPlatform === "all" || useCase.infosysPlatform === selectedPlatform;
    const matchesIndustry = selectedIndustry === null || useCase.industry.includes(selectedIndustry);

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

  const industryBlueprints = [
    {
      id: "sure",
      title: "SURE",
      category: "Services, Utilities, Energy & Energy transition",
      description: "Energy transition, utilities management, and sustainable resource optimization",
      image: "/assets/sure-blueprint.png",
      useCases: [
        "Energy Transition",
        "Utilities Management", 
        "Sustainable Resources",
        "Grid Optimization",
        "Renewable Energy"
      ]
    },
    {
      id: "cmt",
      title: "CMT",
      category: "Communication, Tech, Semicon, Media & Entertainment",
      description: "Telecommunications, semiconductor innovation, and digital media transformation",
      image: "/assets/cmt-blueprint.png",
      useCases: [
        "Telecommunications",
        "Semiconductor Innovation",
        "Digital Media",
        "Network Optimization",
        "Content Delivery"
      ]
    },
    {
      id: "crl",
      title: "CRL",
      category: "Logistics, CPG & Retail",
      description: "Supply chain optimization, retail innovation, and consumer goods management",
      image: "/assets/crl-blueprint.png",
      useCases: [
        "Supply Chain Optimization",
        "Retail Innovation",
        "Consumer Goods",
        "Inventory Management",
        "Customer Experience"
      ]
    },
    {
      id: "mfg",
      title: "MFG",
      category: "Automotive & Industrial Manufacturing, Metals, Mining & Agro",
      description: "Automotive, aerospace, industrial automation, and smart manufacturing",
      image: "/assets/mfg-blueprint.png",
      useCases: [
        "Automotive Manufacturing",
        "Aerospace Innovation",
        "Industrial Automation",
        "Smart Manufacturing",
        "Quality Control"
      ]
    },
    {
      id: "hil",
      title: "HIL",
      category: "Insurance - Life, Non-Life, Retirement, Payer, Provider & Life Sciences",
      description: "Medical innovation, insurance optimization, and life sciences",
      image: "/assets/hil-blueprint.png",
      useCases: [
        "Medical Innovation",
        "Insurance Optimization",
        "Life Sciences",
        "Risk Assessment",
        "Patient Care"
      ]
    },
    {
      id: "fs",
      title: "FS",
      category: "Financial Services",
      description: "Banking transformation, investment solutions, and financial technology innovation",
      image: "/assets/fs-blueprint.png",
      useCases: [
        "Banking Transformation",
        "Investment Solutions",
        "Financial Technology",
        "Risk Management",
        "Customer Service"
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      {/* Video Header Section */}
      <div className="relative h-96 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          src="/videos/Infosys.mp4"
        />
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 via-pink-800/60 to-purple-900/80 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-6">
            <h1 className="text-5xl font-bold mb-4" style={{ lineHeight: "1.1", fontFamily: "var(--font-sap-72)" }}>
              Infosys Topaz
            </h1>
            <p className="text-2xl mb-6 opacity-90" style={{ fontFamily: "var(--font-sap-72)" }}>
              AI-First Platform for Enterprise Transformation
            </p>
          </div>
        </div>
      </div>

      {/* Official Logo Header */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <InfosysTopazLogo width={100} height={30} />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight mb-2 text-center"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "var(--font-sap-72)"
              }}
            >
              Infosys Topaz AI Platform
            </h1>
            <p className="text-lg text-center" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
              AI-first solutions and platforms using generative AI technologies for enterprise transformation.
            </p>
          </div>
        </div>
      </div>
            
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "#8b5cf6", fontFamily: "var(--font-sap-72)" }}>12,000+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>AI Use Cases</div>
              </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "#8b5cf6", fontFamily: "var(--font-sap-72)" }}>50+</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>Industry Solutions</div>
              </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "#8b5cf6", fontFamily: "var(--font-sap-72)" }}>Enterprise</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>Grade AI</div>
              </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
            Core Platform Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topazCapabilities.map((capability) => {
              const IconComponent = capability.icon;
              return (
                <Card key={capability.id} className="border hover:shadow-lg transition-all duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)" }}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                          {capability.title}
                        </h3>
                        <Badge className="text-xs" style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                          {capability.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Industry AI Blueprints Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
            Industry AI Blueprints
          </h2>
          <p className="text-lg text-center mb-8" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
            Discover specialized AI transformation blueprints tailored for your industry, featuring proven solutions and strategic implementations.
          </p>
          
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
              {industryBlueprints.map((industry) => (
                <div
                  key={industry.id}
                  className={`flex-shrink-0 w-80 cursor-pointer transition-all duration-300 ${
                    selectedIndustry === industry.id ? 'scale-105' : 'hover:scale-105'
                  }`}
                  onClick={() => setSelectedIndustry(industry.id)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="bg-gradient-to-br from-gray-600 to-gray-800 p-6">
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full">
                          BLUEPRINT
                        </span>
                      </div>
                      
                      <div className="h-48 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {industry.image && industry.image !== "" ? (
                          <img 
                            src={industry.image} 
                            alt={`${industry.title} Blueprint`}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center ${industry.image && industry.image !== "" ? 'hidden' : ''}`}>
                          <div className="text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
                              <Brain className="w-8 h-8" />
                            </div>
                            <div className="text-2xl font-bold">{industry.title}</div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-sap-72)" }}>{industry.title}</h3>
                      <p className="text-gray-200 text-sm mb-2" style={{ fontFamily: "var(--font-sap-72)" }}>{industry.category}</p>
                      <p className="text-white text-sm" style={{ fontFamily: "var(--font-sap-72)" }}>{industry.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4 text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
              ← Scroll to explore more blueprints →
            </div>
          </div>
        </div>

        {/* Value Stream Use Case Map */}
        {selectedIndustry && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                {industryBlueprints.find(i => i.id === selectedIndustry)?.title} Value Stream Use Case Map
              </h2>
              <button
                onClick={() => setSelectedIndustry(null)}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium"
                style={{ fontFamily: "var(--font-sap-72)" }}
              >
                Back to Blueprints
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryBlueprints.find(i => i.id === selectedIndustry)?.useCases.map((useCase, index) => (
                <Card key={index} className="border hover:shadow-lg transition-all duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6" style={{ color: "#8b5cf6" }} />
                      </div>
                      <h3 className="font-semibold text-sm" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Use Cases Explorer */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
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
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}
              />
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}>
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="Topaz">Topaz</SelectItem>
                <SelectItem value="EdgeVerve AI Next">EdgeVerve AI Next</SelectItem>
                <SelectItem value="AssistEdge">AssistEdge</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedIndustry || "all"} onValueChange={(value) => setSelectedIndustry(value === "all" ? null : value)}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)", fontFamily: "var(--font-sap-72)" }}>
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
                    <Badge className="text-xs" style={{ backgroundColor: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                        {useCase.infosysPlatform}
                      </Badge>
                    <Badge className="text-xs" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
                      {useCase.status}
                      </Badge>
                    </div>
                    
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                      {useCase.name}
                    </h3>
                    
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
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
                      <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        <span className="font-medium">Complexity:</span> {useCase.implementationComplexity}
                      </div>
                      <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        <span className="font-medium">Timeline:</span> {useCase.typicalProjectDuration}
                        </div>
                    </div>
                    </div>
                    
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center justify-between">
                      <div className="text-sm" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                        {useCase.domain.length} domains
                        </div>
                      <Button variant="outline" size="sm" className="hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300">
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
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>No use cases found</h3>
              <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
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
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)" }}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>{selectedUseCase.name}</h2>
                  <p style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>{selectedUseCase.infosysPlatform}</p>
              </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>Description</h3>
                <p className="leading-relaxed" style={{ color: "var(--text-muted)", fontFamily: "var(--font-sap-72)" }}>
                      {selectedUseCase.description}
                    </p>
                  </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>Key Technologies</h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedUseCase.aiTechnologies?.slice(0, 6).map((tech, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                      <Award className="h-5 w-5" style={{ color: "#8b5cf6" }} />
                      <span className="text-sm" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
                        {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

              <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>Business Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedUseCase.businessMetrics || {}).filter(([_, value]) => value).map(([key, value], index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg border" style={{ borderColor: "var(--border)" }}>
                      <Target className="h-5 w-5" style={{ color: "#8b5cf6" }} />
                      <span className="text-sm" style={{ color: "var(--text)", fontFamily: "var(--font-sap-72)" }}>
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
