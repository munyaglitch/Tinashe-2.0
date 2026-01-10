"use client"

import { Car, Plus, MessageSquare, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      setIsAuthenticated(isAuth)
    }
    checkAuth()
  }, [pathname])

  const handleNavigation = (path: string) => {
    if ((path === "/list-car" || path === "/profile" || path === "/messages") && !isAuthenticated) {
      router.push("/auth")
    } else {
      router.push(path)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a4d4d] border-t border-[#2a6d6d] shadow-2xl md:hidden">
      <div className="grid grid-cols-4 h-16">
        <button
          onClick={() => handleNavigation("/")}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            pathname === "/" ? "text-white bg-[#2a6d6d]" : "text-white/70 hover:text-white hover:bg-[#2a6d6d]/50"
          }`}
        >
          <Car className="h-6 w-6" />
          <span className="text-xs font-medium">Buy a Car</span>
        </button>

        <button
          onClick={() => handleNavigation("/list-car")}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            pathname === "/list-car"
              ? "text-white bg-[#2a6d6d]"
              : "text-white/70 hover:text-white hover:bg-[#2a6d6d]/50"
          }`}
        >
          <Plus className="h-6 w-6" />
          <span className="text-xs font-medium">List a Car</span>
        </button>

        <button
          onClick={() => handleNavigation("/messages")}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            pathname === "/messages"
              ? "text-white bg-[#2a6d6d]"
              : "text-white/70 hover:text-white hover:bg-[#2a6d6d]/50"
          }`}
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-xs font-medium">Messages</span>
        </button>

        <button
          onClick={() => handleNavigation("/profile")}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${
            pathname === "/profile" ? "text-white bg-[#2a6d6d]" : "text-white/70 hover:text-white hover:bg-[#2a6d6d]/50"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs font-medium">My Profile</span>
        </button>
      </div>
    </div>
  )
}
