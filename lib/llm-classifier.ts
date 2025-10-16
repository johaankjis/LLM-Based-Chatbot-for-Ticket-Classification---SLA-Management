import type { TicketCategory, TicketPriority } from "./types"

export interface ClassificationResult {
  category: TicketCategory
  priority: TicketPriority
  confidence: number
  reasoning: string
  suggestedTeam: string
}

// Simulated LLM classification using keyword matching
// In production, this would call OpenAI API with LangChain
export async function classifyTicket(title: string, description: string): Promise<ClassificationResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const text = `${title} ${description}`.toLowerCase()

  // Category classification
  let category: TicketCategory = "other"
  let confidence = 0.85

  if (text.match(/laptop|keyboard|mouse|monitor|printer|hardware|screen|device/)) {
    category = "hardware"
    confidence = 0.95
  } else if (text.match(/software|application|app|install|update|crash|bug|license/)) {
    category = "software"
    confidence = 0.93
  } else if (text.match(/network|vpn|internet|wifi|connection|email|sync/)) {
    category = "network"
    confidence = 0.91
  } else if (text.match(/password|access|login|account|permission|authentication|locked/)) {
    category = "access"
    confidence = 0.94
  }

  // Priority classification
  let priority: TicketPriority = "medium"

  if (text.match(/urgent|critical|emergency|down|outage|cannot work/)) {
    priority = "critical"
  } else if (text.match(/important|asap|high priority|blocking/)) {
    priority = "high"
  } else if (text.match(/minor|low priority|when possible/)) {
    priority = "low"
  }

  // Team assignment
  const teamMap: Record<TicketCategory, string> = {
    hardware: "Hardware Team",
    software: "Support Team A",
    network: "Network Team",
    access: "Security Team",
    other: "Support Team B",
  }

  const suggestedTeam = teamMap[category]

  const reasoning =
    `Analyzed ticket content and identified key indicators for ${category} category. ` +
    `Priority set to ${priority} based on urgency indicators. ` +
    `Recommended routing to ${suggestedTeam} based on expertise match.`

  return {
    category,
    priority,
    confidence,
    reasoning,
    suggestedTeam,
  }
}
