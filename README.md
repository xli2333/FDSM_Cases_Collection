# Business Case Platform Landing Page

A modern, interactive landing page built with Next.js 14, featuring dynamic card animations, 3D effects, and responsive design.

## ✨ Features

- **Interactive Service Cards** - Dynamic grid layout with smooth expand/collapse animations
- **Video Integration** - Seamless multimedia content display with auto-play support
- **3D Visual Effects** - Particle systems and animated backgrounds using Three.js
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Modern dark interface with gradient accents
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon system
- **class-variance-authority** - Component variant management

### 3D & Visual Effects
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **@splinetool/react-spline** - 3D design tool integration
- **@tsparticles** - Particle effects engine

### Additional Libraries
- **react-hook-form** - Form management
- **zod** - Schema validation
- **date-fns** - Date utility library
- **recharts** - Chart library
- **sonner** - Toast notifications
- **embla-carousel-react** - Carousel component

## 🎨 Design Highlights

### Interactive Card System
- Custom 18-column CSS Grid layout
- Five different card types with unique expansion behaviors
- Smooth layout transitions with spring physics
- Video playback integration for multimedia content

### Visual Design
- Gradient backgrounds with backdrop blur effects
- Border glow effects on hover
- Glassmorphic UI elements
- Responsive typography scaling

### Animation Patterns
- Scroll-triggered fade-in animations
- Staggered entrance animations
- Layout transitions with easing curves
- Particle background effects

## 📦 Project Structure

```
.
├── app/
│   ├── page.tsx              # Main landing page
│   └── layout.tsx            # Root layout
├── components/
│   └── ui/
│       ├── interactive-service-cards.tsx  # Dynamic card grid
│       ├── pricing.tsx                    # Pricing section
│       └── [other components]
├── lib/
│   └── utils.ts              # Utility functions
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎥 Video Hosting

Large video files are hosted via GitHub Releases to bypass repository size limits:
- Videos stored in GitHub Releases as CDN
- Auto-play with muted audio for better UX
- Lazy loading for optimal performance

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with modern web technologies and best practices for optimal performance and user experience.
