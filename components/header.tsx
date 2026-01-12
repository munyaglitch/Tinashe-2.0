"use client"

import { Phone, Menu, X, User, LogOut, Car, PlusCircle, MessageCircle, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { getProfileData } from "@/lib/profile"

const APPROVER_EMAILS = ["tinashechikwaiti@gmail.com", "mlscalez.z@gmail.com", "jacobis4realdumb@gmail.com"]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState("")
  const [profilePicture, setProfilePicture] = useState("")
  const [isApprover, setIsApprover] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true"
      const name = localStorage.getItem("userName") || localStorage.getItem("userEmail") || ""
      setIsAuthenticated(isAuth)
      setUserName(name)
    }
    checkAuth()
  }, [pathname])

  useEffect(() => {
    const email = (localStorage.getItem("userEmail") || "").toLowerCase()
    setIsApprover(APPROVER_EMAILS.includes(email))
  }, [pathname])

  useEffect(() => {
    const applyProfile = () => {
      const profile = getProfileData()
      setProfilePicture(profile.profilePicture)
    }
    if (typeof window !== "undefined") {
      applyProfile()
      const handler = () => applyProfile()
      window.addEventListener("profile-update", handler)
      return () => window.removeEventListener("profile-update", handler)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    setIsAuthenticated(false)
    setUserName("")
    setShowProfileMenu(false)
    router.push("/")
  }

  const handleListCarClick = () => {
    if (!isAuthenticated) {
      router.push("/auth")
      return
    }
    router.push("/list-car")
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  const navItems = [
    { icon: Car, label: "Explore Cars", path: "/" },
    { icon: PlusCircle, label: "List Car", path: "/list-car", onClick: handleListCarClick },
    { icon: MessageCircle, label: "Messages", path: "/messages" },
    { icon: User, label: "Profile", path: "/profile" },
  ]
  if (isApprover) {
    navItems.push({
      icon: CheckSquare,
      label: "Approval Panel",
      path: "/approvals",
    })
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ${
        scrolled
          ? "bg-card/98 backdrop-blur-xl shadow-2xl shadow-primary/20"
          : "bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <div
          className="relative h-28 w-80 md:h-32 md:w-96 transition duration-300 hover:scale-105 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/image-2026-01-09-160142243-removebg-preview.png"
            alt="Tinashe Car Sales - Drive Your Dream Today"
            fill
            className="object-contain"
            style={{ filter: "brightness(1.1) contrast(1.1)" }}
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick()
                  } else {
                    router.push(item.path)
                  }
                }}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-white/20 text-white" : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-xs font-medium hidden sm:block">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="tel:+263783935399"
            className="hidden lg:flex items-center gap-2 text-sm text-foreground hover:text-primary transition-all duration-300 group"
          >
            <div className="relative">
              <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-semibold">+263 78 393 5399</span>
          </a>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 border border-primary/30"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                  {profilePicture ? (
                    <img
                      src={profilePicture || "/placeholder.svg"}
                      alt="Profile picture"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="hidden md:inline font-semibold text-sm max-w-[120px] truncate">{userName}</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-2xl animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-border">
                    <p className="font-semibold truncate">{userName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{localStorage.getItem("userEmail")}</p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false)
                        handleListCarClick()
                      }}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-primary/10 transition-colors flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      My Listings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-2 mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => router.push("/auth")}
              size="sm"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 text-xs md:text-sm px-3 md:px-4"
            >
              <User className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/98 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <nav className="container px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    handleNavClick()
                    if (item.onClick) {
                      item.onClick()
                    } else {
                      router.push(item.path)
                    }
                  }}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-primary/20 text-white" : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-6 w-6 flex-shrink-0" />
                  <span className="text-base font-semibold">{item.label}</span>
                </button>
              )
            })}
            <a
              href="tel:+263783935399"
              className="flex items-center gap-4 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg"
            >
              <Phone className="h-6 w-6 flex-shrink-0" />
              <span className="text-base font-semibold">+263 78 393 5399</span>
            </a>
            {isAuthenticated ? (
              <>
                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-3 px-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden flex-shrink-0">
                      {profilePicture ? (
                        <img
                          src={profilePicture || "/placeholder.svg"}
                          alt="Profile picture"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate text-white">{userName}</p>
                      <p className="text-xs text-white/70 truncate">{localStorage.getItem("userEmail")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleNavClick()
                      handleListCarClick()
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors flex items-center gap-4 text-white/90 hover:text-white"
                  >
                    <User className="h-6 w-6 flex-shrink-0" />
                    <span className="text-base font-semibold">My Listings</span>
                  </button>
                  <button
                    onClick={() => {
                      handleNavClick()
                      handleLogout()
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-colors flex items-center gap-4 mt-1"
                  >
                    <LogOut className="h-6 w-6 flex-shrink-0" />
                    <span className="text-base font-semibold">Log Out</span>
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => {
                  handleNavClick()
                  router.push("/auth")
                }}
                className="flex items-center gap-4 px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 rounded-lg border-t border-border mt-2 pt-4"
              >
                <User className="h-6 w-6 flex-shrink-0" />
                <span className="text-base font-semibold">Sign In</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
