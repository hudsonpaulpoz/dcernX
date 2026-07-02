
-- 1. Invitations: only admins can create, and admins can only assign non-admin roles by default (admins can invite admins too via bypass? keep admin-only)
DROP POLICY IF EXISTS "Authenticated can create invitations" ON public.invitations;
CREATE POLICY "Only admins can create invitations"
  ON public.invitations FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = invited_by
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 2. analysis_requests: allow submitters to delete their own submission via email match
CREATE POLICY "Submitters can delete their own requests"
  ON public.analysis_requests FOR DELETE TO authenticated
  USING (
    requester_email = (auth.jwt() ->> 'email')
  );
CREATE POLICY "Submitters can view their own requests"
  ON public.analysis_requests FOR SELECT TO authenticated
  USING (
    requester_email = (auth.jwt() ->> 'email')
  );

-- 3. analysis-uploads storage: restrict to authenticated users, scope path prefix
DROP POLICY IF EXISTS "Anyone can upload analysis files" ON storage.objects;
CREATE POLICY "Authenticated can upload analysis files"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'analysis-uploads'
    AND (storage.foldername(name))[1] = 'submissions'
    AND octet_length(name) < 512
  );

-- 4. bug-attachments: add explicit UPDATE policy scoped to owner
CREATE POLICY "Users can update own bug attachments"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'bug-attachments'
    AND (auth.uid())::text = (storage.foldername(name))[1]
  )
  WITH CHECK (
    bucket_id = 'bug-attachments'
    AND (auth.uid())::text = (storage.foldername(name))[1]
  );

-- 5. avatars bucket listing: drop broad SELECT policy; bucket remains public so direct URLs still work
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;

-- 6. Revoke EXECUTE on SECURITY DEFINER functions from anon (has_role must stay executable for authenticated because RLS calls it)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_team_members() FROM anon, PUBLIC;
-- get_team_members is only useful to signed-in team members; keep authenticated
GRANT EXECUTE ON FUNCTION public.get_team_members() TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Also revoke handle_new_user / generate_tracking_id / update_updated_at_column from anon/authenticated (trigger-only)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.generate_tracking_id() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
