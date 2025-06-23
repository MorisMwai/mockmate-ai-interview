import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHero = () => {
  return (
    <section className="card-cta animate-fadeIn">
      <div className="flex flex-col gap-6 max-w-lg">
        <Skeleton className="h-10 w-3/4 rounded-md bg-white/20 backdrop-blur-md" />
        <Skeleton className="h-5 w-full rounded-md bg-light-400" />
        <Skeleton className="h-5 w-5/6 rounded-md bg-light-400" />
        <Skeleton className="h-10 w-1/2 rounded-full bg-light-400" />
      </div>

      <Skeleton className="rounded-full size-[400px] max-sm:hidden bg-light-400 backdrop-blur-md" />
    </section>
  );
};

export default SkeletonHero;