"use client"

import { useEffect, useRef, useState } from "react"

interface PartnerData {
  name: string
  logo: string
  stats: Array<{ label: string; value: string }>
  description: string
}

const partners: PartnerData[] = [
  {
    name: "Ivey Publishing",
    logo: "/logos/Ivey Publishing.png",
    stats: [
      { label: "套案例发表", value: "55" },
      { label: "国家和地区", value: "168" },
    ],
    description: "触达2万+教师用户 · 全球顶级商学院案例出版平台",
  },
  {
    name: "SAGE Publishing",
    logo: "/logos/Sage Publishing.png",
    stats: [
      { label: "套案例发表", value: "46+44" },
      { label: "合作院校", value: "27" },
    ],
    description: "全球领先合作伙伴之一 · 国际知名学术出版社",
  },
  {
    name: "Harvard Business Publishing",
    logo: "/logos/Harvard Business Publishing.jpg",
    stats: [
      { label: "套案例发表", value: "21" },
      { label: "所院校触达", value: "2000+" },
    ],
    description: "哈佛商学院官方出版平台 · 顶级商学院标准",
  },
  {
    name: "The Case Centre",
    logo: "/logos/The Case Centre.jpg",
    stats: [
      { label: "国家和地区", value: "85+" },
      { label: "所院校触达", value: "1200+" },
    ],
    description: "全球案例教学权威平台 · 欧洲案例教学中心",
  },
  {
    name: "AAPBS",
    logo: "/logos/aapbs.jpg",
    stats: [
      { label: "案例发表", value: "2套/年" },
      { label: "国家和地区", value: "29" },
    ],
    description: "覆盖132所亚太院校 · 亚太商学院联盟",
  },
  {
    name: "Emerald Publishing",
    logo: "/logos/Emerald Publishing.svg",
    stats: [
      { label: "合作年限", value: "5+" },
      { label: "共享案例", value: "50+" },
    ],
    description: "国际知名学术出版社 · 战略合作伙伴",
  },
]

