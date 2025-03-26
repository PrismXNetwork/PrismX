"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight, Twitter, Github } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SimplePrismAnimation from "@/components/animations/SimplePrismAnimation"
import NetworkGrowth from "@/components/animations/NetworkGrowth"
import PrivacyProtectionProcess from "@/components/animations/PrivacyProtectionProcess"
import TokenUtilityFlow from "@/components/animations/TokenUtilityFlow"
import { PrismButton, PrismInput, ScrollFadeIn } from "@/components/animations/MicroInteractions"
import { useToast } from "@/hooks/use-toast"
import { FaTwitter, FaGithub } from "react-icons/fa"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const gradientRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    // Here you would typically send this to your API
    toast({
      title: "Subscription successful!",
      description: "Thank you for joining the PrismX community.",
      variant: "default",
    })
    setEmail("")
  }

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleReducedMotionChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", handleReducedMotionChange)

    const handleMouseMove = (e: MouseEvent) => {
      if (gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        gradientRef.current.style.setProperty("--mouse-x", `${x}px`)
        gradientRef.current.style.setProperty("--mouse-y", `${y}px`)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    setIsLoaded(true)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      mediaQuery.removeEventListener("change", handleReducedMotionChange)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-black text-white overflow-hidden"
        >
          <div
            ref={gradientRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0,255,0,0.1), transparent)",
              transition: "background 0.6s ease-out",
            }}
          />

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-4 md:p-6 relative z-10"
          >
            <nav className="flex justify-between items-center max-w-6xl mx-auto">
              <Link href="/" className="flex items-center">
                <div className="relative w-10 h-10 mr-2">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Transparent background */}

                    {/* Main prism */}
                    <polygon points="50,10 90,90 10,90" fill="none" stroke="url(#headerLogoGradient)" strokeWidth="2" />

                    {/* Inner prism */}
                    <polygon
                      points="50,30 75,80 25,80"
                      fill="none"
                      stroke="url(#headerInnerGradient)"
                      strokeWidth="1.5"
                      opacity="0.7"
                    />

                    {/* Light beams */}
                    <path d="M50,10 L50,0" stroke="url(#headerBeamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                    <path d="M10,90 L0,95" stroke="url(#headerBeamGradient)" strokeWidth="1.5" strokeDasharray="2,2" />
                    <path
                      d="M90,90 L100,95"
                      stroke="url(#headerBeamGradient)"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />

                    {/* Refracted light */}
                    <path d="M50,80 L30,100" stroke="url(#headerRefractGradient)" strokeWidth="1" />
                    <path d="M50,80 L50,100" stroke="url(#headerRefractGradient)" strokeWidth="1" />
                    <path d="M50,80 L70,100" stroke="url(#headerRefractGradient)" strokeWidth="1" />

                    {/* Eye element (replacing the circle) */}
                    <g transform="translate(50,50)">
                      {/* Eye outline */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="8"
                        ry="5"
                        fill="none"
                        stroke="url(#headerLogoGradient)"
                        strokeWidth="1"
                      />

                      {/* Pupil */}
                      <circle cx="0" cy="0" r="3" fill="url(#headerLogoGradient)" />

                      {/* Highlight */}
                      <circle cx="-1" cy="-1" r="1" fill="#FFFFFF" opacity="0.7" />
                    </g>

                    <defs>
                      <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14F195" />
                        <stop offset="100%" stopColor="#0A9D63" />
                      </linearGradient>

                      <linearGradient id="headerInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14F195" />
                        <stop offset="100%" stopColor="#0A9D63" />
                      </linearGradient>

                      <linearGradient id="headerBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14F195" />
                        <stop offset="100%" stopColor="rgba(20,241,149,0)" />
                      </linearGradient>

                      <linearGradient id="headerRefractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#14F195" />
                        <stop offset="100%" stopColor="rgba(20,241,149,0.3)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="text-xl font-light hover:text-green-400 transition-all duration-300 ease-out">
                  PrismX
                </span>
              </Link>
              <div className="space-x-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("technology")}
                  className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out"
                >
                  Technology
                </button>
                <button
                  onClick={() => scrollToSection("token")}
                  className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out"
                >
                  Token
                </button>
                <button
                  onClick={() => scrollToSection("roadmap")}
                  className="relative px-4 py-2 text-sm text-gray-400 hover:text-green-400 transition-all duration-300 ease-out rounded-full bg-black/20 backdrop-blur-sm border border-gray-800 hover:border-green-900"
                >
                  Roadmap
                </button>
              </div>
            </nav>
          </motion.header>

          <main className="relative z-10">
            {/* Hero Section with Prism Animation */}
            <section className="max-w-6xl mx-auto px-4 py-12 md:py-24 mb-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-12">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                  >
                    <h1 className="text-4xl md:text-6xl font-light leading-tight">
                      Refracting the <br />
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-green-400 inline-block"
                      >
                        Light
                      </motion.span>{" "}
                      <br />
                      of Surveillance
                    </h1>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-xl md:text-2xl font-light leading-relaxed text-gray-400 max-w-2xl"
                  >
                    Fast, scalable privacy protection on Solana. Earn $PRX tokens while defending against AI
                    surveillance.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Button
                      asChild
                      className="relative bg-black/20 backdrop-blur-sm text-green-400 rounded-full px-8 py-6 text-lg font-light border border-green-950 shadow-[0_0_15px_rgba(0,255,0,0.1)] hover:shadow-[0_0_25px_rgba(0,255,0,0.2)] hover:border-green-900 transition-all duration-500 ease-out group overflow-hidden"
                    >
                      <Link href="/signup">
                        <span className="relative z-10">Join the Network</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="relative bg-black/20 backdrop-blur-sm text-gray-400 rounded-full px-8 py-6 text-lg font-light border border-gray-800 shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-gray-700 hover:text-gray-300 transition-all duration-500 ease-out group overflow-hidden"
                    >
                      <span className="relative z-10">Learn More</span>
                      <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    </Button>
                  </motion.div>
                </div>

                {/* Simple Prism Animation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="border border-green-900/30 rounded-lg overflow-hidden"
                >
                  <SimplePrismAnimation />
                </motion.div>
              </div>
            </section>

            {/* Problem Statement Section */}
            <section id="about" className="py-20 px-4 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFadeIn>
                    <h2 className="text-3xl md:text-4xl font-light mb-4">The Privacy Crisis</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      AI surveillance systems are becoming increasingly sophisticated, tracking and profiling users
                      across platforms with unprecedented accuracy.
                    </p>
                  </ScrollFadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Pervasive Tracking",
                      description:
                        "Modern AI systems can identify and track individuals across devices, platforms, and physical spaces.",
                    },
                    {
                      title: "Behavioral Profiling",
                      description:
                        "Your digital footprint is analyzed to predict behaviors, preferences, and vulnerabilities.",
                    },
                    {
                      title: "Asymmetric Power",
                      description:
                        "Individual privacy measures are becoming less effective against sophisticated surveillance networks.",
                    },
                  ].map((item, index) => (
                    <ScrollFadeIn key={index} delay={index * 0.1}>
                      <div className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all duration-300">
                        <h3 className="text-xl font-light mb-3 text-center text-green-400">{item.title}</h3>
                        <p className="text-gray-400 text-center">{item.description}</p>
                      </div>
                    </ScrollFadeIn>
                  ))}
                </div>
              </div>
            </section>

            {/* Network Growth Visualization */}
            <section id="technology" className="py-20 px-4 bg-gradient-to-b from-black to-green-950/20 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.15),transparent_70%)]" />
              </div>

              <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <ScrollFadeIn>
                    <h2 className="text-3xl md:text-4xl font-light mb-4">Network Growth Visualization</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      See how the PrismX network becomes stronger with each new participant.
                    </p>
                  </ScrollFadeIn>
                </div>

                <NetworkGrowth />

                <div className="mt-16">
                  <ScrollFadeIn delay={0.2}>
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-light mb-6 text-green-400">Collective Defense</h3>
                        <p className="text-gray-300 mb-6">
                          PrismX creates a network effect where each new participant strengthens the privacy protection
                          for everyone. By contributing computing resources, you help generate adversarial patterns that
                          confuse AI surveillance systems.
                        </p>
                        <ul className="space-y-4">
                          {[
                            "Distributed computing power creates a stronger defense",
                            "Network becomes more effective as it grows",
                            "Adaptive protection that evolves with surveillance techniques",
                            "Solana blockchain ensures fast, low-cost coordination",
                          ].map((item, index) => (
                            <li key={index} className="flex items-start">
                              <div className="mr-3 mt-1 text-green-500">
                                <ChevronRight size={16} />
                              </div>
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Option 1 - Key Benefits */}
                      <div className="md:w-1/2">
                        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-xl border border-green-900/50">
                          <h4 className="text-xl font-light mb-4 text-green-400">Key Benefits</h4>
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="mr-3 mt-1 text-green-500">
                                <ChevronRight size={16} />
                              </div>
                              <div>
                                <h5 className="text-green-400 font-medium">Privacy by Design</h5>
                                <p className="text-gray-300 text-sm">
                                  Built from the ground up with privacy as the core principle, not an afterthought
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="mr-3 mt-1 text-green-500">
                                <ChevronRight size={16} />
                              </div>
                              <div>
                                <h5 className="text-green-400 font-medium">Decentralized Architecture</h5>
                                <p className="text-gray-300 text-sm">
                                  No single point of failure or control, ensuring resilience against attacks
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <div className="mr-3 mt-1 text-green-500">
                                <ChevronRight size={16} />
                              </div>
                              <div>
                                <h5 className="text-green-400 font-medium">Sustainable Incentives</h5>
                                <p className="text-gray-300 text-sm">
                                  Token rewards align participant interests with network growth and privacy goals
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollFadeIn>
                </div>
              </div>
            </section>

            {/* Privacy Protection Process */}
            <PrivacyProtectionProcess />

            {/* Token Utility Flow */}
            <section id="token" className="bg-gradient-to-b from-green-950/20 to-black relative">
              <TokenUtilityFlow />
            </section>

            {/* Roadmap Section */}
            <section id="roadmap" className="py-20 px-4 relative">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <ScrollFadeIn>
                    <h2 className="text-3xl md:text-4xl font-light mb-4">Development Roadmap</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Our journey to build a privacy-first future.
                    </p>
                  </ScrollFadeIn>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-gradient-to-b from-green-500 to-green-700 transform -translate-x-1/2" />

                  <div className="space-y-12">
                    {[
                      {
                        phase: "Phase 1: Foundation",
                        items: [
                          "Browser extension MVP development",
                          "Core privacy algorithm implementation",
                          "Initial smart contract deployment on Solana devnet",
                          "Community building and early tester recruitment",
                        ],
                        completed: true,
                      },
                      {
                        phase: "Phase 2: Launch",
                        items: [
                          "Public beta release of browser extension",
                          "$PRX token generation event",
                          "DEX listings and liquidity provision",
                          "Basic token reward system activation",
                        ],
                        completed: true,
                      },
                      {
                        phase: "Phase 3: Expansion",
                        items: [
                          "Mobile application release",
                          "Advanced privacy protection features",
                          "Developer SDK and documentation",
                          "Enterprise integration capabilities",
                        ],
                        completed: false,
                      },
                      {
                        phase: "Phase 4: Ecosystem",
                        items: [
                          "Full decentralization of governance",
                          "Expanded protection against new surveillance types",
                          "Cross-chain bridges for broader ecosystem integration",
                          "Advanced tokenomics with staking mechanisms",
                        ],
                        completed: false,
                      },
                    ].map((phase, index) => (
                      <div key={index} className="relative">
                        <ScrollFadeIn
                          className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
                          delay={index * 0.1}
                        >
                          <div className="bg-black/20 backdrop-blur-sm p-8 rounded-xl border border-green-900/50 hover:border-green-500/50 transition-all duration-300">
                            <div className="flex items-center mb-4">
                              <h3 className="text-xl font-light">{phase.phase}</h3>
                              <span
                                className={`ml-auto px-3 py-1 rounded-full text-xs ${
                                  phase.completed ? "bg-green-900/50 text-green-400" : "bg-green-900/50 text-green-400"
                                }`}
                              >
                                {phase.completed ? "Completed" : "In Progress"}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {phase.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start">
                                  <div className="mr-3 mt-1 text-green-500">
                                    <ChevronRight size={16} />
                                  </div>
                                  <span className="text-gray-300">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </ScrollFadeIn>

                        {/* Timeline Dot */}
                        <div className="hidden md:block absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-green-700" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Browser Plugin Mockup Section */}
            <section id="plugin" className="py-20 px-4 bg-gradient-to-b from-black to-green-950/10 relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,0,0.05),transparent_70%)]" />
              </div>

              <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <ScrollFadeIn>
                    <h2 className="text-3xl md:text-4xl font-light mb-4">PrismX Browser Extension</h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto mb-8"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                      Protect your privacy with just one click. Our browser extension makes privacy protection simple
                      and rewarding.
                    </p>
                  </ScrollFadeIn>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <ScrollFadeIn delay={0.2}>
                    <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-green-900/50 shadow-[0_0_25px_rgba(0,255,0,0.1)]">
                      <div className="bg-gray-900 rounded-t-lg p-2 flex items-center border-b border-gray-800">
                        <div className="flex space-x-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto pr-6 text-sm text-gray-400">PrismX Privacy Shield</div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded-b-lg">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            <div className="relative w-8 h-8 mr-2">
                              <svg viewBox="0 0 100 100" className="w-full h-full">
                                {/* Main prism */}
                                <polygon
                                  points="50,10 90,90 10,90"
                                  fill="none"
                                  stroke="url(#pluginGradient)"
                                  strokeWidth="2"
                                />

                                {/* Inner prism */}
                                <polygon
                                  points="50,30 75,80 25,80"
                                  fill="none"
                                  stroke="url(#pluginInnerGradient)"
                                  strokeWidth="1.5"
                                  opacity="0.7"
                                />

                                {/* Light beams */}
                                <path
                                  d="M50,10 L50,0"
                                  stroke="url(#pluginBeamGradient)"
                                  strokeWidth="1.5"
                                  strokeDasharray="2,2"
                                />
                                <path
                                  d="M10,90 L0,95"
                                  stroke="url(#pluginBeamGradient)"
                                  strokeWidth="1.5"
                                  strokeDasharray="2,2"
                                />
                                <path
                                  d="M90,90 L100,95"
                                  stroke="url(#pluginBeamGradient)"
                                  strokeWidth="1.5"
                                  strokeDasharray="2,2"
                                />

                                {/* Refracted light */}
                                <path d="M50,80 L30,100" stroke="url(#pluginRefractGradient)" strokeWidth="1" />
                                <path d="M50,80 L50,100" stroke="url(#pluginRefractGradient)" strokeWidth="1" />
                                <path d="M50,80 L70,100" stroke="url(#pluginRefractGradient)" strokeWidth="1" />

                                {/* Circular element */}
                                <circle
                                  cx="50"
                                  cy="50"
                                  r="5"
                                  fill="none"
                                  stroke="url(#pluginGradient)"
                                  strokeWidth="1"
                                />

                                <defs>
                                  <linearGradient id="pluginGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FF00" />
                                    <stop offset="100%" stopColor="#00AA00" />
                                  </linearGradient>
                                  <linearGradient id="pluginInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FF00" />
                                    <stop offset="100%" stopColor="#00AA00" />
                                  </linearGradient>
                                  <linearGradient id="pluginBeamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FF00" />
                                    <stop offset="100%" stopColor="rgba(0,255,0,0)" />
                                  </linearGradient>
                                  <linearGradient id="pluginRefractGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00FF00" />
                                    <stop offset="100%" stopColor="rgba(0,255,0,0.3)" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                            <span className="text-green-400 font-medium">PrismX</span>
                          </div>

                          <div className="flex items-center">
                            <div className="w-12 h-6 bg-green-900/50 rounded-full p-1 flex items-center mr-2">
                              <div className="w-4 h-4 bg-green-400 rounded-full transform translate-x-6"></div>
                            </div>
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Privacy Shield Strength</span>
                            <span className="text-green-400">92%</span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-700 w-[92%]"></div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">Network Contribution</span>
                            <span className="text-green-400">3.2 GB/day</span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-700 w-[75%]"></div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-400">$PRX Earned Today</span>
                            <span className="text-green-400">12.5 PRX</span>
                          </div>
                          <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-700 w-[60%]"></div>
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-4 mb-6">
                          <div className="flex items-center mb-2">
                            <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                              <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-green-400 text-sm font-medium">Privacy Status</span>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Your browsing is currently protected. PrismX is actively generating privacy-enhancing
                            patterns to shield your digital footprint.
                          </p>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex-1 px-4 py-2 bg-green-900/30 text-green-400 rounded-md border border-green-900/50 hover:bg-green-900/50 transition-colors">
                            Settings
                          </button>
                          <button className="flex-1 px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-400 transition-colors">
                            View Earnings
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollFadeIn>

                  <ScrollFadeIn delay={0.4}>
                    <div className="space-y-8">
                      <h3 className="text-2xl font-light text-green-400">Privacy Protection Made Simple</h3>
                      <p className="text-gray-300">
                        The PrismX browser extension works seamlessly in the background, protecting your privacy while
                        you browse the web. Install once and enjoy continuous protection against AI surveillance
                        systems.
                      </p>

                      <ul className="space-y-4">
                        {[
                          "One-click installation and activation",
                          "Real-time privacy protection metrics",
                          "Adjustable resource contribution levels",
                          "Automatic $PRX token rewards",
                          "Detailed privacy analytics dashboard",
                          "Compatible with Chrome, Firefox, and Edge",
                        ].map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <div className="mr-3 mt-1 text-green-500">
                              <ChevronRight size={16} />
                            </div>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4">
                        <PrismButton className="px-8 py-3">Coming Soon in Q2 of 2025</PrismButton>
                      </div>
                    </div>
                  </ScrollFadeIn>
                </div>
              </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-4 bg-black/50 backdrop-blur-sm border-t border-green-900/30">
              <div className="max-w-3xl mx-auto text-center">
                <ScrollFadeIn>
                  <h2 className="text-3xl font-light mb-4">Join the Privacy Revolution</h2>
                  <p className="text-gray-300 mb-8">
                    Subscribe to our newsletter for updates on PrismX development, privacy news, and token
                    announcements.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <PrismInput
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <PrismButton onClick={handleSubscribe}>Subscribe</PrismButton>
                  </div>
                </ScrollFadeIn>
              </div>
            </section>
          </main>

          <footer className="py-12 px-4 bg-black border-t border-green-900/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="relative w-8 h-8 mr-2">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Main prism */}
                      <polygon
                        points="50,10 90,90 10,90"
                        fill="none"
                        stroke="url(#footerLogoGradient)"
                        strokeWidth="2"
                      />

                      {/* Inner prism */}
                      <polygon
                        points="50,30 75,80 25,80"
                        fill="none"
                        stroke="url(#footerInnerGradient)"
                        strokeWidth="1.5"
                        opacity="0.7"
                      />

                      {/* Eye element */}
                      <g transform="translate(50,50)">
                        <ellipse
                          cx="0"
                          cy="0"
                          rx="8"
                          ry="5"
                          fill="none"
                          stroke="url(#footerLogoGradient)"
                          strokeWidth="1"
                        />
                        <circle cx="0" cy="0" r="3" fill="url(#footerLogoGradient)" />
                      </g>

                      <defs>
                        <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="#0A9D63" />
                        </linearGradient>
                        <linearGradient id="footerInnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14F195" />
                          <stop offset="100%" stopColor="#0A9D63" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span className="text-xl font-light text-green-400">PrismX</span>
                </div>

                <div className="flex space-x-6">
                  <a
                    href="https://x.com/PrismXNetwork"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <FaTwitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://github.com/PrismXNetwork/PrismX"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <FaGithub className="h-6 w-6" />
                  </a>
                </div>
              </div>

              <div className="border-t border-green-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  &copy; {new Date().getFullYear()} PrismX. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <a href="/privacy" className="text-gray-500 text-sm hover:text-green-400 transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-gray-500 text-sm hover:text-green-400 transition-colors">
                    Terms of Service
                  </a>
                  <a href="/contact" className="text-gray-500 text-sm hover:text-green-400 transition-colors">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

