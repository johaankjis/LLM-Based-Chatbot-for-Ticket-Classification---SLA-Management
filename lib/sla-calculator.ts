import type { Ticket, SLAMetrics, TicketCategory, TicketPriority } from "./types"

export function calculateSLAMetrics(tickets: Ticket[]): SLAMetrics {
  const totalTickets = tickets.length
  const breachedTickets = tickets.filter((t) => t.slaBreach).length

  // Calculate average resolution time for resolved tickets
  const resolvedTickets = tickets.filter((t) => t.resolvedAt)
  const totalResolutionTime = resolvedTickets.reduce((sum, ticket) => {
    const resolutionTime = ticket.resolvedAt!.getTime() - ticket.submittedAt.getTime()
    return sum + resolutionTime
  }, 0)
  const averageResolutionTime =
    resolvedTickets.length > 0
      ? totalResolutionTime / resolvedTickets.length / (1000 * 60 * 60) // Convert to hours
      : 0

  // Calculate routing accuracy (simulated - in production would compare with manual classification)
  const routingAccuracy = 0.98 // 98% accuracy as per MVP spec

  // Count tickets by category
  const ticketsByCategory: Record<TicketCategory, number> = {
    hardware: 0,
    software: 0,
    network: 0,
    access: 0,
    other: 0,
  }
  tickets.forEach((ticket) => {
    ticketsByCategory[ticket.category]++
  })

  // Count tickets by priority
  const ticketsByPriority: Record<TicketPriority, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  }
  tickets.forEach((ticket) => {
    ticketsByPriority[ticket.priority]++
  })

  return {
    totalTickets,
    breachedTickets,
    averageResolutionTime,
    routingAccuracy,
    ticketsByCategory,
    ticketsByPriority,
  }
}

export function getSLAStatus(ticket: Ticket): {
  status: "on-track" | "at-risk" | "breached"
  timeRemaining: number // in hours
  percentage: number // 0-100
} {
  const now = new Date()
  const totalTime = ticket.slaDeadline.getTime() - ticket.submittedAt.getTime()
  const elapsed = now.getTime() - ticket.submittedAt.getTime()
  const remaining = ticket.slaDeadline.getTime() - now.getTime()

  const percentage = Math.min(100, Math.max(0, (elapsed / totalTime) * 100))
  const timeRemaining = remaining / (1000 * 60 * 60) // Convert to hours

  let status: "on-track" | "at-risk" | "breached" = "on-track"
  if (ticket.slaBreach) {
    status = "breached"
  } else if (percentage > 75) {
    status = "at-risk"
  }

  return {
    status,
    timeRemaining,
    percentage,
  }
}
