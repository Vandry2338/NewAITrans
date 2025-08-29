import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Activity, Search, TrendingUp, Shield, BarChart3, ExternalLink, CheckCircle, Calendar } from "lucide-react";
import { signavioUseCases, type SignavioUseCase } from "@/lib/data/signavio-use-cases-data";
import SignavioLogo from "@/components/logos/signavio-logo";

export default function SignavioExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedValueChain, setSelectedValueChain] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<string>("all");

  const filteredUseCases = signavioUseCases.filter((useCase: SignavioUseCase) => {
    const matchesSearch = !searchTerm || 
      useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      useCase.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesIndustry = selectedIndustry === "all" || useCase.industry.includes(selectedIndustry);
    const matchesValueChain = selectedValueChain === "all" || useCase.valueChain.includes(selectedValueChain);
    const matchesProduct = selectedProduct === "all" || useCase.signavio.products.includes(selectedProduct);

    return matchesSearch && matchesIndustry && matchesValueChain && matchesProduct;
  });

  const signavioCapabilities = [
    {
      id: "process-intelligence",
      title: "Process Intelligence & Mining",
      description: "Advanced process mining for data-driven insights and transformation",
      icon: BarChart3,
      status: "Available"
    },
    {
      id: "process-manager",
      title: "Process Manager & Modeling",
      description: "Collaborative business process modeling and documentation platform",
      icon: TrendingUp,
      status: "Available"
    },
    {
      id: "process-governance",
      title: "Process Governance & Automation",
      description: "Workflow automation and governance for operational excellence",
      icon: Shield,
      status: "Available"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <SignavioLogo width={100} height={30} />
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
              SAP Signavio Process Transformation
            </h1>
            <p className="text-lg text-center" style={{ color: "var(--text-muted)" }}>
              Drive data-driven business transformation with process intelligence, modeling, and governance capabilities.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>24hrs</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>To Insights</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>45%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Cycle Time Reduction</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>95%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Compliance Rate</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>60%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Risk Reduction</div>
          </div>
        </div>

        {/* Demo Videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            See Signavio in Action
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Video 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reduce Effort to Investigate</h3>
                    <p className="text-blue-100">Automated process analysis and insights</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/signavio-demo-thumbnail.jpg"
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
              <div className="bg-gradient-to-br from-indigo-600 to-purple-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reduce Time Summarizing</h3>
                    <p className="text-purple-100">Intelligent reporting and analytics</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/signavio-demo-thumbnail-2.jpg"
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
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            Core Platform Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signavioCapabilities.map((capability) => {
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
            SAP Signavio Use Cases
          </h2>
          
          {/* Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            <Select value={selectedValueChain} onValueChange={setSelectedValueChain}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Value Chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Value Chains</SelectItem>
                <SelectItem value="Source to Pay">Source to Pay</SelectItem>
                <SelectItem value="Plan to Produce">Plan to Produce</SelectItem>
                <SelectItem value="Order to Cash">Order to Cash</SelectItem>
                <SelectItem value="Record to Report">Record to Report</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Signavio Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Process Intelligence">Process Intelligence</SelectItem>
                <SelectItem value="Process Manager">Process Manager</SelectItem>
                <SelectItem value="Process Governance">Process Governance</SelectItem>
                <SelectItem value="Process Insights">Process Insights</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.map((useCase: SignavioUseCase) => (
              <Card key={useCase.id} className="border hover:shadow-lg transition-all duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-wrap gap-2">
                      {useCase.signavio.products.slice(0, 2).map((product, index) => (
                        <Badge 
                          key={index}
                          className="text-xs"
                          style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}
                        >
                          {product}
                        </Badge>
                      ))}
                    </div>
                    <Badge className="text-xs" style={{ backgroundColor: "var(--surface)", color: "var(--text-muted)" }}>
                      {useCase.status}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg mb-3" style={{ color: "var(--text)" }}>
                    {useCase.title}
                  </h3>
                  
                  <p className="text-sm mb-4 line-clamp-3" style={{ color: "var(--text-muted)" }}>
                    {useCase.summary}
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
                        <span className="font-medium">Complexity:</span> {useCase.implementation.split(' ')[0]}
                      </div>
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        <span className="font-medium">Timeline:</span> {useCase.implementation.match(/\d+-\d+ months/) || 'Variable'}
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--blue-50)" }}>
                      <div className="text-sm font-medium" style={{ color: "var(--blue-800)" }}>
                        💡 {useCase.businessValue.split(' ').slice(0, 12).join(' ')}...
                      </div>
                    </div>

                    {useCase.realWorldExample && (
                      <div className="p-3 rounded-lg" style={{ backgroundColor: "var(--surface)" }}>
                        <div className="text-sm">
                          <div className="font-medium mb-1" style={{ color: "var(--text)" }}>
                            🏢 {useCase.realWorldExample.company}
                          </div>
                          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                            {useCase.realWorldExample.results[0]}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                        {useCase.valueChain.length} value chains
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
              <Activity className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)" }} />
              <h3 className="text-lg font-medium mb-2" style={{ color: "var(--text)" }}>No use cases found</h3>
              <p style={{ color: "var(--text-muted)" }}>
                Try adjusting your search criteria or filters
              </p>
            </div>
          )}
        </div>

        {/* Business Transformation Value */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            Business Transformation Value
          </h2>
          
          <Card className="border" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                    Process Discovery & Intelligence
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-500)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Same-day process insights</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>Connect to SAP systems and get insights within 24 hours</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-500)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Automated process discovery</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>AI-powered analysis of actual process execution</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-500)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Performance benchmarking</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>Compare processes across industries and business units</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                    Workflow Automation & Governance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-600)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Intelligent automation</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>Automated workflows with smart task routing</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-600)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Compliance monitoring</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>Real-time compliance checking and reporting</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 rounded-full mt-2 mr-3" style={{ backgroundColor: "var(--blue-600)" }}></div>
                      <div>
                        <div className="font-semibold" style={{ color: "var(--text)" }}>Continuous optimization</div>
                        <div className="text-sm" style={{ color: "var(--text-muted)" }}>Ongoing process improvement and optimization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
