export type RiskLevel = "critical" | "high" | "medium" | "low"

export type SignalCategory = "behavioral" | "market" | "risk" | "opportunity"

export type LiveSignal = {
  id: string
  category: SignalCategory
  customerId?: string
  customerName: string
  initials: string
  avatarColor: string
  segment: string
  product: string
  value: number // annual revenue / opportunity size (INR)
  headline: string // what happened
  detail: string // more context
  triggeredAt: string // "8 min ago"
  freshnessPct: number // 0-100 acting window remaining
  window: string // "Act within 2 hrs"
  urgency: RiskLevel
  channel: "Call"
  cockpit: {
    who: string[] // snapshot lines
    why: string[] // why-now bullets
    what: {
      opener: string
      points: string[]
      offer: string
      avoid: string
    }
  }
}

export const signalCategoryConfig: Record<
  SignalCategory,
  { label: string; short: string; color: string }
> = {
  behavioral: { label: "In-app intent", short: "Intent", color: "var(--primary)" },
  market: { label: "Market signal", short: "Market", color: "var(--chart-3)" },
  risk: { label: "Risk / lifecycle", short: "Risk", color: "var(--danger)" },
  opportunity: { label: "Opportunity", short: "Opportunity", color: "var(--success)" },
}

export type MarketEvent = {
  id: string
  title: string
  detail: string
  time: string
  direction: "up" | "down"
  metric: string
  matched: number
  play: string
}

export const marketEvents: MarketEvent[] = [
  {
    id: "m1",
    title: "RBI cuts repo rate 25 bps",
    detail: "Policy rate now 6.25%. Floating-rate borrowers become refinance targets.",
    time: "Today, 10:02",
    direction: "down",
    metric: "6.25%",
    matched: 34,
    play: "Pre-empt balance transfers with loyalty rate locks.",
  },
  {
    id: "m2",
    title: "Gold price up 4.1% this week",
    detail: "Higher collateral value unlocks gold-loan top-ups.",
    time: "Today, 09:15",
    direction: "up",
    metric: "₹73,400/10g",
    matched: 21,
    play: "Offer pre-approved top-ups at new valuation.",
  },
  {
    id: "m3",
    title: "Equity markets dip 2.3%",
    detail: "HNIs likely holding idle cash — deployment window open.",
    time: "Yesterday, 15:40",
    direction: "down",
    metric: "Nifty −2.3%",
    matched: 12,
    play: "Position FD / structured products to HNI segment.",
  },
]

export const liveSignals: LiveSignal[] = [
  {
    id: "s1",
    category: "behavioral",
    customerId: "c1",
    customerName: "Anjali Deshmukh",
    initials: "AD",
    avatarColor: "var(--danger)",
    segment: "SME — Working Capital",
    product: "Business Loan · ₹42L",
    value: 480000,
    headline: "Requested foreclosure statement in-app",
    detail: "Downloaded a full foreclosure quote 8 minutes ago — a strong pre-switch signal.",
    triggeredAt: "8 min ago",
    freshnessPct: 92,
    window: "Call within 1 hr",
    urgency: "critical",
    channel: "Call",
    cockpit: {
      who: [
        "Anjali Deshmukh · Deshmukh Textiles Pvt Ltd",
        "4 yr 2 mo relationship · ₹42L business loan",
        "₹4.8L annual revenue · Health 34, churn risk 87%",
      ],
      why: [
        "Pulled a foreclosure statement 8 min ago (live intent).",
        "Two late EMIs in a row — likely rate-shopping a balance transfer.",
        "Window is short: foreclosure quotes usually act within 48 hrs.",
      ],
      what: {
        opener:
          "Hi Anjali, it's Faro from your relationship desk — I noticed you were reviewing your loan account and wanted to personally help before you make any decision.",
        points: [
          "Acknowledge the account review without sounding like surveillance.",
          "Offer a loyalty rate review (up to 40 bps) reserved for long-tenure clients.",
          "Realign the EMI due date to her receivables cycle.",
        ],
        offer: "40 bps loyalty rate review + due-date realignment, valid 7 days.",
        avoid: "Don't mention the word 'foreclosure' first — let her raise it.",
      },
    },
  },
  {
    id: "s2",
    category: "behavioral",
    customerId: "c3",
    customerName: "Priya Nair",
    initials: "PN",
    avatarColor: "var(--warning)",
    segment: "Housing Finance",
    product: "Home Loan · ₹65L",
    value: 520000,
    headline: "Used EMI calculator 3 times in 20 min",
    detail: "Ran the refinance EMI calculator repeatedly right after the repo-rate news.",
    triggeredAt: "26 min ago",
    freshnessPct: 78,
    window: "Reach out today",
    urgency: "high",
    channel: "Call",
    cockpit: {
      who: [
        "Priya Nair · Self-employed professional",
        "6 yr 1 mo relationship · ₹65L home loan",
        "72 consecutive on-time EMIs · very reliable",
      ],
      why: [
        "Ran the EMI calculator 3x in 20 min after the repo cut.",
        "Rate-sensitive: opened the rate comparison page 5x this fortnight.",
        "Competitors will pitch her within days — move first.",
      ],
      what: {
        opener:
          "Hi Priya, given your excellent 6-year track record, I wanted to share a loyalty rate we reserve for our best customers before you hear it elsewhere.",
        points: [
          "Recognize the 72 on-time EMIs explicitly.",
          "Present a rate lock that beats visible refinancing options.",
          "Reach out directly via call — she appreciates proactive updates.",
        ],
        offer: "Loyalty rate lock for 12 months, zero processing fee.",
        avoid: "Don't bundle a cross-sell — it reads as opportunistic right now.",
      },
    },
  },
  {
    id: "s3",
    category: "risk",
    customerId: "c2",
    customerName: "Rahul Menon",
    initials: "RM",
    avatarColor: "var(--warning)",
    segment: "Vehicle Finance",
    product: "Commercial Vehicle Loan · ₹28L",
    value: 310000,
    headline: "EMI partially paid — shortfall detected",
    detail: "Only 60% of this month's EMI cleared; service ticket still open 9 days.",
    triggeredAt: "1 hr ago",
    freshnessPct: 64,
    window: "Resolve, then call today",
    urgency: "high",
    channel: "Call",
    cockpit: {
      who: [
        "Rahul Menon · Menon Logistics",
        "2 yr 8 mo relationship · ₹28L CV loan",
        "NPS dropped to 4/10 · 2 open service tickets",
      ],
      why: [
        "Partial EMI this month points to a cash-flow squeeze.",
        "Insurance-renewal ticket open 9 days — trust is eroding.",
        "Prepayment enquiry last week signals exit consideration.",
      ],
      what: {
        opener:
          "Hi Rahul, I've already pushed your insurance renewal to the front of the queue — and I want to make the EMI side easy for you this month.",
        points: [
          "Lead with the resolved ticket, not an apology loop.",
          "Offer a one-month EMI step-down aligned to fleet receivables.",
          "Confirm the fleet-expansion plan discussed earlier this year.",
        ],
        offer: "One-month EMI realignment + waived fee on next top-up.",
        avoid: "Don't ask for the shortfall upfront — solve trust first.",
      },
    },
  },
  {
    id: "s4",
    category: "market",
    customerId: "c4",
    customerName: "Vikram Shah",
    initials: "VS",
    avatarColor: "var(--warning)",
    segment: "Gold Loan",
    product: "Gold Loan · ₹18L",
    value: 190000,
    headline: "Gold price jump unlocks a top-up",
    detail: "Collateral revaluation allows a ₹3.5L top-up at current prices; renewal due in 12 days.",
    triggeredAt: "2 hrs ago",
    freshnessPct: 55,
    window: "This week",
    urgency: "medium",
    channel: "Call",
    cockpit: {
      who: [
        "Vikram Shah · Shah Jewellers",
        "1 yr 5 mo relationship · ₹18L gold loan",
        "Renewal due in 12 days · engagement rising",
      ],
      why: [
        "Gold up 4.1% this week — collateral value increased.",
        "Renewal due in 12 days; combine both in one conversation.",
        "3 branch visits last month — he's already leaning in.",
      ],
      what: {
        opener:
          "Hi Vikram, good news — with gold prices up this week, your holding now supports a larger facility, and your renewal is coming up too.",
        points: [
          "Frame the top-up as unlocked value, not new debt.",
          "Bundle renewal + top-up into one paperwork-light step.",
          "Offer an 8% limit increase at the new valuation.",
        ],
        offer: "Pre-approved renewal + ₹3.5L top-up at current valuation.",
        avoid: "Don't overload with product pitches — keep it to the top-up.",
      },
    },
  },
  {
    id: "s5",
    category: "opportunity",
    customerName: "Kabir Malhotra",
    initials: "KM",
    avatarColor: "var(--success)",
    segment: "HNI — Wealth",
    product: "Portfolio · ₹2.4Cr",
    value: 1450000,
    headline: "₹40L idle balance held for 9 days",
    detail: "Large cash balance sitting idle after the equity dip — deployment window open.",
    triggeredAt: "3 hrs ago",
    freshnessPct: 48,
    window: "Reach out today",
    urgency: "high",
    channel: "Call",
    cockpit: {
      who: [
        "Kabir Malhotra · HNI wealth client",
        "₹2.4Cr relationship · ₹14.5L annual revenue",
        "Priority-tier · responds best to a direct call",
      ],
      why: [
        "₹40L idle in savings for 9 days after the market dip.",
        "Equity −2.3% — he's parked cash awaiting direction.",
        "HNI attention window is short; a competitor RM may call.",
      ],
      what: {
        opener:
          "Hi Kabir, with the recent market move I wanted to reach out personally on how to make your idle balance work harder without locking you in.",
        points: [
          "Acknowledge the market context intelligently, not alarmingly.",
          "Present a laddered FD + short-duration debt option.",
          "Offer a 15-min advisory call with the wealth desk.",
        ],
        offer: "Preferential HNI FD rate + structured-product briefing.",
        avoid: "Don't push equity products while he's risk-averse.",
      },
    },
  },
  {
    id: "s6",
    category: "opportunity",
    customerId: "c5",
    customerName: "Fatima Sheikh",
    initials: "FS",
    avatarColor: "var(--success)",
    segment: "Consumer Finance",
    product: "Consumer Durable Loan · ₹3.2L",
    value: 64000,
    headline: "Pre-approved personal loan eligibility unlocked",
    detail: "Strong repayment + high app engagement crossed the pre-approval threshold.",
    triggeredAt: "5 hrs ago",
    freshnessPct: 35,
    window: "This week",
    urgency: "low",
    channel: "Call",
    cockpit: {
      who: [
        "Fatima Sheikh · Sheikh Consumer Durables",
        "3 yr 3 mo relationship · health 81",
        "Weekly app user · accepted last cross-sell",
      ],
      why: [
        "Just crossed the pre-approved personal-loan threshold.",
        "High engagement + a recent insurance add-on show trust.",
        "Warm, low-risk — ideal moment for a soft upsell.",
      ],
      what: {
        opener:
          "Hi Fatima, thanks for being such an engaged customer — you've unlocked a pre-approved offer I wanted to share as a thank-you.",
        points: [
          "Thank her for the recent insurance add-on.",
          "Present the pre-approved personal loan at a preferential rate.",
          "Ask for a referral given her satisfaction.",
        ],
        offer: "Pre-approved personal loan + referral bonus.",
        avoid: "Don't over-follow-up — one friendly nudge is enough.",
      },
    },
  },
]

