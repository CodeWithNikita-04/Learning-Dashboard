'use client'

import { motion } from 'framer-motion'
import { AlertCircle, RefreshCcw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="flex flex-col items-center gap-4 text-center max-w-sm"
        style={{
          background: 'linear-gradient(135deg, #1a0a0a, #0f0f1a)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: '1rem',
          padding: '2rem',
        }}
      >
        <div className="p-3 rounded-full bg-red-500/10">
          <AlertCircle size={24} className="text-red-400" />
        </div>
        <div>
          <h2 className="text-slate-100 font-semibold mb-1">Couldn't load dashboard</h2>
          <p className="text-slate-500 text-sm">
            Failed to connect to the database. Check your Supabase credentials in{' '}
            <code className="text-slate-400 text-xs">.env.local</code>.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-red-400/70 text-xs mt-2 font-mono">{error.message}</p>
          )}
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <RefreshCcw size={14} />
          Try again
        </button>
      </motion.div>
    </div>
  )
}
