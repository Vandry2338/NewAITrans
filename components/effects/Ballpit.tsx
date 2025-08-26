"use client"

import { useEffect, useRef } from 'react'

interface BallpitProps {
  className?: string
  followCursor?: boolean
  count?: number
}

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  opacity: number
}

export default function Ballpit({ className = '', followCursor = false, count = 150 }: BallpitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const ballsRef = useRef<Ball[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  const colors = [
    'rgba(59, 130, 246, 0.6)',   // blue
    'rgba(139, 92, 246, 0.6)',   // purple  
    'rgba(236, 72, 153, 0.6)',   // pink
    'rgba(34, 197, 94, 0.6)',    // green
    'rgba(249, 115, 22, 0.6)',   // orange
    'rgba(14, 165, 233, 0.6)',   // sky
    'rgba(168, 85, 247, 0.6)',   // violet
    'rgba(239, 68, 68, 0.6)',    // red
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const initBalls = () => {
      ballsRef.current = []
      for (let i = 0; i < count; i++) {
        ballsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 15 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.3 + 0.1
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ballsRef.current.forEach((ball) => {
        // Mouse interaction
        if (followCursor) {
          const dx = mouseRef.current.x - ball.x
          const dy = mouseRef.current.y - ball.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const force = (100 - distance) / 100 * 0.5
            ball.vx += (dx / distance) * force * 0.1
            ball.vy += (dy / distance) * force * 0.1
          }
        }

        // Update position
        ball.x += ball.vx
        ball.y += ball.vy

        // Boundary collision
        if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) {
          ball.vx *= -0.8
          ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x))
        }
        if (ball.y < ball.radius || ball.y > canvas.height - ball.radius) {
          ball.vy *= -0.8
          ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y))
        }

        // Friction
        ball.vx *= 0.99
        ball.vy *= 0.99

        // Draw ball
        ctx.save()
        ctx.globalAlpha = ball.opacity
        ctx.fillStyle = ball.color
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()
        
        // Add subtle glow effect
        ctx.shadowColor = ball.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleResize = () => {
      resizeCanvas()
      initBalls()
    }

    // Initialize
    resizeCanvas()
    initBalls()
    animate()

    // Event listeners
    window.addEventListener('resize', handleResize)
    if (followCursor) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (followCursor) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [count, followCursor])

  return (
    <canvas 
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  )
}
