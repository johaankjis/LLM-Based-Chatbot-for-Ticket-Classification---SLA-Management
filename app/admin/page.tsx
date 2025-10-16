import { getTickets } from "@/lib/mock-data"
import { TicketsTable } from "@/components/tickets-table"
import { Button } from "@/components/ui/button"
import { Ticket, Home, Settings } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassificationDemo } from "@/components/classification-demo"
import { RoutingLogsTable } from "@/components/routing-logs-table"
import { SLAAnalytics } from "@/components/sla-analytics"

export default function AdminPage() {
  const tickets = getTickets()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Ticket className="size-5 text-white" />
            </div>
            <span className="font-semibold text-lg">SupportAI Admin</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="mr-2 size-4" />
                Home
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Settings className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <p className="text-slate-600">Manage tickets, view routing logs, and test the classification system</p>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets">All Tickets</TabsTrigger>
            <TabsTrigger value="routing">Routing Logs</TabsTrigger>
            <TabsTrigger value="classifier">Test Classifier</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <TicketsTable tickets={tickets} />
          </TabsContent>

          <TabsContent value="routing" className="space-y-4">
            <RoutingLogsTable />
          </TabsContent>

          <TabsContent value="classifier" className="space-y-4">
            <ClassificationDemo />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <SLAAnalytics tickets={tickets} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
