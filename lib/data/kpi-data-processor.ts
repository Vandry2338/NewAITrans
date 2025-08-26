import apqcData from './APQC_Ultimate_Framework_All_Benchmarking.json';

// Interface for our KPI structure
export interface KPI {
  id: string;
  name: string;
  description: string;
  unit: string;
  industry: string[];
  category: string;
  businessFunction: string;
  processGroup: string;
  strategicImportance: 'Low' | 'Medium' | 'High' | 'Critical';
  implementationComplexity: 'Low' | 'Medium' | 'High';
  benchmarkingData: {
    currentValue?: number;
    targetValue?: number;
    industryAverage?: number;
    threeYearTrend?: string | null;
    vsIndustry?: string | null;
    ranking?: string | null;
    trendDirection?: 'Up' | 'Down' | 'Stable' | null;
    performanceVsPeers?: 'Above' | 'Below' | 'At par' | null;
  };
  source: string;
}

// Industries from the user's list
export const INDUSTRIES = [
  'Agriculture & Food',
  'Construction & Real Estate', 
  'Cross-Industry',
  'Education',
  'Energy & Utilities',
  'Financial Services',
  'Government & Public Sector',
  'Healthcare',
  'Hospitality & Tourism',
  'Manufacturing',
  'Media & Entertainment',
  'Pharmaceutical & Biotechnology',
  'Retail & E-Commerce',
  'Technology & Software',
  'Telecommunications',
  'Transportation & Logistics'
];

// Business functions mapping from process groups
const mapProcessGroupToBusinessFunction = (processGroup: string): string => {
  if (processGroup.includes('Financial')) return 'Finance & Accounting';
  if (processGroup.includes('Human Capital')) return 'Human Resources';
  if (processGroup.includes('Customer Service')) return 'Customer Service';
  if (processGroup.includes('Information Technology')) return 'IT & Technology';
  if (processGroup.includes('Products and Services')) return 'Operations';
  if (processGroup.includes('Marketing')) return 'Marketing & Sales';
  if (processGroup.includes('Assets')) return 'Asset Management';
  if (processGroup.includes('Risk')) return 'Risk & Compliance';
  if (processGroup.includes('Vision and Strategy')) return 'Strategy & Planning';
  if (processGroup.includes('External Relationships')) return 'Partner Management';
  if (processGroup.includes('Business Capabilities')) return 'Business Development';
  return 'Cross-Functional';
};

// Extract unit from the current value or fallback to units field
const extractUnit = (metric: any): string => {
  if (metric.units) {
    switch (metric.units.toLowerCase()) {
      case 'currency': return '$';
      case 'percentage': return '%';
      case 'count': return '';
      case 'days': return 'days';
      case 'hours': return 'hrs';
      case 'minutes': return 'min';
      case 'ratio': return 'ratio';
      default: return metric.units;
    }
  }
  
  // Extract from current value if available
  if (metric.benchmarking_data?.current_value) {
    const currentValue = metric.benchmarking_data.current_value.toString();
    if (currentValue.includes('%')) return '%';
    if (currentValue.includes('$')) return '$';
    if (currentValue.includes('days')) return 'days';
    if (currentValue.includes('hrs')) return 'hrs';
    if (currentValue.includes('min')) return 'min';
  }
  
  return '';
};

// Extract numeric value from a string like "$14,174,522.54" or "8.7%"
const extractNumericValue = (value: string | number | null): number | undefined => {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'number') return value;
  if (!value) return undefined;
  
  const numericString = value.toString().replace(/[^\d.-]/g, '');
  const parsed = parseFloat(numericString);
  return isNaN(parsed) ? undefined : parsed;
};

// Process APQC data into our KPI structure
export const processAPQCData = (): KPI[] => {
  const kpis: KPI[] = [];
  const usedIds = new Set<string>();
  
  // Navigate through the nested structure
  const framework = apqcData.apqc_metrics_framework;
  
  Object.values(framework.categories).forEach((category: any, categoryIndex: number) => {
    if (category.metrics && Array.isArray(category.metrics)) {
      category.metrics.forEach((metric: any, metricIndex: number) => {
        // Skip metrics without proper data
        if (!metric.metric_id || !metric.name) return;
        
        // Ensure unique ID by adding category and index if needed
        let uniqueId = metric.metric_id;
        let counter = 1;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${metric.metric_id}_${categoryIndex}_${metricIndex}_${counter}`;
          counter++;
        }
        usedIds.add(uniqueId);
        
        const kpi: KPI = {
          id: uniqueId,
          name: metric.name,
          description: metric.description || '',
          unit: extractUnit(metric),
          industry: metric.industry ? [metric.industry] : ['Cross-Industry'],
          category: category.category_name || 'General',
          businessFunction: mapProcessGroupToBusinessFunction(metric.process_group || ''),
          processGroup: metric.process_group || '',
          strategicImportance: metric.strategic_importance || 'Medium',
          implementationComplexity: metric.implementation_complexity || 'Medium',
          benchmarkingData: {
            currentValue: extractNumericValue(metric.benchmarking_data?.current_value),
            targetValue: extractNumericValue(metric.benchmarking_data?.target_value),
            industryAverage: extractNumericValue(metric.benchmarking_data?.industry_average),
            threeYearTrend: metric.benchmarking_data?.three_year_trend || null,
            vsIndustry: metric.benchmarking_data?.vs_industry || null,
            ranking: metric.benchmarking_data?.ranking || null,
            trendDirection: metric.benchmarking_data?.trend_direction || null,
            performanceVsPeers: metric.benchmarking_data?.performance_vs_peers || null
          },
          source: metric.source_platform || 'APQC'
        };
        
        kpis.push(kpi);
      });
    }
  });
  
  return kpis;
};

// Get all KPIs
export const getAllKPIs = (): KPI[] => {
  return processAPQCData();
};

// Filter KPIs by industry
export const getKPIsByIndustry = (industry: string): KPI[] => {
  const allKPIs = getAllKPIs();
  if (industry === 'All Industries') return allKPIs;
  return allKPIs.filter(kpi => kpi.industry.includes(industry));
};

// Get KPIs by business function
export const getKPIsByBusinessFunction = (businessFunction: string): KPI[] => {
  const allKPIs = getAllKPIs();
  if (businessFunction === 'All Functions') return allKPIs;
  return allKPIs.filter(kpi => kpi.businessFunction === businessFunction);
};

// Search KPIs
export const searchKPIs = (query: string): KPI[] => {
  const allKPIs = getAllKPIs();
  const lowercaseQuery = query.toLowerCase();
  return allKPIs.filter(kpi => 
    kpi.name.toLowerCase().includes(lowercaseQuery) ||
    kpi.description.toLowerCase().includes(lowercaseQuery) ||
    kpi.category.toLowerCase().includes(lowercaseQuery)
  );
};
