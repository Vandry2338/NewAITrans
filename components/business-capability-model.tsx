import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const BusinessCapabilityModel: React.FC = () => {
  // BCM Heat Map Data
  const bcmData = {
    domains: [
      {
        name: 'Finance & Accounting',
        groups: [
          {
            title: 'Financial Accounting',
            capabilities: [
              { name: 'General Ledger', status: 'optimized' },
              { name: 'Accounts Payable', status: 'optimized' },
              { name: 'Accounts Receivable', status: 'enabled' },
              { name: 'Asset Management', status: 'needs-improvement' },
              { name: 'Cash Management', status: 'optimized' }
            ]
          },
          {
            title: 'Management Accounting',
            capabilities: [
              { name: 'Cost Centers', status: 'enabled' },
              { name: 'Profitability Analysis', status: 'needs-improvement' },
              { name: 'Transfer Pricing', status: 'pain-point' },
              { name: 'Product Costing', status: 'enabled' }
            ]
          },
          {
            title: 'Financial Planning',
            capabilities: [
              { name: 'Budgeting & Forecasting', status: 'needs-improvement' },
              { name: 'Financial Consolidation', status: 'pain-point' },
              { name: 'Management Reporting', status: 'enabled' }
            ]
          },
          {
            title: 'Treasury & Risk',
            capabilities: [
              { name: 'Treasury Management', status: 'enabled' },
              { name: 'Risk Management', status: 'needs-improvement' },
              { name: 'Payment Processing', status: 'optimized' }
            ]
          }
        ]
      },
      {
        name: 'Procurement',
        groups: [
          {
            title: 'Strategic Sourcing',
            capabilities: [
              { name: 'Supplier Management', status: 'pain-point' },
              { name: 'Category Management', status: 'needs-improvement' },
              { name: 'Contract Management', status: 'enabled' },
              { name: 'Supplier Qualification', status: 'needs-improvement' }
            ]
          },
          {
            title: 'Operational Procurement',
            capabilities: [
              { name: 'Purchase Requisitioning', status: 'optimized' },
              { name: 'Purchase Orders', status: 'optimized' },
              { name: 'Goods Receipt', status: 'enabled' },
              { name: 'Invoice Processing', status: 'needs-improvement' },
              { name: 'Catalog Management', status: 'optimized' }
            ]
          },
          {
            title: 'Spend Management',
            capabilities: [
              { name: 'Spend Analytics', status: 'needs-improvement' },
              { name: 'Budget Control', status: 'pain-point' },
              { name: 'Savings Tracking', status: 'enabled' }
            ]
          },
          {
            title: 'External Services',
            capabilities: [
              { name: 'Service Procurement', status: 'enabled' },
              { name: 'Contingent Workforce', status: 'needs-improvement' }
            ]
          }
        ]
      },
      {
        name: 'Operations',
        groups: [
          {
            title: 'Production Planning',
            capabilities: [
              { name: 'Master Production Schedule', status: 'optimized' },
              { name: 'Material Requirements Planning', status: 'enabled' },
              { name: 'Capacity Planning', status: 'needs-improvement' },
              { name: 'Production Orders', status: 'optimized' }
            ]
          },
          {
            title: 'Supply Chain',
            capabilities: [
              { name: 'Demand Planning', status: 'enabled' },
              { name: 'Inventory Management', status: 'optimized' },
              { name: 'Transportation', status: 'needs-improvement' },
              { name: 'Warehouse Management', status: 'enabled' }
            ]
          },
          {
            title: 'Quality & Maintenance',
            capabilities: [
              { name: 'Quality Management', status: 'enabled' },
              { name: 'Plant Maintenance', status: 'needs-improvement' },
              { name: 'Predictive Maintenance', status: 'pain-point' }
            ]
          },
          {
            title: 'Manufacturing Execution',
            capabilities: [
              { name: 'Production Execution', status: 'optimized' },
              { name: 'Shop Floor Control', status: 'enabled' }
            ]
          }
        ]
      },
      {
        name: 'Sales & Marketing',
        groups: [
          {
            title: 'Customer Management',
            capabilities: [
              { name: 'Customer Data Management', status: 'pain-point' },
              { name: 'Customer Segmentation', status: 'needs-improvement' },
              { name: 'Sales Order Management', status: 'optimized' },
              { name: 'Quotation Management', status: 'enabled' }
            ]
          },
          {
            title: 'Marketing & Commerce',
            capabilities: [
              { name: 'Campaign Management', status: 'needs-improvement' },
              { name: 'Marketing Automation', status: 'pain-point' },
              { name: 'Lead Management', status: 'enabled' },
              { name: 'E-Commerce', status: 'needs-improvement' }
            ]
          },
          {
            title: 'Revenue Management',
            capabilities: [
              { name: 'Pricing Management', status: 'optimized' },
              { name: 'Revenue Recognition', status: 'enabled' },
              { name: 'Billing & Invoicing', status: 'optimized' }
            ]
          },
          {
            title: 'Customer Experience',
            capabilities: [
              { name: 'Customer Service', status: 'needs-improvement' },
              { name: 'Customer Analytics', status: 'pain-point' }
            ]
          }
        ]
      },
      {
        name: 'Human Resources',
        groups: [
          {
            title: 'Core HR',
            capabilities: [
              { name: 'Employee Central', status: 'optimized' },
              { name: 'Payroll Processing', status: 'optimized' },
              { name: 'Time & Attendance', status: 'enabled' },
              { name: 'Benefits Administration', status: 'enabled' }
            ]
          },
          {
            title: 'Talent Management',
            capabilities: [
              { name: 'Recruiting', status: 'enabled' },
              { name: 'Performance Management', status: 'needs-improvement' },
              { name: 'Succession Planning', status: 'pain-point' },
              { name: 'Goal Management', status: 'enabled' }
            ]
          },
          {
            title: 'Learning & Development',
            capabilities: [
              { name: 'Learning Management', status: 'needs-improvement' },
              { name: 'Skills Management', status: 'pain-point' },
              { name: 'Training Administration', status: 'enabled' }
            ]
          },
          {
            title: 'Workforce Analytics',
            capabilities: [
              { name: 'Workforce Planning', status: 'needs-improvement' },
              { name: 'People Analytics', status: 'pain-point' }
            ]
          }
        ]
      },
      {
        name: 'Technology & Integration',
        groups: [
          {
            title: 'Platform Services',
            capabilities: [
              { name: 'SAP BTP', status: 'optimized' },
              { name: 'HANA Cloud', status: 'enabled' },
              { name: 'Integration Suite', status: 'needs-improvement' },
              { name: 'API Management', status: 'enabled' }
            ]
          },
          {
            title: 'Development & Extensions',
            capabilities: [
              { name: 'SAP Build Apps', status: 'needs-improvement' },
              { name: 'Process Automation', status: 'pain-point' },
              { name: 'ABAP Cloud', status: 'enabled' }
            ]
          },
          {
            title: 'Data & Analytics',
            capabilities: [
              { name: 'Analytics Cloud', status: 'enabled' },
              { name: 'Datasphere', status: 'needs-improvement' },
              { name: 'Data Intelligence', status: 'pain-point' }
            ]
          },
          {
            title: 'AI & Innovation',
            capabilities: [
              { name: 'Joule AI Copilot', status: 'needs-improvement' },
              { name: 'AI Core', status: 'pain-point' },
              { name: 'Vector Engine', status: 'not-applicable' }
            ]
          }
        ]
      },
      {
        name: 'Governance & Risk',
        groups: [
          {
            title: 'GRC Management',
            capabilities: [
              { name: 'Access Control', status: 'enabled' },
              { name: 'Process Control', status: 'needs-improvement' },
              { name: 'Risk Management', status: 'pain-point' },
              { name: 'Audit Management', status: 'enabled' }
            ]
          },
          {
            title: 'Security & Identity',
            capabilities: [
              { name: 'Identity Management', status: 'optimized' },
              { name: 'Security Operations', status: 'enabled' },
              { name: 'Data Privacy', status: 'enabled' }
            ]
          },
          {
            title: 'Compliance',
            capabilities: [
              { name: 'Regulatory Compliance', status: 'enabled' },
              { name: 'Policy Management', status: 'needs-improvement' },
              { name: 'Compliance Reporting', status: 'enabled' }
            ]
          },
          {
            title: 'Sustainability',
            capabilities: [
              { name: 'Sustainability Reporting', status: 'pain-point' },
              { name: 'Carbon Management', status: 'needs-improvement' },
              { name: 'ESG Analytics', status: 'pain-point' }
            ]
          }
        ]
      }
    ]
  };

  const getCapabilityColor = (status: string) => {
    switch (status) {
      case 'pain-point': return 'bg-red-500 text-white';
      case 'needs-improvement': return 'bg-yellow-500 text-black';
      case 'optimized': return 'bg-green-500 text-white';
      case 'not-applicable': return 'bg-gray-500 text-white';
      case 'enabled': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  // Enterprise Assessment Data
  const assessmentDomains = [
    {
      domain: 'Finance & Accounting',
      assessments: [
        { name: 'General Ledger Operations', status: 'optimized' },
        { name: 'Financial Planning & Analysis', status: 'needs-improvement' },
        { name: 'Treasury & Cash Management', status: 'enabled' },
        { name: 'Tax Management', status: 'enabled' },
        { name: 'Financial Consolidation', status: 'pain-point' },
        { name: 'Risk & Compliance', status: 'needs-improvement' }
      ]
    },
    {
      domain: 'Procurement',
      assessments: [
        { name: 'Supplier Management', status: 'pain-point' },
        { name: 'Strategic Sourcing', status: 'needs-improvement' },
        { name: 'Purchase-to-Pay Process', status: 'optimized' },
        { name: 'Spend Analytics', status: 'needs-improvement' },
        { name: 'Contract Management', status: 'enabled' },
        { name: 'Supplier Risk Management', status: 'pain-point' }
      ]
    },
    {
      domain: 'Operations',
      assessments: [
        { name: 'Production Planning', status: 'optimized' },
        { name: 'Supply Chain Planning', status: 'enabled' },
        { name: 'Warehouse Management', status: 'enabled' },
        { name: 'Quality Management', status: 'enabled' },
        { name: 'Plant Maintenance', status: 'needs-improvement' },
        { name: 'Manufacturing Intelligence', status: 'optimized' }
      ]
    },
    {
      domain: 'Sales & Marketing',
      assessments: [
        { name: 'Customer Data Management', status: 'pain-point' },
        { name: 'Sales Order Processing', status: 'optimized' },
        { name: 'Marketing Automation', status: 'pain-point' },
        { name: 'Customer Experience', status: 'needs-improvement' },
        { name: 'E-Commerce Platform', status: 'needs-improvement' },
        { name: 'Pricing & Revenue', status: 'optimized' }
      ]
    },
    {
      domain: 'Human Resources',
      assessments: [
        { name: 'Employee Central', status: 'optimized' },
        { name: 'Talent Management', status: 'enabled' },
        { name: 'Performance Management', status: 'needs-improvement' },
        { name: 'Learning & Development', status: 'needs-improvement' },
        { name: 'Workforce Analytics', status: 'pain-point' },
        { name: 'Succession Planning', status: 'pain-point' }
      ]
    },
    {
      domain: 'Technology & Integration',
      assessments: [
        { name: 'SAP Business Technology Platform', status: 'optimized' },
        { name: 'Integration & APIs', status: 'needs-improvement' },
        { name: 'Data Management', status: 'enabled' },
        { name: 'Analytics & BI', status: 'enabled' },
        { name: 'AI & Machine Learning', status: 'pain-point' },
        { name: 'Process Automation', status: 'pain-point' }
      ]
    },
    {
      domain: 'Governance & Risk',
      assessments: [
        { name: 'Access Control', status: 'enabled' },
        { name: 'Risk Management', status: 'pain-point' },
        { name: 'Compliance Management', status: 'enabled' },
        { name: 'Audit Management', status: 'enabled' },
        { name: 'Security & Identity', status: 'optimized' },
        { name: 'Sustainability Reporting', status: 'pain-point' }
      ]
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pain-point': return 'bg-red-500 text-white';
      case 'needs-improvement': return 'bg-yellow-500 text-black';
      case 'optimized': return 'bg-green-500 text-white';
      case 'enabled': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pain-point': return 'Significant';
      case 'needs-improvement': return 'Gaps';
      case 'optimized': return 'Optimized';
      case 'enabled': return 'Enabled';
      default: return 'N/A';
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="bcm" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto">
          <TabsTrigger value="bcm">Business Capability Heat Map</TabsTrigger>
          <TabsTrigger value="assessment">Enterprise Assessment</TabsTrigger>
          <TabsTrigger value="strategy">Strategic Roadmap</TabsTrigger>
        </TabsList>

        {/* Business Capability Heat Map Tab */}
        <TabsContent value="bcm" className="space-y-6">
          {/* Legend */}
          <div className="flex justify-end gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              Pain Points
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded">
              Needs Improvement
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              Optimized
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
              Not Applicable
            </div>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">SAP Business Capability Heat Map</h2>
          </div>

          {/* BCM Grid */}
          <div className="border-2 border-black dark:border-gray-600 bg-white dark:bg-gray-900">
            {/* Domain Headers */}
            <div className="flex bg-black text-white">
              {bcmData.domains.map((domain, index) => (
                <div key={index} className="flex-1 text-center py-2 px-1 border-r border-white last:border-r-0 text-xs font-bold min-h-[40px] flex items-center justify-center">
                  {domain.name}
                </div>
              ))}
            </div>

            {/* Capabilities Grid */}
            <div className="flex min-h-[500px]">
              {bcmData.domains.map((domain, domainIndex) => (
                <div key={domainIndex} className="flex-1 border-r border-black dark:border-gray-600 last:border-r-0 flex flex-col">
                  {domain.groups.map((group, groupIndex) => (
                    <div key={groupIndex} className="border-b border-gray-300 dark:border-gray-700 last:border-b-0 flex-1">
                      <div className="text-[10px] font-bold text-center py-1 px-1 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
                        {group.title}
                      </div>
                      <div className="flex flex-col gap-[2px] p-1">
                        {group.capabilities.map((capability, capIndex) => (
                          <div
                            key={capIndex}
                            className={`px-1 py-[2px] text-[9px] font-medium text-center rounded-sm cursor-pointer transition-all hover:scale-105 ${getCapabilityColor(capability.status)}`}
                          >
                            {capability.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Technology Enablers Section */}
          <div className="border-2 border-blue-500 bg-gray-50 dark:bg-gray-800 p-4 mt-6">
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-3">Key Technology Enablers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['SAP Joule AI Copilot', 'SAP Build', 'Process Mining', 'RPA Automation', 
                'Analytics Cloud', 'Master Data Governance', 'Integration Suite', 'Data Intelligence'].map((tech, index) => (
                <div key={index} className="bg-blue-500 text-white px-3 py-2 rounded text-xs font-semibold text-center cursor-pointer hover:bg-blue-600 transition-colors">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Enterprise Assessment Tab */}
        <TabsContent value="assessment" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Enterprise Capability Assessment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessmentDomains.map((domain, index) => (
              <Card key={index} className="apple-surface border border-gray-200 dark:border-gray-700">
                <CardHeader className="bg-gray-800 dark:bg-gray-900 text-white py-3">
                  <CardTitle className="text-sm font-bold text-center">{domain.domain}</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  {domain.assessments.map((assessment, assessIndex) => (
                    <div key={assessIndex} className="flex justify-between items-center py-2 px-3 mb-1 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1">
                        {assessment.name}
                      </span>
                      <Badge className={`${getStatusBadgeColor(assessment.status)} text-[10px] px-2 py-0 min-w-[60px] text-center`}>
                        {getStatusLabel(assessment.status)}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Assessment Summary */}
          <Card className="apple-surface mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Assessment Summary & Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="text-red-600 dark:text-red-400 font-bold mb-2">Significant Gaps (Priority 1)</h4>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Supplier Management & Supplier Risk</li>
                    <li>• Customer Data Management & Marketing Automation</li>
                    <li>• Workforce Analytics & Succession Planning</li>
                    <li>• AI/ML Capabilities & Process Automation</li>
                    <li>• Risk Management & Sustainability Reporting</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="text-yellow-700 dark:text-yellow-400 font-bold mb-2">Some Gaps (Priority 2)</h4>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Financial Planning & Analysis</li>
                    <li>• Spend Analytics & Strategic Sourcing</li>
                    <li>• Plant Maintenance & Predictive Maintenance</li>
                    <li>• Customer Experience & E-Commerce</li>
                    <li>• Performance Mgmt & Learning Development</li>
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="text-green-700 dark:text-green-400 font-bold mb-2">Optimized Capabilities</h4>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Financial Accounting & GL Operations</li>
                    <li>• Purchase-to-Pay Processes</li>
                    <li>• Production Planning & Manufacturing</li>
                    <li>• Sales Order Processing & Pricing</li>
                    <li>• Employee Central & Core HR</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Roadmap Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Strategic Transformation Roadmap (2025-2027)</h2>
          </div>

          {/* Priority Matrix */}
          <Card className="apple-surface">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-center">Investment Priority Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-500 text-white p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">High Impact / High Effort</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Comprehensive AI/ML Platform Implementation</li>
                    <li>• Customer 360° Data Platform</li>
                    <li>• Advanced Risk Management System</li>
                    <li>• End-to-End Supplier Management</li>
                    <li>• Workforce Analytics & Planning</li>
                  </ul>
                </div>
                <div className="bg-green-500 text-white p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">High Impact / Low Effort</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Joule AI Copilot Deployment</li>
                    <li>• SAP Analytics Cloud Enhancement</li>
                    <li>• Process Automation Quick Wins</li>
                    <li>• Financial Planning Optimization</li>
                    <li>• Spend Visibility Dashboard</li>
                  </ul>
                </div>
                <div className="bg-yellow-500 text-black p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">Low Impact / Low Effort</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Standard Report Enhancements</li>
                    <li>• User Interface Improvements</li>
                    <li>• Basic Integration Cleanup</li>
                    <li>• Documentation Updates</li>
                    <li>• Training Program Refresh</li>
                  </ul>
                </div>
                <div className="bg-gray-500 text-white p-4 rounded-lg">
                  <h4 className="font-bold text-center mb-3">Low Impact / High Effort</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Legacy System Replacement</li>
                    <li>• Custom Development Migration</li>
                    <li>• Complex Integration Projects</li>
                    <li>• Organizational Restructuring</li>
                    <li>• Vendor Consolidation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transformation Phases */}
          <Card className="apple-surface">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Three-Phase Transformation Strategy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-blue-500 rounded-lg p-4">
                  <h4 className="text-blue-600 dark:text-blue-400 font-bold mb-2">Phase 1: Foundation (Q3-Q4 2025)</h4>
                  <p className="text-sm font-semibold mb-2">Focus: Quick Wins & AI Enablement</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Deploy Joule AI Copilot across core processes</li>
                    <li>• Implement SAP Analytics Cloud enhancements</li>
                    <li>• Establish data governance framework</li>
                    <li>• Launch process mining initiatives</li>
                    <li>• Complete integration assessment</li>
                  </ul>
                </div>

                <div className="border-2 border-indigo-500 rounded-lg p-4">
                  <h4 className="text-indigo-600 dark:text-indigo-400 font-bold mb-2">Phase 2: Acceleration (2026)</h4>
                  <p className="text-sm font-semibold mb-2">Focus: Process Transformation & AI Scaling</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Roll out end-to-end process automation</li>
                    <li>• Implement customer 360° platform</li>
                    <li>• Deploy advanced analytics across operations</li>
                    <li>• Transform supplier management processes</li>
                    <li>• Establish AI CoE (Center of Excellence)</li>
                  </ul>
                </div>

                <div className="border-2 border-purple-500 rounded-lg p-4">
                  <h4 className="text-purple-600 dark:text-purple-400 font-bold mb-2">Phase 3: Innovation (2027)</h4>
                  <p className="text-sm font-semibold mb-2">Focus: Industry Leadership & Autonomous Operations</p>
                  <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Achieve autonomous process optimization</li>
                    <li>• Implement predictive business operations</li>
                    <li>• Lead industry in sustainability reporting</li>
                    <li>• Complete digital workforce transformation</li>
                    <li>• Establish innovation ecosystem</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessCapabilityModel;