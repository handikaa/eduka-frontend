# Dokumentasi Project Frontend LMS - Next.js React

## 1. Ringkasan Project

Project ini adalah aplikasi frontend untuk sistem **Learning Management System (LMS)** yang dibuat menggunakan **React dengan framework Next.js**. Project ini dikembangkan untuk memenuhi requirement Mini Project React pada bootcamp Full Stack Web Development.

Fokus utama project ini adalah membangun aplikasi frontend yang terhubung dengan API backend LMS, khususnya untuk fitur:

- Authentication: register, login, logout.
- Protected route untuk halaman yang membutuhkan login.
- Guest route untuk mencegah user yang sudah login kembali ke halaman login/register.
- Menampilkan daftar user dari API.
- Menampilkan detail user.
- Pagination pada daftar user.
- Responsive design untuk desktop, tablet, dan mobile.
- Struktur project clean, modular, dan mudah dikembangkan.

Project ini menggunakan pendekatan **feature-based structure**, yaitu kode dikelompokkan berdasarkan fitur seperti `auth` dan `users`, bukan hanya berdasarkan jenis file.

---

## 2. Tujuan Frontend

Tujuan frontend yang dibuat:

1. Membuat aplikasi frontend menggunakan React dan Next.js.
2. Mengintegrasikan frontend dengan API backend LMS.
3. Mengimplementasikan authentication menggunakan token.
4. Menyimpan session login di localStorage.
5. Membuat route yang aman menggunakan `ProtectedRoute`.
6. Membuat halaman login/register hanya untuk guest menggunakan `GuestRoute`.
7. Menampilkan data user dari API.
8. Mengimplementasikan pagination.
9. Menampilkan detail user berdasarkan ID.
10. Membuat UI responsive dan reusable.
11. Menulis struktur kode yang clean dan modular.

---

## 3. Tech Stack

Project ini menggunakan:

| Teknologi | Fungsi |
|---|---|
| Next.js | Framework React untuk routing, layout, dan struktur aplikasi |
| React | Library utama untuk membangun UI |
| TypeScript | Type safety untuk props, API response, dan state |
| Tailwind CSS | Styling responsive berbasis utility class |
| Axios | HTTP client untuk request API |
| React Hook Form | Mengelola form login dan register |
| Zod | Validasi schema form |
| @hookform/resolvers | Integrasi Zod dengan React Hook Form |
| Lucide React | Icon untuk UI |
| Git | Version control |
| Visual Studio Code | Code editor |

---

## 4. Library / Plugin yang Digunakan

Dependency tambahan yang digunakan:

```bash
npm install axios react-hook-form zod @hookform/resolvers lucide-react
```

Penjelasan:

### `axios`

Digunakan untuk membuat request ke API backend.

Contoh penggunaan:

```ts
api.get("/users", {
  params: {
    page,
    per_page,
  },
});
```

### `react-hook-form`

Digunakan untuk mengelola form login dan register agar lebih ringan dan rapi.

### `zod`

Digunakan untuk validasi input form.

Contoh validasi:

- Email wajib diisi dan harus format email valid.
- Password wajib diisi.
- Password confirmation harus sama dengan password.
- Role harus sesuai enum.

### `@hookform/resolvers`

Digunakan agar schema Zod bisa dipakai langsung oleh React Hook Form.

### `lucide-react`

Digunakan untuk icon pada navbar, dashboard, loading, user detail, dan card.

---

## 5. Environment Variable

Project menggunakan `.env.local` untuk menyimpan base URL API.

File:

```txt
.env.local
```

Isi:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-backend-url/api
```

Contoh saat development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

Selain itu dibuat juga `.env.example` agar struktur environment tetap bisa masuk GitHub tanpa membocorkan konfigurasi lokal.

File:

```txt
.env.example
```

Isi:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

`.gitignore` diatur agar `.env.local` tidak ikut commit, tetapi `.env.example` tetap bisa di-commit:

```gitignore
.env*
!.env.example
```

---

## 6. Struktur Project

Struktur utama project:

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   └── users/
│       └── [id]/
│           └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── loading.tsx
│   │   └── pagination.tsx
│   └── common/
│       ├── navbar.tsx
│       ├── footer.tsx
│       ├── protected-route.tsx
│       └── guest-route.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── context/
│   │   │   └── auth-context.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── services/
│   │   │   └── auth-service.ts
│   │   ├── types/
│   │   │   └── auth.type.ts
│   │   └── validations/
│   │       └── auth-schema.ts
│   │
│   └── users/
│       ├── components/
│       │   ├── user-card.tsx
│       │   ├── user-list.tsx
│       │   └── user-detail-card.tsx
│       ├── hooks/
│       │   ├── use-users.ts
│       │   └── use-user-detail.ts
│       ├── services/
│       │   └── user-service.ts
│       └── types/
│           └── user.type.ts
│
└── lib/
    ├── api.ts
    ├── constants.ts
    └── storage.ts
```

