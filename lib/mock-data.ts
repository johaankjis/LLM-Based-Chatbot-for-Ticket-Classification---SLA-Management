import type { Ticket, RoutingLog, Notification, TicketCategory, TicketPriority, TicketStatus } from "./types"

const categories: TicketCategory[] = ["hardware", "software", "network", "access", "other"]
const priorities: TicketPriority[] = ["low", "medium", "high", "critical"]
const statuses: TicketStatus[] = ["open", "in-progress", "resolved", "closed"]
const users = ["john.doe@company.com", "jane.smith@company.com", "bob.wilson@company.com", "alice.chen@company.com"]
const agents = ["Support Team A", "Support Team B", "Network Team", "Security Team", "Hardware Team"]

const ticketTitles: Record<TicketCategory, string[]> = {
  hardware: [
    "Laptop screen flickering",
    "Keyboard keys not working",
    "Mouse not responding",
    "Monitor display issues",
    "Printer paper jam",
  ],
  software: [
    "Application crashes on startup",
    "Unable to install software update",
    "License activation failed",
    "Slow application performance",
    "Data sync issues",
  ],
  network: [
    "Cannot connect to VPN",
    "Slow internet connection",
    "WiFi keeps disconnecting",
    "Cannot access shared drive",
    "Email not syncing",
  ],
  access: [
    "Password reset required",
    "Account locked out",
    "Need access to new system",
    "Permission denied error",
    "Two-factor authentication issues",
  ],
  other: ["General inquiry", "Feature request", "Documentation needed", "Training request", "Feedback submission"],
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function randomDate(daysAgo: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  date.setHours(Math.floor(Math.random() * 24))
  date.setMinutes(Math.floor(Math.random() * 60))
  return date
}

function calculateSLADeadline(submittedAt: Date, priority: TicketPriority): Date {
  const deadline = new Date(submittedAt)
  const hours = priority === "critical" ? 4 : priority === "high" ? 8 : priority === "medium" ? 24 : 48
  deadline.setHours(deadline.getHours() + hours)
  return deadline
}

export function generateMockTickets(count = 50): Ticket[] {
  const tickets: Ticket[] = []

  for (let i = 0; i < count; i++) {
    const category = randomItem(categories)
    const priority = randomItem(priorities)
    const status = randomItem(statuses)
    const submittedAt = randomDate(30)
    const slaDeadline = calculateSLADeadline(submittedAt, priority)
    const now = new Date()
    const slaBreach = status !== "resolved" && status !== "closed" && now > slaDeadline

    const ticket: Ticket = {
      id: `TKT-${String(i + 1).padStart(5, "0")}`,
      title: randomItem(ticketTitles[category]),
      description: `Detailed description of the ${category} issue. User is experiencing problems and needs assistance.`,
      category,
      priority,
      status,
      submittedBy: randomItem(users),
      submittedAt,
      assignedTo: status !== "open" ? randomItem(agents) : undefined,
      resolvedAt: status === "resolved" || status === "closed" ? randomDate(5) : undefined,
      slaDeadline,
      slaBreach,
      confidence: Math.random() * 0.15 + 0.85, // 85-100% confidence
    }

    tickets.push(ticket)
  }

  return tickets.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
}

export function generateMockRoutingLogs(tickets: Ticket[]): RoutingLog[] {
  const logs: RoutingLog[] = []

  tickets.forEach((ticket) => {
    if (ticket.assignedTo) {
      logs.push({
        id: `LOG-${ticket.id}`,
        ticketId: ticket.id,
        timestamp: ticket.submittedAt,
        action: "auto_routed",
        category: ticket.category,
        confidence: ticket.confidence || 0.95,
        assignedTo: ticket.assignedTo,
        reasoning: `Classified as ${ticket.category} with ${Math.round((ticket.confidence || 0.95) * 100)}% confidence based on ticket content analysis.`,
      })
    }
  })

  return logs
}

export function generateMockNotifications(tickets: Ticket[]): Notification[] {
  const notifications: Notification[] = []

  tickets.forEach((ticket) => {
    if (ticket.assignedTo) {
      notifications.push({
        id: `NOTIF-${ticket.id}-slack`,
        ticketId: ticket.id,
        type: "slack",
        recipient: ticket.assignedTo,
        message: `New ticket assigned: ${ticket.title} (${ticket.priority} priority)`,
        sentAt: ticket.submittedAt,
        status: "sent",
      })

      notifications.push({
        id: `NOTIF-${ticket.id}-jira`,
        ticketId: ticket.id,
        type: "jira",
        recipient: ticket.assignedTo,
        message: `Ticket ${ticket.id} created in Jira`,
        sentAt: ticket.submittedAt,
        status: "sent",
      })
    }
  })

  return notifications
}

// Initialize mock data
let mockTickets = generateMockTickets(50)
const mockRoutingLogs = generateMockRoutingLogs(mockTickets)
const mockNotifications = generateMockNotifications(mockTickets)

export function getTickets(): Ticket[] {
  return mockTickets
}

export function getTicketById(id: string): Ticket | undefined {
  return mockTickets.find((t) => t.id === id)
}

export function getRoutingLogs(): RoutingLog[] {
  return mockRoutingLogs
}

export function getNotifications(): Notification[] {
  return mockNotifications
}

export function addTicket(ticket: Omit<Ticket, "id" | "submittedAt" | "slaDeadline" | "slaBreach">): Ticket {
  const id = `TKT-${String(mockTickets.length + 1).padStart(5, "0")}`
  const submittedAt = new Date()
  const slaDeadline = calculateSLADeadline(submittedAt, ticket.priority)

  const newTicket: Ticket = {
    ...ticket,
    id,
    submittedAt,
    slaDeadline,
    slaBreach: false,
  }

  mockTickets = [newTicket, ...mockTickets]
  return newTicket
}

export function updateTicket(id: string, updates: Partial<Ticket>): Ticket | undefined {
  const index = mockTickets.findIndex((t) => t.id === id)
  if (index === -1) return undefined

  mockTickets[index] = { ...mockTickets[index], ...updates }
  return mockTickets[index]
}
