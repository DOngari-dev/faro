"use client"

import { useMemo, useState } from "react"
import {
  liveSignals,
  marketEvents,
  signalCategoryConfig,
  formatINR,
  type LiveSignal,
  type SignalCategory,
} from "@/lib/mock-data"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Radar,
  Phone,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowRight,
  Zap,
} from "lucide-react"

const channelIcon = { Call: Phone }
const filters: { id: SignalCategory | "all"; label: string }[] = [
  { id: "all", label: "All signals" },
  { id: "behavioral", label: "In-app intent" },
  { id: "market", label: "Market" },
  { id: "risk", label: "Risk" },
  { id: "opportunity", label: "Opportunity" },
]

export function SignalsFeed({ onOpenCockpit }: { onOpenCockpit: (s: LiveSignal) => void }) {
  const [filter, setFilter] = useState<SignalCategory | "all">("all")

  const visible = useMemo(
    () => (filter === "all" ? liveSignals : liveSignals.filter((s) => s.category === filter)),
    [filter],
  )

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success/70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-success" />
            </span>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">Live signals</h1>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Real-time triggers ranked by urgency. Review guidance before you dial.
          </p>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground">
          <Zap className="size-3.5 text-primary" />
          <span className="font-medium text-foreground">{liveSignals.length}</span> active ·
          <span className="font-medium text-danger">
            {liveSignals.filter((s) => s.urgency === "critical" || s.urgency === "high").length}
          </span>{" "}
          need action now
        </div>
      </div>

      {/* Market & macro events */}
      <section className="mt-6">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Market &amp; macro events
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {marketEvents.map((m) => {
            const Trend = m.direction === "up" ? TrendingUp : TrendingDown
            return (
              <div
                key={m.id}
                className="flex flex-col rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/30"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 font-mono text-xs font-semibold text-foreground">
                    <Trend
                      className={cn("size-3.5", m.direction === "up" ? "text-success" : "text-danger")}
                    />
                    {m.metric}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <p className="mt-2.5 text-sm font-semibold text-foreground text-balance">{m.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">{m.detail}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <Users className="size-3.5" />
                    {m.matched} matched
                  </span>
                  <button className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                    View play <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {filters.map((f) => {
          const active = filter === f.id
          const count = f.id === "all" ? liveSignals.length : liveSignals.filter((s) => s.category === f.id).length
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[10px] font-semibold",
                  active ? "bg-primary-foreground/20" : "bg-muted",
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Signal feed */}
      <div className="mt-4 flex flex-col gap-3">
        {visible.map((s) => (
          <SignalCard key={s.id} signal={s} onOpen={() => onOpenCockpit(s)} />
        ))}
        {visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-12 text-center">
            <Radar className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No signals in this category right now.</p>
          </div>
        )}
      </div>
    </div>
  )
}

function SignalCard({ signal, onOpen }: { signal: LiveSignal; onOpen: () => void }) {
  const cat = signalCategoryConfig[signal.category]
  const ChannelIcon = channelIcon[signal.channel]

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm sm:flex-row sm:items-center">
      {/* Left accent + avatar */}
      <div className="flex items-center gap-3">
        <span
          className="hidden h-12 w-1 shrink-0 rounded-full sm:block"
          style={{ backgroundColor: cat.color }}
        />
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground"
          style={{ backgroundColor: signal.avatarColor }}
        >
          {signal.initials}
        </div>
      </div>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: `color-mix(in oklch, ${cat.color} 14%, transparent)`,
              color: cat.color,
            }}
          >
            {cat.short}
          </span>
          <p className="text-sm font-semibold text-foreground">{signal.customerName}</p>
          <RiskBadge level={signal.urgency} />
        </div>
        <p className="mt-1 text-sm text-foreground text-pretty">{signal.headline}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" />
            {signal.triggeredAt}
          </span>
          <span>{signal.segment}</span>
          <span className="font-mono font-medium text-foreground">{formatINR(signal.value)}</span>
        </div>
      </div>

      {/* Right: window + action */}
      <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
        <div className="flex items-center gap-2">
          <div className="hidden w-16 sm:block">
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${signal.freshnessPct}%`,
                  backgroundColor:
                    signal.freshnessPct > 60
                      ? "var(--success)"
                      : signal.freshnessPct > 30
                        ? "var(--warning)"
                        : "var(--danger)",
                }}
              />
            </div>
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">{signal.window}</span>
        </div>
        <Button size="sm" className="gap-1.5" onClick={onOpen}>
          <ChannelIcon className="size-4" />
          Call
        </Button>
      </div>
    </div>
  )
}
