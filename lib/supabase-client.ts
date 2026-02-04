import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let browserClient: SupabaseClient | null = null

export const getSupabaseClient = () => {
  if (browserClient) return browserClient

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or anon key is missing.")
  }

  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  })

  return browserClient
}

export const getActiveSession = async () => {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
