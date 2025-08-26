import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronRight, ExternalLink } from "lucide-react";
import BusinessCapabilityModel from "./business-capability-model";

type ViewMode = "industry" | "sap" | "both";

type ValueChain = {
  id: string;
  name: string;
  blocks: ValueChainBlock[];
};

type ValueChainBlock = {
  id: string;
  name: string;
  accentColor: string;
  heat: number; // 0–100
  modules: ProcessModule[];
  mappedTo?: string[]; // ids of mapped blocks in other chain
};

type ProcessModule = {
  id: string;
  name: string;
  heat: number;
  painPoints: string[];
  useCases: string[];
  personas: string[];
  kpis: string[];
  mappedTo?: string; // id of mapped process in other chain
};

const industryValueChain: ValueChain = {
  id: "industry",
  name: "Industry Value Chain",
  blocks: [
    {
      id: "product-offer",
      name: "Product & Offer",
      accentColor: "#007CC2",
      heat: 85,
      mappedTo: ["lead-to-cash"],
      modules: [
        {
          id: "product-design",
          name: "Product Design",
          heat: 90,
          painPoints: ["Long design cycles", "Market misalignment", "Feature complexity"],
          useCases: ["AI-driven product recommendations", "Market trend analysis", "Customer feedback integration"],
          personas: ["Product Manager", "UX Designer", "Market Analyst"],
          kpis: ["Time to market", "Feature adoption rate", "Customer satisfaction"],
          mappedTo: "opportunity-management"
        },
        {
          id: "pricing-strategy",
          name: "Pricing Strategy",
          heat: 75,
          painPoints: ["Dynamic pricing challenges", "Competitive analysis", "Revenue optimization"],
          useCases: ["Dynamic pricing models", "Competitive intelligence", "Revenue forecasting"],
          personas: ["Pricing Analyst", "Revenue Manager", "Sales Director"],
          kpis: ["Price elasticity", "Revenue per customer", "Market share"],
          mappedTo: "quote-management"
        }
      ]
    },
    {
      id: "customer-experience",
      name: "Customer Experience",
      accentColor: "#2ECC71",
      heat: 78,
      mappedTo: ["lead-to-cash"],
      modules: [
        {
          id: "customer-journey",
          name: "Customer Journey",
          heat: 82,
          painPoints: ["Journey fragmentation", "Touchpoint inconsistency", "Experience measurement"],
          useCases: ["Journey orchestration", "Omnichannel integration", "Experience analytics"],
          personas: ["Customer Success Manager", "UX Designer", "Marketing Manager"],
          kpis: ["Customer satisfaction", "Net promoter score", "Journey completion rate"],
          mappedTo: "customer-management"
        }
      ]
    },
    {
      id: "operations",
      name: "Operations",
      accentColor: "#F39C12",
      heat: 70,
      mappedTo: ["plan-to-fulfill"],
      modules: [
        {
          id: "supply-chain",
          name: "Supply Chain",
          heat: 65,
          painPoints: ["Supply disruptions", "Inventory optimization", "Supplier management"],
          useCases: ["Predictive supply planning", "Supplier risk assessment", "Inventory optimization"],
          personas: ["Supply Chain Manager", "Procurement Specialist", "Operations Director"],
          kpis: ["Supply chain efficiency", "Inventory turnover", "Supplier performance"],
          mappedTo: "supply-planning"
        }
      ]
    }
  ]
};

const sapValueChain: ValueChain = {
  id: "sap",
  name: "SAP Value Chain",
  blocks: [
    {
      id: "lead-to-cash",
      name: "Lead to Cash",
      accentColor: "#007CC2",
      heat: 88,
      mappedTo: ["product-offer", "customer-experience"],
      modules: [
        {
          id: "opportunity-management",
          name: "Opportunity Management",
          heat: 85,
          painPoints: ["Lead qualification", "Opportunity scoring", "Sales pipeline visibility"],
          useCases: ["AI-powered lead scoring", "Predictive sales analytics", "Automated opportunity routing"],
          personas: ["Sales Manager", "Account Executive", "Sales Operations"],
          kpis: ["Lead conversion rate", "Sales cycle time", "Pipeline velocity"],
          mappedTo: "product-design"
        },
        {
          id: "quote-management",
          name: "Quote Management",
          heat: 90,
          painPoints: ["Complex pricing", "Quote approval delays", "Configuration errors"],
          useCases: ["Dynamic pricing", "Automated approvals", "Product configuration"],
          personas: ["Sales Rep", "Pricing Manager", "Sales Engineer"],
          kpis: ["Quote accuracy", "Approval time", "Win rate"],
          mappedTo: "pricing-strategy"
        }
      ]
    },
    {
      id: "plan-to-fulfill",
      name: "Plan to Fulfill",
      accentColor: "#F39C12",
      heat: 75,
      mappedTo: ["operations"],
      modules: [
        {
          id: "supply-planning",
          name: "Supply Planning",
          heat: 70,
          painPoints: ["Demand forecasting", "Supply variability", "Planning accuracy"],
          useCases: ["Demand sensing", "Supply optimization", "Collaborative planning"],
          personas: ["Supply Planner", "Demand Planner", "Operations Manager"],
          kpis: ["Forecast accuracy", "Service level", "Inventory optimization"],
          mappedTo: "supply-chain"
        }
      ]
    }
  ]
};

