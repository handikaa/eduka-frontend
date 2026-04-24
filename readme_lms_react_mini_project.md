# LMS React Mini Project

## Deskripsi Project

LMS React Mini Project adalah aplikasi frontend berbasis **Next.js** dan **React** yang dibuat untuk memenuhi assignment Mini Project React pada program Full Stack Web Development Bootcamp.

Project ini berfokus pada implementasi aplikasi frontend yang terhubung dengan API dari mini project sebelumnya. Aplikasi memiliki fitur autentikasi user, protected route, list user, detail user, pagination, serta desain responsive agar dapat digunakan pada berbagai ukuran layar.

Project ini juga menerapkan struktur folder yang modular dan rapi dengan pendekatan berbasis fitur, sehingga kode lebih mudah dibaca, dikembangkan, dan dipelihara.

---

## Tujuan Project

Tujuan dari project ini adalah:

1. Membangun aplikasi frontend menggunakan React dan Next.js.
2. Mengintegrasikan aplikasi frontend dengan API backend.
3. Mengimplementasikan fitur register dan login user.
4. Menampilkan daftar user dari API.
5. Menampilkan detail user berdasarkan ID.
6. Mengimplementasikan pagination pada halaman user.
7. Mengimplementasikan protected route untuk membatasi akses halaman tertentu.
8. Membuat desain aplikasi yang responsive.
9. Menggunakan struktur project yang clean, modular, dan mudah dikembangkan.
10. Membuat dokumentasi project yang jelas.

---

## Tech Stack

Project ini menggunakan beberapa teknologi utama berikut:

| Teknologi | Keterangan |
|---|---|
| Next.js | Framework React untuk membangun aplikasi frontend modern |
| React | Library utama untuk membangun user interface |
| TypeScript | Superset JavaScript untuk membantu type safety |
| Tailwind CSS | Utility-first CSS framework untuk styling responsive |
| Axios | Library untuk melakukan HTTP request ke API |
| React Hook Form | Library untuk pengelolaan form |
| Zod | Library untuk validasi schema data |
| @hookform/resolvers | Integrasi Zod dengan React Hook Form |
| Lucide React | Library icon berbasis React |

---

## Library yang Digunakan

```bash
next
react
typescript
tailwindcss
axios
react-hook-form
zod
@hookform/resolvers
lucide-react
```

---

## Fitur Utama

### 1. Authentication

Fitur authentication digunakan untuk proses register, login, logout, dan menyimpan status autentikasi user.

Fitur yang diimplementasikan:

- Register user.
- Login user.
- Logout user.
- Menyimpan token autentikasi.
- Mengecek status login user.
- Mengatur akses halaman menggunakan protected route.

Komponen dan file terkait:

```txt
features/auth/
├── components/
│   ├── login-form.tsx
│   └── register-form.tsx
├── hooks/
│   └── use-auth.ts
├── context/
│   └── auth-context.tsx
├── services/
│   └── auth-service.ts
├── types/
│   └── auth.type.ts
└── validations/
    └── auth-schema.ts
```

Penjelasan:

- `login-form.tsx` digunakan untuk menampilkan dan mengelola form login.
- `register-form.tsx` digunakan untuk menampilkan dan mengelola form register.
- `use-auth.ts` adalah custom hook untuk mengakses state dan action autentikasi.
- `auth-context.tsx` digunakan untuk menyimpan state autentikasi secara global menggunakan React Context.
- `auth-service.ts` digunakan untuk memisahkan logic API authentication dari komponen UI.
- `auth.type.ts` berisi type data terkait authentication.
- `auth-schema.ts` berisi schema validasi form menggunakan Zod.

---

### 2. Users

Fitur users digunakan untuk menampilkan data user dari API, melihat detail user, dan mengatur pagination.

Fitur yang diimplementasikan:

- Menampilkan daftar user.
- Menampilkan detail user berdasarkan ID.
- Pagination pada halaman list user.
- Loading state saat mengambil data.
- Error state jika request gagal.
- Empty state jika data tidak tersedia.

Komponen dan file terkait:

```txt
features/users/
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

Penjelasan:

- `user-card.tsx` digunakan untuk menampilkan ringkasan informasi user.
- `user-list.tsx` digunakan untuk menampilkan kumpulan data user.
- `user-detail-card.tsx` digunakan untuk menampilkan detail user.
- `use-users.ts` adalah custom hook untuk mengambil daftar user berdasarkan halaman pagination.
- `use-user-detail.ts` adalah custom hook untuk mengambil detail user berdasarkan ID.
- `user-service.ts` digunakan untuk memisahkan logic API user dari komponen UI.
- `user.type.ts` berisi type data terkait user.

---

### 3. Protected Route

Protected route digunakan untuk membatasi akses halaman tertentu agar hanya dapat diakses oleh user yang sudah login.

Halaman yang dilindungi:

```txt
/users
/users/[id]
/dashboard
```

File terkait:

```txt
components/common/protected-route.tsx
middleware.ts
```

Penjelasan:

- `protected-route.tsx` digunakan sebagai client-side guard untuk mengecek apakah user sudah login.
- `middleware.ts` dapat digunakan sebagai tambahan route guard di level Next.js middleware.

---

## Struktur Folder Project

```txt
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── users/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── dashboard/
│       └── page.tsx
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
│       └── protected-route.tsx
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── context/
│   │   │   └── auth-context.tsx
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
├── lib/
│   ├── api.ts
│   ├── constants.ts
│   └── storage.ts
│
├── styles/
│   └── globals.css
│
└── middleware.ts
```

---

## Penjelasan Struktur Folder

### `src/app`

Folder `app` digunakan untuk routing utama aplikasi menggunakan Next.js App Router.

Isi utama:

- `layout.tsx` sebagai root layout aplikasi.
- `page.tsx` sebagai halaman utama.
- `login/page.tsx` sebagai halaman login.
- `register/page.tsx` sebagai halaman register.
- `users/page.tsx` sebagai halaman daftar user.
- `users/[id]/page.tsx` sebagai halaman detail user.
- `dashboard/page.tsx` sebagai halaman dashboard setelah login.

---

### `src/components/ui`

Folder ini berisi komponen UI yang reusable dan tidak terikat pada fitur tertentu.

Contoh komponen:

- `button.tsx`
- `input.tsx`
- `card.tsx`
- `loading.tsx`
- `pagination.tsx`

Komponen di folder ini dapat digunakan oleh berbagai fitur seperti auth, users, dashboard, dan halaman lain.

---

### `src/components/common`

Folder ini berisi komponen umum yang digunakan pada layout atau behavior aplikasi.

Contoh komponen:

- `navbar.tsx`
- `footer.tsx`
- `protected-route.tsx`

---

### `src/features`

Folder `features` digunakan untuk memisahkan kode berdasarkan domain fitur. Pendekatan ini membuat struktur project lebih modular, mudah dibaca, dan mudah dikembangkan.

Fitur utama:

- `auth`
- `users`

Setiap fitur memiliki struktur internal sendiri seperti components, hooks, services, types, dan validations jika diperlukan.

---

### `src/lib`

Folder `lib` digunakan untuk menyimpan helper, konfigurasi, dan utility global.

File yang digunakan:

- `api.ts` untuk konfigurasi Axios instance.
- `constants.ts` untuk menyimpan konstanta aplikasi.
- `storage.ts` untuk helper localStorage atau token storage.

---

### `src/styles`

Folder ini digunakan untuk menyimpan file styling global aplikasi.

File utama:

- `globals.css`

---

## Routing Aplikasi

| Route | Akses | Deskripsi |
|---|---|---|
| `/` | Public | Halaman utama aplikasi |
| `/login` | Public | Halaman login user |
| `/register` | Public | Halaman register user |
| `/users` | Protected | Halaman daftar user |
| `/users/[id]` | Protected | Halaman detail user |
| `/dashboard` | Protected | Halaman dashboard user |

---

## Endpoint API yang Digunakan

Endpoint yang digunakan mengikuti requirement assignment.

| Fitur | Endpoint | Method | Keterangan |
|---|---|---|---|
| Register Successful | `/register` | POST | Register user dengan data valid |
| Register Unsuccessful | `/register` | POST | Register user dengan data tidak valid |
| Login Successful | `/login` | POST | Login user dengan credential valid |
| Login Unsuccessful | `/login` | POST | Login user dengan credential tidak valid |
| List Users | `/users?page={page}` | GET | Mengambil daftar user berdasarkan halaman |
| Single User | `/users/{id}` | GET | Mengambil detail user berdasarkan ID |

Catatan: Base URL API disimpan pada environment variable agar mudah diganti sesuai kebutuhan.

Contoh file `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://reqres.in/api
```

---

## Environment Variable

Project ini menggunakan environment variable untuk menyimpan base URL API.

Buat file `.env.local` pada root project:

```env
NEXT_PUBLIC_API_BASE_URL=https://reqres.in/api
```

Jika menggunakan API dari mini project backend sendiri, ubah URL tersebut sesuai base URL API backend yang digunakan.

---

## Instalasi Project

Clone repository:

```bash
git clone https://github.com/username/lms-react-mini-project.git
```

Masuk ke folder project:

```bash
cd lms-react-mini-project
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka aplikasi di browser:

```txt
http://localhost:3000
```

---

## Script yang Tersedia

| Command | Keterangan |
|---|---|
| `npm run dev` | Menjalankan aplikasi pada mode development |
| `npm run build` | Membuat production build |
| `npm run start` | Menjalankan aplikasi hasil build |
| `npm run lint` | Menjalankan proses linting |

---

## Alur Penggunaan Aplikasi

