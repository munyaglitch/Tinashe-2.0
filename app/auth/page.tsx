"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { sendSignInEmail } from "@/lib/email-service"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const usersData = localStorage.getItem("users")
    const users = usersData ? JSON.parse(usersData) : []

    if (isLogin) {
      const user = users.find((u: any) => u.email === email)

      if (!user) {
        setError("Incorrect email")
        return
      }

      if (user.password !== password) {
        setError("Incorrect password")
        return
      }

      localStorage.setItem("currentUser", JSON.stringify(user))
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userName", user.name)

      await sendSignInEmail({ name: user.name, email: user.email })

      router.push("/list-car")
    } else {
      const existingUser = users.find((u: any) => u.email === email)
      if (existingUser) {
        setError("Email already registered. Please sign in.")
        return
      }

      const newUser = { email, password, name }
      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      localStorage.setItem("currentUser", JSON.stringify(newUser))
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", name)
      router.push("/list-car")
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <h1 className="text-3xl font-bold text-center mb-2">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-muted-foreground text-center mb-8">
              {isLogin ? "Sign in to list your car" : "Sign up to start selling"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent">
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
