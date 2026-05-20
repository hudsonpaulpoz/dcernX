import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2, Mail, Paperclip, Sparkles, Upload, X } from "lucide-react";
import { z } from "zod";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_FILE_MB = 25;
const MAX_FILES = 10;
const ALLOWED_DECK = /\.(pdf|ppt|pptx|key)$/i;
const ALLOWED_DOC = /\.(pdf|doc|docx|xls|xlsx|csv|txt|md|ppt|pptx|key|png|jpg|jpeg)$/i;

const artifactsSchema = z.object({
  website: z.string().trim().max(500).url("Please enter a valid website URL").or(z.literal("")).optional(),
  companyLinkedin: z.string().trim().max(500).url("Please enter a valid LinkedIn URL").or(z.literal("")).optional(),
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Please enter a valid email").max(320),
  linkedin: z.string().trim().max(500).url("Please enter a valid LinkedIn URL").or(z.literal("")).optional(),
});

type Step = "artifacts" | "contact" | "done";

const safeName = (name: string) =>
  name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);

export default function AIAnalysisTry() {
  const [step, setStep] = useState<Step>("artifacts");

  // Step 1
  const [website, setWebsite] = useState("");
  const [companyLinkedin, setCompanyLinkedin] = useState("");
  const [pitchDeck, setPitchDeck] = useState<File | null>(null);
  const [otherDocs, setOtherDocs] = useState<File[]>([]);

  // Step 2
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleDeckSelect = (file: File | null) => {
    if (!file) return setPitchDeck(null);
    if (!ALLOWED_DECK.test(file.name)) {
      toast.error("Pitch deck must be PDF, PPT, PPTX or KEY");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File exceeds ${MAX_FILE_MB} MB limit`);
      return;
    }
    setPitchDeck(file);
  };

  const handleDocsSelect = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);
    const invalid = incoming.find((f) => !ALLOWED_DOC.test(f.name));
    if (invalid) {
      toast.error(`Unsupported file type: ${invalid.name}`);
      return;
    }
    const tooBig = incoming.find((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    if (tooBig) {
      toast.error(`"${tooBig.name}" exceeds ${MAX_FILE_MB} MB limit`);
      return;
    }
    const combined = [...otherDocs, ...incoming].slice(0, MAX_FILES);
    if (otherDocs.length + incoming.length > MAX_FILES) {
      toast.error(`Maximum ${MAX_FILES} additional documents`);
    }
    setOtherDocs(combined);
  };

  const goToContact = () => {
    const parsed = artifactsSchema.safeParse({ website, companyLinkedin });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      toast.error(issue.message);
      return;
    }
    if (!pitchDeck && !website && !companyLinkedin && otherDocs.length === 0) {
      toast.error("Please provide at least a pitch deck, website or LinkedIn URL.");
      return;
    }
    setStep("contact");
  };

  const uploadFile = async (file: File, folder: string, requestId: string): Promise<string> => {
    const path = `${requestId}/${folder}/${Date.now()}-${safeName(file.name)}`;
    const { error } = await supabase.storage.from("analysis-uploads").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });
    if (error) throw new Error(`Upload failed for ${file.name}: ${error.message}`);
    return path;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ name, email, linkedin });
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      toast.error(issue.message);
      return;
    }
    setSubmitting(true);
    try {
      const requestId = crypto.randomUUID();

      let pitchDeckPath: string | null = null;
      const docPaths: string[] = [];

      if (pitchDeck) {
        pitchDeckPath = await uploadFile(pitchDeck, "deck", requestId);
      }
      for (const f of otherDocs) {
        docPaths.push(await uploadFile(f, "docs", requestId));
      }

      const { error: insertError } = await supabase.from("analysis_requests").insert({
        id: requestId,
        requester_name: parsed.data.name,
        requester_email: parsed.data.email,
        requester_linkedin: parsed.data.linkedin || null,
        company_website: website.trim() || null,
        company_linkedin: companyLinkedin.trim() || null,
        pitch_deck_path: pitchDeckPath,
        document_paths: docPaths,
      });
      if (insertError) throw insertError;

      setStep("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Try AI Due Diligence Free — Run a Primary Analysis on Any Company | DcernX"
        description="Upload a pitch deck, website or LinkedIn URL and DcernX will run a free AI primary analysis — strategy, competition, regulatory, compliance, financial and risk. Results delivered to your inbox."
        path="/ai-analysis/try"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center gap-2 -ml-0.5">
            <StackedLogo size={16} />
            <span className="text-[14px] font-bold text-foreground tracking-[0.08em] uppercase">DcernX</span>
          </Link>
          <Link
            to="/ai-analysis"
            className="inline-flex items-center gap-1.5 text-[13px] text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to overview
          </Link>
        </div>
      </nav>

      <main className="px-6 pt-14 pb-24">
        <div className="mx-auto max-w-[760px]">
          {step !== "done" && (
            <header className="mb-10">
              <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                Free primary analysis
              </p>
              <h1 className="text-[clamp(1.8rem,3vw,2.4rem)] font-[500] tracking-[-0.03em] leading-[1.1] text-foreground max-w-[640px]">
                {step === "artifacts"
                  ? "Share what you have on the company."
                  : "Where should we send the analysis?"}
              </h1>
              <p className="mt-5 text-[15px] text-muted-foreground leading-[1.65] max-w-[600px]">
                {step === "artifacts"
                  ? "Upload a pitch deck and any supporting material, or just paste a website or LinkedIn URL. Our agents will read everything before producing the brief."
                  : "We'll email you the full brief and risk report when the analysis is complete."}
              </p>

              {/* Stepper */}
              <ol className="mt-9 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                <li className={`flex items-center gap-2 ${step === "artifacts" ? "text-foreground" : ""}`}>
                  <span className={`inline-flex h-5 w-5 items-center justify-center border ${step === "artifacts" ? "border-foreground" : "border-border"}`}>1</span>
                  Materials
                </li>
                <span className="h-px w-8 bg-border" />
                <li className={`flex items-center gap-2 ${step === "contact" ? "text-foreground" : ""}`}>
                  <span className={`inline-flex h-5 w-5 items-center justify-center border ${step === "contact" ? "border-foreground" : "border-border"}`}>2</span>
                  Your details
                </li>
              </ol>
            </header>
          )}

          {/* STEP 1 — Artifacts */}
          {step === "artifacts" && (
            <section className="space-y-8">
              {/* Pitch deck */}
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Pitch deck
                </label>
                {!pitchDeck ? (
                  <label className="group flex items-center justify-center gap-3 border border-dashed border-border hover:border-foreground/50 px-6 py-10 cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                    <span className="text-[13.5px] text-muted-foreground group-hover:text-foreground transition-colors">
                      Click to upload PDF, PPT, PPTX or Keynote (max {MAX_FILE_MB} MB)
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept=".pdf,.ppt,.pptx,.key,application/pdf"
                      onChange={(e) => handleDeckSelect(e.target.files?.[0] ?? null)}
                    />
                  </label>
                ) : (
                  <div className="flex items-center justify-between border border-border px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-4 w-4 text-foreground shrink-0" strokeWidth={1.5} />
                      <span className="text-[13.5px] text-foreground truncate">{pitchDeck.name}</span>
                      <span className="text-[12px] text-muted-foreground shrink-0">
                        {(pitchDeck.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPitchDeck(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Remove pitch deck"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Website */}
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://company.com"
                  className="w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>

              {/* Company LinkedIn */}
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Company LinkedIn URL
                </label>
                <input
                  type="url"
                  value={companyLinkedin}
                  onChange={(e) => setCompanyLinkedin(e.target.value)}
                  placeholder="https://www.linkedin.com/company/..."
                  className="w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>

              {/* Other documents */}
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-3">
                  Other documents <span className="lowercase tracking-normal text-muted-foreground/70">(optional, up to {MAX_FILES})</span>
                </label>

                <label className="group flex items-center justify-center gap-3 border border-dashed border-border hover:border-foreground/50 px-6 py-8 cursor-pointer transition-colors">
                  <Paperclip className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
                  <span className="text-[13.5px] text-muted-foreground group-hover:text-foreground transition-colors">
                    Add memos, financials, founder bios, data-room exports…
                  </span>
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.md,.ppt,.pptx,.key,.png,.jpg,.jpeg"
                    onChange={(e) => handleDocsSelect(e.target.files)}
                  />
                </label>

                {otherDocs.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {otherDocs.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center justify-between border border-border px-4 py-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileText className="h-4 w-4 text-foreground/70 shrink-0" strokeWidth={1.5} />
                          <span className="text-[13.5px] text-foreground truncate">{f.name}</span>
                          <span className="text-[12px] text-muted-foreground shrink-0">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtherDocs(otherDocs.filter((_, idx) => idx !== i))}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Remove ${f.name}`}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={goToContact}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 — Contact */}
          {step === "contact" && (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Your full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={200}
                  required
                  placeholder="Jane Partner"
                  className="w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={320}
                  required
                  placeholder="jane@yourfund.com"
                  className="w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2">
                  Your LinkedIn URL <span className="lowercase tracking-normal text-muted-foreground/70">(optional)</span>
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  maxLength={500}
                  placeholder="https://www.linkedin.com/in/..."
                  className="w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors"
                />
              </div>

              <p className="text-[12px] text-muted-foreground/80 leading-[1.6]">
                By submitting, you confirm you have the right to share these materials with DcernX for analysis. Do not submit confidential third-party material without authorisation.
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("artifacts")}
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Run analysis
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* DONE — Confirmation */}
          {step === "done" && (
            <section className="pt-6 text-center">
              <div className="mx-auto inline-flex items-center justify-center h-12 w-12 border border-foreground/30 mb-8">
                <CheckCircle2 className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              </div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground mb-4">
                Submission received
              </p>
              <h1 className="text-[clamp(1.8rem,3vw,2.4rem)] font-[500] tracking-[-0.03em] leading-[1.1] text-foreground max-w-[600px] mx-auto">
                Your analysis is now in the queue.
              </h1>

              <div className="mt-10 mx-auto max-w-[560px] border border-border p-8 text-left space-y-5">
                <div className="flex items-start gap-3">
                  <Loader2 className="h-4 w-4 text-foreground/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <p className="text-[14px] text-foreground/85 leading-[1.7]">
                    The analysis typically takes <strong className="text-foreground">15 minutes to 1 hour</strong> depending on the depth of materials provided.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-foreground/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <p className="text-[14px] text-foreground/85 leading-[1.7]">
                    We'll email the full brief and the <strong className="text-foreground">consolidated risk report</strong> to{" "}
                    <span className="text-foreground">{email}</span> when it's ready.
                  </p>
                </div>
              </div>

              <p className="mt-10 text-[14px] text-muted-foreground leading-[1.7] max-w-[560px] mx-auto">
                For more on the product or to enable DcernX for your team, contact{" "}
                <a
                  href="mailto:hudson@p101limited.com"
                  className="text-foreground underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground transition-colors"
                >
                  hudson@p101limited.com
                </a>
                .
              </p>

              <div className="mt-10 flex items-center justify-center gap-5 text-[13px]">
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Back to home
                </Link>
                <span className="text-border">·</span>
                <Link to="/ai-analysis" className="text-muted-foreground hover:text-foreground transition-colors">
                  How the analysis works
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
