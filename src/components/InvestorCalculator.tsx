import { useState } from "react";
import { Mail } from "lucide-react";
import { SavingsReportDialog, type SavingsInputs } from "./SavingsReportDialog";

interface Props {
  applicationsPerMonth?: number;
  hoursPerInitialReview?: number;
  analystRate?: number;
}

/**
 * Compact ROI calculator. Uses DcernX's own demonstrated outcome (~12 min/report)
 * vs status-quo analyst hours. Numbers are softened and labelled as estimates.
 */
export const InvestorCalculator = ({
  applicationsPerMonth: a0 = 100,
  hoursPerInitialReview: h0 = 4,
  analystRate: r0 = 200,
}: Props) => {
  const [apps, setApps] = useState(a0);
  const [hrs, setHrs] = useState(h0);
  const [rate, setRate] = useState(r0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const DCX_MINUTES = 12;
  const currentHrs = apps * hrs;
  const currentCost = currentHrs * rate;
  const dcxHrs = (apps * DCX_MINUTES) / 60;
  const dcxCost = dcxHrs * rate;
  const savedHrs = Math.max(0, currentHrs - dcxHrs);
  const savedCost = Math.max(0, currentCost - dcxCost);

  const inputs: SavingsInputs = {
    apps, hrs, rate, currentHrs, currentCost, dcxHrs, dcxCost, savedHrs, savedCost,
    dcxMinutes: DCX_MINUTES,
  };

  return (
    <div className="border border-foreground/10 p-6 md:p-8 bg-foreground/[0.02]">
      <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 mb-1">
        ROI estimate
      </div>
      <h3 className="text-xl md:text-2xl font-light tracking-tight mb-6">
        What your team gets back per month
      </h3>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Slider label="Deals reviewed / month" value={apps} setValue={setApps} min={5} max={500} step={5} suffix="" />
        <Slider label="Hours per initial review" value={hrs} setValue={setHrs} min={0.5} max={20} step={0.5} suffix="h" />
        <Slider label="Loaded analyst rate / hr" value={rate} setValue={setRate} min={50} max={500} step={10} prefix="$" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-foreground/10">
        <Stat label="Current monthly cost" value={`$${Math.round(currentCost).toLocaleString()}`} dim />
        <Stat label="With DcernX" value={`$${Math.round(dcxCost).toLocaleString()}`} dim />
        <Stat label="You save" value={`$${Math.round(savedCost).toLocaleString()}`} highlight />
      </div>

      <div className="mt-6 pt-6 border-t border-foreground/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-[11px] text-foreground/50 max-w-md leading-relaxed">
          Want this on paper? We'll send a branded PDF with your numbers, the full breakdown and the math behind every line.
        </p>
        <button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="h-11 px-5 inline-flex items-center justify-center gap-2 bg-foreground text-background text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <Mail className="h-3.5 w-3.5" />
          Email me the report
        </button>
      </div>

      <p className="mt-4 text-[10px] text-foreground/40">
        Estimate based on DcernX's demonstrated ~12 minutes per report. Actual savings vary by deal type and review depth.
      </p>

      <SavingsReportDialog open={dialogOpen} onOpenChange={setDialogOpen} inputs={inputs} />
    </div>
  );
};

const Slider = ({
  label, value, setValue, min, max, step, prefix = "", suffix = "",
}: { label: string; value: number; setValue: (n: number) => void; min: number; max: number; step: number; prefix?: string; suffix?: string; }) => (
  <label className="block">
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-xs text-foreground/60">{label}</span>
      <span className="text-sm tabular-nums">{prefix}{value}{suffix}</span>
    </div>
    <input
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full accent-foreground"
    />
  </label>
);

const Stat = ({ label, value, dim, highlight }: { label: string; value: string; dim?: boolean; highlight?: boolean }) => (
  <div>
    <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 mb-1">{label}</div>
    <div className={`text-2xl font-light tabular-nums ${highlight ? "text-foreground" : dim ? "text-foreground/70" : ""}`}>
      {value}
    </div>
  </div>
);
