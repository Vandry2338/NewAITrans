"use client"

import { Suspense } from "react"
import IntelligencePageContent from "./IntelligencePageContent"

function LoadingSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <div>
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-96"></div>
      </div>
      <div className="h-16 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-gray-200 rounded"></div>
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded"></div>
    </div>
  )
}

export default function IntelligencePageWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <IntelligencePageContent />
    </Suspense>
  )
}
