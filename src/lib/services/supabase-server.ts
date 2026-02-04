import type { Database } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies(); // ✅ Await it here

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "[Supabase Server]: SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required"
    );
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        cookie: cookieHeader
      }
    }
  });
};
