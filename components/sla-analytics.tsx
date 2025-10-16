"use client"

import type { Ticket } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateSLAMetrics } from "@/lib/sla-calculator"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, TrendingDown, Clock, Target, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useMemo } from "react"

interface SLAAnalyticsProps {
  tickets: Ticket[]
}

const COLORS = {
  hardware: "#3b82f6",
  software: "#8b5cf6",
  network: "#10b981",
  access: "#f59e0b",
  other: "#6b7280",
}

const PRIORITY_COLORS = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
}

export function SLAAnalytics({ tickets }: SLAAnalyticsProps) {
  const metrics = useMemo(() => calculateSLAMetrics(tickets), [tickets])

  const categoryData = useMemo(
    () =>
      Object.entries(metrics.ticketsByCategory).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        fill: COLORS[name as keyof typeof COLORS],
      })),
    [metrics],
  )

  const priorityData = useMemo(
    () =>
      Object.entries(metrics.ticketsByPriority).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        fill: PRIORITY_COLORS[name as keyof typeof PRIORITY_COLORS],
      })),
    [metrics],
  )

  const slaComplianceRate = ((metrics.totalTickets - metrics.breachedTickets) / metrics.totalTickets) * 100

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>SLA Compliance</CardDescription>
              <CheckCircle2 className="size-4 text-green-600" />
            </div>
            <CardTitle className="text-3xl text-green-600">{slaComplianceRate.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="size-3" />
              <span>Above target (95%)</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Routing Accuracy</CardDescription>
              <Target className="size-4 text-blue-600" />
            </div>
            <CardTitle className="text-3xl text-blue-600">{(metrics.routingAccuracy * 100).toFixed(0)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <TrendingUp className="size-3" />
              <span>Meeting target</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Avg Resolution Time</CardDescription>
              <Clock className="size-4 text-amber-600" />
            </div>
            <CardTitle className="text-3xl text-amber-600">{metrics.averageResolutionTime.toFixed(1)}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <TrendingDown className="size-3" />
              <span>Improving</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>SLA Breaches</CardDescription>
              <AlertTriangle className="size-4 text-red-600" />
            </div>
            <CardTitle className="text-3xl text-red-600">{metrics.breachedTickets}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-slate-600">
              {((metrics.breachedTickets / metrics.totalTickets) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
            <CardDescription>Distribution of tickets across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tickets by Priority</CardTitle>
            <CardDescription>Priority distribution of all tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SLA Performance Details */}
      <Card>
        <CardHeader>
          <CardTitle>SLA Performance by Category</CardTitle>
          <CardDescription>Detailed breakdown of SLA compliance across categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(metrics.ticketsByCategory).map(([category, count]) => {
              const categoryTickets = tickets.filter((t) => t.category === category)
              const breached = categoryTickets.filter((t) => t.slaBreach).length
              const compliance = count > 0 ? ((count - breached) / count) * 100 : 100

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: COLORS[category as keyof typeof COLORS] }}
                      />
                      <span className="font-medium capitalize">{category}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-600">
                        {count} tickets • {breached} breached
                      </span>
                      <span className={`font-semibold ${compliance >= 95 ? "text-green-600" : "text-red-600"}`}>
                        {compliance.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${compliance >= 95 ? "bg-green-500" : "bg-red-500"}`}
                      style={{ width: `${compliance}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
