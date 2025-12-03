import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Achievable SAT Prep',
  description: 'AI-powered SAT preparation platform with personalized study plans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

