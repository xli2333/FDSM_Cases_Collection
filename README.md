# 现代化展示网站

一个使用 Next.js 14 构建的现代化、交互式展示网站，具有动态卡片动画、3D 特效和响应式设计。

## ✨ 核心特性

- **交互式服务卡片** - 动态网格布局，流畅的展开/收起动画
- **粒子关键词墙** - Canvas 2D 粒子系统，动态文字形成效果
- **激光扫描特效** - 合作伙伴展示区域的扫描线动画
- **发展历程时间轴** - 垂直时间轴，滚动触发动画
- **视频集成** - 无缝多媒体内容展示，支持自动播放
- **3D 视觉效果** - 使用 Three.js 的粒子系统和动画背景
- **响应式设计** - 移动端优先的 Tailwind CSS 设计
- **深色主题** - 现代化深色界面，带渐变强调色
- **流畅动画** - Framer Motion 驱动的过渡和微交互

## 🛠️ 技术栈

### 核心框架
- **Next.js 14.2.16** - React 框架，使用 App Router
- **React 18** - UI 库
- **TypeScript 5** - 类型安全开发

### 样式与 UI
- **Tailwind CSS 4.1.9** - 实用优先的 CSS 框架
- **Radix UI** - 无障碍组件原语
- **Framer Motion** - 动画库
- **Lucide React** - 图标系统
- **class-variance-authority** - 组件变体管理

### 3D 与视觉效果
- **Three.js** - 3D 图形库
- **@react-three/fiber** - Three.js 的 React 渲染器
- **@react-three/drei** - react-three-fiber 的实用工具库
- **@splinetool/react-spline** - 3D 设计工具集成
- **@tsparticles** - 粒子效果引擎
- **Canvas API** - 原生 Canvas 2D 图形渲染

### 附加库
- **react-hook-form** - 表单管理
- **zod** - 模式验证
- **date-fns** - 日期工具库
- **recharts** - 图表库
- **sonner** - Toast 通知
- **embla-carousel-react** - 轮播组件

## 🎨 设计亮点

### 交互卡片系统
- 自定义 18 列 CSS Grid 布局
- 五种不同卡片类型，具有独特的展开行为
- 带弹簧物理效果的平滑布局过渡
- 集成视频播放的多媒体内容

### 粒子关键词墙
- Canvas 2D 渲染的粒子系统
- 10-14 个关键词循环展示
- 粒子形成文字效果
- 三色调色板（蓝、橙、白）
- 防碰撞算法确保关键词布局合理

### 激光扫描特效
- Canvas 绘制的激光扫描线
- 粒子系统模拟激光效果
- Logo 到详情的 clip-path 切换动画
- 实时位置追踪和动态裁剪

### 发展历程时间轴
- 垂直时间轴，左右交替布局
- 滚动触发的入场动画
- 时间节点渐进显示
- 悬停放大效果

### 视觉设计
- 渐变背景与背景模糊效果
- 悬停时的边框发光效果
- 玻璃拟态 UI 元素
- 响应式排版缩放

### 动画模式
- 滚动触发的淡入动画
- 交错入场动画
- 带缓动曲线的布局过渡
- 粒子背景效果

## 📦 项目结构

```
.
├── app/
│   ├── page.tsx              # 主页面
│   └── layout.tsx            # 根布局
├── components/
│   └── ui/
│       ├── interactive-service-cards.tsx  # 动态卡片网格
│       ├── partner-scanner.tsx            # 合作伙伴扫描特效
│       ├── particle-keyword-wall.tsx      # 粒子关键词墙
│       ├── timeline.tsx                   # 发展历程时间轴
│       ├── pricing.tsx                    # 定价板块
│       └── [其他组件]
├── lib/
│   ├── utils.ts              # 工具函数
│   └── keywords.ts           # 关键词数据
└── public/                   # 静态资源
    └── logos/                # Logo 图片
```

## 🚀 快速开始

### 前置要求
- Node.js 18+
- npm 或 pnpm

### 安装

```bash
# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📱 响应式断点

- 移动端: < 768px
- 平板: 768px - 1024px
- 桌面端: > 1024px

## 🎥 视频托管

大型视频文件通过 GitHub Releases 托管，以绕过仓库大小限制：
- 视频存储在 GitHub Releases 作为 CDN
- 自动播放（静音音频）以获得更好的用户体验
- 懒加载以优化性能

## 🎯 性能优化

- 粒子系统使用 Canvas 2D 而非 WebGL，降低 GPU 负载
- 动画使用 `requestAnimationFrame` 保证流畅度
- 图片懒加载和优化
- 代码分割和动态导入
- Tailwind CSS 生产构建优化

## 📄 许可证

本项目为私有和专有项目。

## 🙏 致谢

使用现代 Web 技术和最佳实践构建，以实现最佳性能和用户体验。
