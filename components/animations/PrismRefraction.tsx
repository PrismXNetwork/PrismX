"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export default function PrismRefraction() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          const { width, height } = containerRef.current.getBoundingClientRect()
          setDimensions({ width, height })
        }
      }

      updateDimensions()
      window.addEventListener("resize", updateDimensions)

      return () => {
        window.removeEventListener("resize", updateDimensions)
      }
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  // Calculate beam angles based on mouse position
  const inputAngle = -30 + mousePosition.x * 60 // -30 to 30 degrees
  const outputAngle1 = -60 + mousePosition.y * 40 // -60 to -20 degrees
  const outputAngle2 = -10 + mousePosition.y * 40 // -10 to 30 degrees
  const outputAngle3 = 40 + mousePosition.y * 40 // 40 to 80 degrees

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid meet">
        {/* Surveillance beam */}
        <motion.path
          d={`M ${-200} ${250} L ${400} ${250 + inputAngle * 3}`}
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="4"
          strokeDasharray="10,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.7,
            d: `M ${-200} ${250} L ${400} ${250 + inputAngle * 3}`,
            strokeWidth: isHovering ? 6 : 4,
          }}
          transition={{
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1 },
            d: { duration: 0.3, ease: "linear" },
            strokeWidth: { duration: 0.3 },
          }}
        />

        {/* Prism */}
        <motion.polygon
          points="400,150 500,350 300,350"
          fill="rgba(0, 255, 0, 0.1)"
          stroke="rgba(0, 255, 0, 0.8)"
          strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{
            opacity: isHovering ? 0.9 : 0.6,
            scale: isHovering ? 1.05 : 1,
            rotate: isHovering ? 5 : 0,
            strokeWidth: isHovering ? 3 : 2,
            fill: isHovering ? "rgba(0, 255, 0, 0.2)" : "rgba(0, 255, 0, 0.1)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Refracted beams */}
        <motion.path
          d={`M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle1 * 5}`}
          stroke="rgba(0, 255, 0, 0.8)"
          strokeWidth="3"
          strokeDasharray="0"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.8,
            d: `M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle1 * 5}`,
          }}
          transition={{
            pathLength: { duration: 1.5, ease: "easeOut" },
            opacity: { duration: 1 },
            d: { duration: 0.3, ease: "linear" },
          }}
        />

        <motion.path
          d={`M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle2 * 5}`}
          stroke="rgba(0, 255, 0, 0.6)"
          strokeWidth="2"
          strokeDasharray="0"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.6,
            d: `M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle2 * 5}`,
          }}
          transition={{
            pathLength: { duration: 1.7, ease: "easeOut" },
            opacity: { duration: 1 },
            d: { duration: 0.3, ease: "linear" },
          }}
        />

        <motion.path
          d={`M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle3 * 5}`}
          stroke="rgba(0, 255, 0, 0.4)"
          strokeWidth="1.5"
          strokeDasharray="0"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: 0.4,
            d: `M ${400} ${250 + inputAngle * 3} L ${1200} ${250 + outputAngle3 * 5}`,
          }}
          transition={{
            pathLength: { duration: 1.9, ease: "easeOut" },
            opacity: { duration: 1 },
            d: { duration: 0.3, ease: "linear" },
          }}
        />

        {/* Particles along refracted beams */}
        {[...Array(25)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            r={Math.random() * 2 + 1}
            fill="rgba(0, 255, 0, 0.8)"
            initial={{
              opacity: 0,
              x: 400 + Math.random() * 100,
              y: 250 + inputAngle * 3 + Math.random() * 50 - 25,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              x: [400 + Math.random() * 100, 800 + Math.random() * 400],
              y: [
                250 + inputAngle * 3 + Math.random() * 50 - 25,
                250 + (outputAngle1 * 5 + outputAngle3 * 5) / 2 + Math.random() * 100 - 50,
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Glow effect */}
        <motion.ellipse
          cx="400"
          cy={250 + inputAngle * 3}
          rx="30"
          ry="30"
          fill="url(#glowGradient)"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            cx: 400,
            cy: 250 + inputAngle * 3,
          }}
          transition={{
            opacity: {
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            },
            cx: { duration: 0.3 },
            cy: { duration: 0.3 },
          }}
        />

        {/* Definitions */}
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(0, 255, 0, 0.8)" />
            <stop offset="100%" stopColor="rgba(0, 255, 0, 0)" />
          </radialGradient>
        </defs>
      </svg>

      {/* Interaction prompt */}
      <motion.div
        className="absolute bottom-4 right-4 text-green-400 text-sm flex items-center opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0 : 0.7 }}
        transition={{ duration: 0.5 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2 animate-pulse">
          <path
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M12 14L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 8L12 8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Move cursor to interact with prism
      </motion.div>
    </div>
  )
}

