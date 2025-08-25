interface CatalogItem {
  title: string
  description: string
  category?: string
}

interface CatalogTemplateProps {
  title: string
  items: CatalogItem[]
  filters?: string[]
}

export default function CatalogTemplate({ title, items, filters }: CatalogTemplateProps) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
          {title}
        </h1>

        {filters && (
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className="px-3 py-1.5 rounded-md text-sm font-medium border transition-colors"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  backgroundColor: "var(--surface)",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border transition-all duration-150 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <h3 className="font-bold text-base tracking-tight" style={{ color: "var(--blue-800)" }}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.description}
            </p>
            {item.category && (
              <span
                className="inline-block mt-3 px-2 py-1 rounded text-xs font-medium"
                style={{
                  backgroundColor: "var(--blue-50)",
                  color: "var(--blue-700)",
                }}
              >
                {item.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
