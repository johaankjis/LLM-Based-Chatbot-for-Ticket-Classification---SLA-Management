export type TicketPriority = "low" | "medium" | "high" | "critical"
export type TicketStatus = "open" | "in-progress" | "resolved" | "closed"
export type TicketCategory = "hardware" | "software" | "network" | "access" | "other"

export interface Ticket {
  id: string
  title: string
  description: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  submittedBy: string
  submittedAt: Date
  assignedTo?: string
  resolvedAt?: Date
  slaDeadline: Date
  slaBreach: boolean
  confidence?: number
}

export interface RoutingLog {
  id: string
  ticketId: string
  timestamp: Date
  action: string
  category: TicketCategory
  confidence: number
  assignedTo: string
  reasoning: string
}

export interface Notification {
  id: string
  ticketId: string
  type: "slack" | "jira" | "email"
  recipient: string
  message: string
  sentAt: Date
  status: "sent" | "failed"
}

export interface SLAMetrics {
  totalTickets: number
  breachedTickets: number
  averageResolutionTime: number
  routingAccuracy: number
  ticketsByCategory: Record<TicketCategory, number>
  ticketsByPriority: Record<TicketPriority, number>
}
