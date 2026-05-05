import { NextRequest, NextResponse } from "next/server";

import { NewsApiResponse } from "@/features/blog/types/blog.type";

export async function GET(request: NextRequest) {
  const newsApiBaseUrl =
    process.env.NEWS_API_BASE_URL || "https://newsapi.org/v2";
  const newsApiKey = process.env.NEWS_API_KEY;

  if (!newsApiKey) {
    return NextResponse.json(
      {
        status: "error",
        message: "NEWS_API_KEY belum dikonfigurasi di environment.",
      },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;

  const q = searchParams.get("q") || "education technology";
  const from = searchParams.get("from") || undefined;
  const sortBy = searchParams.get("sortBy") || "publishedAt";
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("pageSize") || "10";

  const url = new URL(`${newsApiBaseUrl}/everything`);

  url.searchParams.set("q", q);
  url.searchParams.set("sortBy", sortBy);
  url.searchParams.set("page", page);
  url.searchParams.set("pageSize", pageSize);

  if (from) {
    url.searchParams.set("from", from);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "X-Api-Key": newsApiKey,
    },
    cache: "no-store",
  });

  const data = (await response.json()) as NewsApiResponse;

  return NextResponse.json(data, {
    status: response.status,
  });
}