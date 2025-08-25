"use client"

import { useWorkspace } from "@/lib/workspace-context"
import { INDUSTRIES } from "@/lib/types"

export default function WorkspaceSelector() {
  const { workspace, setIndustry, setClientName } = useWorkspace()

  return (
    <div
      className="sticky top-0 z-20 px-6 py-4 border-b"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-4">
        <select
          value={workspace.industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="px-4 py-2 rounded-lg border font-medium"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          required
        >
          <option value="">Select Industry</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Client (optional)"
          value={workspace.clientName || ""}
          onChange={(e) => setClientName(e.target.value)}
          className="px-4 py-2 rounded-lg border"
          style={{
            backgroundColor: "var(--bg)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        />

        {workspace.industry && (
          <div className="ml-auto flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <span>Industry:</span>
            <span
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: "var(--blue-100)",
                color: "var(--blue-700)",
              }}
            >
              {workspace.industry}
            </span>
            {workspace.clientName && (
              <>
                <span>Client:</span>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "var(--green-100)",
                    color: "var(--green-700)",
                  }}
                >
                  {workspace.clientName}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
