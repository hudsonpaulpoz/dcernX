import { Link } from "react-router-dom";
import { StackedLogo } from "@/components/StackedLogo";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";

const WAITLIST_URL = "https://wms.xylor.ai/forms/survey/nn787mfqd1abpvq69e9te4vx598744gp";

export const MarketingNav = () => (
  <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur">
    <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-sm font-medium tracking-tight">
        <StackedLogo size={20} />
        <span>DcernX</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-xs text-foreground/70">
        <Link to="/segments/vcs" className="hover:text-foreground">VCs</Link>
        <Link to="/segments/accelerators" className="hover:text-foreground">Accelerators</Link>
        <Link to="/segments/family-offices" className="hover:text-foreground">Family Offices</Link>
        <Link to="/segments/pe-funds" className="hover:text-foreground">Private Equity</Link>
        <Link to="/#how" className="hover:text-foreground">How it works</Link>
      </nav>
      <div className="flex items-center gap-2">
        <MarketingThemeToggle />
        <a
          href={WAITLIST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-8 px-3 inline-flex items-center text-xs border border-foreground/20 hover:border-foreground/60 transition-colors"
        >
          Book a demo
        </a>
      </div>
    </div>
  </header>
);

export const MarketingFooter = () => (
  <footer className="border-t border-border/40 mt-24">
    <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4 text-xs text-foreground/60">
      <div>
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <StackedLogo size={18} />
          <span className="text-sm font-medium tracking-tight">DcernX</span>
        </Link>
        <p className="mt-3 leading-relaxed">
          The operating layer for private investment teams. Built by P101 Limited (UK).
        </p>
      </div>
      <div>
        <div className="text-foreground/80 mb-2 uppercase tracking-wider">For</div>
        <ul className="space-y-1.5">
          <li><Link to="/segments/vcs" className="hover:text-foreground">Venture Capital</Link></li>
          <li><Link to="/segments/accelerators" className="hover:text-foreground">Accelerators</Link></li>
          <li><Link to="/segments/venture-studios" className="hover:text-foreground">Venture Studios</Link></li>
          <li><Link to="/segments/angels" className="hover:text-foreground">Angel Syndicates</Link></li>
        </ul>
      </div>
      <div>
        <div className="text-foreground/80 mb-2 uppercase tracking-wider">&nbsp;</div>
        <ul className="space-y-1.5">
          <li><Link to="/segments/family-offices" className="hover:text-foreground">Family Offices</Link></li>
          <li><Link to="/segments/pe-funds" className="hover:text-foreground">Private Equity</Link></li>
          <li><Link to="/segments/startup-programs" className="hover:text-foreground">Startup Programs</Link></li>
        </ul>
      </div>
      <div>
        <div className="text-foreground/80 mb-2 uppercase tracking-wider">Company</div>
        <ul className="space-y-1.5">
          <li><a href="mailto:hudson@p101limited.com" className="hover:text-foreground">hudson@p101limited.com</a></li>
          <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
          <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          <li><Link to="/fair-use" className="hover:text-foreground">Fair Use</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/40 py-4 text-center text-[10px] text-foreground/40">
      © {new Date().getFullYear()} P101 Limited. Company no. 17063831.
    </div>
  </footer>
);

export { WAITLIST_URL };
