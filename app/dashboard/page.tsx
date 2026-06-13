import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import BentoGrid from '@/components/dashboard/BentoGrid'
import SkeletonCard from '@/components/ui/SkeletonCard'
import type { Course } from '@/types'

export const dynamic = 'force-dynamic'

async function getCourses(): Promise<Course[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Supabase error:', error.message)
    throw new Error('Failed to load courses')
  }

  return data ?? []
}

async function DashboardContent() {
  const courses = await getCourses()
  return <BentoGrid courses={courses} />
}

function DashboardSkeleton() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <SkeletonCard className="h-52" />
      </div>
      <div className="col-span-1">
        <SkeletonCard className="h-52" />
      </div>
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} className="h-44" />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}