1. User membuka halaman utama.
2. User dapat masuk ke halaman register atau login.
3. User melakukan register dengan email dan password.
4. User melakukan login dengan credential yang valid.
5. Setelah login berhasil, token disimpan di storage.
6. User diarahkan ke halaman dashboard atau users.
7. User dapat melihat daftar user.
8. User dapat menggunakan pagination untuk berpindah halaman data user.
9. User dapat membuka detail user.
10. User dapat logout dari aplikasi.

---

## Implementasi React Hooks

Project ini menggunakan React Hooks untuk mengelola state dan logic aplikasi.

Hooks yang digunakan:

| Hook | Keterangan |
|---|---|
| `useState` | Mengelola state lokal seperti loading, error, page, dan data |
| `useEffect` | Menjalankan side effect seperti mengambil data dari API |
| `useContext` | Mengakses state authentication dari Auth Context |
| `useAuth` | Custom hook untuk mengakses authentication state dan action |
| `useUsers` | Custom hook untuk mengambil daftar user |
| `useUserDetail` | Custom hook untuk mengambil detail user |

---

## Implementasi Context

Project ini menggunakan React Context pada fitur authentication.

Context digunakan agar data auth seperti token, status login, dan action login/logout dapat diakses oleh komponen lain tanpa perlu passing props secara manual.

File utama:

```txt
features/auth/context/auth-context.tsx
```

Context menyediakan data dan function seperti:

```txt
user
token
isAuthenticated
login
register
logout
```

---

## Implementasi Custom Hooks

Custom hooks digunakan untuk memisahkan logic dari komponen UI.

Contoh custom hooks:

```txt
useAuth
useUsers
useUserDetail
```

Keuntungan menggunakan custom hooks:

1. Komponen UI menjadi lebih bersih.
2. Logic dapat digunakan ulang.
3. Kode lebih mudah dites dan dikembangkan.
4. Pemisahan tanggung jawab antar layer menjadi lebih jelas.

---

## Implementasi API Service

API service digunakan untuk memisahkan request API dari komponen.

Contoh file service:

```txt
features/auth/services/auth-service.ts
features/users/services/user-service.ts
```

Keuntungan menggunakan service layer:

1. Komponen tidak langsung berhubungan dengan Axios.
2. Endpoint API lebih mudah dikelola.
3. Jika base URL atau struktur response berubah, perubahan dapat dilakukan di service.
4. Kode lebih modular dan maintainable.

---

## Responsive Design

Project ini menggunakan Tailwind CSS untuk membuat desain responsive.

Pendekatan responsive yang digunakan:

- Mobile first design.
- Grid dan flex layout.
- Breakpoint Tailwind seperti `sm`, `md`, dan `lg`.
- Komponen dibuat reusable agar tampilan konsisten.

Contoh:

```txt
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

## Validasi Form

Validasi form dilakukan menggunakan kombinasi:

```txt
react-hook-form
zod
@hookform/resolvers
```

Form yang divalidasi:

- Login form.
- Register form.

Contoh validasi:

- Email wajib diisi dan harus format email valid.
- Password wajib diisi.
- Password memiliki minimal panjang karakter tertentu.

---

## Fitur Tambahan di Luar Requirement Utama

Beberapa fitur tambahan yang dapat ditambahkan:

1. Loading state pada proses request API.
2. Error message ketika login atau register gagal.
3. Empty state ketika data user kosong.
4. Reusable UI components.
5. Auth Context untuk global authentication state.
6. Custom hooks untuk memisahkan logic data fetching.
7. Environment variable untuk konfigurasi API.
8. Responsive layout menggunakan Tailwind CSS.
9. Struktur folder modular berbasis fitur.

---

## Rencana Commit Git

Contoh urutan commit yang digunakan selama pengembangan:

```bash
git commit -m "chore: initialize next project"
git commit -m "feat: setup project structure"
git commit -m "feat: add reusable ui components"
git commit -m "feat: setup axios api client"
git commit -m "feat: implement authentication service"
git commit -m "feat: add login and register forms"
git commit -m "feat: implement auth context and custom hook"
git commit -m "feat: add protected route"
git commit -m "feat: implement users list with pagination"
git commit -m "feat: implement user detail page"
git commit -m "style: improve responsive layout"
git commit -m "docs: add project documentation"
```

---

## Link Repository GitHub

Repository GitHub:

```txt
https://github.com/username/lms-react-mini-project
```

Catatan: Link repository akan diperbarui setelah project dibuat dan di-push ke GitHub.

---

## Kesimpulan

Project ini dibuat sebagai implementasi pembelajaran React dan Next.js pada mini project frontend. Struktur project dirancang modular berdasarkan fitur agar mudah dikembangkan, dibaca, dan dipelihara.

Dengan fitur authentication, protected route, API integration, pagination, custom hooks, React Context, dan responsive design, project ini diharapkan dapat memenuhi requirement assignment sekaligus menjadi fondasi yang baik untuk pengembangan aplikasi frontend yang lebih besar.

