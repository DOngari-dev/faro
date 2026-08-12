"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Bell, ShieldAlert, Sparkles, User, Check, Sliders } from "lucide-react"

export function SettingsView() {
  const [churnThreshold, setChurnThreshold] = useState(60)
  const [realtimeAlerts, setRealtimeAlerts] = useState(true)
  const [emailDigest, setEmailDigest] = useState(true)
  const [autoScriptGen, setAutoScriptGen] = useState(true)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="size-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Copilot Settings</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure AI risk sensitivity thresholds, alert rules, and relationship manager preferences.
          </p>
        </div>

        <Button onClick={handleSave} className="gap-1.5 font-medium">
          {saved ? (
            <>
              <Check className="size-4" /> Saved!
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {/* Profile Card */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <User className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">RM Profile & Assignment</h2>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs text-muted-foreground">RM Name</label>
              <p className="mt-0.5 text-sm font-medium text-foreground">Darshan</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Department & Branch</label>
              <p className="mt-0.5 text-sm font-medium text-foreground">SME Loans · Pune West</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Assigned Portfolio Size</label>
              <p className="mt-0.5 font-mono text-sm font-medium text-foreground">214 accounts</p>
            </div>
          </div>
        </section>

        {/* AI Thresholds */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Sliders className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">AI Churn Risk Sensitivity</h2>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Critical Flag Threshold</span>
                <span className="font-mono font-bold text-danger">{churnThreshold}% churn probability</span>
              </div>
              <input
                type="range"
                min="40"
                max="85"
                value={churnThreshold}
                onChange={(e) => setChurnThreshold(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer accent-primary"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Customers with calculated churn probability higher than {churnThreshold}% will trigger immediate critical priority alerts.
              </p>
            </div>
          </div>
        </section>

        {/* Notifications & Automation */}
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Bell className="size-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Alerts & Real-time Signals</h2>
          </div>

          <div className="mt-4 space-y-4 divide-y divide-border">
            <div className="flex items-center justify-between pt-3 first:pt-0">
              <div>
                <p className="text-sm font-medium text-foreground">Real-time Intent Triggers</p>
                <p className="text-xs text-muted-foreground">
                  Get instant push notifications when a customer downloads foreclosure quotes or uses rate calculators.
                </p>
              </div>
              <input
                type="checkbox"
                checked={realtimeAlerts}
                onChange={(e) => setRealtimeAlerts(e.target.checked)}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-sm font-medium text-foreground">Morning Action Digest</p>
                <p className="text-xs text-muted-foreground">
                  Receive the top priority call queue summary at 8:30 AM every morning.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-sm font-medium text-foreground">AI Call Guidance Auto-generation</p>
                <p className="text-xs text-muted-foreground">
                  Automatically prepare opener scripts and rate retention offers for flagged accounts overnight.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoScriptGen}
                onChange={(e) => setAutoScriptGen(e.target.checked)}
                className="size-4 rounded accent-primary cursor-pointer"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
