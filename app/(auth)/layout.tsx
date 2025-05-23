import AuthLayoutWrapper from "@/features/auth/components/AuthLayoutWrapper";
import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/");
  }

  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>;
}
