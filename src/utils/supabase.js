import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xhihmnylfjtzpfpzsjna.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoaWhtbnlsZmp0enBmcHpzam5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0NDUxNjMsImV4cCI6MjEwMzAyMTE2M30.M-lVbTO5HQrTVoylKw7C6DJFDzKULpX7W0TBSE_3D6k';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to upload an image and return its public URL
export const uploadImage = async (file) => {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('inventory-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload Error:', uploadError.message);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('inventory-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};