"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2, Brain, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { ClassificationResult } from "@/lib/llm-classifier"

export function ClassificationDemo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isClassifying, setIsClassifying] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)

  async function handleClassify() {
    if (!title || !description) return

    setIsClassifying(true)
    setResult(null)

    // Call the classification API
    const response = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    })

    const data = await response.json()
    setResult(data)
    setIsClassifying(false)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="size-5" />
            Test Classification
          </CardTitle>
          <CardDescription>Enter ticket details to see how the AI classifies it</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="demo-title">Ticket Title</Label>
            <Input
              id="demo-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Cannot connect to VPN"
              disabled={isClassifying}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="demo-description">Description</Label>
            <Textarea
              id="demo-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
              disabled={isClassifying}
            />
          </div>

          <Button onClick={handleClassify} disabled={isClassifying || !title || !description} className="w-full">
            {isClassifying ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Brain className="mr-2 size-4" />
                Classify Ticket
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="size-5" />
            Classification Results
          </CardTitle>
          <CardDescription>AI-powered analysis and routing recommendation</CardDescription>
        </CardHeader>
        <CardContent>
          {!result ? (
            <div className="flex items-center justify-center h-64 text-slate-400">
              <p className="text-sm">Results will appear here after classification</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Category</p>
                  <Badge variant="secondary" className="text-base capitalize">
                    {result.category}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Priority</p>
                  <Badge
                    variant={result.priority === "critical" || result.priority === "high" ? "destructive" : "secondary"}
                    className="text-base capitalize"
                  >
                    {result.priority}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">Suggested Team</p>
                <p className="font-semibold text-slate-900">{result.suggestedTeam}</p>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">Confidence Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{Math.round(result.confidence * 100)}%</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-slate-600 mb-2">AI Reasoning</p>
                <p className="text-sm text-slate-700 leading-relaxed">{result.reasoning}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
