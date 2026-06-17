import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2, Mail, Plus, Sparkles, Upload, X } from "lucide-react";
import { z } from "zod";
import { StackedLogo } from "@/components/StackedLogo";
import { Seo } from "@/components/Seo";
import { MarketingThemeToggle } from "@/components/MarketingThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_FILE_MB = 25;
const ALLOWED_DECK = /\.(pdf|ppt|pptx|key)$/i;
const ALLOWED_DOC = /\.(pdf|doc|docx|xls|xlsx|csv|txt|md|ppt|pptx|key|png|jpg|jpeg)$/i;

const COMPANY_STAGES = [
  "Idea stage",
  "MVP / Seed",
  "Product market fit",
  "Scaling",
  "Series A through D",
  "PE capital raise",
  "Exit / M&A",
] as const;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Please enter a valid email").max(320),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  linkedin: z.string().trim().max(500).url("Please enter a valid LinkedIn URL").or(z.literal("")).optional(),
  organization: z.string().trim().min(1, "Organization name is required").max(200),
});

const companySchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  companyContact: z.string().trim().min(1, "Company website or email is required").max(500),
  founders: z.array(z.string().trim().min(1)).min(1, "Add at least one founder"),
  stage: z.string().min(1, "Please select a company stage"),
});

type Step = "contact" | "company" | "done";

const safeName = (name: string) => name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);

interface FileSlotProps {
  label: string;
  optional?: boolean;
  file: File | null;
  onChange: (f: File | null) => void;
  accept: string;
  pattern: RegExp;
  hint: string;
}

