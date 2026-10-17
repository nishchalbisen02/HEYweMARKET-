import { llmsTxt } from "@/lib/llms";

// Built once at build time from the site data modules.
export const dynamic = "force-static";

const headers = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
};

export function GET() {
  return new Response(llmsTxt(), { headers });
}
