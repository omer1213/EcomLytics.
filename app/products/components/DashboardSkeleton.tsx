import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-card">
          <Skeleton className="h-10 w-full max-w-xl" />
          <Skeleton className="h-10 w-32" />
        </header>
        <main className="flex-1 flex overflow-hidden">
          <section className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full" />
              ))}
            </div>
          </section>
          <aside className="w-64 bg-card p-4 overflow-y-auto">
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full mt-4" />
          </aside>
        </main>
      </div>
    </div>
  )
}

