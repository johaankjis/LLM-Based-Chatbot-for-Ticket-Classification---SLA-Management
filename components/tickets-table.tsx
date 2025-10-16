"use client"

import type { Ticket } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"

interface TicketsTableProps {
  tickets: Ticket[]
}

export function TicketsTable({ tickets }: TicketsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
      const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [tickets, searchQuery, statusFilter, categoryFilter])

  const stats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "open").length,
      inProgress: tickets.filter((t) => t.status === "in-progress").length,
      breached: tickets.filter((t) => t.slaBreach).length,
    }
  }, [tickets])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Tickets</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Open Tickets</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.open}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>In Progress</CardDescription>
            <CardTitle className="text-3xl text-amber-600">{stats.inProgress}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>SLA Breached</CardDescription>
            <CardTitle className="text-3xl text-red-600">{stats.breached}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets</CardTitle>
          <CardDescription>View and manage all support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:max-w-sm"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hardware">Hardware</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="network">Network</SelectItem>
                <SelectItem value="access">Access</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SLA</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-500 py-8">
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                      <TableCell className="max-w-xs truncate">{ticket.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {ticket.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ticket.priority === "critical" || ticket.priority === "high" ? "destructive" : "secondary"
                          }
                          className="capitalize"
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {ticket.status === "open" && <Clock className="size-4 text-blue-500" />}
                          {ticket.status === "in-progress" && <AlertCircle className="size-4 text-amber-500" />}
                          {ticket.status === "resolved" && <CheckCircle2 className="size-4 text-green-500" />}
                          {ticket.status === "closed" && <XCircle className="size-4 text-slate-400" />}
                          <span className="text-sm capitalize">{ticket.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {ticket.slaBreach ? (
                          <Badge variant="destructive">Breached</Badge>
                        ) : (
                          <Badge variant="secondary">On Track</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {formatDistanceToNow(ticket.submittedAt, { addSuffix: true })}
                      </TableCell>
                      <TableCell className="text-sm">{ticket.assignedTo || "Unassigned"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
