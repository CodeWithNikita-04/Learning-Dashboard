import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnSpace — Student Dashboard',
  description: 'Track your courses, streaks, and progress.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0f] text-slate-200 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
