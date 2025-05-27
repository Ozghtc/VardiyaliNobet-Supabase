import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nskebkbwvkthjswxjejo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5za2Via2J3dmt0aGpzd3hqZWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5MjQ5NzAsImV4cCI6MjA1NTUwMDk3MH0.2XQqXQqXQqXQqXQqXQqXQqXQqXQqXQqXQqXQqXQqXQ' // Buraya Supabase projenizin anon key'ini ekleyin

export const supabase = createClient(supabaseUrl, supabaseKey)

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