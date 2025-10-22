"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getRandomKeywords, type Keyword } from "@/lib/keywords"

interface LetterState {
  char: string
  finalChar: string
}

interface KeywordDisplay {
  word: string
  x: number
  y: number
  letters: LetterState[]
  id: string
  fontSize: number
}

export function MatrixKeywordWall() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [keywords, setKeywords] = useState<KeywordDisplay[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Color palette matching the site theme
  const COLORS = [
    "#0045a6", // Blue
    "#f36823", // Orange
    "#ffffff", // White
  ]

  const getRandomChar = useCallback(() => {
    const chars = "科创新质生产力人工智能数字化转型大模型区块链物联网云计算边缘计算01"
    return chars[Math.floor(Math.random() * chars.length)]
  }, [])

  const getColorForPosition = useCallback((y: number, height: number) => {
    const ratio = y / height
    if (ratio < 0.4) return COLORS[0] // Blue for top
    if (ratio < 0.7) return COLORS[1] // Orange for middle
    return COLORS[2] // White for bottom
  }, [])

  const createKeywordDisplay = useCallback((keyword: Keyword, containerWidth: number): KeywordDisplay => {
    const x = Math.random() * (containerWidth - 300) + 50 // Leave margin
    const y = -80 // Start above viewport
    const fontSize = Math.random() * 20 + 45 // 45-65px

    return {
      word: keyword.cn,
      x,
      y,
      fontSize,
      id: Math.random().toString(36),
      letters: keyword.cn.split("").map((char) => ({
        char: getRandomChar(),
        finalChar: char,
      })),
    }
  }, [getRandomChar])

  // Initialize keywords
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const height = containerRef.current.offsetHeight
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Generate initial keywords
  useEffect(() => {
    if (dimensions.width === 0) return

    const initialKeywords = getRandomKeywords(12).map((kw, i) => {
      const keyword = createKeywordDisplay(kw, dimensions.width)
      keyword.y = -100 - (i * 120) // Stagger vertically
      return keyword
    })

    setKeywords(initialKeywords)
  }, [dimensions.width, createKeywordDisplay])

  // Main animation loop: falling + character morphing
  useEffect(() => {
    if (dimensions.height === 0) return

    const MIDDLE_Y = dimensions.height * 0.45 // Middle position (45% down)
    const MIDDLE_THRESHOLD = 80 // Range around middle where text stabilizes

    const animationInterval = setInterval(() => {
      setKeywords((prev) => {
        return prev.map((kw) => {
          const newY = kw.y + 2 // Falling speed

          // Check if keyword is in the middle zone
          const isInMiddle = Math.abs(newY - MIDDLE_Y) < MIDDLE_THRESHOLD

          // Update letters based on position
          const updatedLetters = kw.letters.map((letter) => {
            if (isInMiddle) {
              // In middle: show real character
              return { ...letter, char: letter.finalChar }
            } else {
              // Outside middle: show random characters
              return { ...letter, char: getRandomChar() }
            }
          })

          // If keyword falls below viewport, recycle it
          if (newY > dimensions.height + 100) {
            const newKeyword = getRandomKeywords(1)[0]
            return createKeywordDisplay(newKeyword, dimensions.width)
          }

          return { ...kw, y: newY, letters: updatedLetters }
        })
      })
    }, 40) // 40ms = 25fps for smooth animation

    return () => clearInterval(animationInterval)
  }, [dimensions, createKeywordDisplay, getRandomChar])

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {keywords.map((keyword) => {
        const MIDDLE_Y = dimensions.height * 0.45
        const MIDDLE_THRESHOLD = 80
        const isInMiddle = Math.abs(keyword.y - MIDDLE_Y) < MIDDLE_THRESHOLD
        const currentColor = getColorForPosition(keyword.y, dimensions.height)

        return (
          <div
            key={keyword.id}
            className="absolute whitespace-nowrap font-black"
            style={{
              left: keyword.x,
              top: keyword.y,
              fontSize: keyword.fontSize,
              transition: 'none',
            }}
          >
            {keyword.letters.map((letter, letterIndex) => (
              <span
                key={letterIndex}
                className="inline-block font-mono"
                style={{
                  color: isInMiddle ? currentColor : "#00ff00",
                  textShadow: isInMiddle
                    ? `0 0 15px ${currentColor}, 0 0 30px ${currentColor}`
                    : "0 0 15px #00ff00, 0 0 30px #00ff00, 0 0 45px #00ff00",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 900,
                }}
              >
                {letter.char}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}
