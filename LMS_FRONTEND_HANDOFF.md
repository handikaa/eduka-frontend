# LMS Frontend Handoff Documentation

## 1. Project Overview

This project is a frontend application for an **Learning Management System (LMS)** named **Eduka**. The application is built with **Next.js App Router**, **React**, **TypeScript**, **Tailwind CSS**, and **Axios**.

The goal of this project is to provide a clean, modular, and scalable frontend that connects to a Laravel-based LMS backend API. The system supports public landing pages, authentication, course discovery, course detail preview, blog content, and protected student/dashboard features.

This handoff document is intended to help another AI assistant or developer quickly understand the current project state, feature structure, business rules, API contracts, routing decisions, and next development direction.

---

## 2. Main Purpose of the System

Eduka is an LMS platform that supports:

1. Public landing pages for marketing and course discovery.
2. Authentication for students and instructors.
3. Course listing and course detail preview.
4. Course checkout flow preparation.
5. Course preview lessons for guest/student users who have not enrolled.
6. Blog page powered by NewsAPI.
7. Dashboard and user list features for authenticated users.
8. Future instructor/mentor flow for course management.

The current focus has been on **landing page slicing and API integration**.

---

## 3. Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework, App Router, routing, layout |
| React | UI development |
| TypeScript | Type safety for API responses, props, context, hooks |
| Tailwind CSS | Styling and responsive design |
| Axios | HTTP client for backend API requests |
| React Hook Form | Form handling for login/register |
| Zod | Form validation schema |
| @hookform/resolvers | Zod integration with React Hook Form |
| Lucide React | Icon library |
| NewsAPI.org | External API source for blog articles |

---

## 4. Core Design System

The UI consistently uses the following primary colors:

```txt
Primary   : #0d22a8
Secondary : #F25019
```

Common styling direction:

- Rounded cards: `rounded-3xl` or `rounded-[1.5rem]`
- White card background
- Soft shadows: `shadow-sm`, `shadow-xl`, `shadow-2xl`
- Gradient sections: `from-[#0d22a8] via-[#101f8f] to-[#06115a]`
- Accent/CTA buttons: `#F25019`
- Responsive first: mobile-first Tailwind classes

---

## 5. Environment Variables

The project uses `.env.local` for API configuration.

### Local backend

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### Staging backend

```env
NEXT_PUBLIC_API_BASE_URL=http://38.47.180.195/student02/api/v1
```

### Blog / NewsAPI

```env
NEWS_API_BASE_URL=https://newsapi.org/v2
NEWS_API_KEY=your_news_api_key_here
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` is used by frontend/browser API calls through Axios.
- `NEWS_API_KEY` must not use `NEXT_PUBLIC_` because it should stay server-side.
- Blog requests use a Next.js API route proxy so the NewsAPI key is not exposed directly to the browser.

---

## 6. Important Next.js Image Configuration

The backend returns image URLs such as:

```txt
http://127.0.0.1:8000/storage/courses/thumbnails/filename.webp
```

Because `next/image` blocks unconfigured external hosts, `next.config.ts` needs remote image configuration.

Recommended current config:

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

Notes:

- `dangerouslyAllowLocalIP` should only be enabled in development.
- For dynamic external blog images, the blog card uses plain `<img>` instead of `next/image`, because NewsAPI image hosts vary widely.

---

## 7. Current High-Level Folder Structure

The project uses a feature-based structure.

```txt
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── users/[id]/
│   ├── courses/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   └── page.tsx
│   ├── about-us/
│   │   └── page.tsx
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
    ├── constans.ts / constants.ts
    └── storage.ts
```

Important note: the project currently uses route `/courses` with an **s** for course listing and detail route:

```txt
/courses
/courses/[slug]
```

Older examples may still reference `/course`. Use `/courses` consistently going forward.

---

## 8. Global Reusable Components

### `Button`

File:

```txt
src/components/ui/button.tsx
```

Used across forms, CTA, pagination, navbar, checkout card, error retry, etc.

Common variants:

```txt
primary
secondary
danger
outline
ghost, if added
```

### `Input`

