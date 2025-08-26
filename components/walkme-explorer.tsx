import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  BarChart, 
  Users, 
  Workflow, 
  Shield, 
  TrendingUp,
  Bot,
  HelpCircle,
  ExternalLink,
  Building
} from 'lucide-react';
import WalkMeLogo from './logos/walkme-logo';

interface WalkMeUseCase {
  id: string;
  title: string;
  description: string;
  businessProblem: string;
  features: string[];
  businessValue: string[];
  industry: string;
  targetModule: string;
  implementationTime: string;
  complexity: string;
  roi: string;
  scenario?: {
    company: string;
    challenge: string;
    results: string;
    timeframe: string;
  };
}

export default function WalkMeExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedComplexity, setSelectedComplexity] = useState('All');

  // Filter options
  const industries = ['Manufacturing', 'Retail', 'Healthcare', 'Financial Services', 'Technology'];
  const modules = ['All Modules', 'SAP S/4HANA', 'SAP SuccessFactors', 'SAP Ariba', 'SAP CRM', 'Custom Applications'];
  const complexities = ['All', 'Low', 'Medium', 'High'];

  // Platform capabilities data
  const capabilities = [
    {
      id: 'guidance',
      title: "Contextual Guidance & SmartTips",
      icon: HelpCircle,
      description: "Provide real-time in-app guidance to streamline user tasks and prevent errors",
      status: "Enhanced"
    },
    {
      id: 'automation',
      title: "Process Automation & ActionBot",
      icon: Bot,
      description: "Automate repetitive tasks and complex workflows with intelligent bots",
      status: "Advanced"
    },
    {
      id: 'analytics',
      title: "Analytics & Insights Dashboard",
      icon: BarChart,
      description: "Track adoption metrics and identify process bottlenecks",
      status: "Real-time"
    }
  ];

  // Sample use cases data
  const useCases: WalkMeUseCase[] = [
    {
      id: 'uc1',
      title: "ECC to S/4HANA Migration Support",
      description: "Accelerate user adoption during SAP S/4HANA transformation with contextual guidance",
      businessProblem: "Complex ERP migration causing user confusion and productivity loss",
      features: [
        "Migration readiness assessment",
        "Contextual change guidance", 
        "User adoption tracking",
        "Performance analytics"
      ],
      businessValue: [
        "70% drop in migration-related support tickets",
        "Near-100% task completion rates",
        "Faster user onboarding"
      ],
      industry: "Manufacturing",
      targetModule: "SAP S/4HANA",
      implementationTime: "4-8 weeks",
      complexity: "Medium",
      roi: "70% drop in migration-related support tickets",
      scenario: {
        company: "Global Manufacturer",
        challenge: "S/4HANA Migration",
        results: "70% drop in migration-related support tickets, near-100% task completion rates",
        timeframe: "2 months"
      }
    },
    {
      id: 'uc2',
      title: "Intelligent Sales Order Automation",
      description: "Automate and error-proof order processing with smart validation and guidance",
      businessProblem: "Manual order entry processes leading to errors and delays",
      features: [
        "Auto-fill capabilities",
        "Smart validation",
        "Error prevention",
        "Process optimization"
      ],
      businessValue: [
        "25% decrease in order rework",
        "5% faster order-to-cash cycle",
        "Improved accuracy"
      ],
      industry: "Technology",
      targetModule: "SAP S/4HANA", 
      implementationTime: "2-4 weeks",
      complexity: "Low",
      roi: "25% decrease in order rework, 5% faster order-to-cash cycle",
      scenario: {
        company: "High-Tech Equipment Supplier",
        challenge: "Order Entry Optimization",
        results: "25% decrease in order rework, 5% faster order-to-cash cycle",
        timeframe: "1 month"
      }
    },
    {
      id: 'uc3',
      title: "Employee Onboarding Excellence",
      description: "Transform HR onboarding with guided workflows in SuccessFactors",
      businessProblem: "Lengthy and confusing employee onboarding processes",
      features: [
        "Step-by-step guidance",
        "Document automation",
        "Progress tracking",
        "Integration support"
      ],
      businessValue: [
        "50% reduction in HR support requests",
        "1-day training vs 3 days",
        "95% task completion rate"
      ],
      industry: "Healthcare",
      targetModule: "SAP SuccessFactors",
      implementationTime: "3-6 weeks", 
      complexity: "Medium",
      roi: "50% reduction in HR support requests",
      scenario: {
        company: "Healthcare Provider",
        challenge: "Employee Onboarding",
        results: "1-day training vs 3 days, 95% task completion rate",
        timeframe: "6 weeks"
      }
    }
  ];

  // Filter use cases
  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || useCase.industry === selectedIndustry;
    const matchesModule = selectedModule === 'All Modules' || useCase.targetModule === selectedModule;
    const matchesComplexity = selectedComplexity === 'All' || useCase.complexity === selectedComplexity;
    
    return matchesSearch && matchesIndustry && matchesModule && matchesComplexity;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'SAP S/4HANA': return Workflow;
      case 'SAP SuccessFactors': return Users;
      case 'SAP Ariba': return BarChart;
      case 'SAP CRM': return TrendingUp;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center mb-6">
              <WalkMeLogo className="h-24" />
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
              WalkMe Digital Adoption Platform
            </h1>
            <p className="text-lg text-center" style={{ color: "var(--text-muted)" }}>
              Accelerate software adoption, minimize user errors, and drive digital transformation ROI in enterprise applications.
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-8 max-w-7xl mx-auto">
        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>60%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Error Reduction</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>50%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Faster Onboarding</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>40%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Less Support Tickets</div>
          </div>
          <div className="text-center p-6 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div className="text-3xl font-bold mb-2" style={{ color: "var(--blue-600)" }}>95%</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Compliance Rate</div>
          </div>
        </div>

        {/* Demo Videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: "var(--text)" }}>
            See WalkMe in Action
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Demo Video 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-600 to-red-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Digital Adoption Platform</h3>
                    <p className="text-orange-100">Interactive user guidance and onboarding</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/walkme-demo-thumbnail.jpg"
                  >
                    <source src="/videos/reduce-effort-to-investigate.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm text-orange-100">
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
              <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Workflow className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Process Automation</h3>
                    <p className="text-purple-100">Intelligent workflow automation and insights</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden bg-black/20 border border-white/20">
                  <video 
                    className="w-full h-48 object-cover"
                    controls 
                    preload="metadata"
                    poster="/assets/walkme-demo-thumbnail-2.jpg"
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
            {capabilities.map((capability) => {
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
            WalkMe Implementation Use Cases
          </h2>
          
          {/* Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4" style={{ color: "var(--text-muted)" }} />
              <Input
                placeholder="Search use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

            <Select value={selectedModule} onValueChange={setSelectedModule}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module} value={module}>{module}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger style={{ borderColor: "var(--border)", backgroundColor: "var(--bg)" }}>
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                {complexities.map(complexity => (
                  <SelectItem key={complexity} value={complexity}>{complexity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Use Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.map((useCase) => {
              const ModuleIcon = getModuleIcon(useCase.targetModule);
              return (
                <Card key={useCase.id} className="border hover:shadow-lg transition-all duration-300" style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--blue-100)" }}>
                        <ModuleIcon className="w-5 h-5" style={{ color: "var(--blue-600)" }} />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={`text-xs ${getComplexityColor(useCase.complexity)}`}>
                          {useCase.complexity}
                        </Badge>
                        <Badge variant="outline" className="text-xs" style={{ borderColor: "var(--border)" }}>
                          {useCase.implementationTime}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text)" }}>
                      {useCase.title}
                    </h3>
                    
                    <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Target Module</p>
                        <p className="text-sm" style={{ color: "var(--text)" }}>{useCase.targetModule}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Key ROI</p>
                        <p className="text-sm font-medium" style={{ color: "var(--blue-600)" }}>{useCase.roi}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Industry</p>
                        <p className="text-sm" style={{ color: "var(--text)" }}>{useCase.industry}</p>
                      </div>

                      {useCase.scenario && (
                        <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="h-4 w-4" style={{ color: "var(--blue-600)" }} />
                            <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>Success Story</span>
                          </div>
                          <p className="text-xs" style={{ color: "var(--text-muted)" }}>{useCase.scenario.company}</p>
                          <p className="text-xs font-medium mt-1" style={{ color: "var(--blue-600)" }}>{useCase.scenario.results}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* No Results */}
          {filteredUseCases.length === 0 && (
            <div className="text-center py-12">
              <BarChart className="mx-auto h-12 w-12 mb-4" style={{ color: "var(--text-muted)" }} />
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
              <p className="text-lg text-center max-w-3xl mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
                WalkMe delivers significant business value by accelerating digital adoption, enhancing workforce productivity, 
                and streamlining enterprise processes through intuitive, in-app guidance and automation.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-start space-x-4 p-6 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)" }}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold" style={{ color: "var(--text)" }}>Accelerated Time to Competency</h4>
                      <Badge className="text-xs font-bold" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                        50%
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Reduce new employee onboarding and training times, enabling faster achievement of full productivity
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)" }}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold" style={{ color: "var(--text)" }}>Reduced User Error Rates</h4>
                      <Badge className="text-xs font-bold" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                        60%
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Decrease user errors and data entry mistakes, ensuring high data quality and fewer process interruptions
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-lg" style={{ backgroundColor: "var(--bg)" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--grad-primary)" }}>
                    <BarChart className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold" style={{ color: "var(--text)" }}>Enhanced Process Efficiency</h4>
                      <Badge className="text-xs font-bold" style={{ backgroundColor: "var(--blue-100)", color: "var(--blue-800)" }}>
                        45%
                      </Badge>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                      Deliver productivity improvements and cycle time reductions across core enterprise processes
                    </p>
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
