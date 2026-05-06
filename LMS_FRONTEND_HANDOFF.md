# LMS Frontend Handoff Documentation

## 1. Project Overview

This project is a frontend application for an LMS named **Eduka**. It is built with **Next.js App Router, React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, and Lucide React**.

The system is designed as a frontend for a Learning Management System that supports public landing pages, authentication, student dashboard, course catalog, course detail preview, user listing, blog content, and future mentor/instructor workflows.

The current frontend has evolved from a React mini project requirement into a more complete LMS frontend. The early mini project requirements were authentication, protected route, user list, user detail, pagination, and responsive design. Those parts are already implemented and documented in the earlier project docs. The current state also includes a full landing page experience with Home, Courses, Blog, and About Us pages, plus real API integration for course data.

---

## 2. Main Purpose of the System

Eduka is an LMS frontend for:

1. Allowing visitors to explore the learning platform.
2. Allowing students to register, login, browse courses, view course detail, and later checkout/enroll.
3. Allowing instructors or mentors to later register, login, create courses, and manage their own courses.
4. Displaying course catalog data from the backend API.
5. Displaying educational blog/news content from NewsAPI.
6. Providing responsive landing pages for desktop, tablet, and mobile.

The project follows a modular, feature-based structure so each domain such as `auth`, `users`, `course`, `home`, `blog`, and `about` has its own components, hooks, services, types, and context where needed.

---

## 3. Tech Stack

| Technology | Purpose |
|---|---|
| Next.js App Router | Routing, layouts, pages, dynamic routes |
| React | UI library |
| TypeScript | Type safety for props, API response, state, and context |
| Tailwind CSS | Utility-first responsive styling |
| Axios | HTTP client for backend API integration |
| React Hook Form | Form state management |
| Zod | Form validation schema |
| @hookform/resolvers | Connect Zod with React Hook Form |
| Lucide React | Icons |
| NewsAPI | External open-source news/blog API |
| Laravel Backend API | LMS data source for auth, users, courses, categories, and course detail |

---

## 4. Environment Variables

The project uses `.env.local` for API base URLs and secret keys.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
```

For staging backend:

```env
NEXT_PUBLIC_API_BASE_URL=http://38.47.180.195/student02/api/v1
```

Important notes:

- `NEXT_PUBLIC_API_BASE_URL` is exposed to the browser because frontend requests use it.
- `NEWS_API_KEY` must **not** use `NEXT_PUBLIC_`, because it should stay server-side.
- NewsAPI is accessed through an internal Next.js API route so the API key is not exposed in browser code.

---

## 5. API Base URL Strategy

The project supports local and staging APIs.

Local backend:

```txt
http://127.0.0.1:8000/api/v1
```

Staging backend:

```txt
http://38.47.180.195/student02/api/v1
```

Axios instance is located in:

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

---

## 6. Next Image Configuration

The backend can return thumbnails from local Laravel storage and staging storage.

Examples:

```txt
http://127.0.0.1:8000/storage/courses/thumbnails/example.webp
http://38.47.180.195/storage/...
http://38.47.180.195/student02/storage/...
```

`next.config.ts` should support these sources:

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

Reason:

- `next/image` blocks remote domains unless configured.
- Next.js 16 can block upstream images that resolve to local/private IP such as `127.0.0.1`; `dangerouslyAllowLocalIP` is only enabled during development.
- For production, prefer public staging URLs, not `127.0.0.1`.

---

## 7. Current Main Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home landing page |
| `/courses` | Public | Course catalog page |
| `/courses/[slug]` | Public for preview mode | Course detail preview page |
| `/blog` | Public | Blog page using NewsAPI |
| `/about-us` | Public | About Us landing page |
| `/login` | Guest only | Login page |
| `/register` | Guest only | Register page, supports role testing |
| `/dashboard` | Protected | User dashboard |
| `/users/[id]` | Protected | User detail page |

Important route convention:

- The project uses `/courses` with **s** for course catalog and detail routes.
- Course card detail links should use:

```tsx
href={`/courses/${course.slug}`}
```

Do not use `/course/${slug}` unless the route is changed globally.

---

## 8. Current High-Level Project Structure

```txt
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── users/[id]/page.tsx
│   ├── courses/page.tsx
│   ├── courses/[slug]/page.tsx
│   ├── blog/page.tsx
│   ├── about-us/page.tsx
│   └── api/news/route.ts
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
    └── storage.ts
