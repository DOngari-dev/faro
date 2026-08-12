"use client"

import { cn } from "@/lib/utils"
import { type Customer } from "@/lib/mock-data"
import { RiskBadge } from "@/components/risk-badge"
import { ChevronRight, Phone } from "lucide-react"

const channelIcon = { Call: Phone }

function healthColor(score: number) {
  if (score >= 70) return "var(--success)"
  if (score >= 50) return "var(--warning)"
  return "var(--danger)"
}

export function CustomerRow({ customer, onSelect }: { customer: Customer; onSelect: (c: Customer) => void }) {
  const ChannelIcon = channelIcon[customer.nextBestAction.channel]
  const hColor = healthColor(customer.healthScore)
  const churnColor = healthColor(100 - customer.churnRisk)

  return (
    <button
      onClick={() => onSelect(customer)}
      className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card px-4 py-3.5 text-left transition-all hover:border-primary/30 hover:shadow-sm"
    >
      {/* Rank */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums text-muted-foreground ring-1 ring-border">
        {customer.priority}
      </div>

      {/* Avatar */}
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground"
        style={{ backgroundColor: customer.avatarColor }}
        aria-hidden="true"
      >
        {customer.initials}
      </div>

      {/* Name + segment */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{customer.name}</p>
          <RiskBadge level={customer.riskLevel} />
        </div>
        <p className="truncate text-xs text-muted-foreground">
          {customer.segment} · {customer.product}
        </p>
      </div>

      {/* Health */}
      <div className="hidden w-32 shrink-0 md:block">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Health</p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full transition-all" style={{ width: `${customer.healthScore}%`, backgroundColor: hColor }} />
          </div>
          <span className="w-6 text-right font-mono text-xs font-semibold text-foreground">{customer.healthScore}</span>
        </div>
      </div>

      {/* Churn risk */}
      <div className="hidden w-20 shrink-0 lg:block">
        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Churn</p>
        <p className="mt-1 font-mono text-sm font-semibold" style={{ color: churnColor }}>
          {customer.churnRisk}%
        </p>
      </div>

      {/* Next action button */}
      <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
        <ChannelIcon className="size-3.5" />
        <span>{customer.nextBestAction.channel}</span>
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
    </button>
  )
}
