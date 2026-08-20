CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX contact_messages_fingerprint_key ON public.contact_messages (fingerprint);
CREATE INDEX contact_messages_ip_hash_created_at_idx ON public.contact_messages (ip_hash, created_at DESC);

GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;