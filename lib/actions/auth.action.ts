'use server';

import { auth, db } from "@/firebase/admin";
import { error } from "console";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7 * 1000; // 7 days in milliseconds

export async function signUp(params: SignUpParams) {
    const { uid, email, name } = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({
            email,
            name,
            // createdAt: new Date().toISOString()
        });

        return {
            success: true,
            message: 'Account created successfully. Please sign in.'
        }
    } catch (e: unknown) {
        console.error('Error signing up:', e);
        throw new Error('Sign up failed');

        if(error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use'
            }
            throw new Error('Email already in use');
        }

        return {
            success: false,
            message: 'Failed to create an account'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK,
    })

    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: 'User not found. Please create an account instead.'
            }
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Signed in successfully'
        }
    } catch (e: unknown) {
        console.error('Error signing in:', e);
        throw new Error('Sign in failed');

        return{
            success: false,
            message: 'Failed to log into your account'
        }
    }
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) return null;


    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.
            collection('users').
            doc(decodedClaims.uid).
            get();

        if (!userRecord.exists) return null;

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;

    } catch (e: unknown) {
        console.error('Error getting current user:', e);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();

    return !!user;
}