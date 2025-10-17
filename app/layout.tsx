import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// 配置 HarmonyOS Sans SC（简体中文）字体
const harmonyOSSansSC = localFont({
  src: [
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-harmonyos-sans',
  display: 'swap',
})

// 配置 HarmonyOS Sans（英文/数字优化）
const harmonyOSSans = localFont({
  src: [
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans/HarmonyOS_Sans_Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans/HarmonyOS_Sans_Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans/HarmonyOS_Sans_Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../HarmonyOS Sans/HarmonyOS_Sans/HarmonyOS_Sans_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-harmonyos-sans-base',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FDSM CASES - 复旦大学管理学院案例库',
  description: '关注中国现代商业实践，发掘中国科创进程。以培养全球商科人才为目标的案例研发平台。',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${harmonyOSSansSC.variable} ${harmonyOSSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