File:

```txt
src/components/ui/input.tsx
```

Reusable input with label and error message support.

### `Loading`

File:

```txt
src/components/ui/loading.tsx
```

Used for loading states across auth, users, course, blog.

### `Pagination`

File:

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

Important: blog and course page can use `showPageInput` to allow direct page jump.

### `CourseCard`

File:

```txt
src/components/ui/course-card.tsx
```

Reusable course card used in:

- Home course preview section
- Courses catalog grid
- Recommended courses horizontal scroll

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

If `thumbnail_url` from backend is empty/null, map it to:

```txt
/images/image-not-available.png
```

---

## 9. Auth Feature

Folder:

```txt
src/features/auth/
├── components/
│   ├── login-form.tsx
│   └── register-form.tsx
├── context/
│   └── auth-context.tsx
├── hooks/
│   └── use-auth.ts
├── services/
│   └── auth-service.ts
├── types/
│   └── auth.type.ts
└── validations/
    └── auth-schema.ts
```

### Auth Responsibilities

- Login
- Register
- Logout
- Store token and user data in localStorage
- Provide global auth state through React Context
- Protect pages with `ProtectedRoute`
- Prevent logged-in user from returning to login/register using `GuestRoute`

### Auth response shape

Login success:

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
    "token": "token",
    "token_type": "Bearer"
  }
}
```

Login failed:

```json
{
  "success": false,
  "message": "Invalid credentials provided."
}
```

### Important auth behavior

- Use `router.replace("/dashboard")` after successful login/register to avoid browser back returning to login page.
- Auth context initializes user/token from localStorage using lazy `useState` initialization to avoid setState inside effect lint issues.
- Axios service should throw backend error message, not default Axios error like `Request failed with status code 401`.

---

## 10. Users Feature

Folder:

```txt
src/features/users/
├── components/
│   ├── user-card.tsx
│   ├── user-list.tsx
│   └── user-detail-card.tsx
├── hooks/
│   ├── use-users.ts
│   └── use-user-detail.ts
├── services/
│   └── user-service.ts
└── types/
    └── user.type.ts
```

### Users API

List users:

```txt
GET /users?page=1&per_page=10
```

Detail user:

```txt
GET /auth/user/{id}
```

### Current usage

- User list is shown on dashboard.
- User detail route exists at `/users/[id]`.
- User list supports pagination.

---

## 11. Landing Page Scope

The landing page area currently includes four primary public pages:

```txt
/
/courses
/blog
/about-us
```

Navbar should show active page indicator using `usePathname()`.

Current public navbar items:

```txt
Home       -> /
Courses    -> /courses
Blog       -> /blog
About Us   -> /about-us
```

Authenticated navbar additionally includes:

```txt
Users
Dashboard
Logout
```

---

## 12. Home Page

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

`StatsSection` exists conceptually but is currently commented out.

Home page file:

```txt
src/app/page.tsx
```

Feature folder:

```txt
src/features/home/
├── components/
│   ├── hero-section.tsx
│   ├── course-preview-section.tsx
│   ├── features-section.tsx
│   ├── how-it-works-section.tsx
│   ├── testimonials-section.tsx
│   └── cta-section.tsx
├── hooks/
│   └── use-popular-courses.ts
├── services/
│   └── home-service.ts
└── constants/
    └── home-data.ts
