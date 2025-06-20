import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHero = () => {
  return (
    <section className="card-cta animate-fadeIn">
      <div className="flex flex-col gap-6 max-w-lg">
        <Skeleton className="h-10 w-3/4 rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-5/6 rounded-md" />
        <Skeleton className="h-10 w-1/2 rounded-full" />
      </div>

      <Skeleton className="rounded-full size-[400px] max-sm:hidden" />
    </section>
  );
};

export default SkeletonHero;