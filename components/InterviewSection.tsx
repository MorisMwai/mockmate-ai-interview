// components/InterviewSection.tsx
'use client'

import { useEffect, useState } from "react"
import InterviewCard from "./InterviewCard"
import SkeletonInterviewCard from "./SkeletonInterviewCard"
import { dummyInterviews } from "@/constants"

const InterviewSection = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className='flex flex-col gap-6 mt-8'>
      <h2>{title}</h2>
      <div className='interviews-section'>
        {loading
          ? Array(3).fill(null).map((_, i) => (
              <SkeletonInterviewCard key={`${title}-skeleton-${i}`} />
            ))
          : dummyInterviews.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
        }
      </div>
    </section>
  )
}

export default InterviewSection