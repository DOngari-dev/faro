"use client"

import { type Customer, formatINR, customerToSignal, type LiveSignal } from "@/lib/mock-data"
import { RiskBadge } from "@/components/risk-badge"
import { Button } from "@/components/ui/button"
import { Phone, User, AlertTriangle } from "lucide-react"

function healthColor(score: number) {
  if (score >= 70) return "var(--success)"
  if (score >= 50) return "var(--warning)"
  return "var(--danger)"
}

export function CustomerCard({
  customer,
  onSelect,
  onOpenCockpit,
}: {
  customer: Customer
  onSelect: (c: Customer) => void
  onOpenCockpit: (s: LiveSignal) => void
}) {
  const hColor = healthColor(customer.healthScore)
  const churnColor = healthColor(100 - customer.churnRisk)
  const topReason = customer.reasons.find((r) => r.impact === "negative") || customer.reasons[0]

  return (
    <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
      <div>
        {/* Top header: Rank, Avatar, Name & Risk */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Rank badge */}
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums text-muted-foreground ring-1 ring-border">
              #{customer.priority}
            </div>

            {/* Avatar */}
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-primary-foreground"
              style={{ backgroundColor: customer.avatarColor }}
              aria-hidden="true"
            >
              {customer.initials}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                {customer.name}
              </h3>
              <p className="truncate text-xs text-muted-foreground">{customer.company}</p>
            </div>
          </div>

          <RiskBadge level={customer.riskLevel} />
        </div>

        {/* Product & Segment pill */}
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {customer.segment}
          </span>
          <span className="truncate text-xs text-muted-foreground/80">{customer.product}</span>
        </div>

        {/* Key metrics grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted/40 p-3 text-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Health</p>
            <div className="mt-1 flex items-center justify-center gap-1.5">
              <span className="font-mono text-sm font-bold text-foreground">{customer.healthScore}</span>
              <span className="text-[10px] text-muted-foreground">/100</span>
            </div>
            <div className="mx-auto mt-1 h-1 w-12 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${customer.healthScore}%`, backgroundColor: hColor }}
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Churn Risk</p>
            <p className="mt-1 font-mono text-sm font-bold" style={{ color: churnColor }}>
              {customer.churnRisk}%
            </p>
            <p className="text-[10px] text-muted-foreground">probability</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">At Risk</p>
            <p className="mt-1 font-mono text-sm font-bold text-foreground">
              {formatINR(customer.revenueImpact)}
            </p>
            <p className="text-[10px] text-muted-foreground">annual value</p>
          </div>
        </div>

        {/* Top Warning Signal */}
        {topReason && (
          <div className="mt-3.5 flex items-start gap-2 rounded-lg border border-danger/15 bg-danger/5 p-2.5">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-danger" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">{topReason.label}</p>
              <p className="line-clamp-1 text-[11px] text-muted-foreground">{topReason.detail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Buttons */}
      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-1.5 text-xs font-medium"
          onClick={() => onSelect(customer)}
        >
          <User className="size-3.5 text-muted-foreground" />
          View Profile
        </Button>

        <Button
          size="sm"
          className="flex-1 gap-1.5 text-xs font-semibold"
          onClick={() => onOpenCockpit(customerToSignal(customer))}
        >
          <Phone className="size-3.5" />
          Call
        </Button>
      </div>
    </div>
  )
}
