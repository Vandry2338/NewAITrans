export function Hero() {
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <div className="px-8 py-6">
        <div className="max-w-4xl">
          <h1
            className="text-3xl font-bold tracking-tight mb-2"
            style={{
              background: "var(--grad-primary)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Solutions Gallery
          </h1>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Explore curated reference architectures, business patterns, and accelerators—mapped to your industries,
            processes, and capabilities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
