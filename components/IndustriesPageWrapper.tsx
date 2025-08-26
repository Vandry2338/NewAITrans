"use client"

import { Suspense } from "react"
import IndustriesPageContent from "./IndustriesPageContent"

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 animate-pulse">
      <div className="border-b border-gray-100/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-96"></div>
          <div className="mt-8 flex space-x-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded w-24"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function IndustriesPageWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <IndustriesPageContent />
    </Suspense>
  )
}