---

## 7. Penjelasan Struktur Folder

### `src/app`

Folder ini digunakan oleh Next.js App Router.

Isi penting:

| File / Folder | Fungsi |
|---|---|
| `layout.tsx` | Root layout aplikasi |
| `page.tsx` | Homepage |
| `login/page.tsx` | Halaman login |
| `register/page.tsx` | Halaman register |
| `dashboard/page.tsx` | Halaman dashboard setelah login |
| `users/[id]/page.tsx` | Halaman detail user |

---

### `src/components/ui`

Berisi komponen UI kecil dan reusable yang tidak terikat fitur tertentu.

Komponen:

| File | Fungsi |
|---|---|
| `button.tsx` | Tombol reusable dengan variant |
| `input.tsx` | Input reusable dengan label dan error |
| `card.tsx` | Wrapper konten |
| `loading.tsx` | Loading indicator |
| `pagination.tsx` | Komponen pagination |

Folder `ui` digunakan untuk komponen yang dapat dipakai lintas fitur.

---

### `src/components/common`

Berisi komponen umum aplikasi yang masih reusable, tetapi sudah punya konteks aplikasi.

Komponen:

| File | Fungsi |
|---|---|
| `navbar.tsx` | Navbar utama aplikasi |
| `footer.tsx` | Footer aplikasi |
| `protected-route.tsx` | Guard untuk halaman yang wajib login |
| `guest-route.tsx` | Guard untuk halaman login/register agar tidak bisa diakses user yang sudah login |

Perbedaan dengan `components/ui`:

- `components/ui` berisi komponen dasar seperti Button dan Input.
- `components/common` berisi komponen umum yang tahu konteks aplikasi seperti route dan auth.

---

### `src/features`

Folder ini berisi kode berdasarkan fitur.

Fitur saat ini:

```txt
features/auth
features/users
```

Setiap fitur memiliki bagian:

```txt
components
hooks
services
types
validations
context
```

Tidak semua fitur wajib punya semua folder. Contohnya `users` tidak memakai `context`, sedangkan `auth` memakai `context`.

---

### `src/lib`

Berisi konfigurasi global dan helper.

| File | Fungsi |
|---|---|
| `constants.ts` | Menyimpan API base URL dan storage key |
| `storage.ts` | Helper localStorage |
| `api.ts` | Axios instance global |

---

## 8. Konfigurasi Global

### `constants.ts`

Berisi constant global.

Contoh:

```ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";

export const STORAGE_KEYS = {
  TOKEN: "lms_token",
  USER: "lms_user",
} as const;
```

### `storage.ts`

Digunakan untuk akses localStorage secara aman di Next.js.

Karena Next.js bisa berjalan di server dan browser, localStorage harus dicek dengan:

```ts
if (typeof window === "undefined") return null;
```

### `api.ts`

Berisi Axios instance.

Axios instance digunakan agar semua request API memakai konfigurasi yang sama.

Contoh:

