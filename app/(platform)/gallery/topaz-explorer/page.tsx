"use client"

export default function TopazExplorerPage() {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-4xl font-bold mb-6" style={{ color: "var(--text)" }}>
          Infosys Topaz Explorer
        </h1>
        <p className="text-xl mb-8" style={{ color: "var(--text-muted)" }}>
          AI-powered solution discovery and recommendation engine
        </p>
        <div
          className="p-8 rounded-2xl border"
          style={{
            backgroundColor: "var(--bg-subtle)",
            borderColor: "var(--border)",
          }}
        >
          <p style={{ color: "var(--text-muted)" }}>Coming soon - Advanced AI-powered solution discovery platform</p>
        </div>
      </div>
    </div>
  )
}
