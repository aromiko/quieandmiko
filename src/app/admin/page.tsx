import AdminDashboard from "@/components/component-blocks/admin/admin-dashboard";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();
  const { data: guests } = await supabase.from("guests").select("*");

  if (!guests) redirect("/");

  return <AdminDashboard guests={guests} />;
}
