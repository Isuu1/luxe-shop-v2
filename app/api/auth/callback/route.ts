import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Auth Callback Error:", error.message);
      throw new Error("Auth Callback Error: " + error.message);
    }
  } else {
    console.error("Auth Callback Error: No code provided");
    throw new Error("Auth Callback Error: No code provided");
  }

  return NextResponse.redirect(`${origin}`);
}
