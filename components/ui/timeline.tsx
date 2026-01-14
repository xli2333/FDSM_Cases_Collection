"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2007年",
    title: "成立案例中心",
    description: "正式开启案例开发与研究的专业化道路。",
  },
  {
    year: "2010年",
    title: "创办商业知识发展与传播中心",
    description: "进一步扩大商业知识的影响力与传播渠道。",
  },
  {
    year: "2016年",
    title: "复旦管理案例库1.0版上线",
    description: "官方案例库门户网站（case.fdsm.fudan.edu.cn）正式投入使用。",
  },
  {
    year: "2018年",
    title: "开启与国际顶级出版社的发行合作",
    description: "提升案例的国际化水平，向全球输出中国管理智慧。",
  },
  {
    year: "2020年",
    title: "响应学院科创战略",
    description: "确立了以“科创短案例”为特色的发展方向，紧扣时代科技创新脉搏。",
  },
  {
    year: "2023年",
    title: "复旦管理案例库2.0版升级完成",
    description: "并在年底实现全面对外开放使用。",
  },
  {
    year: "2025年",
    title: "案例库3.0版",
    description: "全面开启AI赋能新阶段，推动案例库的数字化与智能化转型。",
  },
]

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // 处理滚动位置计算
  const handleScroll = () => {
    if (!containerRef.current) return
    const container = containerRef.current
    const center = container.scrollLeft + container.clientWidth / 2
    
    const children = Array.from(container.children) as HTMLElement[]
    let minDistance = Infinity
    let newActiveIndex = 0

    children.forEach((child, index) => {
      if (child.classList.contains('timeline-node')) {
        const childCenter = child.offsetLeft + child.offsetWidth / 2
        const distance = Math.abs(childCenter - center)
        
        if (distance < minDistance) {
          minDistance = distance
          newActiveIndex = index - 1 
        }
      }
    })

    if (newActiveIndex !== activeIndex && newActiveIndex >= 0 && newActiveIndex < timelineEvents.length) {
      setActiveIndex(newActiveIndex)
    }
  }

  // 滚动到指定索引
  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const child = containerRef.current.children[index + 1] as HTMLElement // +1 因为有个padding div
      if (child) {
        // 计算目标滚动位置，使元素居中
        const targetScrollLeft = child.offsetLeft - containerRef.current.clientWidth / 2 + child.offsetWidth / 2
        
        containerRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }

  // 上一页/下一页
  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex < timelineEvents.length - 1) {
      scrollToIndex(activeIndex + 1)
    }
  }

  // 强化滚轮交互：捕获垂直滚动并转换为水平滚动，提高灵敏度
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      const isAtStart = container.scrollLeft === 0
      const isAtEnd = Math.abs(container.scrollWidth - container.scrollLeft - container.clientWidth) < 2 // 增加一点容差

      // 判断是向上滚动还是向下滚动
      const isScrollingUp = e.deltaY < 0
      const isScrollingDown = e.deltaY > 0

      // 如果在起点且向上滚动，或者在终点且向下滚动，允许默认行为（页面滚动）
      if ((isAtStart && isScrollingUp) || (isAtEnd && isScrollingDown)) {
        return
      }

      // 否则阻止默认行为，执行水平滚动
      e.preventDefault()
      
      // 提高灵敏度 multiplier
      const sensitivity = 2.5 
      container.scrollLeft += e.deltaY * sensitivity
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <section id="timeline" className="py-20 bg-black relative overflow-hidden group/timeline">
      {/* 彻底隐藏滚动条的样式注入 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}} />

      <div className="container mx-auto px-4 mb-12 text-center relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">复旦大学管理学院案例中心发展历程</h2>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <p className="text-base font-medium">点击左右箭头以回顾历史跨越</p>
        </div>
      </div>

      {/* 左右导航按钮 - 悬浮在两侧 */}
      <div className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 z-20 hidden md:block">
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:scale-110 ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]'}`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 z-20 hidden md:block">
        <button 
          onClick={handleNext}
          disabled={activeIndex === timelineEvents.length - 1}
          className={`p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:scale-110 ${activeIndex === timelineEvents.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]'}`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar items-center px-[35vw]" 
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* 左侧缓冲空间 */}
        <div className="w-0 shrink-0" /> 

        {timelineEvents.map((event, index) => {
          const isActive = index === activeIndex
          return (
            <div 
              key={index}
              onClick={() => scrollToIndex(index)} // 点击整个卡片也可以跳转
              className="timeline-node snap-center shrink-0 w-[280px] md:w-[400px] mx-4 md:mx-8 flex flex-col items-center justify-center cursor-pointer"
            >
              {/* 年份展示 */}
              <div className="relative mb-8 h-16 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 0.9,
                    opacity: isActive ? 1 : 0.4, 
                    y: isActive ? 0 : 5,
                  }}
                  className={`relative z-10 font-bold text-3xl md:text-4xl transition-all duration-500 text-white`}
                >
                  {event.year}
                </motion.div>
              </div>

              {/* 连接点与线 */}
              <div className="relative w-full flex items-center justify-center mb-8">
                <div className="absolute left-[-100%] right-[-100%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10 top-1/2" />
                
                <motion.div
                  animate={{
                    scale: isActive ? 1.2 : 0.8,
                    backgroundColor: isActive ? "#f97316" : "#262626",
                    borderColor: isActive ? "transparent" : "#525252",
                    borderWidth: isActive ? 0 : 1,
                    boxShadow: isActive ? "0 0 15px rgba(249,115,22,0.5)" : "none"
                  }}
                  className="w-3 h-3 rounded-full relative z-10"
                />
              </div>

              {/* 详情卡片 */}
              <div className="h-56 w-full flex items-start justify-center">
                <motion.div
                  animate={{ 
                    opacity: isActive ? 1 : 0.15,
                    scale: isActive ? 1 : 0.9,
                    y: isActive ? 0 : 10,
                    filter: isActive ? "blur(0px)" : "blur(2px)"
                  }}
                  transition={{ duration: 0.4 }}
                  className={`bg-gradient-to-b from-white/[0.08] to-transparent backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl text-center w-full shadow-xl hover:border-orange-500/30 transition-colors`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-4 tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-base md:text-lg text-white leading-relaxed font-light">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            </div>
          )
        })}
        
        {/* 右侧缓冲空间 */}
        <div className="w-0 shrink-0" />
      </div>

      {/* 底部导航指示器 - 现在可点击 */}
      <div className="flex justify-center gap-3 mt-10">
        {timelineEvents.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 hover:bg-orange-400 ${idx === activeIndex ? "w-8 bg-orange-500" : "w-2 bg-gray-800"}`}
            aria-label={`Go to ${timelineEvents[idx].year}`}
          />
        ))}
      </div>
    </section>
  )
}
