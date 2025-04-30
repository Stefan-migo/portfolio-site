import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseAnonKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create and export the Supabase client instance
// We can use this client instance throughout the application (client-side and server-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Optionally, you could define types based on your database schema here
// using supabase-js v2's generics or by generating types (e.g., using `supabase gen types typescript`)
// Example:
// import { Database } from './database.types'; // Assuming types are generated into this file
// export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
