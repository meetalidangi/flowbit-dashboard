"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, FileText, DollarSign } from "lucide-react"

export function KpiOverview() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Last 30 days",
    },
    {
      title: "Total Invoices",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: FileText,
      description: "This month",
    },
    {
      title: "Active Customers",
      value: "342",
      change: "+5.1%",
      trend: "up",
      icon: Users,
      description: "Total customers",
    },
    {
      title: "Avg Invoice Value",
      value: "$1,920",
      change: "+3.8%",
      trend: "up",
      icon: TrendingUp,
      description: "Month-over-month",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-4">Key Performance Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card key={idx} className="bg-card border-border hover:border-chart-1 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                  <Icon className="w-5 h-5 text-chart-1" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-chart-4" : "text-destructive"}`}>
                      {kpi.change}
                    </span>
                    <span className="text-xs text-muted-foreground">{kpi.description}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
