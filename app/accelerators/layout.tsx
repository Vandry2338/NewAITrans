"use client"

import type React from "react"
import "../../styles/tokens.css"
import Sidebar from "@/components/platform/Sidebar"
import Topbar from "@/components/platform/Topbar"
import { SidebarProvider } from "@/components/platform/SidebarContext"

export default function AcceleratorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen" style={{ backgroundColor: "#f5f7fb", fontFamily: '"72", "Helvetica Neue", Arial, sans-serif' }}>
        {/* Full-width header that spans across sidebar and content */}
        <Topbar title="Platform" />
        
        {/* Main layout with sidebar and content */}
        <div className="flex" style={{ marginTop: "64px", minHeight: "calc(100vh - 64px)" }}>
          <Sidebar />
          <main className="flex-1 ml-0 lg:ml-[280px] min-w-0 w-full">
            <div className="p-6 w-full min-h-full" style={{ backgroundColor: "#f8fafc" }}>
              <div className="max-w-none w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}


