'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { vapi } from '@/lib/vapi.sdk';
import { generator, interviewer } from "@/constants";

// const generatorId = process.env.NEXT_PUBLIC_VAPI_GENERATOR_ID!;
// const interviewer = process.env.NEXT_PUBLIC_VAPI_INTERVIEWER_ID!;

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    ENDED = 'ENDED',
}

interface SavedMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE); 
    const[messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.ENDED);

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = {
                    role: message.role,
                    content: message.transcript,
                }

                setMessages((prev) => [...prev, newMessage]);
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error:', error);

        vapi.on('callStart', onCallStart);
        vapi.on('callEnd', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('speechStart', onSpeechStart);  
        vapi.on('speechEnd', onSpeechEnd);
        vapi.on('error', onError);

        return () => {
            vapi.off('callStart', onCallStart);
            vapi.off('callEnd', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('speechStart', onSpeechStart);
            vapi.off('speechEnd', onSpeechEnd);
            vapi.off('error', onError);
        }

    }, [])

    useEffect(() => {
        if (callStatus === CallStatus.ENDED) router.push('/');
    }, [messages, callStatus, type, userId])

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);

        if (type === "generate") {
            console.log("Calling workflow:", generator);
            await vapi.start(
                undefined,
                {
                    variableValues: {
                        username: userName,
                        userid: userId,
                    },
                    clientMessages: ["transcript"],
                    serverMessages: [],
                },
            );               
        } else {
            let formattedQuestions = "";
            if (questions) {
                formattedQuestions = questions
                .map((question) => `- ${question}`)
                .join("\n");
            }

            await vapi.start({
                assistant: interviewer,
                variableValues: {
                    questions: formattedQuestions,
                },
                clientMessages: ["transcript"],
                serverMessages: [],
            });
        }
    };

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.ENDED);
        vapi.stop();
    }

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ENDED;
    
    return (
        <>    
            <div className='call-view'>
                <div className='card-interviewer'>
                    <div className='avatar'>
                        <Image src='/ai-avatar.png' alt='vapi' width={65} height={54} className='object-cover' />
                        {isSpeaking && <span className='animate-speak' />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                <div className='card-border'>
                    <div className='card-content'>
                        <Image src='/user-avatar.png' alt='user avatar' width={540} height={540} className='rounded-full object-cover size-[120px]' />
                        <h3>{userName}</h3>
                    </div>
                </div>
            </div>

            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={latestMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center'>
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className='relative btn-call' onClick={handleCall}>
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus !== CallStatus.CONNECTING && 'hidden')}/>
                                <span>
                                    {isCallInactiveOrFinished ? 'Start Interview' : '...'}
                                </span>
                    </button>
                ) : (
                    <button className='btn-disconnect' onClick={handleDisconnect}>End Interview</button>
                )}
            </div>
        </>
    )
}

export default Agent