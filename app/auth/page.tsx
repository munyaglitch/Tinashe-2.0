"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { sendSignInEmail } from "@/lib/email-service"
import { getActiveSession, getSupabaseClient } from "@/lib/supabase-client"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetPassword, setResetPassword] = useState("")
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("")
  const [resetError, setResetError] = useState("")
  const [resetSuccess, setResetSuccess] = useState("")
  const router = useRouter()

  const updateStoredUser = (targetEmail: string, newPass: string) => {
    const usersData = localStorage.getItem("users")
    const users = usersData ? JSON.parse(usersData) : []
    const userIndex = users.findIndex((u: any) => u.email === targetEmail)

    if (userIndex === -1) {
      users.push({ email: targetEmail, password: newPass, name })
    } else {
      users[userIndex] = {
        ...users[userIndex],
        email: targetEmail,
        password: newPass,
      }
    }

    const savedIndex = userIndex === -1 ? users.length - 1 : userIndex
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("userEmail", targetEmail)
    localStorage.setItem("userName", users[savedIndex]?.name || name || "")
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: targetEmail,
        password: newPass,
        name: users[savedIndex]?.name || name || "",
      }),
    )
    setEmail(targetEmail)
    setPassword(newPass)
  }

  const handleResetPassword = () => {
    setResetError("")
    setResetSuccess("")
    const targetEmail = resetEmail.trim().toLowerCase()
    if (!targetEmail) {
      setResetError("Please enter the email you registered with")
      return
    }
    if (!resetPassword || !resetPasswordConfirm) {
      setResetError("Type the new password twice to confirm")
      return
    }
    if (resetPassword !== resetPasswordConfirm) {
      setResetError("Passwords do not match")
      return
    }
    updateStoredUser(targetEmail, resetPassword)
    setResetSuccess("Password updated! Sign in with your new password.")
    setResetPassword("")
    setResetPasswordConfirm("")
    setShowResetForm(false)
  }

  useEffect(() => {
    if (!resetEmail && email) {
      setResetEmail(email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])

  useEffect(() => {
    const syncSupabaseSession = async () => {
      try {
        const session = await getActiveSession()
        if (session?.user) {
          const sessionEmail = session.user.email || ""
          const sessionName =
            session.user.user_metadata?.full_name ||
            session.user.user_metadata?.name ||
            session.user.email?.split("@")[0] ||
            "Google User"

          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              email: sessionEmail,
              name: sessionName,
              provider: "google",
            }),
          )
          localStorage.setItem("isAuthenticated", "true")
          localStorage.setItem("userEmail", sessionEmail)
          localStorage.setItem("userName", sessionName)
          router.push("/list-car")
        }
      } catch (err) {
        console.error("Supabase session check failed", err)
      } finally {
        setIsCheckingSession(false)
      }
    }

    syncSupabaseSession()
  }, [router])

  const notifyAdminsOfRegistration = async (name: string, email: string) => {
    try {
      await fetch("/api/metrics/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      })
    } catch (error) {
      console.error("Failed to notify admins", error)
    }
  }

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
      if (typeof window !== "undefined" && (window as any).va) {
        ;(window as any).va("event", "user_registered", {
          name,
          email,
        })
      }
      notifyAdminsOfRegistration(name, email)
      router.push("/list-car")
    }
  }

  const handleGoogleSignIn = async () => {
    setError("")
    setIsGoogleLoading(true)

    try {
      const supabase = getSupabaseClient()
      const { error: supabaseError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (supabaseError) {
        setError("Google sign-in failed. Please try again.")
      }
    } catch (err) {
      const fallbackMessage =
        err instanceof Error && err.message.includes("Supabase")
          ? "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
          : err instanceof Error
            ? err.message
            : "Unable to start Google sign-in right now."
      setError(fallbackMessage)
    } finally {
      setIsGoogleLoading(false)
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

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">or</span>
                <div className="flex-1 border-t border-border" />
              </div>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="w-full h-12"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading || isCheckingSession}
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Redirecting to Google...
                  </>
                ) : (
                  <>
                    <GoogleIcon />
                    Continue with Google
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Supabase Google authentication opens a secure Google consent screen.
              </p>
            </div>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowResetForm(!showResetForm)
                  setResetError("")
                  setResetSuccess("")
                }}
                className="text-sm text-primary hover:underline"
              >
                {showResetForm ? "Hide password reset" : "Forgot your password?"}
              </button>
            </div>

            {showResetForm && (
              <div className="mt-6 space-y-4 rounded-2xl border border-border bg-background/70 p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-foreground">Reset your password</h3>
                <p className="text-sm text-muted-foreground">
                  Provide your email and retype the new password to confirm.
                </p>
                {resetError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                    {resetError}
                  </div>
                )}
                {resetSuccess && (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                    {resetSuccess}
                  </div>
                )}
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="reset-email">Email</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="you@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reset-password">New password</Label>
                    <Input
                      id="reset-password"
                      type="password"
                      placeholder="••••••••"
                      value={resetPassword}
                      onChange={(e) => setResetPassword(e.target.value)}
                      minLength={6}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reset-confirm-password">Confirm password</Label>
                    <Input
                      id="reset-confirm-password"
                      type="password"
                      placeholder="Retype new password"
                      value={resetPasswordConfirm}
                      onChange={(e) => setResetPasswordConfirm(e.target.value)}
                      minLength={6}
                      className="h-12"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Retype password to verify they match</p>
                  </div>
                  <Button
                    type="button"
                    onClick={handleResetPassword}
                    className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  >
                    Update password
                  </Button>
                </div>
              </div>
            )}

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

const GoogleIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    className="mr-2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.2045c0-.6399-.0573-1.2527-.1636-1.8391H9v3.4796h4.8441c-.2098 1.1292-.8465 2.0864-1.8037 2.729v2.2714h2.9155c1.7055-1.5696 2.6841-3.8818 2.6841-6.6419z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.4672-.8066 5.9568-2.1748l-2.9155-2.2714c-.8066.54-1.8365.8614-3.0413.8614-2.3409 0-4.3224-1.5801-5.0316-3.7086H.9575v2.3323C2.438 15.9834 5.4818 18 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.9684 10.7066c-.18-.54-.282-1.1167-.282-1.7066s.102-1.1666.282-1.7066V4.9611H.9575C.3477 6.166 0 7.5489 0 9c0 1.4512.3477 2.8342.9575 4.0389l3.0109-2.3323z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.5795c1.3213 0 2.5061.4548 3.4389 1.3477l2.5792-2.5791C13.4628.8924 11.4256 0 9 0 5.4818 0 2.438 2.0166.9575 4.9611l3.0109 2.3323C4.6776 5.1595 6.6591 3.5795 9 3.5795z"
      fill="#EA4335"
    />
  </svg>
)
