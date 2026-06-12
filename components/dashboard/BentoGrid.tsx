'use client'

import { motion } from 'framer-motion'
import type { Course } from '@/types'
import HeroCard from './HeroCard'
import CourseCard from './CourseCard'
import ActivityCard from './ActivityCard'

interface BentoGridProps {
  courses: Course[]
}

// Stagger container: children animate in one by one
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 22,
    },
  },
}

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min"
    >
      {/* Hero spans 2 cols on larger screens */}
      <motion.div variants={cardVariants} className="col-span-1 md:col-span-2">
        <HeroCard streak={7} studentName="Arjun" />
      </motion.div>

      {/* Activity tile */}
      <motion.div variants={cardVariants} className="col-span-1">
        <ActivityCard />
      </motion.div>

      {/* Dynamic course tiles from Supabase */}
      {courses.map((course) => (
        <motion.div key={course.id} variants={cardVariants} className="col-span-1">
          <CourseCard course={course} />
        </motion.div>
      ))}
    </motion.section>
  )
}
