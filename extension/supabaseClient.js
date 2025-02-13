import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';


const SUPABASE_URL = "https://ukfazrrgqlbulttdqklf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrZmF6cnJncWxidWx0dGRxa2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MDM5MTYsImV4cCI6MjA1NDk3OTkxNn0.RFwZ9iDuWzfZIajacHUgsoKz6kja8s5rEPgo6paVpms";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