export type Signal = {
  label: string
  detail: string
  impact: "negative" | "positive" | "neutral"
  weight: number // 0-100 contribution to risk
}

export type ActivityPoint = {
  label: string
  value: number
}

export type TimelineEvent = {
  date: string
  title: string
  description: string
  type: "call" | "payment" | "app" | "service" | "alert"
}

export type Customer = {
  id: string
  name: string
  company: string
  segment: string
  product: string
  avatarColor: string
  initials: string
  priority: number
  healthScore: number // 0-100
  healthTrend: number // delta
  churnRisk: number // 0-100
  riskLevel: RiskLevel
  revenueImpact: number // annual INR
  relationshipTenure: string
  lastContact: string
  location: string
  reasons: Signal[]
  nextBestAction: {
    title: string
    detail: string
    channel: "Call"
    urgency: RiskLevel
  }
  conversationGuidance: {
    opener: string
    talkingPoints: string[]
    offer: string
    tone: string
  }
  activity: ActivityPoint[]
  timeline: TimelineEvent[]
}

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Anjali Deshmukh",
    company: "Deshmukh Textiles Pvt Ltd",
    segment: "SME — Working Capital",
    product: "Business Loan · ₹42L",
    avatarColor: "var(--danger)",
    initials: "AD",
    priority: 1,
    healthScore: 34,
    healthTrend: -18,
    churnRisk: 87,
    riskLevel: "critical",
    revenueImpact: 480000,
    relationshipTenure: "4 yrs 2 mo",
    lastContact: "23 days ago",
    location: "Pune, MH",
    reasons: [
      {
        label: "EMI paid late 2 months running",
        detail: "Both March and April EMIs cleared 6+ days after due date, first time in tenure.",
        impact: "negative",
        weight: 32,
      },
      {
        label: "App logins dropped 71%",
        detail: "Mobile app sessions fell from 14/mo to 4/mo over the last quarter.",
        impact: "negative",
        weight: 24,
      },
      {
        label: "Competitor balance-transfer enquiry",
        detail: "Requested a foreclosure statement on 12 Jul — a common pre-switch signal.",
        impact: "negative",
        weight: 21,
      },
      {
        label: "Long tenure & high value",
        detail: "4+ year relationship with strong historic repayment worth protecting.",
        impact: "positive",
        weight: 10,
      },
    ],
    nextBestAction: {
      title: "Call today to pre-empt balance transfer",
      detail:
        "Offer a rate review before the foreclosure completes. A 40 bps reduction retains ₹4.8L annual revenue.",
      channel: "Call",
      urgency: "critical",
    },
    conversationGuidance: {
      opener:
        "Hi Anjali, it's Faro from your relationship desk — I wanted to personally check in on how the textile season has been treating the business.",
      talkingPoints: [
        "Acknowledge the two recent late EMIs empathetically; ask if cash flow timing has shifted.",
        "Position a restructured due date aligned to her receivables cycle.",
        "Introduce a loyalty rate review (up to 40 bps) as a proactive thank-you for 4 years.",
      ],
      offer: "Due-date realignment + 40 bps loyalty rate review, valid for 7 days.",
      tone: "Warm, consultative, non-transactional.",
    },
    activity: [
      { label: "Feb", value: 14 },
      { label: "Mar", value: 11 },
      { label: "Apr", value: 8 },
      { label: "May", value: 6 },
      { label: "Jun", value: 5 },
      { label: "Jul", value: 4 },
    ],
    timeline: [
      { date: "12 Jul", title: "Foreclosure statement requested", description: "Via branch, no reason cited.", type: "alert" },
      { date: "05 Jul", title: "April EMI cleared (late)", description: "6 days past due date.", type: "payment" },
      { date: "18 Jun", title: "Missed scheduled call", description: "Did not answer quarterly review call.", type: "call" },
    ],
  },
  {
    id: "c2",
    name: "Rahul Menon",
    company: "Menon Logistics",
    segment: "Vehicle Finance",
    product: "Commercial Vehicle Loan · ₹28L",
    avatarColor: "var(--warning)",
    initials: "RM",
    priority: 2,
    healthScore: 48,
    healthTrend: -9,
    churnRisk: 68,
    riskLevel: "high",
    revenueImpact: 310000,
    relationshipTenure: "2 yrs 8 mo",
    lastContact: "11 days ago",
    location: "Kochi, KL",
    reasons: [
      {
        label: "2 unresolved service tickets",
        detail: "Insurance renewal query open for 9 days without resolution.",
        impact: "negative",
        weight: 30,
      },
      {
        label: "NPS dropped to 4/10",
        detail: "Latest survey score down from 8 last quarter.",
        impact: "negative",
        weight: 27,
      },
      {
        label: "Prepayment enquiry",
        detail: "Asked about part-prepayment charges last week.",
        impact: "negative",
        weight: 18,
      },
    ],
    nextBestAction: {
      title: "Resolve open service tickets, then call",
      detail: "Close the insurance renewal ticket first, then follow up personally to rebuild trust.",
      channel: "Call",
      urgency: "high",
    },
    conversationGuidance: {
      opener:
        "Hi Rahul, I saw your insurance renewal query was taking longer than it should — I've pushed it to the front of the queue.",
      talkingPoints: [
        "Lead with the resolution, not an apology loop.",
        "Confirm the fleet expansion plans discussed earlier this year.",
        "Explain part-prepayment options transparently to remove friction.",
      ],
      offer: "Waived processing fee on next top-up loan for fleet expansion.",
      tone: "Accountable, solution-first.",
    },
    activity: [
      { label: "Feb", value: 9 },
      { label: "Mar", value: 10 },
      { label: "Apr", value: 8 },
      { label: "May", value: 7 },
      { label: "Jun", value: 6 },
      { label: "Jul", value: 6 },
    ],
    timeline: [
      { date: "15 Jul", title: "Prepayment enquiry", description: "Asked about part-prepayment charges.", type: "service" },
      { date: "09 Jul", title: "Service ticket opened", description: "Insurance renewal — still open.", type: "service" },
      { date: "02 Jul", title: "NPS survey: 4/10", description: "Down from 8 last quarter.", type: "alert" },
    ],
  },
  {
    id: "c3",
    name: "Priya Nair",
    company: "Self-employed professional",
    segment: "Housing Finance",
    product: "Home Loan · ₹65L",
    avatarColor: "var(--warning)",
    initials: "PN",
    priority: 3,
    healthScore: 55,
    healthTrend: -6,
    churnRisk: 61,
    riskLevel: "high",
    revenueImpact: 520000,
    relationshipTenure: "6 yrs 1 mo",
    lastContact: "8 days ago",
    location: "Bengaluru, KA",
    reasons: [
      {
        label: "Rate-sensitive after repo change",
        detail: "Opened the rate comparison page 5 times in two weeks.",
        impact: "negative",
        weight: 29,
      },
      {
        label: "Cross-sell declined twice",
        detail: "Rejected top-up and insurance offers recently.",
        impact: "negative",
        weight: 20,
      },
      {
        label: "Consistent on-time EMIs",
        detail: "72 consecutive on-time payments — highly reliable.",
        impact: "positive",
        weight: 15,
      },
    ],
    nextBestAction: {
      title: "Call with personalized rate-retention offer",
      detail: "Pre-empt refinancing with a loyalty rate lock. Frame around her strong repayment record.",
      channel: "Call",
      urgency: "high",
    },
    conversationGuidance: {
      opener:
        "Hi Priya, given your excellent 6-year repayment record, I wanted to share a loyalty rate we reserve for our best customers.",
      talkingPoints: [
        "Recognize the 72 on-time EMIs explicitly.",
        "Present a rate lock that beats visible refinancing options.",
        "Avoid pushing cross-sell in the same conversation.",
      ],
      offer: "Loyalty rate lock for 12 months, no processing fee.",
      tone: "Appreciative, low-pressure.",
    },
    activity: [
      { label: "Feb", value: 12 },
      { label: "Mar", value: 12 },
      { label: "Apr", value: 13 },
      { label: "May", value: 11 },
      { label: "Jun", value: 10 },
      { label: "Jul", value: 9 },
    ],
    timeline: [
      { date: "16 Jul", title: "Viewed rate comparison", description: "5th visit in two weeks.", type: "app" },
      { date: "10 Jul", title: "Declined top-up offer", description: "Second decline this quarter.", type: "service" },
      { date: "01 Jul", title: "EMI paid on time", description: "72nd consecutive on-time payment.", type: "payment" },
    ],
  },
  {
    id: "c4",
    name: "Vikram Shah",
    company: "Shah Jewellers",
    segment: "Gold Loan",
    product: "Gold Loan · ₹18L",
    avatarColor: "var(--warning)",
    initials: "VS",
    priority: 4,
    healthScore: 62,
    healthTrend: 4,
    churnRisk: 44,
    riskLevel: "medium",
    revenueImpact: 190000,
    relationshipTenure: "1 yr 5 mo",
    lastContact: "5 days ago",
    location: "Ahmedabad, GJ",
    reasons: [
      {
        label: "Renewal due in 12 days",
        detail: "Loan matures soon; renewal intent unconfirmed.",
        impact: "negative",
        weight: 26,
      },
      {
        label: "Increased branch visits",
        detail: "Visited 3 times last month — engagement is up.",
        impact: "positive",
        weight: 18,
      },
    ],
    nextBestAction: {
      title: "Confirm renewal with a pre-approved offer",
      detail: "Reach out with a pre-approved renewal at current gold valuation to lock the relationship.",
      channel: "Call",
      urgency: "medium",
    },
    conversationGuidance: {
      opener: "Hi Vikram, your gold loan is up for renewal soon and I've already prepared a pre-approved offer for you.",
      talkingPoints: [
        "Highlight the favourable current gold valuation.",
        "Make renewal a one-step, paperwork-light process.",
        "Explore a modest limit increase given rising engagement.",
      ],
      offer: "Pre-approved renewal + 8% limit increase at current valuation.",
      tone: "Helpful, efficient.",
    },
    activity: [
      { label: "Feb", value: 4 },
      { label: "Mar", value: 5 },
      { label: "Apr", value: 6 },
      { label: "May", value: 7 },
      { label: "Jun", value: 8 },
      { label: "Jul", value: 9 },
    ],
    timeline: [
      { date: "14 Jul", title: "Branch visit", description: "Third visit this month.", type: "service" },
      { date: "03 Jul", title: "Interest paid", description: "Monthly interest cleared on time.", type: "payment" },
    ],
  },
  {
    id: "c5",
    name: "Fatima Sheikh",
    company: "Sheikh Consumer Durables",
    segment: "Consumer Finance",
    product: "Consumer Durable Loan · ₹3.2L",
    avatarColor: "var(--success)",
    initials: "FS",
    priority: 5,
    healthScore: 81,
    healthTrend: 7,
    churnRisk: 22,
    riskLevel: "low",
    revenueImpact: 64000,
    relationshipTenure: "3 yrs 3 mo",
    lastContact: "2 days ago",
    location: "Hyderabad, TS",
    reasons: [
      {
        label: "High app engagement",
        detail: "Uses the app weekly, opted into all notifications.",
        impact: "positive",
        weight: 22,
      },
      {
        label: "Accepted last cross-sell",
        detail: "Took an insurance add-on last month.",
        impact: "positive",
        weight: 16,
      },
    ],
    nextBestAction: {
      title: "Nurture — offer loyalty upgrade",
      detail: "Low risk. Deepen the relationship with a pre-approved personal loan offer.",
      channel: "Call",
      urgency: "low",
    },
    conversationGuidance: {
      opener: "Hi Fatima, thanks for being such an engaged customer — I have a little something to reward your loyalty.",
      talkingPoints: [
        "Thank her for the recent insurance add-on.",
        "Introduce a pre-approved personal loan at a preferential rate.",
        "Ask for a referral given her satisfaction.",
      ],
      offer: "Pre-approved personal loan + referral bonus.",
      tone: "Friendly, celebratory.",
    },
    activity: [
      { label: "Feb", value: 10 },
      { label: "Mar", value: 11 },
      { label: "Apr", value: 12 },
      { label: "May", value: 13 },
      { label: "Jun", value: 14 },
      { label: "Jul", value: 15 },
    ],
    timeline: [
      { date: "18 Jul", title: "App login", description: "Checked statement and rewards.", type: "app" },
      { date: "20 Jun", title: "Insurance add-on purchased", description: "Accepted cross-sell offer.", type: "service" },
    ],
  },
  {
    id: "c6",
    name: "Arjun Reddy",
    company: "Reddy Agro Traders",
    segment: "SME — Term Loan",
    product: "Business Loan · ₹36L",
    avatarColor: "var(--success)",
    initials: "AR",
    priority: 6,
    healthScore: 74,
    healthTrend: 2,
    churnRisk: 29,
    riskLevel: "low",
    revenueImpact: 288000,
    relationshipTenure: "5 yrs 6 mo",
    lastContact: "6 days ago",
    location: "Vijayawada, AP",
    reasons: [
      {
        label: "Stable transaction volume",
        detail: "Account inflows steady quarter-on-quarter.",
        impact: "positive",
        weight: 20,
      },
      {
        label: "Seasonal dip approaching",
        detail: "Historical Q3 slowdown may pressure cash flow.",
        impact: "neutral",
        weight: 12,
      },
    ],
    nextBestAction: {
      title: "Proactive seasonal working-capital check-in",
      detail: "Offer a seasonal overdraft ahead of the expected Q3 dip.",
      channel: "Call",
      urgency: "low",
    },
    conversationGuidance: {
      opener: "Hi Arjun, with the monsoon season around the corner, I wanted to make sure your working capital is set.",
      talkingPoints: [
        "Reference the recurring Q3 seasonal pattern.",
        "Pre-offer a seasonal overdraft facility.",
        "Reassure availability throughout the season.",
      ],
      offer: "Seasonal overdraft facility, pre-approved.",
      tone: "Proactive, advisory.",
    },
    activity: [
      { label: "Feb", value: 8 },
      { label: "Mar", value: 9 },
      { label: "Apr", value: 9 },
      { label: "May", value: 8 },
      { label: "Jun", value: 9 },
      { label: "Jul", value: 8 },
    ],
    timeline: [
      { date: "13 Jul", title: "EMI paid on time", description: "Consistent repayment.", type: "payment" },
      { date: "28 Jun", title: "Quarterly review call", description: "Discussed expansion plans.", type: "call" },
    ],
  },
  {
    id: "c7",
    name: "Meera Iyer",
    company: "Iyer Pharma Distributors",
    segment: "SME — Working Capital",
    product: "Business Loan · ₹55L",
    avatarColor: "var(--danger)",
    initials: "MI",
    priority: 7,
    healthScore: 29,
    healthTrend: -22,
    churnRisk: 91,
    riskLevel: "critical",
    revenueImpact: 660000,
    relationshipTenure: "3 yrs 9 mo",
    lastContact: "31 days ago",
    location: "Chennai, TN",
    reasons: [
      {
        label: "Three consecutive late EMIs",
        detail: "May, June, and July EMIs all cleared 8+ days past due — escalating pattern.",
        impact: "negative",
        weight: 36,
      },
      {
        label: "Competitor brochure downloaded",
        detail: "Downloaded HDFC BizGrow brochure from in-app browser.",
        impact: "negative",
        weight: 28,
      },
      {
        label: "GST filings irregular",
        detail: "Q1 GST filing delayed by 3 weeks — cash flow stress indicator.",
        impact: "negative",
        weight: 18,
      },
      {
        label: "3+ year relationship",
        detail: "Long-standing client with strong distributor network worth retaining.",
        impact: "positive",
        weight: 8,
      },
    ],
    nextBestAction: {
      title: "Urgent call — pre-empt balance transfer",
      detail: "Offer a 3-month EMI moratorium to address cash flow stress and lock retention.",
      channel: "Call",
      urgency: "critical",
    },
    conversationGuidance: {
      opener: "Hi Meera, I've been tracking your account personally and wanted to reach out directly before anything becomes complicated.",
      talkingPoints: [
        "Open with empathy — acknowledge the pharma distribution cycle squeeze post-GST.",
        "Offer a 3-month EMI step-down as a cash flow bridge.",
        "Propose a restructured working capital limit review.",
      ],
      offer: "3-month EMI moratorium + working capital limit review.",
      tone: "Urgent but empathetic — she needs a lifeline, not a lecture.",
    },
    activity: [
      { label: "Feb", value: 12 },
      { label: "Mar", value: 9 },
      { label: "Apr", value: 6 },
      { label: "May", value: 4 },
      { label: "Jun", value: 3 },
      { label: "Jul", value: 2 },
    ],
    timeline: [
      { date: "18 Jul", title: "Competitor brochure downloaded", description: "HDFC BizGrow PDF opened in-app.", type: "alert" },
      { date: "10 Jul", title: "July EMI late", description: "Cleared 9 days after due date.", type: "payment" },
      { date: "12 Jun", title: "June EMI late", description: "Cleared 8 days after due date.", type: "payment" },
    ],
  },
  {
    id: "c8",
    name: "Rohan Kapoor",
    company: "Kapoor Cold Storage",
    segment: "SME — Term Loan",
    product: "Business Loan · ₹48L",
    avatarColor: "var(--danger)",
    initials: "RK",
    priority: 8,
    healthScore: 38,
    healthTrend: -14,
    churnRisk: 79,
    riskLevel: "critical",
    revenueImpact: 540000,
    relationshipTenure: "2 yrs 1 mo",
    lastContact: "19 days ago",
    location: "Ludhiana, PB",
    reasons: [
      {
        label: "Foreclosure quote requested",
        detail: "Requested full outstanding amount statement online last week.",
        impact: "negative",
        weight: 33,
      },
      {
        label: "App logins dropped 65%",
        detail: "Engagement fell sharply in the last 45 days.",
        impact: "negative",
        weight: 22,
      },
      {
        label: "Cash flow irregularity",
        detail: "Monthly inflows dropped 30% YoY — cold storage sector headwinds.",
        impact: "negative",
        weight: 20,
      },
    ],
    nextBestAction: {
      title: "Call within 24 hrs — foreclosure risk",
      detail: "Lead with a rate retention offer. ₹5.4L at stake with a 2+ year client.",
      channel: "Call",
      urgency: "critical",
    },
    conversationGuidance: {
      opener: "Hi Rohan, I noticed some activity on your account and I wanted to personally check in — the cold storage sector has been tough lately.",
      talkingPoints: [
        "Reference the industry headwind — shows you understand his business.",
        "Offer a rate review (35 bps) and EMI date change aligned to harvest payments.",
        "Flag a working capital top-up option for the upcoming storage season.",
      ],
      offer: "35 bps rate review + seasonal EMI realignment.",
      tone: "Knowledgeable, proactive, industry-aware.",
    },
    activity: [
      { label: "Feb", value: 10 },
      { label: "Mar", value: 9 },
      { label: "Apr", value: 7 },
      { label: "May", value: 5 },
      { label: "Jun", value: 4 },
      { label: "Jul", value: 3 },
    ],
    timeline: [
      { date: "15 Jul", title: "Foreclosure statement requested", description: "Full outstanding amount enquiry online.", type: "alert" },
      { date: "08 Jul", title: "EMI paid (on time)", description: "Paid on time despite low app activity.", type: "payment" },
      { date: "20 Jun", title: "Monthly call — unanswered", description: "Quarterly touchpoint call not answered.", type: "call" },
    ],
  },
  {
    id: "c9",
    name: "Sunita Bhatia",
    company: "Bhatia Real Estate",
    segment: "Housing Finance",
    product: "Home Loan · ₹1.2Cr",
    avatarColor: "var(--warning)",
    initials: "SB",
    priority: 9,
    healthScore: 51,
    healthTrend: -7,
    churnRisk: 64,
    riskLevel: "high",
    revenueImpact: 840000,
    relationshipTenure: "8 yrs 3 mo",
    lastContact: "14 days ago",
    location: "Mumbai, MH",
    reasons: [
      {
        label: "Refinance EMI calculator used 4x",
        detail: "Ran refinance calculations after every repo-rate update this month.",
        impact: "negative",
        weight: 31,
      },
      {
        label: "Long tenure — loyalty risk",
        detail: "8-year customers feel entitled to rates better than new borrowers — and she's right.",
        impact: "negative",
        weight: 19,
      },
      {
        label: "Excellent repayment record",
        detail: "96 consecutive on-time EMIs — zero defaults.",
        impact: "positive",
        weight: 20,
      },
    ],
    nextBestAction: {
      title: "Loyalty rate review call",
      detail: "A 30 bps reduction on ₹1.2Cr retains ₹8.4L annual revenue. She's earned it.",
      channel: "Call",
      urgency: "high",
    },
    conversationGuidance: {
      opener: "Hi Sunita, 8 years and 96 EMIs — that's an incredible record. I wanted to make sure your rate reflects that loyalty.",
      talkingPoints: [
        "Lead with the tenure recognition — she knows her value.",
        "Present a loyalty rate review: 30 bps reduction on current floating rate.",
        "Offer a home equity top-up if she has any renovation or investment plans.",
      ],
      offer: "30 bps loyalty rate reduction + home equity top-up pre-approval.",
      tone: "Respectful, data-backed, proactive.",
    },
    activity: [
      { label: "Feb", value: 11 },
      { label: "Mar", value: 10 },
      { label: "Apr", value: 12 },
      { label: "May", value: 10 },
      { label: "Jun", value: 9 },
      { label: "Jul", value: 8 },
    ],
    timeline: [
      { date: "19 Jul", title: "Refinance calculator used", description: "4th use this month after RBI cut.", type: "app" },
      { date: "01 Jul", title: "EMI paid on time", description: "96th consecutive on-time payment.", type: "payment" },
      { date: "15 Jun", title: "Rate comparison page viewed", description: "Checked competitor home loan rates.", type: "app" },
    ],
  },
  {
    id: "c10",
    name: "Deepak Nair",
    company: "Nair Transport Co.",
    segment: "Vehicle Finance",
    product: "Commercial Vehicle Loan · ₹35L",
    avatarColor: "var(--warning)",
    initials: "DN",
    priority: 10,
    healthScore: 46,
    healthTrend: -11,
    churnRisk: 71,
    riskLevel: "high",
    revenueImpact: 385000,
    relationshipTenure: "3 yrs 0 mo",
    lastContact: "16 days ago",
    location: "Nagpur, MH",
    reasons: [
      {
        label: "Fuel price spike — margin squeeze",
        detail: "Diesel up 8% this quarter; fleet operators under significant pressure.",
        impact: "negative",
        weight: 25,
      },
      {
        label: "Partial EMI 2 months running",
        detail: "Paid 80% of EMI in June and 75% in July — shortfall growing.",
        impact: "negative",
        weight: 32,
      },
      {
        label: "3-year loyal client",
        detail: "Zero defaults for first 2.5 years — current issues are situational.",
        impact: "positive",
        weight: 12,
      },
    ],
    nextBestAction: {
      title: "EMI restructure call — growing shortfall",
      detail: "Offer a 2-month EMI holiday to bridge the fuel-cost squeeze before it becomes a default.",
      channel: "Call",
      urgency: "high",
    },
    conversationGuidance: {
      opener: "Hi Deepak, I know the fleet business has been under pressure with fuel costs — I wanted to reach out personally and make the EMI side manageable.",
      talkingPoints: [
        "Reference the diesel price spike — demonstrates empathy with his sector.",
        "Offer a 2-month EMI holiday followed by a restructured repayment plan.",
        "Explore a fleet-expansion loan when diesel stabilizes.",
      ],
      offer: "2-month EMI holiday + restructured repayment schedule.",
      tone: "Supportive, sector-aware, solution-first.",
    },
    activity: [
      { label: "Feb", value: 9 },
      { label: "Mar", value: 8 },
      { label: "Apr", value: 7 },
      { label: "May", value: 6 },
      { label: "Jun", value: 5 },
      { label: "Jul", value: 4 },
    ],
    timeline: [
      { date: "17 Jul", title: "July EMI — 75% paid", description: "Shortfall ₹8,750. Second partial month.", type: "payment" },
      { date: "05 Jul", title: "Called support desk", description: "Enquired about EMI restructure options.", type: "service" },
      { date: "10 Jun", title: "June EMI — 80% paid", description: "First partial payment in tenure.", type: "payment" },
    ],
  },
  {
    id: "c11",
    name: "Ananya Singh",
    company: "Singh Organic Farms",
    segment: "Agri — Kisan Credit",
    product: "KCC Loan · ₹12L",
    avatarColor: "var(--success)",
    initials: "AS",
    priority: 11,
    healthScore: 78,
    healthTrend: 5,
    churnRisk: 18,
    riskLevel: "low",
    revenueImpact: 96000,
    relationshipTenure: "4 yrs 5 mo",
    lastContact: "3 days ago",
    location: "Nashik, MH",
    reasons: [
      {
        label: "Kharif season — top-up window",
        detail: "Sowing season starts next month; top-up demand expected.",
        impact: "positive",
        weight: 20,
      },
      {
        label: "Strong repayment",
        detail: "Zero overdue in 53 months of KCC relationship.",
        impact: "positive",
        weight: 18,
      },
    ],
    nextBestAction: {
      title: "Proactive Kharif top-up offer",
      detail: "Pre-offer a seasonal KCC enhancement before she visits competitors for crop-input finance.",
      channel: "Call",
      urgency: "low",
    },
    conversationGuidance: {
      opener: "Hi Ananya, kharif season is around the corner — I've pre-approved a KCC top-up for you based on your excellent repayment record.",
      talkingPoints: [
        "Reference the upcoming kharif sowing cycle.",
        "Present a pre-approved KCC limit enhancement.",
        "Mention crop insurance as a bundled protection add-on.",
      ],
      offer: "KCC limit enhancement + crop insurance bundle.",
      tone: "Seasonal, relationship-first.",
    },
    activity: [
      { label: "Feb", value: 6 },
      { label: "Mar", value: 7 },
      { label: "Apr", value: 8 },
      { label: "May", value: 8 },
      { label: "Jun", value: 7 },
      { label: "Jul", value: 9 },
    ],
    timeline: [
      { date: "17 Jul", title: "App login", description: "Checked KCC balance and repayment schedule.", type: "app" },
      { date: "01 Jul", title: "KCC repayment on time", description: "Post-rabi season repayment cleared fully.", type: "payment" },
    ],
  },
  {
    id: "c12",
    name: "Sanjay Pillai",
    company: "Pillai Electronics",
    segment: "SME — Working Capital",
    product: "Business Loan · ₹22L",
    avatarColor: "var(--warning)",
    initials: "SP",
    priority: 12,
    healthScore: 57,
    healthTrend: -4,
    churnRisk: 53,
    riskLevel: "medium",
    revenueImpact: 220000,
    relationshipTenure: "1 yr 10 mo",
    lastContact: "9 days ago",
    location: "Thiruvananthapuram, KL",
    reasons: [
      {
        label: "Loan utilisation below 40%",
        detail: "Working capital limit underutilised — may indicate business slowdown or switching.",
        impact: "negative",
        weight: 24,
      },
      {
        label: "Asked about interest rate options",
        detail: "Enquired about fixed vs floating rate switch over the phone.",
        impact: "negative",
        weight: 19,
      },
      {
        label: "Improving app engagement",
        detail: "App sessions up 20% in the last 30 days.",
        impact: "positive",
        weight: 14,
      },
    ],
    nextBestAction: {
      title: "Rate education call + utilisation review",
      detail: "Explain rate options and review if the working capital limit matches current needs.",
      channel: "Call",
      urgency: "medium",
    },
    conversationGuidance: {
      opener: "Hi Sanjay, I saw you had a query about rates — I wanted to walk you through the options personally.",
      talkingPoints: [
        "Explain fixed vs floating rate trade-offs for his business cycle.",
        "Review whether the ₹22L limit is still optimal for current sales volume.",
        "Offer a limit restructure if the business needs have changed.",
      ],
      offer: "Rate structure review + limit realignment at no processing fee.",
      tone: "Educational, consultative.",
    },
    activity: [
      { label: "Feb", value: 5 },
      { label: "Mar", value: 6 },
      { label: "Apr", value: 5 },
      { label: "May", value: 6 },
      { label: "Jun", value: 7 },
      { label: "Jul", value: 8 },
    ],
    timeline: [
      { date: "14 Jul", title: "Rate query via call", description: "Asked about fixed vs floating switch.", type: "service" },
      { date: "05 Jul", title: "EMI paid on time", description: "22nd month of on-time payments.", type: "payment" },
    ],
  },
  {
    id: "c13",
    name: "Kiran Malhotra",
    company: "Malhotra Exports Pvt Ltd",
    segment: "SME — Export Finance",
    product: "Business Loan · ₹75L",
    avatarColor: "var(--danger)",
    initials: "KM",
    priority: 13,
    healthScore: 33,
    healthTrend: -19,
    churnRisk: 84,
    riskLevel: "critical",
    revenueImpact: 720000,
    relationshipTenure: "5 yrs 2 mo",
    lastContact: "28 days ago",
    location: "Surat, GJ",
    reasons: [
      {
        label: "Export orders dropped 40%",
        detail: "US tariff changes impacted key buyer — cash flow under severe stress.",
        impact: "negative",
        weight: 35,
      },
      {
        label: "Missed one EMI",
        detail: "First-ever missed EMI in 62 months of relationship.",
        impact: "negative",
        weight: 29,
      },
      {
        label: "5-year strategic client",
        detail: "High-value export client — loss would significantly impact portfolio.",
        impact: "positive",
        weight: 10,
      },
    ],
    nextBestAction: {
      title: "Emergency call — first-ever missed EMI",
      detail: "Offer a 6-month restructure aligned to export recovery. ₹7.2L revenue at stake.",
      channel: "Call",
      urgency: "critical",
    },
    conversationGuidance: {
      opener: "Hi Kiran, I know the export market has been difficult this quarter — I wanted to reach out personally before things become complicated on the loan side.",
      talkingPoints: [
        "Acknowledge the external macro factor (US tariffs) — show you understand the business.",
        "Offer an emergency EMI restructure: 6-month extended tenure.",
        "Discuss an export credit facility as a bridge while orders recover.",
      ],
      offer: "6-month EMI restructure + export credit bridge facility.",
      tone: "Urgent, empathetic, macro-aware.",
    },
    activity: [
      { label: "Feb", value: 11 },
      { label: "Mar", value: 9 },
      { label: "Apr", value: 7 },
      { label: "May", value: 4 },
      { label: "Jun", value: 3 },
      { label: "Jul", value: 2 },
    ],
    timeline: [
      { date: "20 Jul", title: "EMI missed — first ever", description: "No payment received. Follow-up critical.", type: "alert" },
      { date: "01 Jul", title: "Discussed export slowdown", description: "Mentioned US order cancellations.", type: "call" },
      { date: "15 Jun", title: "June EMI paid (on time)", description: "Last on-time payment.", type: "payment" },
    ],
  },
  {
    id: "c14",
    name: "Neha Joshi",
    company: "Self-employed — Interior Design",
    segment: "Housing Finance",
    product: "Home Loan · ₹38L",
    avatarColor: "var(--success)",
    initials: "NJ",
    priority: 14,
    healthScore: 83,
    healthTrend: 6,
    churnRisk: 16,
    riskLevel: "low",
    revenueImpact: 342000,
    relationshipTenure: "2 yrs 7 mo",
    lastContact: "1 day ago",
    location: "Pune, MH",
    reasons: [
      {
        label: "Consistent app engagement",
        detail: "Logs in 3–4 times a week, accesses statements regularly.",
        impact: "positive",
        weight: 19,
      },
      {
        label: "Referred 2 customers",
        detail: "Brought in two referrals this year — a strong loyalty indicator.",
        impact: "positive",
        weight: 22,
      },
    ],
    nextBestAction: {
      title: "Referral appreciation + home equity upsell",
      detail: "Thank her for referrals and offer a home equity top-up for her interior projects.",
      channel: "Call",
      urgency: "low",
    },
    conversationGuidance: {
      opener: "Hi Neha, I wanted to personally thank you for the referrals — that means a lot. And I have a little gift in return.",
      talkingPoints: [
        "Specifically mention the referrals by name if possible.",
        "Offer a preferential home equity top-up for renovation/projects.",
        "Explore mutual fund SIP or recurring deposit as a savings supplement.",
      ],
      offer: "Home equity top-up at preferential rate + referral cash reward.",
      tone: "Warm, grateful, celebratory.",
    },
    activity: [
      { label: "Feb", value: 12 },
      { label: "Mar", value: 13 },
      { label: "Apr", value: 14 },
      { label: "May", value: 15 },
      { label: "Jun", value: 14 },
      { label: "Jul", value: 16 },
    ],
    timeline: [
      { date: "20 Jul", title: "Referral #2 account opened", description: "Second referral customer onboarded.", type: "service" },
      { date: "01 Jul", title: "EMI paid on time", description: "31st consecutive on-time payment.", type: "payment" },
      { date: "10 Jun", title: "Referral #1", description: "First referral customer onboarded.", type: "service" },
    ],
  },
  {
    id: "c15",
    name: "Harish Kumar",
    company: "Kumar Auto Parts",
    segment: "Vehicle Finance",
    product: "Commercial Vehicle Loan · ₹19L",
    avatarColor: "var(--warning)",
    initials: "HK",
    priority: 15,
    healthScore: 60,
    healthTrend: -3,
    churnRisk: 48,
    riskLevel: "medium",
    revenueImpact: 171000,
    relationshipTenure: "1 yr 4 mo",
    lastContact: "12 days ago",
    location: "Coimbatore, TN",
    reasons: [
      {
        label: "Loan tenure almost complete",
        detail: "6 months remaining — renewal conversation needed now.",
        impact: "neutral",
        weight: 20,
      },
      {
        label: "Auto parts sector growth",
        detail: "Sector up 15% — fleet expansion is likely.",
        impact: "positive",
        weight: 17,
      },
      {
        label: "Low app engagement",
        detail: "Logs in only once a month — low stickiness.",
        impact: "negative",
        weight: 15,
      },
    ],
    nextBestAction: {
      title: "Renewal + fleet expansion discussion",
      detail: "Proactive call before tenure ends. Offer a top-up for fleet expansion in the growing auto parts sector.",
      channel: "Call",
      urgency: "medium",
    },
    conversationGuidance: {
      opener: "Hi Harish, your loan is almost complete — and with the auto sector doing well, I wanted to discuss what's next for the fleet.",
      talkingPoints: [
        "Congratulate on near-completion of tenure.",
        "Explore fleet expansion — is a second vehicle on the horizon?",
        "Offer a pre-approved top-up at a loyalty rate.",
      ],
      offer: "Fleet expansion top-up at 25 bps reduced rate.",
      tone: "Forward-looking, growth-oriented.",
    },
    activity: [
      { label: "Feb", value: 4 },
      { label: "Mar", value: 5 },
      { label: "Apr", value: 4 },
      { label: "May", value: 5 },
      { label: "Jun", value: 4 },
      { label: "Jul", value: 4 },
    ],
    timeline: [
      { date: "12 Jul", title: "EMI paid on time", description: "18th consecutive on-time payment.", type: "payment" },
      { date: "01 Jun", title: "Loan tenure milestone", description: "18 months complete, 6 remaining.", type: "alert" },
    ],
  },
  {
    id: "c16",
    name: "Pooja Agarwal",
    company: "Agarwal Hospitality Group",
    segment: "Commercial Real Estate",
    product: "LAP · ₹1.8Cr",
    avatarColor: "var(--danger)",
    initials: "PA",
    priority: 16,
    healthScore: 42,
    healthTrend: -16,
    churnRisk: 76,
    riskLevel: "high",
    revenueImpact: 1260000,
    relationshipTenure: "6 yrs 8 mo",
    lastContact: "22 days ago",
    location: "Jaipur, RJ",
    reasons: [
      {
        label: "Post-pandemic hospitality stress",
        detail: "Hotel occupancy down 35% in Q2 — debt service coverage dropping.",
        impact: "negative",
        weight: 34,
      },
      {
        label: "Refinancing enquiry via another bank",
        detail: "Agarwal Group received a call from Axis LAP team this month.",
        impact: "negative",
        weight: 26,
      },
      {
        label: "6+ year strategic relationship",
        detail: "Highest single-account revenue in RM portfolio — must protect.",
        impact: "positive",
        weight: 12,
      },
    ],
    nextBestAction: {
      title: "Urgent relationship meeting call",
      detail: "Highest revenue account at risk. Offer an LAP restructure + hospitality sector relief terms.",
      channel: "Call",
      urgency: "high",
    },
    conversationGuidance: {
      opener: "Hi Pooja, given how much you've built together with us over 6 years, I wanted to personally ensure we're supporting you through the hospitality recovery.",
      talkingPoints: [
        "Acknowledge the sector context — hospitality recovery is real but slow.",
        "Propose an interest-only period of 6 months to ease DSCR pressure.",
        "Explore if any additional property can be leveraged to consolidate.",
      ],
      offer: "6-month interest-only period + LAP restructure at no extra cost.",
      tone: "Strategic, high-touch, partner-level.",
    },
    activity: [
      { label: "Feb", value: 9 },
      { label: "Mar", value: 8 },
      { label: "Apr", value: 6 },
      { label: "May", value: 5 },
      { label: "Jun", value: 4 },
      { label: "Jul", value: 3 },
    ],
    timeline: [
      { date: "16 Jul", title: "Axis LAP enquiry detected", description: "Third-party credit enquiry on bureau.", type: "alert" },
      { date: "08 Jul", title: "Partial EMI payment", description: "Paid 85% of due EMI.", type: "payment" },
      { date: "20 Jun", title: "Occupancy report shared", description: "Showed Q2 occupancy data — 35% below target.", type: "call" },
    ],
  },
  {
    id: "c17",
    name: "Ravi Shankar",
    company: "Shankar IT Solutions",
    segment: "SME — Term Loan",
    product: "Business Loan · ₹30L",
    avatarColor: "var(--success)",
    initials: "RS",
    priority: 17,
    healthScore: 88,
    healthTrend: 9,
    churnRisk: 11,
    riskLevel: "low",
    revenueImpact: 270000,
    relationshipTenure: "3 yrs 11 mo",
    lastContact: "4 days ago",
    location: "Bengaluru, KA",
    reasons: [
      {
        label: "Rapid revenue growth",
        detail: "Company billing up 45% YoY — creditworthiness significantly improved.",
        impact: "positive",
        weight: 25,
      },
      {
        label: "High app engagement",
        detail: "Daily active user — tracks EMI, invoices, and statements religiously.",
        impact: "positive",
        weight: 18,
      },
      {
        label: "Ready for a larger facility",
        detail: "Current ₹30L limit too small for expanded operations.",
        impact: "positive",
        weight: 20,
      },
    ],
    nextBestAction: {
      title: "Upgrade to larger business loan facility",
      detail: "Ravi is growing fast. Offer a ₹60L expanded facility before a competitor spots the opportunity.",
      channel: "Call",
      urgency: "low",
    },
    conversationGuidance: {
      opener: "Hi Ravi, your business growth has been exceptional — I wanted to make sure your loan facility is keeping pace with it.",
      talkingPoints: [
        "Acknowledge the 45% revenue growth — he'll appreciate you noticing.",
        "Propose a facility upgrade to ₹60L to fund team expansion or tech infrastructure.",
        "Offer a loyalty rate as a long-tenure thank-you.",
      ],
      offer: "Business loan upgrade to ₹60L + loyalty rate at 9.5% p.a.",
      tone: "Growth-focused, celebratory, partnership-oriented.",
    },
    activity: [
      { label: "Feb", value: 14 },
      { label: "Mar", value: 15 },
      { label: "Apr", value: 16 },
      { label: "May", value: 17 },
      { label: "Jun", value: 18 },
      { label: "Jul", value: 19 },
    ],
    timeline: [
      { date: "19 Jul", title: "EMI paid on time", description: "47th consecutive on-time payment.", type: "payment" },
      { date: "10 Jul", title: "Financial statement updated", description: "Uploaded FY25 audited balance sheet.", type: "app" },
      { date: "28 Jun", title: "Quarterly review call", description: "Discussed expansion plans — 3 new hires planned.", type: "call" },
    ],
  },
  {
    id: "c18",
    name: "Aisha Qureshi",
    company: "Qureshi Garments",
    segment: "SME — Working Capital",
    product: "Business Loan · ₹14L",
    avatarColor: "var(--warning)",
    initials: "AQ",
    priority: 18,
    healthScore: 66,
    healthTrend: 1,
    churnRisk: 37,
    riskLevel: "medium",
    revenueImpact: 140000,
    relationshipTenure: "2 yrs 3 mo",
    lastContact: "7 days ago",
    location: "Tiruppur, TN",
    reasons: [
      {
        label: "Seasonal garment export peak",
        detail: "Festive season orders (Oct–Dec) will strain working capital.",
        impact: "negative",
        weight: 21,
      },
      {
        label: "Growing order book",
        detail: "3 new export buyers onboarded this quarter.",
        impact: "positive",
        weight: 18,
      },
      {
        label: "Stable repayment",
        detail: "27 months of on-time EMIs — solid track record.",
        impact: "positive",
        weight: 16,
      },
    ],
    nextBestAction: {
      title: "Pre-season working capital enhancement",
      detail: "Offer a seasonal limit increase before October to avoid festive-season cash flow pressure.",
      channel: "Call",
      urgency: "medium",
    },
    conversationGuidance: {
      opener: "Hi Aisha, with the festive season approaching and your new buyers onboard, I wanted to make sure you have enough runway to fulfil all the orders.",
      talkingPoints: [
        "Reference the new export buyers — shows engagement with her business.",
        "Offer a 40% working capital limit enhancement for the festive season.",
        "Introduce invoice discounting as a complementary tool for quicker receivables.",
      ],
      offer: "Seasonal WC limit increase + invoice discounting facility.",
      tone: "Forward-looking, business-savvy, seasonal.",
    },
    activity: [
      { label: "Feb", value: 7 },
      { label: "Mar", value: 8 },
      { label: "Apr", value: 8 },
      { label: "May", value: 9 },
      { label: "Jun", value: 9 },
      { label: "Jul", value: 10 },
    ],
    timeline: [
      { date: "15 Jul", title: "New export buyer onboarded", description: "Third new buyer this quarter — order book growing.", type: "service" },
      { date: "01 Jul", title: "EMI paid on time", description: "27th consecutive on-time payment.", type: "payment" },
    ],
  },
]

