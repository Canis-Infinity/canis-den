import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-svh bg-muted/30 px-4 py-6 sm:px-6">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-12 rounded-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
        </div>

        <Card className="py-0">
          <CardContent className="flex flex-col items-center px-6 py-7">
            <Skeleton className="size-24 rounded-full" />
            <Skeleton className="mt-4 h-7 w-20" />
            <Skeleton className="mt-2 h-4 w-16" />
            <Skeleton className="mt-5 h-4 w-64 max-w-full" />
            <Skeleton className="mt-8 h-8 w-full rounded-lg" />
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[61px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    </main>
  )
}
