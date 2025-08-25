import CatalogTemplate from "@/components/templates/CatalogTemplate"

const fitnessItems = [
  {
    title: "API Response Time",
    description: "Ensures all API endpoints respond within 200ms under normal load conditions.",
    category: "Performance",
  },
  {
    title: "Security Compliance",
    description: "Validates that all endpoints implement proper authentication and authorization.",
    category: "Security",
  },
  {
    title: "Code Coverage",
    description: "Maintains minimum 80% test coverage across all critical business logic.",
    category: "Quality",
  },
  {
    title: "Dependency Freshness",
    description: "Monitors and alerts on outdated dependencies with known vulnerabilities.",
    category: "Security",
  },
  {
    title: "Database Performance",
    description: "Tracks query performance and prevents N+1 queries in production.",
    category: "Performance",
  },
  {
    title: "Error Rate Threshold",
    description: "Maintains error rates below 0.1% for all critical user journeys.",
    category: "Reliability",
  },
]

const filters = ["All", "Performance", "Security", "Quality", "Reliability"]

export default function GuardFitness() {
  return <CatalogTemplate title="Build & Guard" items={fitnessItems} filters={filters} />
}
