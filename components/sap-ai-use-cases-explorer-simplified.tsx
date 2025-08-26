import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

interface SapAiUseCase {
  id: string;
  title: string;
  summary: string;
  category: string;
  vendor: "SAP" | "Topaz" | "Infosys Consulting";
  publishedDate: string;
  lastUpdated: string;
  overview: string;
  businessValue: {
    metrics: {
      name: string;
      value: string;
      description: string;
    }[];
    benefits: string[];
  };
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
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false
  });

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
      "Beta": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
      "Preview": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
      "Coming Soon": "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="apple-surface rounded-xl p-6 animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">Error loading use cases</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="apple-surface rounded-xl p-6">
        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search use cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>
          <div className="flex gap-2">
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
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {useCase.vendor}
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
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>Key Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {useCase.businessValue.metrics.slice(0, 2).map((metric, index) => (
                        <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 border border-green-200 dark:border-green-800">
                          <div className="text-lg font-bold text-green-700 dark:text-green-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-green-600 dark:text-green-500 leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {metric.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {useCase.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {useCase.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{useCase.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Video/Demo Indicator */}
                {useCase.visualAssets.hasVideo && (
                  <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
                    <Play className="h-4 w-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>Video Demo Available</span>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Building className="h-4 w-4" />
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{useCase.technicalSpecs.platform}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {useCases.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              No use cases found
            </h3>
            <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      {/* Use Case Detail Modal */}
      <Dialog open={!!selectedUseCase} onOpenChange={() => setSelectedUseCase(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          {selectedUseCase && (
            <>
              <DialogHeader className="flex-shrink-0 border-b pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={getCategoryColor(selectedUseCase.category)}>
                        {selectedUseCase.category}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {selectedUseCase.vendor}
                      </Badge>
                    </div>
                    <DialogTitle className="text-2xl font-bold leading-tight text-gray-900 dark:text-white pr-8" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {selectedUseCase.title}
                    </DialogTitle>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Published {selectedUseCase.publishedDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings className="h-4 w-4" />
                        <span style={{ fontFamily: 'Inter, sans-serif' }}>Updated {selectedUseCase.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="flex-1 flex flex-col overflow-hidden">
                <TabsList className="grid w-full grid-cols-4 flex-shrink-0">
                  <TabsTrigger value="overview" style={{ fontFamily: 'Inter, sans-serif' }}>Overview</TabsTrigger>
                  <TabsTrigger value="value" style={{ fontFamily: 'Inter, sans-serif' }}>Business Value</TabsTrigger>
                  <TabsTrigger value="technical" style={{ fontFamily: 'Inter, sans-serif' }}>Technical</TabsTrigger>
                  <TabsTrigger value="implementation" style={{ fontFamily: 'Inter, sans-serif' }}>Implementation</TabsTrigger>
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
                          <iframe
                            src={selectedUseCase.visualAssets.videoUrl.replace('/view?usp=drive_link', '/preview').replace('/view?usp=sharing', '/preview')}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
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
                  </div>
                </TabsContent>

                <TabsContent value="value" className="flex-1 overflow-y-auto px-1">
                  <div className="space-y-6 pb-6">
                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-6 text-emerald-900 dark:text-emerald-100" style={{ fontFamily: 'Inter, sans-serif' }}>Business Value Metrics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedUseCase.businessValue.metrics.map((metric, index) => (
                          <div key={index} className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.value}
                            </div>
                            <div className="text-sm font-semibold text-emerald-800 dark:text-emerald-300 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {metric.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

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
                  </div>
                </TabsContent>

                <TabsContent value="technical" className="flex-1 overflow-y-auto px-1">
                  <div className="space-y-6 pb-6">
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-6 text-slate-900 dark:text-slate-100" style={{ fontFamily: 'Inter, sans-serif' }}>Technical Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Platform</h4>
                          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {selectedUseCase.technicalSpecs.platform}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Technology</h4>
                          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {selectedUseCase.technicalSpecs.technology}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Module</h4>
                          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {selectedUseCase.technicalSpecs.module}
                          </p>
                        </div>
                        
                        {selectedUseCase.technicalSpecs.minVersion && (
                          <div>
                            <h4 className="font-semibold mb-3 text-slate-800 dark:text-slate-200" style={{ fontFamily: 'Inter, sans-serif' }}>Minimum Version</h4>
                            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {selectedUseCase.technicalSpecs.minVersion}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-5 text-indigo-900 dark:text-indigo-100" style={{ fontFamily: 'Inter, sans-serif' }}>Tags</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedUseCase.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-white/60 dark:bg-gray-800/60 border-violet-300 dark:border-violet-700 text-violet-800 dark:text-violet-200 px-4 py-2 text-sm font-medium">
                            {tag}
                          </Badge>
                        ))}
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
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SapAiUseCasesExplorer;