import { NextResponse } from "next/server"
import { classifyTicket } from "@/lib/llm-classifier"

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    const result = await classifyTicket(title, description)

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Classification error:", error)
    return NextResponse.json({ error: "Classification failed" }, { status: 500 })
  }
}
