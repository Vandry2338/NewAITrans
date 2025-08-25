export default function Admin() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--ai-royal)" }}>
          Admin
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
            User Management
          </h3>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Manage user accounts, roles, and permissions across the platform.
          </p>
        </div>

        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
            System Settings
          </h3>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Configure platform-wide settings, integrations, and preferences.
          </p>
        </div>

        <div
          className="p-6 rounded-lg border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-1)",
          }}
        >
          <h3 className="text-lg font-bold" style={{ color: "var(--blue-800)" }}>
            Analytics & Reporting
          </h3>
          <p className="mt-2" style={{ color: "var(--text-muted)" }}>
            Access detailed analytics and generate custom reports.
          </p>
        </div>
      </div>
    </div>
  )
}
