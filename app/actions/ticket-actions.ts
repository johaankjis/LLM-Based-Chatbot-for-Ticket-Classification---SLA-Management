"use server"

import { addTicket } from "@/lib/mock-data"
import { classifyTicket } from "@/lib/llm-classifier"

export async function submitTicket(formData: FormData) {
  const email = formData.get("email") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  // Classify ticket using LLM
  const classification = await classifyTicket(title, description)

  // Create ticket with classification results
  const ticket = addTicket({
    title,
    description,
    category: classification.category,
    priority: classification.priority,
    status: "open",
    submittedBy: email,
    assignedTo: classification.suggestedTeam,
    confidence: classification.confidence,
  })

  return {
    ticketId: ticket.id,
    classification,
  }
}
