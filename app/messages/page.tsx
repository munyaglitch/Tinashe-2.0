"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { MessageSquare } from "lucide-react"

export default function MessagesPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      if (!isAuth) {
        router.push("/auth")
        return
      }
      setIsAuthenticated(isAuth)
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Messages
        </h1>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageSquare className="h-20 w-20 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Messages Yet</h2>
          <p className="text-muted-foreground max-w-md">
            When buyers contact you about your listings, their messages will appear here.
          </p>
        </div>
      </div>

      <BottomNav />
    </main>
  )
}
