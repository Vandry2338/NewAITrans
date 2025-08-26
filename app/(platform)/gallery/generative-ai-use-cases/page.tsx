"use client"

import { useState } from "react"
import { Zap, FileText, Image, Video, Code, MessageSquare, Building } from "lucide-react"

export default function GenerativeAIUseCasesPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const tabs = [
    { id: "overview", label: "Overview", icon: Zap },
    { id: "text-generation", label: "Text Generation", icon: FileText },
    { id: "image-generation", label: "Image Generation", icon: Image },
    { id: "code-generation", label: "Code Generation", icon: Code },
    { id: "multimodal", label: "Multimodal AI", icon: Video },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold" style={{ color: "var(--text-default)" }}>
              Generative AI Use Cases
            </h1>
          </div>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "var(--text-muted)" }}>
            Generative AI applications and implementation patterns for enterprise innovation
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 rounded-lg" style={{ background: "rgba(255, 255, 255, 0.1)" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  style={{
                    background: isActive ? "var(--grad-primary)" : "transparent",
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Text Generation
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Create high-quality content for various business applications
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Content creation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Document generation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Email automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Report writing</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <Image className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Image Generation
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Generate custom images for marketing and design purposes
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Marketing visuals</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Product mockups</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Design concepts</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Brand assets</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Code Generation
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Accelerate development with AI-generated code and automation
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Code snippets</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>API generation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Test automation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Documentation</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl backdrop-blur-md border hover:shadow-lg transition-all duration-300" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--text-default)" }}>
                  Multimodal AI
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Combine multiple AI modalities for enhanced capabilities
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Text-to-image</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Image-to-text</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Video generation</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span style={{ color: "var(--text-default)" }}>Cross-modal search</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Industry Use Cases */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--text-default)" }}>
              Industry Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Marketing & Advertising
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Create compelling content and visual assets
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>50% faster content creation</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>30% increase in engagement</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Personalized campaigns</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Software Development
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Accelerate coding and testing processes
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>40% faster development</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Automated testing</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Code quality improvement</div>
                </div>
              </div>

              <div className="p-6 rounded-xl backdrop-blur-md border text-center" style={{ background: "rgba(255, 255, 255, 0.08)", borderColor: "rgba(255, 255, 255, 0.1)" }}>
                <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-default)" }}>
                  Content Creation
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                  Generate high-quality content at scale
                </p>
                <div className="space-y-2">
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>10x content production</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Consistent quality</div>
                  <div className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(0, 255, 0, 0.1)", color: "#10b981" }}>Multilingual support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
