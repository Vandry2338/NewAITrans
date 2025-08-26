import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Calendar, 
  Users, 
  Target, 
  Settings, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Award, 
  Building, 
  Layers
} from "lucide-react";

// Map local video markers to public URLs
const videoUrlMap: Record<string, string> = {
  "LOCAL_VIDEO:reduce_effort_to_investigate": "/reduce-effort-to-investigate.mp4",
  "LOCAL_VIDEO:reduce_time_summarizing": "/reduce-time-summarizing-new.mp4"
};

interface SapAiUseCase {
  id: string;
  title: string;
  summary: string;
  category: string;
  vendor: "SAP" | "Topaz" | "Infosys Consulting";
  publishedDate: string;
  lastUpdated: string;
  overview: string;
  status?: string;
  industry?: string[];
  valueChain?: string[];
  platform?: string;
  module?: string;
  technology?: string[];
  minimumVersion?: string;
  sapProducts?: string[];
  businessValue: {
    metrics: {
      name: string;
      value: string;
      description: string;
    }[];
    benefits: string[];
    crossIndustryUse?: boolean;
  };
  architecture?: {
    components: Array<{
      name: string;
      description: string;
      type: string;
    }>;
    integration: Array<{
      name: string;
      description: string;
      type: string;
    }>;
    dataFlow: string;
  };
  kpis?: Array<{
    name: string;
    description: string;
    target: string;
  }>;
  personas?: Array<{
    name: string;
    role: string;
    description: string;
  }>;
  opportunities?: Array<{
    title: string;
    description: string;
    impact: string;
  }>;
  technicalSpecs: {
    platform: string;
    technology: string;
    minVersion?: string;
    module: string;
  };
  implementation: string;
  visualAssets: {
    hasVideo: boolean;
    videoUrl?: string;
    hasDemo?: boolean;
    screenshots?: string[];
  };
  tags: string[];
}

const SapAiUseCasesExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState("All");
  const [selectedUseCase, setSelectedUseCase] = useState<SapAiUseCase | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: useCases = [],
    isLoading,
    error,
    refetch
  } = useQuery<SapAiUseCase[]>({
    queryKey: [
      "/api/sap-ai-use-cases",
      { 
        category: selectedCategory,
        vendor: selectedVendor,
        search: searchTerm
      }
    ],
    enabled: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false
  });

  // Auto-refresh when filters change
  useEffect(() => {
    refetch();
  }, [selectedCategory, selectedVendor, searchTerm, refetch]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedVendor("All");
    setSearchTerm("");
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Finance": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Analytics": "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
      "HR": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "Marketing": "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
      "Procurement": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
      "Sales": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Supply Chain": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Available": "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
      "In Development": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Beta": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Planned": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Error loading AI use cases. Please try again.
        </div>
        <Button onClick={() => refetch()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <section className="apple-section">
      <div className="apple-container">
        <div className="explorer-header">
          <div className="explorer-title-container">
            <div className="explorer-icon bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h2 className="page-title text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>
                AI Use Cases Explorer
              </h2>
              <p className="explorer-subtitle" style={{ fontFamily: 'Inter, sans-serif' }}>
                Comprehensive AI Solutions Catalog
              </p>
            </div>
          </div>
          <p className="section-description max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover comprehensive AI use cases from leading enterprise vendors across finance, analytics, HR, marketing, procurement, sales, 
            and supply chain. Each use case includes detailed business metrics, technical specifications, and proven ROI data.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search AI use cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {(selectedCategory !== "All" || selectedVendor !== "All" || searchTerm) && (
              <Button variant="ghost" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue placeholder="Vendor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Vendors</SelectItem>
                  <SelectItem value="SAP">SAP</SelectItem>
                  <SelectItem value="Topaz">Topaz</SelectItem>
                  <SelectItem value="Infosys Consulting">Infosys Consulting</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Procurement">Procurement</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            Found {useCases.length} use cases
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <Card 
              key={useCase.id} 
              className="apple-surface cursor-pointer hover:shadow-lg transition-all duration-300 group"
              onClick={() => setSelectedUseCase(useCase)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getCategoryColor(useCase.category)}>
                    {useCase.category}
                  </Badge>
                  <Badge variant="outline" className={getStatusColor(useCase.status || 'Unknown')}>
                    {useCase.status || 'Unknown'}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {useCase.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>{useCase.publishedDate}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {useCase.summary}
                </CardDescription>
                
                {/* Business Value Preview */}
                {useCase.businessValue.metrics.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Business Value</span>
                    </div>
                    <div className="space-y-1">
                      {useCase.businessValue.metrics.slice(0, 2).map((metric, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {metric.name}
                          </span>
                          <span className="font-semibold text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {useCase.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Video indicator */}
                {useCase.visualAssets.hasVideo && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                    <Play className="h-4 w-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Video Available</span>
                  </div>
                )}

                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>View Details</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {useCases.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
              No use cases found matching your criteria.
            </div>
            <Button onClick={clearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detailed Use Case Modal */}
      {selectedUseCase && (
        <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
            <DialogHeader className="flex-shrink-0 pb-6 border-b border-gray-200 dark:border-gray-800">
              <DialogTitle className="text-2xl pr-8 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                {selectedUseCase.title}
              </DialogTitle>
              <DialogDescription className="text-base text-gray-600 dark:text-gray-400 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                {selectedUseCase.summary}
              </DialogDescription>
              <div className="flex items-center gap-3">
                <Badge className={getCategoryColor(selectedUseCase.category)}>
                  {selectedUseCase.category}
                </Badge>
                <Badge variant="outline" className={getStatusColor(selectedUseCase.status || "draft")}>
                  {selectedUseCase.status || "draft"}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>{selectedUseCase.publishedDate}</span>
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="flex-1 flex flex-col mt-6">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview" className="text-sm font-medium">Overview</TabsTrigger>
                <TabsTrigger value="value" className="text-sm font-medium">Business Value</TabsTrigger>
                <TabsTrigger value="technical" className="text-sm font-medium">Technical</TabsTrigger>
                <TabsTrigger value="implementation" className="text-sm font-medium">Implementation</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="flex-1 overflow-y-auto px-1">
                <div className="space-y-6 pb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100" style={{ fontFamily: 'Inter, sans-serif' }}>Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedUseCase.overview}
                    </p>
                  </div>

                  {/* Video Section */}
                  {selectedUseCase.visualAssets.hasVideo && selectedUseCase.visualAssets.videoUrl && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100" style={{ fontFamily: 'Inter, sans-serif' }}>Video Demo</h3>
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        {(() => {
                          const videoUrl = videoUrlMap[selectedUseCase.visualAssets.videoUrl] || selectedUseCase.visualAssets.videoUrl;
                          
                          if (videoUrl.startsWith('http')) {
                            return (
                              <iframe
                                src={videoUrl.replace('/view?usp=sharing', '/preview')}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            );
                          } else {
                            return (
                              <video
                                className="w-full h-full object-contain"
                                controls
                                src={videoUrl}
                                preload="metadata"
                                playsInline
                              >
                                Your browser does not support the video tag.
                              </video>
                            );
                          }
                        })()}
                      </div>
                    </div>
                  )}
                  
                  {/* Video Section - Fallback for cases without video URL */}
                  {selectedUseCase.visualAssets.hasVideo && !selectedUseCase.visualAssets.videoUrl && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-100" style={{ fontFamily: 'Inter, sans-serif' }}>Video Demo</h3>
                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-8 text-center border border-purple-200 dark:border-purple-800">
                        <Play className="h-16 w-16 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Interactive demo video available - Contact SAP for access
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-green-900 dark:text-green-100" style={{ fontFamily: 'Inter, sans-serif' }}>Key Benefits</h3>
                    <ul className="space-y-4">
                      {selectedUseCase.businessValue.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-amber-900 dark:text-amber-100" style={{ fontFamily: 'Inter, sans-serif' }}>Implementation Details</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedUseCase.implementation}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="value" className="flex-1 overflow-y-auto px-1">
                <div className="space-y-6 pb-6">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6 text-emerald-900 dark:text-emerald-100" style={{ fontFamily: 'Inter, sans-serif' }}>Business Value Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedUseCase.businessValue.metrics.map((metric, index) => (
                        <div key={index} className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.name}
                            </h4>
                            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.value}
                            </span>
                          </div>
                          {metric.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedUseCase.businessValue.crossIndustryUse && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        <h4 className="text-xl font-semibold text-blue-900 dark:text-blue-100" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Cross-Industry Application
                        </h4>
                      </div>
                      <p className="text-base text-blue-800 dark:text-blue-200 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                        This use case delivers value across multiple industries and business sectors, ensuring broad applicability and consistent ROI.
                      </p>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-violet-900 dark:text-violet-100" style={{ fontFamily: 'Inter, sans-serif' }}>Target Industries</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedUseCase.industry?.map((industry, index) => (
                        <Badge key={index} variant="outline" className="bg-white/60 dark:bg-gray-800/60 border-violet-300 dark:border-violet-700 text-violet-800 dark:text-violet-200 px-4 py-2 text-sm font-medium">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-rose-900 dark:text-rose-100" style={{ fontFamily: 'Inter, sans-serif' }}>Value Chain Coverage</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedUseCase.valueChain?.map((chain, index) => (
                        <Badge key={index} variant="secondary" className="bg-white/60 dark:bg-gray-800/60 border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 px-4 py-2 text-sm font-medium">
                          {chain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="flex-1 overflow-y-auto px-1">
                <div className="space-y-6 pb-6">
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Inter, sans-serif' }}>Technical Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Platform</h4>
                        <Badge variant="outline" className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 px-4 py-2 text-sm font-medium">
                          {selectedUseCase.platform}
                        </Badge>
                        
                        <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Module</h4>
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {selectedUseCase.module}
                        </p>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-800">
                        <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedUseCase.technology?.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200 px-3 py-1.5 text-sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        {selectedUseCase.minimumVersion && (
                          <div>
                            <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Minimum Version</h4>
                            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {selectedUseCase.minimumVersion}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-blue-900 dark:text-blue-100" style={{ fontFamily: 'Inter, sans-serif' }}>SAP Products</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedUseCase.sapProducts?.map((product, index) => (
                        <Badge key={index} variant="outline" className="bg-white/60 dark:bg-gray-800/60 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 px-4 py-2 text-sm font-medium">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-6 text-teal-900 dark:text-teal-100" style={{ fontFamily: 'Inter, sans-serif' }}>System Architecture</h3>
                    <div className="space-y-6">
                      <div className="bg-white/70 dark:bg-gray-800/70 p-5 rounded-lg border border-teal-200 dark:border-teal-800">
                        <h4 className="font-semibold mb-4 flex items-center gap-3 text-teal-800 dark:text-teal-200">
                          <Layers className="h-5 w-5" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Core Components</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUseCase.architecture?.components?.map((component, index) => (
                            <Badge key={index} variant="secondary" className="bg-teal-50 dark:bg-teal-900/30 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200 px-3 py-1.5 text-sm">
                              {typeof component === 'string' ? component : component.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-gray-800/70 p-5 rounded-lg border border-teal-200 dark:border-teal-800">
                        <h4 className="font-semibold mb-4 flex items-center gap-3 text-teal-800 dark:text-teal-200">
                          <Settings className="h-5 w-5" />
                          <span style={{ fontFamily: 'Inter, sans-serif' }}>Integration Points</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUseCase.architecture?.integration?.map((integration, index) => (
                            <Badge key={index} variant="outline" className="bg-cyan-50 dark:bg-cyan-900/30 border-cyan-300 dark:border-cyan-700 text-cyan-800 dark:text-cyan-200 px-3 py-1.5 text-sm">
                              {typeof integration === 'string' ? integration : integration.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-white/70 dark:bg-gray-800/70 p-5 rounded-lg border border-teal-200 dark:border-teal-800">
                        <h4 className="font-semibold mb-4 text-teal-800 dark:text-teal-200" style={{ fontFamily: 'Inter, sans-serif' }}>Data Flow Architecture</h4>
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-700 dark:text-gray-300 font-mono leading-relaxed">
                            {selectedUseCase.architecture?.dataFlow}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="implementation" className="flex-1 overflow-y-auto px-1">
                <div className="space-y-6 pb-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-indigo-900 dark:text-indigo-100" style={{ fontFamily: 'Inter, sans-serif' }}>Implementation Overview</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedUseCase.implementation}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-orange-900 dark:text-orange-100" style={{ fontFamily: 'Inter, sans-serif' }}>Key Performance Indicators</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedUseCase.kpis?.map((kpi, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                          <Target className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {typeof kpi === 'string' ? kpi : kpi.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-green-900 dark:text-green-100" style={{ fontFamily: 'Inter, sans-serif' }}>Target Personas</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedUseCase.personas?.map((persona, index) => (
                        <Badge key={index} variant="outline" className="bg-white/60 dark:bg-gray-800/60 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200 px-4 py-2 text-sm font-medium">
                          <Users className="h-4 w-4 mr-2" />
                          {typeof persona === 'string' ? persona : persona.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-5 text-purple-900 dark:text-violet-100" style={{ fontFamily: 'Inter, sans-serif' }}>Business Opportunities</h3>
                    <ul className="space-y-4">
                      {selectedUseCase.opportunities?.map((opportunity, index) => (
                        <li key={index} className="flex items-start gap-3 bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                          <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-base leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {typeof opportunity === 'string' ? opportunity : opportunity.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default SapAiUseCasesExplorer;