"use client"

import { useEffect, useRef } from "react"

export default function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []
    let mouseX = 0
    let mouseY = 0

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      hue: number
      alpha: number
      width: number
      height: number

      constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.size = Math.random() * 2 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.hue = Math.random() * 60 + 200
        this.alpha = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          this.x -= dx * 0.01
          this.y -= dy * 0.01
        }

        if (this.x < 0 || this.x > this.width) this.speedX *= -1
        if (this.y < 0 || this.y > this.height) this.speedY *= -1
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.alpha})`
        context.fill()
      }
    }

    class Shield {
      x: number
      y: number
      size: number
      rotation: number
      rotationSpeed: number
      floatOffset: number
      floatSpeed: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.size = 120
        this.rotation = 0
        this.rotationSpeed = 0.003
        this.floatOffset = 0
        this.floatSpeed = 0.02
      }

      update(time: number) {
        this.rotation += this.rotationSpeed
        this.floatOffset = Math.sin(time * this.floatSpeed) * 8
      }

      draw(context: CanvasRenderingContext2D) {
        context.save()
        context.translate(this.x, this.y + this.floatOffset)
        context.rotate(this.rotation)

        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.size)
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.3)")
        gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.1)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0)")

        context.beginPath()
        context.moveTo(0, -this.size)
        context.bezierCurveTo(this.size * 0.8, -this.size * 0.8, this.size * 0.8, this.size * 0.4, 0, this.size)
        context.bezierCurveTo(-this.size * 0.8, this.size * 0.4, -this.size * 0.8, -this.size * 0.8, 0, -this.size)
        context.fillStyle = gradient
        context.fill()

        context.strokeStyle = "rgba(139, 92, 246, 0.5)"
        context.lineWidth = 2
        context.stroke()

        context.beginPath()
        context.moveTo(0, -this.size * 0.6)
        context.lineTo(0, this.size * 0.6)
        context.moveTo(-this.size * 0.4, 0)
        context.lineTo(this.size * 0.4, 0)
        context.strokeStyle = "rgba(255, 255, 255, 0.2)"
        context.lineWidth = 1
        context.stroke()

        context.restore()
      }
    }

    class ConnectionLine {
      x1: number
      y1: number
      x2: number
      y2: number
      progress: number
      speed: number

      constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.progress = 0
        this.speed = 0.005 + Math.random() * 0.01
      }

      update() {
        this.progress += this.speed
        if (this.progress > 1) {
          this.progress = 0
        }
      }

      draw(context: CanvasRenderingContext2D) {
        const x = this.x1 + (this.x2 - this.x1) * this.progress
        const y = this.y1 + (this.y2 - this.y1) * this.progress

        context.beginPath()
        context.arc(x, y, 3, 0, Math.PI * 2)
        context.fillStyle = `rgba(139, 92, 246, ${0.8 - this.progress * 0.5})`
        context.fill()

        context.beginPath()
        context.moveTo(this.x1, this.y1)
        context.lineTo(x, y)
        context.strokeStyle = `rgba(139, 92, 246, 0.1)`
        context.lineWidth = 1
        context.stroke()
      }
    }

    function init() {
      if (!canvas) return
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      particles = []
      const particleCount = Math.min(50, Math.floor((rect.width * rect.height) / 15000))
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(rect.width, rect.height))
      }

      shield = new Shield(rect.width / 2, rect.height / 2)
      connections = []

      setTimeout(() => {
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        for (let i = 0; i < 3; i++) {
          const angle = (Math.PI * 2 * i) / 3 + Math.random() * 0.5
          const dist = 80 + Math.random() * 40
          const x = centerX + Math.cos(angle) * dist
          const y = centerY + Math.sin(angle) * dist
          connections.push(new ConnectionLine(centerX, centerY, x, y))
        }
      }, 500)
    }

    let shield: Shield
    let connections: ConnectionLine[] = []
    let time = 0

    function animate() {
      if (!canvas) return
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      time += 1
      shield.update(time)

      connections.forEach((c) => {
        c.update()
        c.draw(ctx)
      })

      particles.forEach((p) => {
        p.update()
        p.draw(ctx)
      })

      shield.draw(ctx)

      animationId = requestAnimationFrame(animate)
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function handleResize() {
      init()
    }

    if (!canvas) return
    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    init()
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}