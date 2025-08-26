import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ChevronDown, ChevronRight } from "lucide-react";
// import { valueChainStructure, sapUseCasesData, type ExtendedUseCase } from "@/lib/sap-use-cases-data";

// Temporary mock data - to be replaced with your manual data
const valueChainStructure: any = {};

interface ValueChainExplorerProps {
  useCases?: any[];
}

export default function ValueChainExplorer({ useCases = [] }: ValueChainExplorerProps) {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [heatmapMode, setHeatmapMode] = useState<'pain' | 'opportunities' | 'usage'>('pain');

  // Calculate heatmap intensity for each value chain
  const valueChainHeatmap = useMemo(() => {
    const heatmap: Record<string, number> = {};
    
    Object.keys(valueChainStructure).forEach(chainId => {
      const chainUseCases = useCases.filter(uc => 
        uc.valueChain?.toLowerCase().replace(/\s+/g, '_') === chainId
      );
      
      switch (heatmapMode) {
        case 'pain':
          // Count pain points (using complexity as proxy)
          heatmap[chainId] = chainUseCases.filter(uc => 
            uc.complexity === 'High' || uc.complexity === 'Medium'
          ).length;
          break;
        case 'opportunities':
          // Count available use cases
          heatmap[chainId] = chainUseCases.length;
          break;
        case 'usage':
          // Count companies started (from metrics)
          heatmap[chainId] = chainUseCases.reduce((acc, uc) => {
            const companiesMetric = uc.metrics?.find((m: string) => m.includes('companies'));
            if (companiesMetric) {
              const match = companiesMetric.match(/(\d+)/);
              return acc + (match ? parseInt(match[1]) : 0);
            }
            return acc;
          }, 0);
          break;
      }
    });
    
    return heatmap;
  }, [useCases, heatmapMode]);

  // Get max value for normalization
  const maxHeatmapValue = Math.max(...Object.values(valueChainHeatmap));

  // Get heatmap intensity (0-1)
  const getHeatmapIntensity = (chainId: string) => {
    if (maxHeatmapValue === 0) return 0;
    return valueChainHeatmap[chainId] / maxHeatmapValue;
  };

  // Get heatmap color class
  const getHeatmapColor = (chainId: string) => {
    const intensity = getHeatmapIntensity(chainId);
    if (intensity === 0) return 'bg-gray-100 border-gray-200';
    if (intensity <= 0.3) return 'bg-green-100 border-green-300';
    if (intensity <= 0.6) return 'bg-yellow-100 border-yellow-300';
    if (intensity <= 0.8) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  // Get use cases for selected value chain
  const getUseCasesForChain = (chainId: string) => {
    return useCases.filter(uc => 
      uc.valueChain?.toLowerCase().replace(/\s+/g, '_') === chainId
    );
  };

  // Get use cases for selected process
  const getUseCasesForProcess = (processName: string) => {
    return useCases.filter(uc => 
      uc.implementationSteps?.some((step: string) => 
        step.toLowerCase().includes(processName.toLowerCase().split(' ')[0])
      )
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-premium">
            Value Chain Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive value chain analysis with pain point heatmaps and solution mapping.
          </p>
        </div>

        {/* Heatmap Controls */}
        <div className="mb-8 flex justify-center space-x-4">
          <Button
            variant={heatmapMode === 'pain' ? 'default' : 'outline'}
            onClick={() => setHeatmapMode('pain')}
            className="active-filter"
          >
            Pain Points
          </Button>
          <Button
            variant={heatmapMode === 'opportunities' ? 'default' : 'outline'}
            onClick={() => setHeatmapMode('opportunities')}
          >
            Opportunities
          </Button>
          <Button
            variant={heatmapMode === 'usage' ? 'default' : 'outline'}
            onClick={() => setHeatmapMode('usage')}
          >
            Usage Metrics
          </Button>
        </div>

        {/* Main Value Chain Bar */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Enterprise Value Chain</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {Object.entries(valueChainStructure).map(([chainId, chain]: [string, any]) => {
              const isSelected = selectedChain === chainId;
              const intensity = getHeatmapIntensity(chainId);
              const heatmapColor = getHeatmapColor(chainId);
              
              return (
                <Card
                  key={chainId}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  } ${heatmapColor}`}
                  onClick={() => {
                    setSelectedChain(isSelected ? null : chainId);
                    setSelectedProcess(null);
                  }}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${chain.color} mx-auto mb-3 flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {chain.name.charAt(0)}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">
                        {chain.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-3">
                        {chain.description}
                      </p>
                      <div className="flex justify-center items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {valueChainHeatmap[chainId] || 0}
                        </Badge>
                        {isSelected ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Process Modules (shown when a value chain is selected) */}
        {selectedChain && (
          <div className="mb-8 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {(valueChainStructure as any)[selectedChain]?.name} - Process Modules
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedChain(null);
                  setSelectedProcess(null);
                }}
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {valueChainStructure[selectedChain].processes.map((process: any, index: number) => {
                const isSelected = selectedProcess === process;
                const processUseCases = getUseCasesForProcess(process);
                
                return (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedProcess(isSelected ? null : process)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 mb-2">
                            {process}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="text-xs">
                              {processUseCases.length} use cases
                            </Badge>
                          </div>
                        </div>
                        {isSelected ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Use Cases Panel */}
        {(selectedChain || selectedProcess) && (
          <div className="animate-in slide-in-from-bottom duration-300">
            <Card className="glass-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-gray-900">
                  {selectedProcess ? `${selectedProcess} - Use Cases` : 
                   selectedChain ? `${valueChainStructure[selectedChain].name} - Use Cases` : 
                   'Use Cases'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(selectedProcess ? 
                    getUseCasesForProcess(selectedProcess) : 
                    selectedChain ? getUseCasesForChain(selectedChain) : []
                  ).map((useCase) => (
                    <Card key={useCase.id} className="use-case-card hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${useCase.backgroundColor} mr-4`}>
                            <div className="w-6 h-6 bg-blue-600 rounded"></div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              useCase.complexity === 'Low' ? 'border-green-500 text-green-700' :
                              useCase.complexity === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                              'border-red-500 text-red-700'
                            }`}
                          >
                            {useCase.complexity}
                          </Badge>
                        </div>
                        
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {useCase.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {useCase.description}
                        </p>
                        
                        <div className="space-y-2 text-xs text-gray-500">
                          <div><strong>Function:</strong> {useCase.businessFunction}</div>
                          <div><strong>Industry:</strong> {useCase.industry}</div>
                          <div><strong>Value:</strong> {useCase.businessValue}</div>
                        </div>
                        
                        {useCase.metrics && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-500">
                              {useCase.metrics.slice(0, 2).join(' • ')}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {((selectedProcess ? getUseCasesForProcess(selectedProcess) : 
                   selectedChain ? getUseCasesForChain(selectedChain) : []).length === 0) && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl">🔍</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Use Cases Found</h3>
                    <p className="text-gray-500">
                      No use cases are currently mapped to this {selectedProcess ? 'process' : 'value chain area'}.
                      This represents a potential opportunity for solution development.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
              <span>Low Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
              <span>Medium Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
              <span>High Activity</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}