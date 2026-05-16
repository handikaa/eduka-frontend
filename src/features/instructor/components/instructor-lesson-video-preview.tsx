"use client";

import { Video } from "lucide-react";

import { getProxiedMediaUrl } from "@/lib/media-url";

type InstructorLessonVideoPreviewProps = {
    videoUrl: string;
    title: string;
};

export function InstructorLessonVideoPreview({
    videoUrl,
    title,
}: InstructorLessonVideoPreviewProps) {
    const safeVideoUrl = getProxiedMediaUrl(videoUrl);

    if (!videoUrl) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-3xl bg-gray-900 px-6 text-center text-white">
                <div>
                    <Video className="mx-auto h-8 w-8 text-secondary" />
                    <p className="mt-3 text-sm font-bold uppercase tracking-wide text-secondary">
                        Video belum tersedia
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                        Upload video MP4 baru untuk lesson ini.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-3xl bg-black shadow-sm">
            <video key={videoUrl} controls className="aspect-video w-full">
                <source src={safeVideoUrl} type="video/mp4" />
                Browser kamu tidak mendukung pemutar video.
            </video>

            <div className="border-t border-white/10 bg-gray-950 px-4 py-3">
                <p className="line-clamp-1 text-sm font-semibold text-white">
                    {title}
                </p>
            </div>
        </div>
    );
}