```

Note: Some files use `constans.ts` instead of `constants.ts`. Keep imports consistent unless refactoring.

---

## 9. Reusable UI Components

### `Button`

Located at:

```txt
src/components/ui/button.tsx
```

Supports variants such as:

```txt
primary
secondary
danger
outline
ghost, if added
```

Used across auth, navbar, footer, course, blog, CTA, and error states.

### `Input`

Located at:

```txt
src/components/ui/input.tsx
```

Supports:

- label
- error message
- regular input props

### `Loading`

Located at:

```txt
src/components/ui/loading.tsx
```

Used for data fetching states.

### `Pagination`

Located at:

```txt
src/components/ui/pagination.tsx
```

Supports:

```ts
currentPage
totalPages
onPageChange
showPageInput?: boolean
```

`showPageInput` allows users to input a page number directly and jump to that page.

### `CourseCard`

Located at:

```txt
src/components/ui/course-card.tsx
```

Reusable for:

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

Business rule:

- If `thumbnail_url` is null or empty, map it before passing to `CourseCard`:

```ts
const thumbnailUrl =
  course.thumbnail_url && course.thumbnail_url.trim() !== ""
    ? course.thumbnail_url
    : "/images/image-not-available.png";
```

---

## 10. Auth Feature

Located at:

```txt
src/features/auth
```

Responsibilities:

- Login
- Register
- Logout
- Store token and user in localStorage
- Provide global auth state using React Context
- Guard guest and protected pages

Important files:

```txt
features/auth/components/login-form.tsx
features/auth/components/register-form.tsx
features/auth/context/auth-context.tsx
features/auth/hooks/use-auth.ts
features/auth/services/auth-service.ts
features/auth/types/auth.type.ts
features/auth/validations/auth-schema.ts
```

Auth response success example:

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

Auth error response example:

```json
{
  "success": false,
  "message": "Invalid credentials provided."
}
```

Business rules:

- After login/register success, save `user` and `token` to localStorage.
- `AuthContext` provides `isAuthenticated`.
- `GuestRoute` prevents logged-in users from revisiting login/register.
- `ProtectedRoute` prevents guests from accessing protected pages.
- Browser back issue from dashboard to login was handled using `GuestRoute` and `router.replace` where appropriate.

---

## 11. Register Roles

Register form currently supports role testing.

Known roles:

```txt
student
instructor
```

Footer mentor links use:

```txt
/register?role=instructor
```

Future enhancement:

- `RegisterForm` should read query param `role=instructor` and preselect instructor/mentor role.
- Production should not expose all sensitive roles publicly. Admin-level roles should be controlled server-side.

---

## 12. Users Feature

Located at:

```txt
src/features/users
```

Responsibilities:

- Fetch user list
- Show users in dashboard
- Show user detail by ID
- Pagination

Endpoints:

```txt
GET /users?page=1&per_page=10
GET /auth/user/{id}
```

Important files:

```txt
features/users/components/user-card.tsx
features/users/components/user-list.tsx
features/users/components/user-detail-card.tsx
features/users/hooks/use-users.ts
features/users/hooks/use-user-detail.ts
features/users/services/user-service.ts
features/users/types/user.type.ts
```

Business rules:

- User list is shown in `/dashboard`.
- User detail route is `/users/[id]`.
- User list and detail are protected routes.

---

## 13. Landing Page Pages

The landing page now consists of 4 main public pages:

```txt
Home
Courses
Blog
About Us
```

Navbar should contain:

```txt
Home -> /
Courses -> /courses
Blog -> /blog
About Us -> /about-us
```

Navbar has active indicator:

- Desktop: orange underline/pill indicator.
- Mobile: active link has primary blue background.

---

## 14. Home Page

Route:

```txt
/
```

Home page sections:

```txt
1. Hero Section
2. Course Preview Section
3. Features Section
4. How It Works Section
5. Testimonials Section
6. CTA Section
```

`StatsSection` exists or was planned, but currently may be commented out.

Important files:

```txt
src/features/home/components/hero-section.tsx
src/features/home/components/course-preview-section.tsx
src/features/home/components/features-section.tsx
src/features/home/components/how-it-works-section.tsx
src/features/home/components/testimonials-section.tsx
src/features/home/components/cta-section.tsx
src/features/home/constants/home-data.ts
src/features/home/hooks/use-popular-courses.ts
src/features/home/services/home-service.ts
```

### Home Course Preview Fetch

`CoursePreviewSection` fetches course data from the backend instead of static data.

Endpoint:

```txt
GET /courses?page=1&per_page=10
```

Purpose:

- Show popular or preview courses on the homepage.
- Uses real backend course data.
- Renders with reusable `CourseCard`.

Expected service flow:

```txt
CoursePreviewSection
↓
usePopularCourses
↓
homeService.getPopularCourses
↓
GET /courses?page=1&per_page=10
```

---

## 15. Courses Page

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
5. Learning Benefits Section, currently may be commented
6. CTA Section, currently may be commented
```

