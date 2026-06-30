
CREATE TABLE public.lead_captures (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  source TEXT NOT NULL DEFAULT 'savings_calculator',
  payload JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.lead_captures TO anon, authenticated;
GRANT ALL ON public.lead_captures TO service_role;

ALTER TABLE public.lead_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.lead_captures FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
