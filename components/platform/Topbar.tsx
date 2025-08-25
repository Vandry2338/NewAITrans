"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface TopbarProps {
  title: string
}

export default function Topbar({ title }: TopbarProps) {
  const [presenterMode, setPresenterMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("presenterMode")
    if (saved) setPresenterMode(JSON.parse(saved))
  }, [])

  const togglePresenterMode = () => {
    const newMode = !presenterMode
    setPresenterMode(newMode)
    localStorage.setItem("presenterMode", JSON.stringify(newMode))
  }

  return (
    <header
      className="h-16 border-b px-6 flex items-center justify-between"
      style={{
        backgroundColor: "var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 rounded-md" style={{ backgroundColor: "var(--ai-royal)" }} />
          <span className="font-semibold text-lg tracking-tight" style={{ color: "var(--ai-navy)" }}>
            AI Platform
          </span>
        </Link>
        <span className="text-sm" style={{ color: "var(--text-muted)" }}>
          /
        </span>
        <h1 className="text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePresenterMode}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            presenterMode ? "shadow-soft" : ""
          }`}
          style={{
            backgroundColor: presenterMode ? "var(--blue-50)" : "transparent",
            color: presenterMode ? "var(--blue-800)" : "var(--text-muted)",
            border: `1px solid var(--border)`,
          }}
        >
          Presenter Mode
        </button>

        <button
          className="px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            backgroundColor: "var(--surface)",
          }}
        >
          ⌘K
        </button>

        <button
          className="px-4 py-2 rounded-md text-white font-medium shadow-soft hover:bg-opacity-90 transition-colors"
          style={{ background: "var(--grad-cta)" }}
        >
          New
        </button>
      </div>
    </header>
  )
}
