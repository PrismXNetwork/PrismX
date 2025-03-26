"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const PrismButton = ({ children, className = "", onClick }: ButtonProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 rounded-full bg-black/30 border border-green-900/50 text-green-400 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-green-900/30 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Light refraction effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 blur-sm"
        style={{
          transform: "translateX(-100%)",
        }}
        animate={{
          x: isHovering ? ["0%", "200%"] : "-100%",
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
        }}
      />
    </motion.button>
  )
}

type InputProps = {
  type?: string
  placeholder?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PrismInput = ({ type = "text", placeholder, className = "", onChange }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <motion.input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-black/30 border border-green-900/50 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-0 ${className}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onChange}
      />

      {/* Shield effect */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isFocused ? [0, 0.2, 0] : 0,
          scale: isFocused ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isFocused ? Number.POSITIVE_INFINITY : 0,
          repeatType: "loop",
        }}
      >
        <div className="absolute inset-0 rounded-md border border-green-500/50" />

        {/* Shield particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-green-500/70"
            initial={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              top: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              left: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: isFocused ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "linear",
              delay: Math.random(),
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

type NavLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export const PrismNavLink = ({ href, children, className = "" }: NavLinkProps) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <motion.a
      href={href}
      className={`relative px-4 py-2 text-gray-400 hover:text-green-400 transition-all duration-300 ease-out ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}

      {/* Underline effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-px bg-green-500"
        initial={{ width: 0 }}
        animate={{
          width: isHovering ? "80%" : "0%",
          left: isHovering ? "10%" : "50%",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Prism refraction effect */}
      {isHovering && (
        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="40" height="20" viewBox="0 0 40 20">
            <motion.path
              d="M20,0 L40,20 L0,20 Z"
              fill="none"
              stroke="rgba(0, 255, 0, 0.5)"
              strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M20,5 L30,15 L10,15 Z"
              fill="rgba(0, 255, 0, 0.1)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </svg>
        </motion.div>
      )}
    </motion.a>
  )
}

export const ScrollFadeIn = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}

