"use client"

import { useEffect, useRef } from "react"
import { getRandomKeywords, type Keyword } from "@/lib/keywords"

interface Vector2D {
  x: number
  y: number
}

class Particle {
  pos: Vector2D = { x: 0, y: 0 }
  vel: Vector2D = { x: 0, y: 0 }
  acc: Vector2D = { x: 0, y: 0 }
  target: Vector2D = { x: 0, y: 0 }

  closeEnoughTarget = 60
  maxSpeed = 2.0
  maxForce = 0.2
  particleSize = 1.5
  isKilled = false

  startColor = { r: 0, g: 0, b: 0 }
  targetColor = { r: 255, g: 255, b: 255 }
  colorWeight = 0
  colorBlendRate = 0.03

  move() {
    let proximityMult = 1
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    }

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    }

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce
      steer.y = (steer.y / steerMagnitude) * this.maxForce
    }

    this.acc.x += steer.x
    this.acc.y += steer.y

    this.vel.x += this.acc.x
    this.vel.y += this.acc.y
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc.x = 0
    this.acc.y = 0
    // light damping for stability
    this.vel.x *= 0.92
    this.vel.y *= 0.92
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    }

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`
    const px = Math.round(this.pos.x)
    const py = Math.round(this.pos.y)
    ctx.fillRect(px, py, this.particleSize, this.particleSize)
  }

  kill(width: number, height: number) {
    if (!this.isKilled) {
      const angle = Math.random() * Math.PI * 2
      const mag = (width + height) / 2

      const centerX = width / 2
      const centerY = height / 2
      const exitX = centerX + Math.cos(angle) * mag
      const exitY = centerY + Math.sin(angle) * mag

      this.target.x = exitX
      this.target.y = exitY

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      }
      this.targetColor = { r: 0, g: 0, b: 0 }
      this.colorWeight = 0

      this.isKilled = true
    }
  }
}

export function ParticleKeywordWall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const frameCountRef = useRef(0)
  const currentKeywordsRef = useRef<Keyword[]>([])
  // Per-cycle layout rects (kept for reference)
  const keywordRectsRef = useRef<
    { x: number; y: number; w: number; h: number; color: { r: number; g: number; b: number }; word: string }[]
  >([])

  const pixelSteps = 4
  const CYCLE_SECONDS = 5 // ~5s per cycle per your request
  const CYCLE_FRAMES = Math.round(60 * CYCLE_SECONDS)

  // Only three colors (Blue, Orange, White) matching left container theme
  const PALETTE = [
    { r: 0, g: 69, b: 166 }, // Blue #0045a6
    { r: 243, g: 104, b: 35 }, // Orange #f36823
    { r: 255, g: 255, b: 255 }, // White
  ]
  // Color bands by container vertical thirds: top/middle/bottom
  const bandColorForY = (y: number, h: number) => {
    const ratio = y / Math.max(h, 1)
    if (ratio < 1 / 3) return PALETTE[0] // top -> blue
    if (ratio < 2 / 3) return PALETTE[1] // middle -> orange
    return PALETTE[2] // bottom -> white
  }

  const generateRandomPos = (
    x: number,
    y: number,
    mag: number,
    canvasWidth: number,
    canvasHeight: number,
  ): Vector2D => {
    const angle = Math.random() * Math.PI * 2
    const startX = x + Math.cos(angle) * mag
    const startY = y + Math.sin(angle) * mag

    return {
      x: startX,
      y: startY,
    }
  }

  const nextKeywords = (canvas: HTMLCanvasElement) => {
    // Reduce overlap a bit but keep density reasonable (10-14 per cycle)
    const keywordCount = Math.floor(Math.random() * 5) + 10 // 10-14 keywords
    currentKeywordsRef.current = getRandomKeywords(keywordCount)

    const offscreenCanvas = document.createElement("canvas")
    offscreenCanvas.width = canvas.width
    offscreenCanvas.height = canvas.height
    const offscreenCtx = offscreenCanvas.getContext("2d")!

    // Label canvas paints each word using its final band color; we'll read colors from here
    const labelCanvas = document.createElement("canvas")
    labelCanvas.width = canvas.width
    labelCanvas.height = canvas.height
    const labelCtx = labelCanvas.getContext("2d")!

    // Calculate font size - larger for clarity
    const isMobile = canvas.width < 768
    const baseFontSize = isMobile ? 64 : 100
    const step = isMobile ? 4 : 2

    // Calculate grid for distribution
    const cols = 2
    const rows = Math.ceil(currentKeywordsRef.current.length / cols)
    const cellWidth = canvas.width / cols
    const cellHeight = canvas.height / rows

    // Collision-avoid placement helpers
    type Rect = { x: number; y: number; w: number; h: number }
    const placed: Rect[] = []
    const margin = Math.max(8, Math.round(baseFontSize * 0.08))
    const intersects = (a: Rect, b: Rect) =>
      !(a.x + a.w + margin <= b.x || b.x + b.w + margin <= a.x || a.y + a.h + margin <= b.y || b.y + b.h + margin <= a.y)
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

    // Compute layout once and store rects with deterministic colors
    const keywordRects: { x: number; y: number; w: number; h: number; color: { r: number; g: number; b: number }; word: string }[] = []

    // Set font before measuring
    offscreenCtx.font = `900 ${baseFontSize}px Inter, sans-serif`
    offscreenCtx.textAlign = "left"
    offscreenCtx.textBaseline = "top"
    labelCtx.font = offscreenCtx.font
    labelCtx.textAlign = offscreenCtx.textAlign as CanvasTextAlign
    labelCtx.textBaseline = offscreenCtx.textBaseline as CanvasTextBaseline

    currentKeywordsRef.current.forEach((keyword, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)

      const baseX = col * cellWidth + cellWidth * 0.1
      const baseY = row * cellHeight + cellHeight * 0.3

      // Measure word
      let curFont = baseFontSize
      offscreenCtx.font = `900 ${curFont}px Inter, sans-serif`
      let metrics = offscreenCtx.measureText(keyword.cn)
      let textWidth = metrics.width
      let textHeight = curFont * 1.2

      // Search for non-overlapping placement within the cell
      let bestRect: Rect | null = null
      let bestOverlap = Number.POSITIVE_INFINITY
      const maxTries = 40
      for (let t = 0; t < maxTries; t++) {
        const ampX = cellWidth * 0.45
        const ampY = cellHeight * 0.3
        const randomXOffset = (Math.random() - 0.3) * ampX
        const randomYOffset = (Math.random() - 0.5) * ampY
        let xPos = baseX + randomXOffset
        let yPos = baseY + randomYOffset
        // Clamp inside cell
        xPos = clamp(xPos, col * cellWidth + margin, (col + 1) * cellWidth - textWidth - margin)
        yPos = clamp(yPos, row * cellHeight + margin, (row + 1) * cellHeight - textHeight - margin)
        const rect: Rect = { x: xPos, y: yPos, w: textWidth, h: textHeight }

        // Compute overlap score with placed rects
        let hasOverlap = false
        let overlapScore = 0
        for (const p of placed) {
          const xOverlap = Math.max(0, Math.min(rect.x + rect.w + margin, p.x + p.w + margin) - Math.max(rect.x, p.x))
          const yOverlap = Math.max(0, Math.min(rect.y + rect.h + margin, p.y + p.h + margin) - Math.max(rect.y, p.y))
          const area = xOverlap * yOverlap
          if (area > 0) hasOverlap = true
          overlapScore += area
        }
        if (!hasOverlap) {
          bestRect = rect
          bestOverlap = 0
          break
        } else if (overlapScore < bestOverlap) {
          bestRect = rect
          bestOverlap = overlapScore
        }
      }

      // If still overlapping badly, try slight font reduction and one more local search
      if (bestOverlap > 0.0001) {
        curFont = Math.max(Math.round(baseFontSize * 0.94), Math.round(baseFontSize * 0.85))
        offscreenCtx.font = `900 ${curFont}px Inter, sans-serif`
        metrics = offscreenCtx.measureText(keyword.cn)
        textWidth = metrics.width
        textHeight = curFont * 1.2
        const ampX = cellWidth * 0.35
        const ampY = cellHeight * 0.25
        for (let t = 0; t < 20; t++) {
          let xPos = baseX + (Math.random() - 0.3) * ampX
          let yPos = baseY + (Math.random() - 0.5) * ampY
          xPos = clamp(xPos, col * cellWidth + margin, (col + 1) * cellWidth - textWidth - margin)
          yPos = clamp(yPos, row * cellHeight + margin, (row + 1) * cellHeight - textHeight - margin)
          const rect: Rect = { x: xPos, y: yPos, w: textWidth, h: textHeight }
          let collide = false
          for (const p of placed) if (intersects(rect, p)) { collide = true; break }
          if (!collide) { bestRect = rect; break }
        }
      }

      // Fallback if nothing found
      const finalRect: Rect = bestRect ?? {
        x: clamp(baseX, col * cellWidth + margin, (col + 1) * cellWidth - textWidth - margin),
        y: clamp(baseY, row * cellHeight + margin, (row + 1) * cellHeight - textHeight - margin),
        w: textWidth,
        h: textHeight,
      }
      placed.push(finalRect)

      // Draw visible mask (white)
      offscreenCtx.fillStyle = "white"
      offscreenCtx.fillText(keyword.cn, finalRect.x, finalRect.y)

      // On visible mask: draw white; on label: draw the final band color
      keywordRects.push({
        x: finalRect.x,
        y: finalRect.y,
        w: finalRect.w,
        h: finalRect.h,
        color: bandColorForY(finalRect.y + finalRect.h / 2, canvas.height),
        word: keyword.cn,
      })

      const wordColor = bandColorForY(finalRect.y + finalRect.h / 2, canvas.height)
      labelCtx.fillStyle = `rgb(${wordColor.r},${wordColor.g},${wordColor.b})`
      labelCtx.fillText(keyword.cn, finalRect.x, finalRect.y)
    })

    // Keep rects for color lookup during particle assignment
    keywordRectsRef.current = keywordRects

    const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    const labelImage = labelCtx.getImageData(0, 0, canvas.width, canvas.height)
    const labelPixels = labelImage.data

    const particles = particlesRef.current
    let particleIndex = 0

    const coordsIndexes: number[] = []
    for (let i = 0; i < pixels.length; i += step * 4) {
      coordsIndexes.push(i)
    }

    // Shuffle for fluid motion
    for (let i = coordsIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]]
    }

    for (const coordIndex of coordsIndexes) {
      const pixelIndex = coordIndex
      const alpha = pixels[pixelIndex + 3]

      if (alpha > 160) {
        const x = (pixelIndex / 4) % canvas.width
        const y = Math.floor(pixelIndex / 4 / canvas.width)

        let particle: Particle

        if (particleIndex < particles.length) {
          particle = particles[particleIndex]
          particle.isKilled = false
          particleIndex++
        } else {
          particle = new Particle()

          const randomPos = generateRandomPos(
            canvas.width / 2,
            canvas.height / 2,
            (canvas.width + canvas.height) / 2,
            canvas.width,
            canvas.height,
          )
          particle.pos.x = randomPos.x
          particle.pos.y = randomPos.y

          // Slightly faster motion profile
          particle.maxSpeed = Math.random() * 4 + 5 // 5-9
          particle.maxForce = particle.maxSpeed * 0.12
          particle.particleSize = Math.random() * 0.4 + 1.1
          particle.colorBlendRate = Math.random() * 0.03 + 0.02

          particles.push(particle)
        }

        // Determine color from label canvas pixel; map to nearest of the three palette colors
        const lr = labelPixels[pixelIndex]
        const lg = labelPixels[pixelIndex + 1]
        const lb = labelPixels[pixelIndex + 2]
        const la = labelPixels[pixelIndex + 3]
        let targetColor = bandColorForY(y, canvas.height)
        if (la > 0 && (lr + lg + lb) > 0) {
          const dist = (c: { r: number; g: number; b: number }) => {
            const dr = lr - c.r
            const dg = lg - c.g
            const db = lb - c.b
            return dr * dr + dg * dg + db * db
          }
          let best = PALETTE[0]
          let bestD = dist(PALETTE[0])
          for (let k = 1; k < PALETTE.length; k++) {
            const d = dist(PALETTE[k])
            if (d < bestD) {
              bestD = d
              best = PALETTE[k]
            }
          }
          targetColor = best
        }
        particle.startColor = {
          r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
          g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
          b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
        }
        particle.targetColor = targetColor
        particle.colorWeight = 0

        particle.target.x = x
        particle.target.y = y
      }
    }

    // Kill remaining particles
    for (let i = particleIndex; i < particles.length; i++) {
      particles[i].kill(canvas.width, canvas.height)
    }
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const particles = particlesRef.current

    // Background with slightly stronger fade for sharper glyph edges
    ctx.fillStyle = "rgba(0, 0, 0, 0.10)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i]
      particle.move()

      particle.draw(ctx)

      // Remove dead particles that are out of bounds
      if (particle.isKilled) {
        if (
          particle.pos.x < 0 ||
          particle.pos.x > canvas.width ||
          particle.pos.y < 0 ||
          particle.pos.y > canvas.height
        ) {
          particles.splice(i, 1)
        }
      }
    }

    // Auto-advance keywords every CYCLE_FRAMES (~CYCLE_SECONDS seconds @60fps)
    frameCountRef.current++
    if (frameCountRef.current % CYCLE_FRAMES === 0) {
      // Clear at cycle boundary to avoid ghost trails
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nextKeywords(canvas)
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    nextKeywords(canvas)
    animate()

    const handleResize = () => {
      resizeCanvas()
      nextKeywords(canvas)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full h-full absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" style={{ background: "transparent" }} />
    </div>
  )
}
