"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  // Simplified: plain bold white text, no effects
  return (
    <a
      href={href}
      className="text-white font-bold text-base md:text-lg tracking-wide px-1 py-1"
    >
      {children}
    </a>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  // 滚动监听：向下隐藏，向上显示
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 50) {
        // 在顶部时始终显示
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // 向下滚动 - 隐藏
        setIsVisible(false)
      } else {
        // 向上滚动 - 显示
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navLinksData = [
    { label: "案例产品", href: "#services" },
    { label: "国际合作", href: "#testimonials" },
    { label: "关于我们", href: "#contact" },
  ]

  const contactButtonElement = (
    <button className="px-5 py-2 text-base font-semibold text-white/85 hover:text-white transition-colors duration-300 w-full sm:w-auto">
      联系我们
    </button>
  )

  const accessButtonElement = (
    <div className="relative group w-full sm:w-auto">
      <div
        className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-blue-500
                     opacity-50 filter blur-xl pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-70 group-hover:blur-2xl group-hover:-m-4"
      ></div>
      <button className="relative z-10 px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/50 transition-all duration-300 w-full sm:w-auto">
        访问案例库
      </button>
    </div>
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50
                   flex items-center justify-center
                   px-6 py-4
                   backdrop-blur-xl bg-black/40
                   shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                   transition-all duration-500 ease-in-out
                   ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      {/* 顶部光影效果 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container mx-auto flex items-center justify-between max-w-7xl">
        {/* 品牌名称 */}
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
            <span className="bg-gradient-to-r from-[#00dcff] to-[#0045a6] bg-clip-text text-transparent">FDSM</span>
            <span className="mx-1"></span>
            <span className="bg-gradient-to-r from-[#ffb15e] to-[#f36823] bg-clip-text text-transparent">CASES</span>
          </h1>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* 按钮组 */}
        <div className="hidden md:flex items-center gap-4">
          {contactButtonElement}
          {accessButtonElement}
        </div>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white focus:outline-none transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "关闭菜单" : "打开菜单"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* 移动端菜单 */}
      <div
        className={`md:hidden absolute top-full left-0 right-0
                     backdrop-blur-xl bg-black/60
                     shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]
                     transition-all duration-300 ease-in-out overflow-hidden
                     ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="container mx-auto px-6 py-6">
          <nav className="flex flex-col space-y-4">
            {navLinksData.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col space-y-3 mt-6">
            {contactButtonElement}
            {accessButtonElement}
          </div>
        </div>
      </div>
    </header>
  )
}
