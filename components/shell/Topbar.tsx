export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto max-w-[1200px] px-6 h-14 flex items-center justify-between">
        <div className="font-semibold">Dashboard</div>
        <div className="flex items-center gap-3">
          <button className="px-3 py-2 rounded-md border border-border hover:bg-surface transition-colors">⌘K</button>
          <button className="px-4 py-2 rounded-md text-white shadow-soft bg-grad-cta hover:opacity-90 transition-opacity">
            New
          </button>
        </div>
      </div>
    </header>
  )
}
