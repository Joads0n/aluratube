import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://qswkdqurfamdfinkalry.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzd2tkcXVyZmFtZGZpbmthbHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3MTgxNzUsImV4cCI6MTk4NDI5NDE3NX0.vOsL8L0f3Y33W64bOpofWJcl2Vq4EMRlvGBYrVp1spI";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*");
    }
  }
}