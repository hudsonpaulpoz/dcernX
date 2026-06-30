// Single source of truth for all 7 investor segments.
// Used by the hub segment selector, the segment page template, the footer, and the sitemap.

import {
  Rocket,
  FlaskConical,
  Building2,
  Users,
  Landmark,
  Briefcase,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type SegmentSlug =
  | "accelerators"
  | "venture-studios"
  | "vcs"
  | "angels"
  | "family-offices"
  | "pe-funds"
  | "startup-programs";

export interface Segment {
  slug: SegmentSlug;
  name: string;
  shortName: string;
  buyer: string;
  icon: LucideIcon;
  // Hub card
  hubPain: string;
  hubOutcome: string;
  // PAS hero
  heroEyebrow: string;
  heroH1: string;
  heroSub: string;
  // Pain block (Agitate)
  pains: { title: string; body: string }[];
  // Outcomes (Desire)
  outcomes: { metric: string; label: string }[];
  // Capabilities relevant to this segment
  capabilities: { title: string; body: string }[];
  // Calculator defaults
  calc: { applicationsPerMonth: number; hoursPerInitialReview: number; analystRate: number };
  // Placeholder testimonial
  testimonial: { quote: string; author: string; role: string };
  // SEO
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

export const SEGMENTS: Segment[] = [
  {
    slug: "accelerators",
    name: "Accelerators",
    shortName: "Accelerators",
    buyer: "Program Director",
    icon: Rocket,
    hubPain: "Hundreds of applications. A team of three. A weekend.",
    hubOutcome: "Ranked, evidenced shortlists in hours — not weeks.",
    heroEyebrow: "Accelerator application screening software",
    heroH1: "Score every founder. Defend every call.",
    heroSub:
      "Cohort intake breaks small teams. DcernX turns thousands of applications into ranked, evidence-backed shortlists — and gives every founder a real answer.",
    pains: [
      {
        title: "Intake chaos",
        body: "Applications scatter across Typeform, email, referrals and partner forms. Every reviewer sees a different deal.",
      },
      {
        title: "Reviewer burnout",
        body: "Program teams burn weekends reading decks. Quality drops as the queue grows; rejected founders never hear why.",
      },
      {
        title: "Alumni go dark",
        body: "After demo day, progress lives in Notion and partner heads. Sponsor reporting gets rebuilt every quarter.",
      },
    ],
    outcomes: [
      { metric: "10×", label: "applications screened per reviewer" },
      { metric: "<1 day", label: "to a ranked, defensible shortlist" },
      { metric: "100%", label: "of applicants get an evidenced response" },
    ],
    capabilities: [
      { title: "Unified intake", body: "One form, one inbox, one structured profile per applicant — regardless of source." },
      { title: "Consistent scoring", body: "Every applicant against the same rubric, with reviewer notes and AI evidence side-by-side." },
      { title: "Cohort dashboards", body: "Live pipeline, conversion and reviewer-load views — exportable for sponsors and corporates." },
      { title: "Alumni tracking", body: "Carry founders forward post-program with milestone, funding and outcome data captured automatically." },
    ],
    calc: { applicationsPerMonth: 200, hoursPerInitialReview: 1.5, analystRate: 80 },
    testimonial: {
      quote: "Reviewer hours per cohort dropped ~70%, and every founder now gets a structured, evidenced response — not a templated rejection. Sponsors finally see the rigour behind selection.",
      author: "Program Director (confidential)",
      role: "European accelerator, ~400 applicants per cohort",
    },
    seoTitle: "Accelerator Application Screening Software — DcernX",
    seoDescription:
      "AI cohort intake, scoring and alumni tracking for accelerators and incubators. Triage hundreds of founder applications in hours, with cited evidence.",
    keywords: "accelerator software, incubator platform, application screening software, cohort management, founder evaluation, startup screening",
  },
  {
    slug: "venture-studios",
    name: "Venture Studios",
    shortName: "Studios",
    buyer: "Studio GP",
    icon: FlaskConical,
    hubPain: "Internal ideas and external opportunities live in different worlds.",
    hubOutcome: "One workspace for ideation, validation and spin-out.",
    heroEyebrow: "Venture studio operating platform",
    heroH1: "Run theses like a research desk — not a notebook.",
    heroSub:
      "Studios run the whole stack: ideation, validation, build, spin-out. DcernX puts every thesis, experiment and portfolio company in one workspace — comparable and defensible.",
    pains: [
      {
        title: "Thesis sprawl",
        body: "Every partner validates in their own format. Comparing ideas means rebuilding context from scratch.",
      },
      {
        title: "Operator pipeline gaps",
        body: "Co-founder leads sit in personal LinkedIn DMs. When an idea is ready, the right founder is already gone.",
      },
      {
        title: "Spin-out from zero",
        body: "When a studio company raises externally, you rebuild the investor story — losing months of validation work.",
      },
    ],
    outcomes: [
      { metric: "1 source", label: "of truth across every thesis" },
      { metric: "Days", label: "to a fully validated brief" },
      { metric: "Spin-out ready", label: "investor-grade memos from existing validation" },
    ],
    capabilities: [
      { title: "Thesis workspace", body: "Capture, score and compare internal ideas with the same rigour as external deals." },
      { title: "Operator pipeline", body: "Track co-founder candidates with notes, signals and matched theses in one place." },
      { title: "Validation library", body: "Every market scan, expert call and prototype linked to its thesis — reusable forever." },
      { title: "Spin-out memos", body: "Generate external-investor-grade decks and memos from your own validation, in one click." },
    ],
    calc: { applicationsPerMonth: 30, hoursPerInitialReview: 6, analystRate: 150 },
    testimonial: {
      quote: "We used to rebuild every spin-out's investor story from zero. Now the validation we did at thesis stage flows straight into the seed memo — six to eight weeks saved per spin-out.",
      author: "Managing Partner (confidential)",
      role: "Venture studio, 6 active builds per year",
    },
    seoTitle: "Venture Studio Software & Operating Platform — DcernX",
    seoDescription:
      "Thesis validation, operator pipelines and spin-out memos for venture studios. One workspace from idea to seed — with reusable evidence.",
    keywords: "venture studio software, startup studio platform, idea validation software, operator pipeline, spin-out memo, co-founder matching",
  },
  {
    slug: "vcs",
    name: "Venture Capital",
    shortName: "VCs",
    buyer: "Partner / Principal",
    icon: Building2,
    hubPain: "Deals die in inboxes. IC memos written the night before.",
    hubOutcome: "10× analyst throughput with audit-ready memos.",
    heroEyebrow: "Venture capital software & AI due diligence",
    heroH1: "Stop letting deals die in partner inboxes.",
    heroSub:
      "Cold inbound, warm intros and partner notes scatter across Gmail, Slack and Notion. DcernX makes every deal a structured record with a defensible IC memo — before IC, not the night before.",
    pains: [
      {
        title: "Inbox-driven deal flow",
        body: "Inbound lives in personal inboxes. When deals heat up, no one has the full history — and cold ones simply vanish.",
      },
      {
        title: "Night-before IC memos",
        body: "Associates pull all-nighters before every IC. The memo gets written; the underlying evidence rarely survives the meeting.",
      },
      {
        title: "LP updates from scratch",
        body: "Every quarter you reconstruct pipeline and portfolio activity from email and Slack. Real-time visibility is missing.",
      },
    ],
    outcomes: [
      { metric: "10×", label: "deals reviewed per analyst" },
      { metric: "12 min", label: "from deck upload to first IC-ready brief" },
      { metric: "200+", label: "sources cited per report" },
    ],
    capabilities: [
      { title: "Pipeline as a record", body: "Every deal — inbound, intro, outbound — becomes a structured profile with full history attached." },
      { title: "Agentic AI due diligence", body: "Strategy, market, competition, team, financials and regulatory researched in minutes — with citations." },
      { title: "IC-ready memos", body: "One-click investment memos with embedded evidence, scoring and partner commentary." },
      { title: "LP-ready visibility", body: "Pipeline, portfolio and decisions reportable in real time. No quarterly scramble." },
    ],
    calc: { applicationsPerMonth: 150, hoursPerInitialReview: 4, analystRate: 200 },
    testimonial: {
      quote: "Our analysts now walk into IC with sourced evidence behind every claim — not a memo written at 2am. We're reviewing roughly 8× more deals per partner without adding headcount.",
      author: "General Partner (confidential)",
      role: "Pre-seed / seed fund, EU + UK",
    },
    seoTitle: "Venture Capital Software & AI Due Diligence — DcernX",
    seoDescription:
      "Deal flow CRM, AI due diligence and IC-ready memos for venture capital. 10× analyst throughput on early-stage deals with cited evidence.",
    keywords: "venture capital software, vc crm, deal flow software, vc due diligence, ai due diligence, ic memo software, investor crm, early stage investor platform",
  },
  {
    slug: "angels",
    name: "Angel Syndicates",
    shortName: "Angels",
    buyer: "Lead Angel / Syndicate Manager",
    icon: Users,
    hubPain: "You're investing on instinct — without time to dig.",
    hubOutcome: "Institutional-grade diligence between dinner and bed.",
    heroEyebrow: "Angel investor & syndicate platform",
    heroH1: "Invest with the rigour of a fund. On angel time.",
    heroSub:
      "Angels lose deals to bigger funds because diligence takes time you don't have. DcernX gives you institutional-grade analysis in the gap between dinner and bedtime.",
    pains: [
      {
        title: "No time to dig",
        body: "You have a day job. By the time you've read the deck and skimmed LinkedIn, the round is half-allocated.",
      },
      {
        title: "Syndicate coordination",
        body: "Members ask the same questions in separate threads. The deal lead becomes a full-time router.",
      },
      {
        title: "No memory across deals",
        body: "Patterns across your last 30 cheques live only in your head. There's no way to learn from your own track record.",
      },
    ],
    outcomes: [
      { metric: "1 evening", label: "to a full diligence brief" },
      { metric: "Shared workspace", label: "for every syndicate member" },
      { metric: "Searchable", label: "history of every deal you've seen" },
    ],
    capabilities: [
      { title: "Fast triage", body: "Forward a deck or paste a link — get an evidenced brief back by morning." },
      { title: "Syndicate workspace", body: "Members see the same evidence, ask questions in-thread and signal interest in one place." },
      { title: "Personal deal CRM", body: "Every opportunity you've ever seen, searchable and pattern-matchable for the next call." },
      { title: "Founder-friendly", body: "Founders get a real, evidenced answer — not three weeks of silence." },
    ],
    calc: { applicationsPerMonth: 25, hoursPerInitialReview: 3, analystRate: 250 },
    testimonial: {
      quote: "I used to pass on deals just because I couldn't dig in fast enough. Now I get an evidenced brief by morning, and my syndicate aligns in one thread instead of fifteen.",
      author: "Syndicate Lead (confidential)",
      role: "Angel syndicate, ~40 members",
    },
    seoTitle: "Angel Investor & Syndicate Software — DcernX",
    seoDescription:
      "Institutional-grade AI due diligence on angel time. Triage deals, run your syndicate and keep a searchable personal deal CRM in one workspace.",
    keywords: "angel investor software, syndicate platform, angel due diligence, syndicate crm, angel investing tools, investor crm",
  },
  {
    slug: "family-offices",
    name: "Family Offices",
    shortName: "Family Offices",
    buyer: "CIO / Investment Director",
    icon: Landmark,
    hubPain: "Direct deals demand fund-grade governance you don't staff for.",
    hubOutcome: "Fiduciary-ready records on every private opportunity.",
    heroEyebrow: "For family offices",
    heroH1: "Direct investing with fiduciary-grade records.",
    heroSub:
      "Direct private deals need the same defensibility as a fund — without a fund's headcount. DcernX gives every opportunity a complete, auditable record the next generation can stand behind.",
    pains: [
      {
        title: "Lean team, fund-sized expectations",
        body: "One or two investment professionals are expected to evaluate dozens of direct opportunities a year with no staffing slack.",
      },
      {
        title: "Governance gaps",
        body: "Decisions sit in inboxes and partner memory. When a deal is questioned a year later, the evidence trail is missing.",
      },
      {
        title: "Multi-generational handoff",
        body: "Knowledge about why you backed (or passed on) opportunities lives in one head. Succession turns it into guesswork.",
      },
    ],
    outcomes: [
      { metric: "Audit-ready", label: "record on every direct opportunity" },
      { metric: "1 system", label: "across all private exposure" },
      { metric: "Defensible", label: "decisions, evidenced and timestamped" },
    ],
    capabilities: [
      { title: "Private opportunity intake", body: "Direct deals, fund commitments and co-invests all captured the same way." },
      { title: "Diligence brief library", body: "Every opportunity carries its own evidenced brief — searchable across years and generations." },
      { title: "Governance trail", body: "Decisions, dissenting views and underlying evidence preserved as a single record." },
      { title: "Multi-entity visibility", body: "View activity across trusts, vehicles and members without cross-contaminating data." },
    ],
    calc: { applicationsPerMonth: 20, hoursPerInitialReview: 5, analystRate: 300 },
    testimonial: {
      quote: "For the first time, every direct investment has the same defensible record a fund would produce — without us scaling the team. The next generation will be able to read why we did every deal.",
      author: "Chief Investment Officer (confidential)",
      role: "Single-family office, multi-asset",
    },
    seoTitle: "Family Office Investment Governance Platform — DcernX",
    seoDescription:
      "Direct deal intake, agentic diligence and fiduciary-grade records for single and multi-family offices. Defensible private investing for lean teams.",
    keywords: "family office software, family office investment platform, direct investing, private deal governance, family office cio tools",
  },
  {
    slug: "pe-funds",
    name: "Private Equity",
    shortName: "PE Funds",
    buyer: "Deal Partner / Operating Partner",
    icon: Briefcase,
    hubPain: "Diligence is expensive, slow, and never reused.",
    hubOutcome: "Compound diligence across deals and value creation.",
    heroEyebrow: "For private equity",
    heroH1: "Run diligence at scale. Reuse it forever.",
    heroSub:
      "Every deal triggers another six-figure diligence project — the output of which is mostly thrown away after IC. DcernX makes diligence a compounding asset across your fund.",
    pains: [
      {
        title: "Expensive per-deal diligence",
        body: "External advisors rebuild the same market and competitor work for every deal. Spend goes up; institutional memory doesn't.",
      },
      {
        title: "Pre-IC bottlenecks",
        body: "Materials are stitched together by associates the week of IC. Partners review final drafts with little time to challenge.",
      },
      {
        title: "Post-close drift",
        body: "Diligence assumptions go into a PDF and never resurface. Value-creation tracking starts from a blank page.",
      },
    ],
    outcomes: [
      { metric: "Reusable", label: "research that compounds across deals" },
      { metric: "Faster", label: "path from sourcing to signed IC memo" },
      { metric: "Continuous", label: "diligence into value-creation tracking" },
    ],
    capabilities: [
      { title: "Sector research vaults", body: "Build and maintain living sector intelligence — reused on every deal in that vertical." },
      { title: "Parallel diligence streams", body: "Commercial, financial, regulatory and ESG streams run in one workspace with shared evidence." },
      { title: "IC-ready memos", body: "Partner-grade memos generated from underlying evidence, not the other way around." },
      { title: "Post-close continuity", body: "Diligence assumptions carry forward into operating partner dashboards and value-creation plans." },
    ],
    calc: { applicationsPerMonth: 40, hoursPerInitialReview: 12, analystRate: 350 },
    testimonial: {
      quote: "Sector work we used to commission for every new deal now compounds. Our IC packs are sharper, advisor spend is down, and post-close value plans start from real diligence — not a blank page.",
      author: "Deal Partner (confidential)",
      role: "Mid-market PE, €1bn+ AUM",
    },
    seoTitle: "Private Equity Due Diligence & Value Creation Platform — DcernX",
    seoDescription:
      "Parallel diligence streams, sector research vaults and post-close continuity for PE. Make diligence a compounding asset across your fund.",
    keywords: "private equity software, pe due diligence, ic memo software, value creation platform, sector intelligence",
  },
  {
    slug: "startup-programs",
    name: "Startup Programs",
    shortName: "Startup Programs",
    buyer: "Program Lead",
    icon: GraduationCap,
    hubPain: "Sponsors demand reporting your tooling can't produce.",
    hubOutcome: "Fair, defensible programs with reporting built in.",
    heroEyebrow: "For corporate, government & university programs",
    heroH1: "Run founder programs sponsors actually trust.",
    heroSub:
      "Corporate venture, government and university programs have the budget but not the systems. DcernX gives you fair intake, consistent evaluation and reporting your sponsors can stand behind.",
    pains: [
      {
        title: "Inconsistent evaluation",
        body: "Different reviewers, different rubrics, different outcomes. Defending why one founder got in and another didn't is uncomfortable.",
      },
      {
        title: "Sponsor reporting on demand",
        body: "Corporates, ministries and university boards want metrics nobody's tracking. Each report is a custom data project.",
      },
      {
        title: "Fragmented founder data",
        body: "Cohorts move through the program but their data lives in spreadsheets that go stale the moment the program ends.",
      },
    ],
    outcomes: [
      { metric: "Same rubric", label: "applied to every applicant" },
      { metric: "Sponsor reports", label: "one-click, anytime" },
      { metric: "Multi-year", label: "view of every cohort and founder" },
    ],
    capabilities: [
      { title: "Fair intake", body: "Open calls handled with consistent forms, scoring and evidence trails — defensible if challenged." },
      { title: "Cohort management", body: "Track founders through every stage of your program with structured milestones, not free-text notes." },
      { title: "Sponsor dashboards", body: "Pre-built reports for corporate partners, ministries and university boards — refreshed live." },
      { title: "Longitudinal data", body: "Outcomes captured year over year, so program impact is provable not anecdotal." },
    ],
    calc: { applicationsPerMonth: 150, hoursPerInitialReview: 1, analystRate: 90 },
    testimonial: {
      quote: "Our corporate sponsor used to ask for cohort metrics we couldn't produce. Now reporting is a click, intake is consistent across reviewers, and we can defend every selection decision.",
      author: "Program Lead (confidential)",
      role: "Corporate-backed founder program, EMEA",
    },
    seoTitle: "Software for Startup Programs, Corporate Venture & Government Funds — DcernX",
    seoDescription:
      "Fair intake, consistent evaluation and sponsor-ready reporting for corporate venture, government funds and university startup programs.",
    keywords: "startup program software, corporate venture platform, government startup fund, university accelerator, founder program management",
  },
];

export const getSegment = (slug: string): Segment | undefined =>
  SEGMENTS.find((s) => s.slug === slug);
