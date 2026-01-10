export type ProfileData = {
  profilePicture: string
  phoneNumber: string
  bio: string
}

const STORAGE_KEY = "profileData"

export function getProfileData(): ProfileData {
  if (typeof window === "undefined") {
    return {
      profilePicture: "",
      phoneNumber: "",
      bio: "",
    }
  }
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    return {
      profilePicture: data.profilePicture || "",
      phoneNumber: data.phoneNumber || "",
      bio: data.bio || "",
    }
  } catch {
    return {
      profilePicture: "",
      phoneNumber: "",
      bio: "",
    }
  }
}

export function saveProfileData(profile: ProfileData) {
  if (typeof window === "undefined") {
    return
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  window.dispatchEvent(new Event("profile-update"))
}
