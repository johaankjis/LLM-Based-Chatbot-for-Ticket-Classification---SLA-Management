"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, Sparkles } from "lucide-react"
import { submitTicket } from "@/app/actions/ticket-actions"
import type { ClassificationResult } from "@/lib/llm-classifier"

export function TicketSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{
    ticketId: string
    classification: ClassificationResult
  } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const response = await submitTicket(formData)

    setIsSubmitting(false)
    setResult(response)

    // Reset form
    e.currentTarget.reset()
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Submit a Support Ticket</CardTitle>
          <CardDescription>Describe your issue and we'll route it to the right team automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Issue Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of your issue"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please provide as much detail as possible about your issue..."
                rows={6}
                required
                disabled={isSubmitting}
                className="resize-none"
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 size-4" />
                  Submit Ticket
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Message */}
      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 text-green-600" />
              <CardTitle className="text-green-900">Ticket Submitted Successfully!</CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Your ticket has been classified and routed to the appropriate team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-green-900">Ticket ID</p>
                <p className="text-lg font-semibold text-green-700">{result.ticketId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Category</p>
                <p className="text-lg font-semibold text-green-700 capitalize">{result.classification.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Priority</p>
                <p className="text-lg font-semibold text-green-700 capitalize">{result.classification.priority}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-green-900">Assigned To</p>
                <p className="text-lg font-semibold text-green-700">{result.classification.suggestedTeam}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-green-200">
              <p className="text-sm font-medium text-green-900 mb-2">AI Classification Reasoning</p>
              <p className="text-sm text-green-700">{result.classification.reasoning}</p>
              <p className="text-xs text-green-600 mt-2">
                Confidence: {Math.round(result.classification.confidence * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
