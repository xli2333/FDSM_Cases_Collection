"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PartnerCard {
  name: string
  logo: string
  stats: {
    label: string
    value: string
  }[]
  description: string
}

const partners: PartnerCard[] = [
  {
    name: "Ivey Publishing",
    logo: "Ivey",
    stats: [
      { label: "套案例发表", value: "55" },
      { label: "国家和地区", value: "168" },
    ],
    description: "触达2万+教师用户 · 全球顶级商学院案例出版平台",
  },
  {
    name: "SAGE & Emerald",
    logo: "SAGE",
    stats: [
      { label: "套案例发表", value: "46+44" },
      { label: "合作院校", value: "27" },
    ],
    description: "全球领先合作伙伴之一 · 国际知名学术出版社",
  },
  {
    name: "Harvard Business Publishing",
    logo: "Harvard",
    stats: [
      { label: "套案例发表", value: "21" },
      { label: "所院校触达", value: "2000+" },
    ],
    description: "哈佛商学院官方出版平台 · 顶级商学院标准",
  },
  {
    name: "The Case Centre",
    logo: "Case Centre",
    stats: [
      { label: "国家和地区", value: "85+" },
      { label: "所院校触达", value: "1200+" },
    ],
    description: "全球案例教学权威平台 · 欧洲案例教学中心",
  },
  {
    name: "AAPBS",
    logo: "AAPBS",
    stats: [
      { label: "案例发表", value: "2套/年" },
      { label: "国家和地区", value: "29" },
    ],
    description: "覆盖132所亚太院校 · 亚太商学院联盟",
  },
  {
    name: "中欧国际工商学院",
    logo: "CEIBS",
    stats: [
      { label: "合作年限", value: "5+" },
      { label: "共享案例", value: "50+" },
    ],
    description: "中国顶尖商学院 · 战略合作伙伴",
  },
]

export function PartnerSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [translateX, setTranslateX] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const CARD_WIDTH = 360
  const GAP = 24

  const updateScrollButtons = (newTranslateX: number) => {
    if (!trackRef.current || !wrapperRef.current) return

    const minX = wrapperRef.current.clientWidth - trackRef.current.scrollWidth
    setCanScrollLeft(newTranslateX < 0)
    setCanScrollRight(newTranslateX > minX)
  }

  const scrollLeft = () => {
    if (!wrapperRef.current) return
    const newX = Math.min(translateX + CARD_WIDTH + GAP, 0)
    setTranslateX(newX)
    updateScrollButtons(newX)
  }

  const scrollRight = () => {
    if (!trackRef.current || !wrapperRef.current) return
    const minX = wrapperRef.current.clientWidth - trackRef.current.scrollWidth
    const newX = Math.max(translateX - CARD_WIDTH - GAP, minX)
    setTranslateX(newX)
    updateScrollButtons(newX)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!trackRef.current || !wrapperRef.current) return

    const minX = wrapperRef.current.clientWidth - trackRef.current.scrollWidth
    const newX = Math.max(Math.min(translateX - e.deltaY * 0.8, 0), minX)
    setTranslateX(newX)
    updateScrollButtons(newX)
  }

  useEffect(() => {
    const handleResize = () => {
      if (!trackRef.current || !wrapperRef.current) return
      const minX = wrapperRef.current.clientWidth - trackRef.current.scrollWidth
      const newX = Math.max(Math.min(translateX, 0), minX)
      setTranslateX(newX)
      updateScrollButtons(newX)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [translateX])

  // 当鼠标在卡片区域时，禁用页面滚动
  useEffect(() => {
    const preventScroll = (e: WheelEvent) => {
      if (isHovering) {
        e.preventDefault()
      }
    }

    if (isHovering) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('wheel', preventScroll, { passive: false })
    } else {
      document.body.style.overflow = ''
      window.removeEventListener('wheel', preventScroll)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('wheel', preventScroll)
    }
  }, [isHovering])

  return (
    <section id="partners" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-start mb-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">国际合作与影响力</h2>
            <p className="text-xl text-gray-300">
              通过Ivey、SAGE、Emerald、Harvard、The Case Centre、AAPBS等国际平台，复旦案例触达全球168个国家和地区
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-lg border transition-all ${
                canScrollLeft
                  ? "bg-white/5 border-white/20 hover:bg-white/10 text-white"
                  : "bg-gray-900/50 border-gray-800 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mx-auto" />
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-lg border transition-all ${
                canScrollRight
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-900/50 border-gray-800 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>

        <div
          ref={wrapperRef}
          className="overflow-hidden rounded-2xl"
          onWheel={handleWheel}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            ref={trackRef}
            className="flex gap-6 p-1 select-none"
            animate={{ x: translateX }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 w-[360px] shrink-0 hover:border-[#f36823]/60 hover:bg-white/[0.07] transition-all duration-300 group"
              >
                {/* Logo Badge */}
                <div className="relative h-12 w-36 bg-gradient-to-br from-gray-100 to-white border border-black/10 shadow-lg rounded-lg mb-6 flex items-center justify-center text-sm font-extrabold text-gray-800">
                  {partner.logo}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 text-center mb-6">
                  {partner.stats.map((stat, idx) => (
                    <div key={idx}>
                      <p className="text-3xl font-extrabold text-white group-hover:text-[#f36823] transition-colors duration-300">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-2 transition-colors duration-300">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="pt-4 border-t border-white/10 group-hover:border-[#f36823]/30 transition-colors duration-300">
                  <p className="text-xs text-gray-400 group-hover:text-gray-300 text-center leading-relaxed transition-colors duration-300">
                    {partner.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://case.fdsm.fudan.edu.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            了解合作详情
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
