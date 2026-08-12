"use client"

import { type Customer, formatINR } from "@/lib/mock-data"
import { ScoreRing } from "@/components/score-ring"
import { RiskBadge } from "@/components/risk-badge"
import { BarSeries } from "@/components/mini-charts"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  Phone,
  MapPin,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
  Clock,
  CreditCard,
  Smartphone,
  Headset,
  AlertTriangle,
  Quote,
  Check,
  CalendarPlus,
} from "lucide-react"

const channelIcon = { Call: Phone }
const timelineIcon = { call: Phone, payment: CreditCard, app: Smartphone, service: Headset, alert: AlertTriangle }

function healthColor(score: number) {
  if (score >= 70) return "var(--success)"
  if (score >= 50) return "var(--warning)"
  return "var(--danger)"
}

function TrendPill({ delta }: { delta: number }) {
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus
  const color = delta > 0 ? "text-success" : delta < 0 ? "text-danger" : "text-muted-foreground"
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-medium", color)}>
      <Icon className="size-3.5" />
      {delta > 0 ? "+" : ""}
      {delta} pts / 30d
    </span>
  )
}

export function CustomerDetail({ customer, onBack }: { customer: Customer; onBack: () => void }) {
  const ChannelIcon = channelIcon[customer.nextBestAction.channel]

  return (
    <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to priority queue
      </button>

      {/* Customer header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold text-primary-foreground"
          style={{ backgroundColor: customer.avatarColor }}
        >
          {customer.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">{customer.name}</h1>
            <RiskBadge level={customer.riskLevel} />
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              Priority #{customer.priority}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {customer.company} · {customer.product}
          </p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{customer.location}</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-3.5" />Last contact {customer.lastContact}</span>
            <span>Tenure {customer.relationshipTenure}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <CalendarPlus className="size-4" /> Schedule
          </Button>
          <Button size="sm" className="gap-1.5">
            <ChannelIcon className="size-4" /> {customer.nextBestAction.channel} now
          </Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Left column: scores + explainable reasons */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* Score cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4">
              <ScoreRing value={customer.healthScore} color={healthColor(customer.healthScore)} sublabel="/ 100" />
              <p className="text-sm font-medium text-foreground">Health score</p>
              <TrendPill delta={customer.healthTrend} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4">
              <ScoreRing value={customer.churnRisk} color="var(--danger)" label={`${customer.churnRisk}%`} sublabel="risk" />
              <p className="text-sm font-medium text-foreground">Churn probability</p>
              <span className="text-xs text-muted-foreground">Predicted within 10-15 days</span>
            </div>
            <div className="flex flex-col justify-center gap-1.5 rounded-xl border border-border bg-card p-4">
              <p className="text-xs font-medium text-muted-foreground">Revenue at stake</p>
              <p className="font-mono text-2xl font-semibold text-foreground">{formatINR(customer.revenueImpact)}</p>
              <p className="text-xs text-muted-foreground">Estimated annual value if retained</p>
              <div className="mt-1 h-px bg-border" />
              <p className="text-xs text-muted-foreground">Lifetime value</p>
              <p className="font-mono text-base font-semibold text-foreground">{formatINR(customer.revenueImpact * 4)}</p>
            </div>
          </div>

          {/* Explainable AI */}
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Why Faro flagged this customer</h2>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Signals contributing to the current risk score, ranked by weight.
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {customer.reasons.map((r) => {
                const isNeg = r.impact === "negative"
                const isPos = r.impact === "positive"
                const barColor = isNeg ? "var(--danger)" : isPos ? "var(--success)" : "var(--chart-5)"
                return (
                  <li key={r.label} className="rounded-lg border border-border/70 bg-background/40 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-flex size-5 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `color-mix(in oklch, ${barColor} 15%, transparent)` }}
                          >
                            {isNeg ? (
                              <TrendingDown className="size-3" style={{ color: barColor }} />
                            ) : isPos ? (
                              <TrendingUp className="size-3" style={{ color: barColor }} />
                            ) : (
                              <Minus className="size-3" style={{ color: barColor }} />
                            )}
                          </span>
                          <p className="text-sm font-medium text-foreground">{r.label}</p>
                        </div>
                        <p className="mt-1 pl-7 text-xs text-muted-foreground text-pretty">{r.detail}</p>
                      </div>
                      <span className="shrink-0 font-mono text-xs font-semibold" style={{ color: barColor }}>
                        {r.weight}%
                      </span>
                    </div>
                    <div className="mt-2 ml-7 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full" style={{ width: `${r.weight}%`, backgroundColor: barColor }} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          {/* Activity chart */}
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Engagement (app sessions / mo)</h2>
              <span className="text-xs text-muted-foreground">Last 6 months</span>
            </div>
            <BarSeries data={customer.activity} color={healthColor(customer.healthScore)} className="mt-4" />
          </section>
        </div>

        {/* Right column: next best action + guidance + timeline */}
        <div className="flex flex-col gap-5">
          {/* Next best action */}
          <section className="rounded-xl border-2 border-primary/25 bg-primary/5 p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Sparkles className="size-3.5" />
              </span>
              <h2 className="text-sm font-semibold text-foreground">Next best action</h2>
            </div>
            <p className="mt-3 text-sm font-semibold text-foreground text-balance">{customer.nextBestAction.title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground text-pretty">
              {customer.nextBestAction.detail}
            </p>
            <Button className="mt-4 w-full gap-1.5">
              <ChannelIcon className="size-4" />
              Call now
            </Button>
          </section>

          {/* Conversation guidance */}
          <section className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2">
              <Quote className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">AI conversation guidance</h2>
            </div>

            <div className="mt-3 rounded-lg bg-accent/50 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-accent-foreground/70">Suggested opener</p>
              <p className="mt-1 text-sm italic leading-relaxed text-accent-foreground">&ldquo;{customer.conversationGuidance.opener}&rdquo;</p>
            </div>

            <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Talking points</p>
            <ul className="mt-2 flex flex-col gap-2">
              {customer.conversationGuidance.talkingPoints.map((p) => (
                <li key={p} className="flex items-start gap-2 text-xs leading-relaxed text-foreground">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                  <span className="text-pretty">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-1 gap-2 text-xs">
              <div className="rounded-lg border border-border/70 p-2.5">
                <p className="font-semibold text-muted-foreground">Recommended offer</p>
                <p className="mt-0.5 text-foreground">{customer.conversationGuidance.offer}</p>
              </div>
              <div className="rounded-lg border border-border/70 p-2.5">
                <p className="font-semibold text-muted-foreground">Tone</p>
                <p className="mt-0.5 text-foreground">{customer.conversationGuidance.tone}</p>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
            <ol className="mt-4 flex flex-col gap-4">
              {customer.timeline.map((ev, i) => {
                const Icon = timelineIcon[ev.type]
                const isAlert = ev.type === "alert"
                return (
                  <li key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full ring-1",
                          isAlert ? "bg-danger/10 ring-danger/25" : "bg-muted ring-border",
                        )}
                      >
                        <Icon className={cn("size-3.5", isAlert ? "text-danger" : "text-muted-foreground")} />
                      </span>
                      {i < customer.timeline.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="pb-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{ev.title}</p>
                        <span className="text-[10px] text-muted-foreground">{ev.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-pretty">{ev.description}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>
        </div>
      </div>
    </div>
  )
}