```ts
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Interceptor digunakan untuk menambahkan token:

```ts
api.interceptors.request.use((config) => {
  const token = storage.getItem(STORAGE_KEYS.TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

---

## 9. Auth Feature

Fitur auth terdiri dari:

```txt
src/features/auth/
├── components/
├── context/
├── hooks/
├── services/
├── types/
└── validations/
```

### Auth Types

File:

```txt
src/features/auth/types/auth.type.ts
```

Digunakan untuk mendefinisikan type:

- `UserRole`
- `AuthUser`
- `LoginRequest`
- `RegisterRequest`
- `AuthData`
- `AuthSuccessResponse`
- `AuthErrorResponse`
- `AuthResponse`
- `AuthContextType`

Contoh response login success dari API:

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

Contoh response login failed:

```json
{
  "success": false,
  "message": "Invalid credentials provided."
}
```

---

### Auth Validation

File:

```txt
src/features/auth/validations/auth-schema.ts
```

Berisi:

- `loginSchema`
- `registerSchema`
- `LoginFormValues`
- `RegisterFormValues`

Validasi login:

- Email wajib diisi.
- Email harus valid.
- Password wajib diisi.
- Password minimal 6 karakter.

Validasi register:

- Name wajib diisi.
- Email wajib diisi.
- Password wajib diisi.
- Password confirmation wajib diisi.
- Password confirmation harus sama dengan password.
- Role harus valid.

---

### Auth Service

File:

```txt
src/features/auth/services/auth-service.ts
```

Berisi request API:

```txt
POST /auth/login
POST /auth/register
```

Fungsi:

- `authService.login(payload)`
- `authService.register(payload)`

Service ini juga menangani error Axios agar UI bisa menampilkan pesan dari backend, misalnya:

```txt
Invalid credentials provided.
```

bukan pesan default:

```txt
Request failed with status code 401
```

---

### Auth Context

File:

```txt
src/features/auth/context/auth-context.tsx
```

Digunakan untuk menyimpan state auth secara global:

- `user`
- `token`
- `isAuthenticated`
- `isLoading`
- `login`
- `register`
- `logout`

Auth context menyimpan session ke localStorage:

```txt
lms_user
lms_token
```

Sehingga setelah refresh browser, user tetap login.

---

### useAuth Hook

File:

```txt
src/features/auth/hooks/use-auth.ts
```

Custom hook untuk mengakses AuthContext.

Contoh penggunaan:

```tsx
const { user, login, logout, isAuthenticated } = useAuth();
```

---

### Login Form

File:

```txt
src/features/auth/components/login-form.tsx
```

Fungsi:

- Input email.
- Input password.
- Validasi form.
- Submit login.
- Menampilkan error.
- Redirect ke dashboard jika login berhasil.

---

### Register Form

File:

```txt
src/features/auth/components/register-form.tsx
```

Fungsi:

- Input name.
- Input email.
- Input password.
- Input password confirmation.
- Input/select role untuk testing.
- Submit register.
- Menampilkan error.
- Redirect ke dashboard jika register berhasil.

Catatan:

Untuk production, role sebaiknya tidak dibuka bebas di halaman register publik. Role seperti `admin` atau `instructor` sebaiknya diatur oleh admin.

---

## 10. Route Guard

### ProtectedRoute

File:

```txt
src/components/common/protected-route.tsx
```

Digunakan untuk halaman yang hanya boleh diakses setelah login.

Contoh halaman:

```txt
/dashboard
/users/[id]
```

Flow:

```txt
Jika belum login -> redirect ke /login
Jika sudah login -> tampilkan halaman
```

### GuestRoute

File:

```txt
src/components/common/guest-route.tsx
```

Digunakan untuk halaman yang hanya boleh diakses oleh user yang belum login.

Contoh halaman:

```txt
/login
/register
```

Flow:

```txt
Jika belum login -> boleh akses login/register
Jika sudah login -> redirect ke /dashboard
```

---

## 11. Users Feature

Fitur users terdiri dari:

```txt
src/features/users/
├── components/
├── hooks/
├── services/
└── types/
```

### Users Types

File:

```txt
src/features/users/types/user.type.ts
```

Berisi type:

- `UserRole`
- `User`
- `UserDetail`
- `UsersPagination`
- `UsersResponse`
- `UserDetailResponse`
- `GetUsersParams`

Response list user:

```json
{
  "success": true,
  "message": "Berhasil mengambil daftar user",
  "data": [
    {
      "id": 5,
      "name": "mentor1",
      "email": "mentor1@lms.com",
      "role": "instructor",
      "is_active": true,
      "avatar_url": null,
      "created_at": "2026-04-25T02:38:56.000000Z",
      "updated_at": "2026-04-25T02:38:56.000000Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "last_page": 1,
    "per_page": 10,
    "total": 5
  }
}
```

Response detail user:

```json
{
  "success": true,
  "message": "User ditemukan",
  "data": {
    "user": {
      "id": 4,
      "name": "User Student 833936763497",
      "email": "student833936763497@lms.local",
      "role": "student"
    }
  }
}
```

---

### Users Service

File:

```txt
src/features/users/services/user-service.ts
```

Endpoint yang digunakan:

```txt
GET /users?page=1&per_page=10
GET /auth/user/{id}
```

Fungsi:

- `userService.getUsers({ page, per_page })`
- `userService.getUserById(id)`

---

### useUsers Hook

File:

```txt
src/features/users/hooks/use-users.ts
```

Mengelola state:

- `users`
- `pagination`
- `page`
- `perPage`
- `isLoading`
- `errorMessage`

Juga menyediakan function:

- `handlePageChange`
- `refetch`

---

### useUserDetail Hook

File:

```txt
src/features/users/hooks/use-user-detail.ts
```

Mengelola state detail user:

- `user`
- `isLoading`
- `errorMessage`
- `refetch`

---

### User Components

File:

```txt
src/features/users/components/user-card.tsx
src/features/users/components/user-list.tsx
src/features/users/components/user-detail-card.tsx
```

Fungsi:

| Component | Fungsi |
|---|---|
| `UserCard` | Menampilkan satu user di list |
| `UserList` | Menampilkan daftar user dan pagination |
| `UserDetailCard` | Menampilkan detail user |

---

## 12. Routing Aplikasi

Route yang digunakan:

| Route | Guard | Fungsi |
|---|---|---|
| `/` | Public | Homepage |
| `/login` | GuestRoute | Halaman login |
| `/register` | GuestRoute | Halaman register |
| `/dashboard` | ProtectedRoute | Dashboard setelah login |
| `/users/[id]` | ProtectedRoute | Detail user |

Catatan:

Daftar user ditampilkan langsung di halaman dashboard, bukan di halaman `/users`.

---

## 13. API Endpoint yang Digunakan

### Auth

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/auth/login` | Login user |
| POST | `/auth/register` | Register user |

### Users

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/users?page=1&per_page=10` | Mengambil daftar user dengan pagination |
| GET | `/auth/user/{id}` | Mengambil detail user berdasarkan ID |

---

## 14. Flow Authentication

### Login

```txt
User input email dan password
↓
React Hook Form melakukan validasi
↓
authService.login() mengirim request ke API
↓
Jika success true:
  - simpan token ke localStorage
  - simpan user ke localStorage
  - update AuthContext
  - redirect ke /dashboard
↓
Jika gagal:
  - tampilkan message dari API
```

### Register

```txt
User input name, email, password, password confirmation, role
↓
React Hook Form + Zod melakukan validasi
↓
authService.register() mengirim request ke API
↓
Jika success true:
  - simpan token dan user
  - redirect ke /dashboard
↓
Jika gagal:
  - tampilkan message dari API
```

### Logout

```txt
User klik Logout
↓
hapus lms_token dari localStorage
hapus lms_user dari localStorage
↓
set user dan token menjadi null
↓
redirect ke /login
```

---

## 15. Flow Users

### List User

```txt
User berhasil login
↓
Masuk ke /dashboard
↓
UserList memanggil useUsers()
↓
useUsers memanggil userService.getUsers()
↓
Request ke GET /users?page=1&per_page=10
↓
Data user tampil dalam bentuk card
↓
Pagination tampil jika last_page lebih dari 1
```

### Detail User

```txt
User klik Lihat Detail pada UserCard
↓
Navigasi ke /users/{id}
↓
useUserDetail(id) memanggil userService.getUserById(id)
↓
Request ke GET /auth/user/{id}
↓
UserDetailCard menampilkan detail user
```

---

## 16. Responsive Design

Responsive design sudah diterapkan pada:

### Navbar

- Desktop: menu tampil horizontal.
- Mobile/tablet: menu berubah menjadi hamburger.
- Mobile menu memiliki animasi buka dan tutup.
- Navbar menyesuaikan state login.

### Login Page

- Desktop: dua kolom, login card di kiri dan image asset di kanan.
- Mobile/tablet: hanya login card yang tampil.
- Image desktop menempel di bawah layar.

### Register Page

- Form berada di tengah.
- Layout aman untuk form yang lebih tinggi.
- Responsive pada mobile dan desktop.

### Dashboard Page

- Card dashboard stack di mobile.
- Card menjadi dua kolom di tablet/desktop.
- Email panjang diberi `break-all` agar tidak overflow.
- UserList dibungkus section responsive.

---

## 17. Komponen UI Reusable

Komponen UI yang dibuat:

### Button

Mendukung variant:

- `primary`
- `secondary`
- `danger`
- `outline`

Juga mendukung loading state:

```tsx
<Button isLoading={isLoading}>Login</Button>
```

### Input

Mendukung:

- label
- error message
- HTML input props
- styling background dan text color eksplisit

### Card

Wrapper konten reusable.

### Loading

Loading indicator dengan icon.

### Pagination

Menerima:

```ts
currentPage
totalPages
onPageChange
```

---

## 18. Catatan Error yang Pernah Diperbaiki

### Error Link Next.js

Masalah:

```txt
'Link' cannot be used as a JSX component
```

Penyebab:

Import `Link` salah.

Solusi:

```tsx
import Link from "next/link";
```

### Error Axios 401

Masalah:

UI menampilkan:

```txt
Request failed with status code 401
```

Padahal API mengirim:

```json
{
  "success": false,
  "message": "Invalid credentials provided."
}
```

Solusi:

Tangkap `AxiosError` di service dan ambil:

```ts
error.response?.data.message
```

### Error input text tidak terlihat

Masalah:

Input punya background putih dan text putih.

Solusi:

Tambahkan class:

```txt
bg-white text-gray-900
```

### Browser back kembali ke login setelah login

Masalah:

Setelah login lalu klik back browser, user kembali ke `/login`.

Solusi:

- Gunakan `GuestRoute` untuk `/login` dan `/register`.
- Gunakan `router.replace("/dashboard")` setelah login berhasil.

---

## 19. Git Commit yang Disarankan

Contoh commit yang sudah/sesuai alur:

```bash
git commit -m "chore: setup dependencies and environment"
git commit -m "chore: setup global configuration"
git commit -m "feat: add reusable ui components"
git commit -m "feat: add common layout components"
git commit -m "feat: add auth types"
git commit -m "feat: add auth validation schema"
git commit -m "feat: add auth service"
git commit -m "feat: add auth context provider"
git commit -m "feat: add use auth hook"
git commit -m "feat: add login and register forms"
git commit -m "feat: add login and register pages"
git commit -m "feat: update navbar auth state"
git commit -m "feat: add protected and guest routes"
git commit -m "feat: add dashboard page"
git commit -m "feat: add users list with pagination"
git commit -m "feat: add user detail page"
git commit -m "style: improve responsive layout"
git commit -m "docs: update project documentation"
```

---

## 20. Checklist Fitur

Checklist yang sudah dikerjakan:

```txt
[x] Setup Next.js React project
[x] Setup TypeScript
[x] Setup Tailwind CSS
[x] Setup Axios instance
[x] Setup environment variable
[x] Setup reusable UI components
[x] Setup Auth types
[x] Setup Auth validation
[x] Setup Auth service
[x] Setup Auth context
[x] Setup useAuth hook
[x] Setup login form
[x] Setup register form
[x] Setup login page
[x] Setup register page
[x] Setup protected route
[x] Setup guest route
[x] Setup dashboard page
[x] Setup list users
[x] Setup pagination
[x] Setup detail user
[x] Setup responsive navbar
[x] Setup responsive login page
[x] Setup responsive register page
[x] Setup responsive dashboard page
```

---

## 21. Hal yang Masih Bisa Dilanjutkan

Tahap berikutnya yang bisa dikerjakan:

1. Final testing semua flow.
2. Update link GitHub di README.
3. Tambahkan screenshot aplikasi ke README.
4. Perbaiki UI kecil jika ada overflow di device tertentu.
5. Deploy ke Vercel jika diperlukan.
6. Tambahkan halaman homepage yang lebih proper.
7. Tambahkan route `/users` jika ingin list user dipisahkan dari dashboard.
8. Tambahkan toast notification untuk success/error.
9. Tambahkan loading skeleton.
10. Tambahkan middleware jika ingin guard lebih kuat di level route.

---

## 22. Cara Menjelaskan Project ke AI di Chat Baru

Jika pindah ke chat AI baru, gunakan ringkasan ini:

```txt
Saya sedang membuat Mini Project React Next.js untuk frontend LMS bootcamp.

Project menggunakan:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- @hookform/resolvers
- Lucide React

Struktur project menggunakan feature-based clean modular:
- src/components/ui untuk Button, Input, Card, Loading, Pagination
- src/components/common untuk Navbar, Footer, ProtectedRoute, GuestRoute
- src/features/auth untuk login/register/auth context
- src/features/users untuk list user, pagination, dan detail user
- src/lib untuk api, constants, dan storage

Auth sudah selesai:
- POST /auth/login
- POST /auth/register
- token dan user disimpan di localStorage
- AuthContext + useAuth
- ProtectedRoute untuk dashboard dan users detail
- GuestRoute untuk login/register
- Navbar berubah berdasarkan auth state

Users sudah selesai:
- GET /users?page=1&per_page=10 untuk list users + pagination
- GET /auth/user/{id} untuk detail user
- UserList tampil di dashboard
- UserCard memiliki link ke /users/{id}
- UserDetailCard tampil di halaman detail

Saya ingin melanjutkan pengembangan dari struktur dan flow ini.
```

---

## 23. Kesimpulan

Project frontend LMS ini sudah dibangun dengan pendekatan modular dan clean. Fitur utama seperti authentication, protected route, list user, pagination, detail user, dan responsive design sudah diterapkan.

Struktur project dibuat agar mudah dikembangkan pada tahap berikutnya, misalnya menambah fitur course, enrollment, lesson, dashboard statistik, atau integrasi API LMS lainnya.
