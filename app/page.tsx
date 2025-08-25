"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen overflow-hidden" style={{ color: "var(--blue-800)" }}>
      {/* Video Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Redo_Pink_Orange_Chinese_Style-GRx2bfEUqrVLs9LaIgF7vkYWc2sxQL.mp4"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Redo_Pink_Orange_Chinese_Style-GRx2bfEUqrVLs9LaIgF7vkYWc2sxQL.mp4"
          autoPlay
          muted
          loop
          playsInline
          onLoadStart={() => console.log("[v0] Video loading started")}
          onCanPlay={() => console.log("[v0] Video can play")}
          onError={(e) => console.log("[v0] Video error:", e)}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `color-mix(in srgb, var(--bg) 5%, transparent)`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--blue-600) 8%, transparent) 0%, color-mix(in srgb, var(--blue-800) 5%, transparent) 100%)`,
          }}
        />

        <div className="relative z-10 h-full flex flex-col">
          <header className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md" style={{ backgroundColor: "var(--blue-100)" }} />
              <span className="font-semibold text-lg tracking-tight" style={{ color: "var(--blue-800)" }}>
                AI-First Transformation
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/accelerators"
                className="px-3 py-2 rounded-md hover:bg-opacity-80 transition-colors font-medium"
                style={{ backgroundColor: "var(--blue-50)", color: "var(--blue-700)" }}
              >
                Accelerators
              </Link>
              <Link
                href="/intelligence"
                className="px-4 py-2 rounded-md shadow-soft text-white hover:bg-opacity-90 transition-colors font-medium"
                style={{ background: "var(--grad-cta)" }}
              >
                Enter Platform
              </Link>
            </div>
          </header>

          <main className="mx-auto max-w-[1200px] px-6 flex-1 flex flex-col justify-center text-center">
            <h1
              className="text-4xl md:text-5xl font-black tracking-tight leading-tight max-w-[820px] mx-auto"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f7fafc 50%, #e2e8f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontWeight: "900",
              }}
            >
              AI-first transformation platform
            </h1>
            <p
              className="mt-4 max-w-[720px] mx-auto text-lg leading-relaxed font-black"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f7fafc 50%, #e2e8f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontWeight: "900",
              }}
            >
              Accelerate delivery. Minimize risk. Maximize value. Prove ROI—every sprint.
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <Link
                href="/intelligence"
                className="px-6 py-3 rounded-lg text-white shadow-soft hover:bg-opacity-90 transition-all duration-150 font-semibold text-lg"
                style={{ background: "var(--grad-cta)" }}
              >
                Start now
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* Blocks Section - Separate from video */}
      <section className="py-8 h-[40vh] flex items-center" style={{ backgroundColor: "var(--bg)" }}>
        <div className="mx-auto max-w-[1200px] px-6 w-full">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-5 auto-rows-fr h-full">
            <div
              className="rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 flex flex-col group cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-2)",
                background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--blue-50) 20%, var(--surface)) 100%)`,
              }}
            >
              <h2
                className="text-lg font-extrabold tracking-tight group-hover:text-opacity-90 transition-colors"
                style={{ color: "var(--blue-800)" }}
              >
                Intelligent Strategy
              </h2>
              <p
                className="mt-2 leading-relaxed text-sm flex-1 group-hover:text-opacity-80 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                AI-driven roadmaps that align business outcomes with technical execution, delivering measurable ROI
                every sprint.
              </p>
            </div>
            <div
              className="rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 flex flex-col group cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-2)",
                background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--blue-50) 20%, var(--surface)) 100%)`,
              }}
            >
              <h2
                className="text-lg font-extrabold tracking-tight group-hover:text-opacity-90 transition-colors"
                style={{ color: "var(--blue-800)" }}
              >
                Adaptive Architecture
              </h2>
              <p
                className="mt-2 leading-relaxed text-sm flex-1 group-hover:text-opacity-80 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Self-evolving system designs powered by generative AI, ensuring scalability and future-readiness.
              </p>
            </div>
            <div
              className="rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 flex flex-col group cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-2)",
                background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--blue-50) 20%, var(--surface)) 100%)`,
              }}
            >
              <h2
                className="text-lg font-extrabold tracking-tight group-hover:text-opacity-90 transition-colors"
                style={{ color: "var(--blue-800)" }}
              >
                Autonomous Governance
              </h2>
              <p
                className="mt-2 leading-relaxed text-sm flex-1 group-hover:text-opacity-80 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                ML-powered quality gates and compliance frameworks that prevent drift while accelerating delivery.
              </p>
            </div>
            <div
              className="rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 flex flex-col group cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-2)",
                background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--blue-50) 20%, var(--surface)) 100%)`,
              }}
            >
              <h2
                className="text-lg font-extrabold tracking-tight group-hover:text-opacity-90 transition-colors"
                style={{ color: "var(--blue-800)" }}
              >
                Cognitive Modernization
              </h2>
              <p
                className="mt-2 leading-relaxed text-sm flex-1 group-hover:text-opacity-80 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                AI agents that understand legacy systems and orchestrate intelligent transformation pathways.
              </p>
            </div>
            <div
              className="rounded-xl p-6 border transition-all duration-300 hover:shadow-2xl hover:scale-105 focus-within:ring-2 flex flex-col group cursor-pointer"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-2)",
                background: `linear-gradient(135deg, var(--surface) 0%, color-mix(in srgb, var(--blue-50) 20%, var(--surface)) 100%)`,
              }}
            >
              <h2
                className="text-lg font-extrabold tracking-tight group-hover:text-opacity-90 transition-colors"
                style={{ color: "var(--blue-800)" }}
              >
                Predictive Operations
              </h2>
              <p
                className="mt-2 leading-relaxed text-sm flex-1 group-hover:text-opacity-80 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                Unified observability with AI-driven insights that optimize performance and predict business impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
