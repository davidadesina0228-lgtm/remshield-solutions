import { NextResponse } from "next/server";
import {
  aiDiscoveryResources,
  getAiDiscoveryResource,
  type AiDiscoveryResource,
} from "@/lib/ai-discovery";

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return aiDiscoveryResources.map((resource) => ({ resource }));
}

export function GET(
  _request: Request,
  { params }: { params: { resource: AiDiscoveryResource } }
) {
  const payload = getAiDiscoveryResource(params.resource);

  if (!payload) {
    return NextResponse.json(
      {
        error: "AI discovery resource not found",
        availableResources: aiDiscoveryResources,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
