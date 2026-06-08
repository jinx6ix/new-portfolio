"use client"

import { useEffect, useRef } from "react"

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0
    let startTime = Date.now()

    const particles: LoadingParticle[] = []
    const nodes: { x: number; y: number; z: number; connections: number[]; pulsePhase: number; type: "shield" | "code" | "lock" }[] = []

    class LoadingParticle {
      x: number
      y: number
      z: number
      size: number
      speedX: number
      speedY: number
      speedZ: number
      hue: number

      constructor(width: number, height: number) {
        this.x = Math.random() * width - width / 2
        this.y = Math.random() * height - height / 2
        this.z = Math.random() * 500 - 250
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.speedZ = (Math.random() - 0.5) * 2
        this.hue = Math.random() * 60 + 220
      }

      update(width: number, height: number) {
        this.x += this.speedX
        this.y += this.speedY
        this.z += this.speedZ
        if (this.x < -width / 2) this.x = width / 2
        if (this.x > width / 2) this.x = -width / 2
        if (this.y < -height / 2) this.y = height / 2
        if (this.y > height / 2) this.y = -height / 2
        if (this.z < -250) this.z = 250
        if (this.z > 250) this.z = -250
      }

      draw(context: CanvasRenderingContext2D, centerX: number, centerY: number) {
        const scale = 300 / (this.z + 300)
        const x2D = this.x * scale + centerX
        const y2D = this.y * scale + centerY
        const size = this.size * scale
        const alpha = Math.min(1, Math.max(0.2, scale * 0.8))
        context.beginPath()
        context.arc(x2D, y2D, size, 0, Math.PI * 2)
        context.fillStyle = `hsla(${this.hue}, 80%, 65%, ${alpha})`
        context.fill()
      }
    }

    function resize() {
      if (!canvas || !ctx) return
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    function drawHexagon(context: CanvasRenderingContext2D, x: number, y: number, size: number, rotation: number) {
      context.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        if (i === 0) context.moveTo(px, py)
        else context.lineTo(px, py)
      }
      context.closePath()
    }

    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < 100; i++) {
      particles.push(new LoadingParticle(canvas.width, canvas.height))
    }

    function animate() {
      if (!canvas || !ctx) return
      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio
      const centerX = width / 2
      const centerY = height / 2

      ctx.fillStyle = "rgba(10, 10, 20, 0.2)"
      ctx.fillRect(0, 0, width, height)

      particles.forEach((p) => {
        p.update(width, height)
        p.draw(ctx, centerX, centerY)
      })

      const hexSize = 60 + Math.sin(time * 0.02) * 10
      const hexRotation = time * 0.01

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(hexRotation)

      for (let i = 0; i < 3; i++) {
        const offset = i * 30
        drawHexagon(ctx, 0, 0, hexSize + offset, hexRotation + i * 0.5)
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.3 - i * 0.1})`
        ctx.lineWidth = 2 - i * 0.5
        ctx.stroke()
      }

      ctx.beginPath()
      drawHexagon(ctx, 0, 0, hexSize * 0.6, -hexRotation * 2)
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, hexSize * 0.6)
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.4)")
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)")
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()

      time++

      const elapsed = Date.now() - startTime
      const progress = Math.min(100, (elapsed / 3000) * 100)
      
      const progressBar = document.getElementById("loading-progress")
      if (progressBar) progressBar.style.width = `${progress}%`

      if (progress >= 100) {
        cancelAnimationFrame(animationId)
        setTimeout(() => onComplete(), 200)
        return
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="relative z-10 text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
              IAN IRAYA
            </span>
          </h1>
          <p className="text-lg text-muted-foreground tracking-widest uppercase">Loading Experience</p>
        </div>
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div id="loading-progress" className="h-full bg-gradient-to-r from-primary via-purple-500 to-accent transition-all duration-100" style={{ width: "0%" }} />
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Preparing secure connections...</p>
      </div>
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted-foreground/50">Web Developer • Cybersecurity Expert • SEO Manager</p>
      </div>
    </div>
  )
}