import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  BarChart, 
  Users, 
  BookOpen, 
  Workflow, 
  Shield, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  DollarSign,
  Brain,
  Target,
  Zap,
  FileText,
  Settings,
  Package,
  ArrowRight,
  X,
  Play,
  CheckCircle,
  Layers,
  Eye,
  Bot,
  HelpCircle,
  Activity,
  MessageSquare,
  Globe,
  ChevronRight,
  Calendar,
  Building
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  capabilities?: string[];
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
  const [selectedUseCase, setSelectedUseCase] = useState<WalkMeUseCase | null>(null);
  const [expandedDemo, setExpandedDemo] = useState<string | null>(null);

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
      features: ["Interactive tooltips", "Field validation", "Process walkthroughs", "Error prevention"],
      status: "Enhanced"
    },
    {
      id: 'automation',
      title: "Process Automation & ActionBot",
      icon: Bot,
      description: "Automate repetitive tasks and complex workflows with intelligent bots",
      features: ["Auto-fill forms", "Multi-step automation", "API integration", "Conditional logic"],
      status: "Advanced"
    },
    {
      id: 'analytics',
      title: "Analytics & Insights Dashboard",
      icon: BarChart,
      description: "Track adoption metrics and identify process bottlenecks",
      features: ["Usage analytics", "Error tracking", "ROI measurement", "User journey mapping"],
      status: "Real-time"
    },
    {
      id: 'mobile',
      title: "Mobile & Cross-Platform Support",
      icon: Globe,
      description: "Deliver consistent guidance across devices and platforms",
      features: ["Mobile optimization", "Browser agnostic", "Cloud & on-premise", "Offline capability"],
      status: "Universal"
    },
    {
      id: 'security',
      title: "Enterprise Security & Compliance",
      icon: Shield,
      description: "Enterprise-grade security with role-based access control",
      features: ["SSO integration", "Data encryption", "Audit trails", "GDPR compliance"],
      status: "Certified"
    },
    {
      id: 'nocode',
      title: "No-Code Content Creation",
      icon: Settings,
      description: "Build and deploy guidance without coding expertise",
      features: ["Visual editor", "Smart recorder", "Template library", "Version control"],
      status: "Intuitive"
    }
  ];

  // Interactive demos
  const demos = [
    {
      id: 'demo1',
      title: "SAP S/4HANA User Adoption Accelerator",
      subtitle: "ERP Transformation",
      description: "See how WalkMe accelerates S/4HANA adoption with contextual guidance and automation",
      icon: Workflow,
      gradient: "from-blue-500 to-indigo-600",
      color: "blue",
      capabilities: [
        "Smart Walk-Thrus for process guidance",
        "Automated data validation",
        "Role-based content delivery",
        "Real-time analytics dashboard"
      ],
      businessValue: [
        "70% reduction in support tickets",
        "50% faster user onboarding",
        "Near 100% task completion rates"
      ],
      businessImpact: "Transform your S/4HANA migration with proven digital adoption strategies that ensure user success from day one",
      features: [
        "Smart Walk-Thrus",
        "Automated Validation",
        "Role-based Content",
        "Real-time Analytics"
      ],
      implementation: {
        timeline: "4-8 weeks",
        approach: "Phased rollout by business unit",
        requirements: "Browser extension deployment"
      }
    },
    {
      id: 'demo2',
      title: "Intelligent Order Management Assistant",
      subtitle: "Process Automation",
      description: "Experience automated order entry with smart validation and process optimization",
      icon: Package,
      gradient: "from-purple-500 to-pink-600",
      color: "purple",
      capabilities: [
        "ActionBot for auto-fill",
        "Smart validation rules",
        "Error prevention tooltips",
        "Workflow automation"
      ],
      businessValue: [
        "60% reduction in order errors",
        "40% faster order processing",
        "25% decrease in rework"
      ],
      businessImpact: "Streamline order management with intelligent automation that prevents errors and accelerates processing",
      features: [
        "ActionBot Auto-fill",
        "Smart Validation",
        "Error Prevention",
        "Workflow Automation"
      ],
      implementation: {
        timeline: "2-4 weeks",
        approach: "Process-specific deployment",
        requirements: "API integration for automation"
      }
    }
  ];

  // Use cases data
  const useCases: WalkMeUseCase[] = [
    {
      id: 'uc1',
      title: "ECC to S/4HANA Migration Support",
      description: "Accelerate user adoption during SAP S/4HANA transformation with contextual guidance",
      businessProblem: "Users struggle with new Fiori interfaces and re-engineered processes during S/4HANA migration",
      features: [
        "Smart Walk-Thrus for new processes",
        "SmartTips for field validation",
        "ShoutOuts for change announcements",
        "ActionBot for repetitive tasks"
      ],
      businessValue: [
        "20% reduction in post-go-live support tickets",
        "50% faster employee time-to-competency",
        "Minimize productivity dip during transition"
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
        timeframe: "3 months"
      }
    },
    {
      id: 'uc2',
      title: "Intelligent Sales Order Automation",
      description: "Automate and error-proof order processing with smart validation and guidance",
      businessProblem: "Sales teams make frequent errors in complex order entry, causing delays and rework",
      features: [
        "ActionBot auto-fill functionality",
        "Validation SmartTips",
        "Guided order workflows",
        "Conditional logic rules"
      ],
      businessValue: [
        "60% reduction in order errors",
        "Minutes faster per order entry",
        "40% decrease in support calls"
      ],
      industry: "Technology",
      targetModule: "SAP S/4HANA",
      implementationTime: "2-4 weeks",
      complexity: "Low",
      roi: "25% decrease in order rework, 5% faster order-to-cash cycle",
      scenario: {
        company: "High-Tech Equipment Supplier",
        challenge: "Sales Order Automation",
        results: "25% decrease in order rework, 5% faster order-to-cash cycle",
        timeframe: "Under 1 quarter"
      }
    },
    {
      id: 'uc3',
      title: "Employee Onboarding Excellence",
      description: "Transform HR onboarding with guided workflows in SuccessFactors",
      businessProblem: "New hires struggle with complex HR systems, leading to incomplete onboarding tasks",
      features: [
        "Personalized onboarding journeys",
        "Task completion tracking",
        "Automated form filling",
        "Progress dashboards"
      ],
      businessValue: [
        "75% faster onboarding completion",
        "95% task completion rate",
        "Improved employee satisfaction"
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
    },
    {
      id: 'uc4',
      title: "Procurement Process Optimization",
      description: "Streamline procurement workflows in SAP Ariba with intelligent guidance",
      businessProblem: "Complex procurement processes lead to compliance issues and delayed approvals",
      features: [
        "Guided requisition creation",
        "Approval workflow automation",
        "Compliance checkpoints",
        "Vendor selection assistance"
      ],
      businessValue: [
        "30% faster requisition processing",
        "95% compliance rate",
        "Reduced maverick spending"
      ],
      industry: "Retail",
      targetModule: "SAP Ariba",
      implementationTime: "4-6 weeks",
      complexity: "Medium",
      roi: "30% reduction in procurement cycle time",
      scenario: {
        company: "Retail Client",
        challenge: "Order Entry Optimization",
        results: "Built automated order-entry guide in 4 weeks, 1-day training vs 3 days",
        timeframe: "4 weeks"
      }
    },
    {
      id: 'uc5',
      title: "Finance Close Acceleration",
      description: "Accelerate month-end close processes with guided workflows and automation",
      businessProblem: "Finance teams face delays and errors during period-end close activities",
      features: [
        "Close task orchestration",
        "Automated reconciliations",
        "Exception handling guides",
        "Real-time progress tracking"
      ],
      businessValue: [
        "40% faster close cycle",
        "Reduced audit findings",
        "Improved accuracy"
      ],
      industry: "Financial Services",
      targetModule: "SAP S/4HANA",
      implementationTime: "6-8 weeks",
      complexity: "High",
      roi: "2-day reduction in close time",
      scenario: {
        company: "Financial Services Firm",
        challenge: "Month-end Close",
        results: "40% faster close cycle, 2-day reduction in close time",
        timeframe: "2 months"
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
      case 'SAP S/4HANA': return Package;
      case 'SAP SuccessFactors': return Users;
      case 'SAP Ariba': return Workflow;
      case 'SAP CRM': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <section className="apple-section">
      <div className="apple-container">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <WalkMeLogo className="h-20" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">WalkMe Digital Adoption Platform</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Accelerate software adoption, minimize user errors, and drive digital transformation ROI in enterprise applications like SAP
          </p>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary nibirux-tight">60%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Error Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary nibirux-tight">50%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Faster Onboarding</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent nibirux-tight">40%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Less Support Tickets</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary nibirux-tight">95%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Compliance Rate</div>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Core Platform Capabilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability) => {
              const IconComponent = capability.icon;
              return (
                <Card key={capability.id} className="apple-surface hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {capability.title}
                        </h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                          {capability.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {capability.description}
                    </p>
                    
                    <div className="space-y-2">
                      {capability.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interactive Demos */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Interactive Demos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const categoryColors = {
                blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
              };
              
              return (
                <Card 
                  key={demo.id} 
                  className="apple-surface cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedDemo(demo.id);
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={categoryColors[demo.color as keyof typeof categoryColors]}>
                        {demo.subtitle}
                      </Badge>
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Available
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {demo.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Interactive
                      </Badge>
                      <Calendar className="h-4 w-4" />
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>Latest</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {demo.description}
                    </CardDescription>
                    
                    {/* Business Value Preview */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Business Value</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {demo.businessImpact}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {demo.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature.split(' ')[0]}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      <span style={{ fontFamily: 'Inter, sans-serif' }}>View Details</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Implementation Use Cases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            WalkMe Implementation Use Cases
          </h2>
          
          {/* Search and Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                {modules.map(module => (
                  <SelectItem key={module} value={module}>{module}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
              <SelectTrigger>
                <SelectValue placeholder="Complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Complexities</SelectItem>
                {complexities.slice(1).map(complexity => (
                  <SelectItem key={complexity} value={complexity}>{complexity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Use Case Cards with Success Stories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUseCases.map((useCase) => {
              const ModuleIcon = getModuleIcon(useCase.targetModule);
              return (
                <Card 
                  key={useCase.id} 
                  className="apple-surface hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedUseCase(useCase);
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <ModuleIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getComplexityColor(useCase.complexity)} style={{ fontSize: '0.7rem' }}>
                          {useCase.complexity}
                        </Badge>
                        <Badge variant="outline" style={{ fontSize: '0.7rem' }}>
                          {useCase.implementationTime}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2">{useCase.title}</CardTitle>
                    <p className="text-sm text-gray-600">{useCase.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Target Module</p>
                        <p className="text-sm text-gray-700">{useCase.targetModule}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Key ROI</p>
                        <p className="text-sm text-green-600 font-medium">{useCase.roi}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Industry</p>
                        <p className="text-sm text-gray-700">{useCase.industry}</p>
                      </div>
                      
                      {/* Success Story Preview */}
                      {useCase.scenario && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Building className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-semibold text-gray-700">Success Story</span>
                          </div>
                          <p className="text-xs text-gray-600">{useCase.scenario.company}</p>
                          <p className="text-xs text-green-600 font-medium mt-1">{useCase.scenario.results}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Business Transformation Value Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            WalkMe Business Transformation Value
          </h2>
          
          {/* Value Overview */}
          <Card className="apple-surface">
            <CardContent className="p-8">
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg text-center max-w-3xl mx-auto">
                WalkMe delivers significant business value by accelerating digital adoption, enhancing workforce productivity, 
                and streamlining enterprise processes through intuitive, in-app guidance and automation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Accelerated Time to Competency",
                    metric: "50%",
                    description: "Reduce new employee onboarding and training times, enabling faster achievement of full productivity",
                    icon: Clock
                  },
                  {
                    title: "Reduced User Error Rates",
                    metric: "60%",
                    description: "Decrease user errors and data entry mistakes, ensuring high data quality and fewer process interruptions",
                    icon: Shield
                  },
                  {
                    title: "Lowered Support Costs",
                    metric: "40%",
                    description: "Cut support requests and helpdesk tickets related to software usage, reducing operational costs",
                    icon: DollarSign
                  },
                  {
                    title: "Improved Compliance",
                    metric: "95%",
                    description: "Achieve compliance rates with enterprise processes through automated guidance and validation",
                    icon: CheckCircle
                  },
                  {
                    title: "Enhanced Process Efficiency",
                    metric: "45%",
                    description: "Deliver productivity improvements and cycle time reductions across core enterprise processes",
                    icon: TrendingUp
                  },
                  {
                    title: "Digital Investment ROI",
                    metric: "3x",
                    description: "Realize the full potential of digital investments by driving continuous adoption and measurable outcomes",
                    icon: Target
                  }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-bold">
                          {value.metric}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Use Case Modal */}
        {selectedUseCase && (
          <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedUseCase.title}</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="value">Business Value</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Business Problem</h3>
                      <p className="text-gray-700">{selectedUseCase.businessProblem}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Solution Overview</h3>
                      <p className="text-gray-700">
                        WalkMe addresses this challenge by providing contextual, in-app guidance and automation 
                        that accelerates user adoption and ensures process compliance.
                      </p>
                    </div>
                    {selectedUseCase.scenario && (
                      <div className="border-l-4 border-blue-500 pl-6 py-4 bg-blue-50 rounded-r-lg">
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{selectedUseCase.scenario.company}</h4>
                        <p className="text-sm text-gray-600 mb-2">{selectedUseCase.scenario.challenge}</p>
                        <p className="text-sm text-green-600 font-semibold mb-1">{selectedUseCase.scenario.results}</p>
                        <p className="text-xs text-gray-500">Timeframe: {selectedUseCase.scenario.timeframe}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Target Module</p>
                        <p className="text-gray-700">{selectedUseCase.targetModule}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Industry</p>
                        <p className="text-gray-700">{selectedUseCase.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Complexity</p>
                        <Badge className={getComplexityColor(selectedUseCase.complexity)}>
                          {selectedUseCase.complexity}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Timeline</p>
                        <p className="text-gray-700">{selectedUseCase.implementationTime}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Key Features & Capabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedUseCase.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="value" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Business Value & ROI</h3>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <p className="text-green-800 font-semibold text-lg">{selectedUseCase.roi}</p>
                    </div>
                    <div className="space-y-3">
                      {selectedUseCase.businessValue.map((value, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="implementation" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Implementation Details</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Timeline</p>
                        <p className="text-gray-900 font-medium">{selectedUseCase.implementationTime}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Complexity</p>
                        <Badge className={getComplexityColor(selectedUseCase.complexity)}>
                          {selectedUseCase.complexity}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technical Considerations</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Browser extension or snippet deployment</li>
                        <li>No core SAP modifications required</li>
                        <li>SSO integration for role-based content</li>
                        <li>Compatible with SAP cloud infrastructure</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}

        {/* Demo Modal */}
        {expandedDemo && (
          <Dialog open={!!expandedDemo} onOpenChange={() => setExpandedDemo(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {demos.find(d => d.id === expandedDemo)?.title}
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full mt-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="demo-video">Demo Video</TabsTrigger>
                  <TabsTrigger value="capabilities">Key Capabilities</TabsTrigger>
                  <TabsTrigger value="business-value">Business Value</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">WalkMe Demo Overview</h3>
                      <p className="text-gray-700">{demos.find(d => d.id === expandedDemo)?.description}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Business Impact</h4>
                      <p className="text-gray-700">
                        {demos.find(d => d.id === expandedDemo)?.businessImpact}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Timeline</p>
                        <p className="text-gray-700">{demos.find(d => d.id === expandedDemo)?.implementation.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Category</p>
                        <p className="text-gray-700">{demos.find(d => d.id === expandedDemo)?.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="demo-video" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Interactive Demo Video</h3>
                    <div className="bg-gray-100 p-8 rounded-lg text-center">
                      <Play className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-gray-600 mb-4">Watch the interactive demo showcasing key capabilities</p>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Play Demo Video
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="capabilities" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Key Capabilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {demos.find(d => d.id === expandedDemo)?.capabilities.map((cap, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <span className="text-gray-700">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="business-value" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Business Value & ROI</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {demos.find(d => d.id === expandedDemo)?.businessValue.map((val, i) => (
                        <div key={i} className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-gray-700">{val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Overall Impact</h4>
                      <p className="text-gray-700">
                        {demos.find(d => d.id === expandedDemo)?.businessImpact}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="implementation" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Implementation Details</h3>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Timeline</p>
                        <p className="text-gray-900 font-medium">{demos.find(d => d.id === expandedDemo)?.implementation.timeline}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Approach</p>
                        <p className="text-gray-900 font-medium">{demos.find(d => d.id === expandedDemo)?.implementation.approach}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-gray-500 mb-1">Requirements</p>
                        <p className="text-gray-900 font-medium">{demos.find(d => d.id === expandedDemo)?.implementation.requirements}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technical Considerations</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Browser extension deployment for contextual guidance</li>
                        <li>No modifications to core SAP system required</li>
                        <li>SSO integration for role-based content delivery</li>
                        <li>Real-time analytics and performance tracking</li>
                        <li>Compatible with cloud and on-premise SAP environments</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}