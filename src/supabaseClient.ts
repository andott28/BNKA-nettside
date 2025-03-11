import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://byojlgufyettuyghnxmh.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5b2psZ3VmeWV0dHV5Z2hueG1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNDU5NTAsImV4cCI6MjA1NTgyMTk1MH0.U-42HXCjlc1cp3nzjdbjGBEWKrB8nTiaFWCnUJk1098';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
