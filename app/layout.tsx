import type React from "react"
import "./globals.css"
import "../styles/tokens.css"

export const metadata = {
  title: "AI-First Transformation",
  description: "Design • Govern • Modernize • Operate",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.sap.com" />
        <link rel="stylesheet" href="https://fonts.sap.com/fonts/72/css/72.css" />
        <link rel="stylesheet" href="https://fonts.sap.com/fonts/72-mono/css/72-mono.css" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
