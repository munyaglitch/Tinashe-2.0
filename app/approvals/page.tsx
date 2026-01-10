"use client";

import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";
import { getPendingListings, Listing, addApprovedListing, removePendingListing } from "@/lib/listings";

const approvedApprovers = new Set([
  "tinashechikwaiti@gmail.com",
  "mlscalez.z@gmail.com",
  "jacobis4realdumb@gmail.com",
]);

export default function ApprovalsPage() {
  const [pending, setPending] = useState<Listing[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const isApprover = useMemo(() => approvedApprovers.has(userEmail.toLowerCase()), [userEmail]);

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    setUserEmail(email);
    setPending(getPendingListings());
  }, []);

  const handleApprove = (listing: Listing) => {
    addApprovedListing(listing);
    removePendingListing(listing.id);
    setPending((prev) => prev.filter((item) => item.id !== listing.id));
  };

  if (!isApprover) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/30">
            <p className="text-center text-lg text-muted-foreground">
              This page is only available to approvers. Sign in with one of the designated emails to access the approval tools.
            </p>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <main className="container mx-auto px-4 py-12 space-y-8">
        <div className="rounded-2xl border border-border bg-card shadow-2xl shadow-black/30 p-6">
          <h1 className="text-3xl font-bold mb-2">Approval Panel</h1>
          <p className="text-muted-foreground">
            {pending.length === 0 ? "Nothing pending – looks like everything is published." : "Review listings, then hit approve to publish directly."}
          </p>
        </div>

        <div className="space-y-6">
          {pending.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg text-center text-muted-foreground">
              No pending listings. Sit back and wait for submissions.
            </div>
          )}

          {pending.map((listing) => (
            <div key={listing.id} className="rounded-[32px] border border-border bg-card shadow-lg shadow-black/40 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Listing ID</p>
                  <p className="font-mono text-sm">{listing.id}</p>
                </div>
                <div className="flex gap-1 items-center text-xs text-muted-foreground">
                  <span>{listing.userName}</span>
                  <span className="text-primary">•</span>
                  <span>{listing.userEmail}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(listing.date).toLocaleString()}
                </div>
              </div>

              <p className="text-lg font-bold text-foreground">${listing.price}</p>
              <p className="text-sm text-muted-foreground">{listing.details}</p>

              <div className="grid grid-cols-2 gap-2">
                {listing.images.slice(0, 3).map((img, index) => (
                  <div key={index} className="aspect-square rounded-2xl overflow-hidden border border-border bg-muted">
                    <img src={img} alt={`Approval ${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <Button
                onClick={() => handleApprove(listing)}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                Approve & Publish
              </Button>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
