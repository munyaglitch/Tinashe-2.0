export type Listing = {
  id: string
  images: string[]
  price: string
  details: string
  date: string
  userEmail: string
  userName: string
}

const PENDING_KEY = "pendingListings"
const APPROVED_KEY = "approvedListings"
export const PENDING_LISTINGS_EVENT = "pending-listings-update"

function readStorage(key: string): Listing[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(key) || "[]")
  } catch {
    return []
  }
}

function writeStorage(key: string, value: Listing[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
  if (key === APPROVED_KEY) {
    window.dispatchEvent(new Event("approved-listings-update"))
  }
  if (key === PENDING_KEY) {
    window.dispatchEvent(new Event(PENDING_LISTINGS_EVENT))
  }
}

export function addPendingListing(listing: Listing) {
  const pending = readStorage(PENDING_KEY)
  writeStorage(PENDING_KEY, [...pending, listing])
}

export async function activateApprovalNotification(listing: Listing) {
  if (typeof window === "undefined") return
  try {
    await fetch("/api/approvals/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing }),
    })
  } catch (error) {
    console.error("[listing] Failed to notify approver", error)
  }
}

export function getPendingListings() {
  return readStorage(PENDING_KEY)
}

export function removePendingListing(id: string) {
  const pending = readStorage(PENDING_KEY).filter((listing) => listing.id !== id)
  writeStorage(PENDING_KEY, pending)
}

export function addApprovedListing(listing: Listing) {
  const approved = readStorage(APPROVED_KEY)
  writeStorage(APPROVED_KEY, [...approved, listing])
}

export function getApprovedListings() {
  return readStorage(APPROVED_KEY)
}
