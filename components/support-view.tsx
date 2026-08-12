"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LifeBuoy, MessageSquare, PhoneCall, HelpCircle, Check, FileText } from "lucide-react"

const faqs = [
  {
    q: "How does Faro calculate customer churn risk?",
    a: "Faro analyzes 14+ signals across loan repayment history, in-app intent (foreclosure downloads, rate calculator usage), service tickets, and macro market changes (repo rate cuts, gold prices) to predict disengagement 10–15 days early.",
  },
  {
    q: "Why are some customers flagged as Critical?",
    a: "Critical flags are assigned when a customer shows high intent to leave within 48 hours (e.g., requested foreclosure statement or missed consecutive EMIs while rate-shopping).",
  },
  {
    q: "How should I use the AI Conversation Guidance during a call?",
    a: "Before dialing, review the opener script and talking points. Lead with empathy, acknowledge any open service tickets first, and present the pre-approved loyalty rate or realignment offer.",
  },
  {
    q: "Can I log call notes back into the system?",
    a: "Yes! After completing a call, click 'Call' or 'View Profile' and select 'Record Outcome' to automatically update portfolio health scores.",
  },
]

export function SupportView() {
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketDesc, setTicketDesc] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!ticketSubject.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setTicketSubject("")
      setTicketDesc("")
    }, 3000)
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2">
          <LifeBuoy className="size-5 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Support & Help Center</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Need help using Faro RM Copilot? Find quick guides, FAQs, or contact our internal support desk.
        </p>
      </div>

      {/* Quick Access Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <PhoneCall className="size-5 text-primary" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Desk Hotline</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Internal extension: 4891</p>
          <p className="mt-2 text-xs font-mono text-primary">+91 20 4910 2841</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <MessageSquare className="size-5 text-primary" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">IT & Data Helpdesk</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Mon–Sat, 8:00 AM – 8:00 PM</p>
          <p className="mt-2 text-xs font-mono text-primary">support@nbfc-faro.internal</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <FileText className="size-5 text-primary" />
          <h3 className="mt-2 text-sm font-semibold text-foreground">Copilot Playbook</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">Best practices for RMs</p>
          <button className="mt-2 text-xs font-semibold text-primary hover:underline">
            Download PDF Guide →
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-8 rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <HelpCircle className="size-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h2>
        </div>

        <div className="mt-4 divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={i} className="py-3.5 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold text-foreground">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Support Ticket */}
      <section className="mt-6 rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">Submit a Support Ticket</h2>
        <p className="text-xs text-muted-foreground">Report an issue with data sync, customer assignment, or AI recommendations.</p>

        {submitted ? (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-success/10 p-4 text-sm font-semibold text-success">
            <Check className="size-5" /> Ticket submitted successfully! Support team will respond within 2 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground">Subject</label>
              <input
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Account foreclosure signal delay for Anjali Deshmukh"
                className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary/40"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">Description</label>
              <textarea
                value={ticketDesc}
                onChange={(e) => setTicketDesc(e.target.value)}
                placeholder="Provide details about the issue..."
                rows={3}
                className="mt-1 w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-primary/40"
              />
            </div>

            <Button type="submit" className="font-semibold">
              Submit Ticket
            </Button>
          </form>
        )}
      </section>
    </div>
  )
}
