"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const revenueData = [
  { month: "Jan", revenue: 125000, invoices: 85 },
  { month: "Feb", revenue: 145000, invoices: 92 },
  { month: "Mar", revenue: 168000, invoices: 108 },
  { month: "Apr", revenue: 152000, invoices: 95 },
  { month: "May", revenue: 198000, invoices: 128 },
  { month: "Jun", revenue: 215000, invoices: 142 },
  { month: "Jul", revenue: 228000, invoices: 155 },
  { month: "Aug", revenue: 245000, invoices: 168 },
  { month: "Sep", revenue: 265000, invoices: 178 },
  { month: "Oct", revenue: 288000, invoices: 192 },
  { month: "Nov", revenue: 312000, invoices: 208 },
  { month: "Dec", revenue: 356000, invoices: 245 },
]

const COLORS = {
  revenue: "#06B6D4", // Cyan
  invoices: "#F97316", // Orange
}

export function RevenueChart() {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and invoice count</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
            >
              Line
            </Button>
            <Button variant={chartType === "bar" ? "default" : "outline"} size="sm" onClick={() => setChartType("bar")}>
              Bar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke={COLORS.revenue}
                  strokeWidth={2}
                  dot={{ fill: COLORS.revenue, r: 4 }}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="invoices"
                  stroke={COLORS.invoices}
                  strokeWidth={2}
                  dot={{ fill: COLORS.invoices, r: 4 }}
                  name="Invoices"
                  yAxisId="right"
                />
              </LineChart>
            ) : (
              <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${(value / 1000).toFixed(0)}K`, ""]}
                />
                <Legend />
                <Bar dataKey="revenue" fill={COLORS.revenue} name="Revenue" />
                <Bar dataKey="invoices" fill={COLORS.invoices} name="Invoices" yAxisId="right" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
