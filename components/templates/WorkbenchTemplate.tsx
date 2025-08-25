import type React from "react"
interface WorkbenchTemplateProps {
  title: string
  leftPanel: React.ReactNode
  centerPanel: React.ReactNode
  rightPanel: React.ReactNode
}

export default function WorkbenchTemplate({ title, leftPanel, centerPanel, rightPanel }: WorkbenchTemplateProps) {
  return (
    <div className="space-y-6 h-full">
      <header>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          {title}
        </h1>
      </header>

      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <div
          className="w-[24%] rounded-lg border p-4 overflow-auto"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {leftPanel}
        </div>

        <div
          className="flex-1 rounded-lg border p-4 overflow-auto"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {centerPanel}
        </div>

        <div
          className="w-[28%] rounded-lg border p-4 overflow-auto"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {rightPanel}
        </div>
      </div>
    </div>
  )
}
