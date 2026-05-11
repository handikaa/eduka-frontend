import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = request.nextUrl.searchParams.get("url");

    if (!url) {
        return NextResponse.json(
            {
                success: false,
                message: "URL media wajib diisi.",
            },
            { status: 400 }
        );
    }

    try {
        const decodedUrl = decodeURIComponent(url);

        if (!decodedUrl.startsWith("http://") && !decodedUrl.startsWith("https://")) {
            return NextResponse.json(
                {
                    success: false,
                    message: "URL media tidak valid.",
                },
                { status: 400 }
            );
        }

        const response = await fetch(decodedUrl, {
            cache: "no-store",
        });

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Media tidak ditemukan.",
                },
                { status: response.status }
            );
        }

        const contentType =
            response.headers.get("content-type") || "application/octet-stream";

        const contentLength = response.headers.get("content-length");

        const headers = new Headers();

        headers.set("Content-Type", contentType);
        headers.set("Cache-Control", "public, max-age=3600");

        if (contentLength) {
            headers.set("Content-Length", contentLength);
        }

        return new NextResponse(response.body, {
            status: 200,
            headers,
        });
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: "Gagal mengambil media.",
            },
            { status: 500 }
        );
    }
}