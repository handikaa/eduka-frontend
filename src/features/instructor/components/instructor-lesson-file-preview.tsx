"use client";

import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getProxiedMediaUrl } from "@/lib/media-url";

type InstructorLessonFilePreviewProps = {
    fileUrl: string;
    title: string;
};

function getFileNameFromUrl(url: string) {
    if (!url) {
        return "File belum tersedia";
    }

    try {
        const pathname = new URL(url).pathname;
        return pathname.split("/").pop() || "File materi";
    } catch {
        return url.split("/").pop() || "File materi";
    }
}

export function InstructorLessonFilePreview({
    fileUrl,
    title,
}: InstructorLessonFilePreviewProps) {
    const safeFileUrl = getProxiedMediaUrl(fileUrl);
    const fileName = getFileNameFromUrl(fileUrl);

    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <FileText className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                        <p className="line-clamp-1 text-sm font-extrabold text-gray-950">
                            {title}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                            {fileName}
                        </p>
                    </div>
                </div>

                {fileUrl && (
                    <Button
                        type="button"
                        variant="outline"
                        className="w-fit rounded-full"
                        onClick={() => window.open(safeFileUrl, "_blank")}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Buka File
                    </Button>
                )}
            </div>
        </div>
    );
}