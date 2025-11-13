import { createClient } from '@supabase/supabase-js'

// Support both CRA env names and Next.js public env names
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key not found. Check environment variables.');
  console.log('URL:', supabaseUrl);
  console.log('ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');
  // don't throw here to avoid build-time failure in environments without env set
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
