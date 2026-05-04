import {
  Course,
  CourseCategory,
  CourseListResponse,
  CourseCategoryResponse,
} from "@/features/course/types/course.type";

export const dummyCourseCategories: CourseCategory[] = [
  {
    id: 1,
    name: "Machine Learning",
    slug: "machine-learning",
    created_at: "2026-04-29T13:02:44.000000Z",
    updated_at: "2026-04-29T13:02:44.000000Z",
  },
  {
    id: 2,
    name: "Mobile Development",
    slug: "mobile-development",
    created_at: "2026-04-29T13:02:46.000000Z",
    updated_at: "2026-04-29T13:02:46.000000Z",
  },
  {
    id: 3,
    name: "Web Development",
    slug: "web-development",
    created_at: "2026-04-29T13:02:49.000000Z",
    updated_at: "2026-04-29T13:02:49.000000Z",
  },
  {
    id: 4,
    name: "UI/UX Design",
    slug: "ui-ux-design",
    created_at: "2026-04-29T13:02:49.000000Z",
    updated_at: "2026-04-29T13:02:49.000000Z",
  },
];

export const dummyCourses: Course[] = [
  {
    id: 1,
    title: "Flutter Mobile Development",
    slug: "flutter-mobile-development",
    description: "Course lengkap untuk belajar Flutter dari dasar.",
    level: "beginner",
    price: 150000,
    quota: 50,
    status: "published",
    thumbnail_url:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    rating_count: 12,
    rating_avg: "4.80",
    created_at: "2026-04-29T13:03:28.000000Z",
    categories: [
      dummyCourseCategories[1],
    ],
    lessons: [
      {
        id: 1,
        title: "Welcome to Flutter",
        type: "video",
        content: "Introduction to Flutter",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:28.000000Z",
      },
      {
        id: 2,
        title: "Flutter Installation",
        type: "video",
        content: "Cara install Flutter di Mac & Windows",
        video_url: null,
        is_preview: false,
        position: 2,
        created_at: "2026-04-29T13:03:28.000000Z",
      },
    ],
  },
  {
    id: 2,
    title: "React Next.js Frontend Development",
    slug: "react-nextjs-frontend-development",
    description:
      "Belajar membangun aplikasi frontend modern menggunakan React, Next.js, TypeScript, dan Tailwind CSS.",
    level: "beginner",
    price: 200000,
    quota: 40,
    status: "published",
    thumbnail_url:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    rating_count: 20,
    rating_avg: "4.90",
    created_at: "2026-04-29T13:03:28.000000Z",
    categories: [
      dummyCourseCategories[2],
    ],
    lessons: [
      {
        id: 3,
        title: "React Fundamentals",
        type: "video",
        content: "Introduction to React",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:28.000000Z",
      },
      {
        id: 4,
        title: "Next.js App Router",
        type: "video",
        content: "Belajar routing dengan Next.js",
        video_url: null,
        is_preview: false,
        position: 2,
        created_at: "2026-04-29T13:03:28.000000Z",
      },
    ],
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    slug: "machine-learning-fundamentals",
    description:
      "Pelajari konsep dasar machine learning, dataset, model training, dan evaluasi model.",
    level: "intermediate",
    price: 250000,
    quota: 35,
    status: "published",
    thumbnail_url:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
    rating_count: 8,
    rating_avg: "4.70",
    created_at: "2026-04-29T13:03:27.000000Z",
    categories: [
      dummyCourseCategories[0],
    ],
    lessons: [
      {
        id: 5,
        title: "Introduction to Machine Learning",
        type: "video",
        content: "Dasar machine learning",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:27.000000Z",
      },
    ],
  },
  {
    id: 4,
    title: "UI/UX Design for Beginners",
    slug: "ui-ux-design-for-beginners",
    description:
      "Belajar dasar UI/UX, design thinking, wireframe, prototype, dan usability testing.",
    level: "beginner",
    price: 175000,
    quota: 45,
    status: "draft",
    thumbnail_url:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    rating_count: 4,
    rating_avg: "4.60",
    created_at: "2026-04-29T13:03:27.000000Z",
    categories: [
      dummyCourseCategories[3],
    ],
    lessons: [
      {
        id: 6,
        title: "What is UI/UX",
        type: "video",
        content: "Pengenalan UI/UX",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:27.000000Z",
      },
    ],
  },
  {
    id: 5,
    title: "Backend API Development with Laravel",
    slug: "backend-api-development-with-laravel",
    description:
      "Bangun REST API dengan Laravel, authentication, validation, dan database relation.",
    level: "intermediate",
    price: 220000,
    quota: 30,
    status: "published",
    thumbnail_url:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    rating_count: 16,
    rating_avg: "4.85",
    created_at: "2026-04-29T13:03:26.000000Z",
    categories: [
      dummyCourseCategories[2],
    ],
    lessons: [
      {
        id: 7,
        title: "Laravel API Introduction",
        type: "video",
        content: "Pengenalan API Laravel",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:26.000000Z",
      },
    ],
  },
  {
    id: 6,
    title: "Advanced Flutter State Management",
    slug: "advanced-flutter-state-management",
    description:
      "Pelajari state management Flutter untuk aplikasi skala menengah hingga besar.",
    level: "advanced",
    price: 275000,
    quota: 25,
    status: "archived",
    thumbnail_url:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
    rating_count: 6,
    rating_avg: "4.75",
    created_at: "2026-04-29T13:03:26.000000Z",
    categories: [
      dummyCourseCategories[1],
    ],
    lessons: [
      {
        id: 8,
        title: "Advanced State Management",
        type: "video",
        content: "State management lanjutan",
        video_url: null,
        is_preview: true,
        position: 1,
        created_at: "2026-04-29T13:03:26.000000Z",
      },
    ],
  },
];

export const dummyCourseCategoryResponse: CourseCategoryResponse = {
  success: true,
  message: "List category berhasil diambil",
  data: dummyCourseCategories,
};

export function createDummyCourseListResponse(
  courses: Course[],
  page: number,
  perPage: number
): CourseListResponse {
  const total = courses.length;
  const lastPage = Math.max(Math.ceil(total / perPage), 1);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedCourses = courses.slice(startIndex, endIndex);

  return {
    success: true,
    message: "Berhasil mengambil list course",
    data: paginatedCourses,
    pagination: {
      current_page: page,
      per_page: perPage,
      total,
      last_page: lastPage,
      from: total === 0 ? 0 : startIndex + 1,
      to: Math.min(endIndex, total),
    },
  };
}