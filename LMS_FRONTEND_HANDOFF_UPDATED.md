# Eduka LMS Frontend - Updated Handoff Documentation

## 1. Ringkasan Sistem

Eduka adalah aplikasi frontend untuk sistem **Learning Management System (LMS)** yang dibuat menggunakan **Next.js App Router, React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, dan Lucide React**.

Aplikasi ini awalnya dibuat untuk kebutuhan mini project React/Next.js, lalu berkembang menjadi frontend LMS yang lebih lengkap. Saat ini aplikasi sudah memiliki:

- Landing page public.
- Authentication register/login/logout.
- Protected route dan guest route.
- Dashboard user.
- User list dan user detail.
- Course catalog dengan search, filter, category, pagination.
- Course detail preview by slug.
- Preview video lesson untuk guest/non-enrolled student.
- Review course pada detail course.
- Blog page menggunakan NewsAPI.
- About Us page.
- Navbar responsive dengan active indicator.
- Footer informatif dengan link student dan mentor.
- Support local backend dan staging backend.
- Workaround deployment Vercel untuk backend HTTP melalui proxy API dan proxy media.

Dokumen ini dibuat agar ketika project dilanjutkan di chat AI baru, AI langsung memahami struktur project, tujuan LMS, aturan bisnis, route, API contract, dan rencana modul berikutnya, terutama **modul instructor/mentor**.

---

## 2. Tujuan Bisnis LMS Eduka

Eduka adalah platform LMS yang bertujuan untuk:

1. Membantu visitor melihat informasi platform belajar.
2. Membantu student mencari course, melihat detail course, menonton preview lesson, lalu checkout/enroll.
3. Membantu student yang sudah enroll belajar melalui lesson penuh.
4. Membantu instructor/mentor membuat dan mengelola course.
5. Menampilkan course berdasarkan kategori, level, status, search, dan pagination.
6. Menampilkan review course agar guest/student bisa menilai kualitas course sebelum membeli.
7. Menyediakan blog edukasi/teknologi sebagai bagian dari landing page.

Role utama:

```txt
student
instructor
```

Role yang direncanakan tetapi belum difokuskan:

```txt
admin
```

---

## 3. Tech Stack

| Teknologi | Fungsi |
|---|---|
| Next.js App Router | Routing, layout, page, API route/proxy |
| React | UI library |
| TypeScript | Type safety untuk props, response API, context, hooks |
| Tailwind CSS | Styling responsive mobile-first |
| Axios | HTTP client untuk backend LMS |
| React Hook Form | Form state management |
| Zod | Schema validation form |
| @hookform/resolvers | Integrasi Zod + React Hook Form |
| Lucide React | Icon UI |
| NewsAPI | Sumber data blog/news |
| Laravel Backend API | Backend utama LMS |
| Vercel | Deployment frontend |

---

## 4. Environment Variable

### Local Development

Contoh `.env.local` untuk local Laravel:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
```

### Staging Backend Direct HTTP

Jika running lokal tetapi ingin hit staging backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://38.47.180.195/student02/api/v1
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
```

### Vercel Production dengan HTTP Backend

Karena Vercel berjalan di HTTPS dan backend latihan menggunakan HTTP, browser akan memblokir request langsung karena mixed content. Jadi di Vercel gunakan proxy:

```env
NEXT_PUBLIC_API_BASE_URL=/api/backend
BACKEND_API_BASE_URL=http://38.47.180.195/student02/api/v1
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
```

Penjelasan:

- `NEXT_PUBLIC_API_BASE_URL=/api/backend` dipakai browser untuk request ke domain Vercel yang HTTPS.
- `BACKEND_API_BASE_URL=http://38.47.180.195/student02/api/v1` hanya dibaca server Next.js route handler.
- `NEWS_API_KEY` tidak boleh memakai prefix `NEXT_PUBLIC_` karena secret.
- `.env.local` tidak dibaca otomatis di Vercel jika tidak di-commit. Set env langsung di Vercel Project Settings.

---

## 5. API Strategy

### 5.1 Local / Development

Saat development lokal, Axios bisa langsung request ke Laravel:

```txt
http://127.0.0.1:8000/api/v1
```

### 5.2 Staging HTTP di Vercel

