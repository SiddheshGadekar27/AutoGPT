import { environment } from "@/services/environment";

// X-Forwarded-For is the client's address only behind a proxy that overwrites
// it: Vercel's edge, or one the operator vouches for with
// TRUST_X_FORWARDED_FOR=true (single-container's nginx). Next's own server
// keeps whatever the caller sent. Both client-address readers share this rule.
export function isForwardedForTrusted(): boolean {
  return (
    environment.isVercel() || process.env.TRUST_X_FORWARDED_FOR === "true"
  );
}

// The client IP for the sign-in IP log and IP blocks.
export function getTrustedClientIP(ip: string | null | undefined) {
  return isForwardedForTrusted() ? ip || null : null;
}