Important files:

```txt
src/features/course/components/course-page-content.tsx
src/features/course/components/course-hero-section.tsx
src/features/course/components/course-search-filter-section.tsx
src/features/course/components/course-catalog-section.tsx
src/features/course/components/course-category-sidebar.tsx
src/features/course/components/course-category-tabs.tsx
src/features/course/components/course-grid.tsx
src/features/course/components/featured-course-section.tsx
src/features/course/components/course-benefits-section.tsx
src/features/course/components/course-cta-section.tsx
src/features/course/context/course-context.tsx
src/features/course/hooks/use-course.ts
src/features/course/hooks/use-course-detail.ts
src/features/course/services/course-service.ts
src/features/course/types/course.type.ts
```

### Course Page Data Flow

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
CourseSearchFilterSection changes filters
↓
CourseCatalogSection renders categories and CourseGrid
```

### Course List Endpoint

```txt
GET /courses?level=intermediate&category_id=&search=&page=1&per_page=5&status=published
```

Params:

| Param | Description |
|---|---|
| `category_id` | Filter by category ID, empty if all |
| `level` | `beginner`, `intermediate`, `advanced`, or empty/all |
| `search` | Search keyword |
| `page` | Current page |
| `per_page` | Number of courses per page |
| `status` | Default should be `published` for landing page |

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

### Course Category Endpoint

```txt
GET /categories
```

The category list is used for:

- Desktop category sidebar.
- Mobile/tablet category tabs.

### Course Context State

`CourseContext` manages:

```txt
courses
recommendedCourses
categories
pagination
recommendedPagination
filters
isLoading
isRecommendedLoading
errorMessage
recommendedErrorMessage
```

Actions:

```txt
setSearch
setCategoryId
setLevel
setStatus
setPage
clearFilters
refetchCourses
fetchRecommendedCourses
```

### Course Search & Filter Rules

- Search input updates `filters.search`.
- Level select updates `filters.level`.
- Category sidebar/tabs update `filters.category_id`.
- Each filter change resets `page` to 1.
- Status filter is not shown in UI, but default should remain `published`.
- Clear filters resets to `initialFilters`.

### Course Pagination

`CourseGrid` uses reusable `Pagination`.

Recommended usage:

```tsx
<Pagination
  currentPage={filters.page}
  totalPages={pagination.last_page}
  onPageChange={setPage}
  showPageInput
