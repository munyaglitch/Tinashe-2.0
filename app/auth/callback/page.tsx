"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { getSupabaseClient } from "@/lib/supabase-client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState("Finishing sign-in...")
  const [error, setError] = useState("")

  useEffect(() => {
    const completeSignIn = async () => {
      try {
        const supabase = getSupabaseClient()

        // Handle PKCE code exchange if Supabase returns a code instead of an access token
        if (typeof window !== "undefined" && window.location.search.includes("code=")) {
          await supabase.auth.exchangeCodeForSession(window.location.href)
        }

        const { data, error: sessionError } = await supabase.auth.getSession()
        if (sessionError) throw sessionError

        const session = data.session
        if (!session?.user) {
          throw new Error("No active Supabase session found after Google sign-in.")
        }

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

        setStatus("Success! Redirecting to your dashboard...")
        router.replace("/list-car")
      } catch (err) {
        console.error("Supabase OAuth callback failed", err)
        setError(err instanceof Error ? err.message : "Could not complete Google sign-in.")
        setStatus("We hit a snag while finishing sign-in.")
      }
    }

    completeSignIn()
  }, [router])

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto rounded-2xl border border-border bg-card p-8 text-center shadow-xl">
          {!error ? (
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-primary" />
          ) : (
            <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              !
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">Google sign-in</h1>
          <p className="text-muted-foreground mb-6">{status}</p>
          {error && (
            <Button variant="outline" onClick={() => router.push("/auth")}>
              Try again
            </Button>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
