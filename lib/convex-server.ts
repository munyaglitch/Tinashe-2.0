import { ConvexHttpClient } from "convex/browser";

const convexUrl =
  process.env.CONVEX_URL ?? process.env.NEXT_PUBLIC_CONVEX_URL ?? "";

if (!convexUrl) {
  throw new Error(
    "Convex URL is not configured. Set CONVEX_URL or NEXT_PUBLIC_CONVEX_URL.",
  );
}

let cachedClient: ConvexHttpClient | null = null;

export function getConvexServerClient() {
  if (cachedClient) {
    return cachedClient;
  }
  cachedClient = new ConvexHttpClient(convexUrl);
  const adminKey = process.env.CONVEX_ADMIN_KEY;
  if (adminKey) {
    cachedClient.setAdminAuth(adminKey);
  }
  return cachedClient;
}
