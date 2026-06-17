
ALTER TABLE public.analysis_requests
  ADD COLUMN IF NOT EXISTS requester_phone TEXT,
  ADD COLUMN IF NOT EXISTS requester_organization TEXT,
  ADD COLUMN IF NOT EXISTS company_name TEXT,
  ADD COLUMN IF NOT EXISTS company_email TEXT,
  ADD COLUMN IF NOT EXISTS founders TEXT[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS company_stage TEXT,
  ADD COLUMN IF NOT EXISTS sales_deck_path TEXT,
  ADD COLUMN IF NOT EXISTS detailed_deck_path TEXT,
  ADD COLUMN IF NOT EXISTS financials_path TEXT,
  ADD COLUMN IF NOT EXISTS customer_info_path TEXT;
