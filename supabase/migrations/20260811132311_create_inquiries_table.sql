/*
# Create inquiries table (single-tenant, no auth)

1. New Tables
- `inquiries`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `company` (text, nullable) — optional company name
  - `message` (text, not null) — the inquiry body
  - `status` (text, default 'new') — tracking status: new, contacted, closed
  - `created_at` (timestamptz, default now()) — submission timestamp

2. Security
- Enable RLS on `inquiries`.
- Allow anon + authenticated INSERT so the public contact form can submit inquiries.
- No SELECT/UPDATE/DELETE for anon — inquiries are private company data, not publicly readable.

3. Notes
- This is a no-auth corporate website. The contact form is public, so INSERT must be open to anon.
- Reading and managing inquiries is done by company staff via the Supabase dashboard (service role), not through the frontend.
- An index on `created_at` supports chronological sorting in the dashboard.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries (created_at DESC);

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
