"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import Loader from "./ui/loader"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"

const UserDropdown = ({ name, image }: { name: string; image?: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      await fetch("/api/logout", { method: "POST" })
      toast.success("Signed out successfully!")
      router.push("/sign-in")
    } catch (error) {
      toast.error("Failed to sign out. Please try again.")
      console.error("Logout error:", error)
    } finally {
        setLoading(false)
    }
  }

  if(!name) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <span className="hidden sm:inline font-semibold">
          <Skeleton className="h-4 w-24" />
        </span>
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border px-3 py-1 bg-gradient-to-r from-[#7F7CFF] via-[#CAC5FE] to-[#4F557D] text-white shadow-md hover:brightness-110 transition">
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name?.[0]}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline font-semibold">{name}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-50 w-48 rounded-xl border bg-white/10 dark:bg-dark-100/50 backdrop-blur-lg p-2 shadow-2xl transition-all duration-300"
        asChild
      >
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer rounded px-3 py-2 text-sm text-white bg-white/10 hover:bg-white/40 hover:backdrop-blur-sm hover:ring-1 hover:ring-white/30 transition-all"
            >
                {loading ? <Loader /> : "Sign Out"}
            </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdown