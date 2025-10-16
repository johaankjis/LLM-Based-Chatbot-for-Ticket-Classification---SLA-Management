"use client"

import { getRoutingLogs } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export function RoutingLogsTable() {
  const logs = getRoutingLogs()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Routing Logs</CardTitle>
        <CardDescription>View all automated ticket routing decisions made by the AI</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Reasoning</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.ticketId}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: `${log.confidence * 100}%` }} />
                      </div>
                      <span className="text-sm font-medium">{Math.round(log.confidence * 100)}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{log.assignedTo}</TableCell>
                  <TableCell className="max-w-md text-sm text-slate-600">{log.reasoning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
