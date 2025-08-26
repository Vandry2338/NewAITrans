// Comprehensive SAP AI Use Cases Data - Based on official SAP documentation
// Source: https://www.sap.com/products/artificial-intelligence/use-cases.html
// Updated: 2025-07-08

export interface SapAiUseCase {
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
    hasDemo?: boolean;
    screenshots?: string[];
  };
  tags: string[];
}

// Export the comprehensive data instead of the old format
export { sapAiUseCases, sapAiFilterOptions } from "./sap-ai-use-cases-comprehensive";