import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-primary via-primary-medium to-primary-dark text-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Eduka</h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Platform e-learning untuk membantu student belajar teknologi,
              mengikuti course terstruktur, dan mengembangkan skill digital
              yang relevan dengan kebutuhan industri.
            </p>

            <div className="mt-5 space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@eduka.com</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white">Platform</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link href="/" className="transition-colors hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="transition-colors hover:text-secondary"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-secondary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="transition-colors hover:text-secondary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Learning</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="/register/student"
                  className="transition-colors hover:text-secondary"
                >
                  Daftar Student
                </Link>
              </li>
              <li>
                <Link
                  href="/login/student"
                  className="transition-colors hover:text-secondary"
                >
                  Login Student
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/student"
                  className="transition-colors hover:text-secondary"
                >
                  Dashboard Student
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="transition-colors hover:text-secondary"
                >
                  Mulai Belajar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white">Mentor</h3>

            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="/register/instructor"
                  className="transition-colors hover:text-secondary"
                >
                  Register Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/login/instructor"
                  className="transition-colors hover:text-secondary"
                >
                  Login Mentor
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/instructor"
                  className="transition-colors hover:text-secondary"
                >
                  Mentor Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/instructor"
                  className="transition-colors hover:text-secondary"
                >
                  Buat Course
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} Eduka LMS. Built with Next.js and
            React.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about-us"
              className="transition-colors hover:text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/about-us"
              className="transition-colors hover:text-secondary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}