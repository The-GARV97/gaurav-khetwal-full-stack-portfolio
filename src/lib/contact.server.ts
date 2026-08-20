import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function callerFingerprintSource() {
  const ip =
    getRequestIP({ xForwardedFor: true }) ??
    getRequestHeader("x-forwarded-for") ??
    getRequestHeader("user-agent") ??
    "unknown";
  return String(ip);
}

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX = 3;

export async function submitContact(input: ContactInput) {
  // Honeypot / obvious spam heuristics run before any database work.
  const linkCount = (input.message.match(/https?:\/\//gi) ?? []).length;
  if (linkCount > 4) {
    return { status: "error" as const, message: "This message looks like spam." };
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const ipHash = await sha256(callerFingerprintSource());
  const fingerprint = await sha256(
    [input.email.toLowerCase().trim(), input.subject.trim(), input.message.trim()].join("::"),
  );

  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60_000).toISOString();
  const { count, error: countError } = await supabaseAdmin
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (countError) {
    return { status: "error" as const, message: "Could not reach the message store." };
  }

  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return {
      status: "error" as const,
      message: `Too many messages. Please try again in ${RATE_LIMIT_WINDOW_MINUTES} minutes.`,
    };
  }

  const { error } = await supabaseAdmin.from("contact_messages").insert({
    name: input.name.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    fingerprint,
    ip_hash: ipHash,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        status: "duplicate" as const,
        message: "You already sent this exact message — I have it.",
      };
    }
    return { status: "error" as const, message: "Something went wrong while saving." };
  }

  return { status: "success" as const, message: "Message received. I'll get back to you." };
}
