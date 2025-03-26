"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg shadow-purple-900/10" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Transparent background */}

                {/* Main prism */}
                <polygon points="50,10 90,90 10,90" fill="none" stroke="url(#logoGradient)" strokeWidth="2" />

                {/* Inner prism */}
                <polygon
                  points="50,30 75,80 25,80"
                  fill="none"
                  stroke="url(#innerGradient)"
                  strokeWidth="1.5"
                  opacity="0.7"
                />

                {/* Light beams */}
                <path d="M50,10 L50,0" stroke="url(#beamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M10,90 L0,95" stroke="url(#beamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                <path d="M90,90 L100,95" stroke="url(#beamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />

                {/* Refracted light */}
                <path d="M50,80 L30,100" stroke="url(#refractGradient)" strokeWidth="1" />
                <path d="M50,80 L50,100" stroke="url(#refractGradient)" strokeWidth="1" />
                <path d="M50,80 L70,100" stroke="url(#refractGradient)" strokeWidth="1" />

                {/* Eye element (replacing the circle) */}
                <g transform="translate(50,50)">
                  {/* Eye outline */}
                  <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="url(#logoGradient)" strokeWidth="1" />

                  {/* Pupil */}
                  <circle cx="0" cy="0" r="3" fill="url(#logoGradient)" />

                  {/* Highlight */}
                  <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.7" />
                </g>

                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="#0A9D63" />
                  </linearGradient>

                  <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="#0A9D63" />
                  </linearGradient>

                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="rgba(20,241,149,0)" />
                  </linearGradient>

                  <linearGradient id="refractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#14F195" />
                    <stop offset="100%" stopColor="rgba(20,241,149,0.3)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
              PrismX
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-gray-300 hover:text-purple-400 transition-colors">
              About
            </Link>
            <Link href="#technology" className="text-gray-300 hover:text-purple-400 transition-colors">
              Technology
            </Link>
            <Link href="#roadmap" className="text-gray-300 hover:text-purple-400 transition-colors">
              Roadmap
            </Link>
            <Link href="#token" className="text-gray-300 hover:text-purple-400 transition-colors">
              Token
            </Link>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full">
              Join Network
            </Button>
          </nav>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-10">
                <Link href="/" className="flex items-center">
                  <div className="relative w-8 h-8 mr-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Transparent background */}

                      {/* Main prism */}
                      <polygon
                        points="50,10 90,90 10,90"
                        fill="none"
                        stroke="url(#mobileLogoGradient)"
                        strokeWidth="2"
                      />

                      {/* Inner prism */}
                      <polygon
                        points="50,30 75,80 25,80"
                        fill="none"
                        stroke="url(#mobileInnerGradient)"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />

                      {/* Light beams */}
                      <path
                        d="M50,10 L50,0"
                        stroke="url(#mobileBeamGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      <path
                        d="M10,90 L0,95"
                        stroke="url(#mobileBeamGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      <path
                        d="M90,90 L100,95"
                        stroke="url(#mobileBeamGradient)"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />

                      {/* Refracted light */}
                      <path d="M50,80 L30,100" stroke="url(#mobileRefractGradient)" strokeWidth="1" />
                      <path d="M50,80 L50,100" stroke="url(#mobileRefractGradient)" strokeWidth="1" />
                      <path d="M50,80 L70,100" stroke="url(#mobileRefractGradient)" strokeWidth="1" />

                      {/* Eye element (replacing the circle) */}
                      <g transform="translate(50,50)">
                        {/* Eye outline */}
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="8"
                          ry="5"
                          fill="none"
                          stroke="url(#mobileLogoGradient)"
                          strokeWidth="1"
                        />

                        {/* Pupil */}
                        <circle cx="0" cy="0" r="3" fill="url(#mobileLogoGradient)" />

                        {/* Highlight */}
                        <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.7" />
                      </g>

                      <defs>
                        <linearGradient id="mobileLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="#0A9D63" />
                        </linearGradient>

                        <linearGradient id="mobileInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="#0A9D63" />
                        </linearGradient>

                        <linearGradient id="mobileBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="rgba(20,241,149,0)" />
                        </linearGradient>

                        <linearGradient id="mobileRefractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="rgba(20,241,149,0.3)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
                    PrismX
                  </span>
                </Link>
                <button className="text-white" onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col space-y-6 text-center mt-10">
                <Link
                  href="#about"
                  className="text-xl text-gray-300 hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="#technology"
                  className="text-xl text-gray-300 hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Technology
                </Link>
                <Link
                  href="#roadmap"
                  className="text-xl text-gray-300 hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Roadmap
                </Link>
                <Link
                  href="#token"
                  className="text-xl text-gray-300 hover:text-purple-400 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Token
                </Link>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full mt-4 py-6"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Network
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

