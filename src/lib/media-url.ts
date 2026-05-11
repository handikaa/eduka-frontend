const isServer = typeof window === "undefined";

export function getProxiedMediaUrl(url?: string | null): string {
    if (!url || url.trim() === "") {
        return "/images/image-not-available.png";
    }

    const cleanUrl = url.trim();

    const isLocalAsset = cleanUrl.startsWith("/");
    const isHttpUrl = cleanUrl.startsWith("http://");

    if (isLocalAsset) {
        return cleanUrl;
    }

    if (!isServer && isHttpUrl) {
        return `/api/media?url=${encodeURIComponent(cleanUrl)}`;
    }

    return cleanUrl;
}