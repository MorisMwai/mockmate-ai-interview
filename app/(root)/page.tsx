"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { dummyInterviews } from '@/constants'
import InterviewCard from '@/components/InterviewCard'
import SkeletonInterviewCard from '@/components/SkeletonInterviewCard'

const Page = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1200) 
        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            <section className='card-cta'>
                <div className='flex flex-col gap-6 max-w-lg'>
                    <h2>Sharpen Your Interview Skills with Smart, Real-Time Coaching</h2>
                    <p className='text-lg'>
                        Simulate real interviews powered by AI, and receive instant, actionable feedback to boost your confidence and performance.
                    </p>

                    <Button asChild className='btn-primary max-sm:w-full'>
                        <Link href='/interview'>
                            Launch a Mock Interview
                        </Link>
                    </Button>
                </div>

                <Image src='/robot.png' alt='robot-dude' width={400} height={400} className='max-sm:hidden'></Image>
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Your Interview Journey</h2>

                <div className='interviews-section'>
                    {loading
                        ? Array(3).fill(null).map((_, i) => <SkeletonInterviewCard key={`skeleton-available-${i}`} />)
                        : dummyInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    }

                    {/* <p>You haven&apos;t started your interview journey yet. When you do, your practice sessions will appear here.</p> */}

                </div>
            </section>

            <section className='flex flex-col gap-6 mt-8'>
                <h2>Available Mock Interviews</h2>

                <div className='interviews-section'>
                    {loading
                        ? Array(3).fill(null).map((_, i) => <SkeletonInterviewCard key={`skeleton-journey-${i}`} />)
                        : dummyInterviews.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    }
                    {/* <p>No mock interviews are currently available. Stay tuned-new scenarios are added regularly.</p> */}

                </div>
            </section>
        </>
    )
}
export default Page