```

### Home Course Preview

This section now fetches course data from the backend instead of static data.

API:

```txt
GET /courses?page=1&per_page=10
```

Service flow:

```txt
CoursePreviewSection
↓
usePopularCourses
↓
homeService.getPopularCourses
↓
GET /courses?page=1&per_page=10
```

Course cards in Home should link to:

```txt
/courses/{course.slug}
```

---

## 13. Courses Page

Route:

```txt
/courses
```

Course page sections:

```txt
1. Course Hero Section
2. Course Search & Filter Section
3. Course Category + Course List Section
4. Featured / Recommended Course Section
5. Learning Benefits Section, currently may be commented
6. CTA Section, currently may be commented
```

Course page wrapper:

```tsx
export function CoursePageContent() {
  return (
    <CourseProvider>
      <CourseHeroSection />
      <CourseSearchFilterSection />
      <CourseCatalogSection />
      <FeaturedCourseSection />
      {/* <CourseBenefitsSection /> */}
      {/* <CourseCTASection /> */}
    </CourseProvider>
  );
}
```

Feature folder:

```txt
src/features/course/
├── components/
│   ├── course-page-content.tsx
│   ├── course-hero-section.tsx
│   ├── course-search-filter-section.tsx
│   ├── course-catalog-section.tsx
│   ├── course-category-sidebar.tsx
│   ├── course-category-tabs.tsx
│   ├── course-grid.tsx
│   ├── featured-course-section.tsx
│   ├── course-benefits-section.tsx
│   ├── course-cta-section.tsx
│   ├── course-detail-preview-page.tsx
│   ├── course-detail-hero.tsx
│   ├── course-preview-player.tsx
│   ├── course-lesson-preview-list.tsx
│   └── course-checkout-card.tsx
├── context/
│   └── course-context.tsx
├── hooks/
│   ├── use-course.ts
│   └── use-course-detail.ts
├── services/
│   └── course-service.ts
├── constants/
│   └── course-dummy-data.ts, legacy only
└── types/
    └── course.type.ts
```

---

## 14. Courses API Integration

### List courses

Endpoint:

```txt
GET /courses
```

Params:

```txt
category_id
level
search
page
per_page
status
```

Current intended default params for public course catalog:

```txt
category_id=
level=
search=
page=1
per_page=5
status=published
```

Example:

```txt
GET /courses?level=intermediate&category_id=&search=&page=1&per_page=5&status=published
```

Response shape:

```json
{
  "success": true,
  "message": "Berhasil mengambil list course",
  "data": [],
  "pagination": {
    "current_page": 1,
    "per_page": 5,
    "total": 2,
    "last_page": 1,
    "from": 1,
    "to": 2
  }
}
```

### List categories

Endpoint:

```txt
GET /categories
```

Response shape:

```json
{
  "success": true,
  "message": "List category berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Machine Learning 589512764017",
      "slug": "machine-learning-589512764017",
      "created_at": "2026-04-29T13:02:44.000000Z",
      "updated_at": "2026-04-29T13:02:44.000000Z"
    }
  ]
}
```

If backend requires token for `/categories`, the Axios interceptor should attach Bearer token from localStorage. Ideally, for landing page category list, backend should expose this endpoint publicly.

### Recommended courses

Endpoint currently uses the same `/courses` endpoint with additional recommended param.

Possible param spelling:

```txt
recommended=user_id
```

or backend typo contract:

```txt
recomended=user_id
```

Use whatever backend accepts. Previously the business contract mentioned `recomended`.

Default:

```txt
page=1
per_page=10
status=published
```

---

## 15. Course Context Business Logic

File:

```txt
src/features/course/context/course-context.tsx
```

CourseProvider manages:

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

Recommended initial filter:

```ts
const initialFilters: CourseFilterState = {
  category_id: null,
  level: "all",
  search: "",
  status: "published",
  page: 1,
  per_page: 5,
};
```

Important: status filter is currently hidden in UI but should still default to `published` for public catalog.

---

## 16. Course Detail Page

Route:

```txt
/courses/[slug]
```

App Router page:

```txt
src/app/courses/[slug]/page.tsx
```

Because the project uses a newer Next.js version, params should be awaited:

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

### Detail API

Endpoint:

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

### Current implemented mode: Course Detail Preview

This is the mode for:

1. Guest user entering from landing page.
2. Logged-in student who has not enrolled/checked out the course yet.

Behavior:

- Show course hero with thumbnail as background image and overlay.
- Show course metadata: category, level, status, lesson count, rating, created date.
- Show video player.
- Only lessons with `is_preview = true` can be played.
- Lessons with `is_preview = false` are locked.
- Right sidebar contains checkout CTA.
- If guest clicks checkout, redirect to login with redirect query.
- If authenticated student clicks checkout, redirect to checkout page.

Checkout behavior:

```ts
if (!isAuthenticated) {
  router.push(`/login?redirect=/checkout/${course.slug}`);
} else {
  router.push(`/checkout/${course.slug}`);
}
```

### Future course detail modes

There are 3 planned course detail modes:

#### 1. Detail Preview Mode

Current implemented mode.

Use for guest or non-enrolled student.

Rules:

- Can view course detail.
- Can only play lessons where `is_preview = true`.
- Locked lessons show lock indicator.
- Checkout card appears.

#### 2. Detail Enrolled Student Mode

Not implemented yet.

Use for student who has enrolled or purchased the course.

Rules:

- Can view same course detail.
- Can play all lessons.
- No checkout CTA card.
- Should probably show learning progress, continue lesson, mark lesson completed, etc.

#### 3. Detail Instructor Mode

Not implemented yet.

Use for instructor who owns the course.

Rules:

- Can view course detail.
- Can view course status.
- Can edit course.
- Should show mentor/instructor controls.

---

## 17. Course Lesson Preview Rules

Lesson object:

```ts
export type CourseLesson = {
  id: number;
  title: string;
  type: string;
  content: string;
  video_url: string | null;
  is_preview: boolean;
  position: number | null;
  created_at: string;
};
```

Preview page rules:

```txt
if lesson.is_preview === true:
  lesson is clickable
  play video_url if available

