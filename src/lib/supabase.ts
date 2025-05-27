import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Veritabanı bağlantısını test etmek için örnek fonksiyon
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('personnel').select('*').limit(1)
    if (error) throw error
    console.log('Supabase bağlantısı başarılı:', data)
    return true
  } catch (error) {
    console.error('Supabase bağlantı hatası:', error)
    return false
  }
} 