Masalah:

```txt
Frontend Vercel: https://eduka.vercel.app
Backend VPS:     http://38.47.180.195/student02/api/v1
```

Browser akan memblokir request HTTPS frontend ke HTTP backend sebagai mixed content.

Solusi:

```txt
Browser
↓ request HTTPS
/api/backend/courses
↓ Next.js Route Handler di Vercel
http://38.47.180.195/student02/api/v1/courses
```

Route proxy yang perlu ada:

```txt
src/app/api/backend/[...path]/route.ts
```

Behavior proxy:

- Forward method GET, POST, PUT, PATCH, DELETE.
- Forward query params.
- Forward `Authorization` header jika ada.
- Return response backend ke browser melalui HTTPS Vercel.

---

## 6. Media Proxy Strategy untuk Image dan Video HTTP

Backend menyimpan media URL di database dalam bentuk HTTP, misalnya:

```txt
http://38.47.180.195/student02/storage/courses/thumbnails/example.webp
http://38.47.180.195/student02/storage/courses/lessons/videos/example.mp4
```

Saat frontend di Vercel HTTPS, image/video HTTP bisa terkena mixed content. Solusinya membuat media proxy:

```txt
Browser HTTPS
↓
/api/media?url=<encoded-http-url>
↓
Next.js server fetch ke HTTP media backend
↓
Response image/video kembali ke browser via HTTPS
```

File yang perlu ada:

```txt
src/app/api/media/route.ts
src/lib/media-url.ts
```

Helper `src/lib/media-url.ts`:

```ts
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

  if (!isServer && isHttpUrl) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }

  return url;
}
```

Komponen yang harus memakai `getProxiedMediaUrl`:

```txt
src/components/ui/course-card.tsx
src/features/course/components/course-detail-hero.tsx
src/features/course/components/course-preview-player.tsx
```

Aturan:

- Thumbnail course harus diproxy jika HTTP.
- Hero image detail course harus diproxy jika HTTP.
- Video preview lesson harus diproxy jika HTTP.
- Fallback image lokal tetap `/images/image-not-available.png`.

Catatan production:

- Proxy video lewat Vercel cukup untuk latihan/bootcamp.
- Untuk production nyata, video sebaiknya disimpan di CDN/storage HTTPS seperti S3, Cloudflare R2, Supabase Storage, Bunny Stream, atau backend dengan SSL.

---

## 7. Axios Configuration

File:

```txt
src/lib/api.ts
```

Expected implementation:

```ts
import axios from "axios";

import { STORAGE_KEYS } from "@/lib/constans";
import { storage } from "@/lib/storage";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = storage.getItem(STORAGE_KEYS.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

Catatan:

- File constant di project saat ini menggunakan nama `constans.ts`, bukan `constants.ts`. Jangan asal rename jika belum refactor semua import.
- Interceptor akan membantu endpoint protected seperti users, dashboard, atau endpoint instructor.

---

## 8. Next Image Configuration

File:

```txt
next.config.ts
```

Untuk development local/staging image:

```ts
import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "38.47.180.195",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "38.47.180.195",
        pathname: "/student02/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
```

Catatan:

- Untuk media HTTP di Vercel, lebih aman memakai `/api/media` + `unoptimized` pada `next/image`.
- Jika memakai NewsAPI image dari banyak domain, pakai `<img>` biasa untuk BlogCard agar tidak perlu mendaftarkan domain acak.

---

## 9. Struktur Project Saat Ini

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── users/[id]/page.tsx
│   ├── courses/page.tsx
│   ├── courses/[slug]/page.tsx
│   ├── blog/page.tsx
│   ├── about-us/page.tsx
│   ├── api/news/route.ts
│   ├── api/backend/[...path]/route.ts
│   └── api/media/route.ts
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── loading.tsx
│   │   ├── pagination.tsx
│   │   └── course-card.tsx
│   └── common/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── protected-route.tsx
│       └── guest-route.tsx
│
├── features/
│   ├── auth/
│   ├── users/
│   ├── home/
│   ├── course/
│   ├── blog/
│   └── about/
│
└── lib/
    ├── api.ts
    ├── constans.ts
    ├── storage.ts
    └── media-url.ts
```

