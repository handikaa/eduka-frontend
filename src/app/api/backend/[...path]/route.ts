import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;

function buildTargetUrl(request: NextRequest, path: string[]) {
  if (!BACKEND_API_BASE_URL) {
    throw new Error("BACKEND_API_BASE_URL belum dikonfigurasi.");
  }

  const joinedPath = path.join("/");
  const targetUrl = new URL(`${BACKEND_API_BASE_URL}/${joinedPath}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.set(key, value);
  });

  return targetUrl;
}

function buildHeaders(request: NextRequest) {
  const headers = new Headers();

  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  const authorization = request.headers.get("authorization");

  if (authorization) {
    headers.set("Authorization", authorization);
  }

  return headers;
}

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;
    const targetUrl = buildTargetUrl(request, path);

    const method = request.method;
    const hasBody = !["GET", "HEAD"].includes(method);

    const backendResponse = await fetch(targetUrl.toString(), {
      method,
      headers: buildHeaders(request),
      body: hasBody ? await request.text() : undefined,
      cache: "no-store",
    });

    const contentType = backendResponse.headers.get("content-type");
    const responseBody = await backendResponse.text();

    return new NextResponse(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type": contentType || "application/json",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Proxy request gagal.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context);
}