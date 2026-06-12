'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number // 0–100
}

export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${value}%` }}
        transition={{
          duration: 0.9,
          ease: [0.34, 1.56, 0.64, 1], // slight overshoot spring-like feel
          delay: 0.3,
        }}
      />
    </div>
  )
}