Jika file proxy belum dibuat di branch terbaru, buat sebelum deploy Vercel production.

---

## 10. Route Utama

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home landing page |
| `/courses` | Public | Course catalog page |
| `/courses/[slug]` | Public preview | Course detail preview page |
| `/blog` | Public | Blog page from NewsAPI |
| `/about-us` | Public | About Us page |
| `/login` | Guest only | Login page |
| `/register` | Guest only | Register page |
| `/dashboard` | Protected | User dashboard |
| `/users/[id]` | Protected | User detail page |

Route convention penting:

```txt
Project menggunakan /courses dengan huruf s.
Gunakan href={`/courses/${course.slug}`} untuk detail course.
Jangan gunakan /course/${slug} kecuali routing diubah global.
```

---

## 11. Reusable UI Components

### Button

File:

```txt
src/components/ui/button.tsx
```

Variant yang digunakan:

```txt
primary
secondary
danger
outline
ghost jika sudah ditambahkan
```

### Input

File:

```txt
src/components/ui/input.tsx
```

Mendukung:

- label
- error message
- HTML input props
- text color eksplisit agar input terbaca

### Loading

File:

```txt
src/components/ui/loading.tsx
```

Digunakan untuk loading state pada auth, users, courses, blog, reviews.

### Pagination

File:

```txt
src/components/ui/pagination.tsx
```

Props:

```ts
currentPage: number;
totalPages: number;
onPageChange: (page: number) => void;
showPageInput?: boolean;
```

Business rule:

- `showPageInput` memungkinkan user input nomor page manual.
- Dipakai di Blog dan Course Grid.
- Pagination sudah dibuat responsive untuk mobile.

### CourseCard

File:

```txt
src/components/ui/course-card.tsx
```

Dipakai untuk:

- Home Course Preview Section
- Course Catalog Section
- Recommended Course Section

Props:

```ts
title: string;
category: string;
level: string;
duration: string;
lessons: number;
description: string;
thumbnailUrl: string;
href?: string;
```

Aturan thumbnail:

```ts
const thumbnailUrl =
  course.thumbnail_url && course.thumbnail_url.trim() !== ""
    ? course.thumbnail_url
    : "/images/image-not-available.png";
```

Jika deploy ke Vercel dengan HTTP media, `CourseCard` harus memanggil `getProxiedMediaUrl(thumbnailUrl)`.

---

## 12. Auth Feature

Folder:

```txt
src/features/auth
```

File penting:

```txt
components/login-form.tsx
components/register-form.tsx
context/auth-context.tsx
hooks/use-auth.ts
services/auth-service.ts
types/auth.type.ts
validations/auth-schema.ts
```

Endpoint:

```txt
POST /auth/login
POST /auth/register
```

