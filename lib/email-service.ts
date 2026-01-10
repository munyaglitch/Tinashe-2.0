// Email service for sending notifications
export interface EmailData {
  name: string
  email: string
  amount?: string
  expiryDate?: string
}

export async function sendSignInEmail(userData: EmailData) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "signin",
        userData,
      }),
    })

    const result = await response.json()

    // Store email log in localStorage for tracking
    if (result.success) {
      const logs = JSON.parse(localStorage.getItem("emailLogs") || "[]")
      logs.push(result.log)
      localStorage.setItem("emailLogs", JSON.stringify(logs))
    }

    return result
  } catch (error) {
    console.error("[v0] Failed to send sign-in email:", error)
    return { success: false, error }
  }
}

export async function sendSubscriptionEmail(userData: EmailData) {
  try {
    console.log("[v0] Sending subscription email with data:", userData)

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "subscribe",
        userData,
      }),
    })

    const result = await response.json()

    if (result.success) {
      const logs = JSON.parse(localStorage.getItem("emailLogs") || "[]")
      logs.push(result.log)
      localStorage.setItem("emailLogs", JSON.stringify(logs))
      console.log("[v0] Subscription email logged successfully")
    }

    return result
  } catch (error) {
    console.error("[v0] Failed to send subscription email:", error)
    return { success: false, error }
  }
}

export function getEmailLogs() {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem("emailLogs") || "[]")
}
