import SignupForm from "@/features/auth/components/SignupForm";
import { createClient } from "@/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log("data", data);
  console.log("error", error);
  return <SignupForm />;
}
