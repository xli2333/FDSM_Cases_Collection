import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { ParticleKeywordWall } from "@/components/ui/particle-keyword-wall"
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background"
import { SparklesCore } from "@/components/ui/sparkles"
import GradientText from "@/components/ui/gradient-text"
import CustomCursor from "@/components/ui/custom-cursor"

import { Pricing } from "@/components/ui/pricing"
import { InteractiveServiceCards } from "@/components/ui/interactive-service-cards"
import { PartnerScanner } from "@/components/ui/partner-scanner"
import { Timeline } from "@/components/ui/timeline"
import {
  CheckCircle,
  X,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Bot,
  Workflow,
  Brain,
  MessageSquare,
  MessageCircle,
  Cog,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  BookOpen,
  FileText,
  Video,
  Edit3,
  Users,
  GraduationCap,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black cursor-auto">
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-0">
        <div className="container mx-auto px-4 py-12">
          <div className="relative w-full min-h-[85vh] flex items-center">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Left content - 缩小并右移 */}
              <div className="relative z-10 flex flex-col justify-center space-y-8 scale-95 origin-left translate-x-8">
                {/* 品牌标识 */}
                <div className="space-y-4">
                  <p className="text-xl md:text-2xl text-blue-400 font-medium tracking-wide">
                    复旦大学管理学院 FDSM CASES
                  </p>

                  {/* 主标题 - 动态渐变文本 (Lumina Style) */}
                  <div className="py-6 md:py-10 w-full select-none special-cursor-area inline-block">
                    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none">
                      <GradientText
                        text="无科创"
                        className="block pb-4"
                        gradientClass="bg-gradient-to-r from-[#00dcff] via-[#0045a6] to-[#00dcff]"
                      />
                      <GradientText
                        text="无未来"
                        className="block pb-4 translate-x-16 md:translate-x-32 lg:translate-x-40"
                        gradientClass="bg-gradient-to-r from-[#ffb15e] via-[#f36823] to-[#ffb15e]"
                      />
                    </h1>
                  </div>
                </div>

                {/* 副标题 */}
                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-white font-light leading-relaxed max-w-2xl italic whitespace-nowrap">
                    进入中国管理情境 发掘企业科创进程 培养全球商科人才
                  </p>

                  <p className="text-base md:text-lg text-gray-400 max-w-xl">
                    自2023年底2.0版升级开放以来，已吸引全国200多所院校1000名教师注册使用，并被多所国际一流高校MBA项目采购。
                  </p>
                </div>

                {/* 按钮组 */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6">
                    访问案例库
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 bg-transparent text-lg px-8 py-6"
                  >
                    了解更多
                  </Button>
                </div>
              </div>

              {/* Right content - Particle Keyword Wall */}
              <div className="relative h-[600px] lg:h-[700px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-30 pointer-events-none"></div>
                <ParticleKeywordWall />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="about" className="py-24 bg-black">
        <div className="container mx-auto px-4 py-12">
          <div className="relative w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-stretch w-full">
              {/* 左侧卡片 - 问题 */}
              <div className="relative group">
                {/* 卡片内容 */}
                <div className="relative h-full bg-gradient-to-br from-red-950/30 to-black rounded-2xl p-8 md:p-10 border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] transition-all duration-500">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">传统案例教学面临的挑战</h2>
                  <div className="space-y-5 text-lg">
                    <div className="flex items-start gap-4 group/item">
                      <p className="text-gray-100 leading-relaxed">内容陈旧：现有案例往往难以反映瞬息万变的最新商业实践</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <p className="text-gray-100 leading-relaxed">缺乏本土化：缺少基于中国本土企业管理情境的深度案例</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <p className="text-gray-100 leading-relaxed">标准不统一：优质案例供给端薄弱，高质量教学案例标准缺少共识</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <p className="text-gray-100 leading-relaxed">支持不足：缺乏配套的教学说明和案例教学方法讲师师资培训服务</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右侧卡片 - 优势 */}
              <div className="relative group">
                {/* 卡片内容 */}
                <div className="relative h-full bg-gradient-to-br from-green-950/30 to-black rounded-2xl p-8 md:p-10 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transition-all duration-500">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">复旦案例库的核心优势</h2>
                  <div className="space-y-5 text-lg">
                    <div className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                      </div>
                      <p className="text-gray-100 leading-relaxed">聚焦科创：紧跟“新质生产力”，深度覆盖人工智能、新能源、生物医药等前沿领域</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                      </div>
                      <p className="text-gray-100 leading-relaxed">实地调研：90% 的案例为现场案例，基于对企业高管的实地访谈和一手资料开发</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                      </div>
                      <p className="text-gray-100 leading-relaxed">适用性强：拥有 1500+ 短案例，精准切入单一知识点，非常适合 15-30 分钟的快速课堂讨论</p>
                    </div>
                    <div className="flex items-start gap-4 group/item">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-6 h-6 text-green-400" strokeWidth={2.5} />
                      </div>
                      <p className="text-gray-100 leading-relaxed">体系完善：具备严格的案例编审流程、师资培训体系及国际发行渠道</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <InteractiveServiceCards />

      {/* Timeline Section */}
      <Timeline />

      {/* Partners Slider Section */}
      <PartnerScanner />

      {/* Representative Honors & Achievements Section */}
      <section id="honors" className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="scale-[1.2] origin-center pb-12">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">代表性荣誉</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                全国百篇优秀管理案例、精品案例课堂、阿里优秀活水学者等多项国家级荣誉
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-blue-500/10 to-transparent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative backdrop-blur-sm bg-white/[0.03] border border-white/10 group-hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                    <h3 className="text-lg font-bold text-white">全国工商管理案例中心</h3>
                  </div>
                  <p className="text-[15px] text-gray-400 leading-relaxed">
                    多篇案例入选全国百篇优秀管理案例及精品案例课，包括《eBay中国：领导力重塑》《丁香园：打造互联网医疗健康服务平台》等优秀作品
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 via-purple-500/10 to-transparent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative backdrop-blur-sm bg-white/[0.03] border border-white/10 group-hover:border-purple-500/30 rounded-xl p-6 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-purple-400 flex-shrink-0"></div>
                    <h3 className="text-lg font-bold text-white">教育部专业学位中心</h3>
                  </div>
                  <p className="text-[15px] text-gray-400 leading-relaxed">
                    入选精品案例课堂及MBA公开课，包括《苹果公司的战略》《新质生产力：猎头企业组织裂变》等高质量课程
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/30 via-orange-500/10 to-transparent rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative backdrop-blur-sm bg-white/[0.03] border border-white/10 group-hover:border-orange-500/30 rounded-xl p-6 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-orange-400 flex-shrink-0"></div>
                    <h3 className="text-lg font-bold text-white">社会影响力</h3>
                  </div>
                  <p className="text-[15px] text-gray-400 leading-relaxed">
                    获评阿里优秀活水学者，完成《从服务领先到生态繁荣：天猫生态价值研究报告》等重要研究项目
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Hidden */}
      {/* 
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white">简单三步，轻松使用</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              快速获取优质案例资源，助力教学创新
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-white">注册账号</h3>
              <p className="text-gray-300">
                教师用户在 case.fdsm.fudan.edu.cn 注册，提交教学身份验证
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-white">浏览筛选</h3>
              <p className="text-gray-300">
                按行业、主题、难度筛选案例，预览摘要和教学目标
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="h-20 w-20 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-white">下载应用</h3>
              <p className="text-gray-300">
                下载完整案例和教学课件，应用于课堂教学实践
              </p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Pricing Section - Hidden */}
      {/*
      <section className="py-24 bg-black">
        <Pricing
          title="选择适合您的访问方案"
          description="灵活的访问权限，满足不同用户需求\n所有方案均提供优质的案例资源和技术支持"
          plans={[
            {
              name: "基础版",
              price: "免费",
              yearlyPrice: "免费",
              period: "试用",
              features: [
                "有限案例浏览权限",
                "案例摘要查看",
                "基础搜索功能",
                "在线预览功能",
              ],
              description: "适合初次了解案例库的教师和学生",
              buttonText: "免费试用",
              href: "#contact",
              isPopular: false,
            },
            {
              name: "教师版",
              price: "联系咨询",
              yearlyPrice: "联系咨询",
              period: "",
              features: [
                "完整案例库访问权限",
                "教学课件下载",
                "案例培训参与权",
                "教师社区访问",
                "案例定制建议",
                "优先技术支持",
              ],
              description: "专为高校教师设计的完整解决方案",
              buttonText: "立即申请",
              href: "#contact",
              isPopular: true,
            },
            {
              name: "机构版",
              price: "联系咨询",
              yearlyPrice: "联系咨询",
              period: "",
              features: [
                "全校师生访问权限",
                "定制化案例开发",
                "优先编审服务",
                "专属案例工作坊",
                "企业参访活动",
                "年度使用报告",
                "专属客户经理",
              ],
              description: "为高校和培训机构提供的企业级服务",
              buttonText: "联系我们",
              href: "#contact",
              isPopular: false,
            },
          ]}
        />
      </section>
      */}

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <AnimatedGradientBackground
          Breathing={true}
          gradientColors={["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]}
          gradientStops={[35, 50, 60, 70, 80, 90, 100]}
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative h-32 w-full flex flex-col items-center justify-center">
              <div className="w-full absolute inset-0">
                <SparklesCore
                  id="ctasparticles"
                  background="transparent"
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className="w-full h-full"
                  particleColor="#FFFFFF"
                  speed={0.8}
                />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 relative z-20 text-balance">
                探索中国商业实践案例
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
                访问案例库
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative py-20 bg-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/90" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">FDSM CASES</h3>
                <p className="text-gray-300 leading-relaxed">
                  复旦大学管理学院案例库
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">案例资源</h4>
              <ul className="space-y-3">
                {[
                  "经典案例",
                  "短案例",
                  "多媒体案例",
                  "案例编审服务",
                  "案例培训与活动",
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">关于我们</h4>
              <ul className="space-y-3">
                {[
                  { name: "案例库简介", href: "#about" },
                  { name: "发展历程", href: "#timeline" },
                  { name: "国际合作", href: "#partners" },
                  { name: "荣誉成果", href: "#honors" },
                  { name: "联系我们", href: "#contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">访问案例库</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg mt-1">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <a href="https://case.fdsm.fudan.edu.cn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
                      case.fdsm.fudan.edu.cn
                    </a>
                    <p className="text-sm text-gray-400 mt-1">访问案例库主站</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-gray-300">
                  <div className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg mt-1">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span>复旦大学管理学院</span>
                    <p className="text-sm text-gray-400 mt-1">上海市国顺路670号</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-16 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <p className="text-gray-400 text-center lg:text-left">© 2025 复旦大学管理学院案例库. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