export const riskConfig: Record<RiskLevel, { label: string; color: string; bg: string; text: string }> = {
  critical: { label: "Critical", color: "var(--danger)", bg: "bg-danger/10", text: "text-danger" },
  high: { label: "High", color: "var(--warning)", bg: "bg-warning/15", text: "text-warning-foreground" },
  medium: { label: "Medium", color: "var(--warning)", bg: "bg-warning/10", text: "text-warning-foreground" },
  low: { label: "Low", color: "var(--success)", bg: "bg-success/10", text: "text-success" },
}

export function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

// Manager dashboard aggregates
export const portfolioSummary = {
  totalCustomers: 1284,
  atRisk: 143,
  revenueAtRisk: 4820000,
  retainedThisMonth: 37,
  retainedRevenue: 6150000,
  avgHealth: 68,
}

export const riskDistribution = [
  { level: "Critical", count: 28, color: "var(--danger)" },
  { level: "High", count: 61, color: "var(--warning)" },
  { level: "Medium", count: 54, color: "var(--chart-3)" },
  { level: "Low", count: 1141, color: "var(--success)" },
]

export const healthTrend = [
  { label: "Jan", value: 71 },
  { label: "Feb", value: 70 },
  { label: "Mar", value: 69 },
  { label: "Apr", value: 67 },
  { label: "May", value: 66 },
  { label: "Jun", value: 68 },
  { label: "Jul", value: 68 },
]

