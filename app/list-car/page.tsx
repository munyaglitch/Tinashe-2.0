"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X } from "lucide-react"
import { addPendingListing, activateApprovalNotification } from "@/lib/listings"

export default function ListCarPage() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [price, setPrice] = useState("")
  const [details, setDetails] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")

    if (auth !== "true") {
      router.push("/auth")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          newImages.push(reader.result as string)
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (images.length === 0) {
      alert("Please add at least one photo of your vehicle")
      return
    }

    if (!price || !details) {
      alert("Please fill in all fields")
      return
    }

    const userEmail = localStorage.getItem("userEmail") || "unknown@email.com"
    const userName = localStorage.getItem("userName") || "Unknown User"

    const newListing = {
      id: `listing-${Date.now()}`,
      images,
      price,
      details,
      date: new Date().toISOString(),
      userEmail,
      userName,
    }

    addPendingListing(newListing)
    activateApprovalNotification(newListing)

    alert(
      `Listing sent to the approval desk.\n\nAn admin will review and publish once approved.\n\nListing ID: ${newListing.id}`,
    )

    setImages([])
    setPrice("")
    setDetails("")
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 border border-border">
            <h1 className="text-3xl font-bold mb-2">List Your Car</h1>
            <p className="text-muted-foreground mb-6">
              Fill in the details below to list your vehicle for free. Your listing will be published immediately.
            </p>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label>Upload Photos</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Car ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Add Photos</span>
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="$25,000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Vehicle Details</Label>
                <Textarea
                  id="details"
                  placeholder="Include model, year, mileage, condition, features, etc."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                disabled={images.length === 0}
              >
                Publish Listing
              </Button>
            </form>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
