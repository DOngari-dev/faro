"use client"

import { useEffect } from "react"
import {
  type LiveSignal,
  signalCategoryConfig,
  formatINR,
} from "@/lib/mock-data"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  X,
  Phone,
  User,
  Zap,
  MessageSquareQuote,
  Check,
  Ban,
  Gift,
  Clock,
  Sparkles,
} from "lucide-react"

const channelIcon = { Call: Phone }

export function CallCockpit({
  signal,
  onClose,
}: {
  signal: LiveSignal
  onClose: () => void
}) {
  const cat = signalCategoryConfig[signal.category]
  const ChannelIcon = channelIcon[signal.channel]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Call cockpit for ${signal.customerName}`}
        className="relative flex h-full w-full max-w-xl flex-col bg-background shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-border bg-card px-5 py-4">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-primary-foreground"
            style={{ backgroundColor: signal.avatarColor }}
          >
            {signal.initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">{signal.customerName}</h2>
              <RiskBadge level={signal.urgency} />
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {signal.segment} · {signal.product}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
            aria-label="Close cockpit"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Trigger banner */}
        <div
          className="flex items-center gap-3 border-b border-border px-5 py-3"
          style={{ backgroundColor: `color-mix(in oklch, ${cat.color} 8%, transparent)` }}
        >
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              backgroundColor: `color-mix(in oklch, ${cat.color} 16%, transparent)`,
              color: cat.color,
            }}
          >
            <Sparkles className="size-3" />
            {cat.label}
          </span>
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{signal.headline}</p>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {signal.triggeredAt}
          </span>
        </div>

        {/* Scrollable body: WHO / WHY / WHAT */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* WHO */}
          <Section step="Who" title="Who you're calling" icon={User} color="var(--primary)">
            <ul className="flex flex-col gap-2">
              {signal.cockpit.who.map((line, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-pretty">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
              <span className="text-xs text-muted-foreground">Revenue at stake</span>
              <span className="ml-auto font-mono text-sm font-semibold text-foreground">
                {formatINR(signal.value)}
              </span>
            </div>
          </Section>

          {/* WHY */}
          <Section step="Why" title="Why now" icon={Zap} color="var(--chart-3)">
            <ul className="flex flex-col gap-2.5">
              {signal.cockpit.why.map((line, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground">
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{
                      backgroundColor: "color-mix(in oklch, var(--chart-3) 16%, transparent)",
                      color: "var(--chart-3)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-pretty">{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
              <Clock className="size-4 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">{signal.window}</span>
              <div className="ml-auto flex w-24 items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
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
                <span className="font-mono text-[10px] text-muted-foreground">{signal.freshnessPct}%</span>
              </div>
            </div>
          </Section>

          {/* WHAT */}
          <Section step="What" title="What to say" icon={MessageSquareQuote} color="var(--success)" last>
            <div className="rounded-lg bg-accent/50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-accent-foreground/70">
                Suggested opener
              </p>
              <p className="mt-1 text-sm italic leading-relaxed text-accent-foreground">
                &ldquo;{signal.cockpit.what.opener}&rdquo;
              </p>
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Talking points
            </p>
            <ul className="mt-2 flex flex-col gap-2">
              {signal.cockpit.what.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span className="text-pretty">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <div className="flex items-start gap-2 rounded-lg border border-success/25 bg-success/5 p-3">
                <Gift className="mt-0.5 size-4 shrink-0 text-success" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-success">Offer to lead with</p>
                  <p className="mt-0.5 text-sm text-foreground text-pretty">{signal.cockpit.what.offer}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-danger/25 bg-danger/5 p-3">
                <Ban className="mt-0.5 size-4 shrink-0 text-danger" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-danger">Avoid</p>
                  <p className="mt-0.5 text-sm text-foreground text-pretty">{signal.cockpit.what.avoid}</p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Sticky action footer */}
        <div className="flex items-center gap-2 border-t border-border bg-card px-5 py-3">
          <Button variant="outline" className="gap-1.5" onClick={onClose}>
            Snooze 1 hr
          </Button>
          <Button className="flex-1 gap-1.5">
            <ChannelIcon className="size-4" /> {signal.channel} now
          </Button>
        </div>
      </div>
    </div>
  )
}

function Section({
  step,
  title,
  icon: Icon,
  color,
  children,
  last,
}: {
  step: string
  title: string
  icon: typeof User
  color: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section className={cn(!last && "mb-6")}>
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className="flex size-8 items-center justify-center rounded-lg"
          style={{ backgroundColor: `color-mix(in oklch, ${color} 14%, transparent)`, color }}
        >
          <Icon className="size-4" />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
            {step}
          </p>
          <h3 className="-mt-0.5 text-sm font-semibold text-foreground">{title}</h3>
        </div>
      </div>
      <div className="pl-10.5">{children}</div>
    </section>
  )
}
