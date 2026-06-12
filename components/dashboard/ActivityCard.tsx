'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

// Generate a 7x10 mock activity grid (10 weeks x 7 days)
function generateActivityData() {
  const grid: number[][] = []
  for (let week = 0; week < 10; week++) {
    const days: number[] = []
    for (let day = 0; day < 7; day++) {
      // Random-ish activity levels (0–4)
      const seed = (week * 7 + day) % 13
      const level = seed < 3 ? 0 : seed < 7 ? 1 : seed < 10 ? 2 : seed < 12 ? 3 : 4
      days.push(level)
    }
    grid.push(days)
  }
  return grid
}

const activityColors = [
  'bg-white/5',           // 0 - no activity
  'bg-blue-900/60',       // 1 - low
  'bg-blue-700/70',       // 2 - medium
  'bg-blue-500/80',       // 3 - high
  'bg-blue-400',          // 4 - very high
]

const data = generateActivityData()
const totalDays = data.flat().filter(v => v > 0).length

export default function ActivityCard() {
  return (
    <motion.article
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative overflow-hidden rounded-2xl p-5 h-52 grain-texture group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #0f0f1a 0%, #0d1520 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(6,182,212,0.25)' }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-cyan-400" />
          <span className="text-sm font-medium text-slate-300">Learning Activity</span>
          <span className="ml-auto text-xs text-slate-500">{totalDays} active days</span>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 flex-1 items-end">
          {data.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1 flex-1">
              {week.map((level, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (weekIdx * 7 + dayIdx) * 0.005,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={`rounded-sm h-3 w-full ${activityColors[level]}`}
                  title={`Level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-3">
          <span className="text-[10px] text-slate-600">Less</span>
          {activityColors.map((color, i) => (
            <div key={i} className={`w-2.5 h-2.5 rounded-sm ${color}`} />
          ))}
          <span className="text-[10px] text-slate-600">More</span>
        </div>
      </div>
    </motion.article>
  )
}
