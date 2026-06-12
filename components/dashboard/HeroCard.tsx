'use client'

import { motion } from 'framer-motion'
import { Flame, Zap } from 'lucide-react'

interface HeroCardProps {
  studentName: string
  streak: number
}

export default function HeroCard({ studentName, streak }: HeroCardProps) {
  const hours = new Date().getHours()
  const greeting =
    hours < 12 ? 'Good morning' : hours < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.article
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-6 h-52 grain-texture group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #0f0f2a 0%, #1a0a2e 50%, #0a1628 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Glowing orbs in background */}
      <div
        className="absolute -top-12 -left-12 w-48 h-48 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)' }}
      />
      <div
        className="absolute -bottom-8 right-8 w-40 h-40 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }}
      />

      {/* Border glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.3)',
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <p className="text-slate-400 text-sm mb-1">{greeting},</p>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {studentName} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            You have 4 active courses. Keep it up!
          </p>
        </div>

        {/* Streak badge */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(251, 146, 60, 0.1)',
              border: '1px solid rgba(251, 146, 60, 0.25)',
            }}
          >
            <Flame size={14} className="text-orange-400" />
            <span className="text-orange-300">{streak} day streak</span>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
            }}
          >
            <Zap size={14} className="text-blue-400" />
            <span className="text-blue-300">On a roll!</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