export type TeamMember = {
  name: string
  initials: string
  region: string
  customers: number
  atRisk: number
  retention: number // percent
  health: number
}

export const teamMembers: TeamMember[] = [
  { name: "Neha Kapoor", initials: "NK", region: "West", customers: 312, atRisk: 24, retention: 94, health: 74 },
  { name: "Sunil Rao", initials: "SR", region: "South", customers: 289, atRisk: 41, retention: 87, health: 63 },
  { name: "Imran Ali", initials: "IA", region: "North", customers: 341, atRisk: 33, retention: 91, health: 70 },
  { name: "Divya Iyer", initials: "DI", region: "East", customers: 342, atRisk: 45, retention: 85, health: 61 },
]

export function customerToSignal(c: Customer): LiveSignal {
  const matched = liveSignals.find((s) => s.customerId === c.id)
  if (matched) return matched

  return {
    id: `signal-${c.id}`,
    category: c.riskLevel === "critical" || c.riskLevel === "high" ? "risk" : "opportunity",
    customerId: c.id,
    customerName: c.name,
    initials: c.initials,
    avatarColor: c.avatarColor,
    segment: c.segment,
    product: c.product,
    value: c.revenueImpact,
    headline: c.nextBestAction.title,
    detail: c.nextBestAction.detail,
    triggeredAt: c.lastContact,
    freshnessPct: Math.max(10, 100 - c.churnRisk),
    window: `Act within 24 hrs`,
    urgency: c.riskLevel,
    channel: "Call",
    cockpit: {
      who: [
        `${c.name} · ${c.company}`,
        `${c.relationshipTenure} relationship · ${c.product}`,
        `${formatINR(c.revenueImpact)} annual revenue · Health ${c.healthScore}, churn risk ${c.churnRisk}%`,
      ],
      why: c.reasons.map((r) => `${r.label}: ${r.detail}`),
      what: {
        opener: c.conversationGuidance.opener,
        points: c.conversationGuidance.talkingPoints,
        offer: c.conversationGuidance.offer,
        avoid: "Don't rush into pitch — establish rapport first.",
      },
    },
  }
}

