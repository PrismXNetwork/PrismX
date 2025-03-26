"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

type TokenUtility = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export default function TokenUtilityFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [activeUtility, setActiveUtility] = useState<string | null>(null)

  // Update the tokenUtilities array with shorter descriptions
  const tokenUtilities: TokenUtility[] = [
    {
      id: "rewards",
      title: "Contribution Rewards",
      description:
        "Earn $PRX tokens based on the computing resources you provide to the network. Our reward algorithm calculates contributions using processing power, bandwidth, and uptime. Consistent participation increases your reward multiplier, incentivizing long-term network support.",
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
    {
      id: "access",
      title: "Access Rights",
      description:
        "$PRX holdings unlock tiered access to advanced privacy features. While basic protection is available to all, token holders receive priority routing and enhanced security tools. Premium tiers include custom privacy profiles and adaptive protection against evolving surveillance techniques.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: "governance",
      title: "Governance",
      description:
        "Shape PrismX's future through our decentralized governance system. Token holders propose and vote on protocol upgrades and strategic initiatives. Voting power scales with holdings and contribution history, ensuring active participants guide the evolution of privacy protection.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 7H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 17H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "value",
      title: "Value Capture",
      description:
        "As PrismX grows, token holders benefit from the network's increasing value. Enterprise integrations and premium services generate fees that flow back to stakeholders. This creates a sustainable economic model where ecosystem expansion directly rewards all participants.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 12H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M17 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
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
            $PRX Token Utility
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
            The $PRX token powers the PrismX ecosystem and rewards contributors.
          </motion.p>
        </div>

        {/* Token Flow Visualization */}
        <div className="mb-16">
          <motion.div
            className="relative h-[300px] bg-black/20 backdrop-blur-sm rounded-xl border border-green-900/50 overflow-hidden flex"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Left side - Token visualization */}
            <div className="w-full md:w-1/2 h-full relative">
              {/* Central token */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-black/50 border-2 border-green-500 flex items-center justify-center z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.8,
                }}
              >
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Main prism */}
                    <polygon points="50,10 90,90 10,90" fill="none" stroke="#00FF00" strokeWidth="2" />

                    {/* Inner prism */}
                    <polygon points="50,30 75,80 25,80" fill="none" stroke="#00FF00" strokeWidth="1.5" opacity="0.7" />

                    {/* Light beams */}
                    <path d="M50,10 L50,0" stroke="#00FF00" strokeWidth="1.5" strokeDasharray="2,2" />
                    <path d="M10,90 L0,95" stroke="#00FF00" strokeWidth="1.5" strokeDasharray="2,2" />
                    <path d="M90,90 L100,95" stroke="#00FF00" strokeWidth="1.5" strokeDasharray="2,2" />

                    {/* Refracted light */}
                    <path d="M50,80 L30,100" stroke="#00FF00" strokeWidth="1" />
                    <path d="M50,80 L50,100" stroke="#00FF00" strokeWidth="1" />
                    <path d="M50,80 L70,100" stroke="#00FF00" strokeWidth="1" />

                    {/* Circular element */}
                    <circle cx="50" cy="50" r="5" fill="none" stroke="#00FF00" strokeWidth="1" />
                  </svg>
                </div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-green-500"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.5, 1.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    times: [0, 0.5, 1],
                  }}
                />
              </motion.div>

              {/* Connection lines */}
              {tokenUtilities.map((utility, index) => {
                const angle = (index * Math.PI * 2) / tokenUtilities.length
                const x = Math.cos(angle) * 120 + 50
                const y = Math.sin(angle) * 120 + 50

                return (
                  <motion.div
                    key={utility.id}
                    className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent origin-left"
                    style={{
                      rotate: `${angle * (180 / Math.PI)}deg`,
                      width: "120px",
                    }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                  />
                )
              })}

              {/* Utility nodes */}
              {tokenUtilities.map((utility, index) => {
                const angle = (index * Math.PI * 2) / tokenUtilities.length
                const x = Math.cos(angle) * 120
                const y = Math.sin(angle) * 120

                return (
                  <motion.div
                    key={utility.id}
                    className={`absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-black/50 border border-green-500 flex items-center justify-center cursor-pointer transition-all duration-300 ${activeUtility === utility.id ? "border-2 shadow-[0_0_15px_rgba(0,255,0,0.5)]" : "border-opacity-50"}`}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 1.2 + index * 0.2,
                    }}
                    onMouseEnter={() => setActiveUtility(utility.id)}
                    onMouseLeave={() => setActiveUtility(null)}
                  >
                    <div className="text-green-400">{utility.icon}</div>
                  </motion.div>
                )
              })}

              {/* Flowing particles */}
              {tokenUtilities.map((utility, index) => {
                const angle = (index * Math.PI * 2) / tokenUtilities.length
                const x = Math.cos(angle) * 120
                const y = Math.sin(angle) * 120

                return [...Array(3)].map((_, i) => (
                  <motion.div
                    key={`${utility.id}-particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-green-500"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 0,
                    }}
                    animate={{
                      x: [0, x * 0.5, x],
                      y: [0, y * 0.5, y],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: i * 0.7 + index * 0.1,
                      ease: "linear",
                    }}
                  />
                ))
              })}

              {/* Grid lines for tech effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-0 right-0 top-1/4 h-px bg-green-500/30"></div>
                <div className="absolute left-0 right-0 top-2/4 h-px bg-green-500/30"></div>
                <div className="absolute left-0 right-0 top-3/4 h-px bg-green-500/30"></div>
                <div className="absolute top-0 bottom-0 left-1/4 w-px bg-green-500/30"></div>
                <div className="absolute top-0 bottom-0 left-2/4 w-px bg-green-500/30"></div>
                <div className="absolute top-0 bottom-0 left-3/4 w-px bg-green-500/30"></div>
              </div>
            </div>

            {/* Right side - Content display */}
            <div className="hidden md:block w-1/2 h-full relative border-l border-green-900/50">
              {activeUtility ? (
                <motion.div
                  className="absolute inset-0 p-8 flex flex-col justify-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-light text-green-400 mb-4">
                    {tokenUtilities.find((u) => u.id === activeUtility)?.title}
                  </h3>
                  <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-green-900/30">
                    <p className="text-gray-300 leading-relaxed">
                      {tokenUtilities.find((u) => u.id === activeUtility)?.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-green-400 text-sm">Hover over other nodes to explore more utilities</span>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center">
                  <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-green-900/30 max-w-md">
                    <div className="text-green-400 mb-4">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mx-auto"
                      >
                        <path
                          d="M12 3L20 7V11C20 15.4183 16.4183 19 12 19C7.58172 19 4 15.4183 4 11V7L12 3Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path d="M12 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M12 13L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <p className="text-gray-400">
                      Explore the $PRX token ecosystem by hovering over the nodes on the left to discover how our token
                      powers the privacy network.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile tooltip for active utility */}
            <motion.div
              className="md:hidden absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-green-500/50 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: activeUtility ? 1 : 0, y: activeUtility ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              {activeUtility && (
                <>
                  <h3 className="text-green-400 font-medium mb-2">
                    {tokenUtilities.find((u) => u.id === activeUtility)?.title}
                  </h3>
                  <p className="text-gray-300 text-sm max-h-32 overflow-y-auto">
                    {tokenUtilities.find((u) => u.id === activeUtility)?.description}
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Token Utility Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tokenUtilities.map((utility, index) => {
            // Create a condensed version of the description for the cards
            const condensedDescription = utility.description.split(".")[0] + "."

            return (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all duration-300 flex flex-col items-center"
                onMouseEnter={() => setActiveUtility(utility.id)}
                onMouseLeave={() => setActiveUtility(null)}
              >
                <div className="text-green-400 mb-4">{utility.icon}</div>
                <h3 className="text-xl font-light mb-3 text-center text-green-400">{utility.title}</h3>
                <p className="text-gray-400 text-center text-sm">{condensedDescription}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

