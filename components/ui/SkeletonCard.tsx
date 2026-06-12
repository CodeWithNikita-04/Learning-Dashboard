'use client'

import { motion } from 'framer-motion'

interface SkeletonCardProps {
  className?: string
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`rounded-2xl ${className}`}
      style={{
        background: 'linear-gradient(135deg, #0f0f1a, #141428)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        {/* Icon placeholder */}
        <div className="w-8 h-8 rounded-lg bg-white/5" />
        {/* Text lines */}
        <div className="w-3/4 h-3 rounded bg-white/5" />
        <div className="w-1/2 h-3 rounded bg-white/5" />
        {/* Progress bar placeholder */}
        <div className="mt-auto w-full h-1.5 rounded-full bg-white/5" />
      </div>
    </motion.div>
  )
}
