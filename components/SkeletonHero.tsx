import { Skeleton } from "@/components/ui/skeleton";

const SkeletonHero = () => {
  return (
    <section className="flex flex-row items-center justify-between px-16 py-6 rounded-3xl bg-gradient-to-b from-[#171532] to-[#08090D] max-sm:flex-col max-sm:px-4 gap-8 animate-fadeIn">
      <div className="flex flex-col gap-6 max-w-lg w-full">
        <Skeleton className="h-10 w-3/4 rounded-md bg-white/10 backdrop-blur-md" />
        <Skeleton className="h-5 w-full rounded-md bg-white/10 backdrop-blur-sm" />
        <Skeleton className="h-5 w-5/6 rounded-md bg-white/10 backdrop-blur-sm" />
        <Skeleton className="h-10 w-1/2 rounded-full bg-white/10 backdrop-blur-sm" />
      </div>

      <Skeleton className="rounded-full size-[300px] max-sm:hidden bg-light-400 backdrop-blur-sm" />
    </section>
  );
};

export default SkeletonHero;