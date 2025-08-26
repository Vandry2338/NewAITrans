"use client"

import { motion } from "framer-motion"

export function NibiruXLogo() {
  return (
    <div className="flex items-center gap-6">
      {/* Animated Logomark */}
      <div className="relative h-16 w-16 transform-gpu">
        {/* Central core with gradient */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg" />
        </div>

        {/* Primary orbiting ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute top-1/2 left-0 h-0.5 w-7 bg-gradient-to-r from-blue-500 to-transparent transform -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 h-0.5 w-7 bg-gradient-to-l from-purple-600 to-transparent transform -translate-y-1/2" />
        </motion.div>

        {/* Secondary orbiting ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute top-0 left-1/2 w-0.5 h-7 bg-gradient-to-b from-blue-500 to-transparent transform -translate-x-1/2" />
          <div className="absolute bottom-0 left-1/2 w-0.5 h-7 bg-gradient-to-t from-indigo-500 to-transparent transform -translate-x-1/2" />
        </motion.div>

        {/* Tertiary orbiting ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="absolute top-2 right-2 h-0.5 w-5 bg-gradient-to-r from-indigo-500 to-transparent transform rotate-45" />
          <div className="absolute bottom-2 left-2 h-0.5 w-5 bg-gradient-to-r from-purple-600 to-transparent transform rotate-45" />
        </motion.div>

        {/* Outer glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl" />
      </div>

      {/* Wordmark */}
      <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold font-heading bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
        NibiruX
      </h1>
    </div>
  )
} 