import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-blue-600">
          LMS App
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          <Link href="/users" className="text-gray-700 hover:text-blue-600">
            Courses
          </Link>

          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>

          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          
        </div>
      </nav>
    </header>
  );
}