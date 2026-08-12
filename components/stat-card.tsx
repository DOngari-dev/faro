import { cn } from "@/lib/utils"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  accent,
  className,
}: {
  label: string
  value: string
  icon?: LucideIcon
  trend?: number
  trendLabel?: string
  accent?: string
  className?: string
}) {
  const positive = (trend ?? 0) >= 0
  return (
    <div className={cn("rounded-xl border border-border bg-card p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {Icon && (
          <span
            className="flex size-7 items-center justify-center rounded-md"
            style={{ backgroundColor: `color-mix(in oklch, ${accent ?? "var(--primary)"} 14%, transparent)` }}
          >
            <Icon className="size-4" style={{ color: accent ?? "var(--primary)" }} />
          </span>
        )}
      </div>
      <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {trend !== undefined && (
        <div className="mt-1 flex items-center gap-1 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium",
              positive ? "text-success" : "text-danger",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}
