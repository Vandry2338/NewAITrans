"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { href: "/(platform)/intelligence/overview", label: "Client Intelligence" },
  { href: "/(platform)/blueprint/canvas", label: "Solution Blueprint" },
  { href: "/(platform)/guard/fitness", label: "Build & Guard" },
  { href: "/(platform)/modernize/scan", label: "Modernize & Migrate" },
  { href: "/(platform)/operate/roadmap", label: "Operate & Optimize" },
  { href: "/(platform)/accelerators", label: "Accelerators Library" },
  { href: "/(platform)/admin", label: "Admin" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[272px] border-r border-border bg-bg">
      <div className="px-6 py-6">
        <div className="h-10 w-10 rounded-md bg-grad-primary shadow-soft" />
        <div className="mt-3 font-semibold">AI-First Transformation</div>
      </div>
      <nav className="px-2 py-2">
        {items.map((i) => (
          <Link
            key={i.href}
            href={i.href}
            className={`block px-4 py-3 rounded-md text-[14px] transition-colors ${
              pathname === i.href ? "bg-blue-50 text-blue-700" : "hover:bg-blue-50 text-text"
            }`}
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
