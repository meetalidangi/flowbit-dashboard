"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { KpiOverview } from "@/components/kpi-overview"
import { RevenueChart } from "@/components/revenue-chart"
import { InvoiceAnalytics } from "@/components/invoice-analytics"
import { ChatWithData } from "@/components/chat-with-data"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardNav activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 overflow-auto">
          {activeTab === "overview" && (
            <div className="p-6 space-y-6">
              <KpiOverview />
              <RevenueChart />
              <InvoiceAnalytics />
            </div>
          )}

          {activeTab === "invoices" && (
            <div className="p-6">
              <InvoiceAnalytics fullPage />
            </div>
          )}

          {activeTab === "chat" && (
            <div className="p-6">
              <ChatWithData />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
