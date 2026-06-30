import { Navigate, useParams, Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { Seo } from "@/components/Seo";
import { MarketingNav, MarketingFooter, WAITLIST_URL } from "@/components/MarketingNav";
import { InvestorCalculator } from "@/components/InvestorCalculator";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SecurityTiles, FounderCard, StickyCtaBar } from "@/components/TrustElements";
import { getSegment, SEGMENTS } from "@/data/segments";

const SegmentPage = () => {
  const { slug } = useParams();
  const segment = slug ? getSegment(slug) : undefined;
  if (!segment) return <Navigate to="/" replace />;

  const Icon = segment.icon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={segment.seoTitle}
        description={segment.seoDescription}
        path={`/segments/${segment.slug}`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `DcernX for ${segment.name}`,
            description: segment.seoDescription,
            provider: { "@type": "Organization", name: "P101 Limited", url: "https://dcernx.com/" },
            areaServed: [
              { "@type": "Place", name: "Europe" },
              { "@type": "Country", name: "United Kingdom" },
              { "@type": "Country", name: "United States" },
              { "@type": "Country", name: "India" },
              { "@type": "Country", name: "Singapore" },
            ],
            audience: { "@type": "Audience", audienceType: segment.name },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://dcernx.com/" },
              { "@type": "ListItem", position: 2, name: segment.name, item: `https://dcernx.com/segments/${segment.slug}` },
            ],
          },
        ]}
      />
      <MarketingNav />

      {/* HERO — PAS in one screen */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-6">
          <Icon className="h-3.5 w-3.5" />
          <span>{segment.heroEyebrow}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] max-w-4xl">
          {segment.heroH1}
        </h1>
        <p className="mt-6 text-base md:text-lg text-foreground/70 max-w-2xl leading-relaxed">
          {segment.heroSub}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={WAITLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-5 inline-flex items-center gap-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
          >
            Book a demo for {segment.shortName} <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <Link
            to="/#how"
            className="h-10 px-5 inline-flex items-center text-sm border border-foreground/20 hover:border-foreground/60 transition-colors"
          >
            See how it works
          </Link>
        </div>
      </section>

      {/* AGITATE — pains */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">Today</div>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight max-w-3xl mb-10">
            What {segment.buyer.toLowerCase()}s tell us is broken.
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-border/40">
            {segment.pains.map((p) => (
              <div key={p.title} className="bg-background p-6">
                <div className="text-sm font-medium mb-2">{p.title}</div>
                <p className="text-sm text-foreground/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIRE — outcomes + capabilities */}
      <CursorSpotlight>
        <section className="border-t border-border/40">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-3">With DcernX</div>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight max-w-3xl mb-10">
              Outcomes you can defend to your IC, your LPs, your board.
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {segment.outcomes.map((o) => (
                <div key={o.label} className="border-l border-foreground/30 pl-4">
                  <div className="text-3xl md:text-4xl font-light tracking-tight">{o.metric}</div>
                  <div className="text-xs text-foreground/60 mt-1">{o.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-border/40">
              {segment.capabilities.map((c) => (
                <div key={c.title} className="bg-background p-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-foreground/60 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium">{c.title}</div>
                      <p className="text-sm text-foreground/65 leading-relaxed mt-1">{c.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </CursorSpotlight>

      {/* ROI calculator */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <InvestorCalculator
            applicationsPerMonth={segment.calc.applicationsPerMonth}
            hoursPerInitialReview={segment.calc.hoursPerInitialReview}
            analystRate={segment.calc.analystRate}
          />
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-lg md:text-xl font-light leading-relaxed text-foreground/80">
            "{segment.testimonial.quote}"
          </p>
          <div className="mt-6 text-xs text-foreground/50">
            — {segment.testimonial.author}, {segment.testimonial.role}
          </div>
        </div>
      </section>

      {/* SECURITY & TRUST */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-6">
            Security & trust
          </div>
          <SecurityTiles compact />
        </div>
      </section>

      {/* ACTION */}
      <section className="border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">
              Ready to run {segment.name.toLowerCase()} like an operating layer?
            </h2>
            <p className="mt-4 text-sm text-foreground/65">
              We'll walk you through DcernX on your own deal flow — no slideware. 30 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-6 inline-flex items-center gap-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
              >
                Book a demo <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://app.dcernx.com/forms/survey/nn714s7d45cqdn9qw0m6jx042s89mgym"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-6 inline-flex items-center text-sm border border-foreground/20 hover:border-foreground/60 transition-colors"
              >
                Run a deal — free
              </a>
            </div>
            <div className="mt-3 text-[11px] text-foreground/45">
              Free · No credit card · Your deal stays yours.
            </div>
          </div>
          <div className="mt-14">
            <FounderCard />
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="border-t border-border/40">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="text-[10px] uppercase tracking-[0.22em] text-foreground/50 mb-4">Other teams using DcernX</div>
          <div className="flex flex-wrap gap-2">
            {SEGMENTS.filter((s) => s.slug !== segment.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/segments/${s.slug}`}
                className="text-xs px-3 py-1.5 border border-foreground/15 hover:border-foreground/50 transition-colors"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
};

export default SegmentPage;
