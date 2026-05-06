const isServer = typeof window === "undefined";

export function getProxiedMediaUrl(url?: string | null) {
  if (!url || url.trim() === "") {
    return "/images/image-not-available.png";
  }

  const isLocalAsset = url.startsWith("/");
  const isHttpUrl = url.startsWith("http://");

  if (isLocalAsset) {
    return url;
  }

  /**
   * Jika sedang di browser dan URL media masih HTTP,
   * arahkan ke proxy agar tidak kena mixed content di Vercel HTTPS.
   */
  if (!isServer && isHttpUrl) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }

  return url;
}