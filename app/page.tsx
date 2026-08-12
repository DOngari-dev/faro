"use client"

import { useState } from "react"
import { AppSidebar, type View } from "@/components/app-sidebar"
import { RmDashboard } from "@/components/rm-dashboard"
import { ManagerDashboard } from "@/components/manager-dashboard"
import { CustomersView } from "@/components/customers-view"
import { SettingsView } from "@/components/settings-view"
import { SupportView } from "@/components/support-view"
import { CustomerDetail } from "@/components/customer-detail"
import { CallCockpit } from "@/components/call-cockpit"
import type { Customer, LiveSignal } from "@/lib/mock-data"
import { Bell, Search, Menu } from "lucide-react"

export default function Page() {
  const [view, setView] = useState<View>("rm")
  const [selected, setSelected] = useState<Customer | null>(null)
  const [cockpit, setCockpit] = useState<LiveSignal | null>(null)
  const [mobileNav, setMobileNav] = useState(false)

  function handleViewChange(v: View) {
    setView(v)
    setSelected(null)
    setMobileNav(false)
  }

  function renderView() {
    if (selected) {
      return <CustomerDetail customer={selected} onBack={() => setSelected(null)} />
    }

    switch (view) {
      case "rm":
        return <RmDashboard onSelect={setSelected} onOpenCockpit={setCockpit} />
      case "manager":
        return <ManagerDashboard />
      case "customers":
        return <CustomersView onSelect={setSelected} onOpenCockpit={setCockpit} />
      case "settings":
        return <SettingsView />
      case "support":
        return <SupportView />
      default:
        return <RmDashboard onSelect={setSelected} onOpenCockpit={setCockpit} />
    }
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <AppSidebar view={view} onChange={handleViewChange} className="hidden lg:flex" />

      {/* Mobile sidebar overlay */}
      {mobileNav && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileNav(false)} />
          <AppSidebar view={view} onChange={handleViewChange} className="relative z-50 h-full" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card/60 px-4 backdrop-blur lg:px-8">
          <button
            onClick={() => setMobileNav(true)}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted lg:hidden"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search customers, accounts, or segments"
              className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-card" />
            </button>
            <div className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-muted">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                D
              </span>
              <div className="hidden text-left leading-tight sm:block">
                <p className="text-xs font-medium text-foreground">Darshan</p>
                <p className="text-[10px] text-muted-foreground">SME Loans · Pune West</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>

      {cockpit && <CallCockpit signal={cockpit} onClose={() => setCockpit(null)} />}
    </div>
  )
}

