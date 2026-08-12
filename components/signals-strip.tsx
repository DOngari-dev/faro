"use client"

import { useState } from "react"
import { liveSignals, marketEvents, signalCategoryConfig, type LiveSignal } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { Zap, TrendingDown, TrendingUp, ChevronRight, PhoneCall, ChevronDown, ChevronUp } from "lucide-react"

const urgencyBorder: Record<string, string> = {
  critical: "border-l-danger",
  high: "border-l-warning",
  medium: "border-l-primary",
  low: "border-l-border",
}

const urgencyDot: Record<string, string> = {
  critical: "bg-danger",
  high: "bg-warning",
  medium: "bg-primary",
  low: "bg-muted-foreground",
}

export function SignalsStrip({ onOpenCockpit }: { onOpenCockpit: (s: LiveSignal) => void }) {
  const [expanded, setExpanded] = useState(true)

  const urgent = liveSignals.filter((s) => s.urgency === "critical" || s.urgency === "high")

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-danger/60" />
          <span className="relative inline-flex size-2 rounded-full bg-danger" />
        </span>
        <span className="text-sm font-semibold text-foreground">Live signals</span>
        <span className="rounded-full bg-danger/10 px-2 py-0.5 text-[10px] font-semibold text-danger">
          {urgent.length} need action now
        </span>

        {/* Market ticker — scrolls inline */}
        <div className="ml-4 hidden flex-1 overflow-hidden xl:block">
          <div className="flex gap-5">
            {marketEvents.map((e) => (
              <span key={e.id} className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
                {e.direction === "down" ? (
                  <TrendingDown className="size-3 text-danger" />
                ) : (
                  <TrendingUp className="size-3 text-success" />
                )}
                <span className="font-mono font-medium text-foreground">{e.metric}</span>
                <span className="truncate max-w-32">{e.title}</span>
                <span className="text-muted-foreground/60">·</span>
                <span className="font-medium text-primary">{e.matched} matched</span>
              </span>
            ))}
          </div>
        </div>

        <div className="ml-auto text-muted-foreground">
          {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </div>
      </button>

      {/* Signal cards */}
      {expanded && (
        <div className="border-t border-border divide-y divide-border">
          {urgent.map((signal) => {
            const catConfig = signalCategoryConfig[signal.category]
            return (
              <div
                key={signal.id}
                className={cn("flex items-center gap-4 pl-4 pr-4 py-3 border-l-2", urgencyBorder[signal.urgency])}
              >
                {/* Avatar */}
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground"
                  style={{ backgroundColor: signal.avatarColor }}
                  aria-hidden="true"
                >
                  {signal.initials}
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{signal.customerName}</span>
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                      style={{ color: catConfig.color, backgroundColor: `color-mix(in srgb, ${catConfig.color} 12%, transparent)` }}
                    >
                      {catConfig.short}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <span className={cn("inline-block size-1.5 rounded-full", urgencyDot[signal.urgency])} />
                      {signal.triggeredAt}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{signal.headline}</p>
                </div>

                {/* Window */}
                <div className="hidden shrink-0 text-right md:block">
                  <p className="text-[11px] font-semibold text-foreground">{signal.window}</p>
                  <p className="text-[10px] text-muted-foreground">{signal.segment}</p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onOpenCockpit(signal)}
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <PhoneCall className="size-3.5" />
                  <span>Call</span>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
