import React, { useState, useEffect } from "react";
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
  Layers,
  Bot,
  Zap,
  Brain,
  MessageSquare,
  BarChart3,
  Lightbulb
} from "lucide-react";
import JouleLogo from "@/components/logos/joule-logo";
import SapAiUseCasesExplorer from "@/components/sap-ai-use-cases-explorer-simplified";

const JouleExplorer: React.FC = () => {
  return (
    <section className="apple-section">
      <div className="apple-container">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            SAP AI Solution Explorer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Discover intelligent AI-powered business processes and capabilities
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="business-ai" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="business-ai">Business AI</TabsTrigger>
            <TabsTrigger value="joule">Joule</TabsTrigger>
          </TabsList>

          <TabsContent value="business-ai" className="space-y-6">
            <SapAiUseCasesExplorer />
          </TabsContent>

          <TabsContent value="joule" className="space-y-6">
            <div className="apple-container">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <div className="flex justify-center mb-8">
                  <JouleLogo width={75} height={30} className="mb-4" />
                </div>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  SAP's AI copilot that transforms how you work with enterprise data. Built into the heart of SAP applications, 
                  Joule understands your business context and delivers intelligent assistance exactly when you need it.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200" style={{ fontFamily: 'Inter, sans-serif' }}>Contextual AI</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full">
                    <MessageSquare className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-200" style={{ fontFamily: 'Inter, sans-serif' }}>Natural Language</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-900/20 px-4 py-2 rounded-full">
                    <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-200" style={{ fontFamily: 'Inter, sans-serif' }}>Real-time Insights</span>
                  </div>
                  <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-900/20 px-4 py-2 rounded-full">
                    <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200" style={{ fontFamily: 'Inter, sans-serif' }}>Proactive Guidance</span>
                  </div>
                </div>
              </div>

              {/* Key Capabilities */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Revolutionary AI Capabilities
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-2xl">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Natural Conversations</h3>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Ask questions in plain language and get intelligent responses that understand your business context and role.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-2xl">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Smart Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Surface critical insights from your enterprise data with AI-powered analysis and predictive capabilities.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 p-8 rounded-2xl">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Automated Actions</h3>
                    <p className="text-gray-600 dark:text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Execute complex business processes with simple commands, reducing manual work and improving efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Use Cases Section */}
              <div className="explorer-header">
                <div className="explorer-title-container">
                  <div className="text-center">
                    <h2 className="page-title text-primary" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Joule Use Cases
                    </h2>
                    <p className="explorer-subtitle" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Intelligent AI Agents in Action
                    </p>
                  </div>
                </div>
                <p className="section-description max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Explore real-world scenarios where SAP Joule transforms business operations through intelligent automation, 
                  proactive insights, and seamless user experiences across all SAP applications.
                </p>
              </div>

              {/* Placeholder for the rest of the Joule content */}
              <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Joule use cases explorer will be implemented here
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default JouleExplorer;