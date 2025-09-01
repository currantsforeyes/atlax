import { createClient } from '@supabase/supabase-js';

// --- IMPORTANT ---
// Replace these placeholder values with your actual Supabase project URL and Anon Key.
// In a real production application, you should use environment variables to keep these keys secure.
// For example: const supabaseUrl = process.env.SUPABASE_URL;
const supabaseUrl = 'https://drcigskrjnnfeouzpkrm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyY2lnc2tyam5uZmVvdXpwa3JtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2NTM4NzAsImV4cCI6MjA3MjIyOTg3MH0.ehjFDjquZxDbJ2WQ3Yr4Go-FkTscvYDd2sQfO4vrm7U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);