Login success response:

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "user": {
      "id": 2,
      "name": "User Student 389884841614",
      "email": "student389884841614@lms.local",
      "role": "student"
    },
    "token": "6|token",
    "token_type": "Bearer"
  }
}
```

Login failed response:

```json
{
  "success": false,
  "message": "Invalid credentials provided."
}
```

Business rules:

- Setelah login/register berhasil, simpan `user` dan `token` ke localStorage.
- AuthContext menyediakan `user`, `token`, `isAuthenticated`, `isLoading`, `login`, `register`, `logout`.
- `GuestRoute` mencegah user login membuka `/login` dan `/register`.
- `ProtectedRoute` mencegah guest membuka dashboard/protected pages.
- Error Axios harus mengambil `error.response?.data.message` agar UI menampilkan pesan backend, bukan `Request failed with status code 401`.

---

## 13. Register Role dan Mentor Entry

Register form saat ini mendukung role untuk testing.

Role yang digunakan:

```txt
student
instructor
```

Footer mentor link:

```txt
/register?role=instructor
```

Rencana enhancement:

- `RegisterForm` membaca query param `role=instructor`.
- Jika ada `role=instructor`, preselect role instructor.
- Untuk production, role sensitif seperti admin tidak boleh terbuka di public register.

---

## 14. Users Feature

Folder:

```txt
src/features/users
```

File penting:

```txt
components/user-card.tsx
components/user-list.tsx
components/user-detail-card.tsx
hooks/use-users.ts
hooks/use-user-detail.ts
services/user-service.ts
types/user.type.ts
```

Endpoint:

```txt
GET /users?page=1&per_page=10
GET /auth/user/{id}
```

Business rules:

- User list tampil di `/dashboard`.
- User detail route adalah `/users/[id]`.
- User list/detail protected.
- Pagination menggunakan reusable `Pagination`.

---

## 15. Landing Page Public

Landing page utama terdiri dari:

```txt
Home
Courses
Blog
About Us
```

Navbar public links:

```ts
const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
];
```

---

## 16. Home Page

Route:

```txt
/
```

Sections:

```txt
1. Hero Section
2. Course Preview Section
3. Features Section
4. How It Works Section
5. Testimonials Section
6. CTA Section
```

`StatsSection` pernah direncanakan tetapi bisa sedang commented.

File penting:

```txt
src/features/home/components/hero-section.tsx
src/features/home/components/course-preview-section.tsx
src/features/home/components/features-section.tsx
src/features/home/components/how-it-works-section.tsx
src/features/home/components/testimonials-section.tsx
src/features/home/components/cta-section.tsx
src/features/home/hooks/use-popular-courses.ts
src/features/home/services/home-service.ts
src/features/home/constants/home-data.ts
```

Course Preview Section sudah fetch backend:

```txt
GET /courses?page=1&per_page=10
```

Flow:

```txt
CoursePreviewSection
↓
usePopularCourses
↓
homeService.getPopularCourses
↓
GET /courses?page=1&per_page=10
↓
CourseCard
```

---

## 17. Courses Page

Route:

```txt
/courses
```

Sections:

```txt
1. Course Hero Section
2. Course Search & Filter Section
3. Course Category + Course List Section
4. Featured / Recommended Course Section
5. Learning Benefits Section, optional/commented
6. CTA Section, optional/commented
```

File penting:

```txt
src/features/course/components/course-page-content.tsx
src/features/course/components/course-hero-section.tsx
src/features/course/components/course-search-filter-section.tsx
src/features/course/components/course-catalog-section.tsx
src/features/course/components/course-category-sidebar.tsx
src/features/course/components/course-category-tabs.tsx
src/features/course/components/course-grid.tsx
src/features/course/components/featured-course-section.tsx
src/features/course/context/course-context.tsx
src/features/course/hooks/use-course.ts
src/features/course/services/course-service.ts
src/features/course/types/course.type.ts
```

### CourseProvider Flow

```txt
CoursePageContent
↓
CourseProvider
↓
fetchCategories()
GET /categories
↓
fetchCourses(filters)
GET /courses with params
↓
CourseSearchFilterSection updates filters
↓
CourseCatalogSection renders category tabs/sidebar + course grid
```

Default filters:

```ts
const initialFilters = {
  category_id: null,
  level: "all",
  search: "",
  status: "published",
  page: 1,
  per_page: 5,
};
```

Endpoint list course:

```txt
GET /courses?level=intermediate&category_id=&search=&page=1&per_page=5&status=published
```

Params:

| Param | Description |
|---|---|
| `category_id` | Filter by category ID, empty/all if null |
| `level` | beginner/intermediate/advanced/all |
| `search` | keyword search |
| `page` | current page |
| `per_page` | item count per page |
| `status` | default `published` for landing |

Endpoint category:

```txt
GET /categories
```

Rules:

- Search change resets page to 1.
- Level change resets page to 1.
- Category change resets page to 1.
- Clear filter resets to `initialFilters`.
- Status filter is hidden in UI, but default should remain `published`.

---

## 18. Recommended Courses

Section:

```txt
FeaturedCourseSection
```

Purpose:

- Shows recommended/popular courses in horizontal scroll.
- Uses CourseCard.
- Fetches max 10 courses.

Endpoint expected:

```txt
GET /courses?recommended={user_id}&page=1&per_page=10&status=published
```

If backend uses typo key:

```txt
GET /courses?recomended={user_id}&page=1&per_page=10&status=published
```

Current behavior:

```ts
const userId = user?.id ?? 1;
fetchRecommendedCourses(userId);
```

---

## 19. Course Detail Preview Page

Route:

```txt
/courses/[slug]
```

Current implemented mode:

```txt
Preview mode for guest or student who has not enrolled.
```

Future modes:

```txt
1. Preview mode - implemented
2. Enrolled student mode - not implemented
3. Instructor owner mode - not implemented
```

File penting:

```txt
src/app/courses/[slug]/page.tsx
src/features/course/components/course-detail-preview-page.tsx
src/features/course/components/course-detail-hero.tsx
src/features/course/components/course-preview-player.tsx
src/features/course/components/course-lesson-preview-list.tsx
src/features/course/components/course-checkout-card.tsx
src/features/course/components/course-reviews-section.tsx
src/features/course/hooks/use-course-detail.ts
src/features/course/hooks/use-course-reviews.ts
src/features/course/services/course-service.ts
src/features/course/services/course-review-service.ts
src/features/course/types/course.type.ts
src/features/course/types/course-review.type.ts
```

### Dynamic Route

Because project uses `/courses` with s:

```txt
src/app/courses/[slug]/page.tsx
```

For Next.js async params:

```tsx
import { CourseDetailPreviewPage } from "@/features/course/components/course-detail-preview-page";

type CourseDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { slug } = await params;

  return <CourseDetailPreviewPage slug={slug} />;
}
```

If `slug` is undefined:

- `useCourseDetail` will not fetch.
- Laravel log will not show request.
- Network may show Next internal `_rsc` response instead of API JSON.

### Course Detail Endpoint

```txt
GET /courses/slug/{slug}
```

Business rules preview mode:

- Guest and non-enrolled student can view detail.
- Hero uses `thumbnail_url` with overlay.
- First preview lesson can be selected by default.
- Lesson where `is_preview=true` can be played.
- Lesson where `is_preview=false` is locked.
- Checkout card visible on right side desktop.
- Checkout card sticky/scroll-following in detail section.
- Guest checkout redirects to login with redirect query.
- Logged-in student checkout redirects to checkout route.

Checkout card rule:

```txt
Guest click checkout -> /login?redirect=/checkout/{slug}
Authenticated student -> /checkout/{slug}
```

Sticky checkout requirement:

- Parent grid should use `items-start`.
- Card aside should use `self-start lg:sticky lg:top-24`.

---

## 20. Course Reviews on Detail Page

Course detail preview now needs to show reviews so guest/student can evaluate before buying.

Endpoint:

```txt
GET /course-reviews/courses/slug/{slug}?page=1&per_page=10
```

Response:

```json
{
  "success": true,
  "message": "Berhasil mengambil daftar review course berdasarkan slug",
  "data": [
    {
      "id": 1,
      "course_id": 14,
      "user_id": 10,
      "rating": 3,
      "comment": "Course sangat bagus dan materinya mudah dipahami.",
      "is_delete": false,
      "created_at": "2026-05-06T10:45:30.000000Z",
      "updated_at": "2026-05-06T10:45:30.000000Z",
      "user": {
        "id": 10,
        "name": "User Student 993204173257",
        "email": "student993204173257@lms.local",
        "role": "student",
        "is_active": true,
        "avatar_url": null
      }
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 10,
    "total": 1
  }
}
```

Files:

```txt
src/features/course/types/course-review.type.ts
src/features/course/services/course-review-service.ts
src/features/course/hooks/use-course-reviews.ts
src/features/course/components/course-reviews-section.tsx
```

Rules:

- Reviews visible in preview detail.
- Reviews are public/read-only for guest/non-enrolled student.
- Reviews have loading, error, empty state.
- Reviews use pagination with `showPageInput` if last_page > 1.
- Review card shows student name, email, rating stars, date, and comment.

---

## 21. Blog Page

Route:

```txt
/blog
```

Uses NewsAPI through internal Next.js API route.

Files:

```txt
src/app/blog/page.tsx
src/app/api/news/route.ts
src/features/blog/components/blog-card.tsx
src/features/blog/components/blog-search-filter.tsx
src/features/blog/hooks/use-blog-articles.ts
src/features/blog/services/blog-service.ts
src/features/blog/types/blog.type.ts
```

Flow:

```txt
Browser /blog
↓
blogService.getArticles()
↓
fetch('/api/news')
↓
Next.js API route reads NEWS_API_KEY
↓
Request to NewsAPI
↓
Return articles to frontend
```

Features:

- Search articles.
- Sort by `publishedAt`, `popularity`, `relevancy`.
- Pagination.
- Page number input.
- Loading/error/empty state.
- BlogCard styled similar to CourseCard.

Image rule:

- NewsAPI image host is unpredictable.
- Use plain `<img>` in BlogCard unless domains are controlled.

---

## 22. About Us Page

Route:

```txt
/about-us
```

Sections:

```txt
1. About Hero Section
2. Mission & Vision Section
3. Why Eduka Section
4. Values Section
5. About CTA Section
```

Files:

```txt
src/features/about/components/about-hero-section.tsx
src/features/about/components/mission-vision-section.tsx
src/features/about/components/why-eduka-section.tsx
src/features/about/components/values-section.tsx
src/features/about/components/about-cta-section.tsx
src/features/about/constants/about-data.ts
src/app/about-us/page.tsx
```

---

## 23. Navbar

File:

```txt
src/components/common/navbar.tsx
```

Features:

- Desktop horizontal menu.
- Mobile hamburger menu.
- Smooth open/close animation.
- Auth-aware menu.
- Active route indicator.

Active route helper:

```ts
const isActiveLink = (href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
```

Desktop active indicator:

```txt
Small orange pill/underline using #F25019
```

Mobile active indicator:

```txt
Blue background #0d22a8 and white text
```

---

## 24. Footer

File:

```txt
src/components/common/footer.tsx
```

Footer uses gradient:

```txt
from-[#0d22a8] via-[#101f8f] to-[#06115a]
```

Columns:

```txt
Eduka
Platform
Learning
Mentor
```

Platform:

```txt
Home
Courses
Blog
About Us
```

Learning:

```txt
Daftar Student
Login Student
Dashboard Student
Mulai Belajar
```

Mentor:

```txt
Register Mentor -> /register?role=instructor
Login Mentor -> /login
Mentor Dashboard -> /dashboard
Buat Course -> /dashboard
```

Future mentor routes:

```txt
/instructor/dashboard
/instructor/courses
/instructor/courses/create
/instructor/courses/[slug]
/instructor/courses/[id]/edit
```

---

## 25. Styling System

Main colors:

```txt
Primary: #0d22a8
Secondary: #F25019
Dark gradient: #0d22a8 -> #101f8f -> #06115a
Background: white / gray-50
Card: white, rounded-3xl, border-gray-200, shadow-sm/xl
```

Patterns:

```txt
Mobile-first responsive
Rounded card UI
Orange CTA button
Blue active/focus state
White/soft-white text on gradient
Grid layout for desktop
Stack layout for mobile
```

---

## 26. Business Rules Summary

### Guest

Can:

- View Home.
- View Courses.
- Search/filter courses.
- View Course Detail Preview.
- Play preview lessons only.
- View course reviews.
- View Blog.
- View About Us.
- Register/login.

Cannot:

- Access dashboard.
- Access protected user pages.
- Checkout without login.
- Play locked lessons.

### Student

Can:

- Register/login.
- View dashboard.
- View course catalog.
- View course detail preview.
- View course reviews.
- Checkout if not enrolled.

Future:

- If enrolled, play all lessons.
- Access course progress.
- Mark lesson as completed.
- Continue learning from last lesson.
- No checkout card in enrolled detail mode.

### Instructor/Mentor

Current:

- Can register with `role=instructor` if backend supports it.
- Footer has mentor links.

Future:

- Instructor dashboard.
- Instructor course list.
- Create course.
- Edit course.
- Manage course status.
- Manage lessons.
- Set preview lesson.
- View instructor-owned course detail.
- No checkout card in instructor detail.
- Show edit button in instructor detail.

---

## 27. Instructor Module Plan - Next Work

This is the next planned module.

### Goal

Create a mentor/instructor workflow for managing courses.

### Suggested Routes

```txt
/instructor/dashboard
/instructor/courses
/instructor/courses/create
/instructor/courses/[slug]
/instructor/courses/[id]/edit
/instructor/courses/[id]/lessons
```

### Suggested Feature Folder

```txt
src/features/instructor/
├── components/
│   ├── instructor-dashboard-summary.tsx
│   ├── instructor-course-list.tsx
│   ├── instructor-course-card.tsx
│   ├── instructor-course-form.tsx
│   ├── instructor-course-detail.tsx
│   └── instructor-lesson-form.tsx
├── hooks/
│   ├── use-instructor-courses.ts
│   ├── use-instructor-course-detail.ts
│   └── use-instructor-course-form.ts
├── services/
│   └── instructor-service.ts
├── types/
│   └── instructor.type.ts
└── validations/
    └── instructor-course-schema.ts
```

### Business Rules

- Only authenticated instructor can access instructor routes.
- If user role is not instructor, redirect or show unauthorized state.
- Instructor sees only courses they own.
- Instructor can see course status: draft, published, archived.
- Instructor can create course.
- Instructor can edit course.
- Instructor can upload/update thumbnail.
- Instructor can manage categories if allowed by backend.
- Instructor can create/update/delete lessons if backend supports it.
- Instructor can mark lesson as preview using `is_preview`.
- Instructor detail mode does not show checkout card.
- Instructor detail mode shows management actions such as Edit Course.

### Suggested Instructor Route Guard

Create role guard:

```txt
src/components/common/instructor-route.tsx
```

Rules:

```txt
if not authenticated -> redirect /login
if authenticated but user.role !== 'instructor' -> redirect /dashboard or show unauthorized
if instructor -> render children
```

### Suggested Service Pattern

Follow existing service pattern:

```txt
features/course/services/course-service.ts
features/users/services/user-service.ts
features/auth/services/auth-service.ts
```

Use Axios instance `api` so token is attached automatically.

---

## 28. Known API Endpoints

### Auth

```txt
POST /auth/login
POST /auth/register
```

### Users

```txt
GET /users?page=1&per_page=10
GET /auth/user/{id}
```

### Courses

```txt
GET /courses?page=1&per_page=5&status=published
GET /courses?level=intermediate&category_id=&search=&page=1&per_page=5&status=published
GET /courses/slug/{slug}
```

### Categories

```txt
GET /categories
```

### Recommended Courses

```txt
GET /courses?recommended={user_id}&page=1&per_page=10&status=published
GET /courses?recomended={user_id}&page=1&per_page=10&status=published
```

### Course Reviews

```txt
GET /course-reviews/courses/slug/{slug}?page=1&per_page=10
```

### Blog

Frontend:

```txt
GET /api/news
```

External:

```txt
GET https://newsapi.org/v2/everything
```

### Vercel Proxy

```txt
/api/backend/[...path]
/api/media?url={encodedUrl}
```

---

## 29. Known Issues and Fixes

### Mixed content on Vercel

Cause:

```txt
Frontend HTTPS tries to fetch HTTP backend.
```

Fix:

```env
NEXT_PUBLIC_API_BASE_URL=/api/backend
BACKEND_API_BASE_URL=http://38.47.180.195/student02/api/v1
```

Add:

```txt
src/app/api/backend/[...path]/route.ts
```

### Mixed content for image/video

Cause:

```txt
Backend DB stores HTTP media URL.
```

Fix:

```txt
src/app/api/media/route.ts
src/lib/media-url.ts
```

Use `getProxiedMediaUrl` in CourseCard, CourseDetailHero, CoursePreviewPlayer.

### `next/image` invalid hostname

Cause:

```txt
Backend storage host not configured in next.config.ts.
```

Fix:

- Add remotePatterns.
- For local IP in dev, use `dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development'`.
- For proxy URL, use `unoptimized`.

### `_rsc` response instead of JSON

Cause:

- Inspecting Next internal route request.
- Or dynamic route slug undefined.

Fix:

- Confirm route is `src/app/courses/[slug]/page.tsx`.
- Await `params` if using newer Next.js.
- Confirm `slug` is passed into `CourseDetailPreviewPage`.

### Laravel log not showing

Cause:

- Request did not reach backend.
- Usually route slug undefined or frontend hit Next page only.

Fix:

- Check Network for `/api/backend/...` or direct backend URL.
- Add console log in hook/service.

### NewsAPI image domain errors

Cause:

- NewsAPI image domains are unpredictable.

Fix:

- Use `<img>` in BlogCard.

---

## 30. Commands

Install:

```bash
npm install
```

Run dev:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Restart required after editing:

```txt
.env.local
next.config.ts
```

---

## 31. Current Completion Checklist

```txt
[x] Next.js App Router setup
[x] TypeScript setup
[x] Tailwind CSS setup
[x] Axios instance
[x] Environment variable local/staging
[x] Reusable UI components
[x] Auth login/register/logout
[x] AuthContext and useAuth
[x] ProtectedRoute and GuestRoute
[x] Dashboard page
[x] User list and pagination
[x] User detail
[x] Responsive navbar with active indicator
[x] Informative footer with mentor links
[x] Home landing page
[x] Home course preview fetch from backend
[x] Courses page
[x] Course search/filter/category
[x] Course list fetch from backend
[x] Course pagination with page input
[x] Recommended courses horizontal scroll
[x] Course detail preview by slug
[x] Hero thumbnail overlay on detail
[x] Preview video player for is_preview lessons
[x] Locked lessons for non-preview
[x] Sticky checkout card
[x] Course reviews section with pagination
[x] Blog page using NewsAPI through internal route
[x] Blog search, sort, card, pagination with input
[x] About Us page
[x] Vercel API proxy plan for HTTP backend
[x] Media proxy plan for HTTP image/video
```

---

## 32. Suggested Next Development Steps

Priority after landing page:

```txt
1. Implement Vercel API proxy if not yet committed
2. Implement media proxy if not yet committed
3. Implement InstructorRoute role guard
4. Implement instructor dashboard
5. Implement instructor course list
6. Implement instructor course create form
7. Implement instructor course edit form
8. Implement instructor course detail owner mode
9. Implement lesson management for instructor
10. Implement checkout page
11. Implement enrollment flow
12. Implement enrolled student course detail mode
13. Implement lesson progress
14. Add toast notification
15. Add skeleton loading
16. Add SEO metadata
17. Add error boundary
```

---

## 33. Quick Prompt for New AI Chat

Use this prompt in a new chat:

```txt
Saya sedang membangun LMS frontend bernama Eduka menggunakan Next.js App Router, React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, dan Lucide React.

Project memakai struktur feature-based:
- src/components/ui untuk Button, Input, Card, Loading, Pagination, CourseCard
- src/components/common untuk Navbar, Footer, ProtectedRoute, GuestRoute
- src/features/auth untuk login/register/auth context/useAuth
- src/features/users untuk user list/detail
- src/features/home untuk landing home dan popular courses
- src/features/course untuk course catalog, filters, categories, recommended courses, course detail preview, course reviews
- src/features/blog untuk NewsAPI blog page
- src/features/about untuk About Us page
- src/lib untuk api, storage, constans, media-url

Routes:
- / Home
- /courses Course catalog
- /courses/[slug] Course detail preview
- /blog Blog page
- /about-us About page
- /login Guest login
- /register Guest register
- /dashboard Protected dashboard
- /users/[id] Protected user detail

Backend local: http://127.0.0.1:8000/api/v1
Backend staging HTTP: http://38.47.180.195/student02/api/v1
Vercel production harus memakai proxy:
- NEXT_PUBLIC_API_BASE_URL=/api/backend
- BACKEND_API_BASE_URL=http://38.47.180.195/student02/api/v1

Course page memakai CourseProvider dan useCourse. It fetches:
- GET /courses with params category_id, level, search, page, per_page, status=published
- GET /categories
- GET /courses?recommended={user_id} atau recomended={user_id}

Course detail preview route /courses/[slug] fetches GET /courses/slug/{slug}. Preview mode allows guest/non-enrolled students to play only lessons where is_preview=true. Locked lessons cannot be played. Checkout CTA is shown. Guest checkout redirects to login/register, logged-in student redirects to checkout.

Detail course juga menampilkan reviews dari GET /course-reviews/courses/slug/{slug}?page=1&per_page=10 dengan pagination.

Jika deploy ke Vercel dan backend/media masih HTTP, gunakan API proxy /api/backend dan media proxy /api/media agar tidak terkena mixed content.

Landing page, auth, users, courses, course detail preview, reviews, blog, and about are done. Saya ingin lanjut membuat modul instructor/mentor dengan struktur yang konsisten.
```
