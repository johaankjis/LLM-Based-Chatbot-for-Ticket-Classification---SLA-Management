import { TicketSubmissionForm } from "@/components/ticket-submission-form"
import { Button } from "@/components/ui/button"
import { Ticket, AlertCircle, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Ticket className="size-5 text-white" />
            </div>
            <span className="font-semibold text-lg">SupportAI</span>
          </div>
          <Link href="/admin">
            <Button variant="outline">Admin Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
            <Zap className="size-4" />
            AI-Powered Ticket Classification
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            Get Help Fast with Intelligent Support
          </h1>
          <p className="text-lg text-slate-600 text-pretty">
            Submit your support ticket and our AI will automatically classify and route it to the right team in seconds.
            Experience 98% routing accuracy with instant SLA tracking.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="size-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Zap className="size-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Instant Classification</h3>
            <p className="text-sm text-slate-600">
              AI analyzes your ticket and routes it to the right team automatically
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="size-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <AlertCircle className="size-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">SLA Tracking</h3>
            <p className="text-sm text-slate-600">Real-time monitoring ensures your ticket is resolved on time</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="size-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
              <Ticket className="size-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Smart Routing</h3>
            <p className="text-sm text-slate-600">98% accuracy in matching tickets with the right support team</p>
          </div>
        </div>

        {/* Ticket Form */}
        <div className="max-w-2xl mx-auto">
          <TicketSubmissionForm />
        </div>
      </section>
    </div>
  )
}