/>
```

### Recommended Course Section

The `FeaturedCourseSection` shows recommended courses in a horizontal scroll layout.

Endpoint:

```txt
GET /courses?recommended={user_id}&page=1&per_page=10&status=published
```

If backend expects typo key:

```txt
GET /courses?recomended={user_id}&page=1&per_page=10&status=published
```

Current behavior:

- Uses `user?.id ?? 1` for fallback guest simulation.
- Renders up to 10 courses.
- Horizontal scroll.
- Uses `CourseCard`.

---

## 16. Course Detail Preview Page

Route:

```txt
/courses/[slug]
```

Current focus is **preview mode** for guest or student who has not enrolled.

Planned detail modes:

```txt
1. Preview mode for guest/student not enrolled
2. Enrolled student mode
3. Instructor owner mode
```

Only mode 1 is currently implemented.

### Preview Mode Business Rules

For guest or non-enrolled student:

- Show course detail.
- Show thumbnail in hero background with overlay.
- Show course description, categories, level, rating, lessons count.
- Show video player for preview lessons only.
- Lessons with `is_preview = true` can be played.
- Lessons with `is_preview = false` are locked.
- Right sidebar shows checkout CTA.
- If guest clicks checkout, redirect to login/register first.
- If logged-in student clicks checkout, redirect to checkout page.

### Course Detail Endpoint

```txt
GET /courses/slug/{slug}
```

Example:

```txt
GET /courses/slug/flutter-mobile-development-1777467808250
```

Response:

```json
{
  "success": true,
  "message": "Detail course",
  "data": {
    "id": 5,
    "title": "Flutter Mobile Development 1777467808250",
    "slug": "flutter-mobile-development-1777467808250",
    "description": "Course lengkap untuk belajar Flutter dari dasar",
    "level": "beginner",
    "price": 150000,
    "quota": 50,
    "status": "draft",
    "thumbnail_url": null,
    "rating_count": 0,
    "rating_avg": "0.00",
    "created_at": "2026-04-29T13:03:28.000000Z",
    "categories": [],
    "lessons": []
  }
}
```

Important files:

```txt
src/app/courses/[slug]/page.tsx
src/features/course/components/course-detail-preview-page.tsx
src/features/course/components/course-detail-hero.tsx
src/features/course/components/course-preview-player.tsx
src/features/course/components/course-lesson-preview-list.tsx
src/features/course/components/course-checkout-card.tsx
src/features/course/hooks/use-course-detail.ts
```

### Dynamic Route Important Note

Because this project uses `/courses` with **s**, dynamic route file must be:

```txt
src/app/courses/[slug]/page.tsx
```

For Next.js version with async params:

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

If `slug` is undefined, the frontend will not call Laravel API. Network may show `?_rsc=...` internal Next.js response, not JSON API.

### Course Detail Hero

Hero should use `thumbnail_url` as a background image with overlay.

Recommended fallback:

```ts
const thumbnailUrl =
  course?.thumbnail_url && course.thumbnail_url.trim() !== ""
    ? course.thumbnail_url
    : "/images/image-not-available.png";