if lesson.is_preview === false:
  lesson is disabled/locked
  show lock icon
```

If no preview lesson exists, hero/player should show thumbnail placeholder and message to choose available preview lesson.

---

## 18. Blog Page

Route:

```txt
/blog
```

Blog source:

```txt
NewsAPI.org
```

The browser does not call NewsAPI directly. It calls internal Next.js route:

```txt
GET /api/news
```

Internal route:

```txt
src/app/api/news/route.ts
```

Flow:

```txt
BlogPage
↓
useBlogArticles
↓
blogService.getArticles
↓
GET /api/news?q=&sortBy=&page=&pageSize=
↓
Next.js API route reads NEWS_API_KEY
↓
Request to NewsAPI /everything
```

Blog feature folder:

```txt
src/features/blog/
├── components/
│   ├── blog-card.tsx
│   └── blog-search-filter.tsx
├── hooks/
│   └── use-blog-articles.ts
├── services/
│   └── blog-service.ts
└── types/
    └── blog.type.ts
```

Blog supports:

- Search query
- Sort by publishedAt, popularity, relevancy
- Loading state
- Error state
- Empty state
- Pagination
- Direct page input via Pagination `showPageInput`

Important image note:

- Blog cards should use `<img>` instead of `next/image` because NewsAPI returns images from many different domains.

---

## 19. About Us Page

Route:

```txt
/about-us
```

About Us sections:

```txt
1. About Hero Section
2. Mission & Vision Section
3. Why Eduka Section
4. Values Section
5. About CTA Section
```

Feature folder:

```txt
src/features/about/
├── components/
│   ├── about-hero-section.tsx
│   ├── mission-vision-section.tsx
│   ├── why-eduka-section.tsx
│   ├── values-section.tsx
│   └── about-cta-section.tsx
└── constants/
    └── about-data.ts
