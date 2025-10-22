"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

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

export function PartnerSlider() {
  const [isPaused, setIsPaused] = useState(false)

  // 渲染卡片的函数
  const renderPartnerCard = (partner: PartnerCard, index: number) => (
    <div
      key={`${partner.name}-${index}`}
      className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 w-[360px] shrink-0 hover:border-[#f36823]/60 hover:bg-white/[0.07] transition-all duration-300 group"
    >
      {/* Logo Badge */}
      <div className="relative h-20 w-44 bg-white rounded-xl mb-6 flex items-center justify-center overflow-hidden p-4">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 text-center mb-6">
        {partner.stats.map((stat, idx) => (
          <div key={idx}>
            <p className="text-3xl font-extrabold text-white group-hover:text-[#f36823] transition-colors duration-300">
              {stat.value}
            </p>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 mt-2 transition-colors duration-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="pt-4 border-t border-white/10 group-hover:border-[#f36823]/30 transition-colors duration-300">
        <p className="text-xs text-gray-400 group-hover:text-gray-300 text-center leading-relaxed transition-colors duration-300">
          {partner.description}
        </p>
      </div>
    </div>
  )

  return (
    <section id="partners" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">国际合作与影响力</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            通过Ivey、SAGE、Emerald、Harvard、The Case Centre、AAPBS等国际平台，复旦案例触达全球168个国家和地区
          </p>
        </div>

        {/* 无限循环轮播容器 */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 左侧渐变遮罩 */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />

          {/* 右侧渐变遮罩 */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -((360 + 24) * partners.length)],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* 第一组卡片 */}
            {partners.map((partner, index) => renderPartnerCard(partner, index))}
            {/* 第二组卡片（无缝循环） */}
            {partners.map((partner, index) => renderPartnerCard(partner, index + partners.length))}
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
