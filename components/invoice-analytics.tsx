"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useState } from "react"
import { Search, Download } from "lucide-react"

const COLORS = {
  paid: "#10B981", // Emerald
  pending: "#F59E0B", // Amber
  overdue: "#EF4444", // Red
  cancelled: "#6B7280", // Gray
  chart1: "#06B6D4", // Cyan
  chart2: "#F97316", // Orange
}

const invoiceStatusData = [
  { name: "Paid", value: 542, color: COLORS.paid },
  { name: "Pending", value: 348, color: COLORS.pending },
  { name: "Overdue", value: 157, color: COLORS.overdue },
  { name: "Cancelled", value: 45, color: COLORS.cancelled },
]

const invoiceData = [
  {
    id: "INV-1234",
    vendor: "Musterfirma Müller",
    amount: 1920,
    status: "Paid",
    date: "2025-11-04",
    dueDate: "2025-12-04",
  },
  {
    id: "INV-1235",
    vendor: "Tech Solutions GmbH",
    amount: 2450,
    status: "Pending",
    date: "2025-11-05",
    dueDate: "2025-12-05",
  },
  {
    id: "INV-1236",
    vendor: "Digital Services Ltd",
    amount: 1680,
    status: "Overdue",
    date: "2025-10-15",
    dueDate: "2025-11-14",
  },
  {
    id: "INV-1237",
    vendor: "Cloud Systems Inc",
    amount: 3200,
    status: "Paid",
    date: "2025-11-06",
    dueDate: "2025-12-06",
  },
  {
    id: "INV-1238",
    vendor: "Enterprise Solutions",
    amount: 2890,
    status: "Pending",
    date: "2025-11-07",
    dueDate: "2025-12-07",
  },
]

const invoiceByVendorData = [
  { vendor: "Musterfirma Müller", count: 125, revenue: 240000 },
  { vendor: "Tech Solutions", count: 98, revenue: 185000 },
  { vendor: "Digital Services", count: 87, revenue: 165000 },
  { vendor: "Cloud Systems", count: 156, revenue: 298000 },
  { vendor: "Enterprise Solutions", count: 142, revenue: 270000 },
]

interface InvoiceAnalyticsProps {
  fullPage?: boolean
}

export function InvoiceAnalytics({ fullPage = false }: InvoiceAnalyticsProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvoices = invoiceData.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-500 text-white"
      case "Pending":
        return "bg-amber-500 text-white"
      case "Overdue":
        return "bg-red-500 text-white"
      case "Cancelled":
        return "bg-gray-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (fullPage) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Invoice Management</h1>
          <p className="text-muted-foreground">Track and manage all invoices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-card border-border lg:col-span-1">
            <CardHeader>
              <CardTitle>Invoice Status Distribution</CardTitle>
              <CardDescription>Current breakdown of invoice statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={invoiceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {invoiceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Vendors by Invoice Volume</CardTitle>
              <CardDescription>Most active vendors this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={invoiceByVendorData} margin={{ top: 20, right: 30, left: 0, bottom: 100 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="vendor"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill={COLORS.chart1} name="Invoice Count" />
                    <Bar dataKey="revenue" fill={COLORS.chart2} name="Revenue ($)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Invoices</CardTitle>
                <CardDescription>Complete invoice listing</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="flex gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Invoice ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Vendor</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="py-3 px-4 font-medium text-foreground">{invoice.id}</td>
                      <td className="py-3 px-4 text-muted-foreground">{invoice.vendor}</td>
                      <td className="py-3 px-4 text-foreground font-semibold">${invoice.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{invoice.date}</td>
                      <td className="py-3 px-4 text-muted-foreground">{invoice.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Invoice Status</CardTitle>
          <CardDescription>Distribution across statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={invoiceStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {invoiceStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Latest invoice activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoiceData.slice(0, 5).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{invoice.id}</p>
                  <p className="text-sm text-muted-foreground">{invoice.vendor}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">${invoice.amount.toLocaleString()}</p>
                  <span className={`inline-block text-xs px-2 py-1 rounded mt-1 ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
