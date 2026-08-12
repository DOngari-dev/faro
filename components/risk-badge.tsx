import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/mock-data"

const styles: Record<RiskLevel, string> = {
  critical: "bg-danger/12 text-danger ring-danger/25",
  high: "bg-warning/20 text-warning-foreground ring-warning/40",
  medium: "bg-warning/12 text-warning-foreground ring-warning/25",
  low: "bg-success/12 text-success ring-success/25",
}

const labels: Record<RiskLevel, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
}

export function RiskBadge({ level, className }: { level: RiskLevel; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        styles[level],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {labels[level]} risk
    </span>
  )
}
