// Management Keywords Database - 203 terms across 8 categories
export interface Keyword {
  cn: string
  en: string
}

export const keywords = {
  // A. 宏观与战略 (27 terms)
  macroStrategy: [
    { cn: "企业战略", en: "Corporate Strategy" },
    { cn: "竞争战略", en: "Competitive Strategy" },
    { cn: "蓝海战略", en: "Blue Ocean Strategy" },
    { cn: "商业模式", en: "Business Model" },
    { cn: "战略管理", en: "Strategic Management" },
    { cn: "多元化战略", en: "Diversification Strategy" },
    { cn: "国际化战略", en: "Internationalization Strategy" },
    { cn: "全球化", en: "Globalization" },
    { cn: "并购与重组", en: "M&A and Restructuring" },
    { cn: "战略联盟", en: "Strategic Alliance" },
    { cn: "核心竞争力", en: "Core Competency" },
    { cn: "价值链", en: "Value Chain" },
    { cn: "企业文化", en: "Corporate Culture" },
    { cn: "企业社会责任", en: "CSR" },
    { cn: "可持续发展", en: "Sustainable Development" },
    { cn: "ESG", en: "ESG" },
    { cn: "利益相关者", en: "Stakeholder" },
    { cn: "公司治理", en: "Corporate Governance" },
    { cn: "风险管理", en: "Risk Management" },
    { cn: "危机管理", en: "Crisis Management" },
    { cn: "变革管理", en: "Change Management" },
    { cn: "组织变革", en: "Organizational Change" },
    { cn: "战略转型", en: "Strategic Transformation" },
    { cn: "数字化转型", en: "Digital Transformation" },
    { cn: "产业政策", en: "Industrial Policy" },
    { cn: "竞争政策", en: "Competition Policy" },
    { cn: "政商关系", en: "Government-Business Relations" }
  ] as Keyword[],

  // B. 市场营销与品牌 (27 terms)
  marketing: [
    { cn: "市场营销", en: "Marketing" },
    { cn: "市场细分", en: "Market Segmentation" },
    { cn: "目标市场", en: "Target Market" },
    { cn: "市场定位", en: "Market Positioning" },
    { cn: "品牌管理", en: "Brand Management" },
    { cn: "品牌建设", en: "Brand Building" },
    { cn: "品牌价值", en: "Brand Value" },
    { cn: "品牌定位", en: "Brand Positioning" },
    { cn: "品牌延伸", en: "Brand Extension" },
    { cn: "消费者行为", en: "Consumer Behavior" },
    { cn: "客户关系管理", en: "CRM" },
    { cn: "客户体验", en: "Customer Experience" },
    { cn: "用户体验", en: "User Experience" },
    { cn: "产品创新", en: "Product Innovation" },
    { cn: "产品开发", en: "Product Development" },
    { cn: "定价策略", en: "Pricing Strategy" },
    { cn: "渠道管理", en: "Channel Management" },
    { cn: "分销渠道", en: "Distribution Channel" },
    { cn: "促销策略", en: "Promotion Strategy" },
    { cn: "广告营销", en: "Advertising Marketing" },
    { cn: "数字营销", en: "Digital Marketing" },
    { cn: "社交媒体营销", en: "Social Media Marketing" },
    { cn: "内容营销", en: "Content Marketing" },
    { cn: "口碑营销", en: "Word-of-mouth Marketing" },
    { cn: "服务营销", en: "Service Marketing" },
    { cn: "营销4P", en: "Marketing 4P" },
    { cn: "整合营销", en: "Integrated Marketing" }
  ] as Keyword[],

  // C. 组织、领导力与人力资源 (18 terms)
  organization: [
    { cn: "组织结构", en: "Organizational Structure" },
    { cn: "组织设计", en: "Organizational Design" },
    { cn: "组织发展", en: "Organizational Development" },
    { cn: "领导力", en: "Leadership" },
    { cn: "领导力发展", en: "Leadership Development" },
    { cn: "变革型领导", en: "Transformational Leadership" },
    { cn: "人力资源管理", en: "HRM" },
    { cn: "人才管理", en: "Talent Management" },
    { cn: "绩效管理", en: "Performance Management" },
    { cn: "薪酬管理", en: "Compensation Management" },
    { cn: "激励机制", en: "Incentive Mechanism" },
    { cn: "员工敬业度", en: "Employee Engagement" },
    { cn: "企业家精神", en: "Entrepreneurship" },
    { cn: "创新文化", en: "Innovation Culture" },
    { cn: "学习型组织", en: "Learning Organization" },
    { cn: "知识管理", en: "Knowledge Management" },
    { cn: "团队建设", en: "Team Building" },
    { cn: "跨文化管理", en: "Cross-cultural Management" }
  ] as Keyword[],

  // D. 运营与供应链管理 (14 terms)
  operations: [
    { cn: "运营管理", en: "Operations Management" },
    { cn: "生产管理", en: "Production Management" },
    { cn: "质量管理", en: "Quality Management" },
    { cn: "精益生产", en: "Lean Production" },
    { cn: "供应链管理", en: "Supply Chain Management" },
    { cn: "物流管理", en: "Logistics Management" },
    { cn: "采购管理", en: "Procurement Management" },
    { cn: "库存管理", en: "Inventory Management" },
    { cn: "项目管理", en: "Project Management" },
    { cn: "流程优化", en: "Process Optimization" },
    { cn: "成本控制", en: "Cost Control" },
    { cn: "效率提升", en: "Efficiency Improvement" },
    { cn: "智能制造", en: "Smart Manufacturing" },
    { cn: "工业4.0", en: "Industry 4.0" }
  ] as Keyword[],

  // E. 财务、金融与投资 (20 terms)
  finance: [
    { cn: "财务管理", en: "Financial Management" },
    { cn: "财务分析", en: "Financial Analysis" },
    { cn: "财务报表", en: "Financial Statement" },
    { cn: "成本会计", en: "Cost Accounting" },
    { cn: "管理会计", en: "Management Accounting" },
    { cn: "资本运营", en: "Capital Operation" },
    { cn: "融资策略", en: "Financing Strategy" },
    { cn: "投资决策", en: "Investment Decision" },
    { cn: "风险投资", en: "Venture Capital" },
    { cn: "私募股权", en: "Private Equity" },
    { cn: "IPO上市", en: "IPO Listing" },
    { cn: "估值", en: "Valuation" },
    { cn: "资产管理", en: "Asset Management" },
    { cn: "现金流管理", en: "Cash Flow Management" },
    { cn: "财务预算", en: "Financial Budget" },
    { cn: "税务筹划", en: "Tax Planning" },
    { cn: "内部控制", en: "Internal Control" },
    { cn: "审计", en: "Audit" },
    { cn: "合规管理", en: "Compliance Management" },
    { cn: "金融科技", en: "FinTech" }
  ] as Keyword[],

  // F. 创新、创业与技术管理 (23 terms)
  innovation: [
    { cn: "创新管理", en: "Innovation Management" },
    { cn: "技术创新", en: "Technological Innovation" },
    { cn: "研发管理", en: "R&D Management" },
    { cn: "开放式创新", en: "Open Innovation" },
    { cn: "破坏性创新", en: "Disruptive Innovation" },
    { cn: "创业管理", en: "Entrepreneurial Management" },
    { cn: "创业生态", en: "Entrepreneurial Ecosystem" },
    { cn: "孵化器", en: "Incubator" },
    { cn: "加速器", en: "Accelerator" },
    { cn: "技术转移", en: "Technology Transfer" },
    { cn: "知识产权", en: "Intellectual Property" },
    { cn: "专利管理", en: "Patent Management" },
    { cn: "人工智能", en: "AI" },
    { cn: "大数据", en: "Big Data" },
    { cn: "云计算", en: "Cloud Computing" },
    { cn: "物联网", en: "IoT" },
    { cn: "区块链", en: "Blockchain" },
    { cn: "5G技术", en: "5G Technology" },
    { cn: "信息系统", en: "Information System" },
    { cn: "信息技术管理", en: "IT Management" },
    { cn: "数据分析", en: "Data Analytics" },
    { cn: "商业智能", en: "Business Intelligence" },
    { cn: "技术战略", en: "Technology Strategy" }
  ] as Keyword[],

  // G. 特定商业模式与行业 (26 terms)
  businessModels: [
    { cn: "平台经济", en: "Platform Economy" },
    { cn: "共享经济", en: "Sharing Economy" },
    { cn: "订阅经济", en: "Subscription Economy" },
    { cn: "零工经济", en: "Gig Economy" },
    { cn: "电子商务", en: "E-commerce" },
    { cn: "跨境电商", en: "Cross-border E-commerce" },
    { cn: "社交电商", en: "Social Commerce" },
    { cn: "直播电商", en: "Live-streaming Commerce" },
    { cn: "新零售", en: "New Retail" },
    { cn: "O2O模式", en: "O2O Model" },
    { cn: "C2B模式", en: "C2B Model" },
    { cn: "B2B模式", en: "B2B Model" },
    { cn: "B2C模式", en: "B2C Model" },
    { cn: "SaaS模式", en: "SaaS Model" },
    { cn: "订阅模式", en: "Subscription Model" },
    { cn: "免费增值", en: "Freemium" },
    { cn: "长尾理论", en: "Long Tail Theory" },
    { cn: "网络效应", en: "Network Effect" },
    { cn: "双边市场", en: "Two-sided Market" },
    { cn: "生态系统", en: "Ecosystem" },
    { cn: "产业链", en: "Industrial Chain" },
    { cn: "产业集群", en: "Industrial Cluster" },
    { cn: "价值网络", en: "Value Network" },
    { cn: "独角兽企业", en: "Unicorn Company" },
    { cn: "隐形冠军", en: "Hidden Champion" },
    { cn: "专精特新", en: "Specialized and Innovative" }
  ] as Keyword[],

  // H. 综合与其他 (48 terms)
  general: [
    { cn: "管理学", en: "Management Science" },
    { cn: "商业分析", en: "Business Analysis" },
    { cn: "案例研究", en: "Case Study" },
    { cn: "管理咨询", en: "Management Consulting" },
    { cn: "决策分析", en: "Decision Analysis" },
    { cn: "博弈论", en: "Game Theory" },
    { cn: "行为经济学", en: "Behavioral Economics" },
    { cn: "管理心理学", en: "Management Psychology" },
    { cn: "标杆管理", en: "Benchmarking" },
    { cn: "最佳实践", en: "Best Practice" },
    { cn: "流程再造", en: "BPR" },
    { cn: "六西格玛", en: "Six Sigma" },
    { cn: "敏捷管理", en: "Agile Management" },
    { cn: "OKR管理", en: "OKR Management" },
    { cn: "平衡计分卡", en: "Balanced Scorecard" },
    { cn: "关键绩效指标", en: "KPI" },
    { cn: "数据驱动决策", en: "Data-driven Decision" },
    { cn: "精细化管理", en: "Refined Management" },
    { cn: "标准化管理", en: "Standardized Management" },
    { cn: "制度建设", en: "System Building" },
    { cn: "执行力", en: "Execution" },
    { cn: "商业伦理", en: "Business Ethics" },
    { cn: "诚信经营", en: "Integrity Management" },
    { cn: "合规经营", en: "Compliance Operation" },
    { cn: "反腐败", en: "Anti-corruption" },
    { cn: "信息披露", en: "Information Disclosure" },
    { cn: "透明度", en: "Transparency" },
    { cn: "问责制", en: "Accountability" },
    { cn: "商业模式创新", en: "Business Model Innovation" },
    { cn: "管理创新", en: "Management Innovation" },
    { cn: "服务创新", en: "Service Innovation" },
    { cn: "组织创新", en: "Organizational Innovation" },
    { cn: "流程创新", en: "Process Innovation" },
    { cn: "价值创造", en: "Value Creation" },
    { cn: "价值捕获", en: "Value Capture" },
    { cn: "竞争优势", en: "Competitive Advantage" },
    { cn: "差异化", en: "Differentiation" },
    { cn: "成本领先", en: "Cost Leadership" },
    { cn: "聚焦战略", en: "Focus Strategy" },
    { cn: "规模经济", en: "Economies of Scale" },
    { cn: "范围经济", en: "Economies of Scope" },
    { cn: "学习曲线", en: "Learning Curve" },
    { cn: "路径依赖", en: "Path Dependence" },
    { cn: "先发优势", en: "First-mover Advantage" },
    { cn: "后发优势", en: "Late-mover Advantage" },
    { cn: "动态能力", en: "Dynamic Capability" },
    { cn: "组织能力", en: "Organizational Capability" },
    { cn: "战略执行", en: "Strategy Execution" }
  ] as Keyword[]
}

// Flatten all keywords into a single array for random selection
export const allKeywords: Keyword[] = [
  ...keywords.macroStrategy,
  ...keywords.marketing,
  ...keywords.organization,
  ...keywords.operations,
  ...keywords.finance,
  ...keywords.innovation,
  ...keywords.businessModels,
  ...keywords.general
]

// Get a random subset of keywords for display
export function getRandomKeywords(count: number): Keyword[] {
  const shuffled = [...allKeywords].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get keywords by category
export function getKeywordsByCategory(categoryKey: keyof typeof keywords): Keyword[] {
  return keywords[categoryKey]
}
