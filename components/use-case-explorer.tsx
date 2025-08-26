import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowRight, ChevronDown, Filter, Grid, List, Sparkles, Zap } from "lucide-react";
import * as Icons from "lucide-react";
// import DeepDiveModal from "./deep-dive-modal";
// import { sapUseCasesData, industryCategories, businessFunctionCategories, complexityLevels } from "@/lib/sap-use-cases-data";
// import type { UseCase } from "@shared/schema";

// Comprehensive filters based on SAP use cases data
const comprehensiveBusinessFunctions = [
  "Asset Management",
  "Cross-Industry", 
  "Customer Service",
  "Finance",
  "Human Resources",
  "Manufacturing",
  "Marketing",
  "Supply Chain"
];

const comprehensiveIndustries = [
  "Cross-Industry",
  "Financial Services",
  "Human Capital Management",
  "Manufacturing",
  "Retail",
  "Supply Chain Management",
  "Utilities"
];

const implementationLevels = ["Low", "Medium", "High"];

export default function UseCaseExplorer() {
  const [selectedVendor, setSelectedVendor] = useState<string>("all");
  const [selectedFunction, setSelectedFunction] = useState<string>("all");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUseCase, setSelectedUseCase] = useState<any | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);

  const { data: useCases = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/use-cases", { 
      vendor: selectedVendor !== "all" ? selectedVendor : undefined,
      function: selectedFunction !== "all" ? selectedFunction : undefined,
      industry: selectedIndustry !== "all" ? selectedIndustry : undefined,
      complexity: selectedComplexity !== "all" ? selectedComplexity : undefined,
      search: searchQuery || undefined
    }],
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedVendor, selectedFunction, selectedIndustry, selectedComplexity, searchQuery]);

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.CircleDot;
    return IconComponent;
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getVendorColor = (vendor: string) => {
    return vendor === 'SAP' ? 'bg-primary text-white' : 'bg-accent text-white';
  };

  return (
    <section className="apple-section">
      <div className="apple-container">
        <div className="explorer-header">
          <h2 className="page-title">Solution Use Cases</h2>
          <p className="page-subtitle max-w-3xl mx-auto">
            Explore comprehensive solutions for your business challenges with detailed implementation guides and proven ROI metrics
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-orange-200">
              {Array.isArray(useCases) ? useCases.length : 0} solutions
            </Badge>
            {selectedFunction !== "all" && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                Function: {selectedFunction}
              </Badge>
            )}
            {selectedIndustry !== "all" && (
              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                Industry: {selectedIndustry}
              </Badge>
            )}
            {selectedComplexity !== "all" && (
              <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                Complexity: {selectedComplexity}
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">
                Search: "{searchQuery}"
              </Badge>
            )}
            {(selectedFunction !== "all" || selectedIndustry !== "all" || selectedComplexity !== "all" || searchQuery) && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedFunction("all");
                  setSelectedIndustry("all");
                  setSelectedComplexity("all");
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
                {/* Vendor Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Vendor</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'SAP'].map((vendor) => (
                      <Button
                        key={vendor}
                        variant={selectedVendor === vendor ? "default" : "outline"}
                        size="sm"
                        className={`apple-transition ${selectedVendor === vendor ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                        onClick={() => setSelectedVendor(vendor)}
                      >
                        {vendor === 'all' ? 'All' : vendor}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Business Function Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Business Function</label>
                  <Select value={selectedFunction} onValueChange={setSelectedFunction}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Functions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Functions</SelectItem>
                      {comprehensiveBusinessFunctions.map((func) => (
                        <SelectItem key={func} value={func}>{func}</SelectItem>
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
                      <SelectItem value="all">All Industries</SelectItem>
                      {comprehensiveIndustries.map((industry) => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Complexity Filter */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Implementation</label>
                  <Select value={selectedComplexity} onValueChange={setSelectedComplexity}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {implementationLevels.map((level) => (
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
                      placeholder="Search solutions..."
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

        {/* Use Case Cards Grid */}
        {isLoading ? (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {useCases.slice(0, visibleCount).map((useCase: any) => {
              const IconComponent = getIcon(useCase.iconName);
              return (
                <Card 
                  key={useCase.id} 
                  className="use-case-card hover-lift cursor-pointer"
                  onClick={() => setSelectedUseCase(useCase)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        useCase.backgroundColor === 'primary' ? 'bg-primary/10' :
                        useCase.backgroundColor === 'secondary' ? 'bg-secondary/10' :
                        'bg-accent/10'
                      }`}>
                        <IconComponent 
                          size={20} 
                          className={
                            useCase.backgroundColor === 'primary' ? 'text-primary' :
                            useCase.backgroundColor === 'secondary' ? 'text-secondary' :
                            'text-accent'
                          } 
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Badge className={getVendorColor(useCase.vendor)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                          {useCase.vendor}
                        </Badge>
                        <Badge className={getComplexityColor(useCase.implementation)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>
                          {useCase.implementation}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="nibirux-heading-md text-foreground mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm font-medium">
                      {useCase.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {Array.isArray(useCase.metrics) && useCase.metrics.slice(0, 2).map((metric: any, index: number) => (
                        <div key={index} className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight size={16} className={
                            useCase.backgroundColor === 'primary' ? 'text-primary mr-2' :
                            useCase.backgroundColor === 'secondary' ? 'text-secondary mr-2' :
                            'text-accent mr-2'
                          } />
                          <span>{metric.value} {metric.metric}</span>
                        </div>
                      ))}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Icons.Users size={16} className={
                          useCase.backgroundColor === 'primary' ? 'text-primary mr-2' :
                          useCase.backgroundColor === 'secondary' ? 'text-secondary mr-2' :
                          'text-accent mr-2'
                        } />
                        <span>{useCase.businessFunction}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${
                        useCase.backgroundColor === 'primary' ? 'text-primary' :
                        useCase.backgroundColor === 'secondary' ? 'text-secondary' :
                        'text-accent'
                      }`}>
                        Learn More
                      </span>
                      <ArrowRight size={16} className={
                        useCase.backgroundColor === 'primary' ? 'text-primary' :
                        useCase.backgroundColor === 'secondary' ? 'text-secondary' :
                        'text-accent'
                      } />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {useCases.length > visibleCount && (
          <div className="text-center mt-12">
            <Button 
              className="bg-primary hover:bg-primary-dark text-white"
              onClick={() => setVisibleCount(prev => prev + 12)}
            >
              Load More Use Cases ({useCases.length - visibleCount} remaining)
              <ChevronDown size={16} className="ml-2" />
            </Button>
          </div>
        )}

        {/* Deep Dive Modal - Removed for now */}
        {/* {selectedUseCase && (
          <DeepDiveModal
            useCase={selectedUseCase}
            onClose={() => setSelectedUseCase(null)}
          />
        )} */}
      </div>
    </section>
  );
}