function FileSlot({ label, optional, file, onChange, accept, pattern, hint }: FileSlotProps) {
  const handle = (f: File | null) => {
    if (!f) return onChange(null);
    if (!pattern.test(f.name)) {
      toast.error(`Unsupported file type for ${label}`);
      return;
    }
    if (f.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File exceeds ${MAX_FILE_MB} MB limit`);
      return;
    }
    onChange(f);
  };
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-3">
        {label} {optional && <span className="lowercase tracking-normal text-muted-foreground/70">(optional)</span>}
      </label>
      {!file ? (
        <label className="group flex items-center justify-center gap-3 border border-dashed border-border hover:border-foreground/50 px-6 py-8 cursor-pointer transition-colors">
          <Upload className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" strokeWidth={1.5} />
          <span className="text-[13.5px] text-muted-foreground group-hover:text-foreground transition-colors">
            {hint}
          </span>
          <input
            type="file"
            className="sr-only"
            accept={accept}
            onChange={(e) => handle(e.target.files?.[0] ?? null)}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between border border-border px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <FileText className="h-4 w-4 text-foreground shrink-0" strokeWidth={1.5} />
            <span className="text-[13.5px] text-foreground truncate">{file.name}</span>
            <span className="text-[12px] text-muted-foreground shrink-0">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Remove ${label}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function AIAnalysisTry() {
  const [step, setStep] = useState<Step>("contact");

  // Screen 1 — Contact
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [organization, setOrganization] = useState("");

  // Screen 2 — Company
  const [companyName, setCompanyName] = useState("");
  const [companyContact, setCompanyContact] = useState("");
  const [founders, setFounders] = useState<string[]>([""]);
  const [stage, setStage] = useState("");
  const [salesDeck, setSalesDeck] = useState<File | null>(null);
  const [detailedDeck, setDetailedDeck] = useState<File | null>(null);
  const [financials, setFinancials] = useState<File | null>(null);
  const [customerInfo, setCustomerInfo] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);

  const goToCompany = () => {
    const parsed = contactSchema.safeParse({ name, email, phone, linkedin, organization });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setStep("company");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateFounder = (i: number, v: string) => {
    setFounders((arr) => arr.map((f, idx) => (idx === i ? v : f)));
  };
  const addFounder = () => setFounders((arr) => [...arr, ""]);
  const removeFounder = (i: number) =>
    setFounders((arr) => (arr.length === 1 ? arr : arr.filter((_, idx) => idx !== i)));

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
    const cleanFounders = founders.map((f) => f.trim()).filter(Boolean);
    const parsed = companySchema.safeParse({
      companyName,
      companyContact,
      founders: cleanFounders,
      stage,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!salesDeck && !detailedDeck) {
      toast.error("Please upload at least one deck (sales or detailed).");
      return;
    }

    setSubmitting(true);
    try {
      const requestId = crypto.randomUUID();
      const salesPath = salesDeck ? await uploadFile(salesDeck, "sales-deck", requestId) : null;
      const detailedPath = detailedDeck ? await uploadFile(detailedDeck, "detailed-deck", requestId) : null;
      const financialsPath = financials ? await uploadFile(financials, "financials", requestId) : null;
      const customerPath = customerInfo ? await uploadFile(customerInfo, "customers", requestId) : null;

      const isUrl = /^https?:\/\//i.test(companyContact.trim());

      const { error: insertError } = await supabase.from("analysis_requests").insert({
        id: requestId,
        requester_name: name.trim(),
        requester_email: email.trim(),
        requester_phone: phone.trim() || null,
        requester_linkedin: linkedin.trim() || null,
        requester_organization: organization.trim(),
        company_name: companyName.trim(),
        company_website: isUrl ? companyContact.trim() : null,
        company_email: !isUrl ? companyContact.trim() : null,
        founders: cleanFounders,
        company_stage: stage,
        sales_deck_path: salesPath,
        detailed_deck_path: detailedPath,
        financials_path: financialsPath,
        customer_info_path: customerPath,
        pitch_deck_path: salesPath ?? detailedPath,
        document_paths: [],
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

  const inputClass =
    "w-full h-11 px-3 bg-background border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/60 transition-colors";
  const labelClass = "block text-[12px] uppercase tracking-[0.12em] text-muted-foreground mb-2";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Try Agentic AI Due Diligence Free — Run a Primary Analysis on Any Company | DcernX"
        description="Submit a company's details, decks and supporting materials and receive a free agentic AI primary due-diligence report by email."
        path="/ai-analysis/try"
      />

      {/* Nav */}
      <nav className="sticky top-0 z-50 w-full bg-background border-b border-border px-6">
        <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between">
          <Link to="/" className="flex items-center -ml-0.5" aria-label="DcernX home">
            <StackedLogo size={24} />
          </Link>
          <div className="flex items-center gap-2">
            <MarketingThemeToggle />
            <Link
              to="/ai-analysis"
              className="inline-flex items-center gap-1.5 text-[13px] text-foreground/70 hover:text-foreground transition-colors h-8 px-3"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to overview
            </Link>
          </div>
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
                {step === "contact"
                  ? "Tell us a little about you."
                  : "Now share the company you'd like analysed."}
              </h1>
              <p className="mt-5 text-[15px] text-muted-foreground leading-[1.65] max-w-[600px]">
                {step === "contact"
                  ? "We'll use these details to send the report and follow up if we need anything."
                  : "Upload the decks and supporting materials and our agents will build the brief."}
              </p>

              {/* Stepper */}
              <ol className="mt-9 flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                <li className={`flex items-center gap-2 ${step === "contact" ? "text-foreground" : ""}`}>
                  <span className={`inline-flex h-5 w-5 items-center justify-center border ${step === "contact" ? "border-foreground" : "border-border"}`}>1</span>
                  Your details
                </li>
                <span className="h-px w-8 bg-border" />
                <li className={`flex items-center gap-2 ${step === "company" ? "text-foreground" : ""}`}>
                  <span className={`inline-flex h-5 w-5 items-center justify-center border ${step === "company" ? "border-foreground" : "border-border"}`}>2</span>
                  Company
                </li>
              </ol>
            </header>
          )}

          {/* STEP 1 — Contact */}
          {step === "contact" && (
            <section className="space-y-7">
              <div>
                <label className={labelClass}>Your full name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} required placeholder="Jane Partner" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={320} required placeholder="jane@yourfund.com" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone <span className="lowercase tracking-normal text-muted-foreground/70">(optional)</span></label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={50} placeholder="+1 555 123 4567" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL <span className="lowercase tracking-normal text-muted-foreground/70">(optional but useful)</span></label>
                <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} maxLength={500} placeholder="https://www.linkedin.com/in/..." className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Organization name</label>
                <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} maxLength={200} required placeholder="Your fund or firm" className={inputClass} />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={goToCompany}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-[14px] font-medium bg-foreground text-background hover:bg-foreground/90 transition-colors"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 — Company */}
          {step === "company" && (
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className={labelClass}>Company name</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} maxLength={200} required placeholder="Acme Inc." className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company website or email</label>
                <input type="text" value={companyContact} onChange={(e) => setCompanyContact(e.target.value)} maxLength={500} required placeholder="https://acme.com or hello@acme.com" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Company founder(s)</label>
                <div className="space-y-2">
                  {founders.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={f}
                        onChange={(e) => updateFounder(i, e.target.value)}
                        maxLength={200}
                        placeholder={`Founder ${i + 1} full name`}
                        className={inputClass}
                      />
                      {founders.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFounder(i)}
                          className="shrink-0 h-11 w-11 inline-flex items-center justify-center border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                          aria-label="Remove founder"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addFounder}
                  className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add another founder
                </button>
              </div>

              <FileSlot
                label="Sales deck"
                file={salesDeck}
                onChange={setSalesDeck}
                accept=".pdf,.ppt,.pptx,.key,application/pdf"
                pattern={ALLOWED_DECK}
                hint={`Click to upload PDF, PPT, PPTX or Keynote (max ${MAX_FILE_MB} MB)`}
              />

              <FileSlot
                label="Detailed deck (investor / technical)"
                file={detailedDeck}
                onChange={setDetailedDeck}
                accept=".pdf,.ppt,.pptx,.key,application/pdf"
                pattern={ALLOWED_DECK}
                hint={`Click to upload PDF, PPT, PPTX or Keynote (max ${MAX_FILE_MB} MB)`}
              />

              <FileSlot
                label="Financials"
                optional
                file={financials}
                onChange={setFinancials}
                accept=".pdf,.xls,.xlsx,.csv,.doc,.docx"
                pattern={ALLOWED_DOC}
                hint="Click to upload financial model or statements"
              />

              <FileSlot
                label="Customer information"
                optional
                file={customerInfo}
                onChange={setCustomerInfo}
                accept=".pdf,.xls,.xlsx,.csv,.doc,.docx,.txt"
                pattern={ALLOWED_DOC}
                hint="Click to upload customer list, case studies or references"
              />

              <div>
                <label className={labelClass}>Company stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  required
                  className={inputClass}
                >
                  <option value="">Select a stage…</option>
                  {COMPANY_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <p className="text-[12px] text-muted-foreground/80 leading-[1.6]">
                By submitting, you confirm you have the right to share these materials with DcernX for analysis. Do not submit confidential third-party material without authorisation.
              </p>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep("contact")}
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
                      Submit for analysis
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
                    You'll be contacted by email with a detailed report within <strong className="text-foreground">30 to 90 minutes</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-foreground/70 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <p className="text-[14px] text-foreground/85 leading-[1.7]">
                    The full brief and consolidated risk report will be sent to{" "}
                    <span className="text-foreground">{email}</span>.
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
