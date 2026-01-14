"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface PartnerCard {
  name: string
  logo: string
  description: string
}

const partners: PartnerCard[] = [
  {
    name: "Ivey Publishing",
    logo: "/logos/Ivey Publishing.png",
    description: "毅伟商学院出版中心，可触达超过168个国家和地区、2万教师用户",
  },
  {
    name: "SAGE",
    logo: "/logos/Sage Publishing.png",
    description: "国际著名学术出版商，复旦管理案例库为当时全球27家领先院校合作伙伴之一",
  },
  {
    name: "Harvard Business Publishing",
    logo: "/logos/Harvard Business Publishing.jpg",
    description: "哈佛商学院出版社，可触达超过2000所院校",
  },
  {
    name: "The Case Centre",
    logo: "/logos/The Case Centre.jpg",
    description: "全球案例权威出版机构，可触达超过85个国家和地区、1200所院校",
  },
  {
    name: "AAPBS",
    logo: "/logos/aapbs.jpg",
    description: "亚太管理学院联合会，可触达超过29个国家和地区、132所院校",
  },
  {
    name: "Emerald",
    logo: "/logos/Emerald Publishing.svg",
    description: "国际知名的学术出版机构，可触达超过100个国家和地区、1000所院校；复旦管理案例库为当时中国大陆唯一高校案例库合作伙伴",
  },
]

export function PartnerSlider() {
  const [isPaused, setIsPaused] = useState(false)

  // 渲染卡片的函数
  const renderPartnerCard = (partner: PartnerCard, index: number) => (
    <div
      key={`${partner.name}-${index}`}
      className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 w-[360px] shrink-0 hover:border-[#f36823]/60 hover:bg-white/[0.07] transition-all duration-300 group flex flex-col justify-between"
    >
      {/* Logo Badge */}
      <div className="relative h-20 w-44 bg-white rounded-xl mb-6 flex items-center justify-center overflow-hidden p-4">
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Description */}
      <div className="flex-grow flex items-center">
        <p className="text-lg text-gray-200 font-medium leading-relaxed group-hover:text-white transition-colors duration-300">
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
            复旦管理案例库致力于讲好中国故事，将中国管理智慧推向全世界。我们的影响力现已横跨 168个国家和地区，覆盖全球超过2000+所院校。
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
