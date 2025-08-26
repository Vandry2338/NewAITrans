"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { useSidebar } from "./SidebarContext"

type SidebarProps = {}

const menuItems = [
  {
    label: "Intelligence Cortex",
    description: "Discovery, KPIs, Prioritized Backlog",
    href: "/intelligence",
    submenu: [
      {
        label: "KPI Catalog",
        href: "/intelligence?tab=kpi-catalog",
      },
      {
        label: "Know Your Business",
        href: "/intelligence?tab=know-your-business",
      },
      {
        label: "Two-Speed Transformation",
        href: "/intelligence?tab=two-speed-transformation",
      },
      {
        label: "Summary",
        href: "/intelligence?tab=summary",
      },
    ],
  },
  {
    label: "Generative Design Studio",
    description: "Models, Trade-offs, Diagrams-as-code",
    href: "/design",
    submenu: [
      {
        label: "Overview",
        href: "/design",
      },
      {
        label: "Design Inputs",
        href: "/design/inputs",
      },
      {
        label: "Trade-offs",
        href: "/design/tradeoffs",
      },
      {
        label: "Architecture Views",
        href: "/design/views",
      },
      {
        label: "Docs & Sync",
        href: "/design/docs",
      },
    ],
  },
  {
    label: "Release Guardrails",
    description: "Fitness Functions, Policy Gates, LLMOps",
    href: "/guard/fitness",
  },
  {
    label: "Modernization Hub",
    description: "Code Scans, Debt, Migration Plans",
    href: "/modernize/scan",
  },
  {
    label: "Control Tower",
    description: "Run Metrics, FinOps, Value Tracking",
    href: "/operate/roadmap",
  },
  {
    label: "Solutions Gallery",
    description: "Reference architectures, patterns, accelerators",
    href: "/gallery",
    submenu: [
      {
        label: "Infosys Topaz Explorer",
        href: "/gallery/topaz-explorer",
      },
      {
        label: "Signavio",
        href: "/gallery/signavio",
      },
      {
        label: "WalkMe",
        href: "/gallery/walkme",
      },
      {
        label: "AI Business",
        href: "/gallery/ai-business",
      },
      {
        label: "Generative AI Use Cases",
        href: "/gallery/generative-ai",
      },
      {
        label: "AI Agents",
        href: "/gallery/ai-agents",
      },
      {
        label: "Development Accelerators",
        href: "/gallery/accelerators-enhanced",
      },
    ],
  },
  {
    label: "Workspace Settings",
    description: "Org, Roles, Integrations, Theme",
    href: "/admin",
  },
]

export default function Sidebar({}: SidebarProps) {
  const pathname = usePathname()
  const { isExpanded, setIsExpanded } = useSidebar()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full border-r flex flex-col z-40 transition-all duration-300 ease-out ${
        isExpanded ? "w-[280px]" : "w-[80px]"
      }`}
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--grad-primary)" }}
          >
            <div className="h-5 w-5 rounded-sm bg-white/90" />
          </div>
          {isExpanded && (
            <span className="font-semibold text-base tracking-tight whitespace-nowrap" style={{ color: "var(--text)" }}>
              AI Platform
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const hasSubmenu = item.submenu && item.submenu.length > 0
            const isSubmenuExpanded = expandedItems.includes(item.label)

            return (
              <li key={item.href}>
                <div>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-[1.02] group ${
                      isActive ? "shadow-sm" : ""
                    }`}
                    style={{
                      backgroundColor: isActive ? "var(--blue-50)" : "transparent",
                      color: isActive ? "var(--blue-800)" : "var(--text)",
                      border: `1px solid ${isActive ? "var(--blue-200)" : "transparent"}`,
                    }}
                    onClick={(e) => {
                      if (hasSubmenu && isExpanded) {
                        // Allow navigation to main page, but also toggle submenu
                        toggleSubmenu(item.label)
                      }
                    }}
                  >
                    <div
                      className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-medium"
                      style={{
                        backgroundColor: isActive ? "var(--blue-600)" : "var(--surface)",
                        color: isActive ? "white" : "var(--text-muted)",
                      }}
                    >
                      {item.label
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    {isExpanded && (
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">{item.label}</div>
                        <div className="text-xs mt-0.5 opacity-70 leading-tight">{item.description}</div>
                      </div>
                    )}

                    {!isExpanded && (
                      <ChevronRightIcon className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>

                  {hasSubmenu && isExpanded && isSubmenuExpanded && (
                    <ul className="mt-2 ml-4 space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {item.submenu.map((subItem) => {
                        const isSubActive = pathname === subItem.href
                        return (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                isSubActive ? "font-medium" : ""
                              }`}
                              style={{
                                backgroundColor: isSubActive ? "var(--blue-100)" : "transparent",
                                color: isSubActive ? "var(--blue-800)" : "var(--text-muted)",
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </nav>

      {isExpanded && (
        <div className="p-3 border-t" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "var(--surface)" }}>
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
              style={{ background: "var(--grad-primary)" }}
            >
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>
                AI Assistant
              </p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                Platform Admin
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
