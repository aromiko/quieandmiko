import AdminDashboard from "@/components/component-blocks/admin/admin-dashboard";
import { getAuthUser } from "@/lib/services/supabase-auth-server";
import { createSupabaseServerClient } from "@/lib/services/supabase-server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getAuthUser();

  // Double-check auth (middleware should handle this, but extra safety)
  if (!user) {
    redirect("/admin/login");
  }

  const supabase = await createSupabaseServerClient();
  const { data: guests } = await supabase.from("guests").select("*");

  if (!guests) redirect("/");

  return <AdminDashboard guests={guests} userEmail={user.email} />;
}