```

---

## 20. Navbar

File:

```txt
src/components/common/navbar.tsx
```

Navbar behavior:

- Sticky top.
- Desktop: horizontal links.
- Mobile/tablet: hamburger menu with smooth open/close animation.
- Authenticated users see dashboard/users/logout.
- Guests see login/register.
- Active menu indicator uses `usePathname()`.

Active route logic:

```ts
const isActiveLink = (href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
```

This keeps menu active on detail routes:

```txt
/courses/flutter-course -> Courses active
/blog/article          -> Blog active
/about-us              -> About Us active
```

---

## 21. Footer

File:

```txt
src/components/common/footer.tsx
```

Footer uses primary gradient background:

```txt
from-[#0d22a8] via-[#101f8f] to-[#06115a]
```

Footer sections:

```txt
Eduka brand description
Platform links
Learning links
Mentor links
Copyright + privacy/terms
```

Mentor section is now a normal footer column, not a CTA card.

Mentor links:

```txt
Register Mentor -> /register?role=instructor
Login Mentor    -> /login
Mentor Dashboard -> /dashboard
Buat Course     -> /dashboard
```

Future mentor route suggestions:

```txt
/mentor/register
/mentor/login
/mentor/dashboard
/mentor/courses/create
```

---

## 22. Blog, Course, and Auth Routing Summary

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Home landing page |
| `/courses` | Public | Course catalog |
| `/courses/[slug]` | Public / Auth-aware | Course detail preview |
| `/blog` | Public | Blog listing from NewsAPI |
| `/about-us` | Public | About Eduka page |
| `/login` | GuestRoute | Login page |
| `/register` | GuestRoute | Register page |
| `/dashboard` | ProtectedRoute | User dashboard |
| `/users/[id]` | ProtectedRoute | User detail |

---

## 23. API Client

File:

```txt
src/lib/api.ts
```

Expected behavior:

- Axios instance reads `NEXT_PUBLIC_API_BASE_URL`.
- Sets `Accept: application/json` and `Content-Type: application/json`.
- Request interceptor attaches Bearer token from localStorage if available.

Recommended:

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

## 24. Backend API Endpoints Currently Used

### Auth

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Register |

### Users

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/users?page=1&per_page=10` | List users |
| GET | `/auth/user/{id}` | User detail |

### Courses

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/courses?page=1&per_page=10` | Home popular courses |
| GET | `/courses?category_id=&level=&search=&page=1&per_page=5&status=published` | Course catalog |
| GET | `/courses/slug/{slug}` | Course detail by slug |
| GET | `/courses?recommended={userId}&page=1&per_page=10&status=published` | Recommended courses, if backend supports `recommended` |
| GET | `/courses?recomended={userId}&page=1&per_page=10&status=published` | Recommended courses, if backend uses typo `recomended` |

### Categories

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/categories` | List course categories |

### Blog

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/news` | Internal Next.js proxy to NewsAPI |

---

## 25. Business Rules Summary

### Authentication

- Guests can visit landing pages.
- Logged-in users should not access login/register page again.
- Protected dashboard/user pages require login.
- Token and user are stored in localStorage.

### Course catalog

- Public catalog should show only published courses by default.
- Search, level, category, and pagination are API-driven.
- Category list comes from backend API.
- Course cards should use backend thumbnail if available.
- If no thumbnail is available, use `/images/image-not-available.png`.

### Course detail preview

- Guest and non-enrolled student can view course detail.
- Only preview lessons can be played.
- Non-preview lessons are locked.
- Checkout card appears.
- Guest checkout redirects to login/register first.
- Authenticated student checkout goes to checkout route.

### Enrolled student course detail, planned

- Can play all lessons.
- No checkout card.
- Should show progress and continue learning.

### Instructor course detail, planned

- Shows instructor-owned course detail.
- Shows course status.
- Has edit course button.
- No student checkout CTA.

### Mentor

- Mentor/instructor registration currently points to `/register?role=instructor`.
- Future mentor-specific routes may be created.

---

## 26. Known Issues and Fixes Already Discussed

### Next.js route mismatch

Problem:

```txt
/course/[slug] 404
```

Cause:

Project uses `/courses` with `s`.

Fix:

```txt
src/app/courses/[slug]/page.tsx
href={`/courses/${course.slug}`}
```

### Slug undefined in App Router

Problem:

RSC response showed:

```txt
{"slug":"$undefined"}
```

Fix:

Use async params:

```ts
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <CourseDetailPreviewPage slug={slug} />;
}
```

### Next image local backend error

Problem:

```txt
Invalid src prop hostname "127.0.0.1" is not configured
```

Fix:

Add `remotePatterns` for local backend in `next.config.ts`.

### Next image private IP error

Problem:

```txt
upstream image resolved to private ip ["127.0.0.1"]
```

Fix for development:

```ts
dangerouslyAllowLocalIP: process.env.NODE_ENV === "development"
```

### Blog image hosts dynamic

Problem:

NewsAPI returns images from unpredictable domains.

Fix:

Use `<img>` in blog card instead of `next/image`.

### Axios error message

Problem:

UI showed `Request failed with status code 401` instead of backend message.

Fix:

Catch `AxiosError` and throw `error.response?.data.message`.

---

## 27. Current Completed Checklist

```txt
[x] Project setup with Next.js, React, TypeScript, Tailwind
[x] Axios API client
[x] Environment variables
[x] Reusable UI components
[x] Auth feature: login, register, logout
[x] AuthContext and useAuth
[x] ProtectedRoute and GuestRoute
[x] Dashboard page
[x] Users list and detail
[x] Pagination component with page input
[x] Responsive navbar with active indicator
[x] Informative footer with mentor links
[x] Home landing page slicing
[x] Course page slicing
[x] Course page API integration for list courses
[x] Course category API integration
[x] Course detail preview page by slug
[x] Course preview lesson rules
[x] Course checkout CTA card preparation
[x] Blog page API integration via NewsAPI proxy
[x] Blog search/sort/pagination UI
[x] About Us page slicing
[x] Responsive design for landing pages
```

---

## 28. Suggested Next Development Priorities

1. Implement checkout page flow.
2. Implement enrollment API integration.
3. Detect whether student is enrolled in a course.
4. Switch course detail mode based on enrollment status.
5. Build enrolled student course detail mode.
6. Build lesson progress feature.
7. Build instructor course detail mode.
8. Build instructor course management pages.
9. Improve role-based routing for student/instructor.
10. Add toast notifications for success/error.
11. Add loading skeletons.
12. Add better empty states.
13. Add real blog detail page if needed.
14. Add mentor-specific register/login routes if required.
15. Finalize README and screenshots.

---

## 29. Prompt to Continue in a New AI Chat

Use this summary when continuing in a new AI chat:

```txt
Saya sedang membangun frontend LMS bernama Eduka menggunakan Next.js App Router, React, TypeScript, Tailwind CSS, Axios, React Hook Form, Zod, dan Lucide React.

Project memakai struktur feature-based clean modular:
- src/components/ui untuk Button, Input, Card, Loading, Pagination, CourseCard
- src/components/common untuk Navbar, Footer, ProtectedRoute, GuestRoute
- src/features/auth untuk login/register/auth context
- src/features/users untuk list user dan detail user
- src/features/home untuk landing home
- src/features/course untuk course catalog, category, recommended course, dan detail course preview
- src/features/blog untuk blog dari NewsAPI
- src/features/about untuk about us page
- src/lib untuk api, constants/constans, dan storage

Landing page sudah selesai:
- / Home
- /courses Course Catalog
- /courses/[slug] Course Detail Preview
- /blog Blog Page
- /about-us About Us

Course catalog sudah fetch API:
GET /courses?category_id=&level=&search=&page=1&per_page=5&status=published
GET /categories

Course detail sudah fetch API:
GET /courses/slug/{slug}

Course detail preview business rules:
- guest/non-enrolled student bisa melihat detail course
- hanya lesson is_preview=true yang bisa diputar
- lesson lain locked
- sidebar checkout tampil
- guest checkout redirect ke login dengan redirect query
- student login checkout ke /checkout/{slug}

Auth sudah selesai:
- POST /auth/login
- POST /auth/register
- token dan user disimpan di localStorage
- AuthContext + useAuth
- ProtectedRoute dan GuestRoute

Blog sudah selesai:
- memakai NewsAPI via internal route /api/news
- search, sort, pagination dengan input page

Saya ingin melanjutkan dari state ini dengan tetap mengikuti struktur clean modular, hooks, context, services, dan reusable components.
```

---

## 30. Final Notes

This frontend is no longer only a simple React assignment. It has evolved into a modular LMS frontend foundation with landing pages, authentication, catalog discovery, course preview, and API integration. Continue development by preserving the current separation of concerns:

```txt
UI component -> hook/context -> service -> API
```

Avoid placing API calls directly inside UI components unless it is a temporary experiment. Keep business logic in hooks/context and request logic in services.
