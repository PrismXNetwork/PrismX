"use client"

import { useState, useEffect, useCallback } from "react"

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const updatePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e)
      if (!isVisible) setIsVisible(true)
    }

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "input" ||
        target.getAttribute("role") === "button" ||
        target.closest('a, button, input, [role="button"]')

      setIsHovering(isInteractive)
    }

    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleElementHover)

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleElementHover)
    }
  }, [isVisible, updatePosition])

  if (!isVisible) return null

  return (
    <div
      className={`cursor-spotlight ${isHovering ? "hovering" : ""}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="inner-circle"></div>
    </div>
  )
}

