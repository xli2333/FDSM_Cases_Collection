"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface TimelineEvent {
  year: string
  title: string
  description: string
  achievements?: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2010",
    title: "复旦案例中心成立",
    description: "正式启动案例研究与开发工作",
    achievements: ["建立案例研究团队", "制定案例开发标准"],
  },
  {
    year: "2015",
    title: "国际化战略启动",
    description: "与Ivey Publishing建立战略合作",
    achievements: ["首批案例登陆国际平台", "触达全球50+国家"],
  },
  {
    year: "2018",
    title: "多平台合作拓展",
    description: "与Harvard、SAGE等顶级平台建立合作",
    achievements: ["案例发表量突破100套", "覆盖全球100+国家"],
  },
  {
    year: "2020",
    title: "数字化转型",
    description: "推出在线案例教学平台",
    achievements: ["开发案例库系统", "实现案例数字化管理"],
  },
  {
    year: "2023",
    title: "全球影响力提升",
    description: "案例触达全球168个国家和地区",
    achievements: ["累计发表案例200+套", "合作院校2000+所"],
  },
  {
    year: "2024",
    title: "持续创新发展",
    description: "深化国际合作,提升案例质量",
    achievements: ["新增合作平台3个", "获得多项教学创新奖"],
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f36823] rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            发展历程
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            从本土案例研究到全球影响力平台的发展之路
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* 中心线 */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2" />

            {/* 时间轴事件 */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <TimelineItem
                  key={event.year}
                  event={event}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent
  index: number
  isLeft: boolean
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center ${isLeft ? "justify-start" : "justify-end"}`}
    >
      <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f36823]/60 hover:bg-white/[0.07] transition-all duration-300 group"
        >
          {/* 年份标签 */}
          <div className="absolute -top-3 left-6">
            <span className="bg-gradient-to-r from-[#f36823] to-[#ff8c4d] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
              {event.year}
            </span>
          </div>

          {/* 内容 */}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f36823] transition-colors">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">{event.description}</p>

            {/* 成就列表 */}
            {event.achievements && event.achievements.length > 0 && (
              <div className="space-y-2">
                {event.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#f36823] mt-1.5 shrink-0" />
                    <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                      {achievement}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 连接线到中心点 */}
          <div
            className={`hidden md:block absolute top-1/2 ${
              isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full"
            } w-12 h-0.5 bg-gradient-to-${isLeft ? "r" : "l"} from-white/20 to-transparent`}
          />
        </motion.div>
      </div>

      {/* 中心圆点 */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
        className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="relative">
          {/* 外圈光晕 */}
          <div className="absolute inset-0 w-6 h-6 bg-[#f36823] rounded-full animate-ping opacity-20" />
          {/* 内圈实心 */}
          <div className="relative w-6 h-6 bg-gradient-to-br from-[#f36823] to-[#ff8c4d] rounded-full border-4 border-black shadow-lg" />
        </div>
      </motion.div>
    </motion.div>
  )
}
