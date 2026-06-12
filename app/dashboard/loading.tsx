import SkeletonCard from '@/components/ui/SkeletonCard'

// Next.js uses this file as the loading UI for this route segment
export default function Loading() {
  return (
    <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
      <div className="col-span-1 md:col-span-2">
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
