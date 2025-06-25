import React from 'react'
import Image from 'next/image'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    ENDED = 'ENDED',
}

const Agent = ({ userName }: AgentProps) => {
    const callStatus = CallStatus.ACTIVE; // This would typically come from props or state
    const isSpeaking = true;
    return (
        <>    
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image src='/ai-avatar.png' alt='vapi' width={65} height={54} className='object-cover' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interviewew</h3>
                </div>

                <div className='card-border'>
                    <div className='card-content'>
                        <Image src='/user-avatar.png' alt='user avatar' width={540} height={540} className='rounded-full object-cover size-[120px]' />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center'>
                {callStatus !== 'ACTIVE' ? (
                    <button className='btn btn-primary'>
                        <span>
                            {callStatus === 'INACTIVE' || callStatus === 'ENDED'
                                ? 'Start Interview'
                                : '...'}
                        </span>
                    </button>
                ) : (
                    <button className='btn-disconnect'>End Interview</button>
                )}
            </div>
        </>
    )
}

export default Agent