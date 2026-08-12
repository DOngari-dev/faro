import { cn } from "@/lib/utils"

type Point = { label: string; value: number }

export function Sparkline({
  data,
  color = "var(--primary)",
  width = 120,
  height = 36,
  className,
}: {
  data: Point[]
  color?: string
  width?: number
  height?: number
  className?: string
}) {
  const values = data.map((d) => d.value)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const stepX = width / (data.length - 1 || 1)

  const points = data.map((d, i) => {
    const x = i * stepX
    const y = height - ((d.value - min) / range) * (height - 6) - 3
    return `${x},${y}`
  })

  const areaPath = `M0,${height} L${points.join(" L")} L${width},${height} Z`
  const linePath = `M${points.join(" L")}`
  const gradId = `spark-${color.replace(/[^a-z0-9]/gi, "")}`

  return (
    <svg width={width} height={height} className={cn("overflow-visible", className)} aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function BarSeries({
  data,
  color = "var(--primary)",
  height = 120,
  className,
}: {
  data: Point[]
  color?: string
  height?: number
  className?: string
}) {
  const max = Math.max(...data.map((d) => d.value)) || 1
  return (
    <div className={cn("flex items-end gap-2", className)} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color, opacity: 0.85 }}
            />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
