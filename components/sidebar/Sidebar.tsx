'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'courses', label: 'My Courses', icon: BookOpen, href: '/dashboard' },
  { id: 'stats', label: 'Stats', icon: BarChart2, href: '/dashboard' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeId, setActiveId] = useState('dashboard')

  return (
    <>
      {/* Desktop sidebar */}
      <motion.nav
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen bg-[#0f0f1a] border-r border-white/5 shrink-0 overflow-hidden z-10"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <GraduationCap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.15 }}
                className="font-semibold text-white text-sm whitespace-nowrap"
              >
                LearnSpace
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-3 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-slate-400 hover:text-slate-100 w-full"
              >
                {/* Animated background highlight using layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-bg"
                    className="absolute inset-0 rounded-lg bg-blue-500/10 border border-blue-500/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon
                  size={18}
                  className={`shrink-0 relative z-10 ${isActive ? 'text-blue-400' : ''}`}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`relative z-10 whitespace-nowrap ${isActive ? 'text-blue-300' : ''}`}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f1a] border-t border-white/5 flex items-center justify-around px-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="relative flex flex-col items-center gap-1 p-2 rounded-lg"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active-bg"
                  className="absolute inset-0 rounded-lg bg-blue-500/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                className={`relative z-10 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}
              />
              <span className={`text-[10px] relative z-10 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </>
  )
}
