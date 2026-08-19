export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl shadow-sm border border-line p-5">
          <div className="w-11 h-11 rounded-xl bg-line/70 animate-pulse mb-4" />
          <div className="h-3 w-24 bg-line/70 rounded animate-pulse mb-2" />
          <div className="h-7 w-16 bg-line/70 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonList({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-line">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-line/70 animate-pulse shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 bg-line/70 rounded animate-pulse" />
            <div className="h-3 w-1/4 bg-line/70 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}