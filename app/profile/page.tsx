"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { User, Mail, Lock, Edit, LogOut } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [bio, setBio] = useState("")
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [profileMessage, setProfileMessage] = useState("")

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      if (!isAuth) {
        router.push("/auth")
        return
      }
      setIsAuthenticated(isAuth)
      setUserName(localStorage.getItem("userName") || "")
      setUserEmail(localStorage.getItem("userEmail") || "")
      const storedProfile = JSON.parse(
        localStorage.getItem("profileData") || "{}",
      )
      setProfilePicture(storedProfile.profilePicture || "")
      setPhoneNumber(storedProfile.phoneNumber || "")
      setBio(storedProfile.bio || "")
    }
    checkAuth()
  }, [router])

  const handleResetPassword = () => {
    if (!resetEmail || !newPassword) {
      setMessage("Please enter email and new password")
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === resetEmail)

    if (userIndex === -1) {
      setMessage("Email not found")
      return
    }

    if (resetEmail !== userEmail) {
      setMessage("Email does not match your account")
      return
    }

    // Update password
    users[userIndex].password = newPassword
    localStorage.setItem("users", JSON.stringify(users))

    setMessage("Password reset successfully!")
    setShowResetPassword(false)
    setResetEmail("")
    setNewPassword("")

    setTimeout(() => setMessage(""), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const maskPassword = (length = 8) => {
    return "•".repeat(length)
  }

  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setProfilePicture(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const saveProfile = () => {
    localStorage.setItem(
      "profileData",
      JSON.stringify({ profilePicture, phoneNumber, bio }),
    )
    setProfileMessage("Profile saved successfully!")
    setTimeout(() => setProfileMessage(""), 3000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          My Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl mb-6">
            <div className="flex flex-col items-center mb-6">
              {profilePicture ? (
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border border-white/30">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
              )}
              <h2 className="text-2xl font-bold">{userName}</h2>
            </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-semibold">{userName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold break-all">{userEmail}</p>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Password</p>
                <p className="font-semibold text-xl tracking-wider">{maskPassword()}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowResetPassword(!showResetPassword)}
                className="border-primary/30 hover:bg-primary/10"
              >
                <Edit className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Phone</span>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Contact number</p>
                <p className="font-semibold">{phoneNumber || "Not provided"}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Bio</span>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Personal bio</p>
                <p className="font-semibold">
                  {bio || "Add a short bio to show in your profile"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reset Password Section */}
        {showResetPassword && (
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl mb-6 animate-in slide-in-from-top duration-300">
            <h3 className="text-xl font-bold mb-4">Reset Password</h3>

            {message && (
              <div
                className={`p-3 rounded-lg mb-4 ${
                  message.includes("successfully")
                    ? "bg-green-500/10 text-green-500 border border-green-500/30"
                    : "bg-destructive/10 text-destructive border border-destructive/30"
                }`}
              >
                {message}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleResetPassword} className="flex-1 bg-gradient-to-r from-primary to-accent">
                  Reset Password
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResetPassword(false)
                    setMessage("")
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile */}
        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-2xl mb-6 space-y-4">
          <h3 className="text-xl font-bold">Update profile</h3>
          <p className="text-sm text-muted-foreground">
            Keep your profile picture, phone number, and bio up to date.
          </p>

          <label className="block text-sm font-medium">
            Profile picture
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground outline-none"
            />
          </label>
          <label className="block text-sm font-medium">
            Phone number
            <input
              type="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="+263 773 123 456"
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label className="block text-sm font-medium">
            Bio
            <textarea
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell us about your business or what you’re selling."
              rows={3}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </label>

          {profileMessage && (
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
              {profileMessage}
            </div>
          )}

          <Button
            onClick={saveProfile}
            className="w-full bg-gradient-to-r from-primary to-accent"
          >
            Save profile
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </Button>
      </div>

      <BottomNav />
    </main>
  )
}
