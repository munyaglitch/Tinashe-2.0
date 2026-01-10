"use client";

import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";

const planOptions = [
  { value: "free", label: "Free" },
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
];

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [plan, setPlan] = useState(planOptions[0].value);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const createUser = useMutation(api.functions.users.createUser);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setStatus("pending");

    try {
      const user = await createUser({
        email,
        name: name || undefined,
        plan,
      });
      setMessage(
        `Created ${user?.email ?? "a user"} (${user?.plan ?? "plan"}) · ID ${
          user?._id ?? "unknown"
        }`,
      );
      setStatus("success");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to create user.");
      setStatus("error");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-slate-950 px-4 py-10 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <header className="mb-8 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Convex playground</p>
          <h1 className="text-3xl font-semibold text-white">Sign up flow</h1>
          <p className="text-slate-400">Create a user record and test the backend functions.</p>
        </header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <input
              autoComplete="email"
              className="rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Full name
            <input
              autoComplete="name"
              className="rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-base text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Initial plan
            <select
              className="rounded-xl border border-white/20 bg-slate-900/60 px-4 py-3 text-base text-white focus:border-sky-400 focus:outline-none"
              value={plan}
              onChange={(event) => setPlan(event.target.value)}
            >
              {planOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="w-full rounded-2xl bg-sky-500 px-4 py-3 text-base font-semibold text-white transition hover:bg-sky-400 disabled:pointer-events-none disabled:opacity-60"
            type="submit"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Creating..." : "Create user"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
              status === "success"
                ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-200"
                : status === "error"
                  ? "border-rose-400/60 bg-rose-500/10 text-rose-100"
                  : "border-white/20 bg-white/5 text-white"
            }`}
          >
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
