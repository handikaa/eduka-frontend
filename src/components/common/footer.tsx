export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} LMS App. Built with Next.js and
          React.
        </p>
      </div>
    </footer>
  );
}