export function PartnerScanner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardLineRef = useRef<HTMLDivElement>(null)
  const scannerCanvasRef = useRef<HTMLCanvasElement>(null)
  const [position, setPosition] = useState(0)
  const animationRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const velocity = 60

  useEffect(() => {
    if (!cardLineRef.current) return

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000
      lastTimeRef.current = currentTime

      setPosition((prev) => {
        const cardWidth = 360
        const gap = 48
        const cardLineWidth = (cardWidth + gap) * partners.length

        let newPos = prev - velocity * deltaTime

        if (newPos < -cardLineWidth) {
          newPos = 0
        }

        return newPos
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    lastTimeRef.current = performance.now()
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  // 激光扫描效果
  useEffect(() => {
    if (!scannerCanvasRef.current) return

    const canvas = scannerCanvasRef.current
    const ctx = canvas.getContext('2d')!

    const w = window.innerWidth
    const h = 300
    canvas.width = w
    canvas.height = h
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const lightBarX = w / 2
    const lightBarWidth = 3

    let particles: any[] = []
    let particleCount = 0
    const maxParticles = 1500
    const intensity = 1.2

    const cardHeight = 240
    const containerHeight = 300
    const drawY = (containerHeight - cardHeight) / 2  // 30px
    const drawYEnd = drawY + cardHeight  // 270px

    const createParticle = () => {
      return {
        x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
        y: drawY + Math.random() * cardHeight,  // 粒子只在卡片高度范围内
        vx: Math.random() * 0.6 + 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 0.8 + 0.3,
        alpha: Math.random() * 0.4 + 0.6,
        decay: Math.random() * 0.015 + 0.01,
        life: 1.0,
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles[particleCount] = createParticle()
      particleCount++
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h)

      // 绘制激光竖线 - 与卡片垂直居中对齐

      // 核心白光
      const coreGradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth / 2, 0,
        lightBarX + lightBarWidth / 2, 0
      )
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
      coreGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)')
      coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)')
      coreGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.9)')
      coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = coreGradient
      ctx.fillRect(lightBarX - lightBarWidth / 2, drawY, lightBarWidth, cardHeight)

      // 蓝色光晕层
      const glow1Gradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth * 2, 0,
        lightBarX + lightBarWidth * 2, 0
      )
      glow1Gradient.addColorStop(0, 'rgba(135, 206, 250, 0)')
      glow1Gradient.addColorStop(0.5, 'rgba(173, 216, 230, 0.8)')
      glow1Gradient.addColorStop(1, 'rgba(135, 206, 250, 0)')

      ctx.fillStyle = glow1Gradient
      ctx.fillRect(lightBarX - lightBarWidth * 2, drawY, lightBarWidth * 4, cardHeight)

      const glow2Gradient = ctx.createLinearGradient(
        lightBarX - lightBarWidth * 4, 0,
        lightBarX + lightBarWidth * 4, 0
      )
      glow2Gradient.addColorStop(0, 'rgba(135, 206, 250, 0)')
      glow2Gradient.addColorStop(0.5, 'rgba(135, 206, 250, 0.4)')
      glow2Gradient.addColorStop(1, 'rgba(135, 206, 250, 0)')

      ctx.fillStyle = glow2Gradient
      ctx.fillRect(lightBarX - lightBarWidth * 4, drawY, lightBarWidth * 8, cardHeight)

      // 绘制粒子
      particles.forEach((p) => {
        if (!p || p.life <= 0) return

        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay

        if (p.x > w + 10 || p.life <= 0) {
          p.x = lightBarX + (Math.random() - 0.5) * lightBarWidth
          p.y = drawY + Math.random() * cardHeight  // 粒子重置在卡片高度范围内
          p.vx = Math.random() * 0.6 + 0.3
          p.vy = (Math.random() - 0.5) * 0.2
          p.life = 1.0
        }

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
        gradient.addColorStop(0, `rgba(173, 216, 230, ${p.alpha * p.life})`)
        gradient.addColorStop(0.5, `rgba(135, 206, 250, ${p.alpha * p.life * 0.6})`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2)
      })

      if (Math.random() < intensity && particleCount < maxParticles) {
        particles[particleCount] = createParticle()
        particleCount++
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      const newW = window.innerWidth
      canvas.width = newW
      canvas.style.width = newW + 'px'
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 更新卡片裁切
  useEffect(() => {
    const updateClipping = () => {
      const scannerX = window.innerWidth / 2
      const scannerWidth = 8
      const scannerLeft = scannerX - scannerWidth / 2
      const scannerRight = scannerX + scannerWidth / 2

      document.querySelectorAll('.partner-card-wrapper').forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect()
        const cardLeft = rect.left
        const cardRight = rect.right
        const cardWidth = rect.width

        const logoCard = wrapper.querySelector('.logo-card') as HTMLElement
        const detailCard = wrapper.querySelector('.detail-card') as HTMLElement

        if (cardLeft < scannerRight && cardRight > scannerLeft) {
          const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0)
          const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth)

          const logoClipRight = (scannerIntersectLeft / cardWidth) * 100
          const detailClipLeft = (scannerIntersectRight / cardWidth) * 100

          logoCard.style.setProperty('--clip-right', `${logoClipRight}%`)
          detailCard.style.setProperty('--clip-left', `${detailClipLeft}%`)
        } else {
          if (cardRight < scannerLeft) {
            logoCard.style.setProperty('--clip-right', '100%')
            detailCard.style.setProperty('--clip-left', '100%')
          } else if (cardLeft > scannerRight) {
            logoCard.style.setProperty('--clip-right', '0%')
            detailCard.style.setProperty('--clip-left', '0%')
          }
        }
      })

      requestAnimationFrame(updateClipping)
    }

    updateClipping()
  }, [])

  const renderPartnerCard = (partner: PartnerData, index: number) => (
    <div key={`${partner.name}-${index}`} className="partner-card-wrapper">
      {/* Logo 卡片 - 占满整个卡片 */}
      <div className="logo-card">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-2xl flex items-center justify-center p-12">
          <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center p-8 shadow-2xl">
            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      {/* 详情卡片 - 跟原版一样的布局 */}
      <div className="detail-card">
        <div className="relative w-full h-full backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 flex flex-col">
          {/* Logo Badge */}
          <div className="relative h-16 w-40 bg-white rounded-xl mb-5 flex items-center justify-center overflow-hidden p-3 mx-auto">
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-center mb-4 flex-grow">
            {partner.stats.map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl font-extrabold text-white group-hover:text-[#f36823] transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 group-hover:text-gray-300 mt-1.5 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="pt-3 border-t border-white/10 group-hover:border-[#f36823]/30 transition-colors duration-300">
            <p className="text-[11px] text-gray-400 group-hover:text-gray-300 text-center leading-relaxed transition-colors duration-300">
              {partner.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <style jsx global>{`
        .partner-scanner-section {
          position: relative;
          background: #000;
          padding: 96px 0;
        }

        .partner-scanner-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .partner-card-wrapper {
          position: relative;
          width: 360px;
          height: 240px;
          flex-shrink: 0;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .partner-card-wrapper:hover .detail-card > div {
          border-color: rgba(243, 104, 35, 0.6);
          background: rgba(255, 255, 255, 0.07);
        }

        .logo-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          clip-path: inset(0 0 0 var(--clip-right, 0%));
        }

        .detail-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          clip-path: inset(0 calc(100% - var(--clip-left, 0%)) 0 0);
        }

        .card-stream {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .card-line {
          display: flex;
          gap: 48px;
          will-change: transform;
        }

        #scannerCanvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }

        .fade-edge-left,
        .fade-edge-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 150px;
          z-index: 15;
          pointer-events: none;
        }

        .fade-edge-left {
          left: 0;
          background: linear-gradient(to right, #000 0%, transparent 100%);
        }

        .fade-edge-right {
          right: 0;
          background: linear-gradient(to left, #000 0%, transparent 100%);
        }
      `}</style>

      <section className="partner-scanner-section">
        <div className="container mx-auto px-4 mb-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              国际合作与影响力
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              通过Ivey、SAGE、Emerald、Harvard、The Case Centre、AAPBS等国际平台，复旦案例触达全球168个国家和地区
            </p>
          </div>
        </div>

        <div className="partner-scanner-container" ref={containerRef}>
          <div className="fade-edge-left" />
          <div className="fade-edge-right" />

          <canvas ref={scannerCanvasRef} id="scannerCanvas" />

          <div className="card-stream">
            <div
              ref={cardLineRef}
              className="card-line"
              style={{ transform: `translateX(${position}px)` }}
            >
              {partners.map((partner, index) => renderPartnerCard(partner, index))}
              {partners.map((partner, index) => renderPartnerCard(partner, index + partners.length))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://case.fdsm.fudan.edu.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            了解合作详情
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
