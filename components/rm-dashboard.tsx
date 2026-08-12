"use client"

import { useMemo, useState } from "react"
import { customers, type Customer, type RiskLevel, type LiveSignal } from "@/lib/mock-data"
import { CustomerRow } from "@/components/customer-row"
import { CustomerCard } from "@/components/customer-card"
import { SignalsStrip } from "@/components/signals-strip"
import { Search, LayoutGrid, List } from "lucide-react"
import { cn } from "@/lib/utils"

const filters: { id: "all" | RiskLevel; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
]

export function RmDashboard({
  onSelect,
  onOpenCockpit,
}: {
  onSelect: (c: Customer) => void
  onOpenCockpit: (s: LiveSignal) => void
}) {
  const [filter, setFilter] = useState<"all" | RiskLevel>("all")
  const [query, setQuery] = useState("")
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid")

  const list = useMemo(() => {
    return customers
      .filter((c) => (filter === "all" ? true : c.riskLevel === filter))
      .filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.company.toLowerCase().includes(query.toLowerCase()),
      )
      .sort((a, b) => a.priority - b.priority)
  }, [filter, query])

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
      {/* Live signals strip */}
      <div>
        <SignalsStrip onOpenCockpit={onOpenCockpit} />
      </div>

      {/* Priority queue header & controls */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Today&apos;s priority queue</h2>
          <p className="text-xs text-muted-foreground">Ranked by churn risk · {list.length} of {customers.length} shown</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Layout mode switcher */}
          <div className="flex items-center rounded-lg border border-border bg-card p-1">
            <button
              onClick={() => setLayoutMode("grid")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                layoutMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Card Grid View"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setLayoutMode("list")}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-colors",
                layoutMode === "list"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title="Compact List View"
            >
              <List className="size-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers"
              className="h-9 w-44 rounded-lg border border-border bg-card pl-8 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/15"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground ring-1 ring-border hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Customer List / Card Display */}
      {layoutMode === "grid" ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <CustomerCard key={c.id} customer={c} onSelect={onSelect} onOpenCockpit={onOpenCockpit} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col gap-2">
          {list.map((c) => (
            <CustomerRow key={c.id} customer={c} onSelect={onSelect} />
          ))}
        </div>
      )}

      {list.length === 0 && (
        <div className="mt-4 rounded-xl border border-dashed border-border bg-card py-12 text-center text-sm text-muted-foreground">
          No customers match this filter.
        </div>
      )}
    </div>
  )
}

