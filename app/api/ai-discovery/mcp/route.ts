import { NextResponse } from "next/server";
import { mcpStyleManifest } from "@/lib/ai-discovery";

export const dynamic = "force-static";
export const revalidate = 3600;

export function GET() {
  return NextResponse.json(mcpStyleManifest(), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
