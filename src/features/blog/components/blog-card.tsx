import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Newspaper, UserRound } from "lucide-react";

import { NewsArticle } from "@/features/blog/types/blog.type";

type BlogCardProps = {
  article: NewsArticle;
};

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function BlogCard({ article }: BlogCardProps) {
  const thumbnailUrl =
    article.urlToImage ||
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop";

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
          {article.source.name}
        </div>
      </div>

      <div className="p-6">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-gray-950">
          {article.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.description || "Tidak ada deskripsi artikel."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-secondary" />
            {formatPublishedDate(article.publishedAt)}
          </span>

          <span className="inline-flex items-center gap-1">
            <Newspaper className="h-4 w-4 text-primary" />
            Blog
          </span>

          <span className="inline-flex items-center gap-1">
            <UserRound className="h-4 w-4 text-primary" />
            {article.author || "Unknown"}
          </span>
        </div>

        <Link
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center text-sm font-bold text-primary"
        >
          Baca Artikel
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}