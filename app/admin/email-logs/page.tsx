"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { getEmailLogs } from "@/lib/email-service"
import { Mail, Calendar, User, Check } from "lucide-react"

export default function EmailLogsPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    setLogs(getEmailLogs())
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 pb-20 md:pb-0">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-red-500 mb-8">Email Activity Log</h1>

        <div className="bg-slate-800 rounded-2xl p-6 border border-red-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Mail className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold text-white">All Email Notifications</h2>
          </div>

          {logs.length === 0 ? (
            <p className="text-slate-400 text-center py-12">No emails sent yet</p>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-red-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="text-white font-semibold">{log.recipient}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            log.type === "signin" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {log.type === "signin" ? "Sign In" : "Subscription"}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(log.timestamp).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">{log.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-500">{log.id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
