"use client";

import type { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const DEFAULT_CONVEX_URL = "http://localhost:8080";
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? DEFAULT_CONVEX_URL;

let cachedClient: ConvexReactClient | null = null;

function getConvexClient() {
  if (cachedClient) {
    return cachedClient;
  }
  cachedClient = new ConvexReactClient(convexUrl);
  return cachedClient;
}

export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProvider client={getConvexClient()}>{children}</ConvexProvider>;
}
