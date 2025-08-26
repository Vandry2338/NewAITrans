import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  ArrowRight, 
  ChevronDown, 
  Filter, 
  Grid, 
  List,
  Users,
  Bot
} from "lucide-react";

// Joule use cases data structure
interface JouleUseCase {
  id: string;
  title: string;
  summary: string;
  description: string;
  industry: string[];
  valueChain: string[];
  processModule: string[];
  tags: string[];
  sapProducts: string[];
  status: string;
  lastUpdated: string;
  painPoints: string[];
  kpis: string[];
  personas: string[];
  opportunities: string[];
  businessValue: string;
  implementation: string;
  metadataSummary: string;
  architecture: {
    components: string[];
    integration: string[];
    dataFlow: string;
  };
  capabilities: string[];
}

// Filter options based on the use cases
const statusOptions = ["All", "Available", "Planned", "Planned Q3 2025"];
const industryOptions = ["All", "Cross-Industry", "Financial Services", "Manufacturing", "Retail", "Professional Services", "Technology"];
const valueChainOptions = ["All", "Finance", "Record to Report", "Plan to Fulfill", "Source to Pay", "Lead to Cash", "Enterprise Operations"];
const implementationOptions = ["All", "Low", "Medium", "High"];

export default function JouleAgentsExplorer() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedValueChain, setSelectedValueChain] = useState<string>("All");
  const [selectedImplementation, setSelectedImplementation] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(6);

  // Fetch Joule use cases from API
  const { data: jouleUseCases = [], isLoading } = useQuery({
    queryKey: ['/api/joule-use-cases', selectedStatus, selectedIndustry, selectedValueChain, selectedImplementation, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedStatus !== "All") params.append('status', selectedStatus);
      if (selectedIndustry !== "All") params.append('industry', selectedIndustry);
      if (selectedValueChain !== "All") params.append('valueChain', selectedValueChain);
      if (selectedImplementation !== "All") params.append('implementation', selectedImplementation);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`/api/joule-use-cases?${params}`);
      if (!response.ok) throw new Error('Failed to fetch Joule use cases');
      return response.json() as Promise<JouleUseCase[]>;
    }
  });

  const filteredUseCases = jouleUseCases;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Planned Q3 2025': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getImplementationColor = (implementation: string) => {
    switch (implementation.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="apple-section">
      <div className="apple-container">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="nibirux-heading-lg text-gray-900 dark:text-white mb-4">
            AI Agents & Automation
          </h2>
          <p className="nibirux-body-bold text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Explore intelligent AI agents that transform your business processes with natural language automation, 
            predictive insights, and collaborative workflows.
          </p>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary nibirux-tight">{filteredUseCases.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary nibirux-tight">1,600+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Joule Skills</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent nibirux-tight">80%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Task Automation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary nibirux-tight">30%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Productivity Gain</div>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-orange-200">
              {filteredUseCases.length} agents
            </Badge>
            {selectedStatus !== "All" && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                Status: {selectedStatus}
              </Badge>
            )}
            {selectedIndustry !== "All" && (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Industry: {selectedIndustry}
              </Badge>
            )}
            {selectedValueChain !== "All" && (
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                Value Chain: {selectedValueChain}
              </Badge>
            )}
            {selectedImplementation !== "All" && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                Complexity: {selectedImplementation}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                Search: "{searchQuery}"
              </Badge>
            )}
            {(selectedStatus !== "All" || selectedIndustry !== "All" || selectedValueChain !== "All" || selectedImplementation !== "All" || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedStatus("All");
                  setSelectedIndustry("All");
                  setSelectedValueChain("All");
                  setSelectedImplementation("All");
                  setSearchQuery("");
                }}
                className="h-6 text-xs"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <Card className="apple-surface mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <h3 className="font-semibold text-foreground">Filters</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="apple-transition"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="p-1"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="p-1"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Status</label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Industry Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Industry</label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      {industryOptions.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Value Chain Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Value Chain</label>
                  <Select value={selectedValueChain} onValueChange={setSelectedValueChain}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Value Chains" />
                    </SelectTrigger>
                    <SelectContent>
                      {valueChainOptions.map((chain) => (
                        <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Implementation Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Complexity</label>
                  <Select value={selectedImplementation} onValueChange={setSelectedImplementation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      {implementationOptions.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search agents..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="use-case-card animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                      <div className="w-16 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Joule Use Cases Grid */}
        {!isLoading && (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {filteredUseCases.slice(0, visibleCount).map((useCase) => (
            <Card key={useCase.id} className="apple-surface hover:scale-105 transition-transform duration-300 cursor-pointer">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(useCase.status)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                      {useCase.status}
                    </Badge>
                    <Badge className={getImplementationColor(useCase.implementation)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                      {useCase.implementation}
                    </Badge>
                  </div>
                </div>
                
                {/* Title and Description */}
                <h3 className="nibirux-heading-md text-foreground mb-2">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                  {useCase.summary}
                </p>
                
                {/* Key Metrics */}
                <div className="space-y-2 mb-4">
                  {useCase.kpis.slice(0, 2).map((kpi, index) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-blue-500 mr-2" />
                      <span>{kpi}</span>
                    </div>
                  ))}
                </div>
                
                {/* Personas */}
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4 text-blue-500 mr-2" />
                  <span>{useCase.personas.slice(0, 2).join(", ")}</span>
                  {useCase.personas.length > 2 && <span> +{useCase.personas.length - 2} more</span>}
                </div>
                
                {/* SAP Products */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {useCase.sapProducts.slice(0, 2).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {useCase.sapProducts.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{useCase.sapProducts.length - 2} more
                    </Badge>
                  )}
                </div>
                
                {/* Business Value */}
                <div className="text-sm text-muted-foreground italic border-l-4 border-blue-500 pl-3">
                  {useCase.businessValue}
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && visibleCount < filteredUseCases.length && (
          <div className="text-center mt-8">
            <Button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="apple-button-primary"
            >
              Load More Agents
            </Button>
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredUseCases.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No AI agents found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms to find relevant Joule agents.</p>
          </div>
        )}
      </div>
    </div>
  );
}