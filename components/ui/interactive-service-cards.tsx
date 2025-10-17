"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

type CardType = "short" | "multimedia" | "classic" | "editorial" | "training" | null

export function InteractiveServiceCards() {
  const [expandedCard, setExpandedCard] = useState<CardType>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleCardToggle = (type: CardType, e: React.MouseEvent) => {
    e.stopPropagation()
    if (expandedCard === type) {
      setExpandedCard(null)
      if (type === "multimedia" && videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    } else {
      setExpandedCard(type)
    }
  }

  // 点击页面任何位置关闭展开的卡片
  useEffect(() => {
    const handleClickOutside = () => {
      if (expandedCard) {
        setExpandedCard(null)
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [expandedCard])

  useEffect(() => {
    if (expandedCard === "multimedia" && videoRef.current) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Video autoplay prevented:", err)
        })
      }
    }
  }, [expandedCard])

  // 计算卡片的grid位置
  const getCardStyle = (cardType: CardType) => {
    // 默认布局
    if (!expandedCard) {
      switch (cardType) {
        case "short":
          return { gridColumn: "1 / 7", gridRow: "1 / 2" }
        case "multimedia":
          return { gridColumn: "1 / 7", gridRow: "2 / 3" }
        case "classic":
          return { gridColumn: "7 / 13", gridRow: "1 / 3" }
        case "editorial":
          return { gridColumn: "13 / 19", gridRow: "1 / 2" }
        case "training":
          return { gridColumn: "13 / 19", gridRow: "2 / 3" }
        default:
          return {}
      }
    }

    // 短案例展开
    if (expandedCard === "short") {
      switch (cardType) {
        case "short":
          return { gridColumn: "1 / 7", gridRow: "1 / 3" }
        case "multimedia":
          return { gridColumn: "1 / 7", gridRow: "3 / 4" }
        case "classic":
          return { gridColumn: "7 / 13", gridRow: "1 / 3" }
        case "editorial":
          return { gridColumn: "13 / 19", gridRow: "1 / 2" }
        case "training":
          return { gridColumn: "13 / 19", gridRow: "2 / 3" }
        default:
          return {}
      }
    }

    // 多媒体案例展开
    if (expandedCard === "multimedia") {
      switch (cardType) {
        case "multimedia":
          return { gridColumn: "1 / 19", gridRow: "1 / 4" }
        case "short":
          return { gridColumn: "1 / 5", gridRow: "4 / 5" }
        case "classic":
          return { gridColumn: "5 / 9", gridRow: "4 / 5" }
        case "editorial":
          return { gridColumn: "9 / 13", gridRow: "4 / 5" }
        case "training":
          return { gridColumn: "13 / 17", gridRow: "4 / 5" }
        default:
          return {}
      }
    }

    // 经典案例展开
    if (expandedCard === "classic") {
      switch (cardType) {
        case "classic":
          return { gridColumn: "1 / 19", gridRow: "1 / 4" }
        case "short":
          return { gridColumn: "1 / 5", gridRow: "4 / 5" }
        case "multimedia":
          return { gridColumn: "5 / 9", gridRow: "4 / 5" }
        case "editorial":
          return { gridColumn: "9 / 13", gridRow: "4 / 5" }
        case "training":
          return { gridColumn: "13 / 17", gridRow: "4 / 5" }
        default:
          return {}
      }
    }

    // 案例编审服务展开
    if (expandedCard === "editorial") {
      switch (cardType) {
        case "short":
          return { gridColumn: "1 / 7", gridRow: "1 / 2" }
        case "multimedia":
          return { gridColumn: "1 / 7", gridRow: "2 / 3" }
        case "classic":
          return { gridColumn: "7 / 13", gridRow: "1 / 3" }
        case "editorial":
          return { gridColumn: "13 / 19", gridRow: "1 / 3" }
        case "training":
          return { gridColumn: "13 / 19", gridRow: "3 / 4" }
        default:
          return {}
      }
    }

    // 案例培训活动展开
    if (expandedCard === "training") {
      switch (cardType) {
        case "short":
          return { gridColumn: "1 / 7", gridRow: "1 / 2" }
        case "multimedia":
          return { gridColumn: "1 / 7", gridRow: "2 / 3" }
        case "classic":
          return { gridColumn: "7 / 13", gridRow: "1 / 3" }
        case "editorial":
          return { gridColumn: "13 / 19", gridRow: "3 / 4" }
        case "training":
          return { gridColumn: "13 / 19", gridRow: "1 / 3" }
        default:
          return {}
      }
    }

    return {}
  }

  // 判断卡片是否被挤压
  const isCompressed = (cardType: CardType) => {
    if (!expandedCard || expandedCard === cardType) return false

    if (expandedCard === "short" && cardType === "multimedia") return true
    if (expandedCard === "multimedia" && cardType !== "multimedia") return true
    if (expandedCard === "classic" && cardType !== "classic") return true
    if (expandedCard === "editorial" && cardType === "training") return true
    if (expandedCard === "training" && cardType === "editorial") return true

    return false
  }

  return (
    <section id="services" className="py-24 bg-black relative" ref={sectionRef}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white">案例产品与服务</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            丰富的案例资源和完善的支持服务，助力商科教育创新
          </p>
        </div>

        <div className="relative w-full">
          <div className="grid grid-cols-18 gap-8 auto-rows-fr" style={{ minHeight: '600px' }}>
            {/* 短案例 */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1], type: "tween" }
              }}
              onClick={(e) => handleCardToggle("short", e)}
              className="relative backdrop-blur-sm bg-black/80 border-2 border-white/20 rounded-2xl p-8 hover:border-white/30 cursor-pointer shadow-lg shadow-white/5"
              style={{
                ...getCardStyle("short"),
                willChange: "auto"
              }}
            >
              <h3 className={`font-bold text-white mb-3 ${isCompressed("short") ? "text-lg" : "text-2xl"}`}>
                短案例 (1500+篇)
              </h3>
              <p className={`text-gray-300 leading-relaxed ${isCompressed("short") ? "text-sm" : "text-base"}`}>
                100%聚焦热点管理议题，适用于教学项目招生选拔和快速课堂讨论。
              </p>

              {expandedCard === "short" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <h4 className="text-xl font-semibold text-white mb-6">详细介绍</h4>
                  <div className="space-y-4 text-gray-300 text-base">
                    <div>
                      <p className="font-medium text-blue-400 mb-1">核心特点：</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>篇幅精简，平均2000-3000字</li>
                        <li>聚焦单一管理议题或决策点</li>
                        <li>快速更新，紧跟商业热点</li>
                        <li>配套思考题和教学指引</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-blue-400 mb-1">应用场景：</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>MBA/EMBA招生面试案例讨论</li>
                        <li>15-30分钟课堂案例分析</li>
                        <li>课前预习和课后作业</li>
                        <li>小组讨论和破冰活动</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* 多媒体案例 */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1], type: "tween" }
              }}
              onClick={(e) => {
                e.stopPropagation()
                handleCardToggle("multimedia", e)
              }}
              className="relative backdrop-blur-sm bg-black/80 border-2 border-white/20 rounded-2xl overflow-hidden hover:border-white/30 cursor-pointer shadow-lg shadow-white/5"
              style={{
                ...getCardStyle("multimedia"),
                willChange: "auto"
              }}
            >
              {expandedCard === "multimedia" ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src="https://github.com/xli2333/FDSM_Cases_Collection/releases/download/v1.0.0/complete_video.mp4"
                    className="w-full h-full object-cover pointer-events-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8 pointer-events-none">
                    <h3 className="text-2xl font-bold text-white mb-3">多媒体案例 (50+篇)</h3>
                    <p className="text-gray-300 text-base leading-relaxed">包含教学示范课，结合视频、音频等多媒体形式，提供沉浸式学习体验。</p>
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  <h3 className={`font-bold text-white mb-3 ${isCompressed("multimedia") ? "text-lg" : "text-2xl"}`}>
                    多媒体案例 (50+篇)
                  </h3>
                  <p className={`text-gray-300 leading-relaxed ${isCompressed("multimedia") ? "text-sm" : "text-base"}`}>
                    包含教学示范课，结合视频、音频等多媒体形式，提供沉浸式学习体验。
                  </p>
                </div>
              )}
            </motion.div>

            {/* 经典案例 */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1], type: "tween" }
              }}
              onClick={(e) => handleCardToggle("classic", e)}
              className="relative backdrop-blur-sm bg-black/80 border-2 border-white/20 rounded-2xl p-10 hover:border-white/30 cursor-pointer overflow-hidden shadow-lg shadow-white/5"
              style={{
                ...getCardStyle("classic"),
                willChange: "auto"
              }}
            >
              <div className={`flex flex-col items-center text-center ${expandedCard !== "classic" ? "justify-center h-full" : ""}`}>
                <h3 className={`font-bold text-white mb-4 ${isCompressed("classic") ? "text-lg" : "text-3xl"}`}>
                  经典案例 (600+篇)
                </h3>
                <p className={`text-gray-300 mb-6 leading-relaxed ${isCompressed("classic") ? "text-sm" : "text-lg"}`}>
                  90%为现场案例，20%获国际发行。深度剖析中国企业管理实践，适合MBA、EMBA课堂教学。
                </p>


              {expandedCard === "classic" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div>
                      <p className="font-semibold text-green-400 mb-4 text-lg">案例特色：</p>
                      <ul className="space-y-3 text-gray-300 text-base">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span><strong>现场调研：</strong>90%案例基于实地访谈和一手资料</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span><strong>国际认可：</strong>20%案例通过Ivey、HBP、SAGE等国际出版社发行</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span><strong>完整配套：</strong>提供教学说明、PPT课件、习题答案等全套教学资源</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span><strong>持续更新：</strong>定期追踪企业发展，推出案例更新版本</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-green-400 mb-4 text-lg">覆盖领域：</p>
                      <div className="grid grid-cols-2 gap-3 text-gray-300 text-sm">
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">战略管理</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">创业创新</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">营销管理</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">运营管理</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">财务管理</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">人力资源</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">商业伦理</div>
                        <div className="bg-white/5 rounded px-3 py-2 border border-white/10">国际商务</div>
                      </div>

                      <p className="font-semibold text-green-400 mb-3 mt-6 text-lg">明星案例：</p>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li>• 宁德时代：动力电池行业的领导者之路</li>
                        <li>• 字节跳动：算法驱动的内容生态</li>
                        <li>• 华为：极限生存与战略韧性</li>
                        <li>• 拼多多：下沉市场的破局之道</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
              </div>
            </motion.div>

            {/* 案例编审服务 */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1], type: "tween" }
              }}
              onClick={(e) => handleCardToggle("editorial", e)}
              className="relative backdrop-blur-sm bg-black/80 border-2 border-white/20 rounded-2xl p-8 hover:border-white/30 cursor-pointer overflow-hidden shadow-lg shadow-white/5"
              style={{
                ...getCardStyle("editorial"),
                willChange: "auto"
              }}
            >
              <h3 className={`font-bold text-white mb-3 ${isCompressed("editorial") ? "text-lg" : "text-2xl"}`}>
                案例编审服务
              </h3>
              <p className={`text-gray-300 leading-relaxed ${isCompressed("editorial") ? "text-sm" : "text-base"}`}>
                提供案例方法论指导、同行评审、国内外出版支持，助力教师案例研发。
              </p>

              {expandedCard === "editorial" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <h4 className="text-xl font-semibold text-white mb-6">服务详情</h4>
                  <div className="space-y-4 text-gray-300 text-base">
                    <div>
                      <p className="font-medium text-orange-400 mb-1">服务内容：</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>案例写作方法论培训和指导</li>
                        <li>资深教授一对一案例辅导</li>
                        <li>专家匿名同行评审服务</li>
                        <li>国际出版社推荐和发行支持</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* 案例培训与活动 */}
            <motion.div
              layout
              transition={{
                layout: { duration: 0.35, ease: [0.4, 0, 0.2, 1], type: "tween" }
              }}
              onClick={(e) => handleCardToggle("training", e)}
              className="relative backdrop-blur-sm bg-black/80 border-2 border-white/20 rounded-2xl p-8 hover:border-white/30 cursor-pointer overflow-hidden shadow-lg shadow-white/5"
              style={{
                ...getCardStyle("training"),
                willChange: "auto"
              }}
            >
              <h3 className={`font-bold text-white mb-3 ${isCompressed("training") ? "text-lg" : "text-2xl"}`}>
                案例培训与活动
              </h3>
              <p className={`text-gray-300 leading-relaxed ${isCompressed("training") ? "text-sm" : "text-base"}`}>
                案例写作培训、教学培训、全国教师工作坊、企业参访等丰富活动。
              </p>

              {expandedCard === "training" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 pt-8 border-t border-white/10"
                >
                  <h4 className="text-xl font-semibold text-white mb-6">活动详情</h4>
                  <div className="space-y-4 text-gray-300 text-base">
                    <div>
                      <p className="font-medium text-pink-400 mb-1">培训项目：</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>案例写作工作坊（每年2-3期）</li>
                        <li>案例教学法培训（线上+线下）</li>
                        <li>国际案例大会参会支持</li>
                        <li>教学创新论坛和研讨会</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-pink-400 mb-1">特色活动：</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>年度全国教师案例开发工作坊</li>
                        <li>标杆企业实地参访和调研</li>
                        <li>案例大赛和优秀案例评选</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
