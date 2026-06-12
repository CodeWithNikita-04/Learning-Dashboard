import { Suspense } from 'react'
import { createClient } from '@/lib/supabase'
import BentoGrid from '@/components/dashboard/BentoGrid'
import SkeletonCard from '@/components/ui/SkeletonCard'
import type { Course } from '@/types'

// Fetch courses server-side. No client-side fetching needed.
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

// This inner component does the actual async fetching
// so Suspense can show the skeleton while it's loading
async function DashboardContent() {
  const courses = await getCourses()
  return <BentoGrid courses={courses} />
}

// Skeleton fallback shown while Suspense waits for DashboardContent
function DashboardSkeleton() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
      {/* Hero skeleton */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <SkeletonCard className="h-52" />
      </div>
      {/* Activity skeleton */}
      <div className="col-span-1">
        <SkeletonCard className="h-52" />
      </div>
      {/* Course skeletons */}
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
