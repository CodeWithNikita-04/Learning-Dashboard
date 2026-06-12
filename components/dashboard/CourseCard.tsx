'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { Course } from '@/types'
import ProgressBar from '@/components/ui/ProgressBar'

interface CourseCardProps {
  course: Course
}

// Map icon_name string to actual Lucide component
function getIcon(name: string) {
  // Normalize: "Code2" or "code2" both work
  const normalized = name.charAt(0).toUpperCase() + name.slice(1)
  const Icon = (LucideIcons as Record<string, React.ElementType>)[normalized]
  return Icon ?? LucideIcons.BookOpen
}

// Subtle gradient per card index — we pick based on first char of id
const gradients = [
  'from-blue-950/40 via-[#0f0f1a] to-[#0f0f1a]',
  'from-purple-950/40 via-[#0f0f1a] to-[#0f0f1a]',
  'from-cyan-950/40 via-[#0f0f1a] to-[#0f0f1a]',
  'from-indigo-950/40 via-[#0f0f1a] to-[#0f0f1a]',
]

const iconColors = [
  'text-blue-400 bg-blue-500/10',
  'text-purple-400 bg-purple-500/10',
  'text-cyan-400 bg-cyan-500/10',
  'text-indigo-400 bg-indigo-500/10',
]

export default function CourseCard({ course }: CourseCardProps) {
  const Icon = getIcon(course.icon_name)

  // Pick a color based on title length (deterministic)
  const colorIdx = course.title.length % 4
  const gradient = gradients[colorIdx]
  const iconColor = iconColors[colorIdx]

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-2xl p-5 h-44 grain-texture group cursor-default bg-gradient-to-br ${gradient}`}
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ boxShadow: 'inset 0 0 0 1px rgba(139,92,246,0.3)' }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <div className={`p-2 rounded-lg ${iconColor}`}>
            <Icon size={18} />
          </div>
          <span className="text-xs text-slate-500">{course.progress}%</span>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-100 mb-3 leading-snug">
            {course.title}
          </h2>
          <ProgressBar value={course.progress} />
        </div>
      </div>
    </motion.article>
  )
}
