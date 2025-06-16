import type { Database } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies(); // ✅ Await it here

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          cookie: cookieHeader
        }
      }
    }
  );
};
