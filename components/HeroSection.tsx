'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonHero from './SkeletonHero';

const HeroSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <SkeletonHero />;

  return (
    <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
        <h2>Sharpen Your Interview Skills with Smart, Real-Time Coaching</h2>
        <p className="text-lg">
          Simulate real interviews powered by AI, and receive instant, actionable feedback to boost your confidence and performance.
        </p>

        <Button asChild className="btn-primary max-sm:w-full">
          <Link href="/interview">Launch a Mock Interview</Link>
        </Button>
      </div>

      <Image
        src="/robot.png"
        alt="robot-dude"
        width={400}
        height={400}
        className="max-sm:hidden"
      />
    </section>
  );
};

export default HeroSection;