import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();

    try {
        cookieStore.set({
            name: 'session',
            value: '',
            maxAge: -1, // Set maxAge to 0 to delete the cookie
            path: '/',
        });

        return NextResponse.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json({ success: false, message: 'Failed to log out' }, { status: 500 });
    }
}