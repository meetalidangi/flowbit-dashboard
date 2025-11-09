"use client"

import { BarChart3, MessageSquare, FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface DashboardNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function DashboardNav({ activeTab, setActiveTab }: DashboardNavProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "chat", label: "Chat with Data", icon: MessageSquare },
  ]

  return (
    <aside className="w-64 border-r border-border bg-card p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-chart-1" />
          Flowbit
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                activeTab === item.id ? "bg-chart-1 text-primary-foreground" : "text-foreground hover:bg-muted",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
