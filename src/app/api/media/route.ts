import { NextRequest, NextResponse } from "next/server";

const ALLOWED_MEDIA_HOSTS = ["127.0.0.1", "localhost", "38.47.180.195"];

function isAllowedMediaUrl(url: URL) {
  return ALLOWED_MEDIA_HOSTS.includes(url.hostname);
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Parameter url wajib diisi.",
      },
      { status: 400 }
    );
  }

  let targetUrl: URL;

  try {
    targetUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "URL media tidak valid.",
      },
      { status: 400 }
    );
  }

  if (!["http:", "https:"].includes(targetUrl.protocol)) {
    return NextResponse.json(
      {
        success: false,
        message: "Protocol media tidak diizinkan.",
      },
      { status: 400 }
    );
  }

  if (!isAllowedMediaUrl(targetUrl)) {
    return NextResponse.json(
      {
        success: false,
        message: "Host media tidak diizinkan.",
      },
      { status: 403 }
    );
  }

  try {
    const response = await fetch(targetUrl.toString(), {
      cache: "no-store",
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        {
          success: false,
          message: "Gagal mengambil media dari backend.",
        },
        { status: response.status }
      );
    }

    const headers = new Headers();

    const contentType = response.headers.get("content-type");
    const contentLength = response.headers.get("content-length");
    const acceptRanges = response.headers.get("accept-ranges");

    if (contentType) {
      headers.set("Content-Type", contentType);
    }

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    if (acceptRanges) {
      headers.set("Accept-Ranges", acceptRanges);
    }

    headers.set("Cache-Control", "public, max-age=3600");

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan saat proxy media.",
      },
      { status: 500 }
    );
  }
}