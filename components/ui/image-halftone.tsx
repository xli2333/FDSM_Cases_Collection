"use client"

import { useRef, useEffect, useState } from "react"

interface ImageHalftoneProps {
  src: string
  alt: string
  className?: string
  halftoneSize?: number
  mouseRadius?: number
  repulsionStrength?: number
  returnSpeed?: number
  accentColor?: string
  accentProbability?: number
  sizeVariation?: number
}

interface DotData {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  brightness: number
  vx: number
  vy: number
  isAccent: boolean
  twinklePhase: number
  twinkleSpeed: number
  sizeMultiplier: number
}

function smoothNoise(x: number, y: number, scale: number, seed: number): number {
  const sx = (x * scale + seed) * 0.1
  const sy = (y * scale + seed) * 0.1
  return (Math.sin(sx) * Math.cos(sy) + Math.sin(sy * 1.3) * Math.cos(sx * 0.7)) * 0.5 + 0.5
}

export function ImageHalftone({
  src,
  alt,
  className = "",
  halftoneSize = 4,
  mouseRadius = 80,
  repulsionStrength = 0.5,
  returnSpeed = 0.15,
  accentColor = "#f36823",
  accentProbability = 0.08,
  sizeVariation = 0.3,
}: ImageHalftoneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const dotsRef = useRef<DotData[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000, trail: [] as { x: number; y: number; time: number }[] })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // 设置 canvas 尺寸
      const maxSize = 720
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1)
      const width = img.width * scale
      const height = img.height * scale

      canvas.width = width
      canvas.height = height

      // 绘制图像
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(img, 0, 0, width, height)

      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      // 生成粒子点
      const dots: DotData[] = []
      const step = halftoneSize

      for (let y = step / 2; y < height; y += step) {
        for (let x = step / 2; x < width; x += step) {
          const i = (Math.floor(y) * width + Math.floor(x)) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const brightness = (r + g + b) / 3

          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            size: (brightness / 255) * halftoneSize * 0.9,
            brightness,
            vx: 0,
            vy: 0,
            isAccent: Math.random() < accentProbability,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.02 + Math.random() * 0.03,
            sizeMultiplier: 1 + (Math.random() - 0.5) * sizeVariation,
          })
        }
      }

      dotsRef.current = dots
      setIsLoaded(true)

      // 动画循环
      let time = 0
      const animate = () => {
        time++
        ctx.fillStyle = "rgba(0, 0, 0, 0)"
        ctx.clearRect(0, 0, width, height)

        const now = Date.now()
        const mouse = mouseRef.current

        // 清理旧的轨迹点
        mouse.trail = mouse.trail.filter((p) => now - p.time < 150)

        dots.forEach((dot) => {
          // 计算鼠标影响
          let totalForceX = 0
          let totalForceY = 0

          mouse.trail.forEach((trailPoint) => {
            const dx = dot.x - trailPoint.x
            const dy = dot.y - trailPoint.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouseRadius) {
              const force = ((mouseRadius - distance) / mouseRadius) * repulsionStrength
              const noiseValue = smoothNoise(dot.baseX, dot.baseY, 0.02, time * 0.01)
              const angle = Math.atan2(dy, dx) + (noiseValue - 0.5) * 0.5

              totalForceX += Math.cos(angle) * force
              totalForceY += Math.sin(angle) * force
            }
          })

          // 应用力
          dot.vx += totalForceX
          dot.vy += totalForceY

          // 回归原位的力
          dot.vx += (dot.baseX - dot.x) * returnSpeed
          dot.vy += (dot.baseY - dot.y) * returnSpeed

          // 摩擦力
          dot.vx *= 0.85
          dot.vy *= 0.85

          // 更新位置
          dot.x += dot.vx
          dot.y += dot.vy

          // 闪烁效果
          dot.twinklePhase += dot.twinkleSpeed
          const twinkle = Math.sin(dot.twinklePhase) * 0.15 + 1

          // 绘制粒子
          const renderSize = dot.size * dot.sizeMultiplier * twinkle

          if (dot.isAccent) {
            ctx.fillStyle = accentColor
          } else {
            const gray = Math.floor(dot.brightness)
            ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`
          }

          ctx.beginPath()
          ctx.arc(dot.x, dot.y, renderSize / 2, 0, Math.PI * 2)
          ctx.fill()
        })

        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()
    }

    img.onerror = () => {
      console.error(`Failed to load image: ${src}`)
    }

    img.src = src

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [src, halftoneSize, mouseRadius, repulsionStrength, returnSpeed, accentColor, accentProbability, sizeVariation])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height

    mouseRef.current.x = x
    mouseRef.current.y = y
    mouseRef.current.trail.push({ x, y, time: Date.now() })
  }

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000
    mouseRef.current.y = -1000
    mouseRef.current.trail = []
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  )
}
