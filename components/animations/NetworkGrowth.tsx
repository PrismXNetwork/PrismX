"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type Node = {
  id: number
  x: number
  y: number
  size: number
  connections: number[]
  pulseDelay: number
}

type Connection = {
  from: number
  to: number
  active: boolean
  particlePosition: number
  particleSpeed: number
}

export default function NetworkGrowth() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()

  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [networkSize, setNetworkSize] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  // Initialize network
  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      setDimensions({ width, height })

      // Create initial nodes
      const initialNodes: Node[] = []
      for (let i = 0; i < 12; i++) {
        initialNodes.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 2,
          connections: [],
          pulseDelay: Math.random() * 3,
        })
      }

      // Create initial connections
      const initialConnections: Connection[] = []
      initialNodes.forEach((node, i) => {
        // Connect to 2-4 random nodes
        const numConnections = Math.floor(Math.random() * 3) + 2
        for (let j = 0; j < numConnections; j++) {
          let targetIndex
          do {
            targetIndex = Math.floor(Math.random() * initialNodes.length)
          } while (targetIndex === i || node.connections.includes(targetIndex))

          node.connections.push(targetIndex)
          initialConnections.push({
            from: i,
            to: targetIndex,
            active: Math.random() > 0.5,
            particlePosition: Math.random(),
            particleSpeed: Math.random() * 0.01 + 0.005,
          })
        }
      })

      setNodes(initialNodes)
      setConnections(initialConnections)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw connections
      connections.forEach((connection) => {
        const fromNode = nodes[connection.from]
        const toNode = nodes[connection.to]

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(fromNode.x, fromNode.y)
        ctx.lineTo(toNode.x, toNode.y)
        ctx.strokeStyle = "rgba(0, 255, 0, 0.15)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw particle if connection is active
        if (connection.active) {
          const dx = toNode.x - fromNode.x
          const dy = toNode.y - fromNode.y
          const particleX = fromNode.x + dx * connection.particlePosition
          const particleY = fromNode.y + dy * connection.particlePosition

          ctx.beginPath()
          ctx.arc(particleX, particleY, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(0, 255, 0, 0.8)"
          ctx.fill()

          // Update particle position
          connection.particlePosition += connection.particleSpeed
          if (connection.particlePosition > 1) {
            connection.particlePosition = 0
          }
        }
      })

      // Draw nodes
      nodes.forEach((node, index) => {
        // Node pulse effect
        const time = performance.now() / 1000
        const pulse = Math.sin(time + node.pulseDelay) * 0.5 + 0.5
        const nodeSize = node.size * (1 + pulse * 0.3)

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = index < networkSize ? "rgba(0, 255, 0, 0.8)" : "rgba(0, 255, 0, 0.3)"
        ctx.fill()

        // Draw glow
        if (index < networkSize) {
          const gradient = ctx.createRadialGradient(node.x, node.y, nodeSize, node.x, node.y, nodeSize * 3)
          gradient.addColorStop(0, "rgba(0, 255, 0, 0.3)")
          gradient.addColorStop(1, "rgba(0, 255, 0, 0)")

          ctx.beginPath()
          ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodes, connections, dimensions, networkSize])

  // Trigger network growth animation when in view
  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })

      // Gradually increase network size
      const interval = setInterval(() => {
        setNetworkSize((prev) => {
          if (prev < nodes.length) return prev + 1
          clearInterval(interval)
          return prev
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [isInView, controls, nodes.length])

  // Add new node on hover
  const handleAddNode = () => {
    if (nodes.length >= 20) return

    const newNodeId = nodes.length
    const newNode: Node = {
      id: newNodeId,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 3 + 2,
      connections: [],
      pulseDelay: Math.random() * 3,
    }

    // Connect to 2-3 existing nodes
    const numConnections = Math.floor(Math.random() * 2) + 2
    const newConnections: Connection[] = []

    for (let i = 0; i < numConnections; i++) {
      const targetIndex = Math.floor(Math.random() * nodes.length)
      newNode.connections.push(targetIndex)

      newConnections.push({
        from: newNodeId,
        to: targetIndex,
        active: true,
        particlePosition: 0,
        particleSpeed: Math.random() * 0.01 + 0.005,
      })
    }

    setNodes((prev) => [...prev, newNode])
    setConnections((prev) => [...prev, ...newConnections])
    setNetworkSize((prev) => prev + 1)
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="w-full h-full" />
      </motion.div>

      <motion.div
        className="absolute bottom-4 right-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleAddNode}
          className="px-4 py-2 bg-black/50 border border-green-500/30 text-green-400 rounded-md hover:bg-black/70 hover:border-green-500/50 transition-all"
        >
          Add Node
        </button>
      </motion.div>

      <motion.div
        className="absolute top-4 left-4 text-green-400 bg-black/50 px-3 py-1 rounded-md text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Network Nodes: {networkSize}
      </motion.div>
    </div>
  )
}

