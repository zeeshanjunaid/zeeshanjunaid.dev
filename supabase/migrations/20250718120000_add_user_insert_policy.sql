CREATE POLICY "Users can insert their own user record"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);