```

`CourseDetailHero` props:

```ts
type CourseDetailHeroProps = {
  course: Course;
  thumbnailUrl: string;
};
```

---

## 17. Blog Page

Route:

```txt
/blog
```

Blog uses NewsAPI through internal Next.js API route.

Important files:

```txt
src/app/blog/page.tsx
src/app/api/news/route.ts
src/features/blog/components/blog-card.tsx
src/features/blog/components/blog-search-filter.tsx
src/features/blog/hooks/use-blog-articles.ts
src/features/blog/services/blog-service.ts
src/features/blog/types/blog.type.ts
```

### Blog API Flow

```txt
Browser /blog
↓
blogService.getArticles()
↓
fetch('/api/news')
↓
Next.js API route reads NEWS_API_KEY from .env
↓
Request to NewsAPI
↓
Response returned to frontend
```

NewsAPI endpoint:

```txt
GET https://newsapi.org/v2/everything
```

Supported params:

```txt
q
from
sortBy
page
pageSize
```

Default params:

```ts
const DEFAULT_PARAMS = {
  q: "education technology",
  sortBy: "publishedAt",
  page: 1,
  pageSize: 10,
};
```

Blog features:

- Search articles.
- Sort by `publishedAt`, `popularity`, or `relevancy`.
- Pagination.
- User can input page number directly.
- Loading state.
- Error state.
- Empty state.
- Blog card styling consistent with course card.

Important image note:

- NewsAPI image domains are unpredictable.
- `BlogCard` may use regular `<img>` instead of `next/image` to avoid remote domain errors.
- If using `next/image`, every possible image host must be configured, which is impractical for NewsAPI.

---

## 18. About Us Page

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

Important files:

```txt
src/features/about/components/about-hero-section.tsx
src/features/about/components/mission-vision-section.tsx
src/features/about/components/why-eduka-section.tsx
src/features/about/components/values-section.tsx
src/features/about/components/about-cta-section.tsx
src/features/about/constants/about-data.ts
src/app/about-us/page.tsx
```

Purpose:

- Explain what Eduka is.
- Explain mission and vision.
- Explain learning values.
- Encourage users to start learning or browse courses.

---

## 19. Navbar

Located at:

```txt
src/components/common/navbar.tsx
```

Features:

- Desktop menu.
- Mobile hamburger menu.
- Smooth open/close animation.
- Auth-aware menu.
- Active route indicator.

Main public links:

```ts
const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
];
```

Auth links:

```ts
const authLinks = [
  { label: "Users", href: "/users" },
  { label: "Dashboard", href: "/dashboard" },
];
```

Active route helper:

```ts
const isActiveLink = (href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
```

---

## 20. Footer

Located at:

```txt
src/components/common/footer.tsx
```

Footer uses primary gradient background:

```txt
from-[#0d22a8] via-[#101f8f] to-[#06115a]
```

Footer columns:

```txt
Eduka
Platform
Learning
Mentor
```

Platform links:

```txt
Home
Courses
Blog
About Us
```

Learning links:

```txt
Daftar Student
Login Student
Dashboard Student
Mulai Belajar
```

Mentor links:

```txt
Register Mentor -> /register?role=instructor
Login Mentor -> /login
Mentor Dashboard -> /dashboard
Buat Course -> /dashboard
```

Future enhancement:

- Create dedicated mentor routes:

```txt
/mentor/register
/mentor/login
/mentor/dashboard
/mentor/courses/create
```

---

## 21. Styling System

Main design colors:

```txt
Primary: #0d22a8
Secondary: #F25019
Dark gradient: #0d22a8 -> #101f8f -> #06115a
Background: white / gray-50
Card: white, rounded-3xl, border-gray-200, shadow-sm/xl
```

Common UI patterns:

- Rounded cards: `rounded-3xl` or `rounded-[1.5rem]`.
- Primary CTA button: orange `#F25019`.
- Blue active state: `#0d22a8`.
- White/soft-white text on gradient backgrounds.
- Mobile-first responsive design.

---

## 22. Business Rules Summary

### Guest user

Can:

- View Home.
- View Courses.
- Search/filter courses.
- View Course Detail Preview.
- Play lessons where `is_preview = true`.
- View Blog.
- View About Us.
- Register/login.

Cannot:

- Access dashboard.
- Access protected user pages.
- Checkout without login.
- Play locked lessons.

### Student user

Can:

- Login/register.
- View dashboard.
- View course catalog.
- View course preview.
- Checkout course if not enrolled.
- Later access enrolled course detail mode.

Future rules:

- If enrolled, student can play all lessons.
- Checkout CTA hidden on enrolled detail page.

### Instructor/Mentor user

Current:

- Can register using `role=instructor` flow if supported.
- Footer has mentor links.

Future:

- Instructor detail mode shows owned course detail.
- Instructor can see status course.
- Instructor can edit course.
- Instructor can create course.

---

## 23. Course Detail Mode Roadmap

The project plans 3 course detail modes:

### 1. Preview Mode - implemented

For guest or non-enrolled student.

Rules:

- Preview lessons only.
- Checkout card visible.
- Locked lessons disabled.

### 2. Enrolled Student Mode - not implemented yet

For student who already enrolled/purchased.

Rules:

- Can play all lessons.
- No checkout card.
- Show learning progress later.

### 3. Instructor Owner Mode - not implemented yet

For instructor who owns the course.

Rules:

- Show course status.
- Show edit course button.
- Could show course management actions.

---

## 24. Known API Endpoints

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
```

or if backend expects typo:

```txt
GET /courses?recomended={user_id}&page=1&per_page=10&status=published
```

### Blog

Frontend route:

```txt
GET /api/news
```

Internal external request:

```txt
GET https://newsapi.org/v2/everything
```

---

## 25. Known Issues and Fixes

### Next.js route returned `_rsc` response

Cause:

- User inspected Next.js internal RSC request instead of API request.
- If `slug` was undefined, `useCourseDetail` did not fetch Laravel API.

Fix:

- Ensure route is `src/app/courses/[slug]/page.tsx`.
- Use async params if needed.
- Pass `slug` to `CourseDetailPreviewPage`.

### Laravel log not showing request

Cause:

- Request was still hitting Next.js route, not Laravel API.
- Or `slug` was undefined and hook returned early.

Fix:

- Check Network tab for request to backend base URL.
- Add console log in `useCourseDetail`.

### `next/image` invalid hostname

Cause:

- Backend image host not configured in `next.config.ts`.

Fix:

- Add backend storage host to `remotePatterns`.

### `upstream image resolved to private ip`

Cause:

- Next Image optimizer blocked `127.0.0.1`.

Fix:

- Use `dangerouslyAllowLocalIP` only in development.
- Or add `unoptimized` to image component for local dev.

### NewsAPI images causing hostname errors

Cause:

- NewsAPI returns images from many unpredictable domains.

Fix:

- Use plain `<img>` in `BlogCard`.

### Response thumbnail has escaped slash

Example:

```json
"thumbnail_url": "http:\/\/127.0.0.1:8000\/storage\/..."
```

This is normal JSON escaping. Axios parses it into:

```txt
http://127.0.0.1:8000/storage/...
```

The issue is not escaped slash, but image domain configuration.

---

## 26. Commands

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build:

```bash
npm run build
```

Restart required after changing:

```txt
.env.local
next.config.ts
```

---

## 27. Suggested Next Development Steps

After landing page and preview course detail:

1. Implement checkout page.
2. Implement enrollment API flow.
3. Implement enrolled student course detail mode.
4. Implement lesson progress tracking.
5. Implement instructor dashboard.
6. Implement instructor course create/edit pages.
7. Implement mentor-specific register/login handling.
8. Add toast notifications.
9. Add skeleton loading UI.
10. Add SEO metadata for landing pages.
11. Add proper error boundaries.
12. Add deployment config for staging and production.

---

## 28. Quick Prompt for New AI Chat

Use this prompt when continuing in a new chat:

```txt
I am building an LMS frontend called Eduka using Next.js App Router, React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, and Lucide React.

The project uses a feature-based modular structure:
- src/components/ui for Button, Input, Card, Loading, Pagination, CourseCard
- src/components/common for Navbar, Footer, ProtectedRoute, GuestRoute
- src/features/auth for login/register/auth context/useAuth
- src/features/users for user list/detail
- src/features/home for landing home sections and popular courses
- src/features/course for course catalog, filters, categories, recommended courses, and course detail preview
- src/features/blog for NewsAPI blog page
- src/features/about for About Us page
- src/lib for api, storage, constants

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

The backend base URL is stored in NEXT_PUBLIC_API_BASE_URL. Local is http://127.0.0.1:8000/api/v1 and staging is http://38.47.180.195/student02/api/v1.

Course page uses CourseProvider and useCourse. It fetches:
- GET /courses with params category_id, level, search, page, per_page, status=published
- GET /categories
- GET /courses?recommended={user_id} or recomended={user_id} for recommended courses

Course detail preview route is /courses/[slug] and fetches GET /courses/slug/{slug}. Preview mode allows guest/non-enrolled students to play only lessons where is_preview=true. Locked lessons cannot be played. Checkout CTA is shown. Guest checkout redirects to login/register, logged-in student redirects to checkout.

Landing page is done: Home, Courses, Blog, About Us. I want to continue from this structure and business rules.
```

---

## 29. Current Completion Checklist

```txt
[x] Next.js project setup
[x] Clean modular feature-based structure
[x] Reusable UI components
[x] Auth register/login/logout
[x] AuthContext and useAuth
[x] ProtectedRoute and GuestRoute
[x] Dashboard page
[x] User list and pagination
[x] User detail
[x] Responsive Navbar with active indicator
[x] Informative Footer with mentor links
[x] Home landing page
[x] Home course preview fetch from backend
[x] Courses page
[x] Course search and filters
[x] Course category tabs/sidebar
[x] Course list fetch from backend
[x] Course pagination
[x] Recommended courses horizontal scroll
[x] Course detail preview by slug
[x] Preview video player for is_preview lessons
[x] Locked lessons for non-preview
[x] Checkout CTA card for preview detail
[x] Blog page using NewsAPI through internal API route
[x] Blog search, sort, cards, pagination with page input
[x] About Us page
[x] Local and staging API base URL support
[x] next/image config for local/staging backend thumbnails
```
