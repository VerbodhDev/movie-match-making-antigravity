import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cnpgynayzzatfsxlveur.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGd5bmF5enphdGZzeGx2ZXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0Njc2MDgsImV4cCI6MjA2MjA0MzYwOH0.vrm72IDCCQTQTHhZImj_cemAk06G9msDfVIeNfVaHAs';

export const supabase = createClient(supabaseUrl, supabaseKey);
