"use client"

import { portfolioSummary, riskDistribution, healthTrend, teamMembers, formatINR } from "@/lib/mock-data"
import { StatCard } from "@/components/stat-card"
import { Sparkline } from "@/components/mini-charts"
import { cn } from "@/lib/utils"
import { Users, ShieldAlert, TrendingDown, Trophy, HeartPulse } from "lucide-react"

function Donut() {
  const total = riskDistribution.reduce((s, d) => s + d.count, 0)
  const size = 160
  const stroke = 22
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {riskDistribution.map((d) => {
            const fraction = d.count / total
            const dash = fraction * circumference
            const seg = (
              <circle
                key={d.level}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
              />
            )
            offset += dash
            return seg
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-semibold text-foreground">{total.toLocaleString()}</span>
          <span className="text-[11px] text-muted-foreground">customers</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2.5">
        {riskDistribution.map((d) => (
          <li key={d.level} className="flex items-center gap-2.5 text-sm">
            <span className="size-3 rounded-sm" style={{ backgroundColor: d.color }} />
            <span className="w-16 text-muted-foreground">{d.level}</span>
            <span className="font-mono font-semibold text-foreground">{d.count.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LineChart() {
  const width = 480
  const height = 150
  const values = healthTrend.map((d) => d.value)
  const max = Math.max(...values) + 3
  const min = Math.min(...values) - 3
  const range = max - min || 1
  const stepX = width / (healthTrend.length - 1)
  const points = healthTrend.map((d, i) => {
    const x = i * stepX
    const y = height - ((d.value - min) / range) * height
    return { x, y, ...d }
  })
  const linePath = `M${points.map((p) => `${p.x},${p.y}`).join(" L")}`
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${width} ${height + 22}`} className="w-full" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="health-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#health-area)" />
        <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p) => (
          <g key={p.label}>
            <circle cx={p.x} cy={p.y} r={3.5} fill="var(--card)" stroke="var(--primary)" strokeWidth={2} />
            <text x={p.x} y={height + 16} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: 10 }}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function healthColor(score: number) {
  if (score >= 70) return "var(--success)"
  if (score >= 60) return "var(--warning)"
  return "var(--danger)"
}

export function ManagerDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      <header>
        <p className="text-sm text-muted-foreground">Regional overview · West Zone</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Portfolio health</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
          Monitor churn exposure across the book and track how your relationship managers are protecting revenue.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total customers" value={portfolioSummary.totalCustomers.toLocaleString()} icon={Users} accent="var(--primary)" />
        <StatCard label="At-risk accounts" value={portfolioSummary.atRisk.toString()} icon={ShieldAlert} accent="var(--danger)" trend={9} trendLabel="this month" />
        <StatCard label="Revenue at risk" value={formatINR(portfolioSummary.revenueAtRisk)} icon={TrendingDown} accent="var(--warning)" />
        <StatCard label="Retained (MTD)" value={formatINR(portfolioSummary.retainedRevenue)} icon={Trophy} accent="var(--success)" trend={18} trendLabel="vs last month" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Risk distribution</h2>
          <p className="text-xs text-muted-foreground">Across all active accounts</p>
          <div className="mt-5">
            <Donut />
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Average portfolio health</h2>
              <p className="text-xs text-muted-foreground">Trailing 7 months</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5">
              <HeartPulse className="size-4 text-primary" />
              <span className="font-mono text-lg font-semibold text-foreground">{portfolioSummary.avgHealth}</span>
              <span className="text-xs text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div className="mt-4">
            <LineChart />
          </div>
        </section>
      </div>

      {/* Team performance */}
      <section className="mt-5 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Relationship manager performance</h2>
            <p className="text-xs text-muted-foreground">Retention and portfolio health by RM</p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Manager</th>
                <th className="pb-2 pr-4 font-medium">Region</th>
                <th className="pb-2 pr-4 font-medium">Customers</th>
                <th className="pb-2 pr-4 font-medium">At risk</th>
                <th className="pb-2 pr-4 font-medium">Retention</th>
                <th className="pb-2 font-medium">Avg. health</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((m) => (
                <tr key={m.name} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
                        {m.initials}
                      </span>
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{m.region}</td>
                  <td className="py-3 pr-4 font-mono text-foreground">{m.customers}</td>
                  <td className="py-3 pr-4">
                    <span className="font-mono font-medium text-danger">{m.atRisk}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${m.retention}%`, backgroundColor: m.retention >= 90 ? "var(--success)" : "var(--warning)" }}
                        />
                      </div>
                      <span className="font-mono text-xs font-medium text-foreground">{m.retention}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={cn("inline-flex items-center rounded-full px-2 py-0.5 font-mono text-xs font-semibold")}
                      style={{
                        backgroundColor: `color-mix(in oklch, ${healthColor(m.health)} 14%, transparent)`,
                        color: healthColor(m.health),
                      }}
                    >
                      {m.health}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* At-risk highlight strip */}
      <section className="mt-5 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Segments driving churn risk</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { seg: "SME — Working Capital", risk: 71, series: [{ label: "", value: 40 }, { label: "", value: 52 }, { label: "", value: 61 }, { label: "", value: 71 }] },
            { seg: "Vehicle Finance", risk: 58, series: [{ label: "", value: 44 }, { label: "", value: 49 }, { label: "", value: 54 }, { label: "", value: 58 }] },
            { seg: "Housing Finance", risk: 46, series: [{ label: "", value: 38 }, { label: "", value: 41 }, { label: "", value: 44 }, { label: "", value: 46 }] },
          ].map((s) => (
            <div key={s.seg} className="rounded-lg border border-border/70 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{s.seg}</p>
                <span className="font-mono text-sm font-semibold text-danger">{s.risk}%</span>
              </div>
              <p className="text-xs text-muted-foreground">Avg. churn risk</p>
              <Sparkline data={s.series} color="var(--danger)" width={200} height={40} className="mt-2 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
