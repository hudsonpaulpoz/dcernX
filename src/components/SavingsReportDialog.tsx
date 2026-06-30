import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Download, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import jsPDF from "jspdf";

export interface SavingsInputs {
  apps: number;
  hrs: number;
  rate: number;
  currentHrs: number;
  currentCost: number;
  dcxHrs: number;
  dcxCost: number;
  savedHrs: number;
  savedCost: number;
  dcxMinutes: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inputs: SavingsInputs;
}

const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

function buildPdf(name: string, company: string, i: SavingsInputs): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;
  let y = 56;

  // Header band
  doc.setFillColor(10, 10, 11);
  doc.rect(0, 0, W, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("DCERNX", M, 18);
  doc.setFont("helvetica", "normal");
  doc.text("AI Due Diligence · Deal Flow · IC Memos", W - M, 18, { align: "right" });

  // Title
  doc.setTextColor(10, 10, 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Personalized savings report", M, (y += 30));
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(`Prepared for ${name}`, M, (y += 24));
  if (company) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(90, 90, 90);
    doc.text(company, M, (y += 16));
    doc.setTextColor(10, 10, 11);
  }
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), M, (y += 16));
  doc.setTextColor(10, 10, 11);

  // Hero stat
  y += 24;
  doc.setDrawColor(230);
  doc.setFillColor(248, 248, 249);
  doc.rect(M, y, W - M * 2, 96, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("ESTIMATED MONTHLY SAVINGS", M + 16, y + 22);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  doc.setTextColor(10, 10, 11);
  doc.text(fmt(i.savedCost), M + 16, y + 58);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90, 90, 90);
  doc.text(
    `${Math.round(i.savedHrs).toLocaleString()} analyst hours returned to your team every month`,
    M + 16,
    y + 80,
  );
  y += 96 + 28;

  // Your inputs
  doc.setTextColor(10, 10, 11);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Your inputs", M, y);
  y += 14;
  doc.setDrawColor(230);
  doc.line(M, y, W - M, y);
  y += 16;

  const rows: [string, string][] = [
    ["Deals reviewed per month", `${i.apps}`],
    ["Hours per initial review (today)", `${i.hrs} h`],
    ["Loaded analyst rate", `${fmt(i.rate)}/hr`],
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  rows.forEach(([k, v]) => {
    doc.setTextColor(90, 90, 90);
    doc.text(k, M, y);
    doc.setTextColor(10, 10, 11);
    doc.text(v, W - M, y, { align: "right" });
    y += 18;
  });

  // Breakdown
  y += 14;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("The breakdown", M, y);
  y += 14;
  doc.line(M, y, W - M, y);
  y += 18;

  const breakdown: [string, string, string][] = [
    ["Status quo", `${Math.round(i.currentHrs).toLocaleString()} h / month`, fmt(i.currentCost)],
    ["With DcernX", `${i.dcxHrs.toFixed(1)} h / month`, fmt(i.dcxCost)],
    ["You save", `${Math.round(i.savedHrs).toLocaleString()} h / month`, fmt(i.savedCost)],
  ];
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Scenario", M, y);
  doc.text("Time", W / 2 + 30, y, { align: "right" });
  doc.text("Cost", W - M, y, { align: "right" });
  y += 6;
  doc.line(M, y, W - M, y);
  y += 14;
  breakdown.forEach(([k, t, c], idx) => {
    const last = idx === breakdown.length - 1;
    if (last) doc.setFont("helvetica", "bold");
    else doc.setFont("helvetica", "normal");
    doc.setTextColor(10, 10, 11);
    doc.setFontSize(11);
    doc.text(k, M, y);
    doc.text(t, W / 2 + 30, y, { align: "right" });
    doc.text(c, W - M, y, { align: "right" });
    y += 20;
  });

  // Calculation logic
  y += 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("How we calculated it", M, y);
  y += 14;
  doc.line(M, y, W - M, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const logic = [
    `1. Status-quo hours  =  deals (${i.apps})  ×  hours per review (${i.hrs})  =  ${Math.round(i.currentHrs)} h`,
    `2. Status-quo cost   =  ${Math.round(i.currentHrs)} h  ×  ${fmt(i.rate)}/hr  =  ${fmt(i.currentCost)}`,
    `3. DcernX hours      =  deals (${i.apps})  ×  ${i.dcxMinutes} min  /  60  =  ${i.dcxHrs.toFixed(1)} h`,
    `4. DcernX cost       =  ${i.dcxHrs.toFixed(1)} h  ×  ${fmt(i.rate)}/hr  =  ${fmt(i.dcxCost)}`,
    `5. Savings           =  status quo  −  DcernX  =  ${fmt(i.savedCost)}  /  ${Math.round(i.savedHrs)} h`,
  ];
  logic.forEach((line) => {
    doc.text(line, M, y);
    y += 14;
  });

  y += 10;
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text(
    "Based on DcernX's demonstrated ~12 minutes per IC-ready brief. Actual savings vary by deal type",
    M,
    y,
  );
  y += 12;
  doc.text("and depth of review. Figures are estimates, not a quote.", M, y);

  // Footer
  doc.setDrawColor(230);
  doc.line(M, 740, W - M, 740);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("DcernX · Operated by P101 Limited (UK, no. 17063831)", M, 754);
  doc.text("hudson@p101limited.com", W - M, 754, { align: "right" });
  doc.setTextColor(10, 10, 11);
  doc.text("dcernx.com", M, 768);
  doc.text("Book a demo: app.dcernx.com", W - M, 768, { align: "right" });

  return doc;
}

export const SavingsReportDialog = ({ open, onOpenChange, inputs }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!emailOk) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("lead_captures").insert({
        name: name.trim().slice(0, 120),
        email: email.trim().toLowerCase().slice(0, 200),
        company: company.trim().slice(0, 160) || null,
        source: "savings_calculator",
        payload: inputs as unknown as Record<string, number>,
      });
      if (error) throw error;

      const doc = buildPdf(name.trim(), company.trim(), inputs);
      doc.save(`DcernX-savings-report-${Date.now()}.pdf`);

      toast.success("Report ready", {
        description: "Your branded savings report has been downloaded. A copy will be emailed to you shortly.",
      });
      onOpenChange(false);
      setName("");
      setEmail("");
      setCompany("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-light text-2xl tracking-tight">Email me my report</DialogTitle>
          <DialogDescription>
            Get a branded PDF with your monthly savings, full breakdown and the math behind it.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="lc-name">Name</Label>
            <Input id="lc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lc-email">Work email</Label>
            <Input id="lc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@fund.com" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lc-company">Firm <span className="text-foreground/40">(optional)</span></Label>
            <Input id="lc-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Capital" />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-11 gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {loading ? "Preparing your report" : "Send me the report"}
          </Button>
          <p className="text-[11px] text-foreground/50 leading-relaxed flex gap-1.5">
            <Mail className="h-3 w-3 mt-0.5 shrink-0" />
            We'll use your email only to send this report and occasional product updates. Unsubscribe anytime.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
