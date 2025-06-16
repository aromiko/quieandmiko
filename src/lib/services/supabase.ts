import { createClient } from "@supabase/supabase-js";

import { DefaultAppSettings } from "../defaults/default-app.settings";

export const supabase = createClient(
  process.env.SUPABASE_URL || DefaultAppSettings.supabaseUrl,
  process.env.SUPABASE_ANON_KEY!
);
