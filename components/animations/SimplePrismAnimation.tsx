"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

export default function SimplePrismAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [isActive, setIsActive] = useState(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const updateSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Start with animation running
    setIsActive(true)

    return () => {
      window.removeEventListener("resize", updateSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isActive || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const prismSize = Math.min(canvas.width, canvas.height) * 0.3

      // Calculate beam position based on mouse position
      // This will move the beam up and down based on mouse Y position
      const beamYOffset = (mousePosition.y - 0.5) * prismSize * 1.5
      const beamY = centerY + beamYOffset

      // Calculate where the beam hits the prism
      const prismLeft = centerX - prismSize / 2
      const prismTop = centerY - prismSize / 2
      const prismBottom = centerY + prismSize / 2

      // Calculate the intersection point of the beam with the left side of the prism
      const beamSlope = beamYOffset / (centerX - prismSize / 2)
      const hitY = beamY
      const hitX = prismLeft

      // Determine if the beam hits the prism
      const hitsLeftSide = hitY >= prismTop && hitY <= prismBottom

      // Draw background - black with subtle green gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      bgGradient.addColorStop(0, "#0A0A0A")
      bgGradient.addColorStop(1, "#0F1F0F")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Create gradients to match the SVG
      const logoGradient = ctx.createLinearGradient(
        centerX - prismSize / 2,
        centerY - prismSize / 2,
        centerX + prismSize / 2,
        centerY + prismSize / 2,
      )
      logoGradient.addColorStop(0, "#14F195")
      logoGradient.addColorStop(1, "#0A9D63")

      const beamGradient = ctx.createLinearGradient(
        centerX - prismSize / 2,
        centerY - prismSize / 2,
        centerX + prismSize / 2,
        centerY + prismSize / 2,
      )
      beamGradient.addColorStop(0, "#14F195")
      beamGradient.addColorStop(1, "rgba(20,241,149,0)")

      const refractGradient = ctx.createLinearGradient(
        centerX - prismSize / 2,
        centerY - prismSize / 2,
        centerX + prismSize / 2,
        centerY + prismSize / 2,
      )
      refractGradient.addColorStop(0, "#14F195")
      refractGradient.addColorStop(1, "rgba(20,241,149,0.3)")

      // Draw incoming beam (white)
      ctx.beginPath()
      ctx.moveTo(0, beamY)
      ctx.lineTo(hitX, hitY)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.8)"
      ctx.lineWidth = 4
      ctx.setLineDash([10, 5])
      ctx.stroke()
      ctx.setLineDash([])

      // Draw main prism
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - prismSize / 2)
      ctx.lineTo(centerX + prismSize / 2, centerY + prismSize / 2)
      ctx.lineTo(centerX - prismSize / 2, centerY + prismSize / 2)
      ctx.closePath()
      ctx.fillStyle = "rgba(20, 241, 149, 0.05)"
      ctx.fill()
      ctx.strokeStyle = logoGradient
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw inner prism
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - prismSize / 5)
      ctx.lineTo(centerX + prismSize / 3, centerY + prismSize / 3)
      ctx.lineTo(centerX - prismSize / 3, centerY + prismSize / 3)
      ctx.closePath()
      ctx.strokeStyle = logoGradient
      ctx.lineWidth = 1.5
      ctx.globalAlpha = 0.7
      ctx.stroke()
      ctx.globalAlpha = 1.0

      // Draw light beams entering the prism
      // Top beam
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - prismSize / 2)
      ctx.lineTo(centerX, centerY - prismSize)
      ctx.strokeStyle = beamGradient
      ctx.lineWidth = 1.5
      ctx.setLineDash([2, 2])
      ctx.stroke()

      // Left beam
      ctx.beginPath()
      ctx.moveTo(centerX - prismSize / 2, centerY + prismSize / 2)
      ctx.lineTo(centerX - prismSize, centerY + prismSize)
      ctx.strokeStyle = beamGradient
      ctx.stroke()

      // Right beam
      ctx.beginPath()
      ctx.moveTo(centerX + prismSize / 2, centerY + prismSize / 2)
      ctx.lineTo(centerX + prismSize, centerY + prismSize)
      ctx.strokeStyle = beamGradient
      ctx.stroke()
      ctx.setLineDash([])

      // Draw eye element in the center (replacing the circle)
      // Eye outline
      ctx.beginPath()
      ctx.ellipse(centerX, centerY, prismSize / 6, prismSize / 10, 0, 0, Math.PI * 2)
      ctx.strokeStyle = logoGradient
      ctx.lineWidth = 1
      ctx.stroke()

      // Pupil
      ctx.beginPath()
      ctx.arc(centerX, centerY, prismSize / 16, 0, Math.PI * 2)
      ctx.fillStyle = logoGradient
      ctx.fill()

      // Highlight
      ctx.beginPath()
      ctx.arc(centerX - 2, centerY - 2, prismSize / 50, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
      ctx.fill()

      // Only draw refracted beams if the beam hits the prism
      if (hitsLeftSide) {
        // Calculate refraction angles based on where the beam hits
        // The higher the beam hits, the more upward the top refracted beam
        const hitRatio = (hitY - prismTop) / (prismBottom - prismTop)
        const topRefractAngle = -60 + hitRatio * 40
        const midRefractAngle = -10 + hitRatio * 20
        const bottomRefractAngle = 40 - hitRatio * 20

        // Convert angles to radians
        const topRefractRad = (topRefractAngle * Math.PI) / 180
        const midRefractRad = (midRefractAngle * Math.PI) / 180
        const bottomRefractRad = (bottomRefractAngle * Math.PI) / 180

        // Calculate end points for refracted beams
        const beamLength = canvas.width - hitX
        const topEndX = hitX + beamLength * Math.cos(topRefractRad)
        const topEndY = hitY + beamLength * Math.sin(topRefractRad)

        const midEndX = hitX + beamLength * Math.cos(midRefractRad)
        const midEndY = hitY + beamLength * Math.sin(midRefractRad)

        const bottomEndX = hitX + beamLength * Math.cos(bottomRefractRad)
        const bottomEndY = hitY + beamLength * Math.sin(bottomRefractRad)

        // Refracted light beams from bottom of prism
        // Beam 1 (left)
        ctx.beginPath()
        ctx.moveTo(centerX, centerY + prismSize / 3)
        ctx.lineTo(centerX - prismSize / 2, centerY + prismSize)
        ctx.strokeStyle = refractGradient
        ctx.lineWidth = 1
        ctx.stroke()

        // Beam 2 (center)
        ctx.beginPath()
        ctx.moveTo(centerX, centerY + prismSize / 3)
        ctx.lineTo(centerX, centerY + prismSize)
        ctx.strokeStyle = refractGradient
        ctx.lineWidth = 1
        ctx.stroke()

        // Beam 3 (right)
        ctx.beginPath()
        ctx.moveTo(centerX, centerY + prismSize / 3)
        ctx.lineTo(centerX + prismSize / 2, centerY + prismSize)
        ctx.strokeStyle = refractGradient
        ctx.lineWidth = 1
        ctx.stroke()

        // Main refracted beams
        // Top beam
        ctx.beginPath()
        ctx.moveTo(hitX, hitY)
        ctx.lineTo(topEndX, topEndY)
        ctx.strokeStyle = "rgba(20, 241, 149, 0.8)"
        ctx.lineWidth = 3
        ctx.stroke()

        // Middle beam
        ctx.beginPath()
        ctx.moveTo(hitX, hitY)
        ctx.lineTo(midEndX, midEndY)
        ctx.strokeStyle = "rgba(20, 241, 149, 0.6)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Bottom beam
        ctx.beginPath()
        ctx.moveTo(hitX, hitY)
        ctx.lineTo(bottomEndX, bottomEndY)
        ctx.strokeStyle = "rgba(20, 241, 149, 0.4)"
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Draw particles along the refracted beams
        for (let i = 0; i < 20; i++) {
          const progress = (Date.now() / 1000 + i) % 1

          // Determine which beam this particle follows
          const startX = hitX
          const startY = hitY
          let endX, endY

          if (i % 3 === 0) {
            endX = topEndX
            endY = topEndY
          } else if (i % 3 === 1) {
            endX = midEndX
            endY = midEndY
          } else {
            endX = bottomEndX
            endY = bottomEndY
          }

          // Calculate particle position along the beam
          const x = startX + progress * (endX - startX)
          const y = startY + progress * (endY - startY)

          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(20, 241, 149, 0.8)"
          ctx.fill()
        }

        // Add a glow effect at the hit point
        const glowGradient = ctx.createRadialGradient(hitX, hitY, 0, hitX, hitY, prismSize / 4)
        glowGradient.addColorStop(0, "rgba(20, 241, 149, 0.8)")
        glowGradient.addColorStop(1, "rgba(20, 241, 149, 0)")

        ctx.beginPath()
        ctx.arc(hitX, hitY, prismSize / 4, 0, Math.PI * 2)
        ctx.fillStyle = glowGradient
        ctx.fill()
      }

      // Draw interaction prompt
      ctx.fillStyle = "rgba(20, 241, 149, 0.7)"
      ctx.font = "14px Arial"
      ctx.textAlign = "right"
      ctx.fillText("Move cursor to direct the beam", canvas.width - 20, canvas.height - 20)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  return (
    <div className="w-full h-[400px] relative bg-black" onMouseMove={handleMouseMove}>
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Fallback static image in case canvas doesn't work */}
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-green-400 text-center">
            <div className="mb-4">
              <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
                {/* Black background with subtle green gradient */}
                <rect width="100" height="100" fill="url(#fallbackBackgroundGradient)" />

                {/* Main prism */}
                <polygon
                  points="50,10 90,90 10,90"
                  fill="rgba(20, 241, 149, 0.05)"
                  stroke="url(#fallbackLogoGradient)"
                  strokeWidth="2"
                />

                {/* Inner prism */}
                <polygon
                  points="50,30 75,80 25,80"
                  fill="none"
                  stroke="url(#fallbackInnerGradient)"
                  strokeWidth="1.5"
                  opacity="0.7"
                />

                {/* Light beams */}
                <path d="M50,10 L50,0" stroke="url(#fallbackBeamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M10,90 L0,95" stroke="url(#fallbackBeamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M90,90 L100,95" stroke="url(#fallbackBeamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />

                {/* Refracted light */}
                <path d="M50,80 L30,100" stroke="url(#fallbackRefractGradient)" strokeWidth="1" />
                <path d="M50,80 L50,100" stroke="url(#fallbackRefractGradient)" strokeWidth="1" />
                <path d="M50,80 L70,100" stroke="url(#fallbackRefractGradient)" strokeWidth="1" />

                {/* Eye element (replacing the circle) */}
                <g transform="translate(50,50)">
                  {/* Eye outline */}
                  <ellipse
                    cx="0"
                    cy="0"
                    rx="8"
                    ry="5"
                    fill="none"
                    stroke="url(#fallbackLogoGradient)"
                    strokeWidth="1"
                  />

                  {/* Pupil */}
                  <circle cx="0" cy="0" r="3" fill="url(#fallbackLogoGradient)" />

                  {/* Highlight */}
                  <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.7" />
                </g>

                {/* Gradient definitions */}
                <defs>
                  {/* Background gradient */}
                  <linearGradient id="fallbackBackgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0A0A0A" />
                    <stop offset="100%" stopColor="#0F1F0F" />
                  </linearGradient>

                  <linearGradient id="fallbackLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="#0A9D63" />
                  </linearGradient>
                  <linearGradient id="fallbackInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="#0A9D63" />
                  </linearGradient>
                  <linearGradient id="fallbackBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="rgba(20,241,149,0)" />
                  </linearGradient>
                  <linearGradient id="fallbackRefractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="rgba(20,241,149,0.3)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p>Prism Refraction Animation</p>
          </div>
        </div>
      )}
    </div>
  )
}