// Business Capability Model Section Component
const BusinessCapabilityModelSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Business Capability Model</h2>
        <p className="text-gray-600 dark:text-gray-300">Strategic capabilities assessment and transformation roadmap</p>
      </div>
      
      <BusinessCapabilityModel />
    </div>
  );
};

// Main component
export default function DualValueChainExplorer() {
  const [viewMode, setViewMode] = useState<ViewMode>("both");
  const [selectedModule, setSelectedModule] = useState<ProcessModule | null>(null);

  const handleViewModeChange = useCallback((newMode: ViewMode) => {
    setViewMode(newMode);
  }, []);

  const ValueChainBlock = ({ block, chainId }: { block: ValueChainBlock; chainId: string }) => (
    <div className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{block.name}</h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: block.accentColor }}></div>
          <span className="text-sm font-medium text-gray-600">{block.heat}%</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {block.modules.map((module) => (
          <div
            key={module.id}
            className="p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 cursor-pointer transition-all duration-200"
            onClick={() => setSelectedModule(module)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{module.name}</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: module.heat > 70 ? '#ef4444' : module.heat > 40 ? '#f59e0b' : '#10b981' }}></div>
                <ChevronRight size={14} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ValueChainBar = ({ chain }: { chain: ValueChain }) => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{chain.name}</h2>
        <p className="text-gray-600">Interactive process exploration</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {chain.blocks.map((block) => (
          <ValueChainBlock key={block.id} block={block} chainId={chain.id} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* View Mode Controls */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          variant={viewMode === "industry" ? "default" : "outline"}
          onClick={() => handleViewModeChange("industry")}
          className="px-6 py-2"
        >
          Industry Focus
        </Button>
        <Button
          variant={viewMode === "sap" ? "default" : "outline"}
          onClick={() => handleViewModeChange("sap")}
          className="px-6 py-2"
        >
          SAP Focus
        </Button>
        <Button
          variant={viewMode === "both" ? "default" : "outline"}
          onClick={() => handleViewModeChange("both")}
          className="px-6 py-2"
        >
          Both Views
        </Button>
      </div>

      {/* Value Chain Display */}
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {(viewMode === "industry" || viewMode === "both") && (
            <motion.div
              key="industry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ValueChainBar chain={industryValueChain} />
            </motion.div>
          )}
          
          {(viewMode === "sap" || viewMode === "both") && (
            <motion.div
              key="sap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: viewMode === "both" ? 0.1 : 0 }}
            >
              <ValueChainBar chain={sapValueChain} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Business Capability Model Section */}
      <div className="mt-12">
        <BusinessCapabilityModelSection />
      </div>

      {/* Module Detail Modal */}
      <Dialog open={!!selectedModule} onOpenChange={() => setSelectedModule(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedModule?.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedModule(null)}>
                <X size={16} />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedModule && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedModule.heat > 70 ? '#ef4444' : selectedModule.heat > 40 ? '#f59e0b' : '#10b981' }}></div>
                <span className="text-sm font-medium">Heat Score: {selectedModule.heat}%</span>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Pain Points</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.painPoints.map((pain, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {pain}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.useCases.map((useCase, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Personas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.personas.map((persona, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {persona}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">KPIs</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedModule.kpis.map((kpi, index) => (
                    <Badge key={index} variant="outline" className="border-gray-300 text-gray-700 text-xs">
                      {kpi}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Button 
                  className="flex items-center gap-2"
                  style={{ backgroundColor: '#007CC2' }}
                >
                  <ExternalLink size={16} />
                  View Demo
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}