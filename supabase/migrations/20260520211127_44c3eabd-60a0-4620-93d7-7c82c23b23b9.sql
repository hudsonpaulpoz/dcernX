
-- Submissions table
CREATE TABLE public.analysis_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_name text NOT NULL,
  requester_email text NOT NULL,
  requester_linkedin text,
  company_website text,
  company_linkedin text,
  pitch_deck_path text,
  document_paths text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.analysis_requests ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can submit
CREATE POLICY "Anyone can submit analysis requests"
  ON public.analysis_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    requester_name <> ''
    AND requester_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(requester_name) <= 200
    AND length(requester_email) <= 320
  );

-- Admins can read submissions
CREATE POLICY "Admins can view analysis requests"
  ON public.analysis_requests
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket for uploads (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('analysis-uploads', 'analysis-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload to the bucket
CREATE POLICY "Anyone can upload analysis files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'analysis-uploads');

-- Admins can read/manage uploaded files
CREATE POLICY "Admins can read analysis files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'analysis-uploads'
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

CREATE POLICY "Admins can delete analysis files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'analysis-uploads'
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );
