"use client"

import type React from "react"
import "../../styles/tokens.css"
import "../globals.css"
import Sidebar from "@/components/platform/Sidebar"
import Topbar from "@/components/platform/Topbar"
import { SidebarProvider, useSidebar } from "@/components/platform/SidebarContext"

function PlatformContent({ children }: { children: React.ReactNode }) {
  const { isExpanded } = useSidebar()

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--bg)" }}>
      <div className="fixed left-0 top-0 h-full">
        <Sidebar />
      </div>
      <main className={`flex-1 transition-all duration-300 ease-out ${isExpanded ? "ml-[280px]" : "ml-[80px]"}`}>
        <Topbar title="Platform" />
        <div className="mx-auto max-w-[1200px] px-6 py-6">{children}</div>
      </main>
    </div>
  )
}

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <PlatformContent>{children}</PlatformContent>
    </SidebarProvider>
  )
}
