"use client"

import { cn } from "@/lib/utils"
import { Compass, LayoutDashboard, PieChart, Users, Settings, LifeBuoy } from "lucide-react"

export type View = "rm" | "manager" | "customers" | "settings" | "support"

const workspaceNav: { id: View; label: string; icon: typeof LayoutDashboard; badge?: string }[] = [
  { id: "rm", label: "My Day", icon: LayoutDashboard, badge: "6" },
  { id: "manager", label: "Portfolio Health", icon: PieChart },
]

const generalNav: { id: View; label: string; icon: typeof Users }[] = [
  { id: "customers", label: "Customers", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "support", label: "Support", icon: LifeBuoy },
]

export function AppSidebar({
  view,
  onChange,
  className,
}: {
  view: View
  onChange: (v: View) => void
  className?: string
}) {
  return (
    <aside
      className={cn(
        "flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Compass className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">Faro</p>
          <p className="text-[11px] text-sidebar-foreground/60">RM Copilot</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2" aria-label="Primary">
        <p className="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
          Workspace
        </p>
        {workspaceNav.map((item) => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-sidebar-primary/20 px-2 py-0.5 text-[10px] font-semibold text-sidebar-primary">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}

        <p className="px-3 pb-1 pt-5 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/45">
          General
        </p>
        {generalNav.map((item) => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="m-3 space-y-3 rounded-xl bg-sidebar-accent/60 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/25 text-sm font-semibold text-sidebar-primary">
            D
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium text-sidebar-foreground">Darshan</p>
            <p className="truncate text-[11px] text-sidebar-foreground/60">Relationship Manager</p>
          </div>
        </div>
        <div className="space-y-1.5 border-t border-sidebar-foreground/10 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-sidebar-foreground/50">Department</span>
            <span className="text-[11px] font-medium text-sidebar-primary">SME Loans</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-sidebar-foreground/50">Branch</span>
            <span className="text-[11px] font-medium text-sidebar-foreground/80">Pune — West</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-sidebar-foreground/50">RM ID</span>
            <span className="font-mono text-[10px] text-sidebar-foreground/50">BFL-RM-2841</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
