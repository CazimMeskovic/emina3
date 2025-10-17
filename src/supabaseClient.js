import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ili Anon Key nisu pronađeni! Provjerite environment varijable.');
  console.log('URL:', supabaseUrl);
  console.log('ANON_KEY:', supabaseAnonKey ? 'Postoji' : 'Ne postoji');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)