"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

type ProcessStep = {
  title: string
  description: string
  icon: React.ReactNode
}

export default function PrivacyProtectionProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const steps: ProcessStep[] = [
    {
      title: "Join",
      description: "Install the PrismX browser extension or mobile app to become part of the network.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Contribute",
      description: "Allocate a portion of your computing resources to generate privacy-enhancing patterns.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3" />
          <path d="M7 9H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M7 15H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Protect",
      description: "Your device helps disrupt AI surveillance systems while protecting your own privacy.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 3L20 7V11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11V7L12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 13L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Earn",
      description: "Receive $PRX tokens as rewards for your contribution to the privacy network.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M15 10L12 7L9 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 14L12 17L15 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div ref={containerRef} className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            How PrismX Works
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mb-8"
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A simple, powerful approach to privacy protection through distributed computing.
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-green-900/30 transform -translate-x-1/2 hidden md:block" />

          {/* Animated progress line */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-green-500 to-green-700 transform -translate-x-1/2 hidden md:block"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0

              return (
                <div key={index} className="relative">
                  <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}>
                    {/* Step number */}
                    <motion.div
                      className="w-16 h-16 rounded-full bg-black flex items-center justify-center border-2 border-green-500 text-green-400 text-xl font-light z-10 relative"
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.8 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}

                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-green-500"
                        initial={{ opacity: 0, scale: 1 }}
                        whileInView={{ opacity: [0, 0.5, 0], scale: [1, 1.5, 1.8] }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          times: [0, 0.5, 1],
                        }}
                      />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      className={`bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-green-900/50 md:w-[calc(50%-3rem)] relative`}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-green-400 mr-4">{step.icon}</div>
                        <h3 className="text-xl font-light text-green-400">{step.title}</h3>
                      </div>
                      <p className="text-gray-300">{step.description}</p>

                      {/* Animated particles */}
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-green-500/50"
                            initial={{
                              x: Math.random() * 100 + 50,
                              y: Math.random() * 100 + 50,
                              opacity: 0,
                            }}
                            whileInView={{
                              x: [Math.random() * 100 + 50, Math.random() * 200 + 100, Math.random() * 300 + 50],
                              y: [Math.random() * 100 + 50, Math.random() * 200 - 50, Math.random() * 100 + 100],
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.5, 0.5],
                            }}
                            viewport={{ once: false, amount: 0.8 }}
                            transition={{
                              duration: Math.random() * 3 + 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "loop",
                              ease: "linear",
                              delay: Math.random() * 2,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

