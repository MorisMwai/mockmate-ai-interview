"use client"

import { auth } from "@/firebase/client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation"
import { toast } from "sonner";

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);

            // call API to clear the session cookie
            await fetch('/api/logout', { method: 'POST' });

            toast.success("Signed out successfully!");
            router.push('/sign-in');
        } catch (error) {
            toast.error("Failed to sign out. Please try again.");
            console.error("Logout error:", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
            Logout
        </button>
    );
}

export default LogoutButton;