import { Skeleton } from "@/components/ui/skeleton"

const SkeletonInterviewCard = () => {
  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview flex flex-col justify-between">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
            <Skeleton className="h-4 w-12" />
          </div>

          <Skeleton className="rounded-full size-[90px]" />

          <Skeleton className="h-6 w-3/4 mt-5" />

          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>

          <Skeleton className="h-4 mt-5 w-full" />
          <Skeleton className="h-4 mt-1 w-5/6" />
        </div>

        <div className="flex flex-row justify-between items-center mt-4">
          <div className="flex flex-row gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
          </div>
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonInterviewCard