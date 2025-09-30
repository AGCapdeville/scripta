import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://yxrcieteldxjmsgxgmoi.supabase.co'; //import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cmNpZXRlbGR4am1zZ3hnbW9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2ODMyMzAsImV4cCI6MjA3NDI1OTIzMH0.T1mEtvlnCP6fkIwT6B8Fh_xbkZUPx6FGqJpM-uQngTE';//import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing Supabase environment variables. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.",
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
